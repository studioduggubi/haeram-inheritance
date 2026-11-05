'use strict';
(()=>{
 const track=document.getElementById('office-gallery-track');if(!track)return;
 const slides=[...track.children],buttons=[...document.querySelectorAll('.office-thumb')],title=document.getElementById('office-photo-title'),count=document.getElementById('office-photo-count');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let index=0,timer=0;
 function update(next){index=Math.max(0,Math.min(slides.length-1,next));buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));title.textContent=slides[index].dataset.photoTitle;count.textContent=String(index+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');}
 function move(next){const selected=Math.max(0,Math.min(slides.length-1,next));update(selected);track.scrollTo({left:selected*track.clientWidth,behavior:reduced.matches?'auto':'smooth'});}
 function settle(){update(Math.round(track.scrollLeft/track.clientWidth));}
 buttons.forEach((button,i)=>button.addEventListener('click',()=>move(i)));
 track.addEventListener('scroll',()=>{clearTimeout(timer);timer=setTimeout(settle,150);},{passive:true});track.addEventListener('scrollend',settle);
 track.addEventListener('keydown',event=>{if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;event.preventDefault();move(index+(event.key==='ArrowRight'?1:-1));});
 new ResizeObserver(()=>track.scrollTo({left:index*track.clientWidth,behavior:'auto'})).observe(track);update(0);
})();
