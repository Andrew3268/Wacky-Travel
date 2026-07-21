import { okJson, requireAdmin } from "../_utils.js";

const DEFAULTS = {
  mood: [
    ["ocean-rest", "바다를 보며 쉬는 여행"], ["hotel-stay", "숙소에서 보내는 하루"],
    ["food-trip", "먹으러 떠나는 여행"], ["walking-city", "걷기 좋은 도시 여행"]
  ],
  situation: [
    ["late-arrival", "늦은 밤 도착해도 이동이 편한 호텔"],
    ["early-flight", "새벽 비행기 전날 머물기 좋은 호텔"],
    ["walkable-trip", "택시 없이도 여행하기 편한 호텔"],
    ["short-trip", "2박 3일을 이동에 낭비하지 않는 호텔"],
    ["luggage-friendly", "캐리어를 오래 끌지 않아도 되는 호텔"],
    ["late-departure", "체크아웃 후 저녁 비행기까지 편한 호텔"]
  ]
};
const clean=v=>String(v||"").replace(/\s+/g," ").trim();
const slugify=v=>clean(v).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9가-힣_-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");
async function ensure(db){
  await db.prepare(`CREATE TABLE IF NOT EXISTS curation_items (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, slug TEXT NOT NULL, name TEXT NOT NULL, sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1, created_at TEXT DEFAULT '', updated_at TEXT DEFAULT '', UNIQUE(type, slug))`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_curation_items_type_order ON curation_items(type,is_active,sort_order)`).run();
  const now=new Date().toISOString();
  for(const [type,items] of Object.entries(DEFAULTS)) for(let i=0;i<items.length;i++) await db.prepare(`INSERT OR IGNORE INTO curation_items(type,slug,name,sort_order,is_active,created_at,updated_at) VALUES(?,?,?,?,1,?,?)`).bind(type,items[i][0],items[i][1],i+1,now,now).run();
}
async function list(db){ await ensure(db); const r=await db.prepare(`SELECT id,type,slug,name,sort_order,is_active FROM curation_items ORDER BY type,sort_order,name`).all(); return r.results||[]; }
export async function onRequestGet({env}){ return okJson({items:await list(env.TRAVEL_DB)},{headers:{"cache-control":"private, no-store"}}); }
export async function onRequestPost({env,request}){ if(!await requireAdmin(env,request)) return okJson({message:"관리자 로그인이 필요합니다."},{status:401}); await ensure(env.TRAVEL_DB); const b=await request.json().catch(()=>null); const type=clean(b?.type); const name=clean(b?.name); const slug=slugify(b?.slug||name); if(!["mood","situation"].includes(type)||!name||!slug)return okJson({message:"종류, 이름, slug를 확인해 주세요."},{status:400}); const now=new Date().toISOString(); const max=await env.TRAVEL_DB.prepare(`SELECT COALESCE(MAX(sort_order),0) m FROM curation_items WHERE type=?`).bind(type).first(); try{await env.TRAVEL_DB.prepare(`INSERT INTO curation_items(type,slug,name,sort_order,is_active,created_at,updated_at) VALUES(?,?,?,?,1,?,?)`).bind(type,slug,name,Number(max?.m||0)+1,now,now).run();}catch(e){return okJson({message:"같은 slug의 항목이 이미 있습니다."},{status:409});} return okJson({ok:true,items:await list(env.TRAVEL_DB)}); }
export async function onRequestPut({env,request}){ if(!await requireAdmin(env,request)) return okJson({message:"관리자 로그인이 필요합니다."},{status:401}); await ensure(env.TRAVEL_DB); const b=await request.json().catch(()=>null); const id=Number(b?.id||0), name=clean(b?.name), slug=slugify(b?.slug); if(!id||!name||!slug)return okJson({message:"수정할 항목 정보를 확인해 주세요."},{status:400}); try{await env.TRAVEL_DB.prepare(`UPDATE curation_items SET name=?,slug=?,sort_order=?,is_active=?,updated_at=? WHERE id=?`).bind(name,slug,Number(b.sort_order||0),Number(b.is_active??1)?1:0,new Date().toISOString(),id).run();}catch(e){return okJson({message:"같은 slug의 항목이 이미 있습니다."},{status:409});} return okJson({ok:true,items:await list(env.TRAVEL_DB)}); }
export async function onRequestDelete({env,request}){ if(!await requireAdmin(env,request)) return okJson({message:"관리자 로그인이 필요합니다."},{status:401}); await ensure(env.TRAVEL_DB); const b=await request.json().catch(()=>null); const id=Number(b?.id||0); if(!id)return okJson({message:"삭제할 항목이 필요합니다."},{status:400}); await env.TRAVEL_DB.prepare(`DELETE FROM curation_items WHERE id=?`).bind(id).run(); return okJson({ok:true,items:await list(env.TRAVEL_DB)}); }
