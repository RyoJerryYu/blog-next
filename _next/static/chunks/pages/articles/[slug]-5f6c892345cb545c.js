(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5850],{6010:function(e,t,s){"use strict";t.Z=function(){for(var e,t,s=0,a="";s<arguments.length;)(e=arguments[s++])&&(t=function e(t){var s,a,n="";if("string"==typeof t||"number"==typeof t)n+=t;else if("object"==typeof t){if(Array.isArray(t))for(s=0;s<t.length;s++)t[s]&&(a=e(t[s]))&&(n&&(n+=" "),n+=a);else for(s in t)t[s]&&(n&&(n+=" "),n+=s)}return n}(e))&&(a&&(a+=" "),a+=t);return a}},617:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/articles/[slug]",function(){return s(6456)}])},3241:function(e,t,s){"use strict";s.d(t,{Z:function(){return _}});var a={};s.r(a),s.d(a,{MDXProvider:function(){return c.Z},useMDXComponents:function(){return c.a}});var n=s(5893),r=s(6010);"undefined"!=typeof window&&(window.requestIdleCallback=window.requestIdleCallback||function(e){var t=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},window.cancelIdleCallback=window.cancelIdleCallback||function(e){clearTimeout(e)});var l=s(7294),i=s(2746),c=s(1151);function o({compiledSource:e,frontmatter:t,scope:s,components:n={},lazy:r}){let[o,u]=(0,l.useState)(!r||"undefined"==typeof window);(0,l.useEffect)(()=>{if(r){let e=window.requestIdleCallback(()=>{u(!0)});return()=>window.cancelIdleCallback(e)}},[]);let d=(0,l.useMemo)(()=>{let n=Object.assign({opts:{...a,...i.jsxRuntime}},{frontmatter:t},s),r=Object.keys(n),l=Object.values(n),c=Reflect.construct(Function,r.concat(`${e}`));return c.apply(c,l).default},[s,e]);if(!o)return l.createElement("div",{dangerouslySetInnerHTML:{__html:""},suppressHydrationWarning:!0});let h=l.createElement(c.Z,{components:n},l.createElement(d,null));return r?l.createElement("div",null,h):h}var u=s(1664),d=s.n(u),h=s(1466),m=s(3774),x=s(2352),f=s(1331),v=s.n(f);let g=e=>{let{meta:t,source:s,tags:a,prevNextInfo:l}=e,{prevInfo:i,nextInfo:c}=l;return(0,n.jsxs)("article",{className:v().post,children:[(0,n.jsx)("h1",{className:v().postTitle,children:t.title}),t.created_at&&(0,n.jsx)(m.Z,{className:v().postDate,children:t.created_at}),t.tags.length>0&&(0,n.jsx)(x.Z,{className:"mt-2",tags:a}),(0,n.jsx)("div",{className:(0,r.Z)("post-body",v().postContent),children:(0,n.jsx)(o,{...s})}),t.license&&(0,n.jsx)(h.Z,{}),t.tags.length>0&&(0,n.jsx)(x.Z,{className:"mt-4",tags:a}),(i||c)&&(0,n.jsxs)("div",{className:"mt-4 mb-4 flex justify-center",children:[i&&(0,n.jsx)("div",{className:"ml-0 mr-auto",children:(0,n.jsx)(d(),{href:i.pathMapping.pagePath,children:"<- ".concat(i.meta.title)})}),c&&(0,n.jsx)("div",{className:"mr-0 ml-auto",children:(0,n.jsx)(d(),{href:c.pathMapping.pagePath,children:"".concat(c.meta.title," ->")})})]}),(0,n.jsx)("hr",{className:"mt-4"})]})};var _=g},3774:function(e,t,s){"use strict";s.d(t,{Z:function(){return l}});var a=s(5893),n=s(7484),r=s.n(n);function l(e){let{className:t,children:s}=e,n=r()(s);return(0,a.jsx)("div",{className:t,children:(0,a.jsx)("time",{dateTime:n.toJSON(),children:n.format("YYYY-MM-DD")})})}},2352:function(e,t,s){"use strict";var a=s(5893),n=s(6010),r=s(1664),l=s.n(r),i=s(632),c=s.n(i);let o=e=>{let t=t=>{let s=e.highlightedTagSlug===t.slug?(0,a.jsx)("div",{className:c().highlightedTag,children:t.tag}):(0,a.jsx)("div",{className:c().tag,children:t.tag});return t.path?(0,a.jsx)(l(),{href:t.path,children:s},t.slug):(0,a.jsx)("div",{children:s},t.slug)};return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:(0,n.Z)(c().tagsBox,e.className),children:e.tags.map(e=>t(e))})})};t.Z=o},5335:function(e,t,s){"use strict";s.d(t,{Z:function(){return _}});var a=s(5893);let n=e=>(0,a.jsx)("svg",{className:e.className,viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"})}),r=e=>(0,a.jsx)("svg",{className:e.className,viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{d:"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"})}),l=e=>(0,a.jsx)("svg",{className:e.className,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{d:"M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.092-3.225 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.718c.397.116 1.048.365.635.779H5.79c-.41-.41.19-.65.644-.779V7.666c-1.053.81-1.593 1.51-1.868 2.031.32 1.02-.284.969-.284.969l-1.09-1.73s3.868-4.39 9.553-4.39zm-.19.971c-1.423-.003-3.184.473-4.27 1.244v8.646c.988.487 2.484.832 4.26.832h.01c1.596 0 2.98-.593 3.93-1.533.952-.948 1.486-2.183 1.492-3.683-.005-1.54-.504-2.864-1.42-3.86-.918-.992-2.274-1.645-4.002-1.646Z"})});var i=s(6010),c=s(1664),o=s.n(c),u=s(7339),d=s.n(u),h=s(4058);let m=e=>(0,a.jsx)("div",{className:" flex flex-row gap-8 items-center justify-center",children:[{href:"https://twitter.com/ryo_okami",title:"Twitter",Icon:r},{href:"https://github.com/RyoJerryYu",title:"GitHub",Icon:n},{href:"https://www.pixiv.net/users/9159893",title:"Pixiv",Icon:l}].map(t=>(0,a.jsx)(o(),{href:t.href,title:t.title,children:(0,a.jsx)(t.Icon,{className:e.className})},t.title))}),x=e=>{let{className:t,items:s}=e;return(0,a.jsx)("div",{className:t,children:s.map(e=>(0,a.jsx)("div",{className:d().navBarItem,children:(0,a.jsx)(o(),{href:e.to,className:d().textlink,children:e.text})},e.text))})},f=e=>{let{items:t,iconItem:s,rightItem:n}=e;return(0,a.jsxs)("header",{className:d().header,children:[(0,a.jsx)("div",{className:d().icon,children:(0,a.jsx)("div",{className:d().textbox,children:(0,a.jsx)(o(),{href:s.to,className:d().textlink,children:s.text})})}),(0,a.jsx)(x,{className:d().navBar,items:t}),(0,a.jsxs)("div",{className:d().headerRight,children:[(0,a.jsx)(m,{className:" h-6 w-6 fill-gray-300 hover:fill-white transition-all ease-in-out"}),n&&(0,a.jsx)("div",{className:d().textbox,children:(0,a.jsx)(o(),{href:n.to,className:d().textlink,children:n.text})})]})]})},v=e=>(0,a.jsx)("footer",{className:d().footer,children:(0,a.jsx)(h.Z,{className:"w-full",children:(0,a.jsxs)("div",{className:"flex flex-row justify-center items-center",children:[(0,a.jsx)("div",{className:d().footerLeft,children:"\xa9 2023 Ryo Jerry Yu. All rights reserved."}),(0,a.jsx)("div",{className:d().footerRight,children:(0,a.jsx)(m,{className:(0,i.Z)(d().footerIcon,"h-8 w-8")})})]})})}),g=e=>{let{children:t,withFullScreen:s}=e;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(f,{items:[{to:"/articles",text:"Articles"},{to:"/ideas",text:"Ideas"},{to:"/tags",text:"Tags"},{to:"/clips",text:"Clips"}],iconItem:{to:"/",text:"Ryo's Blog"}}),s?t:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:d().headerBg}),(0,a.jsx)(h.Z,{children:(0,a.jsx)("div",{className:d().contentHeight,children:t})})]}),(0,a.jsx)(v,{})]})};var _=g},4058:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});var a=s(5893),n=s(6010);function r(e){return(0,a.jsx)("div",{className:(0,n.Z)("max-w-3xl mx-auto p-2",e.className),children:e.children})}},6456:function(e,t,s){"use strict";s.r(t),s.d(t,{__N_SSG:function(){return d},default:function(){return h}});var a=s(5893),n=s(7294);let r=e=>{let{url:t,attributes:s,ref:a}=e,[r,l]=(0,n.useState)(t?"loading":"idle"),i=e=>{l("load"===e.type?"ready":"error")};return(0,n.useEffect)(()=>{var e,n,r;let c;if(!t){l("idle");return}return(null===(e=a.current)||void 0===e?void 0:null===(n=e.children)||void 0===n?void 0:n.length)?c=a.current.children[0]:((c=document.createElement("script")).src=t,c.async=!0,c.crossOrigin="anonymous",s&&Object.keys(s).forEach(e=>{c.setAttribute(e,s[e])}),null===(r=a.current)||void 0===r||r.appendChild(c)),c.addEventListener("load",i),c.addEventListener("error",i),()=>{c&&(c.removeEventListener("load",i),c.removeEventListener("error",i))}},[t,s]),r},l=e=>{var t,s,l,i;let c=(0,n.useRef)(null),o=r({url:"https://utteranc.es/client.js",attributes:{theme:null!==(t=null==e?void 0:e.theme)&&void 0!==t?t:"github-light","issue-term":null!==(s=null==e?void 0:e["issue-term"])&&void 0!==s?s:"pathname",repo:null!==(l=null==e?void 0:e.repo)&&void 0!==l?l:"RyoJerryYu/blog-next",label:null!==(i=null==e?void 0:e.label)&&void 0!==i?i:"comment"},ref:c});return(0,a.jsxs)("div",{className:"w-full",children:[(0,a.jsx)("div",{ref:c}),"loading"===o&&(0,a.jsx)("div",{className:"text-center",children:"Loading comments..."}),"error"===o&&(0,a.jsx)("div",{className:"text-center text-red-500",children:"Error loading comments. Please try again later."})]})};var i=s(3241),c=s(5335),o=s(2203);let u=e=>{var t,s;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.Dx,{children:e.meta.title}),(0,a.jsx)(o.dk,{children:e.meta.abstract}),(0,a.jsx)(o._S,{article:{publishedTime:null!==(t=e.meta.created_at)&&void 0!==t?t:void 0,modifiedTime:null!==(s=e.meta.updated_at)&&void 0!==s?s:void 0,tags:e.meta.tags}}),(0,a.jsxs)(c.Z,{children:[(0,a.jsx)(i.Z,{meta:e.meta,tags:e.tags,source:e.source,prevNextInfo:e.prevNextInfo}),(0,a.jsx)(l,{"issue-term":e.slug})]})]})};var d=!0,h=u},1331:function(e){e.exports={post:"Post_post__2Nkl_",postTitle:"Post_postTitle__obESR",postDate:"Post_postDate__g2i8j",postContent:"Post_postContent__XTqwK"}},632:function(e){e.exports={tagsBox:"TagsBox_tagsBox__Z0lIP",tag:"TagsBox_tag__PAgNP",highlightedTag:"TagsBox_highlightedTag__q1tKH"}},7339:function(e){e.exports={headeritem:"DefaultLayout_headeritem__RhuEh",textbox:"DefaultLayout_textbox__7Wb4y",textlink:"DefaultLayout_textlink__6A_gH",header:"DefaultLayout_header__XE11y",icon:"DefaultLayout_icon__nrf7l",navBar:"DefaultLayout_navBar___k_JM",navBarItem:"DefaultLayout_navBarItem__YPtK6",headerRight:"DefaultLayout_headerRight__DHBsQ",headerBg:"DefaultLayout_headerBg__ADsuB",contentHeight:"DefaultLayout_contentHeight__WU8Ci",footer:"DefaultLayout_footer__otgnc",footerLeft:"DefaultLayout_footerLeft__pCizs",footerRight:"DefaultLayout_footerRight__VOEtk",footerIcon:"DefaultLayout_footerIcon__HMPAz"}},2746:function(e,t,s){"use strict";e.exports.jsxRuntime=s(5893)}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=617)}),_N_E=e.O()}]);