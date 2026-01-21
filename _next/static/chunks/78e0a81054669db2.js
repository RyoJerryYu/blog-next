(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,93746,e=>{"use strict";var t=e.i(90983);e.s(["clone",()=>t.default])},43005,e=>{"use strict";var t=Object.prototype.hasOwnProperty;let r=function(e,r){return null!=e&&t.call(e,r)};var l=e.i(17203);e.s(["has",0,function(e,t){return null!=e&&(0,l.default)(e,t,r)}],43005)},48935,e=>{"use strict";var t=e.i(72766);e.s(["forEach",()=>t.default])},4051,7005,e=>{"use strict";var t=e.i(34020);let r=function(e){return(null==e?0:e.length)?(0,t.default)(e,1):[]};e.s(["default",0,r],7005),e.s(["flatten",0,r],4051)},71261,70257,92935,90300,e=>{"use strict";var t=e.i(2705),r=e.i(40889),l=e.i(64564),a=e.i(74086);let i=function(e,t){var r=-1,i=(0,a.default)(e)?Array(e.length):[];return(0,l.default)(e,function(e,l,a){i[++r]=t(e,l,a)}),i};e.s(["default",0,i],70257);var o=e.i(46315);let n=function(e,l){return((0,o.default)(e)?t.default:i)(e,(0,r.default)(l,3))};e.s(["default",0,n],92935),e.s(["map",0,n],71261);var s=/\s/;let d=function(e){for(var t=e.length;t--&&s.test(e.charAt(t)););return t};var c=/^\s+/,u=e.i(76061),f=e.i(71211),p=0/0,b=/^[-+]0x[0-9a-f]+$/i,h=/^0b[01]+$/i,g=/^0o[0-7]+$/i,w=parseInt;let y=function(e){if("number"==typeof e)return e;if((0,f.default)(e))return p;if((0,u.default)(e)){var t,r="function"==typeof e.valueOf?e.valueOf():e;e=(0,u.default)(r)?r+"":r}if("string"!=typeof e)return 0===e?e:+e;e=(t=e)?t.slice(0,d(t)+1).replace(c,""):t;var l=h.test(e);return l||g.test(e)?w(e.slice(2),l?2:8):b.test(e)?p:+e};var v=1/0;e.s(["default",0,function(e){return e?(e=y(e))===v||e===-v?(e<0?-1:1)*17976931348623157e292:e==e?e:0:0===e?e:0}],90300)},46975,e=>{"use strict";var t=e.i(88943),r=e.i(27961),l=e.i(39275),a=e.i(59592),i=e.i(76061),o=e.i(8413);let n=function(e,t,n,s){if(!(0,i.default)(e))return e;t=(0,l.default)(t,e);for(var d=-1,c=t.length,u=c-1,f=e;null!=f&&++d<c;){var p=(0,o.default)(t[d]),b=n;if("__proto__"===p||"constructor"===p||"prototype"===p)break;if(d!=u){var h=f[p];void 0===(b=s?s(h,p,f):void 0)&&(b=(0,i.default)(h)?h:(0,a.default)(t[d+1])?[]:{})}(0,r.default)(f,p,b),f=f[p]}return e};e.s(["default",0,function(e,r,a){for(var i=-1,o=r.length,s={};++i<o;){var d=r[i],c=(0,t.default)(e,d);a(c,d)&&n(s,(0,l.default)(d,e),c)}return s}],46975)},69943,e=>{"use strict";var t=e.i(93332),r=e.i(16715),l=e.i(95854),a=e.i(21869),i=Object.prototype,o=i.hasOwnProperty,n=(0,t.default)(function(e,t){e=Object(e);var n=-1,s=t.length,d=s>2?t[2]:void 0;for(d&&(0,l.default)(t[0],t[1],d)&&(s=1);++n<s;)for(var c=t[n],u=(0,a.default)(c),f=-1,p=u.length;++f<p;){var b=u[f],h=e[b];(void 0===h||(0,r.default)(h,i[b])&&!o.call(e,b))&&(e[b]=c[b])}return e});e.s(["defaults",0,n],69943)},16938,e=>{"use strict";var t=e.i(71211);e.s(["default",0,function(e,r,l){for(var a=-1,i=e.length;++a<i;){var o=e[a],n=r(o);if(null!=n&&(void 0===s?n==n&&!(0,t.default)(n):l(n,s)))var s=n,d=o}return d}])},46533,e=>{"use strict";e.s(["last",0,function(e){var t=null==e?0:e.length;return t?e[t-1]:void 0}],46533)},41867,69786,e=>{"use strict";var t=e.i(16938);let r=function(e,t){return e<t};e.s(["default",0,r],69786);var l=e.i(55920);e.s(["default",0,function(e){return e&&e.length?(0,t.default)(e,l.default,r):void 0}],41867)},49674,e=>{"use strict";var t=e.i(40889),r=e.i(74086),l=e.i(31860);e.s(["default",0,function(e){return function(a,i,o){var n=Object(a);if(!(0,r.default)(a)){var s=(0,t.default)(i,3);a=(0,l.default)(a),i=function(e){return s(n[e],e,n)}}var d=e(a,i,o);return d>-1?n[s?a[d]:d]:void 0}}])},73796,e=>{"use strict";var t=e.i(90300);e.s(["default",0,function(e){var r=(0,t.default)(e),l=r%1;return r==r?l?r-l:r:0}])},77854,e=>{"use strict";var t=e.i(49674),r=e.i(53928),l=e.i(40889),a=e.i(73796),i=Math.max,o=(0,t.default)(function(e,t,o){var n=null==e?0:e.length;if(!n)return -1;var s=null==o?0:(0,a.default)(o);return s<0&&(s=i(n+s,0)),(0,r.default)(e,(0,l.default)(t,3),s)});e.s(["find",0,o],77854)},12031,e=>{"use strict";var t=e.i(62790),r=e.i(46315),l=e.i(42355);e.s(["default",0,function(e){return"string"==typeof e||!(0,r.default)(e)&&(0,l.default)(e)&&"[object String]"==(0,t.default)(e)}])},35478,e=>{"use strict";var t=e.i(46315);e.s(["isArray",()=>t.default])},90983,e=>{"use strict";var t=e.i(44869);e.s(["default",0,function(e){return(0,t.default)(e,4)}])},31756,e=>{"use strict";var t=e.i(45484),r=e.i(17463);e.s(["channel",0,(e,l)=>t.default.lang.round(r.default.parse(e)[l])],31756)},97369,74238,48177,63731,e=>{"use strict";e.i(26754);var t=e.i(14447);e.i(31345);var r=e.i(78973),l=e.i(12638),a=e.i(82348),i=e.i(13695);function o(e){return"string"==typeof e?new i.Selection([document.querySelectorAll(e)],[document.documentElement]):new i.Selection([(0,a.default)(e)],i.root)}e.s(["selectAll",0,o],74238);var n=e.i(34599),s=e.i(91929),d=e.i(42706),d=d,c=e.i(84076);function u(e,t){return!!e.children(t).length}function f(e){return b(e.v)+":"+b(e.w)+":"+b(e.name)}var p=/:/g;function b(e){return e?String(e).replace(p,"\\:"):""}function h(e,t){t&&e.attr("style",t)}function g(e,t,r){t&&e.attr("class",t).attr("class",r+" "+e.attr("class"))}function w(e,t){var r=t.graph();if(d.default(r)){var l=r.transition;if(c.isFunction(l))return l(e)}return e}function y(e,t){var r=e.append("foreignObject").attr("width","100000"),l=r.append("xhtml:div");l.attr("xmlns","http://www.w3.org/1999/xhtml");var a=t.label;switch(typeof a){case"function":l.insert(a);break;case"object":l.insert(function(){return a});break;default:l.html(a)}h(l,t.labelStyle),l.style("display","inline-block"),l.style("white-space","nowrap");var i=l.node().getBoundingClientRect();return r.attr("width",i.width).attr("height",i.height),r}e.s(["applyClass",()=>g,"applyStyle",()=>h,"applyTransition",()=>w,"edgeToId",()=>f,"isSubgraph",()=>u],48177),e.s(["addHtmlLabel",()=>y],63731);var v=e.i(31756),k=e.i(65912);let x={},m=async function(e,t,r,l,a,i){let o=l.select(`[id="${r}"]`);for(let r of Object.keys(e)){let l,s=e[r],d="default";s.classes.length>0&&(d=s.classes.join(" ")),d+=" flowchart-label";let c=(0,n.k)(s.styles),u=void 0!==s.text?s.text:s.id;if(n.l.info("vertex",s,s.labelType),"markdown"===s.labelType)n.l.info("vertex",s,s.labelType);else if((0,n.m)((0,n.c)().flowchart.htmlLabels))(l=y(o,{label:u}).node()).parentNode.removeChild(l);else{let e=a.createElementNS("http://www.w3.org/2000/svg","text");for(let t of(e.setAttribute("style",c.labelStyle.replace("color:","fill:")),u.split(n.e.lineBreakRegex))){let r=a.createElementNS("http://www.w3.org/2000/svg","tspan");r.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),r.setAttribute("dy","1em"),r.setAttribute("x","1"),r.textContent=t,e.appendChild(r)}l=e}let f=0,p="";switch(s.type){case"round":f=5,p="rect";break;case"square":case"group":default:p="rect";break;case"diamond":p="question";break;case"hexagon":p="hexagon";break;case"odd":case"odd_right":p="rect_left_inv_arrow";break;case"lean_right":p="lean_right";break;case"lean_left":p="lean_left";break;case"trapezoid":p="trapezoid";break;case"inv_trapezoid":p="inv_trapezoid";break;case"circle":p="circle";break;case"ellipse":p="ellipse";break;case"stadium":p="stadium";break;case"subroutine":p="subroutine";break;case"cylinder":p="cylinder";break;case"doublecircle":p="doublecircle"}let b=await (0,n.r)(u,(0,n.c)());t.setNode(s.id,{labelStyle:c.labelStyle,shape:p,labelText:b,labelType:s.labelType,rx:f,ry:f,class:d,style:c.style,id:s.id,link:s.link,linkTarget:s.linkTarget,tooltip:i.db.getTooltip(s.id)||"",domId:i.db.lookUpDomId(s.id),haveCallback:s.haveCallback,width:"group"===s.type?500:void 0,dir:s.dir,type:s.type,props:s.props,padding:(0,n.c)().flowchart.padding}),n.l.info("setNode",{labelStyle:c.labelStyle,labelType:s.labelType,shape:p,labelText:b,rx:f,ry:f,class:d,style:c.style,id:s.id,domId:i.db.lookUpDomId(s.id),width:"group"===s.type?500:void 0,type:s.type,dir:s.dir,props:s.props,padding:(0,n.c)().flowchart.padding})}},S=async function(e,t,l){let a,i;n.l.info("abc78 edges = ",e);let o=0,s={};if(void 0!==e.defaultStyle){let t=(0,n.k)(e.defaultStyle);a=t.style,i=t.labelStyle}for(let l of e){o++;let d="L-"+l.start+"-"+l.end;void 0===s[d]?s[d]=0:s[d]++,n.l.info("abc78 new entry",d,s[d]);let c=d+"-"+s[d];n.l.info("abc78 new link id to be used is",d,c,s[d]);let u="LS-"+l.start,f="LE-"+l.end,p={style:"",labelStyle:""};switch(p.minlen=l.length||1,"arrow_open"===l.type?p.arrowhead="none":p.arrowhead="normal",p.arrowTypeStart="arrow_open",p.arrowTypeEnd="arrow_open",l.type){case"double_arrow_cross":p.arrowTypeStart="arrow_cross";case"arrow_cross":p.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":p.arrowTypeStart="arrow_point";case"arrow_point":p.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":p.arrowTypeStart="arrow_circle";case"arrow_circle":p.arrowTypeEnd="arrow_circle"}let b="",h="";switch(l.stroke){case"normal":b="fill:none;",void 0!==a&&(b=a),void 0!==i&&(h=i),p.thickness="normal",p.pattern="solid";break;case"dotted":p.thickness="normal",p.pattern="dotted",p.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":p.thickness="thick",p.pattern="solid",p.style="stroke-width: 3.5px;fill:none;";break;case"invisible":p.thickness="invisible",p.pattern="solid",p.style="stroke-width: 0;fill:none;"}if(void 0!==l.style){let e=(0,n.k)(l.style);b=e.style,h=e.labelStyle}p.style=p.style+=b,p.labelStyle=p.labelStyle+=h,void 0!==l.interpolate?p.curve=(0,n.n)(l.interpolate,r.curveLinear):void 0!==e.defaultInterpolate?p.curve=(0,n.n)(e.defaultInterpolate,r.curveLinear):p.curve=(0,n.n)(x.curve,r.curveLinear),void 0===l.text?void 0!==l.style&&(p.arrowheadStyle="fill: #333"):(p.arrowheadStyle="fill: #333",p.labelpos="c"),p.labelType=l.labelType,p.label=await (0,n.r)(l.text.replace(n.e.lineBreakRegex,"\n"),(0,n.c)()),void 0===l.style&&(p.style=p.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),p.labelStyle=p.labelStyle.replace("color:","fill:"),p.id=c,p.classes="flowchart-link "+u+" "+f,t.setEdge(l.start,l.end,p,o)}},T=async function(e,r,a,i){let d,c;n.l.info("Drawing flowchart");let u=i.db.getDirection();void 0===u&&(u="TD");let{securityLevel:f,flowchart:p}=(0,n.c)(),b=p.nodeSpacing||50,h=p.rankSpacing||50;"sandbox"===f&&(d=(0,l.select)("#i"+r));let g="sandbox"===f?(0,l.select)(d.nodes()[0].contentDocument.body):(0,l.select)("body"),w="sandbox"===f?d.nodes()[0].contentDocument:document,y=new t.Graph({multigraph:!0,compound:!0}).setGraph({rankdir:u,nodesep:b,ranksep:h,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}}),v=i.db.getSubGraphs();n.l.info("Subgraphs - ",v);for(let e=v.length-1;e>=0;e--)c=v[e],n.l.info("Subgraph - ",c),i.db.addVertex(c.id,{text:c.title,type:c.labelType},"group",void 0,c.classes,c.dir);let k=i.db.getVertices(),x=i.db.getEdges();n.l.info("Edges",x);let T=0;for(T=v.length-1;T>=0;T--){c=v[T],o("cluster").append("text");for(let e=0;e<c.nodes.length;e++)n.l.info("Setting up subgraphs",c.nodes[e],c.id),y.setParent(c.nodes[e],c.id)}await m(k,y,r,g,w,i),await S(x,y);let _=g.select(`[id="${r}"]`),C=g.select("#"+r+" g");if(await (0,s.r)(C,y,["point","circle","cross"],"flowchart",r),n.u.insertTitle(_,"flowchartTitleText",p.titleTopMargin,i.db.getDiagramTitle()),(0,n.o)(y,_,p.diagramPadding,p.useMaxWidth),i.db.indexNodes("subGraph"+T),!p.htmlLabels)for(let e of w.querySelectorAll('[id="'+r+'"] .edgeLabel .label')){let t=e.getBBox(),r=w.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("rx",0),r.setAttribute("ry",0),r.setAttribute("width",t.width),r.setAttribute("height",t.height),e.insertBefore(r,e.firstChild)}Object.keys(k).forEach(function(e){let t=k[e];if(t.link){let a=(0,l.select)("#"+r+' [id="'+e+'"]');if(a){let e=w.createElementNS("http://www.w3.org/2000/svg","a");e.setAttributeNS("http://www.w3.org/2000/svg","class",t.classes.join(" ")),e.setAttributeNS("http://www.w3.org/2000/svg","href",t.link),e.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),"sandbox"===f?e.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):t.linkTarget&&e.setAttributeNS("http://www.w3.org/2000/svg","target",t.linkTarget);let r=a.insert(function(){return e},":first-child"),l=a.select(".label-container");l&&r.append(function(){return l.node()});let i=a.select(".label");i&&r.append(function(){return i.node()})}}})},_={setConf:function(e){for(let t of Object.keys(e))x[t]=e[t]},addVertices:m,addEdges:S,getClasses:function(e,t){return t.db.getClasses()},draw:T},C=e=>{var t;let r,l,a,i;return`.label {
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
    background-color: ${t=e.edgeLabelBackground,l=(r=v.channel)(t,"r"),a=r(t,"g"),i=r(t,"b"),k.rgba(l,a,i,.5)};
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
`};e.s(["a",()=>C,"f",()=>_],97369)},73475,e=>{"use strict";var t=e.i(60903),r=e.i(97369),l=e.i(34599);e.i(31345),e.i(26754),e.i(30187),e.i(57722),e.i(94176),e.i(63731),e.i(94834),e.i(81324),e.i(5792);let a={parser:t.p,db:t.f,renderer:r.f,styles:r.a,init:e=>{e.flowchart||(e.flowchart={}),e.flowchart.arrowMarkerAbsolute=e.arrowMarkerAbsolute,(0,l.p)({flowchart:{arrowMarkerAbsolute:e.arrowMarkerAbsolute}}),r.f.setConf(e.flowchart),t.f.clear(),t.f.setGen("gen-2")}};e.s(["diagram",()=>a])}]);