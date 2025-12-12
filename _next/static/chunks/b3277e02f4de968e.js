(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,53356,t=>{"use strict";var e=t.i(72301),i=t.i(51711),n=t.i(80696);function r(t){return t.innerRadius}function a(t){return t.outerRadius}function s(t){return t.startAngle}function l(t){return t.endAngle}function o(t){return t&&t.padAngle}function c(t,e,n,r,a,s,l){var o=t-n,c=e-r,h=(l?s:-s)/(0,i.sqrt)(o*o+c*c),u=h*c,y=-h*o,p=t+u,f=e+y,d=n+u,g=r+y,x=(p+d)/2,m=(f+g)/2,k=d-p,_=g-f,b=k*k+_*_,v=a-s,$=p*g-d*f,w=(_<0?-1:1)*(0,i.sqrt)((0,i.max)(0,v*v*b-$*$)),M=($*_-k*w)/b,T=(-$*k-_*w)/b,A=($*_+k*w)/b,E=(-$*k+_*w)/b,P=M-x,S=T-m,I=A-x,C=E-m;return P*P+S*S>I*I+C*C&&(M=A,T=E),{cx:M,cy:T,x01:-u,y01:-y,x11:M*(a/v-1),y11:T*(a/v-1)}}t.s(["arc",0,function(){var t=r,h=a,u=(0,e.default)(0),y=null,p=s,f=l,d=o,g=null,x=(0,n.withPath)(m);function m(){var e,n,r=+t.apply(this,arguments),a=+h.apply(this,arguments),s=p.apply(this,arguments)-i.halfPi,l=f.apply(this,arguments)-i.halfPi,o=(0,i.abs)(l-s),m=l>s;if(g||(g=e=x()),a<r&&(n=a,a=r,r=n),a>i.epsilon)if(o>i.tau-i.epsilon)g.moveTo(a*(0,i.cos)(s),a*(0,i.sin)(s)),g.arc(0,0,a,s,l,!m),r>i.epsilon&&(g.moveTo(r*(0,i.cos)(l),r*(0,i.sin)(l)),g.arc(0,0,r,l,s,m));else{var k,_,b=s,v=l,$=s,w=l,M=o,T=o,A=d.apply(this,arguments)/2,E=A>i.epsilon&&(y?+y.apply(this,arguments):(0,i.sqrt)(r*r+a*a)),P=(0,i.min)((0,i.abs)(a-r)/2,+u.apply(this,arguments)),S=P,I=P;if(E>i.epsilon){var C=(0,i.asin)(E/r*(0,i.sin)(A)),j=(0,i.asin)(E/a*(0,i.sin)(A));(M-=2*C)>i.epsilon?(C*=m?1:-1,$+=C,w-=C):(M=0,$=w=(s+l)/2),(T-=2*j)>i.epsilon?(j*=m?1:-1,b+=j,v-=j):(T=0,b=v=(s+l)/2)}var O=a*(0,i.cos)(b),V=a*(0,i.sin)(b),D=r*(0,i.cos)(w),R=r*(0,i.sin)(w);if(P>i.epsilon){var L,N=a*(0,i.cos)(v),q=a*(0,i.sin)(v),B=r*(0,i.cos)($),F=r*(0,i.sin)($);if(o<i.pi)if(L=function(t,e,n,r,a,s,l,o){var c=n-t,h=r-e,u=l-a,y=o-s,p=y*c-u*h;if(!(p*p<i.epsilon))return p=(u*(e-s)-y*(t-a))/p,[t+p*c,e+p*h]}(O,V,B,F,N,q,D,R)){var z=O-L[0],U=V-L[1],Y=N-L[0],W=q-L[1],X=1/(0,i.sin)((0,i.acos)((z*Y+U*W)/((0,i.sqrt)(z*z+U*U)*(0,i.sqrt)(Y*Y+W*W)))/2),K=(0,i.sqrt)(L[0]*L[0]+L[1]*L[1]);S=(0,i.min)(P,(r-K)/(X-1)),I=(0,i.min)(P,(a-K)/(X+1))}else S=I=0}T>i.epsilon?I>i.epsilon?(k=c(B,F,O,V,a,I,m),_=c(N,q,D,R,a,I,m),g.moveTo(k.cx+k.x01,k.cy+k.y01),I<P?g.arc(k.cx,k.cy,I,(0,i.atan2)(k.y01,k.x01),(0,i.atan2)(_.y01,_.x01),!m):(g.arc(k.cx,k.cy,I,(0,i.atan2)(k.y01,k.x01),(0,i.atan2)(k.y11,k.x11),!m),g.arc(0,0,a,(0,i.atan2)(k.cy+k.y11,k.cx+k.x11),(0,i.atan2)(_.cy+_.y11,_.cx+_.x11),!m),g.arc(_.cx,_.cy,I,(0,i.atan2)(_.y11,_.x11),(0,i.atan2)(_.y01,_.x01),!m))):(g.moveTo(O,V),g.arc(0,0,a,b,v,!m)):g.moveTo(O,V),r>i.epsilon&&M>i.epsilon?S>i.epsilon?(k=c(D,R,N,q,r,-S,m),_=c(O,V,B,F,r,-S,m),g.lineTo(k.cx+k.x01,k.cy+k.y01),S<P?g.arc(k.cx,k.cy,S,(0,i.atan2)(k.y01,k.x01),(0,i.atan2)(_.y01,_.x01),!m):(g.arc(k.cx,k.cy,S,(0,i.atan2)(k.y01,k.x01),(0,i.atan2)(k.y11,k.x11),!m),g.arc(0,0,r,(0,i.atan2)(k.cy+k.y11,k.cx+k.x11),(0,i.atan2)(_.cy+_.y11,_.cx+_.x11),m),g.arc(_.cx,_.cy,S,(0,i.atan2)(_.y11,_.x11),(0,i.atan2)(_.y01,_.x01),!m))):g.arc(0,0,r,w,$,m):g.lineTo(D,R)}else g.moveTo(0,0);if(g.closePath(),e)return g=null,e+""||null}return m.centroid=function(){var e=(+t.apply(this,arguments)+ +h.apply(this,arguments))/2,n=(+p.apply(this,arguments)+ +f.apply(this,arguments))/2-i.pi/2;return[(0,i.cos)(n)*e,(0,i.sin)(n)*e]},m.innerRadius=function(i){return arguments.length?(t="function"==typeof i?i:(0,e.default)(+i),m):t},m.outerRadius=function(t){return arguments.length?(h="function"==typeof t?t:(0,e.default)(+t),m):h},m.cornerRadius=function(t){return arguments.length?(u="function"==typeof t?t:(0,e.default)(+t),m):u},m.padRadius=function(t){return arguments.length?(y=null==t?null:"function"==typeof t?t:(0,e.default)(+t),m):y},m.startAngle=function(t){return arguments.length?(p="function"==typeof t?t:(0,e.default)(+t),m):p},m.endAngle=function(t){return arguments.length?(f="function"==typeof t?t:(0,e.default)(+t),m):f},m.padAngle=function(t){return arguments.length?(d="function"==typeof t?t:(0,e.default)(+t),m):d},m.context=function(t){return arguments.length?(g=null==t?null:t,m):g},m}],53356)},7985,t=>{"use strict";var e=t.i(81324),i=t.i(34599);let n=(t,e)=>{let i=t.append("rect");if(i.attr("x",e.x),i.attr("y",e.y),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("width",e.width),i.attr("height",e.height),e.name&&i.attr("name",e.name),void 0!==e.rx&&i.attr("rx",e.rx),void 0!==e.ry&&i.attr("ry",e.ry),void 0!==e.attrs)for(let t in e.attrs)i.attr(t,e.attrs[t]);return void 0!==e.class&&i.attr("class",e.class),i},r=(t,e)=>{n(t,{x:e.startx,y:e.starty,width:e.stopx-e.startx,height:e.stopy-e.starty,fill:e.fill,stroke:e.stroke,class:"rect"}).lower()},a=(t,e)=>{let n=e.text.replace(i.J," "),r=t.append("text");r.attr("x",e.x),r.attr("y",e.y),r.attr("class","legend"),r.style("text-anchor",e.anchor),void 0!==e.class&&r.attr("class",e.class);let a=r.append("tspan");return a.attr("x",e.x+2*e.textMargin),a.text(n),r},s=(t,i,n,r)=>{let a=t.append("image");a.attr("x",i),a.attr("y",n);let s=(0,e.sanitizeUrl)(r);a.attr("xlink:href",s)},l=(t,i,n,r)=>{let a=t.append("use");a.attr("x",i),a.attr("y",n);let s=(0,e.sanitizeUrl)(r);a.attr("xlink:href",`#${s}`)},o=()=>({x:0,y:0,width:100,height:100,fill:"#EDF2AE",stroke:"#666",anchor:"start",rx:0,ry:0}),c=()=>({x:0,y:0,width:100,height:100,"text-anchor":"start",style:"#666",textMargin:0,rx:0,ry:0,tspan:!0});t.s(["a",()=>r,"b",()=>l,"c",()=>s,"d",()=>n,"e",()=>c,"f",()=>a,"g",()=>o])},25795,t=>{"use strict";var e=t.i(34599);t.i(31345);var i=t.i(53356),n=t.i(12638),r=t.i(7985);t.i(94176),t.i(94834),t.i(81324),t.i(5792);var a=function(){var t=function(t,e,i,n){for(i=i||{},n=t.length;n--;i[t[n]]=e);return i},e=[6,8,10,11,12,14,16,17,18],i=[1,9],n=[1,10],r=[1,11],a=[1,12],s=[1,13],l=[1,14],o={trace:function(){},yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:function(t,e,i,n,r,a,s){var l=a.length-1;switch(r){case 1:return a[l-1];case 2:case 6:case 7:this.$=[];break;case 3:a[l-1].push(a[l]),this.$=a[l-1];break;case 4:case 5:this.$=a[l];break;case 8:n.setDiagramTitle(a[l].substr(6)),this.$=a[l].substr(6);break;case 9:this.$=a[l].trim(),n.setAccTitle(this.$);break;case 10:case 11:this.$=a[l].trim(),n.setAccDescription(this.$);break;case 12:n.addSection(a[l].substr(8)),this.$=a[l].substr(8);break;case 13:n.addTask(a[l-1],a[l]),this.$="task"}},table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:i,12:n,14:r,16:a,17:s,18:l},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:i,12:n,14:r,16:a,17:s,18:l},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:function(t,e){if(e.recoverable)this.trace(t);else{var i=Error(t);throw i.hash=e,i}},parse:function(t){var e=this,i=[0],n=[],r=[null],a=[],s=this.table,l="",o=0,c=0,h=a.slice.call(arguments,1),u=Object.create(this.lexer),y={};for(var p in this.yy)Object.prototype.hasOwnProperty.call(this.yy,p)&&(y[p]=this.yy[p]);u.setInput(t,y),y.lexer=u,y.parser=this,void 0===u.yylloc&&(u.yylloc={});var f=u.yylloc;a.push(f);var d=u.options&&u.options.ranges;"function"==typeof y.parseError?this.parseError=y.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var g,x,m,k,_,b,v,$,w={};;){if(x=i[i.length-1],this.defaultActions[x]?m=this.defaultActions[x]:(null==g&&(g=function(){var t;return"number"!=typeof(t=n.pop()||u.lex()||1)&&(t instanceof Array&&(t=(n=t).pop()),t=e.symbols_[t]||t),t}()),m=s[x]&&s[x][g]),void 0===m||!m.length||!m[0]){var M="";for(_ in $=[],s[x])this.terminals_[_]&&_>2&&$.push("'"+this.terminals_[_]+"'");M=u.showPosition?"Parse error on line "+(o+1)+":\n"+u.showPosition()+"\nExpecting "+$.join(", ")+", got '"+(this.terminals_[g]||g)+"'":"Parse error on line "+(o+1)+": Unexpected "+(1==g?"end of input":"'"+(this.terminals_[g]||g)+"'"),this.parseError(M,{text:u.match,token:this.terminals_[g]||g,line:u.yylineno,loc:f,expected:$})}if(m[0]instanceof Array&&m.length>1)throw Error("Parse Error: multiple actions possible at state: "+x+", token: "+g);switch(m[0]){case 1:i.push(g),r.push(u.yytext),a.push(u.yylloc),i.push(m[1]),g=null,c=u.yyleng,l=u.yytext,o=u.yylineno,f=u.yylloc;break;case 2:if(b=this.productions_[m[1]][1],w.$=r[r.length-b],w._$={first_line:a[a.length-(b||1)].first_line,last_line:a[a.length-1].last_line,first_column:a[a.length-(b||1)].first_column,last_column:a[a.length-1].last_column},d&&(w._$.range=[a[a.length-(b||1)].range[0],a[a.length-1].range[1]]),void 0!==(k=this.performAction.apply(w,[l,c,o,y,m[1],r,a].concat(h))))return k;b&&(i=i.slice(0,-1*b*2),r=r.slice(0,-1*b),a=a.slice(0,-1*b)),i.push(this.productions_[m[1]][0]),r.push(w.$),a.push(w._$),v=s[i[i.length-2]][i[i.length-1]],i.push(v);break;case 3:return!0}}return!0}};function c(){this.yy={}}return o.lexer={EOF:1,parseError:function(t,e){if(this.yy.parser)this.yy.parser.parseError(t,e);else throw Error(t)},setInput:function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,i=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var n=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===n.length?this.yylloc.first_column:0)+n[n.length-i.length].length-i[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},test_match:function(t,e){var i,n,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),(n=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],i=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack)for(var a in r)this[a]=r[a];return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var t,e,i,n,r=this._currentRules(),a=0;a<r.length;a++)if((i=this._input.match(this.rules[r[a]]))&&(!e||i[0].length>e[0].length)){if(e=i,n=a,this.options.backtrack_lexer){if(!1!==(t=this.test_match(i,r[a])))return t;if(!this._backtrack)return!1;e=!1;continue}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,r[n]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return t||this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},pushState:function(t){this.begin(t)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(t,e,i,n){switch(i){case 0:case 1:case 3:case 4:break;case 2:return 10;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}},c.prototype=o,o.Parser=c,new c}();a.parser=a;let s="",l=[],o=[],c=[],h=function(){let t=[];return o.forEach(e=>{e.people&&t.push(...e.people)}),[...new Set(t)].sort()},u=function(){let t=!0;for(let[e,i]of c.entries())c[e].processed,t=t&&i.processed;return t},y={getConfig:()=>(0,e.c)().journey,clear:function(){l.length=0,o.length=0,s="",c.length=0,(0,e.v)()},setDiagramTitle:e.q,getDiagramTitle:e.t,setAccTitle:e.s,getAccTitle:e.g,setAccDescription:e.b,getAccDescription:e.a,addSection:function(t){s=t,l.push(t)},getSections:function(){return l},getTasks:function(){let t=u(),e=0;for(;!t&&e<100;)t=u(),e++;return o.push(...c),o},addTask:function(t,e){let i=e.substr(1).split(":"),n=0,r=[];1===i.length?(n=Number(i[0]),r=[]):(n=Number(i[0]),r=i[1].split(","));let a=r.map(t=>t.trim()),l={section:s,type:s,people:a,task:t,score:n};c.push(l)},addTaskOrg:function(t){let e={section:s,type:s,description:t,task:t,classes:[]};o.push(e)},getActors:function(){return h()}},p=function(t,e){return(0,r.d)(t,e)},f=function(t,e){let n=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),r=t.append("g");if(r.append("circle").attr("cx",e.cx-5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),r.append("circle").attr("cx",e.cx+5).attr("cy",e.cy-5).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),e.score>3){let t;t=(0,i.arc)().startAngle(Math.PI/2).endAngle(Math.PI/2*3).innerRadius(7.5).outerRadius(15/2.2),r.append("path").attr("class","mouth").attr("d",t).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}else if(e.score<3){let t;t=(0,i.arc)().startAngle(3*Math.PI/2).endAngle(Math.PI/2*5).innerRadius(7.5).outerRadius(15/2.2),r.append("path").attr("class","mouth").attr("d",t).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}else r.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666");return n},d=function(t,e){let i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),void 0!==i.class&&i.attr("class",i.class),void 0!==e.title&&i.append("title").text(e.title),i},g=-1,x=function(){function t(t,e,i,r,a,s,l,o){n(e.append("text").attr("x",i+a/2).attr("y",r+s/2+5).style("font-color",o).style("text-anchor","middle").text(t),l)}function e(t,e,i,r,a,s,l,o,c){let{taskFontSize:h,taskFontFamily:u}=o,y=t.split(/<br\s*\/?>/gi);for(let t=0;t<y.length;t++){let o=t*h-h*(y.length-1)/2,p=e.append("text").attr("x",i+a/2).attr("y",r).attr("fill",c).style("text-anchor","middle").style("font-size",h).style("font-family",u);p.append("tspan").attr("x",i+a/2).attr("dy",o).text(y[t]),p.attr("y",r+s/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),n(p,l)}}function i(t,i,r,a,s,l,o,c){let h=i.append("switch"),u=h.append("foreignObject").attr("x",r).attr("y",a).attr("width",s).attr("height",l).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");u.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(t),e(t,h,r,a,s,l,o,c),n(u,o)}function n(t,e){for(let i in e)i in e&&t.attr(i,e[i])}return function(n){return"fo"===n.textPlacement?i:"old"===n.textPlacement?t:e}}(),m=function(t,e,i){let n=t.append("g"),a=(0,r.g)();a.x=e.x,a.y=e.y,a.fill=e.fill,a.width=i.width*e.taskCount+i.diagramMarginX*(e.taskCount-1),a.height=i.height,a.class="journey-section section-type-"+e.num,a.rx=3,a.ry=3,p(n,a),x(i)(e.text,n,a.x,a.y,a.width,a.height,{class:"journey-section section-type-"+e.num},i,e.colour)},k=function(t,e,i){let n=e.x+i.width/2,a=t.append("g");g++,a.append("line").attr("id","task"+g).attr("x1",n).attr("y1",e.y).attr("x2",n).attr("y2",450).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),f(a,{cx:n,cy:300+(5-e.score)*30,score:e.score});let s=(0,r.g)();s.x=e.x,s.y=e.y,s.fill=e.fill,s.width=i.width,s.height=i.height,s.class="task task-type-"+e.num,s.rx=3,s.ry=3,p(a,s);let l=e.x+14;e.people.forEach(t=>{let i=e.actors[t].color;d(a,{cx:l,cy:e.y,r:7,fill:i,stroke:"#000",title:t,pos:e.actors[t].position}),l+=10}),x(i)(e.task,a,s.x,s.y,s.width,s.height,{class:"task"},i,e.colour)},_=function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},b={},v=(0,e.c)().journey,$=v.leftMargin,w={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},updateVal:function(t,e,i,n){void 0===t[e]?t[e]=i:t[e]=n(i,t[e])},updateBounds:function(t,i,n,r){let a=(0,e.c)().journey,s=this,l=0;this.sequenceItems.forEach(function(e){l++;let o=s.sequenceItems.length-l+1;s.updateVal(e,"starty",i-o*a.boxMargin,Math.min),s.updateVal(e,"stopy",r+o*a.boxMargin,Math.max),s.updateVal(w.data,"startx",t-o*a.boxMargin,Math.min),s.updateVal(w.data,"stopx",n+o*a.boxMargin,Math.max),s.updateVal(e,"startx",t-o*a.boxMargin,Math.min),s.updateVal(e,"stopx",n+o*a.boxMargin,Math.max),s.updateVal(w.data,"starty",i-o*a.boxMargin,Math.min),s.updateVal(w.data,"stopy",r+o*a.boxMargin,Math.max)})},insert:function(t,e,i,n){let r=Math.min(t,i),a=Math.max(t,i),s=Math.min(e,n),l=Math.max(e,n);this.updateVal(w.data,"startx",r,Math.min),this.updateVal(w.data,"starty",s,Math.min),this.updateVal(w.data,"stopx",a,Math.max),this.updateVal(w.data,"stopy",l,Math.max),this.updateBounds(r,s,a,l)},bumpVerticalPos:function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},getVerticalPos:function(){return this.verticalPos},getBounds:function(){return this.data}},M=v.sectionFills,T=v.sectionColours,A=function(t,i,n){let r=(0,e.c)().journey,a="",s=n+(2*r.height+r.diagramMarginY),l=0,o="#CCC",c="black",h=0;for(let[e,n]of i.entries()){if(a!==n.section){o=M[l%M.length],h=l%M.length,c=T[l%T.length];let s=0,u=n.section;for(let t=e;t<i.length;t++)if(i[t].section==u)s+=1;else break;m(t,{x:e*r.taskMargin+e*r.width+$,y:50,text:n.section,fill:o,num:h,colour:c,taskCount:s},r),a=n.section,l++}let u=n.people.reduce((t,e)=>(b[e]&&(t[e]=b[e]),t),{});n.x=e*r.taskMargin+e*r.width+$,n.y=s,n.width=r.diagramMarginX,n.height=r.diagramMarginY,n.colour=c,n.fill=o,n.num=h,n.actors=u,k(t,n,r),w.insert(n.x,n.y,n.x+n.width+r.taskMargin,450)}},E={setConf:function(t){Object.keys(t).forEach(function(e){v[e]=t[e]})},draw:function(t,i,a,s){let l,o,c,h=(0,e.c)().journey,u=(0,e.c)().securityLevel;"sandbox"===u&&(l=(0,n.select)("#i"+i));let y="sandbox"===u?(0,n.select)(l.nodes()[0].contentDocument.body):(0,n.select)("body");w.init();let p=y.select("#"+i);_(p);let f=s.db.getTasks(),g=s.db.getDiagramTitle(),x=s.db.getActors();for(let t in b)delete b[t];let m=0;x.forEach(t=>{b[t]={color:h.actorColours[m%h.actorColours.length],position:m},m++}),o=(0,e.c)().journey,c=60,Object.keys(b).forEach(t=>{var e,i;let n=b[t].color;d(p,{cx:20,cy:c,r:7,fill:n,stroke:"#000",pos:b[t].position});let a={x:40,y:c+7,fill:"#666",text:t,textMargin:5|o.boxTextMargin};e=p,i=a,(0,r.f)(e,i),c+=20}),w.insert(0,0,$,50*Object.keys(b).length),A(p,f,0);let k=w.getBounds();g&&p.append("text").text(g).attr("x",$).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);let v=k.stopy-k.starty+2*h.diagramMarginY,M=$+k.stopx+2*h.diagramMarginX;(0,e.i)(p,v,M,h.useMaxWidth),p.append("line").attr("x1",$).attr("y1",4*h.height).attr("x2",M-$-4).attr("y2",4*h.height).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");let T=70*!!g;p.attr("viewBox",`${k.startx} -25 ${M} ${v+T}`),p.attr("preserveAspectRatio","xMinYMin meet"),p.attr("height",v+T+25)}},P={parser:a,db:y,renderer:E,styles:t=>`.label {
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,init:t=>{E.setConf(t.journey),y.clear()}};t.s(["diagram",()=>P])}]);