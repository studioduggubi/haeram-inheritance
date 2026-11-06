'use strict';
(()=>{
 const triggers=[...document.querySelectorAll('[data-profile]')];if(!triggers.length)return;
 function setOpen(key){
  triggers.forEach(button=>{const open=button.dataset.profile===key;button.setAttribute('aria-expanded',String(open));button.textContent=open?'소개 접기':'인사말·경력';const name=button.closest('.person-card').querySelector('.person-info h3').firstChild.textContent.trim();button.setAttribute('aria-label',name+(open?' 소개 접기':' 인사말과 경력 보기'));document.getElementById(button.getAttribute('aria-controls')).hidden=!open;});
 }
 function closeProfile(key){
  const trigger=triggers.find(button=>button.dataset.profile===key);setOpen(null);
  trigger.focus({preventScroll:true});
 }
 // A disclosure opens in place. Keep the reader at the portraits and controls.
 triggers.forEach(button=>button.addEventListener('click',()=>{
  const key=button.dataset.profile;
  if(button.getAttribute('aria-expanded')==='true'){closeProfile(key);return;}
  setOpen(key);
 }));
 document.querySelectorAll('[data-profile-close]').forEach(button=>button.addEventListener('click',()=>closeProfile(button.dataset.profileClose)));
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const active=document.activeElement;
  const panel=active.closest('.profile-detail:not([hidden])');
  const trigger=active.closest('[data-profile][aria-expanded="true"]');
  const key=panel?panel.querySelector('[data-profile-close]').dataset.profileClose:trigger?.dataset.profile;
  if(key){event.preventDefault();closeProfile(key);}
 });
})();
