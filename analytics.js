/* GA4: production-only, no form values, no automatic form/history tracking. */
'use strict';
(()=>{
 const node=document.getElementById('analytics-config');if(!node)return;
 let config;try{config=JSON.parse(node.textContent);}catch(e){return;}
 const id=config.measurementId;if(!/^G-[A-Z0-9]+$/.test(id||''))return;
 if(!['haeram-law.com','www.haeram-law.com'].includes(location.hostname))return;
 if(!['/','/index.html','/thank-you.html'].includes(location.pathname))return;
 const optKey='haeram-inheritance-analytics-optout';let volatileOptOut=false,started=false;
 const read=k=>{try{return localStorage.getItem(k);}catch(e){return null;}};
 const disabled=()=>volatileOptOut||read(optKey)==='1'||navigator.doNotTrack==='1'||navigator.globalPrivacyControl===true;
 const paidTerms=new Set(["한정승인","한정승인법무사","한정승인상담","한정승인신청","한정승인비용","상속한정승인","상속포기","상속포기법무사","상속포기상담","상속포기신청","상속포기비용","상속포기절차","상속등기","상속등기법무사","상속등기상담","상속등기신청","상속등기비용","상속등기서류"]);
 const safeLocation=()=>{const u=new URL(location.href),out=new URL(u.origin+u.pathname);for(const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_id','gclid','wbraid','gbraid']){const v=u.searchParams.get(k);if(v&&v.length<=180&&!/@|\b0\d{8,10}\b/.test(v))out.searchParams.set(k,v);}const term=u.searchParams.get('utm_term');if(u.searchParams.get('utm_source')==='naver'&&u.searchParams.get('utm_medium')==='cpc'&&u.searchParams.get('utm_campaign')==='haeram_inheritance_search'&&paidTerms.has(term))out.searchParams.set('utm_term',term);return out.href;};
 const safeReferrer=()=>{try{return document.referrer?new URL(document.referrer).origin+'/':'';}catch(e){return '';}};
 const button=document.getElementById('analytics-optout'),status=document.getElementById('analytics-choice');
 function showChoice(){if(button)button.textContent=disabled()?'방문 통계 사용하기':'방문 통계 사용 안 함';if(status)status.textContent=disabled()?'현재 이 브라우저에서 방문 통계를 수집하지 않습니다.':'현재 이 브라우저에서 방문 통계를 수집합니다.';}
 if(button)button.addEventListener('click',()=>{const off=!disabled();volatileOptOut=off;try{localStorage.setItem(optKey,off?'1':'0');}catch(e){}window['ga-disable-'+id]=off;if(off){for(const cookie of document.cookie.split(';')){const name=cookie.split('=')[0].trim();if(name.startsWith('haeram_inheritance_ga'))for(const domain of ['', ';domain='+location.hostname,';domain=.haeram-law.com'])document.cookie=name+'=;max-age=0;path=/'+domain;}}else start();showChoice();});
 showChoice();
 const once=new Set(),sectionIds=['home','deadline','situations','team','youtube','process','consult','contact'];
 function event(name,params={}){if(disabled()||!started)return;window.gtag('event',name,{send_to:id,service:'inheritance',page_location:safeLocation(),page_referrer:safeReferrer(),...params});}
 function mark(name,params){if(disabled()||!started)return;const key=name+JSON.stringify(params);if(once.has(key))return;once.add(key);event(name,params);}
 function receiptValid(r){return r&&!r.isTest&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(r.leadId||'')&&Number.isFinite(r.confirmedAt)&&Date.now()-r.confirmedAt>=0&&Date.now()-r.confirmedAt<1800000;}
 function lead(r){if(!receiptValid(r)||disabled())return;const key='haeram-ga4-lead-'+r.leadId;let seen=false;try{seen=sessionStorage.getItem(key)==='sent';}catch(e){}if(seen||once.has(key))return;once.add(key);event('generate_lead',{method:'form'});try{sessionStorage.setItem(key,'sent');}catch(e){}}
 function placement(el){if(el.closest('header'))return 'header';if(el.closest('.consult-dock'))return 'dock';if(el.closest('footer'))return 'footer';const s=el.closest('section');return s&&sectionIds.includes(s.id)?s.id:'page';}
 function start(){if(started||disabled())return;started=true;window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('set',{page_location:safeLocation(),page_referrer:safeReferrer()});window.gtag('config',id,{send_page_view:false,...(new URL(location.href).searchParams.get('analytics_debug')==='1'?{debug_mode:true}:{}),page_location:safeLocation(),page_referrer:safeReferrer(),allow_google_signals:false,allow_ad_personalization_signals:false,cookie_prefix:'haeram_inheritance',cookie_expires:31536000,cookie_flags:'SameSite=Lax;Secure'});event('page_view',{page_title:document.title});const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(script);
  if(location.pathname==='/thank-you.html'){try{lead(JSON.parse(sessionStorage.getItem('haeram-inheritance-receipt')||'null'));}catch(e){}}
 }
 start();
 document.addEventListener('haeram:lead-confirmed',e=>lead(e.detail));
 document.addEventListener('haeram:submit-attempt',()=>event('consult_submit',{method:'form'}));
 document.addEventListener('haeram:submit-error',()=>event('consult_error',{method:'form'}));
 const calculator=document.getElementById('deadline-form');if(calculator)calculator.addEventListener('submit',()=>setTimeout(()=>{const r=document.getElementById('deadline-civil');if(r&&/\d{4}\.\d{2}\.\d{2}/.test(r.textContent))event('deadline_calculate',{});},0));
 const form=document.getElementById('inheritance-form');if(form){
  form.addEventListener('focusin',()=>mark('form_start',{method:'form'}));
  // Only the completed step is measured. Phone values remain inside this handler.
  const contactReady=e=>{const input=e.target;if(!input||input.name!=='phone')return;const digits=String(input.value||'').replace(/\D/g,'');if(/^0\d{8,10}$/.test(digits)&&digits!=='01000000000')mark('contact_field_complete',{method:'form'});};
  for(const type of ['change','focusout'])form.addEventListener(type,contactReady);
 }
 document.addEventListener('click',e=>{
  const a=e.target.closest('a');if(a){const href=a.getAttribute('href')||'',where=placement(a);if(href.startsWith('tel:'))event('contact_click',{contact_method:'phone',placement:where});else if(/^https:\/\/pf\.kakao\.com\//.test(href))event('contact_click',{contact_method:'kakao',placement:where});else if(href==='#consult'||href==='./#consult')event('consult_open',{placement:where});else if(/^https:\/\/(www\.)?youtube\.com\//.test(href))event('video_outbound',{placement:where});}
  const service=e.target.closest('[role=tab][id^=tab-]');if(service){const type=service.id.replace('tab-','');if(['limited','renounce','property','tax','family'].includes(type))event('service_select',{service_type:type});}
  const expert=e.target.closest('[role=tab][id^=profile-toggle-]');if(expert){const name=expert.id.replace('profile-toggle-','');if(['haeram','dongwoon','jeongryul'].includes(name))event('expert_select',{expert_name:name});}
  const video=e.target.closest('[data-inheritance-video]');if(video&&['FYYGHho6B8s','f77E4Gz97pc'].includes(video.dataset.inheritanceVideo))event('video_select',{video_id:video.dataset.inheritanceVideo});
 });
 if(typeof IntersectionObserver==='function'){const observer=new IntersectionObserver(entries=>{for(const x of entries)if(x.isIntersecting&&!disabled()&&started){mark('section_view',{section_name:x.target.id});observer.unobserve(x.target);}},{threshold:0.35});for(const section of document.querySelectorAll('main>section'))if(sectionIds.includes(section.id))observer.observe(section);}
 window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;if(max<=0)return;const percent=Math.round(scrollY/max*100);for(const n of [25,50,75,90])if(percent>=n)mark('scroll',{percent_scrolled:n});},{passive:true});
})();
