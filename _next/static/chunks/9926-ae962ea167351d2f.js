(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9926],{227:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,o,r){return!1},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1551:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(2648).Z,n=o(7273).Z,l=r(o(7294)),u=o(1978),f=o(2139),a=o(7795),i=o(670),c=o(4465),s=o(2692),d=o(8245),p=o(9246),y=o(227),h=o(3468);let v=new Set;function b(e,t,o,r,n){if(n||f.isLocalURL(t)){if(!r.bypassPrefetchedCheck){let n=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,l=t+"%"+o+"%"+n;if(v.has(l))return;v.add(l)}Promise.resolve(e.prefetch(t,o,r)).catch(e=>{})}}function g(e){return"string"==typeof e?e:a.formatUrl(e)}let _=l.default.forwardRef(function(e,t){let o,r;let{href:a,as:v,children:_,prefetch:m,passHref:C,replace:M,shallow:j,scroll:k,locale:E,onClick:O,onMouseEnter:P,onTouchStart:x,legacyBehavior:L=!1}=e,w=n(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);o=_,L&&("string"==typeof o||"number"==typeof o)&&(o=l.default.createElement("a",null,o));let R=!1!==m,I=l.default.useContext(s.RouterContext),S=l.default.useContext(d.AppRouterContext),T=null!=I?I:S,A=!I,{href:U,as:D}=l.default.useMemo(()=>{if(!I){let e=g(a);return{href:e,as:v?g(v):e}}let[e,t]=u.resolveHref(I,a,!0);return{href:e,as:v?u.resolveHref(I,v):t||e}},[I,a,v]),K=l.default.useRef(U),N=l.default.useRef(D);L&&(r=l.default.Children.only(o));let H=L?r&&"object"==typeof r&&r.ref:t,[Z,B,q]=p.useIntersection({rootMargin:"200px"}),z=l.default.useCallback(e=>{(N.current!==D||K.current!==U)&&(q(),N.current=D,K.current=U),Z(e),H&&("function"==typeof H?H(e):"object"==typeof H&&(H.current=e))},[D,H,U,q,Z]);l.default.useEffect(()=>{T&&B&&R&&b(T,U,D,{locale:E},A)},[D,U,B,E,R,null==I?void 0:I.locale,T,A]);let F={ref:z,onClick(e){L||"function"!=typeof O||O(e),L&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),T&&!e.defaultPrevented&&function(e,t,o,r,n,u,a,i,c,s){let{nodeName:d}=e.currentTarget,p="A"===d.toUpperCase();if(p&&(function(e){let t=e.currentTarget,o=t.getAttribute("target");return o&&"_self"!==o||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!c&&!f.isLocalURL(o)))return;e.preventDefault();let y=()=>{"beforePopState"in t?t[n?"replace":"push"](o,r,{shallow:u,locale:i,scroll:a}):t[n?"replace":"push"](r||o,{forceOptimisticNavigation:!s})};c?l.default.startTransition(y):y()}(e,T,U,D,M,j,k,E,A,R)},onMouseEnter(e){L||"function"!=typeof P||P(e),L&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),T&&(R||!A)&&b(T,U,D,{locale:E,priority:!0,bypassPrefetchedCheck:!0},A)},onTouchStart(e){L||"function"!=typeof x||x(e),L&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),T&&(R||!A)&&b(T,U,D,{locale:E,priority:!0,bypassPrefetchedCheck:!0},A)}};if(i.isAbsoluteUrl(D))F.href=D;else if(!L||C||"a"===r.type&&!("href"in r.props)){let e=void 0!==E?E:null==I?void 0:I.locale,t=(null==I?void 0:I.isLocaleDomain)&&y.getDomainLocale(D,e,null==I?void 0:I.locales,null==I?void 0:I.domainLocales);F.href=t||h.addBasePath(c.addLocale(D,e,null==I?void 0:I.defaultLocale))}return L?l.default.cloneElement(r,F):l.default.createElement("a",Object.assign({},w,F),o)});t.default=_,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9246:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){let{rootRef:t,rootMargin:o,disabled:a}=e,i=a||!l,[c,s]=r.useState(!1),d=r.useRef(null),p=r.useCallback(e=>{d.current=e},[]);r.useEffect(()=>{if(l){if(i||c)return;let e=d.current;if(e&&e.tagName){let r=function(e,t,o){let{id:r,observer:n,elements:l}=function(e){let t;let o={root:e.root||null,margin:e.rootMargin||""},r=f.find(e=>e.root===o.root&&e.margin===o.margin);if(r&&(t=u.get(r)))return t;let n=new Map,l=new IntersectionObserver(e=>{e.forEach(e=>{let t=n.get(e.target),o=e.isIntersecting||e.intersectionRatio>0;t&&o&&t(o)})},e);return t={id:o,observer:l,elements:n},f.push(o),u.set(o,t),t}(o);return l.set(e,t),n.observe(e),function(){if(l.delete(e),n.unobserve(e),0===l.size){n.disconnect(),u.delete(r);let e=f.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&f.splice(e,1)}}}(e,e=>e&&s(e),{root:null==t?void 0:t.current,rootMargin:o});return r}}else if(!c){let e=n.requestIdleCallback(()=>s(!0));return()=>n.cancelIdleCallback(e)}},[i,o,t,c,d.current]);let y=r.useCallback(()=>{s(!1)},[]);return[p,c,y]};var r=o(7294),n=o(4686);let l="function"==typeof IntersectionObserver,u=new Map,f=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1664:function(e,t,o){e.exports=o(1551)},512:function(e,t,o){"use strict";t.Z=function(){for(var e,t,o=0,r="",n=arguments.length;o<n;o++)(e=arguments[o])&&(t=function e(t){var o,r,n="";if("string"==typeof t||"number"==typeof t)n+=t;else if("object"==typeof t){if(Array.isArray(t)){var l=t.length;for(o=0;o<l;o++)t[o]&&(r=e(t[o]))&&(n&&(n+=" "),n+=r)}else for(r in t)t[r]&&(n&&(n+=" "),n+=r)}return n}(e))&&(r&&(r+=" "),r+=t);return r}}}]);