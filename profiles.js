'use strict';
(()=>{
 const tabs=[...document.querySelectorAll('.profile-choice[data-profile]')];if(!tabs.length)return;
 function selectProfile(tab){
  tabs.forEach(button=>{
   const selected=button===tab;
   button.setAttribute('aria-selected',String(selected));
   button.tabIndex=selected?0:-1;
   document.getElementById(button.getAttribute('aria-controls')).hidden=!selected;
  });
 }
 tabs.forEach((tab,index)=>{
  // One native button covers the photograph, name and profession.
  tab.addEventListener('click',()=>selectProfile(tab));
  tab.addEventListener('keydown',event=>{
   let next;
   if(event.key==='ArrowRight')next=(index+1)%tabs.length;
   else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=tabs.length-1;
   else return;
   event.preventDefault();
   selectProfile(tabs[next]);
   tabs[next].focus({preventScroll:true});
  });
 });
 // The default introduction is already visible in HTML, including without JavaScript.
 selectProfile(tabs.find(tab=>tab.getAttribute('aria-selected')==='true')||tabs[0]);
})();
