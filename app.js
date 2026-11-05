'use strict';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const menu = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');mobileNav.hidden=true;}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');mobileNav.hidden=!open;});
$$('a',mobileNav).forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(innerWidth>800)closeMenu();},{passive:true});
const tabs = $$('[data-situation]');
function chooseSituation(key,focus=false){
 tabs.forEach(tab=>{const active=tab.dataset.situation===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;$('#'+tab.getAttribute('aria-controls')).hidden=!active;if(active&&focus)tab.focus();});
 $('#memo-topic').value=key;
}
tabs.forEach((tab,i)=>{
 tab.addEventListener('click',()=>chooseSituation(tab.dataset.situation));
 tab.addEventListener('keydown',e=>{let n=i;if(['ArrowDown','ArrowRight'].includes(e.key))n=(i+1)%tabs.length;else if(['ArrowUp','ArrowLeft'].includes(e.key))n=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();chooseSituation(tabs[n].dataset.situation,true);});
});
$$('[data-guide]').forEach(a=>a.addEventListener('click',()=>{chooseSituation(a.dataset.guide);resetMemo();}));
const officePhotos=[['office-consultation.jpg','상담 테이블과 자격증 액자가 있는 해람법무사 사무실'],['office-workspace.jpg','책상과 책장이 놓인 해람법무사 업무 공간'],['office-daylight.jpg','햇살이 드는 해람법무사 사무실 창가'],['office-meeting.jpg','테이블과 의자가 놓인 해람법무사 상담 공간']];
let photoIndex=0;
function changePhoto(delta){photoIndex=(photoIndex+delta+officePhotos.length)%officePhotos.length;const photo=$('#office-photo');photo.src='assets/'+officePhotos[photoIndex][0];photo.alt=officePhotos[photoIndex][1];$('#office-count').textContent=String(photoIndex+1).padStart(2,'0')+' / 04';}
$('#office-prev').addEventListener('click',()=>changePhoto(-1));$('#office-next').addEventListener('click',()=>changePhoto(1));
const topicNames={debt:'남겨진 빚 · 상속포기 · 한정승인',property:'부동산 명의 이전 · 상속등기',tax:'상속재산 · 세금 검토',family:'가족 간 의견 차이',unsure:'무엇부터 할지 모르겠어요'};
const topicQuestions={debt:'재산·채무와 기한을 확인하고, 상속포기·한정승인 중 무엇을 검토해야 할지 알고 싶습니다.',property:'가족관계와 합의 상황에 맞는 상속등기 절차와 필요한 서류를 알고 싶습니다.',tax:'상속등기와 함께 세무 검토가 필요한지, 협업 범위와 비용을 알고 싶습니다.',family:'협의할 수 있는 부분과 변호사 검토가 필요한 부분을 구분하고 싶습니다.',unsure:'지금 먼저 확인할 일과 필요한 상속 절차의 순서를 알고 싶습니다.'};
let memoText='';
function resetMemo(){$('#memo-step-one').hidden=false;$('#memo-result').hidden=true;$('#memo-step').textContent='1 / 2';$('#memo-feedback').textContent='';}
$('#memo-form').addEventListener('submit',e=>{e.preventDefault();const stage=$('input[name=stage]:checked');if(!stage)return;const topic=$('#memo-topic').value;memoText='[해람 상속 상담 메모]\n\n관심 업무: '+topicNames[topic]+'\n현재 상황: '+stage.value+'\n\n상담에서 확인하고 싶은 점\n'+topicQuestions[topic]+'\n\n필요한 서류, 위임 범위와 보수·실비도 함께 안내받고 싶습니다.';$('#memo-text').textContent=memoText;$('#memo-step-one').hidden=true;$('#memo-result').hidden=false;$('#memo-step').textContent='2 / 2';$('#memo-text').focus({preventScroll:true});});
$('#reset-memo').addEventListener('click',()=>{resetMemo();$('#memo-topic').focus({preventScroll:true});});
$('#copy-memo').addEventListener('click',async()=>{try{if(!navigator.clipboard)throw new Error('clipboard unavailable');await navigator.clipboard.writeText(memoText);$('#memo-feedback').textContent='메모를 복사했어요. 카카오톡 대화창에 붙여넣어 주세요.';}catch{$('#memo-feedback').textContent='복사를 사용할 수 없어요. 메모를 선택해 복사하거나 파일로 저장해주세요.';}});
$('#download-memo').addEventListener('click',()=>{const blob=new Blob(['\ufeff'+memoText],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='해람-상속-상담메모.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#memo-feedback').textContent='상담 메모 파일을 저장했어요.';});
// Browsers without JavaScript still receive the full page and native contact links.
