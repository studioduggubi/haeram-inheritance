'use strict';
(()=>{
 const api=window.InheritanceDeadlines;if(!api)return;
 const today=api.koreaToday(),currentYear=today.getUTCFullYear(),currentMonth=today.getUTCMonth()+1,currentDay=today.getUTCDate();
 const widgets=[];
 function options(select,values,suffix,saved){
  const placeholder=new Option(suffix,'');select.replaceChildren(placeholder,...values.map(value=>new Option(value+suffix,String(value))));
  select.value=values.map(String).includes(saved)?saved:'';
 }
 document.querySelectorAll('[data-date-parts]').forEach(group=>{
  const prefix=group.dataset.dateParts,year=group.querySelector('[data-part=year]'),month=group.querySelector('[data-part=month]'),day=group.querySelector('[data-part=day]'),target=document.getElementById(prefix+'-date');
  options(year,Array.from({length:currentYear-1899},(_,i)=>currentYear-i),'년','');
  function refresh(){
   const y=Number(year.value),savedMonth=month.value,savedDay=day.value;
   const months=y===currentYear?currentMonth:12;options(month,Array.from({length:months},(_,i)=>i+1),'월',savedMonth);
   const m=Number(month.value);let days=m?new Date(Date.UTC(y||2024,m,0)).getUTCDate():31;
   if(y===currentYear&&m===currentMonth)days=currentDay;
   options(day,Array.from({length:days},(_,i)=>i+1),'일',savedDay);
   target.value=year.value&&month.value&&day.value?year.value+'-'+month.value.padStart(2,'0')+'-'+day.value.padStart(2,'0'):'';
  }
  [year,month,day].forEach(select=>select.addEventListener('change',refresh));refresh();
  widgets.push({prefix,year,month,day,refresh,fieldset:group.closest('fieldset'),target});
 });
 const toggle=document.getElementById('different-awareness'),aware=widgets.find(item=>item.prefix==='awareness');
 if(toggle&&aware){
  function syncAwareness(){aware.fieldset.disabled=!toggle.checked;if(!toggle.checked){aware.year.value='';aware.month.value='';aware.day.value='';aware.refresh();}}
  toggle.addEventListener('change',syncAwareness);syncAwareness();
 }
})();
