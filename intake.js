'use strict';
(()=>{
 const form=document.getElementById('inheritance-form');if(!form)return;
 const config=JSON.parse(document.getElementById('intake-config').textContent);
 const submitButton=form.querySelector('[type=submit]');
 submitButton.addEventListener('click',event=>{if(typeof form.requestSubmit==='function'){event.preventDefault();form.requestSubmit();}});
 const error=document.getElementById('intake-error');let requestId=null,submitting=false;const startedAt=Date.now();
 function newId(){const bytes=new Uint8Array(16);crypto.getRandomValues(bytes);bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;const s=[...bytes].map(v=>v.toString(16).padStart(2,'0')).join('');return s.slice(0,8)+'-'+s.slice(8,12)+'-'+s.slice(12,16)+'-'+s.slice(16,20)+'-'+s.slice(20);}
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(submitting)return;error.textContent='';
  const data=new FormData(form),phone=String(data.get('phone')||'').replace(/\D/g,'');
  if(!/^0\d{8,10}$/.test(phone)){error.textContent='연락받으실 전화번호를 확인해주세요.';document.getElementById('lead-phone').focus();return;}
  const fields=['name','area','relationship','deceased_at','content'];if(fields.some(k=>!String(data.get(k)||'').trim())){error.textContent='모든 항목을 입력해주세요.';return;}
  if(data.get('consent')!=='on'){error.textContent='개인정보 수집·이용 동의가 필요합니다.';return;}
  const button=form.querySelector('[type=submit]');submitting=true;button.disabled=true;button.textContent='상담 신청을 보내고 있습니다…';
  try{
   if(!requestId)requestId=newId();
   const payload=new URLSearchParams({service:'inheritance',request_id:requestId,name:String(data.get('name')).trim(),phone,area:String(data.get('area')).trim(),relationship:String(data.get('relationship')).trim(),deceased_at:String(data.get('deceased_at')).trim(),content:String(data.get('content')).trim(),consent:'true',consent_version:config.consentVersion,website:String(data.get('website')||''),started_at:String(startedAt)});
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);let response;
   try{response=await fetch(config.endpoint,{method:'POST',body:payload,redirect:'follow',signal:controller.signal});}finally{clearTimeout(timer);}
   const result=await response.json();if(!response.ok||!result.ok||result.leadId!==requestId)throw new Error(result.code||'NOT_RECORDED');
   document.getElementById('success-phone').textContent=phone.slice(0,3)+'-****-'+phone.slice(-4);form.hidden=true;const success=document.getElementById('intake-success');success.hidden=false;success.querySelector('h3').focus({preventScroll:true});
  }catch(err){error.textContent='접수 결과를 확인하지 못했습니다. 입력 내용은 그대로입니다. 다시 신청하거나 0507-1414-6860으로 연락해주세요.';button.disabled=false;button.textContent='무료 상담 다시 신청';}
  finally{submitting=false;}
 });
})();
