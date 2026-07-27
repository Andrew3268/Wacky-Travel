import { okJson, requireAdmin } from "../_utils.js";

const DEFAULTS = {
  mood: [
    ["ocean-rest", "바다를 보며 쉬는 여행"],
    ["hotel-stay", "숙소에서 보내는 하루"],
    ["food-trip", "먹으러 떠나는 여행"],
    ["walking-city", "걷기 좋은 도시 여행"],
    ["digital-nomad", "디지털 노마드의 하루"],
    ["hot-spring-spa", "온천과 스파로 푸는 피로"],
    ["family-memories", "아이와 함께 만드는 추억"],
    ["pet-friendly", "반려동물과 함께하는 여행"],
    ["romantic-date", "단둘이 떠나는 로맨틱 데이트"],
    ["budget-trip", "가성비 높은 알뜰 여행"]
  ]
};
const clean=v=>String(v||"").replace(/\s+/g," ").trim();
const slugify=v=>clean(v).toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9가-힣_-]+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");
async function ensure(db){
  await db.prepare(`CREATE TABLE IF NOT EXISTS curation_items (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, slug TEXT NOT NULL, name TEXT NOT NULL, sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1, created_at TEXT DEFAULT '', updated_at TEXT DEFAULT '', UNIQUE(type, slug))`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_curation_items_type_order ON curation_items(type,is_active,sort_order)`).run();
  const now=new Date().toISOString();
  const moodSlugs=DEFAULTS.mood.map(item=>item[0]);
  await db.prepare(`UPDATE curation_items SET is_active=0, updated_at=? WHERE type='situation'`).bind(now).run();
  if(moodSlugs.length){
    const placeholders=moodSlugs.map(()=>'?').join(',');
    await db.prepare(`UPDATE curation_items SET is_active=0, updated_at=? WHERE type='mood' AND slug NOT IN (${placeholders})`).bind(now,...moodSlugs).run();
  }
  for(let i=0;i<DEFAULTS.mood.length;i++){
    const [slug,name]=DEFAULTS.mood[i];
    await db.prepare(`INSERT INTO curation_items(type,slug,name,sort_order,is_active,created_at,updated_at)
      VALUES('mood',?,?,?,1,?,?)
      ON CONFLICT(type,slug) DO UPDATE SET name=excluded.name,sort_order=excluded.sort_order,is_active=1,updated_at=excluded.updated_at`)
      .bind(slug,name,i+1,now,now).run();
  }
}
async function list(db){ await ensure(db); const r=await db.prepare(`SELECT id,type,slug,name,sort_order,is_active FROM curation_items WHERE type='mood' ORDER BY sort_order,name`).all(); return r.results||[]; }
export async function onRequestGet({env}){ return okJson({items:await list(env.TRAVEL_DB)},{headers:{"cache-control":"private, no-store"}}); }
export async function onRequestPost({env,request}){ if(!await requireAdmin(env,request)) return okJson({message:"관리자 로그인이 필요합니다."},{status:401}); await ensure(env.TRAVEL_DB); const b=await request.json().catch(()=>null); const type=clean(b?.type); const name=clean(b?.name); const slug=slugify(b?.slug||name); if(type!=="mood"||!name||!slug)return okJson({message:"종류, 이름, slug를 확인해 주세요."},{status:400}); const now=new Date().toISOString(); const max=await env.TRAVEL_DB.prepare(`SELECT COALESCE(MAX(sort_order),0) m FROM curation_items WHERE type=?`).bind(type).first(); try{await env.TRAVEL_DB.prepare(`INSERT INTO curation_items(type,slug,name,sort_order,is_active,created_at,updated_at) VALUES(?,?,?,?,1,?,?)`).bind(type,slug,name,Number(max?.m||0)+1,now,now).run();}catch(e){return okJson({message:"같은 slug의 항목이 이미 있습니다."},{status:409});} return okJson({ok:true,items:await list(env.TRAVEL_DB)}); }
export async function onRequestPut({env,request}){ if(!await requireAdmin(env,request)) return okJson({message:"관리자 로그인이 필요합니다."},{status:401}); await ensure(env.TRAVEL_DB); const b=await request.json().catch(()=>null); const id=Number(b?.id||0), name=clean(b?.name), slug=slugify(b?.slug); if(!id||!name||!slug)return okJson({message:"수정할 항목 정보를 확인해 주세요."},{status:400}); try{await env.TRAVEL_DB.prepare(`UPDATE curation_items SET name=?,slug=?,sort_order=?,is_active=?,updated_at=? WHERE id=?`).bind(name,slug,Number(b.sort_order||0),Number(b.is_active??1)?1:0,new Date().toISOString(),id).run();}catch(e){return okJson({message:"같은 slug의 항목이 이미 있습니다."},{status:409});} return okJson({ok:true,items:await list(env.TRAVEL_DB)}); }
export async function onRequestDelete({env,request}){ if(!await requireAdmin(env,request)) return okJson({message:"관리자 로그인이 필요합니다."},{status:401}); await ensure(env.TRAVEL_DB); const b=await request.json().catch(()=>null); const id=Number(b?.id||0); if(!id)return okJson({message:"삭제할 항목이 필요합니다."},{status:400}); await env.TRAVEL_DB.prepare(`DELETE FROM curation_items WHERE id=?`).bind(id).run(); return okJson({ok:true,items:await list(env.TRAVEL_DB)}); }
