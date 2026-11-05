'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const menu=$('.menu-toggle'),mobileNav=$('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');mobileNav.hidden=true;}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');mobileNav.hidden=!open;});
$$('a',mobileNav).forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(innerWidth>800)closeMenu();},{passive:true});
function tabGroup(buttons,attribute,onChange){
 function select(index,focus=false){buttons.forEach((b,i)=>{const active=i===index;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;$('#'+b.getAttribute('aria-controls')).hidden=!active;if(active&&focus)b.focus({preventScroll:true});});onChange?.(index);}
 buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{let next=i;if(['ArrowRight','ArrowDown'].includes(e.key))next=(i+1)%buttons.length;else if(['ArrowLeft','ArrowUp'].includes(e.key))next=(i-1+buttons.length)%buttons.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=buttons.length-1;else return;e.preventDefault();select(next,true);});});return select;
}
tabGroup($$('[data-situation]'),'data-situation');tabGroup($$('[data-step]'),'data-step');
const peopleButtons=$$('[data-person]'),cards=$$('.person-card');let selectedPerson=0;
function paintPeople(focus=false){const compact=matchMedia('(max-width:800px)').matches;cards.forEach((card,i)=>{card.hidden=compact&&i!==selectedPerson;card.classList.toggle('is-active',i===selectedPerson);});peopleButtons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===selectedPerson));b.tabIndex=i===selectedPerson?0:-1;if(i===selectedPerson&&focus)b.focus({preventScroll:true});});}
peopleButtons.forEach((b,i)=>{b.addEventListener('click',()=>{selectedPerson=i;paintPeople();});b.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();selectedPerson=e.key==='Home'?0:e.key==='End'?2:(selectedPerson+(e.key==='ArrowRight'?1:2))%3;paintPeople(true);});});
matchMedia('(max-width:800px)').addEventListener('change',()=>paintPeople());paintPeople();
$$('.cost-items details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.cost-items details').filter(v=>v!==d).forEach(v=>v.open=false);}));
$$('.faq-list details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.faq-list details').filter(v=>v!==d).forEach(v=>v.open=false);}));
const officePhotos=[['office-consultation.jpg','상담 테이블과 자격증 액자가 있는 해람법무사 사무실'],['office-workspace.jpg','책상과 책장이 놓인 해람법무사 업무 공간'],['office-daylight.jpg','햇살이 드는 해람법무사 사무실 창가'],['office-meeting.jpg','테이블과 의자가 놓인 해람법무사 상담 공간']];let photoIndex=0;
function changePhoto(delta){photoIndex=(photoIndex+delta+officePhotos.length)%officePhotos.length;const photo=$('#office-photo');photo.src='assets/'+officePhotos[photoIndex][0];photo.alt=officePhotos[photoIndex][1];$('#office-count').textContent=String(photoIndex+1).padStart(2,'0')+' / 04';}
$('#office-prev').addEventListener('click',()=>changePhoto(-1));$('#office-next').addEventListener('click',()=>changePhoto(1));
$$('a[href="#consult"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();closeMenu();const title=$('#consult-title');title.tabIndex=-1;title.focus({preventScroll:true});history.replaceState(null,'','#consult');$('#consult').scrollIntoView({behavior:'instant',block:'start'});}));
const privacy=$('#privacy-dialog');[$('#privacy-open'),$('#privacy-footer')].forEach(b=>b.addEventListener('click',()=>privacy.showModal()));$('#privacy-close').addEventListener('click',()=>privacy.close());privacy.addEventListener('click',e=>{if(e.target===privacy){const r=privacy.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)privacy.close();}});
const detailDialog=$('#detail-dialog');
$$('.faq-list details,.cost-items details').forEach(detail=>{
 const summary=$('summary',detail);summary.setAttribute('aria-haspopup','dialog');
 summary.addEventListener('click',e=>{e.preventDefault();$('#detail-title').textContent=summary.textContent.replace(/\+/g,'').replace(/\s+/g,' ').trim();const body=$('#detail-body');body.replaceChildren(...[...detail.children].filter(n=>n!==summary).map(n=>n.cloneNode(true)));detailDialog.showModal();});
});
$('#detail-close').addEventListener('click',()=>detailDialog.close());
$('.dialog-apply').addEventListener('click',e=>{e.preventDefault();detailDialog.close();history.replaceState(null,'','#consult');$('#consult').scrollIntoView({behavior:'instant',block:'start'});});
function adaptShortScreen(){if(document.activeElement?.matches('input,textarea,select'))return;const h=$('.site-header').getBoundingClientRect().height,d=getComputedStyle($('.mobile-dock')).display==='none'?0:$('.mobile-dock').getBoundingClientRect().height;document.documentElement.classList.toggle('short-screen',innerWidth<=800&&innerHeight-h-d<520);}
window.addEventListener('resize',adaptShortScreen,{passive:true});adaptShortScreen();
document.addEventListener('focusin',e=>{if(e.target.matches('input,textarea,select'))document.documentElement.classList.add('form-editing');});
document.addEventListener('focusout',()=>{requestAnimationFrame(()=>{if(!document.activeElement?.matches('input,textarea,select')){document.documentElement.classList.remove('form-editing');adaptShortScreen();}});});
