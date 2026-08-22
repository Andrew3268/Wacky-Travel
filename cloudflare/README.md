# Cloudflare canonical domain redirect

`wacky-travel.pages.dev` and its branch subdomains should permanently redirect to `https://bestayable.com` while preserving the path and query string.

## Automated setup

Set a Cloudflare API token with these account permissions:

- Bulk URL Redirects: Edit
- Account Filter Lists: Edit

Then run:

```bash
CLOUDFLARE_ACCOUNT_ID="..." \
CLOUDFLARE_API_TOKEN="..." \
npm run cloudflare:pages-dev-redirect
```

The script creates/updates the dedicated `bestayable_pages_dev_redirects` Bulk Redirect List and enables it in the account `http_request_redirect` ruleset.

## Dashboard import fallback

`pages-dev-to-custom-domain.csv` contains the same redirect in Cloudflare Bulk Redirect CSV format:

- 301 permanent redirect
- preserve query string
- include subdomains
- subpath matching
- preserve path suffix
