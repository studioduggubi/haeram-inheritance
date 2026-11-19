/* Anonymous campaign context only: no names, phone numbers, form values or client IDs. */
'use strict';
(()=>{
 if(!['haeram-law.com','www.haeram-law.com'].includes(location.hostname))return;
 const key='haeram-inheritance-attribution-v1',ttl=30*60*1000;
 const terms=new Set(["한정승인","한정승인법무사","한정승인상담","한정승인신청","한정승인비용","상속한정승인","상속포기","상속포기법무사","상속포기상담","상속포기신청","상속포기비용","상속포기절차","상속등기","상속등기법무사","상속등기상담","상속등기신청","상속등기비용","상속등기서류","인천상속포기","인천상속포기법무사","인천한정승인","인천한정승인법무사","검단한정승인","인천상속등기","인천상속등기법무사","인천상속법무사"]);
 const groups=new Set(['grp-a001-01-000000076019242','grp-a001-01-000000076019255','grp-a001-01-000000076019258']);
 const campaign='haeram_inheritance_search';
 const atom=v=>typeof v==='string'&&/^[a-zA-Z0-9_.-]{1,180}$/.test(v)&&!/^0[0-9._-]{8,15}$/.test(v)?v:'';
 const term=v=>terms.has(v)?v:'';
 const optedOut=()=>{try{return localStorage.getItem('haeram-inheritance-analytics-optout')==='1'||navigator.doNotTrack==='1'||navigator.globalPrivacyControl===true;}catch(e){return navigator.doNotTrack==='1'||navigator.globalPrivacyControl===true;}};
 const load=()=>{try{const v=JSON.parse(sessionStorage.getItem(key)||'null');if(v&&v.v===1&&atom(v.source)&&atom(v.medium)&&atom(v.campaign)&&(!v.term||term(v.term))&&(!v.content||atom(v.content))&&(!v.id||atom(v.id))&&['utm','naver_auto'].includes(v.basis)&&Number.isFinite(v.lastAt)&&Date.now()>=v.lastAt&&Date.now()-v.lastAt<ttl)return v;}catch(e){}return null;};
 const remove=()=>{try{sessionStorage.removeItem(key);}catch(e){}};
 let active=null,initialized=false;
 function incoming(){
  const q=new URL(location.href).searchParams;
  const auto=groups.has(q.get('n_ad_group'))&&!!term(q.get('n_keyword'));
  let source=atom(q.get('utm_source')),medium=atom(q.get('utm_medium')),name=atom(q.get('utm_campaign'));
  if(auto){source='naver';medium='cpc';name=campaign;}
  if(!source||!medium||!name)return null;
  const registered=term(q.get('utm_term'))||((auto||(source==='naver'&&medium==='cpc'&&name===campaign))?term(q.get('n_keyword')):'');
  return {v:1,source,medium,campaign:name,term:registered,content:atom(q.get('utm_content')),id:atom(q.get('utm_id')),basis:auto?'naver_auto':'utm',landedAt:Date.now(),lastAt:Date.now()};
 }
 function externalReferrer(){try{if(!document.referrer)return false;const host=new URL(document.referrer).hostname;return !['haeram-law.com','www.haeram-law.com'].includes(host);}catch(e){return false;}}
 function context(){
  if(optedOut()){active=null;remove();return null;}
  if(!initialized){initialized=true;const cached=load(),fresh=incoming();const q=new URL(location.href).searchParams;
   const hasTags=['utm_source','utm_medium','utm_campaign','utm_term','n_ad_group','n_keyword'].some(k=>q.has(k));
   active=fresh||(!hasTags&&!externalReferrer()?cached:null);
   if(!active)remove();
  }
  if(active&&(Date.now()<active.lastAt||Date.now()-active.lastAt>=ttl)){active=null;remove();}
  if(active){active.lastAt=Date.now();try{sessionStorage.setItem(key,JSON.stringify(active));}catch(e){}}
  return active;
 }
 function safeLocation(){
  const u=new URL(location.href),out=new URL(u.origin+u.pathname),c=context();
  for(const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_id','gclid','wbraid','gbraid']){const v=atom(u.searchParams.get(k));if(v)out.searchParams.set(k,v);}
  const t=term(u.searchParams.get('utm_term'));if(t)out.searchParams.set('utm_term',t);
  if(c){out.searchParams.set('utm_source',c.source);out.searchParams.set('utm_medium',c.medium);out.searchParams.set('utm_campaign',c.campaign);if(c.term)out.searchParams.set('utm_term',c.term);if(c.content)out.searchParams.set('utm_content',c.content);if(c.id)out.searchParams.set('utm_id',c.id);}
  return out.href;
 }
 function campaignConfig(){const c=context();if(!c)return {};const out={campaign_source:c.source,campaign_medium:c.medium,campaign_name:c.campaign};if(c.term)out.campaign_term=c.term;if(c.content)out.campaign_content=c.content;if(c.id)out.campaign_id=c.id;return out;}
 function isQa(){const c=context();return !!c&&c.source==='qa_internal'&&c.medium==='qa'&&c.campaign==='haeram_inheritance_tracking_qa'&&new URL(location.href).searchParams.get('analytics_debug')==='1';}
 function eventParams(){
  const c=context(),utc=new Date(),kst=new Date(utc.getTime()+9*60*60*1000);
  const out={registered_keyword:c?.term||'(not set)',attribution_basis:c?.basis||'unavailable',event_hour_kst:String(kst.getUTCHours()).padStart(2,'0'),event_minute_kst:String(kst.getUTCMinutes()).padStart(2,'0'),event_time_utc:utc.toISOString()};
  if(c){out.entry_source=c.source;out.entry_medium=c.medium;out.entry_campaign=c.campaign;}
  if(isQa())out.qa_test='1';
  return out;
 }
 function clear(){active=null;initialized=false;remove();}
 window.haeramAttribution=Object.freeze({safeLocation,campaignConfig,eventParams,isQa,clear});
 context();
})();
