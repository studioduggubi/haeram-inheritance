/* Public-holiday dates checked 2026-11-06. KASA annual almanacs + MPM 2026 amendments.
   Unsupported years deliberately return no holiday-adjusted deadline.
   Sources: https://www.kasa.go.kr/prog/plcyBrf/brief/kor/sub01_01_04/view.do?plcyBrfNo=431
   https://www.kasa.go.kr/bbs/BBSMSTR_000000000010/view.do?nttId=B000000001860Pe2zT3
   https://www.mpm.go.kr/mpm/comm/newsPress/newsPressRelease/?boardId=bbs_0000000000000029&cntId=4250&mode=view
*/
(function(root){
 'use strict';
 const data={checkedOn:'2026-11-06',years:{
  2026:['01-01','02-16','02-17','02-18','03-01','03-02','05-01','05-05','05-24','05-25','06-03','06-06','07-17','08-15','08-17','09-24','09-25','09-26','10-03','10-05','10-09','12-25'],
  2027:['01-01','02-06','02-07','02-08','02-09','03-01','05-01','05-03','05-05','05-13','06-06','07-17','07-19','08-15','08-16','09-14','09-15','09-16','10-03','10-04','10-09','10-11','12-25','12-27']
 }};
 if(typeof module!=='undefined'&&module.exports)module.exports=data;else root.HaeramHolidayCalendar=data;
})(typeof window!=='undefined'?window:this);
