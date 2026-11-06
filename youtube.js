'use strict';
(()=>{
 const player=document.getElementById('inheritance-youtube-player');if(!player)return;
 const choices=[...document.querySelectorAll('[data-inheritance-video]')];
 const title=document.getElementById('inheritance-video-title'),topic=document.getElementById('inheritance-video-topic'),watch=document.getElementById('inheritance-video-watch'),status=document.getElementById('inheritance-video-status');
 choices.forEach(button=>button.addEventListener('click',()=>{
  if(button.getAttribute('aria-pressed')==='true')return;
  const id=button.dataset.inheritanceVideo,name=button.dataset.videoTitle;
  if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;
  player.src='https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0&playsinline=1';
  player.title='해람법무사 — '+name;title.textContent=name;topic.textContent=button.dataset.videoTopic;
  watch.href='https://www.youtube.com/watch?v='+id;
  choices.forEach(choice=>{const active=choice===button;choice.setAttribute('aria-pressed',String(active));choice.querySelector('.video-choice-state').textContent=active?'현재 영상':'이 영상 재생';});
  status.textContent='선택한 영상: '+name;
  // The selected card moves to the player caption on compact screens.
  // Return focus to a visible control without moving the page.
  if(matchMedia('(max-width:800px)').matches)watch.focus({preventScroll:true});
 }));
})();
