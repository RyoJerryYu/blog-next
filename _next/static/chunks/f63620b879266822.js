(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,93746,t=>{"use strict";var e=t.i(90983);t.s(["clone",()=>e.default])},43005,t=>{"use strict";var e=Object.prototype.hasOwnProperty;let i=function(t,i){return null!=t&&e.call(t,i)};var s=t.i(17203);t.s(["has",0,function(t,e){return null!=t&&(0,s.default)(t,e,i)}],43005)},48935,t=>{"use strict";var e=t.i(72766);t.s(["forEach",()=>e.default])},4051,7005,t=>{"use strict";var e=t.i(34020);let i=function(t){return(null==t?0:t.length)?(0,e.default)(t,1):[]};t.s(["default",0,i],7005),t.s(["flatten",0,i],4051)},71261,70257,92935,90300,t=>{"use strict";var e=t.i(2705),i=t.i(40889),s=t.i(64564),r=t.i(74086);let n=function(t,e){var i=-1,n=(0,r.default)(t)?Array(t.length):[];return(0,s.default)(t,function(t,s,r){n[++i]=e(t,s,r)}),n};t.s(["default",0,n],70257);var a=t.i(46315);let o=function(t,s){return((0,a.default)(t)?e.default:n)(t,(0,i.default)(s,3))};t.s(["default",0,o],92935),t.s(["map",0,o],71261);var l=/\s/;let c=function(t){for(var e=t.length;e--&&l.test(t.charAt(e)););return e};var u=/^\s+/,h=t.i(76061),d=t.i(71211),f=0/0,p=/^[-+]0x[0-9a-f]+$/i,y=/^0b[01]+$/i,g=/^0o[0-7]+$/i,m=parseInt;let S=function(t){if("number"==typeof t)return t;if((0,d.default)(t))return f;if((0,h.default)(t)){var e,i="function"==typeof t.valueOf?t.valueOf():t;t=(0,h.default)(i)?i+"":i}if("string"!=typeof t)return 0===t?t:+t;t=(e=t)?e.slice(0,c(e)+1).replace(u,""):e;var s=y.test(t);return s||g.test(t)?m(t.slice(2),s?2:8):p.test(t)?f:+t};var b=1/0;t.s(["default",0,function(t){return t?(t=S(t))===b||t===-b?(t<0?-1:1)*17976931348623157e292:t==t?t:0:0===t?t:0}],90300)},46975,t=>{"use strict";var e=t.i(88943),i=t.i(27961),s=t.i(39275),r=t.i(59592),n=t.i(76061),a=t.i(8413);let o=function(t,e,o,l){if(!(0,n.default)(t))return t;e=(0,s.default)(e,t);for(var c=-1,u=e.length,h=u-1,d=t;null!=d&&++c<u;){var f=(0,a.default)(e[c]),p=o;if("__proto__"===f||"constructor"===f||"prototype"===f)break;if(c!=h){var y=d[f];void 0===(p=l?l(y,f,d):void 0)&&(p=(0,n.default)(y)?y:(0,r.default)(e[c+1])?[]:{})}(0,i.default)(d,f,p),d=d[f]}return t};t.s(["default",0,function(t,i,r){for(var n=-1,a=i.length,l={};++n<a;){var c=i[n],u=(0,e.default)(t,c);r(u,c)&&o(l,(0,s.default)(c,t),u)}return l}],46975)},69943,t=>{"use strict";var e=t.i(93332),i=t.i(16715),s=t.i(95854),r=t.i(21869),n=Object.prototype,a=n.hasOwnProperty,o=(0,e.default)(function(t,e){t=Object(t);var o=-1,l=e.length,c=l>2?e[2]:void 0;for(c&&(0,s.default)(e[0],e[1],c)&&(l=1);++o<l;)for(var u=e[o],h=(0,r.default)(u),d=-1,f=h.length;++d<f;){var p=h[d],y=t[p];(void 0===y||(0,i.default)(y,n[p])&&!a.call(t,p))&&(t[p]=u[p])}return t});t.s(["defaults",0,o],69943)},16938,t=>{"use strict";var e=t.i(71211);t.s(["default",0,function(t,i,s){for(var r=-1,n=t.length;++r<n;){var a=t[r],o=i(a);if(null!=o&&(void 0===l?o==o&&!(0,e.default)(o):s(o,l)))var l=o,c=a}return c}])},46533,t=>{"use strict";t.s(["last",0,function(t){var e=null==t?0:t.length;return e?t[e-1]:void 0}],46533)},41867,69786,t=>{"use strict";var e=t.i(16938);let i=function(t,e){return t<e};t.s(["default",0,i],69786);var s=t.i(55920);t.s(["default",0,function(t){return t&&t.length?(0,e.default)(t,s.default,i):void 0}],41867)},49674,t=>{"use strict";var e=t.i(40889),i=t.i(74086),s=t.i(31860);t.s(["default",0,function(t){return function(r,n,a){var o=Object(r);if(!(0,i.default)(r)){var l=(0,e.default)(n,3);r=(0,s.default)(r),n=function(t){return l(o[t],t,o)}}var c=t(r,n,a);return c>-1?o[l?r[c]:c]:void 0}}])},73796,t=>{"use strict";var e=t.i(90300);t.s(["default",0,function(t){var i=(0,e.default)(t),s=i%1;return i==i?s?i-s:i:0}])},77854,t=>{"use strict";var e=t.i(49674),i=t.i(53928),s=t.i(40889),r=t.i(73796),n=Math.max,a=(0,e.default)(function(t,e,a){var o=null==t?0:t.length;if(!o)return -1;var l=null==a?0:(0,r.default)(a);return l<0&&(l=n(o+l,0)),(0,i.default)(t,(0,s.default)(e,3),l)});t.s(["find",0,a],77854)},12031,t=>{"use strict";var e=t.i(62790),i=t.i(46315),s=t.i(42355);t.s(["default",0,function(t){return"string"==typeof t||!(0,i.default)(t)&&(0,s.default)(t)&&"[object String]"==(0,e.default)(t)}])},40533,t=>{"use strict";var e=RegExp("[\\u200d\ud800-\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");t.s(["default",0,function(t){return e.test(t)}])},35478,t=>{"use strict";var e=t.i(46315);t.s(["isArray",()=>e.default])},90983,t=>{"use strict";var e=t.i(44869);t.s(["default",0,function(t){return(0,e.default)(t,4)}])},24863,t=>{"use strict";var e=t.i(34599),i=function(){var t=function(t,e,i,s){for(i=i||{},s=t.length;s--;i[t[s]]=e);return i},e=[1,2],i=[1,3],s=[1,4],r=[2,4],n=[1,9],a=[1,11],o=[1,15],l=[1,16],c=[1,17],u=[1,18],h=[1,30],d=[1,19],f=[1,20],p=[1,21],y=[1,22],g=[1,23],m=[1,25],S=[1,26],b=[1,27],_=[1,28],T=[1,29],k=[1,32],v=[1,33],x=[1,34],E=[1,35],$=[1,31],A=[1,4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],D=[1,4,5,13,14,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],C=[4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],L={trace:function(){},yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,cssClassStatement:11,idStatement:12,DESCR:13,"-->":14,HIDE_EMPTY:15,scale:16,WIDTH:17,COMPOSIT_STATE:18,STRUCT_START:19,STRUCT_STOP:20,STATE_DESCR:21,AS:22,ID:23,FORK:24,JOIN:25,CHOICE:26,CONCURRENT:27,note:28,notePosition:29,NOTE_TEXT:30,direction:31,acc_title:32,acc_title_value:33,acc_descr:34,acc_descr_value:35,acc_descr_multiline_value:36,classDef:37,CLASSDEF_ID:38,CLASSDEF_STYLEOPTS:39,DEFAULT:40,class:41,CLASSENTITY_IDS:42,STYLECLASS:43,direction_tb:44,direction_bt:45,direction_rl:46,direction_lr:47,eol:48,";":49,EDGE_STATE:50,STYLE_SEPARATOR:51,left_of:52,right_of:53,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",13:"DESCR",14:"-->",15:"HIDE_EMPTY",16:"scale",17:"WIDTH",18:"COMPOSIT_STATE",19:"STRUCT_START",20:"STRUCT_STOP",21:"STATE_DESCR",22:"AS",23:"ID",24:"FORK",25:"JOIN",26:"CHOICE",27:"CONCURRENT",28:"note",30:"NOTE_TEXT",32:"acc_title",33:"acc_title_value",34:"acc_descr",35:"acc_descr_value",36:"acc_descr_multiline_value",37:"classDef",38:"CLASSDEF_ID",39:"CLASSDEF_STYLEOPTS",40:"DEFAULT",41:"class",42:"CLASSENTITY_IDS",43:"STYLECLASS",44:"direction_tb",45:"direction_bt",46:"direction_rl",47:"direction_lr",49:";",50:"EDGE_STATE",51:"STYLE_SEPARATOR",52:"left_of",53:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[10,3],[10,3],[11,3],[31,1],[31,1],[31,1],[31,1],[48,1],[48,1],[12,1],[12,1],[12,3],[12,3],[29,1],[29,1]],performAction:function(t,e,i,s,r,n,a){var o=n.length-1;switch(r){case 3:return s.setRootDoc(n[o]),n[o];case 4:this.$=[];break;case 5:"nl"!=n[o]&&(n[o-1].push(n[o]),this.$=n[o-1]);break;case 6:case 7:case 11:this.$=n[o];break;case 8:this.$="nl";break;case 12:let l=n[o-1];l.description=s.trimColon(n[o]),this.$=l;break;case 13:this.$={stmt:"relation",state1:n[o-2],state2:n[o]};break;case 14:let c=s.trimColon(n[o]);this.$={stmt:"relation",state1:n[o-3],state2:n[o-1],description:c};break;case 18:this.$={stmt:"state",id:n[o-3],type:"default",description:"",doc:n[o-1]};break;case 19:var u=n[o],h=n[o-2].trim();if(n[o].match(":")){var d=n[o].split(":");u=d[0],h=[h,d[1]]}this.$={stmt:"state",id:u,type:"default",description:h};break;case 20:this.$={stmt:"state",id:n[o-3],type:"default",description:n[o-5],doc:n[o-1]};break;case 21:this.$={stmt:"state",id:n[o],type:"fork"};break;case 22:this.$={stmt:"state",id:n[o],type:"join"};break;case 23:this.$={stmt:"state",id:n[o],type:"choice"};break;case 24:this.$={stmt:"state",id:s.getDividerId(),type:"divider"};break;case 25:this.$={stmt:"state",id:n[o-1].trim(),note:{position:n[o-2].trim(),text:n[o].trim()}};break;case 28:this.$=n[o].trim(),s.setAccTitle(this.$);break;case 29:case 30:this.$=n[o].trim(),s.setAccDescription(this.$);break;case 31:case 32:this.$={stmt:"classDef",id:n[o-1].trim(),classes:n[o].trim()};break;case 33:this.$={stmt:"applyClass",id:n[o-1].trim(),styleClass:n[o].trim()};break;case 34:s.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 35:s.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 36:s.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 37:s.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 40:case 41:this.$={stmt:"state",id:n[o].trim(),type:"default",description:""};break;case 42:case 43:this.$={stmt:"state",id:n[o-2].trim(),classes:[n[o].trim()],type:"default",description:""}}},table:[{3:1,4:e,5:i,6:s},{1:[3]},{3:5,4:e,5:i,6:s},{3:6,4:e,5:i,6:s},t([1,4,5,15,16,18,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],r,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:n,5:a,8:8,9:10,10:12,11:13,12:14,15:o,16:l,18:c,21:u,23:h,24:d,25:f,26:p,27:y,28:g,31:24,32:m,34:S,36:b,37:_,41:T,44:k,45:v,46:x,47:E,50:$},t(A,[2,5]),{9:36,10:12,11:13,12:14,15:o,16:l,18:c,21:u,23:h,24:d,25:f,26:p,27:y,28:g,31:24,32:m,34:S,36:b,37:_,41:T,44:k,45:v,46:x,47:E,50:$},t(A,[2,7]),t(A,[2,8]),t(A,[2,9]),t(A,[2,10]),t(A,[2,11],{13:[1,37],14:[1,38]}),t(A,[2,15]),{17:[1,39]},t(A,[2,17],{19:[1,40]}),{22:[1,41]},t(A,[2,21]),t(A,[2,22]),t(A,[2,23]),t(A,[2,24]),{29:42,30:[1,43],52:[1,44],53:[1,45]},t(A,[2,27]),{33:[1,46]},{35:[1,47]},t(A,[2,30]),{38:[1,48],40:[1,49]},{42:[1,50]},t(D,[2,40],{51:[1,51]}),t(D,[2,41],{51:[1,52]}),t(A,[2,34]),t(A,[2,35]),t(A,[2,36]),t(A,[2,37]),t(A,[2,6]),t(A,[2,12]),{12:53,23:h,50:$},t(A,[2,16]),t(C,r,{7:54}),{23:[1,55]},{23:[1,56]},{22:[1,57]},{23:[2,44]},{23:[2,45]},t(A,[2,28]),t(A,[2,29]),{39:[1,58]},{39:[1,59]},{43:[1,60]},{23:[1,61]},{23:[1,62]},t(A,[2,13],{13:[1,63]}),{4:n,5:a,8:8,9:10,10:12,11:13,12:14,15:o,16:l,18:c,20:[1,64],21:u,23:h,24:d,25:f,26:p,27:y,28:g,31:24,32:m,34:S,36:b,37:_,41:T,44:k,45:v,46:x,47:E,50:$},t(A,[2,19],{19:[1,65]}),{30:[1,66]},{23:[1,67]},t(A,[2,31]),t(A,[2,32]),t(A,[2,33]),t(D,[2,42]),t(D,[2,43]),t(A,[2,14]),t(A,[2,18]),t(C,r,{7:68}),t(A,[2,25]),t(A,[2,26]),{4:n,5:a,8:8,9:10,10:12,11:13,12:14,15:o,16:l,18:c,20:[1,69],21:u,23:h,24:d,25:f,26:p,27:y,28:g,31:24,32:m,34:S,36:b,37:_,41:T,44:k,45:v,46:x,47:E,50:$},t(A,[2,20])],defaultActions:{5:[2,1],6:[2,2],44:[2,44],45:[2,45]},parseError:function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i}},parse:function(t){var e=this,i=[0],s=[],r=[null],n=[],a=this.table,o="",l=0,c=0,u=n.slice.call(arguments,1),h=Object.create(this.lexer),d={};for(var f in this.yy)Object.prototype.hasOwnProperty.call(this.yy,f)&&(d[f]=this.yy[f]);h.setInput(t,d),d.lexer=h,d.parser=this,void 0===h.yylloc&&(h.yylloc={});var p=h.yylloc;n.push(p);var y=h.options&&h.options.ranges;"function"==typeof d.parseError?this.parseError=d.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var g,m,S,b,_,T,k,v,x={};;){if(m=i[i.length-1],this.defaultActions[m]?S=this.defaultActions[m]:(null==g&&(g=function(){var t;return"number"!=typeof(t=s.pop()||h.lex()||1)&&(t instanceof Array&&(t=(s=t).pop()),t=e.symbols_[t]||t),t}()),S=a[m]&&a[m][g]),void 0===S||!S.length||!S[0]){var E="";for(_ in v=[],a[m])this.terminals_[_]&&_>2&&v.push("'"+this.terminals_[_]+"'");E=h.showPosition?"Parse error on line "+(l+1)+":\n"+h.showPosition()+"\nExpecting "+v.join(", ")+", got '"+(this.terminals_[g]||g)+"'":"Parse error on line "+(l+1)+": Unexpected "+(1==g?"end of input":"'"+(this.terminals_[g]||g)+"'"),this.parseError(E,{text:h.match,token:this.terminals_[g]||g,line:h.yylineno,loc:p,expected:v})}if(S[0]instanceof Array&&S.length>1)throw Error("Parse Error: multiple actions possible at state: "+m+", token: "+g);switch(S[0]){case 1:i.push(g),r.push(h.yytext),n.push(h.yylloc),i.push(S[1]),g=null,c=h.yyleng,o=h.yytext,l=h.yylineno,p=h.yylloc;break;case 2:if(T=this.productions_[S[1]][1],x.$=r[r.length-T],x._$={first_line:n[n.length-(T||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-(T||1)].first_column,last_column:n[n.length-1].last_column},y&&(x._$.range=[n[n.length-(T||1)].range[0],n[n.length-1].range[1]]),void 0!==(b=this.performAction.apply(x,[o,c,l,d,S[1],r,n].concat(u))))return b;T&&(i=i.slice(0,-1*T*2),r=r.slice(0,-1*T),n=n.slice(0,-1*T)),i.push(this.productions_[S[1]][0]),r.push(x.$),n.push(x._$),k=a[i[i.length-2]][i[i.length-1]],i.push(k);break;case 3:return!0}}return!0}};function I(){this.yy={}}return L.lexer={EOF:1,parseError:function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},setInput:function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var s=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===s.length?this.yylloc.first_column:0)+s[s.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},test_match:function(t,e){var i,s,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),(s=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=s.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:s?s[s.length-1].length-s[s.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var n in r)this[n]=r[n];return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,i,s,r=this._currentRules(),n=0;n<r.length;n++)if((i=this._input.match(this.rules[r[n]]))&&(!e||i[0].length>e[0].length)){if(e=i,s=n,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,r[n])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,r[s]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return t||this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},pushState:function(t){this.begin(t)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(t,e,i,s){switch(i){case 0:return 40;case 1:case 39:return 44;case 2:case 40:return 45;case 3:case 41:return 46;case 4:case 42:return 47;case 5:case 6:case 8:case 9:case 10:case 11:case 51:case 53:case 59:break;case 7:case 74:return 5;case 12:case 29:return this.pushState("SCALE"),16;case 13:case 30:return 17;case 14:case 20:case 31:case 46:case 49:this.popState();break;case 15:return this.begin("acc_title"),32;case 16:return this.popState(),"acc_title_value";case 17:return this.begin("acc_descr"),34;case 18:return this.popState(),"acc_descr_value";case 19:this.begin("acc_descr_multiline");break;case 21:return"acc_descr_multiline_value";case 22:return this.pushState("CLASSDEF"),37;case 23:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 24:return this.popState(),this.pushState("CLASSDEFID"),38;case 25:return this.popState(),39;case 26:return this.pushState("CLASS"),41;case 27:return this.popState(),this.pushState("CLASS_STYLE"),42;case 28:return this.popState(),43;case 32:this.pushState("STATE");break;case 33:case 36:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),24;case 34:case 37:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),25;case 35:case 38:return this.popState(),e.yytext=e.yytext.slice(0,-10).trim(),26;case 43:this.pushState("STATE_STRING");break;case 44:return this.pushState("STATE_ID"),"AS";case 45:case 61:return this.popState(),"ID";case 47:return"STATE_DESCR";case 48:return 18;case 50:return this.popState(),this.pushState("struct"),19;case 52:return this.popState(),20;case 54:return this.begin("NOTE"),28;case 55:return this.popState(),this.pushState("NOTE_ID"),52;case 56:return this.popState(),this.pushState("NOTE_ID"),53;case 57:this.popState(),this.pushState("FLOATING_NOTE");break;case 58:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 60:return"NOTE_TEXT";case 62:return this.popState(),this.pushState("NOTE_TEXT"),23;case 63:return this.popState(),e.yytext=e.yytext.substr(2).trim(),30;case 64:return this.popState(),e.yytext=e.yytext.slice(0,-8).trim(),30;case 65:case 66:return 6;case 67:return 15;case 68:return 50;case 69:return 23;case 70:return e.yytext=e.yytext.trim(),13;case 71:return 14;case 72:return 27;case 73:return 51;case 75:return"INVALID"}},rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[9,10],inclusive:!1},struct:{rules:[9,10,22,26,32,39,40,41,42,51,52,53,54,68,69,70,71,72],inclusive:!1},FLOATING_NOTE_ID:{rules:[61],inclusive:!1},FLOATING_NOTE:{rules:[58,59,60],inclusive:!1},NOTE_TEXT:{rules:[63,64],inclusive:!1},NOTE_ID:{rules:[62],inclusive:!1},NOTE:{rules:[55,56,57],inclusive:!1},CLASS_STYLE:{rules:[28],inclusive:!1},CLASS:{rules:[27],inclusive:!1},CLASSDEFID:{rules:[25],inclusive:!1},CLASSDEF:{rules:[23,24],inclusive:!1},acc_descr_multiline:{rules:[20,21],inclusive:!1},acc_descr:{rules:[18],inclusive:!1},acc_title:{rules:[16],inclusive:!1},SCALE:{rules:[13,14,30,31],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[45],inclusive:!1},STATE_STRING:{rules:[46,47],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[9,10,33,34,35,36,37,38,43,44,48,49,50],inclusive:!1},ID:{rules:[9,10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,10,11,12,15,17,19,22,26,29,32,50,54,65,66,67,68,69,70,71,73,74,75],inclusive:!0}}},I.prototype=L,L.Parser=I,new I}();i.parser=i;let s="state",r="relation",n="default",a="divider",o="start",l="color",c="fill",u="LR",h=[],d={},f=()=>({relations:[],states:{},documents:{}}),p={root:f()},y=p.root,g=0,m=0,S=t=>JSON.parse(JSON.stringify(t)),b=(t,i,n)=>{if(i.stmt===r)b(t,i.state1,!0),b(t,i.state2,!1);else if(i.stmt===s&&("[*]"===i.id?(i.id=n?t.id+"_start":t.id+"_end",i.start=n):i.id=i.id.trim()),i.doc){let t,r=[],n=[];for(t=0;t<i.doc.length;t++)if(i.doc[t].type===a){let e=S(i.doc[t]);e.doc=S(n),r.push(e),n=[]}else n.push(i.doc[t]);if(r.length>0&&n.length>0){let t={stmt:s,id:(0,e.I)(),type:"divider",doc:S(n)};r.push(S(t)),i.doc=r}i.doc.forEach(t=>b(i,t,!0))}},_=function(t,i=n,s=null,r=null,a=null,o=null,l=null,c=null){let u=null==t?void 0:t.trim();void 0===y.states[u]?(e.l.info("Adding state ",u,r),y.states[u]={id:u,descriptions:[],type:i,doc:s,note:a,classes:[],styles:[],textStyles:[]}):(y.states[u].doc||(y.states[u].doc=s),y.states[u].type||(y.states[u].type=i)),r&&(e.l.info("Setting state description",u,r),"string"==typeof r&&$(u,r.trim()),"object"==typeof r&&r.forEach(t=>$(u,t.trim()))),a&&(y.states[u].note=a,y.states[u].note.text=e.e.sanitizeText(y.states[u].note.text,(0,e.c)())),o&&(e.l.info("Setting state classes",u,o),("string"==typeof o?[o]:o).forEach(t=>D(u,t.trim()))),l&&(e.l.info("Setting state styles",u,l),("string"==typeof l?[l]:l).forEach(t=>C(u,t.trim()))),c&&(e.l.info("Setting state styles",u,l),("string"==typeof c?[c]:c).forEach(t=>L(u,t.trim())))},T=function(t){y=(p={root:f()}).root,g=0,d={},t||(0,e.v)()},k=function(t){return y.states[t]};function v(t=""){let e=t;return"[*]"===t&&(g++,e=`${o}${g}`),e}function x(t="",e=n){return"[*]"===t?o:e}let E=function(t,i,s){if("object"==typeof t){let r,n,a,o;r=v(t.id.trim()),n=x(t.id.trim(),t.type),a=v(i.id.trim()),o=x(i.id.trim(),i.type),_(r,n,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),_(a,o,i.doc,i.description,i.note,i.classes,i.styles,i.textStyles),y.relations.push({id1:r,id2:a,relationTitle:e.e.sanitizeText(s,(0,e.c)())})}else{let r=v(t.trim()),a=x(t),o=function(t=""){let e=t;return"[*]"===t&&(g++,e=`end${g}`),e}(i.trim()),l=function(t="",e=n){return"[*]"===t?"end":e}(i);_(r,a),_(o,l),y.relations.push({id1:r,id2:o,title:e.e.sanitizeText(s,(0,e.c)())})}},$=function(t,i){let s=y.states[t],r=i.startsWith(":")?i.replace(":","").trim():i;s.descriptions.push(e.e.sanitizeText(r,(0,e.c)()))},A=function(t,e=""){void 0===d[t]&&(d[t]={id:t,styles:[],textStyles:[]});let i=d[t];null!=e&&e.split(",").forEach(t=>{let e=t.replace(/([^;]*);/,"$1").trim();if(t.match(l)){let t=e.replace(c,"bgFill").replace(l,c);i.textStyles.push(t)}i.styles.push(e)})},D=function(t,e){t.split(",").forEach(function(t){let i=k(t);if(void 0===i){let e=t.trim();_(e),i=k(e)}i.classes.push(e)})},C=function(t,e){let i=k(t);void 0!==i&&i.textStyles.push(e)},L=function(t,e){let i=k(t);void 0!==i&&i.textStyles.push(e)},I={getConfig:()=>(0,e.c)().state,addState:_,clear:T,getState:k,getStates:function(){return y.states},getRelations:function(){return y.relations},getClasses:function(){return d},getDirection:()=>u,addRelation:E,getDividerId:()=>"divider-id-"+ ++m,setDirection:t=>{u=t},cleanupLabel:function(t){return":"===t.substring(0,1)?t.substr(2).trim():t.trim()},lineType:{LINE:0,DOTTED_LINE:1},relationType:{AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},logDocuments:function(){e.l.info("Documents = ",p)},getRootDoc:()=>h,setRootDoc:t=>{e.l.info("Setting root doc",t),h=t},getRootDocV2:()=>(b({id:"root"},{id:"root",doc:h},!0),{id:"root",doc:h}),extract:t=>{let i;i=t.doc?t.doc:t,e.l.info(i),T(!0),e.l.info("Extract",i),i.forEach(t=>{switch(t.stmt){case s:_(t.id.trim(),t.type,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles);break;case r:E(t.state1,t.state2,t.description);break;case"classDef":A(t.id.trim(),t.classes);break;case"applyClass":D(t.id.trim(),t.styleClass)}})},trimColon:t=>t&&":"===t[0]?t.substr(1).trim():t.trim(),getAccTitle:e.g,setAccTitle:e.s,getAccDescription:e.a,setAccDescription:e.b,addStyleClass:A,setCssClass:D,addDescription:$,setDiagramTitle:e.q,getDiagramTitle:e.t},O=t=>`
defs #statediagram-barbEnd {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}
`;t.s(["D",()=>n,"S",()=>r,"a",()=>a,"b",()=>s,"c",()=>"TB","d",()=>I,"p",()=>i,"s",()=>O])},94229,t=>{"use strict";var e=t.i(24863);t.i(26754);var i=t.i(14447);t.i(31345);var s=t.i(12638),r=t.i(34599),n=t.i(91929);t.i(94176),t.i(94834),t.i(81324),t.i(5792),t.i(30187),t.i(57722);let a="rect",o="rectWithTitle",l="statediagram",c=`${l}-state`,u="transition",h=`${u} note-edge`,d=`${l}-note`,f=`${l}-cluster`,p=`${l}-cluster-alt`,y="parent",g="note",m="----",S=`${m}${g}`,b=`${m}${y}`,_="fill:none",T="fill: #333",k="text",v="normal",x={},E=0;function $(t="",e=0,i="",s=m){let r=null!==i&&i.length>0?`${s}${i}`:"";return`state-${t}${r}-${e}`}let A=(t,i,s,n,l,u)=>{var m;let A=s.id,L=null==(m=n[A])?"":m.classes?m.classes.join(" "):"";if("root"!==A){let i=a;!0===s.start&&(i="start"),!1===s.start&&(i="end"),s.type!==e.D&&(i=s.type),x[A]||(x[A]={id:A,shape:i,description:r.e.sanitizeText(A,(0,r.c)()),classes:`${L} ${c}`});let n=x[A];s.description&&(Array.isArray(n.description)?(n.shape=o,n.description.push(s.description)):n.description.length>0?(n.shape=o,n.description===A?n.description=[s.description]:n.description=[n.description,s.description]):(n.shape=a,n.description=s.description),n.description=r.e.sanitizeTextOrArray(n.description,(0,r.c)())),1===n.description.length&&n.shape===o&&(n.shape=a),!n.type&&s.doc&&(r.l.info("Setting cluster for ",A,C(s)),n.type="group",n.dir=C(s),n.shape=s.type===e.a?"divider":"roundedWithTitle",n.classes=n.classes+" "+f+" "+(u?p:""));let l={labelStyle:"",shape:n.shape,labelText:n.description,classes:n.classes,style:"",id:A,dir:n.dir,domId:$(A,E),type:n.type,padding:15};if(l.centerLabel=!0,s.note){let e={labelStyle:"",shape:"note",labelText:s.note.text,classes:d,style:"",id:A+S+"-"+E,domId:$(A,E,g),type:n.type,padding:15},i={labelStyle:"",shape:"noteGroup",labelText:s.note.text,classes:n.classes,style:"",id:A+b,domId:$(A,E,y),type:"group",padding:0};E++;let r=A+b;t.setNode(r,i),t.setNode(e.id,e),t.setNode(A,l),t.setParent(A,r),t.setParent(e.id,r);let a=A,o=e.id;"left of"===s.note.position&&(a=e.id,o=A),t.setEdge(a,o,{arrowhead:"none",arrowType:"",style:_,labelStyle:"",classes:h,arrowheadStyle:T,labelpos:"c",labelType:k,thickness:v})}else t.setNode(A,l)}i&&"root"!==i.id&&(r.l.trace("Setting node ",A," to be child of its parent ",i.id),t.setParent(A,i.id)),s.doc&&(r.l.trace("Adding nodes children "),D(t,s,s.doc,n,l,!u))},D=(t,i,s,n,a,o)=>{r.l.trace("items",s),s.forEach(s=>{switch(s.stmt){case e.b:case e.D:A(t,i,s,n,a,o);break;case e.S:{A(t,i,s.state1,n,a,o),A(t,i,s.state2,n,a,o);let e={id:"edge"+E,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:_,labelStyle:"",label:r.e.sanitizeText(s.description,(0,r.c)()),arrowheadStyle:T,labelpos:"c",labelType:k,thickness:v,classes:u};t.setEdge(s.state1.id,s.state2.id,e,E),E++}}})},C=(t,i=e.c)=>{let s=i;if(t.doc)for(let e=0;e<t.doc.length;e++){let i=t.doc[e];"dir"===i.stmt&&(s=i.value)}return s},L=async function(t,e,o,c){let u;r.l.info("Drawing state diagram (v2)",e),x={},c.db.getDirection();let{securityLevel:h,state:d}=(0,r.c)(),f=d.nodeSpacing||50,p=d.rankSpacing||50;r.l.info(c.db.getRootDocV2()),c.db.extract(c.db.getRootDocV2()),r.l.info(c.db.getRootDocV2());let y=c.db.getStates(),g=new i.Graph({multigraph:!0,compound:!0}).setGraph({rankdir:C(c.db.getRootDocV2()),nodesep:f,ranksep:p,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}});A(g,void 0,c.db.getRootDocV2(),y,c.db,!0),"sandbox"===h&&(u=(0,s.select)("#i"+e));let m="sandbox"===h?(0,s.select)(u.nodes()[0].contentDocument.body):(0,s.select)("body"),S=m.select(`[id="${e}"]`),b=m.select("#"+e+" g");await (0,n.r)(b,g,["barb"],l,e),r.u.insertTitle(S,"statediagramTitleText",d.titleTopMargin,c.db.getDiagramTitle());let _=S.node().getBBox(),T=_.width+16,k=_.height+16;S.attr("class",l);let v=S.node().getBBox();(0,r.i)(S,k,T,d.useMaxWidth);let E=`${v.x-8} ${v.y-8} ${T} ${k}`;for(let t of(r.l.debug(`viewBox ${E}`),S.attr("viewBox",E),document.querySelectorAll('[id="'+e+'"] .edgeLabel .label'))){let e=t.getBBox(),i=document.createElementNS("http://www.w3.org/2000/svg",a);i.setAttribute("rx",0),i.setAttribute("ry",0),i.setAttribute("width",e.width),i.setAttribute("height",e.height),t.insertBefore(i,t.firstChild)}},I={parser:e.p,db:e.d,renderer:{setConf:function(t){for(let e of Object.keys(t))t[e]},getClasses:function(t,e){return e.db.extract(e.db.getRootDocV2()),e.db.getClasses()},draw:L},styles:e.s,init:t=>{t.state||(t.state={}),t.state.arrowMarkerAbsolute=t.arrowMarkerAbsolute,e.d.clear()}};t.s(["diagram",()=>I])}]);