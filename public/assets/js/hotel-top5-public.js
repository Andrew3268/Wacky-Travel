(()=>{
 const btn=document.querySelector('.bt5-mobile-toc');const nav=document.querySelector('.bt5-mobile-nav');
 if(btn&&nav){btn.addEventListener('click',()=>{const opened=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!opened));nav.hidden=opened;});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.hidden=true;btn.setAttribute('aria-expanded','false');}));}
 const target=document.getElementById('bt5-map-canvas');
 if(!target)return;
 const init=()=>{
  if(typeof L==='undefined')return;
  let pts=[];try{pts=JSON.parse(target.dataset.points||'[]');}catch{return;}
  if(pts.length!==5)return;
  const map=L.map(target,{scrollWheelZoom:false}).setView([pts[0].lat,pts[0].lng],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  const layers=pts.map(x=>L.marker([x.lat,x.lng]).bindPopup(x.name).addTo(map));
  map.fitBounds(L.featureGroup(layers).getBounds().pad(.19));
 };
 if(typeof L!=='undefined')init();else window.addEventListener('load',init,{once:true});
})();
