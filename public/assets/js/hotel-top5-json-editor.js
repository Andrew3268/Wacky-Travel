(()=>{
 const $=id=>document.getElementById(id);
 const text=v=>String(v??'').trim();const esc=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
 let parsed=null, legacy=false, name='';
 const active=()=>($('content_type')?.value||'')==='top5_series';
 const isJsonMode=()=>active() && text($('content_format')?.value)==='json';
 function validate(data){const e=[];if(!data||typeof data!=='object'||Array.isArray(data))return{ok:false,errors:['TOP 5 JSON 객체가 필요합니다.']};
 if(data.schemaVersion!=='hotel-top5-v1.0'||data.contentType!=='top5_series')e.push('hotel-top5-v1.0 스키마와 top5_series 타입만 지원합니다.');
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(text(data.slug)))e.push('slug 형식이 잘못되었습니다.');
 if(!text(data.article?.title)||!text(data.seo?.title)||!text(data.seo?.description))e.push('제목·SEO 정보가 필요합니다.');
 if(!data.destination?.slug||!data.recommendationCategory?.slug)e.push('도시와 추천 카테고리가 필요합니다.');
 if(!Array.isArray(data.hotels)||data.hotels.length!==5)e.push('호텔은 정확히 5개여야 합니다.');
 const ids=new Set();for(const [i,h] of (Array.isArray(data.hotels)?data.hotels:[]).entries()){
 if(!h?.id||ids.has(h.id))e.push(`${i+1}번째 호텔의 ID가 중복되거나 비었습니다.`);ids.add(h?.id);
 if(!text(h?.hotel?.nameKo)||!text(h?.editorial?.headline)||!Array.isArray(h?.editorial?.paragraphs)||!h.editorial.paragraphs.length||!text(h?.analysis?.summary))e.push(`${i+1}번째 호텔 이름·에디토리얼·Analysis를 확인하세요.`);
 }
 return {ok:e.length===0,errors:e,data};}
 function status(message,error=false){const el=$('hotelTop5JsonStatus');if(!el)return;el.textContent=message;el.className='bt5-editor-status'+(error?' is-error':'');}
 function reflect(){const editor=$('hotelTop5JsonEditor');if(editor){editor.hidden=!active();editor.setAttribute('aria-hidden',active()?'false':'true');}
 const isJson=isJsonMode();const source=$('hotelTop5JsonSource');if(source)source.hidden=!isJson;
 if(active() && parsed && $('content_format'))$('content_format').value='json';
 window.StyleHotelEditor?.syncVisibility?.();
 ['contentMarkdownSection','contentLinkManager','faqMarkdownField','inlineImageEditorCard','markdownTocCard'].forEach(id=>{const el=$(id);if(el && isJson){el.hidden=true;el.setAttribute('aria-hidden','true');}});
 }
 function update(input,label){const result=validate(input);if(!result.ok){parsed=null;status(result.errors.join('\n'),true);return result;}
 parsed=input;name=label||name||'JSON';$('content_format').value='json';$('hotelTop5JsonSource').value=JSON.stringify(input,null,2);
 const title=$('title'),summary=$('summary'),meta=$('meta_description');if(title)title.value=input.article.title;if(summary)summary.value=input.article.subtitle||input.article.intro?.[0]||'';if(meta)meta.value=input.seo.description;
 const slugEl=$('slugPreview');if(slugEl)slugEl.value=input.slug;
 status(`검증 완료 · ${name} · 호텔 5곳 · 에디토리얼 5개`);
 reflect(); document.dispatchEvent(new Event('hotel-top5-json-change'));return result;
 }
 function fromRaw(){try{return update(JSON.parse($('hotelTop5JsonSource').value),'직접 수정');}catch(e){parsed=null;status('JSON 문법 오류: '+e.message,true);return{ok:false,errors:[e.message]};}}
 const getData=()=>parsed;
 const getSlug=()=>parsed?.slug||'';
 function loadFromServer(item={}){legacy=false;parsed=null; if(item.content_type!=='top5_series'){reflect();return;}
 if(item.content_format==='json' && item.content_json){try{update(typeof item.content_json==='string'?JSON.parse(item.content_json):item.content_json,'저장된 TOP 5 JSON');}catch(e){status('저장된 JSON을 읽지 못했습니다: '+e.message,true);}}
 else {legacy=true;$('content_format').value='markdown';status('기존 Markdown 방식의 TOP 5 글입니다. 그대로 수정하거나 JSON을 업로드해 전환할 수 있습니다.');}
 reflect();}
 function validateForSave(){if(!isJsonMode())return{ok:true,errors:[]};try{return validate(JSON.parse($('hotelTop5JsonSource').value));}catch(e){return{ok:false,errors:['JSON 문법 오류: '+e.message]};}}
 function getPayload(){return isJsonMode()?{content_format:'json',content_json:$('hotelTop5JsonSource').value}:{content_format:'markdown',content_json:''};}
 function renderAdminPreview(){if(!parsed)return'<p>호텔 TOP 5 JSON 파일을 업로드하면 미리보기가 표시됩니다.</p>';
 return `<article class="bt5-admin-preview"><div class="bt5-overline">BE STAYABLE · TOP 5</div><h1>${esc(parsed.article.title)}</h1>${(parsed.article.intro||[]).map(x=>`<p>${esc(x)}</p>`).join('')}${parsed.hotels.map((h,i)=>`<section><span>${String(i+1).padStart(2,'0')} · ${esc(h.hotel?.nameEn||'')}</span><h2>${esc(h.hotel.nameKo)}</h2><h3>${esc(h.editorial.headline)}</h3>${h.editorial.paragraphs.map(x=>`<p>${esc(x)}</p>`).join('')}<h4>Analysis</h4><p>${esc(h.analysis.summary)}</p></section>`).join('')}</article>`;
 }
 function init(){if(!$('hotelTop5JsonEditor'))return;
 $('hotelTop5JsonFile')?.addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{update(JSON.parse(await f.text()),f.name);}catch(err){status('파일을 읽지 못했습니다: '+err.message,true);}});
 $('hotelTop5JsonSource')?.addEventListener('input',()=>{try{const v=JSON.parse($('hotelTop5JsonSource').value);const r=validate(v);if(r.ok){parsed=v;status('JSON 형식 검증 완료');document.dispatchEvent(new Event('hotel-top5-json-change'));}else{parsed=null;status(r.errors[0],true);}}catch(e){parsed=null;status('JSON 문법 오류: '+e.message,true);}});
 $('hotelTop5JsonFormat')?.addEventListener('click',()=>{try{$('hotelTop5JsonSource').value=JSON.stringify(JSON.parse($('hotelTop5JsonSource').value),null,2);fromRaw();}catch(e){status(e.message,true);}});
 $('content_type')?.addEventListener('change',()=>{if(active() && !legacy && parsed)$('content_format').value='json';reflect();});reflect();}
 window.HotelTop5JsonEditor={init,isJsonMode,validateForSave,getPayload,getData,getSlug,renderAdminPreview,loadFromServer,reflect};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
