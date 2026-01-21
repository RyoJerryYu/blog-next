(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,93746,e=>{"use strict";var t=e.i(90983);e.s(["clone",()=>t.default])},43005,e=>{"use strict";var t=Object.prototype.hasOwnProperty;let r=function(e,r){return null!=e&&t.call(e,r)};var l=e.i(17203);e.s(["has",0,function(e,t){return null!=e&&(0,l.default)(e,t,r)}],43005)},69943,e=>{"use strict";var t=e.i(93332),r=e.i(16715),l=e.i(95854),a=e.i(21869),i=Object.prototype,n=i.hasOwnProperty,o=(0,t.default)(function(e,t){e=Object(e);var o=-1,s=t.length,c=s>2?t[2]:void 0;for(c&&(0,l.default)(t[0],t[1],c)&&(s=1);++o<s;)for(var d=t[o],u=(0,a.default)(d),f=-1,p=u.length;++f<p;){var h=u[f],b=e[h];(void 0===b||(0,r.default)(b,i[h])&&!n.call(e,h))&&(e[h]=d[h])}return e});e.s(["defaults",0,o],69943)},48935,e=>{"use strict";var t=e.i(72766);e.s(["forEach",()=>t.default])},4051,7005,e=>{"use strict";var t=e.i(34020);let r=function(e){return(null==e?0:e.length)?(0,t.default)(e,1):[]};e.s(["default",0,r],7005),e.s(["flatten",0,r],4051)},71261,70257,92935,90300,e=>{"use strict";var t=e.i(2705),r=e.i(40889),l=e.i(64564),a=e.i(74086);let i=function(e,t){var r=-1,i=(0,a.default)(e)?Array(e.length):[];return(0,l.default)(e,function(e,l,a){i[++r]=t(e,l,a)}),i};e.s(["default",0,i],70257);var n=e.i(46315);let o=function(e,l){return((0,n.default)(e)?t.default:i)(e,(0,r.default)(l,3))};e.s(["default",0,o],92935),e.s(["map",0,o],71261);var s=/\s/;let c=function(e){for(var t=e.length;t--&&s.test(e.charAt(t)););return t};var d=/^\s+/,u=e.i(76061),f=e.i(71211),p=0/0,h=/^[-+]0x[0-9a-f]+$/i,b=/^0b[01]+$/i,y=/^0o[0-7]+$/i,g=parseInt;let w=function(e){if("number"==typeof e)return e;if((0,f.default)(e))return p;if((0,u.default)(e)){var t,r="function"==typeof e.valueOf?e.valueOf():e;e=(0,u.default)(r)?r+"":r}if("string"!=typeof e)return 0===e?e:+e;e=(t=e)?t.slice(0,c(t)+1).replace(d,""):t;var l=b.test(e);return l||y.test(e)?g(e.slice(2),l?2:8):h.test(e)?p:+e};var v=1/0;e.s(["default",0,function(e){return e?(e=w(e))===v||e===-v?(e<0?-1:1)*17976931348623157e292:e==e?e:0:0===e?e:0}],90300)},46975,e=>{"use strict";var t=e.i(88943),r=e.i(27961),l=e.i(39275),a=e.i(59592),i=e.i(76061),n=e.i(8413);let o=function(e,t,o,s){if(!(0,i.default)(e))return e;t=(0,l.default)(t,e);for(var c=-1,d=t.length,u=d-1,f=e;null!=f&&++c<d;){var p=(0,n.default)(t[c]),h=o;if("__proto__"===p||"constructor"===p||"prototype"===p)break;if(c!=u){var b=f[p];void 0===(h=s?s(b,p,f):void 0)&&(h=(0,i.default)(b)?b:(0,a.default)(t[c+1])?[]:{})}(0,r.default)(f,p,h),f=f[p]}return e};e.s(["default",0,function(e,r,a){for(var i=-1,n=r.length,s={};++i<n;){var c=r[i],d=(0,t.default)(e,c);a(d,c)&&o(s,(0,l.default)(c,e),d)}return s}],46975)},16938,e=>{"use strict";var t=e.i(71211);e.s(["default",0,function(e,r,l){for(var a=-1,i=e.length;++a<i;){var n=e[a],o=r(n);if(null!=o&&(void 0===s?o==o&&!(0,t.default)(o):l(o,s)))var s=o,c=n}return c}])},46533,e=>{"use strict";e.s(["last",0,function(e){var t=null==e?0:e.length;return t?e[t-1]:void 0}],46533)},41867,69786,e=>{"use strict";var t=e.i(16938);let r=function(e,t){return e<t};e.s(["default",0,r],69786);var l=e.i(55920);e.s(["default",0,function(e){return e&&e.length?(0,t.default)(e,l.default,r):void 0}],41867)},49674,e=>{"use strict";var t=e.i(40889),r=e.i(74086),l=e.i(31860);e.s(["default",0,function(e){return function(a,i,n){var o=Object(a);if(!(0,r.default)(a)){var s=(0,t.default)(i,3);a=(0,l.default)(a),i=function(e){return s(o[e],e,o)}}var c=e(a,i,n);return c>-1?o[s?a[c]:c]:void 0}}])},73796,e=>{"use strict";var t=e.i(90300);e.s(["default",0,function(e){var r=(0,t.default)(e),l=r%1;return r==r?l?r-l:r:0}])},77854,e=>{"use strict";var t=e.i(49674),r=e.i(53928),l=e.i(40889),a=e.i(73796),i=Math.max,n=(0,t.default)(function(e,t,n){var o=null==e?0:e.length;if(!o)return -1;var s=null==n?0:(0,a.default)(n);return s<0&&(s=i(o+s,0)),(0,r.default)(e,(0,l.default)(t,3),s)});e.s(["find",0,n],77854)},12031,e=>{"use strict";var t=e.i(62790),r=e.i(46315),l=e.i(42355);e.s(["default",0,function(e){return"string"==typeof e||!(0,r.default)(e)&&(0,l.default)(e)&&"[object String]"==(0,t.default)(e)}])},35478,e=>{"use strict";var t=e.i(46315);e.s(["isArray",()=>t.default])},90983,e=>{"use strict";var t=e.i(44869);e.s(["default",0,function(e){return(0,t.default)(e,4)}])},31756,e=>{"use strict";var t=e.i(45484),r=e.i(17463);e.s(["channel",0,(e,l)=>t.default.lang.round(r.default.parse(e)[l])],31756)},97369,74238,48177,63731,e=>{"use strict";e.i(26754);var t=e.i(14447);e.i(31345);var r=e.i(78973),l=e.i(12638),a=e.i(82348),i=e.i(13695);function n(e){return"string"==typeof e?new i.Selection([document.querySelectorAll(e)],[document.documentElement]):new i.Selection([(0,a.default)(e)],i.root)}e.s(["selectAll",0,n],74238);var o=e.i(34599),s=e.i(91929),c=e.i(42706),c=c,d=e.i(84076);function u(e,t){return!!e.children(t).length}function f(e){return h(e.v)+":"+h(e.w)+":"+h(e.name)}var p=/:/g;function h(e){return e?String(e).replace(p,"\\:"):""}function b(e,t){t&&e.attr("style",t)}function y(e,t,r){t&&e.attr("class",t).attr("class",r+" "+e.attr("class"))}function g(e,t){var r=t.graph();if(c.default(r)){var l=r.transition;if(d.isFunction(l))return l(e)}return e}function w(e,t){var r=e.append("foreignObject").attr("width","100000"),l=r.append("xhtml:div");l.attr("xmlns","http://www.w3.org/1999/xhtml");var a=t.label;switch(typeof a){case"function":l.insert(a);break;case"object":l.insert(function(){return a});break;default:l.html(a)}b(l,t.labelStyle),l.style("display","inline-block"),l.style("white-space","nowrap");var i=l.node().getBoundingClientRect();return r.attr("width",i.width).attr("height",i.height),r}e.s(["applyClass",()=>y,"applyStyle",()=>b,"applyTransition",()=>g,"edgeToId",()=>f,"isSubgraph",()=>u],48177),e.s(["addHtmlLabel",()=>w],63731);var v=e.i(31756),x=e.i(65912);let k={},m=async function(e,t,r,l,a,i){let n=l.select(`[id="${r}"]`);for(let r of Object.keys(e)){let l,s=e[r],c="default";s.classes.length>0&&(c=s.classes.join(" ")),c+=" flowchart-label";let d=(0,o.k)(s.styles),u=void 0!==s.text?s.text:s.id;if(o.l.info("vertex",s,s.labelType),"markdown"===s.labelType)o.l.info("vertex",s,s.labelType);else if((0,o.m)((0,o.c)().flowchart.htmlLabels))(l=w(n,{label:u}).node()).parentNode.removeChild(l);else{let e=a.createElementNS("http://www.w3.org/2000/svg","text");for(let t of(e.setAttribute("style",d.labelStyle.replace("color:","fill:")),u.split(o.e.lineBreakRegex))){let r=a.createElementNS("http://www.w3.org/2000/svg","tspan");r.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),r.setAttribute("dy","1em"),r.setAttribute("x","1"),r.textContent=t,e.appendChild(r)}l=e}let f=0,p="";switch(s.type){case"round":f=5,p="rect";break;case"square":case"group":default:p="rect";break;case"diamond":p="question";break;case"hexagon":p="hexagon";break;case"odd":case"odd_right":p="rect_left_inv_arrow";break;case"lean_right":p="lean_right";break;case"lean_left":p="lean_left";break;case"trapezoid":p="trapezoid";break;case"inv_trapezoid":p="inv_trapezoid";break;case"circle":p="circle";break;case"ellipse":p="ellipse";break;case"stadium":p="stadium";break;case"subroutine":p="subroutine";break;case"cylinder":p="cylinder";break;case"doublecircle":p="doublecircle"}let h=await (0,o.r)(u,(0,o.c)());t.setNode(s.id,{labelStyle:d.labelStyle,shape:p,labelText:h,labelType:s.labelType,rx:f,ry:f,class:c,style:d.style,id:s.id,link:s.link,linkTarget:s.linkTarget,tooltip:i.db.getTooltip(s.id)||"",domId:i.db.lookUpDomId(s.id),haveCallback:s.haveCallback,width:"group"===s.type?500:void 0,dir:s.dir,type:s.type,props:s.props,padding:(0,o.c)().flowchart.padding}),o.l.info("setNode",{labelStyle:d.labelStyle,labelType:s.labelType,shape:p,labelText:h,rx:f,ry:f,class:c,style:d.style,id:s.id,domId:i.db.lookUpDomId(s.id),width:"group"===s.type?500:void 0,type:s.type,dir:s.dir,props:s.props,padding:(0,o.c)().flowchart.padding})}},S=async function(e,t,l){let a,i;o.l.info("abc78 edges = ",e);let n=0,s={};if(void 0!==e.defaultStyle){let t=(0,o.k)(e.defaultStyle);a=t.style,i=t.labelStyle}for(let l of e){n++;let c="L-"+l.start+"-"+l.end;void 0===s[c]?s[c]=0:s[c]++,o.l.info("abc78 new entry",c,s[c]);let d=c+"-"+s[c];o.l.info("abc78 new link id to be used is",c,d,s[c]);let u="LS-"+l.start,f="LE-"+l.end,p={style:"",labelStyle:""};switch(p.minlen=l.length||1,"arrow_open"===l.type?p.arrowhead="none":p.arrowhead="normal",p.arrowTypeStart="arrow_open",p.arrowTypeEnd="arrow_open",l.type){case"double_arrow_cross":p.arrowTypeStart="arrow_cross";case"arrow_cross":p.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":p.arrowTypeStart="arrow_point";case"arrow_point":p.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":p.arrowTypeStart="arrow_circle";case"arrow_circle":p.arrowTypeEnd="arrow_circle"}let h="",b="";switch(l.stroke){case"normal":h="fill:none;",void 0!==a&&(h=a),void 0!==i&&(b=i),p.thickness="normal",p.pattern="solid";break;case"dotted":p.thickness="normal",p.pattern="dotted",p.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":p.thickness="thick",p.pattern="solid",p.style="stroke-width: 3.5px;fill:none;";break;case"invisible":p.thickness="invisible",p.pattern="solid",p.style="stroke-width: 0;fill:none;"}if(void 0!==l.style){let e=(0,o.k)(l.style);h=e.style,b=e.labelStyle}p.style=p.style+=h,p.labelStyle=p.labelStyle+=b,void 0!==l.interpolate?p.curve=(0,o.n)(l.interpolate,r.curveLinear):void 0!==e.defaultInterpolate?p.curve=(0,o.n)(e.defaultInterpolate,r.curveLinear):p.curve=(0,o.n)(k.curve,r.curveLinear),void 0===l.text?void 0!==l.style&&(p.arrowheadStyle="fill: #333"):(p.arrowheadStyle="fill: #333",p.labelpos="c"),p.labelType=l.labelType,p.label=await (0,o.r)(l.text.replace(o.e.lineBreakRegex,"\n"),(0,o.c)()),void 0===l.style&&(p.style=p.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),p.labelStyle=p.labelStyle.replace("color:","fill:"),p.id=d,p.classes="flowchart-link "+u+" "+f,t.setEdge(l.start,l.end,p,n)}},T=async function(e,r,a,i){let c,d;o.l.info("Drawing flowchart");let u=i.db.getDirection();void 0===u&&(u="TD");let{securityLevel:f,flowchart:p}=(0,o.c)(),h=p.nodeSpacing||50,b=p.rankSpacing||50;"sandbox"===f&&(c=(0,l.select)("#i"+r));let y="sandbox"===f?(0,l.select)(c.nodes()[0].contentDocument.body):(0,l.select)("body"),g="sandbox"===f?c.nodes()[0].contentDocument:document,w=new t.Graph({multigraph:!0,compound:!0}).setGraph({rankdir:u,nodesep:h,ranksep:b,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}}),v=i.db.getSubGraphs();o.l.info("Subgraphs - ",v);for(let e=v.length-1;e>=0;e--)d=v[e],o.l.info("Subgraph - ",d),i.db.addVertex(d.id,{text:d.title,type:d.labelType},"group",void 0,d.classes,d.dir);let x=i.db.getVertices(),k=i.db.getEdges();o.l.info("Edges",k);let T=0;for(T=v.length-1;T>=0;T--){d=v[T],n("cluster").append("text");for(let e=0;e<d.nodes.length;e++)o.l.info("Setting up subgraphs",d.nodes[e],d.id),w.setParent(d.nodes[e],d.id)}await m(x,w,r,y,g,i),await S(k,w);let _=y.select(`[id="${r}"]`),C=y.select("#"+r+" g");if(await (0,s.r)(C,w,["point","circle","cross"],"flowchart",r),o.u.insertTitle(_,"flowchartTitleText",p.titleTopMargin,i.db.getDiagramTitle()),(0,o.o)(w,_,p.diagramPadding,p.useMaxWidth),i.db.indexNodes("subGraph"+T),!p.htmlLabels)for(let e of g.querySelectorAll('[id="'+r+'"] .edgeLabel .label')){let t=e.getBBox(),r=g.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("rx",0),r.setAttribute("ry",0),r.setAttribute("width",t.width),r.setAttribute("height",t.height),e.insertBefore(r,e.firstChild)}Object.keys(x).forEach(function(e){let t=x[e];if(t.link){let a=(0,l.select)("#"+r+' [id="'+e+'"]');if(a){let e=g.createElementNS("http://www.w3.org/2000/svg","a");e.setAttributeNS("http://www.w3.org/2000/svg","class",t.classes.join(" ")),e.setAttributeNS("http://www.w3.org/2000/svg","href",t.link),e.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),"sandbox"===f?e.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):t.linkTarget&&e.setAttributeNS("http://www.w3.org/2000/svg","target",t.linkTarget);let r=a.insert(function(){return e},":first-child"),l=a.select(".label-container");l&&r.append(function(){return l.node()});let i=a.select(".label");i&&r.append(function(){return i.node()})}}})},_={setConf:function(e){for(let t of Object.keys(e))k[t]=e[t]},addVertices:m,addEdges:S,getClasses:function(e,t){return t.db.getClasses()},draw:T},C=e=>{var t;let r,l,a,i;return`.label {
    font-family: ${e.fontFamily};
    color: ${e.nodeTextColor||e.textColor};
  }
  .cluster-label text {
    fill: ${e.titleColor};
  }
  .cluster-label span,p {
    color: ${e.titleColor};
  }

  .label text,span,p {
    fill: ${e.nodeTextColor||e.textColor};
    color: ${e.nodeTextColor||e.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .katex path {
    fill: #000;
    stroke: #000;
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${e.edgeLabelBackground};
      fill: ${e.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${t=e.edgeLabelBackground,l=(r=v.channel)(t,"r"),a=r(t,"g"),i=r(t,"b"),x.rgba(l,a,i,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${e.clusterBkg};
    stroke: ${e.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  .cluster span,p {
    color: ${e.titleColor};
  }
  /* .cluster div {
    color: ${e.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${e.fontFamily};
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`};e.s(["a",()=>C,"f",()=>_],97369)},30085,e=>{"use strict";var t=e.i(60903),r=e.i(26754),l=e.i(14447);e.i(31345);var a=e.i(12638),i=e.i(78973),n=e.i(74238),o=e.i(34599),s=e.i(43005),c=e.i(69943),d=e.i(63641);e.i(30187);e.i(44958),e.i(48177),e.i(63731);e.i(29593);function u(e){if(!e.ok)throw Error(e.status+" "+e.statusText);return e.text()}function f(e){return(t,r)=>fetch(t,r).then(u).then(t=>(new DOMParser).parseFromString(t,e))}f("application/xml"),f("text/html");f("image/svg+xml"),e.i(44041),e.i(23909);function p(e,t){return e.intersect(t)}e.s(["intersectNode",()=>p],79331);e.i(44611);function h(e,t,r,l){var a=e.x,i=e.y,n=a-l.x,o=i-l.y,s=Math.sqrt(t*t*o*o+r*r*n*n),c=Math.abs(t*r*n/s);l.x<a&&(c=-c);var d=Math.abs(t*r*o/s);return l.y<i&&(d=-d),{x:a+c,y:i+d}}function b(e,t,r){return h(e,t,t,r)}e.s(["intersectEllipse",()=>h],67599),e.s(["intersectCircle",()=>b],19588);function y(e,t,r){var l=e.x,a=e.y,i=[],n=1/0,o=1/0;t.forEach(function(e){n=Math.min(n,e.x),o=Math.min(o,e.y)});for(var s=l-e.width/2-n,c=a-e.height/2-o,d=0;d<t.length;d++){var u=t[d],f=t[d<t.length-1?d+1:0],p=function(e,t,r,l){var a,i,n,o,s,c,d,u,f,p,h,b,y;if(a=t.y-e.y,n=e.x-t.x,s=t.x*e.y-e.x*t.y,f=a*r.x+n*r.y+s,p=a*l.x+n*l.y+s,0===f||0===p||!(f*p>0)){if((i=l.y-r.y,o=r.x-l.x,c=l.x*r.y-r.x*l.y,d=i*e.x+o*e.y+c,u=i*t.x+o*t.y+c,!(0!==d&&0!==u&&d*u>0))&&0!=(h=a*o-i*n))return b=Math.abs(h/2),{x:(y=n*c-o*s)<0?(y-b)/h:(y+b)/h,y:(y=i*s-a*c)<0?(y-b)/h:(y+b)/h}}}(e,r,{x:s+u.x,y:c+u.y},{x:s+f.x,y:c+f.y});p&&i.push(p)}return i.length?(i.length>1&&i.sort(function(e,t){var l=e.x-r.x,a=e.y-r.y,i=Math.sqrt(l*l+a*a),n=t.x-r.x,o=t.y-r.y,s=Math.sqrt(n*n+o*o);return i<s?-1:+(i!==s)}),i[0]):(console.log("NO INTERSECTION FOUND, RETURN NODE CENTER",e),e)}function g(e,t){var r,l,a=e.x,i=e.y,n=t.x-a,o=t.y-i,s=e.width/2,c=e.height/2;return Math.abs(o)*s>Math.abs(n)*c?(o<0&&(c=-c),r=0===o?0:c*n/o,l=c):(n<0&&(s=-s),r=s,l=0===n?0:s*o/n),{x:a+r,y:i+l}}e.s(["intersectPolygon",()=>y],13159),e.s(["intersectRect",()=>g],17746);i.curveLinear;e.s(["Graph",()=>l.Graph,"version",()=>r.version],44759),e.i(44759);var w=e.i(79331),v=e.i(19588),x=e.i(67599),k=e.i(13159),m=e.i(17746);e.s([],8330),e.i(8330),e.s(["circle",0,v,"ellipse",0,x,"node",0,w,"polygon",0,k,"rect",0,m],95529),e.i(95529);var S=e.i(97369);e.i(94176),e.i(94834),e.i(81324),e.i(5792),e.i(57722);let T={},_=function(e){for(let t of Object.keys(e))T[t]=e[t]},C={parser:t.p,db:t.f,renderer:S.f,styles:S.a,init:e=>{e.flowchart||(e.flowchart={}),e.flowchart.arrowMarkerAbsolute=e.arrowMarkerAbsolute,_(e.flowchart),t.f.clear(),t.f.setGen("gen-1")}};e.s(["diagram",()=>C],30085)}]);