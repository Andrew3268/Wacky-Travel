import { okJson, getAdminCount } from "../../_utils.js";

export async function onRequestGet({ env }) {
  const adminCount = await getAdminCount(env.TRAVEL_DB);
  return okJson({ has_admin: adminCount > 0 }, {
    headers: {
      "cache-control": "private, no-store, max-age=0",
      "pragma": "no-cache"
    }
  });
}
