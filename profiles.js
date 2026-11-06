'use strict';
(()=>{
 const triggers=[...document.querySelectorAll('[data-profile]')];if(!triggers.length)return;
 const team=document.getElementById('team');
 function setOpen(key){
  triggers.forEach(button=>{const open=button.dataset.profile===key;button.setAttribute('aria-expanded',String(open));button.textContent=open?'소개 접기':'인사말·경력';const name=button.closest('.person-info').querySelector('h3').firstChild.textContent.trim();button.setAttribute('aria-label',name+(open?' 소개 접기':' 인사말과 경력 보기'));document.getElementById(button.getAttribute('aria-controls')).hidden=!open;});
 }
 function closeProfile(key){
  const trigger=triggers.find(button=>button.dataset.profile===key);setOpen(null);trigger.focus({preventScroll:true});
  const top=team.getBoundingClientRect().top,header=document.querySelector('header').getBoundingClientRect().height;
  if(top<header-1||trigger.getBoundingClientRect().bottom>innerHeight-document.querySelector('.consult-dock').offsetHeight)team.scrollIntoView({behavior:'auto',block:'start'});
 }
 triggers.forEach(button=>button.addEventListener('click',()=>{
  const key=button.dataset.profile;if(button.getAttribute('aria-expanded')==='true'){closeProfile(key);return;}
  setOpen(key);const panel=document.getElementById(button.getAttribute('aria-controls'));
  panel.querySelector('h3').focus({preventScroll:true});
  if(panel.getBoundingClientRect().bottom>innerHeight-document.querySelector('.consult-dock').offsetHeight)panel.scrollIntoView({behavior:'auto',block:'start'});
 }));
 document.querySelectorAll('[data-profile-close]').forEach(button=>button.addEventListener('click',()=>closeProfile(button.dataset.profileClose)));
 document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;const panel=document.activeElement.closest('.profile-detail');if(panel){const button=panel.querySelector('[data-profile-close]');closeProfile(button.dataset.profileClose);}});
})();
