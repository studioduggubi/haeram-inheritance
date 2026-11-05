/* Existing official site's Naver common key and cnv integration retained for compatibility. */
'use strict';
(()=>{
 if(!['haeram-law.com','www.haeram-law.com','studioduggubi.github.io'].includes(location.hostname))return;
 if(location.hostname==='studioduggubi.github.io'&&!location.pathname.startsWith('/haeram-inheritance/'))return;
 window.wcs_add=window.wcs_add||{};window.wcs_add.wa='s_282e2b0947a8';
 const script=document.createElement('script');script.src='https://wcs.naver.net/wcslog.js';script.async=true;
 script.onload=()=>{if(!window.wcs)return;try{
  window.wcs.inflow(location.hostname==='studioduggubi.github.io'?location.hostname+'/haeram-inheritance':location.hostname);
  let receipt=null;
  if(location.pathname.endsWith('/thank-you.html')){try{receipt=JSON.parse(sessionStorage.getItem('haeram-inheritance-receipt')||'null');}catch(error){}}
  const valid=receipt&&!receipt.isTest&&/^[0-9a-f-]{36}$/.test(receipt.leadId)&&Number.isFinite(receipt.confirmedAt)&&Date.now()-receipt.confirmedAt>=0&&Date.now()-receipt.confirmedAt<=1800000&&!sessionStorage.getItem('haeram-conversion-'+receipt.leadId);
  if(!valid){window.wcs_do();return;}
  // Only one server-confirmed receipt emits a conversion. Form contents are never sent.
  window.wcs_do({cnv:window.wcs.cnv('4','1')});sessionStorage.setItem('haeram-conversion-'+receipt.leadId,'sent');
 }catch(error){/* Advertising failures must not change a successful consultation receipt. */}};
 document.head.appendChild(script);
})();
