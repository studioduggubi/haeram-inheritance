'use strict';
(()=>{
 const $=(selector,root=document)=>root.querySelector(selector);
 const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
 const menu=$('.menu-toggle'),mobileNav=$('#mobile-nav');
 function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');mobileNav.hidden=true;}
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');mobileNav.hidden=!open;});
 $$('a',mobileNav).forEach(link=>link.addEventListener('click',closeMenu));
 document.addEventListener('click',event=>{if(menu.getAttribute('aria-expanded')==='true'&&!mobileNav.contains(event.target)&&!menu.contains(event.target))closeMenu();});
 window.addEventListener('resize',()=>{if(innerWidth>800)closeMenu();},{passive:true});

 const tabs=$$('[data-situation]'),serviceLink=$('#service-consult');
 function selectTab(index,focus=false){
  tabs.forEach((button,i)=>{const active=index===i;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;$('#'+button.getAttribute('aria-controls')).hidden=!active;if(active){serviceLink.dataset.guide=$('strong',button).textContent.trim();if(focus)button.focus({preventScroll:true});}});
 }
 tabs.forEach((button,i)=>{
  button.addEventListener('click',()=>selectTab(i));
  button.addEventListener('keydown',event=>{let next=i;if(['ArrowRight','ArrowDown'].includes(event.key))next=(i+1)%tabs.length;else if(['ArrowLeft','ArrowUp'].includes(event.key))next=(i-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();selectTab(next,true);});
 });

 // The optional quick picker leaves the original free-entry field intact.
 const concernField=$('#lead-content'),picker=$('.concern-picker');let selectedConcern='';
 function setConcern(value){
  const before=concernField.value.trim(),oldLine=selectedConcern?'[현재 고민] '+selectedConcern:'';
  let details=before;if(oldLine&&(before===oldLine||before.startsWith(oldLine+'\n')))details=before.slice(oldLine.length).trimStart();
  selectedConcern=value;concernField.value=value?'[현재 고민] '+value+(details?'\n'+details:''):details;
  $$('[data-concern]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.concern===value)));
  $('summary',picker).textContent=value?'고민 바꾸기':'고민 고르기';
 }
 $$('[data-concern]').forEach(button=>button.addEventListener('click',()=>{setConcern(selectedConcern===button.dataset.concern?'':button.dataset.concern);picker.open=false;$('summary',picker).focus({preventScroll:true});}));
 document.addEventListener('click',event=>{if(picker.open&&!picker.contains(event.target))picker.open=false;});
 document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;closeMenu();if(picker.open){picker.open=false;$('summary',picker).focus({preventScroll:true});}});

 $$('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const id=link.getAttribute('href');if(!id.startsWith('#')||id==='#')return;const target=$(id);if(!target)return;
  event.preventDefault();closeMenu();picker.open=false;if(link.dataset.guide)setConcern(link.dataset.guide);
  if(link.dataset.close)$('#'+link.dataset.close).close();history.replaceState(null,'',id);
  target.scrollIntoView({behavior:'auto',block:'start'});const heading=$('h1,h2',target);if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
 }));

 const privacy=$('#privacy-dialog');[$('#privacy-open'),$('#privacy-footer')].forEach(button=>button.addEventListener('click',()=>privacy.showModal()));
 $('#privacy-close').addEventListener('click',()=>privacy.close());$('#deadline-basis').addEventListener('click',()=>$('#basis-dialog').showModal());
 $$('button[data-close]').forEach(button=>button.addEventListener('click',()=>$('#'+button.dataset.close).close()));
 $$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}));

 const dates=window.InheritanceDeadlines,form=$('#deadline-form'),death=$('#death-date'),aware=$('#awareness-date'),different=$('#different-awareness'),lead=$('#lead-death');
 const cards=['deadline-civil','deadline-tax','deadline-acquisition'].map(id=>$('#'+id));
 const calculator=$('#deadline'),calcNote=$('#deadline .calculator-note p'),calcDetails=$('#deadline-calculation-details');
 const normalNote='2026·2027년 공휴일 반영. 개별 사정에 따라 달라질 수 있습니다.';
 const state=$('#deadline-state'),reference=$('#deadline-reference'),action=$('#deadline-action'),cta=$('#deadline-cta');
 const defaults=[['3개월','상속개시를 안 날 기준','기본 기한 · 날짜 입력 전'],['6개월','사망한 달의 말일 기준','일반적인 국내 거주자 기준'],['6개월','사망한 달의 말일 기준','상속등기 기한과 구별']];
 let lastCalculation=null,hasCalculated=false,autoDeathText=null,autoDeathSource=null;
 lead.addEventListener('input',()=>{autoDeathText=null;autoDeathSource=null;});
 function resetResults(stale){
  calculator.classList.remove('has-result');calculator.classList.toggle('is-stale',stale);calcNote.textContent=normalNote;calcDetails.textContent='날짜를 계산하면 절차별 기본 날짜와 휴일 반영 여부를 여기에서 확인할 수 있습니다.';
  cards.forEach((card,i)=>{card.classList.remove('is-urgent','is-ready','is-past','is-adjusted');card.classList.toggle('is-pending',stale);$('.dday',card).textContent=stale?'—':defaults[i][0];$('.due-date',card).textContent=stale?'다시 계산해주세요':defaults[i][1];$('small',card).textContent=stale?'날짜 변경 · 재계산 전':defaults[i][2];});
  reference.hidden=true;reference.textContent='';action.hidden=true;action.classList.remove('is-urgent');
 }
 function currentInput(){return {death:death.value,awareness:different.checked?aware.value:death.value};}
 function inputChanged(){
  $('#date-error').textContent='';
  // Only a value that is still our own automatic copy may be cleared.
  if(autoDeathText&&death.value!==autoDeathSource){if(lead.value===autoDeathText)lead.value='';autoDeathText=null;autoDeathSource=null;}
  const now=currentInput();
  if(hasCalculated&&(!lastCalculation||now.death!==lastCalculation.death||now.awareness!==lastCalculation.awareness)){
   resetResults(true);lastCalculation=null;state.textContent='날짜가 바뀌었습니다. 다시 계산해주세요.';
  }
 }
 different.addEventListener('change',()=>{$('#awareness-field').hidden=!different.checked;});
 form.addEventListener('change',inputChanged);
 form.addEventListener('submit',event=>{
  event.preventDefault();$('#date-error').textContent='';
  try{
   const input=currentInput(),result=dates.calculate(input.death,input.awareness);
   result.forEach((item,i)=>{const card=cards[i];card.classList.remove('is-urgent','is-ready','is-past','is-pending');card.classList.toggle('is-adjusted',item.adjusted);card.classList.add(item.days<0?'is-past':item.days<=30?'is-urgent':'is-ready');$('.dday',card).textContent=item.days<0?'기한 경과':item.days===0?'D-DAY':'D-'+item.days;$('.due-date',card).textContent=item.date.replace(/-/g,'.');$('small',card).textContent=!item.holidayVerified?'휴일 미반영 기본 날짜':item.adjusted?'휴일 연장 반영':i===0?'상속개시를 안 날 + 3개월':i===1?'사망한 달 말일 + 6개월':'취득세 신고·납부 기준';});
   calcNote.textContent=result.every(item=>item.holidayVerified)?normalNote:'휴일 미반영 기본 날짜입니다. 개별 기한은 확인이 필요합니다.';
   const labels=['한정승인·상속포기','상속세','상속 부동산 취득세'];calcDetails.replaceChildren(...result.map((item,i)=>{const line=document.createElement('p');line.textContent=labels[i]+': 기본 '+item.baseDate.replace(/-/g,'.')+' / '+(item.holidayVerified?'휴일 반영 '+item.date.replace(/-/g,'.'):'공휴일 자료 범위 밖으로 기본 날짜만 표시');return line;}));
   const syncLead=!lead.value||(autoDeathText&&lead.value===autoDeathText);
   lastCalculation=input;hasCalculated=true;state.textContent='';reference.hidden=false;calculator.classList.add('has-result');calculator.classList.remove('is-stale');
   reference.textContent='사망일 '+input.death.replace(/-/g,'.')+(syncLead?' · 상담란에도 표시':' · 상담란 직접 입력 유지')+(input.awareness!==input.death?' · 상속개시를 안 날 '+input.awareness.replace(/-/g,'.'):'');
   const civil=result[0];action.hidden=false;action.classList.toggle('is-urgent',civil.days>=0&&civil.days<=30);
   if(civil.days<0){$('#deadline-message').textContent='기본 기한이 지났습니다. 예외 여부를 확인해야 합니다.';cta.href='tel:050714146860';cta.textContent='전화상담';}
   else if(civil.days<=30){$('#deadline-message').textContent='기한이 얼마 남지 않았습니다. 급한 상황은 전화로 알려주세요.';cta.href='tel:050714146860';cta.textContent='전화상담';}
   else{$('#deadline-message').textContent='필요한 절차와 준비할 내용을 살펴보세요.';cta.href='#situations';cta.textContent='상속 업무 보기';}
   if(syncLead){autoDeathText=input.death.replace(/-/g,'.');autoDeathSource=input.death;lead.value=autoDeathText;}
  }catch(error){resetResults(hasCalculated);lastCalculation=null;$('#date-error').textContent=error.message;}
 });
})();
