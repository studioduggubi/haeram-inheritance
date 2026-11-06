'use strict';
(()=>{
 const triggers=[...document.querySelectorAll('[data-profile]')];if(!triggers.length)return;
 function showProfile(key){
  triggers.forEach(button=>{
   const selected=button.dataset.profile===key;
   const name=button.closest('.person-card').querySelector('.person-info h3').textContent.trim();
   button.setAttribute('aria-pressed',String(selected));
   button.textContent=selected?'인사말 열림':'인사말·경력';
   button.setAttribute('aria-label',name+(selected?' 인사말과 경력 펼쳐짐':' 인사말과 경력 보기'));
   document.getElementById(button.getAttribute('aria-controls')).hidden=!selected;
  });
 }
 // Keep one introduction visible. Selecting a profile never scrolls or moves focus.
 triggers.forEach(button=>button.addEventListener('click',()=>showProfile(button.dataset.profile)));
 showProfile((triggers.find(button=>button.getAttribute('aria-pressed')==='true')||triggers[0]).dataset.profile);
})();
