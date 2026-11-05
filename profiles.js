'use strict';
(()=>{
 const triggers=[...document.querySelectorAll('[data-profile]')];
 if(!triggers.length)return;
 function setOpen(key){
  triggers.forEach(button=>{
   const isOpen=button.dataset.profile===key;
   button.setAttribute('aria-expanded',String(isOpen));
   button.textContent=isOpen?'소개 접기':'인사말·경력';
   const name=button.closest('.person-info').querySelector('h3').firstChild.textContent.trim();
   button.setAttribute('aria-label',name+(isOpen?' 소개 접기':' 인사말과 경력 보기'));
   document.getElementById(button.getAttribute('aria-controls')).hidden=!isOpen;
  });
 }
 triggers.forEach(button=>button.addEventListener('click',()=>setOpen(button.getAttribute('aria-expanded')==='true'?null:button.dataset.profile)));
 document.querySelectorAll('[data-profile-close]').forEach(button=>button.addEventListener('click',()=>{
  const trigger=triggers.find(item=>item.dataset.profile===button.dataset.profileClose);
  setOpen(null);trigger.focus();
 }));
})();
