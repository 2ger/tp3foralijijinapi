﻿xh5_define("datas.hq",["utils.util"],function(t){var e=t.load,i=t.fBind,a=t.market,r=t.cookieUtil,n=t.dateUtil,s=t.tUtil,o=0==location.protocol.indexOf("https:"),l=t.HQ_DOMAIN,u=new function(){var t,i="sinaH5EtagStatus",a={domain:"",path:"/",expires:3600},n="n",s="y",u=0,h=__quoteapi+"?token="+__token+"&list2=sys_hqEtagMode",c=function(){e(h,function(){var e=window.hq_str_sys_hqEtagMode;0==u?u=e:(u==e?(t=!1,r.set(i,n,a)):(t=!0,r.set(i,s,a)),u=0)})},d=function(){var e=r.get(i);switch(e){case n:t=!1;break;case s:t=!0;break;default:t=!1,c()}};d(),setInterval(d,2000),this.isETag=function(){return t}},h=function(){function r(e,i,a){var r={},n=b[e];n||(n={symbol:e},b[e]=n);var s=w.trHandler(a,n);s&&(n.trstr=a),r[e]=n;var o={msg:"",dataObj:r};return t.isFunc(i)&&i(o),o}function h(t){return/^nf_(IF|IC|IH|TF)\w+$/.test(t)?"CFF":/^nf_T(\d{4}|0)$/.test(t)?"CFF":"NF"}function c(e,i,r,n){if(n&&--n.count>0){return null}for(var s,o,l,u,c,d,m=e.split(","),f=[],p={},b=0,_=m.length;_>b;b++){if(s=m[b],l=g[s],l||(l={symbol:s},g[s]=l),o=a(s),r){u=r}else{}d=u&&u.length>0?u.split(","):void 0;var v;switch(o){case"CN":v=w;break;case"CNI":v=w;break;case"US":v=k;break;case"HK":v=P;break;case"OTC":v=I;break;case"HF":v=M;break;case"NF":v="CFF"==h(s)?y:O;break;case"global_index":v=x;break;case"fund":v=D;break;case"op_m":case"option_cn":v=C;break;case"forex":case"forex_yt":v=T;break;case"CFF":v=y;break;case"BTC":v=S;break;default:v=void 0}var E=!0;v&&(E=v.update(d,l,c,N)),E&&(l.hqstr=u),f.push(l),((__rcallback!=undefined&&l.symbol!="sys_time")?__rcallback(l):void (0)),p[s]=l}var R={msg:"",data:f,dataObj:p};return t.isFunc(i)&&i(R),R}function d(e){var i=40,a=e.split(","),r=[];for(a=t.uae(a);a.length>i;){r.push(a.splice(0,i))}return r.push(a.splice(0,a.length)),r}this.VER="2.6.17";var m,f={"00":"","01":"\u505c\u724c\u4e00\u5c0f\u65f6","02":"\u505c\u724c\u4e00\u5929","03":"\u8fde\u7eed\u505c\u724c","04":"\u76d8\u4e2d\u505c\u724c","05":"\u505c\u724c\u534a\u5929","06":"\u505c\u724c\u534a\u5c0f\u65f6","07":"\u6682\u505c","08":"\u53ef\u6062\u590d\u4ea4\u6613\u7194\u65ad","09":"\u4e0d\u53ef\u6062\u590d\u4ea4\u6613\u7194\u65ad"},p=(new Date).getTime(),g={},b={},_=new function(){var t=l+".sinajs.cn",i=__quoteapi+"?token="+__token+"&_=$rn&list2=$symbol",a=__quoteapi+"?token="+__token+"&_="+p+"&list2=$symbol",r=function(t){var e,r=o?"https":t.ssl?"https":"http";return e=t.cancelEtag?r+i.replace("$rn",String(Math.random())):r+(u.isETag()?a:i.replace("$rn",String(Math.random())))};return function(t,i,a){a=a||{},e(r(a).replace("$symbol",t),i)}},N=function(t){var e=t.timeStr||"",i=t.dateStr||"",a=t.tArr||void 0,r=t.hqObj||{},o=t.dateDiv||"-",l=e.split(":"),u=Number(l[0])||0,h=Number(l[1])||0,c=Number(l[2])||0,d=[s.s0(u),s.s0(h)].join(":"),m=0/0;if(a){if(a.indexOf){m=a.indexOf(d)}else{for(var f=a.length;f--;){if(a[f]==d){m=f;break}}}}var p={time:d,isUpdateTime:isNaN(m)?!0:Boolean(m>=0),index:m},g=i.split(o),b=~~Number(g[0]),_=~~(Number(g[1])-1),N=~~Number(g[2]),v={isErrData:!1,isDateChange:!1,date:r.date,today:[b,_+1,N].join("-")};if(r.date){var S=new Date(b,_,N,u,h,c),T=n.stbd(r.date,S);T?S>=r.date?v.date.setHours(u,h,c):v.isErrData=!0:(v.isDateChange=Boolean(S>r.date),v.isDateChange?v.date=S:v.isErrData=!0)}else{i?v.date=new Date(b,_,N,u,h,c):v.isErrData=!0}return{datePart:v,timePart:p}},v={swap:function(t){var e,i=t.split(","),a="";i[8]="TP"==i[8]?"03":"00",e=[0,4,3,7,5,6,26,46,10,11,36,26,37,27,38,28,39,29,40,30,56,46,57,47,58,48,59,49,60,50,2,1,8];for(var r=0;r<e.length;r++){a+=i[e[r]]+","}return a=a.slice(0,a.length-1)},kak:function(t,e){var i;switch(e){case"CN_2":i=this.swap(t);break;default:i=t}return i}},S=new function(){var t;this.update=function(e,i){if(!e){return !1}t||(t=s.gtr([["0:00","23:59"]]));var a=t,r="00:00",n=e[11],o=e[0],l=N({dateStr:n,timeStr:o,hqObj:i,tArr:a,start:r});if(l.datePart.isErrData){return !1}i.date=l.datePart.date,i.today=l.datePart.today,i.time=l.timePart.time,i.index=l.timePart.index,i.isUpdateTime=l.timePart.isUpdateTime,i.name=String(e[9]);var u=Number(e[3])||0;return i.prevclose=u,i.open=Number(e[5])||u,i.high=Number(e[6])||u,i.low=Number(e[7])||u,i.price=Number(e[8])||u,i.totalVolume=0,!0}},T=new function(){var t,e;this.update=function(i,a){if(!i){return !1}t||(t=s.gtr([["6:00","23:59"],["0:00","5:59"]]));var r=t,n="06:00",o=17,l=a.symbol;0!==l.indexOf("fx_")&&(o=10,"DINIW"==l&&(e||(e=s.gtr([["6:00","23:59"],["0:00","5:59"]])),r=e,n="06:00"));var u=i[o],h=i[0],c=N({dateStr:u,timeStr:h,hqObj:a,tArr:r,start:n});if(c.datePart.isErrData){return !1}a.date=c.datePart.date,a.today=c.datePart.today,a.time=c.timePart.time,a.index=c.timePart.index,a.isUpdateTime=c.timePart.isUpdateTime,a.name=String(i[9]);var d=Number(i[3])||0;return a.prevclose=d,a.open=Number(i[5])||d,a.high=Number(i[6])||d,a.low=Number(i[7])||d,a.price=Number(i[8])||d,a.totalVolume=0,!0}},w=new function(){var e,i,a=function(i,a){if(!i){return !1}e||(e=s.gta());var r=100;/[gz]/.test(a.type)?r=10:t.isRepos(a.symbol)?r=10:/^(sh000|sh580)\d+/.test(a.symbol)&&(r=1);
var n=i[30],o=i[31],l=N({dateStr:n,timeStr:o,hqObj:a,tArr:e,start:"09:30"});if(l.datePart.isErrData){return !1}if(a.date=l.datePart.date,a.isDateChange=l.datePart.isDateChange,a.today=l.datePart.today,a.time=l.timePart.time,a.index=l.timePart.index,a.isUpdateTime=l.timePart.isUpdateTime,!l.timePart.isUpdateTime){var u=a.time.split(":"),h=Number(u[0]),c=Number(u[1]);switch(h){case 11:36>c&&(a.isUpdateTime=!0,a.index=119);break;case 15:10>c&&(a.isUpdateTime=!0,a.index=240)}}a.name=String(i[0]),a.isNewListed=Boolean(0==a.name.indexOf("N"));var d=Number(i[2])||0;a.prevclose=d,a.preopen=Number(i[1])||Number(i[6])||Number(i[7])||d,a.open=Number(i[1])||d,a.price=Number(i[3])||d,a.high=Number(i[4])||d,a.low=Number(i[5])||d,a.buy=Number(i[6]),a.sell=Number(i[7]);var m=Number(i[8])||0;m/=r,a.totalVolume=m,a.totalAmount=Number(i[9])||0;var p=i[32];return a.state=p,a.isStopDay="02"==p||"03"==p,a.statusStr=f[p]||"",!0},r=function(t,e){var i=t.split(",");!i||i.length<16||(e.type=String(i[0]).toLowerCase(),e.lastfive=Number(i[6]),e.fc=Number(i[8]),e.issueprice=Number(i[14]),e.status=Number(i[15]))},o=function(e,a){i||(i=s.gtr([["9:15","11:30"],["13:00","15:01"]]));var r=g[a.symbol]||{},o=r.date;t.isDate(o)||(o=new Date);var l=e.split("|"),u=n.ds(o),h=l[1],c=N({dateStr:u,timeStr:h,hqObj:a,tArr:i,start:"09:15"});return c.datePart.isErrData?!1:c.datePart.date.getHours()-o.getHours()>2?!1:(a.date=c.datePart.date,a.isDateChange=c.datePart.isDateChange,a.today=c.datePart.today,a.time=c.timePart.time,a.index=c.timePart.index,a.isUpdateTime=c.timePart.isUpdateTime,a.name=r.name||"",a.isNewListed=Boolean(0==a.name.indexOf("N")),a.price=Number(l[2]),a.trvolume=0.01*(Number(l[3])||0),a.tramount=Number(l[4])||0,a.trbs=Number(l[7])||0,!0)};this.trHandler=function(t,e){return o(t,e)},this.update=function(t,e,i){var n=!0;return i&&r(i,e),t&&(n=a(t,e)),n}},y=new function(){var t;this.update=function(e,i){if(!e){return !1}t||(t=s.gata(a(i.symbol),window["kke_"+i.symbol]&&window["kke_"+i.symbol].time||[["09:30","11:29"],["13:00","02:59"]]));var r=e[36],n=e[37],o=N({dateStr:r,timeStr:n,hqObj:i,tArr:t,start:t[0]});if(o.datePart.isErrData){return !1}i.name=e[49]||i.symbol.replace("CFF_RE_",""),i.date=o.datePart.date,i.isDateChange=o.datePart.isDateChange,i.today=o.datePart.today,i.time=o.timePart.time,i.index=o.timePart.index,i.isUpdateTime=o.timePart.isUpdateTime;var l=Number(e[14])||Number(e[13])||0;return i.settlement=i.prevclose=l,i.open=Number(e[0])||l,i.price=Number(e[3])||l,i.high=Number(e[1])||l,i.low=Number(e[2])||l,i.preopen=i.open,i.totalVolume=Number(e[4])||0,i.totalAmount=Number(e[5])||0,i.holdingAmount=Number(e[6])||0,i.preHoldingAmount=Number(e[15])||0,i.iscff=1,i.withNight=!1,!0}},k=new function(){var e,i=function(e){if(!e||e.length<9){return null}for(var i,a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r=e.split(" "),n=new Date,s=n.getFullYear(),o=0,l=a.length;l>o;o++){if(String(r[0]).toUpperCase()==String(a[o]).toUpperCase()){i=o;break}}var u=parseInt(Number(r[1])),h=String(r[2]),c=h.toUpperCase().indexOf("PM")>0,d=h.split(":"),m=parseInt(Number(d[0]));c&&12!=m&&(m+=12);var f=d[1],p=f.slice(0,-2),g=[t.strUtil.zp(m),t.strUtil.zp(p),"00"].join(":"),b=new Date(s,i,u);if(+b>+n){if(!(0==n.getMonth()&&n.getDate()<7)){return null}s--,b=new Date(s,i,u)}var _=[b.getFullYear(),t.strUtil.zp(b.getMonth()+1),t.strUtil.zp(b.getDate())].join("-");return[g,_]},a=function(t,e){if(t&&e){var i=t.split(",");!i||i.length<3||(e.exchange=i[0],e.industry=i[1],e.issueprice=i[2])}},r=function(t,a,r){function o(t){return 0===parseInt(t[2])&&0===parseInt(t[4])&&0===parseInt(t[5])&&0===parseInt(t[6])&&0===parseInt(t[7])&&0===parseInt(t[10])}if(!t||t.length<28){return !1}e||(e=s.gtus());var l,u=!1;r?(l=r.split(","),u=o(l)):u=o(t);var h;if(a.prevclose=Number(t[26])||0,u){a.high=a.prevclose,a.open=a.prevclose,a.low=a.prevclose;var c=new Date((window.hq_str_sys_time?new Date(1000*window.hq_str_sys_time):new Date)-43200000);h=["09:10",c.getFullYear()+"-"+(c.getMonth()+1)+"-"+c.getDate()]}else{a.open=Number(t[5])||a.prevclose,a.high=Number(t[6])||a.prevclose,a.low=Number(t[7])||a.prevclose,h=i(String(l?l[25]:t[25]))}if(a.name=t[0],a.price=Number(t[1])||a.open,a.preopen=a.open,a.totalVolume=Number(t[10])||0,a.prevclose<=0&&(a.prevclose=a.price),a.isUnlisted=0==a.price&&0==Number(t[8])&&0==Number(t[9]),h){var d=N({dateStr:h[1],timeStr:h[0],hqObj:a,tArr:e});a.date=d.datePart.date,a.isDateChange=d.datePart.isDateChange,a.today=d.datePart.today,a.time=d.timePart.time,a.index=d.timePart.index,a.isUpdateTime=d.timePart.isUpdateTime,n=!0}return !0},n=!1;this.update=function(t,e,i,n){var s;return i&&a(i,e),t&&(s=r(t,e,n)),s}},D=new function(){var t;this.update=function(e,i){if(!e){return !1}t||(t=s.gthk());var a=e[7],r=e[1],n=N({dateStr:a,dateDiv:"-",timeStr:r,hqObj:i,tArr:t,start:"09:30"});return i.date=n.datePart.date,i.isDateChange=n.datePart.isDateChange,i.today=n.datePart.today,i.time=n.timePart.time,i.index=n.timePart.index,i.isUpdateTime=n.timePart.isUpdateTime,i.name=String(e[0]),i.volume=0,i.price=Number(e[2]),i.prevprice=i.prevclose=Number(e[3]),!0
}},O=new function(){this.update=function(t,e){if(!t){return !1}var i=window["kke_"+e.symbol]&&window["kke_"+e.symbol].time||[["09:30","11:29"],["13:00","02:59"]],r=s.gata(a(e.symbol),i),n=t[1],o=t[17],l=n.slice(0,2)+":"+n.slice(2,4),u=N({dateStr:o,dateDiv:"-",timeStr:l,hqObj:e,tArr:r,start:r[0]});e.date=u.datePart.date,e.isDateChange=u.datePart.isDateChange,e.today=u.datePart.today,e.time=u.timePart.time,e.index=u.timePart.index,e.isUpdateTime=u.timePart.isUpdateTime,r[0]>"15:00"&&("00:00"==i[1][0]?l>i[1][1]&&"09:00">l&&(e.index=r.indexOf(i[1][1])):l>i[0][1]&&"09:00">l&&(e.index=r.indexOf(i[0][1]))),e.name=String(t[0]);var h=Number(t[10])||0;return e.prevclose=h,e.open=Number(t[2])||h,e.preopen=e.open||e.price,e.high=Number(t[3])||h,e.low=Number(t[4])||h,e.close=Number(t[5])||h,e.buy=Number(t[6]),e.sell=Number(t[7]),e.price=Number(t[8])||h,e.activeprevclose=Number(t[9]),e.buyAmount=Number(t[11]),e.sellAmount=Number(t[12]),e.holdingAmount=Number(t[13]),e.totalVolume=Number(t[14])||0,e.exchange=t[15],e.futuresType=t[16],e.isHot=Number(t[18]),e.day5Highest=Number(t[19]),e.day5Lowest=Number(t[20]),e.day10Highest=Number(t[21]),e.day10Lowest=Number(t[22]),e.day20Highest=Number(t[23]),e.day20Lowest=Number(t[24]),e.day55Highest=Number(t[25]),e.day55Lowest=Number(t[26]),e.weighted=Number(t[27]),e.withNight=r[0]>"15:00",!0}},P=new function(){var t,e=function(e,i){if(!e){return !1}t||(t=s.gthk());var a=e[17],r=e[18],n=e[24],o=N({dateStr:a,dateDiv:"/",timeStr:r,hqObj:i,tArr:t,start:"09:30"});i.date=o.datePart.date||new Date,i.isDateChange=o.datePart.isDateChange,i.today=o.datePart.today;var l=!1;(!i.time||o.timePart.time>"09:29"&&i.time<o.timePart.time)&&(l=!0),i.time=o.timePart.time,i.index=o.timePart.index,i.isUpdateTime=o.timePart.isUpdateTime,l&&(i.isUpdateTime=!0),i.name=String(e[1]);var u=Number(e[3])||0;return i.prevclose=u,i.open="Y"==n?Number(e[2])||u:u,i.preopen=Number(e[2])||Number(e[9])||Number(e[10])||u,i.price=Number(e[6])||u,i.high=Number(e[4])||u,i.low=Number(e[5])||u,i.totalVolume=Number(e[12])||1000*Number(e[11])||0,i.totalAmount=Number(e[11])||0,!0},i=function(t,e){var i=t.split(",");!i||i.length<15||(e.type=String(i[0]).toLowerCase(),e.lastfive=0,e.status=Number(i[14]),e.issueprice=Number(i[16]))};this.update=function(t,a,r){var n=!0;return r&&i(r,a),t&&(n=e(t,a)),n}},x=new function(){this.update=function(t,e){if(!t){return !1}var i=s.gata(a(e.symbol),window["kke_global_index_"+e.symbol]&&window["kke_global_index_"+e.symbol].time||[["06:00","23:59"],["00:00","05:00"]]),r=i,n=i[0],o=6,l=t[o],u=t[7],h=N({dateStr:l,timeStr:u,tArr:r,start:n,hqObj:e});if(h.datePart.isErrData){return !1}e.date=h.datePart.date,e.today=h.datePart.today,e.time=h.timePart.time,e.index=h.timePart.index,e.isUpdateTime=h.timePart.isUpdateTime,e.name=String(t[0]);var c=Number(t[9])||0;return e.prevclose=c,e.open=Number(t[8])||c,e.price=Number(t[1])||c,e.high=Number(t[10])||c,e.low=Number(t[11])||c,e.buy=Number(t[9]),e.sell=Number(t[9]),e.totalVolume=Number(t[12])||0,e.holdingAmount=0,!0}},M=new function(){this.update=function(t,e){if(!t){return !1}var i=s.gata(a(e.symbol),window["kke_"+e.symbol]&&window["kke_"+e.symbol].time||[["06:00","23:59"],["00:00","05:00"]]),r=i,n=i[0],o=12,l=t[o],u=t[6],h=N({dateStr:l,timeStr:u,tArr:r,start:n,hqObj:e});if(h.datePart.isErrData){return !1}e.date=h.datePart.date,e.today=h.datePart.today,e.time=h.timePart.time,e.index=h.timePart.index,e.isUpdateTime=h.timePart.isUpdateTime,e.name=String(t[13]);var c=Number(t[7])||0;return e.prevclose=c,e.open=Number(t[8])||c,e.price=Number(t[0])||c,e.high=Number(t[4])||c,e.low=Number(t[5])||c,e.buy=Number(t[2]),e.sell=Number(t[3]),e.buyAmount=Number(t[10]),e.sellAmount=Number(t[11]),e.holdingAmount=Number(t[9]),!0}},C=new function(){var t;this.update=function(e,i){if(!e){return !1}t||(t=s.gta());var a=e[32],r=a.split(" "),n=r[0],o=r[1],l=N({dateStr:n,timeStr:o,hqObj:i,tArr:t,start:"09:30"});if(l.datePart.isErrData){return !1}i.date=l.datePart.date,i.isDateChange=l.datePart.isDateChange,i.today=l.datePart.today,i.time=l.timePart.time,i.index=l.timePart.index,i.isUpdateTime=l.timePart.isUpdateTime,i.name=String(e[37]),i.isNewListed=Boolean(0==i.name.indexOf("N"));var u=Number(e[8])||0;return i.prevclose=u,i.preopen=Number(e[9])||u,i.open=Number(e[9])||u,i.price=Number(e[2])||u,i.high=Number(e[39])||u,i.low=Number(e[40])||u,i.position=Number(e[5])||0,i.totalVolume=Number(e[41])||0,i.totalAmount=Number(e[42])||0,!0}},I=new function(){var t;this.update=function(e,i){if(!e){return !1}t||(t=s.gta());var a=e[30],r=e[31],n=N({dateStr:a,timeStr:r,hqObj:i,tArr:t,start:"09:30"});if(n.datePart.isErrData){return !1}if(i.date=n.datePart.date,i.isDateChange=n.datePart.isDateChange,i.today=n.datePart.today,i.time=n.timePart.time,i.index=n.timePart.index,i.isUpdateTime=n.timePart.isUpdateTime,!n.timePart.isUpdateTime){var o=i.time.split(":"),l=Number(o[0]),u=Number(o[1]);switch(l){case 11:59>u&&(i.isUpdateTime=!0);break;case 15:31>u&&(i.isUpdateTime=!0)}}i.name=String(e[0]),i.isNewListed=Boolean(0==i.name.indexOf("N"));
var h=Number(e[2])||0;i.prevclose=h,i.preopen=Number(e[1])||Number(e[6])||Number(e[7])||h,i.open=Number(e[1])||h,i.price=Number(e[3])||h,i.high=Number(e[4])||h,i.low=Number(e[5])||h,i.buy=Number(e[6]),i.sell=Number(e[7]),i.totalVolume=Number(e[8])/1000||0,i.totalAmount=Number(e[9])||0;var c=e[32];return i.state=c,i.isStopDay="02"==c||"03"==c,i.statusStr=f[c]||"",!0}},E=[],R="",K="",L=function(t){for(var e=E.length;e--;){E[e](t),E[e]=null,E.length--}};this.get=function(t,e){var r,n=t.symbol,s=t.withI,o=n,l=0;if(s){for(var u,h=n.split(","),f=h.length;f>l;l++){u=h[l]}}var g,b;if(t.delay){R+=n+",",K+=o+",",E.push(e),clearTimeout(m),m=setTimeout(function(){for(K=K.substring(0,K.length-1),R=R.substring(0,R.length-1),r=d(K),b=r.length,g={count:b},l=0;b>l;l++){_(r[l].join(","),i(c,null,R,L,null,g),t)}R="",K=""},100)}else{for(r=d(o),b=r.length,g={count:b},l=0;b>l;l++){_(r[l].join(","),i(c,null,n,e,null,g),t)}}},this.parse=function(e,i){var a,n=e.symbol;switch(e.market){case"CN_TR":a=r(n,null,e.hqStr);break;default:var s=v.kak(e.hqStr,e.market);a=c(n,null,s,null)}t.isFunc(i)&&i(a)}};return h});