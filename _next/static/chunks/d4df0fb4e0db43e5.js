(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,1424,(t,e,i)=>{t.e,e.exports=function(){"use strict";var t,e,i=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,n=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,s={years:31536e6,months:2628e6,days:864e5,hours:36e5,minutes:6e4,seconds:1e3,milliseconds:1,weeks:6048e5},a=function(t){return t instanceof u},r=function(t,e,i){return new u(t,i,e.$l)},o=function(t){return e.p(t)+"s"},l=function(t){return t<0},c=function(t){return l(t)?Math.ceil(t):Math.floor(t)},d=function(t,e){return t?l(t)?{negative:!0,format:""+Math.abs(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},u=function(){function l(t,e,i){var a=this;if(this.$d={},this.$l=i,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return r(t*s[o(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach(function(e){a.$d[o(e)]=t[e]}),this.calMilliseconds(),this;if("string"==typeof t){var l=t.match(n);if(l){var c=l.slice(2).map(function(t){return null!=t?Number(t):0});return this.$d.years=c[0],this.$d.months=c[1],this.$d.weeks=c[2],this.$d.days=c[3],this.$d.hours=c[4],this.$d.minutes=c[5],this.$d.seconds=c[6],this.calMilliseconds(),this}}return this}var u=l.prototype;return u.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce(function(e,i){return e+(t.$d[i]||0)*s[i]},0)},u.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=c(t/31536e6),t%=31536e6,this.$d.months=c(t/2628e6),t%=2628e6,this.$d.days=c(t/864e5),t%=864e5,this.$d.hours=c(t/36e5),t%=36e5,this.$d.minutes=c(t/6e4),t%=6e4,this.$d.seconds=c(t/1e3),t%=1e3,this.$d.milliseconds=t},u.toISOString=function(){var t=d(this.$d.years,"Y"),e=d(this.$d.months,"M"),i=+this.$d.days||0;this.$d.weeks&&(i+=7*this.$d.weeks);var n=d(i,"D"),s=d(this.$d.hours,"H"),a=d(this.$d.minutes,"M"),r=this.$d.seconds||0;this.$d.milliseconds&&(r+=this.$d.milliseconds/1e3,r=Math.round(1e3*r)/1e3);var o=d(r,"S"),l=t.negative||e.negative||n.negative||s.negative||a.negative||o.negative,c=s.format||a.format||o.format?"T":"",u=(l?"-":"")+"P"+t.format+e.format+n.format+c+s.format+a.format+o.format;return"P"===u||"-P"===u?"P0D":u},u.toJSON=function(){return this.toISOString()},u.format=function(t){var n={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return(t||"YYYY-MM-DDTHH:mm:ss").replace(i,function(t,e){return e||String(n[t])})},u.as=function(t){return this.$ms/s[o(t)]},u.get=function(t){var e=this.$ms,i=o(t);return"milliseconds"===i?e%=1e3:e="weeks"===i?c(e/s[i]):this.$d[i],e||0},u.add=function(t,e,i){var n;return n=e?t*s[o(e)]:a(t)?t.$ms:r(t,this).$ms,r(this.$ms+n*(i?-1:1),this)},u.subtract=function(t,e){return this.add(t,e,!0)},u.locale=function(t){var e=this.clone();return e.$l=t,e},u.clone=function(){return r(this.$ms,this)},u.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},u.valueOf=function(){return this.asMilliseconds()},u.milliseconds=function(){return this.get("milliseconds")},u.asMilliseconds=function(){return this.as("milliseconds")},u.seconds=function(){return this.get("seconds")},u.asSeconds=function(){return this.as("seconds")},u.minutes=function(){return this.get("minutes")},u.asMinutes=function(){return this.as("minutes")},u.hours=function(){return this.get("hours")},u.asHours=function(){return this.as("hours")},u.days=function(){return this.get("days")},u.asDays=function(){return this.as("days")},u.weeks=function(){return this.get("weeks")},u.asWeeks=function(){return this.as("weeks")},u.months=function(){return this.get("months")},u.asMonths=function(){return this.as("months")},u.years=function(){return this.get("years")},u.asYears=function(){return this.as("years")},l}(),h=function(t,e,i){return t.add(e.years()*i,"y").add(e.months()*i,"M").add(e.days()*i,"d").add(e.hours()*i,"h").add(e.minutes()*i,"m").add(e.seconds()*i,"s").add(e.milliseconds()*i,"ms")};return function(i,n,s){t=s,e=s().$utils(),s.duration=function(t,e){return r(t,{$l:s.locale()},e)},s.isDuration=a;var o=n.prototype.add,l=n.prototype.subtract;n.prototype.add=function(t,e){return a(t)?h(this,t,1):o.bind(this)(t,e)},n.prototype.subtract=function(t,e){return a(t)?h(this,t,-1):l.bind(this)(t,e)}}}()},52574,t=>{"use strict";var e,i,n,s=t.i(44270),a=t.i(18885),r=t.i(7827),o=t.i(14942),l=t.i(94834),c=t.i(4363),d=t.i(24263),u=t.i(42022),h=t.i(1424);t.i(31345);var m=t.i(12638),f=t.i(16412),y=t.i(96215),k=t.i(6471),g=t.i(38593),p=t.i(63709),_=t.i(64579),b=t.i(3291),v=t.i(44010),T=t.i(98405),x=t.i(20539),$=t.i(34842),w=t.i(6239),S=t.i(73140),C=t.i(83422),D=function(){var t=(0,r.__name)(function(t,e,i,n){for(i=i||{},n=t.length;n--;i[t[n]]=e);return i},"o"),e=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],i=[1,26],n=[1,27],s=[1,28],a=[1,29],o=[1,30],l=[1,31],c=[1,32],d=[1,33],u=[1,34],h=[1,9],m=[1,10],f=[1,11],y=[1,12],k=[1,13],g=[1,14],p=[1,15],_=[1,16],b=[1,19],v=[1,20],T=[1,21],x=[1,22],$=[1,23],w=[1,25],S=[1,35],C={trace:(0,r.__name)(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:(0,r.__name)(function(t,e,i,n,s,a,r){var o=a.length-1;switch(s){case 1:return a[o-1];case 2:case 6:case 7:this.$=[];break;case 3:a[o-1].push(a[o]),this.$=a[o-1];break;case 4:case 5:this.$=a[o];break;case 8:n.setWeekday("monday");break;case 9:n.setWeekday("tuesday");break;case 10:n.setWeekday("wednesday");break;case 11:n.setWeekday("thursday");break;case 12:n.setWeekday("friday");break;case 13:n.setWeekday("saturday");break;case 14:n.setWeekday("sunday");break;case 15:n.setWeekend("friday");break;case 16:n.setWeekend("saturday");break;case 17:n.setDateFormat(a[o].substr(11)),this.$=a[o].substr(11);break;case 18:n.enableInclusiveEndDates(),this.$=a[o].substr(18);break;case 19:n.TopAxis(),this.$=a[o].substr(8);break;case 20:n.setAxisFormat(a[o].substr(11)),this.$=a[o].substr(11);break;case 21:n.setTickInterval(a[o].substr(13)),this.$=a[o].substr(13);break;case 22:n.setExcludes(a[o].substr(9)),this.$=a[o].substr(9);break;case 23:n.setIncludes(a[o].substr(9)),this.$=a[o].substr(9);break;case 24:n.setTodayMarker(a[o].substr(12)),this.$=a[o].substr(12);break;case 27:n.setDiagramTitle(a[o].substr(6)),this.$=a[o].substr(6);break;case 28:this.$=a[o].trim(),n.setAccTitle(this.$);break;case 29:case 30:this.$=a[o].trim(),n.setAccDescription(this.$);break;case 31:n.addSection(a[o].substr(8)),this.$=a[o].substr(8);break;case 33:n.addTask(a[o-1],a[o]),this.$="task";break;case 34:this.$=a[o-1],n.setClickEvent(a[o-1],a[o],null);break;case 35:this.$=a[o-2],n.setClickEvent(a[o-2],a[o-1],a[o]);break;case 36:this.$=a[o-2],n.setClickEvent(a[o-2],a[o-1],null),n.setLink(a[o-2],a[o]);break;case 37:this.$=a[o-3],n.setClickEvent(a[o-3],a[o-2],a[o-1]),n.setLink(a[o-3],a[o]);break;case 38:this.$=a[o-2],n.setClickEvent(a[o-2],a[o],null),n.setLink(a[o-2],a[o-1]);break;case 39:this.$=a[o-3],n.setClickEvent(a[o-3],a[o-1],a[o]),n.setLink(a[o-3],a[o-2]);break;case 40:this.$=a[o-1],n.setLink(a[o-1],a[o]);break;case 41:case 47:this.$=a[o-1]+" "+a[o];break;case 42:case 43:case 45:this.$=a[o-2]+" "+a[o-1]+" "+a[o];break;case 44:case 46:this.$=a[o-3]+" "+a[o-2]+" "+a[o-1]+" "+a[o]}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:i,13:n,14:s,15:a,16:o,17:l,18:c,19:18,20:d,21:u,22:h,23:m,24:f,25:y,26:k,27:g,28:p,29:_,30:b,31:v,33:T,35:x,36:$,37:24,38:w,40:S},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:36,11:17,12:i,13:n,14:s,15:a,16:o,17:l,18:c,19:18,20:d,21:u,22:h,23:m,24:f,25:y,26:k,27:g,28:p,29:_,30:b,31:v,33:T,35:x,36:$,37:24,38:w,40:S},t(e,[2,5]),t(e,[2,6]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),t(e,[2,26]),t(e,[2,27]),{32:[1,37]},{34:[1,38]},t(e,[2,30]),t(e,[2,31]),t(e,[2,32]),{39:[1,39]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),{41:[1,40],43:[1,41]},t(e,[2,4]),t(e,[2,28]),t(e,[2,29]),t(e,[2,33]),t(e,[2,34],{42:[1,42],43:[1,43]}),t(e,[2,40],{41:[1,44]}),t(e,[2,35],{43:[1,45]}),t(e,[2,36]),t(e,[2,38],{42:[1,46]}),t(e,[2,37]),t(e,[2,39])],defaultActions:{},parseError:(0,r.__name)(function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i}},"parseError"),parse:(0,r.__name)(function(t){var e=this,i=[0],n=[],s=[null],a=[],o=this.table,l="",c=0,d=0,u=0,h=a.slice.call(arguments,1),m=Object.create(this.lexer),f={};for(var y in this.yy)Object.prototype.hasOwnProperty.call(this.yy,y)&&(f[y]=this.yy[y]);m.setInput(t,f),f.lexer=m,f.parser=this,void 0===m.yylloc&&(m.yylloc={});var k=m.yylloc;a.push(k);var g=m.options&&m.options.ranges;function p(){var t;return"number"!=typeof(t=n.pop()||m.lex()||1)&&(t instanceof Array&&(t=(n=t).pop()),t=e.symbols_[t]||t),t}"function"==typeof f.parseError?this.parseError=f.parseError:this.parseError=Object.getPrototypeOf(this).parseError,(0,r.__name)(function(t){i.length=i.length-2*t,s.length=s.length-t,a.length=a.length-t},"popStack"),(0,r.__name)(p,"lex");for(var _,b,v,T,x,$,w,S,C,D={};;){if(v=i[i.length-1],this.defaultActions[v]?T=this.defaultActions[v]:(null==_&&(_=p()),T=o[v]&&o[v][_]),void 0===T||!T.length||!T[0]){var E="";for($ in C=[],o[v])this.terminals_[$]&&$>2&&C.push("'"+this.terminals_[$]+"'");E=m.showPosition?"Parse error on line "+(c+1)+":\n"+m.showPosition()+"\nExpecting "+C.join(", ")+", got '"+(this.terminals_[_]||_)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==_?"end of input":"'"+(this.terminals_[_]||_)+"'"),this.parseError(E,{text:m.match,token:this.terminals_[_]||_,line:m.yylineno,loc:k,expected:C})}if(T[0]instanceof Array&&T.length>1)throw Error("Parse Error: multiple actions possible at state: "+v+", token: "+_);switch(T[0]){case 1:i.push(_),s.push(m.yytext),a.push(m.yylloc),i.push(T[1]),_=null,b?(_=b,b=null):(d=m.yyleng,l=m.yytext,c=m.yylineno,k=m.yylloc,u>0&&u--);break;case 2:if(w=this.productions_[T[1]][1],D.$=s[s.length-w],D._$={first_line:a[a.length-(w||1)].first_line,last_line:a[a.length-1].last_line,first_column:a[a.length-(w||1)].first_column,last_column:a[a.length-1].last_column},g&&(D._$.range=[a[a.length-(w||1)].range[0],a[a.length-1].range[1]]),void 0!==(x=this.performAction.apply(D,[l,d,c,f,T[1],s,a].concat(h))))return x;w&&(i=i.slice(0,-1*w*2),s=s.slice(0,-1*w),a=a.slice(0,-1*w)),i.push(this.productions_[T[1]][0]),s.push(D.$),a.push(D._$),S=o[i[i.length-2]][i[i.length-1]],i.push(S);break;case 3:return!0}}return!0},"parse")};function D(){this.yy={}}return C.lexer={EOF:1,parseError:(0,r.__name)(function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},"parseError"),setInput:(0,r.__name)(function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:(0,r.__name)(function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},"input"),unput:(0,r.__name)(function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var n=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var s=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===n.length?this.yylloc.first_column:0)+n[n.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[s[0],s[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},"unput"),more:(0,r.__name)(function(){return this._more=!0,this},"more"),reject:(0,r.__name)(function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"reject"),less:(0,r.__name)(function(t){this.unput(this.match.slice(t))},"less"),pastInput:(0,r.__name)(function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:(0,r.__name)(function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:(0,r.__name)(function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},"showPosition"),test_match:(0,r.__name)(function(t,e){var i,n,s;if(this.options.backtrack_lexer&&(s={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(s.yylloc.range=this.yylloc.range.slice(0))),(n=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var a in s)this[a]=s[a];return!1},"test_match"),next:(0,r.__name)(function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,i,n,s=this._currentRules(),a=0;a<s.length;a++)if((i=this._input.match(this.rules[s[a]]))&&(!e||i[0].length>e[0].length)){if(e=i,n=a,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,s[a])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,s[n]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:(0,r.__name)(function(){var t=this.next();return t||this.lex()},"lex"),begin:(0,r.__name)(function(t){this.conditionStack.push(t)},"begin"),popState:(0,r.__name)(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:(0,r.__name)(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:(0,r.__name)(function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},"topState"),pushState:(0,r.__name)(function(t){this.begin(t)},"pushState"),stateStackSize:(0,r.__name)(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:(0,r.__name)(function(t,e,i,n){switch(i){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:case 15:case 18:case 21:case 24:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:case 9:case 10:case 12:case 13:break;case 11:return 10;case 14:this.begin("href");break;case 16:return 43;case 17:this.begin("callbackname");break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 22:return 42;case 23:this.begin("click");break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}},(0,r.__name)(D,"Parser"),D.prototype=C,C.Parser=D,new D}();D.parser=D,l.default.extend(c.default),l.default.extend(d.default),l.default.extend(u.default);var E={friday:5,saturday:6},M="",A="",I=void 0,F="",O=[],L=[],P=new Map,Y=[],B=[],N="",W="",H=["active","done","crit","milestone","vert"],j=[],z=!1,R=!1,G="sunday",U="saturday",V=0,q=(0,r.__name)(function(){Y=[],B=[],N="",j=[],tS=0,e=void 0,i=void 0,tM=[],M="",A="",W="",I=void 0,F="",O=[],L=[],z=!1,R=!1,V=0,P=new Map,(0,a.clear)(),G="sunday",U="saturday"},"clear"),K=(0,r.__name)(function(t){A=t},"setAxisFormat"),J=(0,r.__name)(function(){return A},"getAxisFormat"),X=(0,r.__name)(function(t){I=t},"setTickInterval"),Z=(0,r.__name)(function(){return I},"getTickInterval"),Q=(0,r.__name)(function(t){F=t},"setTodayMarker"),tt=(0,r.__name)(function(){return F},"getTodayMarker"),te=(0,r.__name)(function(t){M=t},"setDateFormat"),ti=(0,r.__name)(function(){z=!0},"enableInclusiveEndDates"),tn=(0,r.__name)(function(){return z},"endDatesAreInclusive"),ts=(0,r.__name)(function(){R=!0},"enableTopAxis"),ta=(0,r.__name)(function(){return R},"topAxisEnabled"),tr=(0,r.__name)(function(t){W=t},"setDisplayMode"),to=(0,r.__name)(function(){return W},"getDisplayMode"),tl=(0,r.__name)(function(){return M},"getDateFormat"),tc=(0,r.__name)(function(t){O=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),td=(0,r.__name)(function(){return O},"getIncludes"),tu=(0,r.__name)(function(t){L=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),th=(0,r.__name)(function(){return L},"getExcludes"),tm=(0,r.__name)(function(){return P},"getLinks"),tf=(0,r.__name)(function(t){N=t,Y.push(t)},"addSection"),ty=(0,r.__name)(function(){return Y},"getSections"),tk=(0,r.__name)(function(){let t=tL(),e=0;for(;!t&&e<10;)t=tL(),e++;return B=tM},"getTasks"),tg=(0,r.__name)(function(t,e,i,n){let s=t.format(e.trim()),a=t.format("YYYY-MM-DD");return!(n.includes(s)||n.includes(a))&&(!!(i.includes("weekends")&&(t.isoWeekday()===E[U]||t.isoWeekday()===E[U]+1)||i.includes(t.format("dddd").toLowerCase()))||i.includes(s)||i.includes(a))},"isInvalidDate"),tp=(0,r.__name)(function(t){G=t},"setWeekday"),t_=(0,r.__name)(function(){return G},"getWeekday"),tb=(0,r.__name)(function(t){U=t},"setWeekend"),tv=(0,r.__name)(function(t,e,i,n){let s;if(!i.length||t.manualEndTime)return;let[a,r]=tT(s=(s=t.startTime instanceof Date?(0,l.default)(t.startTime):(0,l.default)(t.startTime,e,!0)).add(1,"d"),t.endTime instanceof Date?(0,l.default)(t.endTime):(0,l.default)(t.endTime,e,!0),e,i,n);t.endTime=a.toDate(),t.renderEndTime=r},"checkTaskDates"),tT=(0,r.__name)(function(t,e,i,n,s){let a=!1,r=null;for(;t<=e;)a||(r=e.toDate()),(a=tg(t,i,n,s))&&(e=e.add(1,"d")),t=t.add(1,"d");return[e,r]},"fixTaskDates"),tx=(0,r.__name)(function(t,e,i){if(i=i.trim(),(0,r.__name)(t=>{let e=t.trim();return"x"===e||"X"===e},"isTimestampFormat")(e)&&/^\d+$/.test(i))return new Date(Number(i));let n=/^after\s+(?<ids>[\d\w- ]+)/.exec(i);if(null!==n){let t=null;for(let e of n.groups.ids.split(" ")){let i=tF(e);void 0!==i&&(!t||i.endTime>t.endTime)&&(t=i)}if(t)return t.endTime;let e=new Date;return e.setHours(0,0,0,0),e}let s=(0,l.default)(i,e.trim(),!0);if(s.isValid())return s.toDate();{r.log.debug("Invalid date:"+i),r.log.debug("With date format:"+e.trim());let t=new Date(i);if(void 0===t||isNaN(t.getTime())||-1e4>t.getFullYear()||t.getFullYear()>1e4)throw Error("Invalid date:"+i);return t}},"getStartDate"),t$=(0,r.__name)(function(t){let e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return null!==e?[Number.parseFloat(e[1]),e[2]]:[NaN,"ms"]},"parseDuration"),tw=(0,r.__name)(function(t,e,i,n=!1){i=i.trim();let s=/^until\s+(?<ids>[\d\w- ]+)/.exec(i);if(null!==s){let t=null;for(let e of s.groups.ids.split(" ")){let i=tF(e);void 0!==i&&(!t||i.startTime<t.startTime)&&(t=i)}if(t)return t.startTime;let e=new Date;return e.setHours(0,0,0,0),e}let a=(0,l.default)(i,e.trim(),!0);if(a.isValid())return n&&(a=a.add(1,"d")),a.toDate();let r=(0,l.default)(t),[o,c]=t$(i);if(!Number.isNaN(o)){let t=r.add(o,c);t.isValid()&&(r=t)}return r.toDate()},"getEndDate"),tS=0,tC=(0,r.__name)(function(t){return void 0===t?"task"+(tS+=1):t},"parseId"),tD=(0,r.__name)(function(t,e){let i=(":"===e.substr(0,1)?e.substr(1,e.length):e).split(","),n={};tz(i,n,H);for(let t=0;t<i.length;t++)i[t]=i[t].trim();let s="";switch(i.length){case 1:n.id=tC(),n.startTime=t.endTime,s=i[0];break;case 2:n.id=tC(),n.startTime=tx(void 0,M,i[0]),s=i[1];break;case 3:n.id=tC(i[0]),n.startTime=tx(void 0,M,i[1]),s=i[2]}return s&&(n.endTime=tw(n.startTime,M,s,z),n.manualEndTime=(0,l.default)(s,"YYYY-MM-DD",!0).isValid(),tv(n,M,L,O)),n},"compileData"),tE=(0,r.__name)(function(t,e){let i=(":"===e.substr(0,1)?e.substr(1,e.length):e).split(","),n={};tz(i,n,H);for(let t=0;t<i.length;t++)i[t]=i[t].trim();switch(i.length){case 1:n.id=tC(),n.startTime={type:"prevTaskEnd",id:t},n.endTime={data:i[0]};break;case 2:n.id=tC(),n.startTime={type:"getStartDate",startData:i[0]},n.endTime={data:i[1]};break;case 3:n.id=tC(i[0]),n.startTime={type:"getStartDate",startData:i[1]},n.endTime={data:i[2]}}return n},"parseData"),tM=[],tA={},tI=(0,r.__name)(function(t,e){let n={section:N,type:N,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},s=tE(i,e);n.raw.startTime=s.startTime,n.raw.endTime=s.endTime,n.id=s.id,n.prevTaskId=i,n.active=s.active,n.done=s.done,n.crit=s.crit,n.milestone=s.milestone,n.vert=s.vert,n.order=V,V++;let a=tM.push(n);i=n.id,tA[n.id]=a-1},"addTask"),tF=(0,r.__name)(function(t){return tM[tA[t]]},"findTaskById"),tO=(0,r.__name)(function(t,i){let n={section:N,type:N,description:t,task:t,classes:[]},s=tD(e,i);n.startTime=s.startTime,n.endTime=s.endTime,n.id=s.id,n.active=s.active,n.done=s.done,n.crit=s.crit,n.milestone=s.milestone,n.vert=s.vert,e=n,B.push(n)},"addTaskOrg"),tL=(0,r.__name)(function(){let t=(0,r.__name)(function(t){let e=tM[t],i="";switch(tM[t].raw.startTime.type){case"prevTaskEnd":{let t=tF(e.prevTaskId);e.startTime=t.endTime;break}case"getStartDate":(i=tx(void 0,M,tM[t].raw.startTime.startData))&&(tM[t].startTime=i)}return tM[t].startTime&&(tM[t].endTime=tw(tM[t].startTime,M,tM[t].raw.endTime.data,z),tM[t].endTime&&(tM[t].processed=!0,tM[t].manualEndTime=(0,l.default)(tM[t].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),tv(tM[t],M,L,O))),tM[t].processed},"compileTask"),e=!0;for(let[i,n]of tM.entries())t(i),e=e&&n.processed;return e},"compileTasks"),tP=(0,r.__name)(function(t,e){let i=e;"loose"!==(0,a.getConfig2)().securityLevel&&(i=(0,o.sanitizeUrl)(e)),t.split(",").forEach(function(t){void 0!==tF(t)&&(tN(t,()=>{window.open(i,"_self")}),P.set(t,i))}),tY(t,"clickable")},"setLink"),tY=(0,r.__name)(function(t,e){t.split(",").forEach(function(t){let i=tF(t);void 0!==i&&i.classes.push(e)})},"setClass"),tB=(0,r.__name)(function(t,e,i){if("loose"!==(0,a.getConfig2)().securityLevel||void 0===e)return;let n=[];if("string"==typeof i){n=i.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let t=0;t<n.length;t++){let e=n[t].trim();e.startsWith('"')&&e.endsWith('"')&&(e=e.substr(1,e.length-2)),n[t]=e}}0===n.length&&n.push(t),void 0!==tF(t)&&tN(t,()=>{s.utils_default.runFunc(e,...n)})},"setClickFun"),tN=(0,r.__name)(function(t,e){j.push(function(){let i=document.querySelector(`[id="${t}"]`);null!==i&&i.addEventListener("click",function(){e()})},function(){let i=document.querySelector(`[id="${t}-text"]`);null!==i&&i.addEventListener("click",function(){e()})})},"pushFun"),tW=(0,r.__name)(function(t,e,i){t.split(",").forEach(function(t){tB(t,e,i)}),tY(t,"clickable")},"setClickEvent"),tH=(0,r.__name)(function(t){j.forEach(function(e){e(t)})},"bindFunctions"),tj={getConfig:(0,r.__name)(()=>(0,a.getConfig2)().gantt,"getConfig"),clear:q,setDateFormat:te,getDateFormat:tl,enableInclusiveEndDates:ti,endDatesAreInclusive:tn,enableTopAxis:ts,topAxisEnabled:ta,setAxisFormat:K,getAxisFormat:J,setTickInterval:X,getTickInterval:Z,setTodayMarker:Q,getTodayMarker:tt,setAccTitle:a.setAccTitle,getAccTitle:a.getAccTitle,setDiagramTitle:a.setDiagramTitle,getDiagramTitle:a.getDiagramTitle,setDisplayMode:tr,getDisplayMode:to,setAccDescription:a.setAccDescription,getAccDescription:a.getAccDescription,addSection:tf,getSections:ty,getTasks:tk,addTask:tI,findTaskById:tF,addTaskOrg:tO,setIncludes:tc,getIncludes:td,setExcludes:tu,getExcludes:th,setClickEvent:tW,setLink:tP,getLinks:tm,bindFunctions:tH,parseDuration:t$,isInvalidDate:tg,setWeekday:tp,getWeekday:t_,setWeekend:tb};function tz(t,e,i){let n=!0;for(;n;)n=!1,i.forEach(function(i){let s=RegExp("^\\s*"+i+"\\s*$");t[0].match(s)&&(e[i]=!0,t.shift(1),n=!0)})}(0,r.__name)(tz,"getTaskTags"),l.default.extend(h.default);var tR=(0,r.__name)(function(){r.log.debug("Something is calling, setConf, remove the call")},"setConf"),tG={monday:S.timeMonday,tuesday:S.timeTuesday,wednesday:S.timeWednesday,thursday:S.timeThursday,friday:S.timeFriday,saturday:S.timeSaturday,sunday:S.timeSunday},tU=(0,r.__name)((t,e)=>{let i=[...t].map(()=>-1/0),n=[...t].sort((t,e)=>t.startTime-e.startTime||t.order-e.order),s=0;for(let t of n)for(let n=0;n<i.length;n++)if(t.startTime>=i[n]){i[n]=t.endTime,t.order=n+e,n>s&&(s=n);break}return s},"getMaxIntersections"),tV={parser:D,db:tj,renderer:{setConf:tR,draw:(0,r.__name)(function(t,e,i,s){let o,c=(0,a.getConfig2)().gantt,d=(0,a.getConfig2)().securityLevel;"sandbox"===d&&(o=(0,m.select)("#i"+e));let u="sandbox"===d?(0,m.select)(o.nodes()[0].contentDocument.body):(0,m.select)("body"),h="sandbox"===d?o.nodes()[0].contentDocument:document,S=h.getElementById(e);void 0===(n=S.parentElement.offsetWidth)&&(n=1200),void 0!==c.useWidth&&(n=c.useWidth);let D=s.db.getTasks(),E=[];for(let t of D)E.push(t.type);E=j(E);let M={},A=2*c.topPadding;if("compact"===s.db.getDisplayMode()||"compact"===c.displayMode){let t={};for(let e of D)void 0===t[e.section]?t[e.section]=[e]:t[e.section].push(e);let e=0;for(let i of Object.keys(t)){let n=tU(t[i],e)+1;e+=n,A+=n*(c.barHeight+c.barGap),M[i]=n}}else for(let t of(A+=D.length*(c.barHeight+c.barGap),E))M[t]=D.filter(e=>e.type===t).length;S.setAttribute("viewBox","0 0 "+n+" "+A);let I=u.select(`[id="${e}"]`),F=(0,f.scaleTime)().domain([(0,y.min)(D,function(t){return t.startTime}),(0,k.max)(D,function(t){return t.endTime})]).rangeRound([0,n-c.leftPadding-c.rightPadding]);function O(t,e){let i=t.startTime,n=e.startTime,s=0;return i>n?s=1:i<n&&(s=-1),s}function L(t,e,i){let n=c.barHeight,a=n+c.barGap,r=c.topPadding,o=c.leftPadding,l=(0,g.scaleLinear)().domain([0,E.length]).range(["#00B9FA","#F95002"]).interpolate(p.interpolateHcl);Y(a,r,o,e,i,t,s.db.getExcludes(),s.db.getIncludes()),N(o,r,e,i),P(t,a,r,o,n,l,e,i),W(a,r,o,n,l),H(o,r,e,i)}function P(t,i,n,r,o,l,d){t.sort((t,e)=>t.vert===e.vert?0:t.vert?1:-1);let u=[...new Set(t.map(t=>t.order))].map(e=>t.find(t=>t.order===e));I.append("g").selectAll("rect").data(u).enter().append("rect").attr("x",0).attr("y",function(t,e){return t.order*i+n-2}).attr("width",function(){return d-c.rightPadding/2}).attr("height",i).attr("class",function(t){for(let[e,i]of E.entries())if(t.type===i)return"section section"+e%c.numberSectionStyles;return"section section0"}).enter();let h=I.append("g").selectAll("rect").data(t).enter(),f=s.db.getLinks();if(h.append("rect").attr("id",function(t){return t.id}).attr("rx",3).attr("ry",3).attr("x",function(t){return t.milestone?F(t.startTime)+r+.5*(F(t.endTime)-F(t.startTime))-.5*o:F(t.startTime)+r}).attr("y",function(t,e){return(e=t.order,t.vert)?c.gridLineStartPadding:e*i+n}).attr("width",function(t){return t.milestone?o:t.vert?.08*o:F(t.renderEndTime||t.endTime)-F(t.startTime)}).attr("height",function(t){return t.vert?D.length*(c.barHeight+c.barGap)+2*c.barHeight:o}).attr("transform-origin",function(t,e){return e=t.order,(F(t.startTime)+r+.5*(F(t.endTime)-F(t.startTime))).toString()+"px "+(e*i+n+.5*o).toString()+"px"}).attr("class",function(t){let e="";t.classes.length>0&&(e=t.classes.join(" "));let i=0;for(let[e,n]of E.entries())t.type===n&&(i=e%c.numberSectionStyles);let n="";return t.active?t.crit?n+=" activeCrit":n=" active":t.done?n=t.crit?" doneCrit":" done":t.crit&&(n+=" crit"),0===n.length&&(n=" task"),t.milestone&&(n=" milestone "+n),t.vert&&(n=" vert "+n),n+=i,"task"+(n+=" "+e)}),h.append("text").attr("id",function(t){return t.id+"-text"}).text(function(t){return t.task}).attr("font-size",c.fontSize).attr("x",function(t){let e=F(t.startTime),i=F(t.renderEndTime||t.endTime);if(t.milestone&&(e+=.5*(F(t.endTime)-F(t.startTime))-.5*o,i=e+o),t.vert)return F(t.startTime)+r;let n=this.getBBox().width;return n>i-e?i+n+1.5*c.leftPadding>d?e+r-5:i+r+5:(i-e)/2+e+r}).attr("y",function(t,e){return t.vert?c.gridLineStartPadding+D.length*(c.barHeight+c.barGap)+60:t.order*i+c.barHeight/2+(c.fontSize/2-2)+n}).attr("text-height",o).attr("class",function(t){let e=F(t.startTime),i=F(t.endTime);t.milestone&&(i=e+o);let n=this.getBBox().width,s="";t.classes.length>0&&(s=t.classes.join(" "));let a=0;for(let[e,i]of E.entries())t.type===i&&(a=e%c.numberSectionStyles);let r="";return(t.active&&(r=t.crit?"activeCritText"+a:"activeText"+a),t.done?r=t.crit?r+" doneCritText"+a:r+" doneText"+a:t.crit&&(r=r+" critText"+a),t.milestone&&(r+=" milestoneText"),t.vert&&(r+=" vertText"),n>i-e)?i+n+1.5*c.leftPadding>d?s+" taskTextOutsideLeft taskTextOutside"+a+" "+r:s+" taskTextOutsideRight taskTextOutside"+a+" "+r+" width-"+n:s+" taskText taskText"+a+" "+r+" width-"+n}),"sandbox"===(0,a.getConfig2)().securityLevel){let t=(0,m.select)("#i"+e).nodes()[0].contentDocument;h.filter(function(t){return f.has(t.id)}).each(function(e){var i=t.querySelector("#"+e.id),n=t.querySelector("#"+e.id+"-text");let s=i.parentNode;var a=t.createElement("a");a.setAttribute("xlink:href",f.get(e.id)),a.setAttribute("target","_top"),s.appendChild(a),a.appendChild(i),a.appendChild(n)})}}function Y(t,e,i,n,a,o,d,u){let h,m;if(0===d.length&&0===u.length)return;for(let{startTime:t,endTime:e}of o)(void 0===h||t<h)&&(h=t),(void 0===m||e>m)&&(m=e);if(!h||!m)return;if((0,l.default)(m).diff((0,l.default)(h),"year")>5)return void r.log.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");let f=s.db.getDateFormat(),y=[],k=null,g=(0,l.default)(h);for(;g.valueOf()<=m;)s.db.isInvalidDate(g,f,d,u)?k?k.end=g:k={start:g,end:g}:k&&(y.push(k),k=null),g=g.add(1,"d");I.append("g").selectAll("rect").data(y).enter().append("rect").attr("id",t=>"exclude-"+t.start.format("YYYY-MM-DD")).attr("x",t=>F(t.start.startOf("day"))+i).attr("y",c.gridLineStartPadding).attr("width",t=>F(t.end.endOf("day"))-F(t.start.startOf("day"))).attr("height",a-e-c.gridLineStartPadding).attr("transform-origin",function(e,n){return(F(e.start)+i+.5*(F(e.end)-F(e.start))).toString()+"px "+(n*t+.5*a).toString()+"px"}).attr("class","exclude-range")}function B(t,e,i,n){if(i<=0||t>e)return 1/0;let s=l.default.duration({[n??"day"]:i}).asMilliseconds();return s<=0?1/0:Math.ceil((e-t)/s)}function N(t,e,i,n){let a,o=s.db.getDateFormat(),l=s.db.getAxisFormat();a=l||("D"===o?"%d":c.axisFormat??"%Y-%m-%d");let d=(0,_.axisBottom)(F).tickSize(-n+e+c.gridLineStartPadding).tickFormat((0,b.timeFormat)(a)),u=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(s.db.getTickInterval()||c.tickInterval);if(null!==u){let t=parseInt(u[1],10);if(isNaN(t)||t<=0)r.log.warn(`Invalid tick interval value: "${u[1]}". Skipping custom tick interval.`);else{let e=u[2],i=s.db.getWeekday()||c.weekday,n=F.domain(),a=B(n[0],n[1],t,e);if(a>1e4)r.log.warn(`The tick interval "${t}${e}" would generate ${a} ticks, which exceeds the maximum allowed (10000). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(e){case"millisecond":d.ticks(v.timeMillisecond.every(t));break;case"second":d.ticks(T.timeSecond.every(t));break;case"minute":d.ticks(x.timeMinute.every(t));break;case"hour":d.ticks($.timeHour.every(t));break;case"day":d.ticks(w.timeDay.every(t));break;case"week":d.ticks(tG[i].every(t));break;case"month":d.ticks(C.timeMonth.every(t))}}}if(I.append("g").attr("class","grid").attr("transform","translate("+t+", "+(n-50)+")").call(d).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),s.db.topAxisEnabled()||c.topAxis){let i=(0,_.axisTop)(F).tickSize(-n+e+c.gridLineStartPadding).tickFormat((0,b.timeFormat)(a));if(null!==u){let t=parseInt(u[1],10);if(isNaN(t)||t<=0)r.log.warn(`Invalid tick interval value: "${u[1]}". Skipping custom tick interval.`);else{let e=u[2],n=s.db.getWeekday()||c.weekday,a=F.domain();if(1e4>=B(a[0],a[1],t,e))switch(e){case"millisecond":i.ticks(v.timeMillisecond.every(t));break;case"second":i.ticks(T.timeSecond.every(t));break;case"minute":i.ticks(x.timeMinute.every(t));break;case"hour":i.ticks($.timeHour.every(t));break;case"day":i.ticks(w.timeDay.every(t));break;case"week":i.ticks(tG[n].every(t));break;case"month":i.ticks(C.timeMonth.every(t))}}}I.append("g").attr("class","grid").attr("transform","translate("+t+", "+e+")").call(i).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function W(t,e){let i=0,n=Object.keys(M).map(t=>[t,M[t]]);I.append("g").selectAll("text").data(n).enter().append(function(t){let e=t[0].split(a.common_default.lineBreakRegex),i=-(e.length-1)/2,n=h.createElementNS("http://www.w3.org/2000/svg","text");for(let[t,s]of(n.setAttribute("dy",i+"em"),e.entries())){let e=h.createElementNS("http://www.w3.org/2000/svg","tspan");e.setAttribute("alignment-baseline","central"),e.setAttribute("x","10"),t>0&&e.setAttribute("dy","1em"),e.textContent=s,n.appendChild(e)}return n}).attr("x",10).attr("y",function(s,a){if(!(a>0))return s[1]*t/2+e;for(let r=0;r<a;r++)return i+=n[a-1][1],s[1]*t/2+i*t+e}).attr("font-size",c.sectionFontSize).attr("class",function(t){for(let[e,i]of E.entries())if(t[0]===i)return"sectionTitle sectionTitle"+e%c.numberSectionStyles;return"sectionTitle"})}function H(t,e,i,n){let a=s.db.getTodayMarker();if("off"===a)return;let r=I.append("g").attr("class","today"),o=new Date,l=r.append("line");l.attr("x1",F(o)+t).attr("x2",F(o)+t).attr("y1",c.titleTopMargin).attr("y2",n-c.titleTopMargin).attr("class","today"),""!==a&&l.attr("style",a.replace(/,/g,";"))}function j(t){let e={},i=[];for(let n=0,s=t.length;n<s;++n)Object.prototype.hasOwnProperty.call(e,t[n])||(e[t[n]]=!0,i.push(t[n]));return i}(0,r.__name)(O,"taskCompare"),D.sort(O),L(D,n,A),(0,a.configureSvgSize)(I,A,n,c.useMaxWidth),I.append("text").text(s.db.getDiagramTitle()).attr("x",n/2).attr("y",c.titleTopMargin).attr("class","titleText"),(0,r.__name)(L,"makeGantt"),(0,r.__name)(P,"drawRects"),(0,r.__name)(Y,"drawExcludeDays"),(0,r.__name)(B,"getEstimatedTickCount"),(0,r.__name)(N,"makeGrid"),(0,r.__name)(W,"vertLabels"),(0,r.__name)(H,"drawToday"),(0,r.__name)(j,"checkUnique")},"draw")},styles:(0,r.__name)(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .vert {
    stroke: ${t.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${t.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles")};t.s(["diagram",()=>tV])}]);