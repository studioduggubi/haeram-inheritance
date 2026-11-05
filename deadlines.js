/* Civil and tax dates have different starting points. Dates below are before holiday extensions. */
(function(root){
 'use strict';
 function parse(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;const [y,m,d]=value.split('-').map(Number);if(y<1900||y>2200)return null;const date=new Date(Date.UTC(y,m-1,d));return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d?date:null;}
 function iso(date){return date.toISOString().slice(0,10);}
 function addMonths(date,n){const y=date.getUTCFullYear(),m=date.getUTCMonth()+n;const last=new Date(Date.UTC(y,m+1,0)).getUTCDate();return new Date(Date.UTC(y,m,Math.min(date.getUTCDate(),last)));}
 function taxDue(date){return new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth()+7,0));}
 function koreaToday(){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());return parse(['year','month','day'].map(k=>parts.find(p=>p.type===k).value).join('-'));}
 function calculate(deathValue,awarenessValue,todayValue){const death=parse(deathValue),aware=parse(awarenessValue||deathValue),today=todayValue?parse(todayValue):koreaToday();if(!death||!aware||!today)throw new Error('정확한 날짜를 입력해주세요.');if(death>today||aware>today)throw new Error('미래 날짜는 입력할 수 없습니다.');if(aware<death)throw new Error('상속개시가 있음을 안 날은 사망일보다 빠를 수 없습니다.');const tax=taxDue(death);return [addMonths(aware,3),tax,tax].map(date=>({date:iso(date),days:Math.round((date-today)/86400000)}));}
 const api={parse,iso,addMonths,taxDue,calculate,koreaToday};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.InheritanceDeadlines=api;
})(typeof window!=='undefined'?window:this);
