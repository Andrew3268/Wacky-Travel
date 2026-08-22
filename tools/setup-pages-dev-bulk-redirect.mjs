const API_BASE = "https://api.cloudflare.com/client/v4";
const ACCOUNT_ID = String(process.env.CLOUDFLARE_ACCOUNT_ID || "").trim();
const API_TOKEN = String(process.env.CLOUDFLARE_API_TOKEN || "").trim();
const SOURCE_HOST = String(process.env.PAGES_DEV_HOST || "wacky-travel.pages.dev").trim().replace(/^https?:\/\//i, "").replace(/\/$/, "");
const TARGET_ORIGIN = String(process.env.SITE_ORIGIN || "https://bestayable.com").trim().replace(/\/$/, "");
const LIST_NAME = "bestayable_pages_dev_redirects";
const RULE_REF = "bestayable_pages_dev_redirects";
const RULE_DESCRIPTION = "Redirect Bestayable Pages preview/production host to canonical custom domain";

if (!ACCOUNT_ID || !API_TOKEN) {
  console.error("Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN.");
  console.error("Required token permissions: Account > Bulk URL Redirects > Edit and Account > Account Filter Lists > Edit.");
  process.exit(1);
}

const redirectItem = {
  redirect: {
    source_url: SOURCE_HOST,
    target_url: TARGET_ORIGIN,
    status_code: 301,
    include_subdomains: true,
    subpath_matching: true,
    preserve_query_string: true,
    preserve_path_suffix: true
  },
  comment: "Canonicalize *.pages.dev to bestayable.com"
};

const redirectRule = {
  ref: RULE_REF,
  description: RULE_DESCRIPTION,
  expression: `http.request.full_uri in $${LIST_NAME}`,
  action: "redirect",
  action_parameters: {
    from_list: {
      name: LIST_NAME,
      key: "http.request.full_uri"
    }
  },
  enabled: true
};

async function cf(path, { method = "GET", body, allow404 = false } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  if (allow404 && response.status === 404) return null;
  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.success === false) {
    const details = payload?.errors?.map((item) => `${item.code || ""} ${item.message || ""}`.trim()).join("; ") || response.statusText;
    throw new Error(`${method} ${path} failed (${response.status}): ${details}`);
  }
  return payload;
}

async function waitForBulkOperation(operationId) {
  if (!operationId) return;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const payload = await cf(`/accounts/${ACCOUNT_ID}/rules/lists/bulk_operations/${operationId}`);
    const status = payload?.result?.status;
    if (status === "completed") return;
    if (status === "failed") throw new Error(`Bulk Redirect list operation failed: ${payload?.result?.error || operationId}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Timed out waiting for Cloudflare bulk operation ${operationId}`);
}

async function ensureRedirectList() {
  const lists = await cf(`/accounts/${ACCOUNT_ID}/rules/lists`);
  let list = (lists?.result || []).find((item) => item.name === LIST_NAME);

  if (!list) {
    const created = await cf(`/accounts/${ACCOUNT_ID}/rules/lists`, {
      method: "POST",
      body: {
        name: LIST_NAME,
        description: "Canonical redirect from wacky-travel.pages.dev and branch aliases to bestayable.com",
        kind: "redirect"
      }
    });
    list = created.result;
    console.log(`Created Bulk Redirect List: ${LIST_NAME}`);
  } else if (list.kind !== "redirect") {
    throw new Error(`Cloudflare list ${LIST_NAME} exists but kind is ${list.kind}, not redirect.`);
  }

  // This list is dedicated to the canonical-domain redirect, so replace its contents atomically.
  const updated = await cf(`/accounts/${ACCOUNT_ID}/rules/lists/${list.id}/items`, {
    method: "PUT",
    body: [redirectItem]
  });
  await waitForBulkOperation(updated?.result?.operation_id);
  console.log(`Configured redirect: ${SOURCE_HOST}/* -> ${TARGET_ORIGIN}/* (301)`);
  return list;
}

async function ensureRedirectRule() {
  let entrypoint = await cf(`/accounts/${ACCOUNT_ID}/rulesets/phases/http_request_redirect/entrypoint`, { allow404: true });
  const ruleset = entrypoint?.result || null;

  if (!ruleset) {
    const created = await cf(`/accounts/${ACCOUNT_ID}/rulesets`, {
      method: "POST",
      body: {
        name: "Bestayable redirects",
        kind: "root",
        phase: "http_request_redirect",
        rules: [redirectRule]
      }
    });
    console.log(`Created redirect ruleset and enabled ${RULE_REF}.`);
    return created.result;
  }

  const existing = (ruleset.rules || []).find((rule) => rule.ref === RULE_REF);
  if (existing) {
    await cf(`/accounts/${ACCOUNT_ID}/rulesets/${ruleset.id}/rules/${existing.id}`, {
      method: "PATCH",
      body: redirectRule
    });
    console.log(`Updated existing redirect rule: ${RULE_REF}`);
    return;
  }

  await cf(`/accounts/${ACCOUNT_ID}/rulesets/${ruleset.id}/rules`, {
    method: "POST",
    body: redirectRule
  });
  console.log(`Added redirect rule to existing http_request_redirect ruleset: ${RULE_REF}`);
}

await ensureRedirectList();
await ensureRedirectRule();
console.log("Cloudflare Pages canonical-domain Bulk Redirect setup complete.");
