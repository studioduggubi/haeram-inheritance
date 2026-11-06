'use strict';
(()=>{
 const path=location.pathname;
 if(path!=='/index.php'&&path!=='/bbs/write.php')return;
 const params=new URLSearchParams(location.search);
 if(path==='/bbs/write.php'&&params.get('bo_table')!=='cs')return;
 const target=new URL('/',location.origin);
 for(const [key,value]of params)if(/^(utm_[a-z_]+|gclid|wbraid|gbraid|n_keyword|n_campaign_type|n_media|n_query|n_rank|n_ad_group|n_ad|n_campaign|n_match|n_source)$/.test(key))target.searchParams.append(key,value);
 if(path==='/bbs/write.php')target.hash='consult';
 else if(location.hash)target.hash=location.hash;
 location.replace(target.href);
})();
