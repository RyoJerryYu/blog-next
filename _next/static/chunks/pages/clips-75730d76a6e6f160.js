(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4365],{6357:(t,e,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/clips",function(){return s(8823)}])},3394:(t,e,s)=>{"use strict";s.d(e,{A:()=>x});var a=s(4848),l=s(1106),r=s.n(l);s(6540);var i=s(9843),c=s(2306),n=s(8312),o=s.n(n);let h=t=>{let{className:e,children:s}=t,l=s.split("\n");return(0,a.jsx)("div",{className:e,children:l.map((t,e)=>(0,a.jsx)("p",{className:"py-1",children:t},e))})};function d(t){let{className:e,postMeta:s,url:l,tags:n}=t;return(0,a.jsxs)("div",{className:e,children:[(0,a.jsxs)(r(),{href:l,children:[(0,a.jsx)("h6",{className:o().postTitle,children:s.title}),s.created_at&&(0,a.jsx)(i.A,{className:o().postDate,children:s.created_at}),s.abstract&&s.abstract.length>0&&(0,a.jsx)(h,{className:o().postAbstract,children:s.abstract})]}),s.tags&&s.tags.length>0&&(0,a.jsx)(c.A,{tags:n,className:"py-4 md:py-1"})]})}function x(t){let{posts:e,allTags:s}=t;if(0===e.length)return(0,a.jsx)("div",{children:"No posts"});let l=e.map(t=>{let e=t.pathMapping.pagePath,a=t.meta.tags.map(t=>s.get(t)||{tag:t,slug:t,path:"",postSlugs:[]});return{post:t,url:e,tags:a}});return(0,a.jsx)("div",{className:o().postList,children:l.map(t=>{let{post:e,url:s,tags:l}=t;return(0,a.jsx)(d,{className:o().postListElement,postMeta:e.meta,tags:l,url:s},e.pathMapping.pagePath)})})}},9843:(t,e,s)=>{"use strict";s.d(e,{A:()=>i});var a=s(4848),l=s(4353),r=s.n(l);function i(t){let{className:e,children:s}=t,l=r()(s);return(0,a.jsx)("div",{className:e,children:(0,a.jsx)("time",{dateTime:l.toJSON(),children:l.format("YYYY-MM-DD")})})}},2306:(t,e,s)=>{"use strict";s.d(e,{A:()=>o});var a=s(4848),l=s(4164),r=s(1106),i=s.n(r),c=s(638),n=s.n(c);let o=t=>{let e=e=>{let s=t.highlightedTagSlug===e.slug?(0,a.jsx)("div",{className:n().highlightedTag,children:e.tag}):(0,a.jsx)("div",{className:n().tag,children:e.tag});return e.path?(0,a.jsx)(i(),{href:e.path,children:s},e.slug):(0,a.jsx)("div",{children:s},e.slug)};return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:(0,l.A)(n().tagsBox,t.className),children:t.tags.map(t=>e(t))})})}},2696:(t,e,s)=>{"use strict";s.d(e,{c:()=>a});let a=t=>{let e=new Map;return t.forEach(t=>{e.set(t.tag,t)}),e}},2878:(t,e,s)=>{"use strict";s.d(e,{A:()=>p});var a=s(4848);let l=t=>(0,a.jsx)("svg",{className:t.className,viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"})}),r=t=>(0,a.jsx)("svg",{className:t.className,viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{d:"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"})}),i=t=>(0,a.jsx)("svg",{className:t.className,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{d:"M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.092-3.225 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.718c.397.116 1.048.365.635.779H5.79c-.41-.41.19-.65.644-.779V7.666c-1.053.81-1.593 1.51-1.868 2.031.32 1.02-.284.969-.284.969l-1.09-1.73s3.868-4.39 9.553-4.39zm-.19.971c-1.423-.003-3.184.473-4.27 1.244v8.646c.988.487 2.484.832 4.26.832h.01c1.596 0 2.98-.593 3.93-1.533.952-.948 1.486-2.183 1.492-3.683-.005-1.54-.504-2.864-1.42-3.86-.918-.992-2.274-1.645-4.002-1.646Z"})});var c=s(4164),n=s(1106),o=s.n(n),h=s(4023),d=s.n(h),x=s(7315);let m=t=>(0,a.jsx)("div",{className:" flex flex-row gap-8 items-center justify-center",children:[{href:"https://twitter.com/ryo_okami",title:"Twitter",Icon:r},{href:"https://github.com/RyoJerryYu",title:"GitHub",Icon:l},{href:"https://www.pixiv.net/users/9159893",title:"Pixiv",Icon:i}].map(e=>(0,a.jsx)(o(),{href:e.href,title:e.title,children:(0,a.jsx)(e.Icon,{className:t.className})},e.title))}),_=t=>{let{className:e,items:s}=t;return(0,a.jsx)("div",{className:e,children:s.map(t=>(0,a.jsx)("div",{className:d().navBarItem,children:(0,a.jsx)(o(),{href:t.to,className:d().textlink,children:t.text})},t.text))})},g=t=>{let{items:e,iconItem:s,rightItem:l}=t;return(0,a.jsxs)("header",{className:d().header,children:[(0,a.jsx)("div",{className:d().icon,children:(0,a.jsx)("div",{className:d().textbox,children:(0,a.jsx)(o(),{href:s.to,className:d().textlink,children:s.text})})}),(0,a.jsx)(_,{className:d().navBar,items:e}),(0,a.jsxs)("div",{className:d().headerRight,children:[(0,a.jsx)(m,{className:" h-6 w-6 fill-gray-300 hover:fill-white transition-all ease-in-out"}),l&&(0,a.jsx)("div",{className:d().textbox,children:(0,a.jsx)(o(),{href:l.to,className:d().textlink,children:l.text})})]})]})},u=t=>(0,a.jsx)("footer",{className:d().footer,children:(0,a.jsx)(x.A,{className:"w-full",children:(0,a.jsxs)("div",{className:"flex flex-row justify-center items-center",children:[(0,a.jsx)("div",{className:d().footerLeft,children:"\xa9 2023 Ryo Jerry Yu. All rights reserved."}),(0,a.jsx)("div",{className:d().footerRight,children:(0,a.jsx)(m,{className:(0,c.A)(d().footerIcon,"h-8 w-8")})})]})})}),p=t=>{let{children:e,withFullScreen:s}=t;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(g,{items:[{to:"/articles",text:"Articles"},{to:"/ideas",text:"Ideas"},{to:"/learn_from_ai",text:"Learn from AI"},{to:"/tags",text:"Tags"},{to:"/clips",text:"Clips"}],iconItem:{to:"/",text:"Ryo's Blog"}}),s?e:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:d().headerBg}),(0,a.jsx)(x.A,{children:(0,a.jsx)("div",{className:d().contentHeight,children:e})})]}),(0,a.jsx)(u,{})]})}},7315:(t,e,s)=>{"use strict";s.d(e,{A:()=>r});var a=s(4848),l=s(4164);function r(t){return(0,a.jsx)("div",{className:(0,l.A)("max-w-3xl mx-auto p-2",t.className),children:t.children})}},8823:(t,e,s)=>{"use strict";s.r(e),s.d(e,{__N_SSG:()=>o,default:()=>h});var a=s(4848),l=s(3394),r=s(2696),i=s(2878),c=s(7315),n=s(7139),o=!0;function h(t){let e=t.data.map(t=>({pathMapping:{slug:t.id,filePath:t.url,pagePath:t.url},meta:{title:t.title,created_at:t.created_time,content:"",abstract:"",length:0,updated_at:null,license:!1,tags:t.tags}})),s=(0,r.c)(t.allTags);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.hE,{children:"Clips"}),(0,a.jsx)(i.A,{children:(0,a.jsx)(c.A,{children:(0,a.jsx)(l.A,{posts:e,allTags:s})})})]})}},8312:t=>{t.exports={postList:"PostList_postList__Tuobz",postListElement:"PostList_postListElement__qi6kp",postTitle:"PostList_postTitle__vveJr",postDate:"PostList_postDate__z_XQh",postAbstract:"PostList_postAbstract__HtPA1"}},638:t=>{t.exports={tagsBox:"TagsBox_tagsBox__WzhAf",tag:"TagsBox_tag__Rk32C",highlightedTag:"TagsBox_highlightedTag__cLTHz"}},4023:t=>{t.exports={headeritem:"DefaultLayout_headeritem__hYzfN",textbox:"DefaultLayout_textbox__H9FZG",textlink:"DefaultLayout_textlink__EVwys",header:"DefaultLayout_header__aepTD",icon:"DefaultLayout_icon__11sTk",navBar:"DefaultLayout_navBar__gY4ra",navBarItem:"DefaultLayout_navBarItem__nhL6L",headerRight:"DefaultLayout_headerRight__0Kj26",headerBg:"DefaultLayout_headerBg__FStmg",contentHeight:"DefaultLayout_contentHeight__DabjQ",footer:"DefaultLayout_footer__n5339",footerLeft:"DefaultLayout_footerLeft__j0yvY",footerRight:"DefaultLayout_footerRight___Dn67",footerIcon:"DefaultLayout_footerIcon__sgrmB"}}},t=>{var e=e=>t(t.s=e);t.O(0,[4785,636,6593,8792],()=>e(6357)),_N_E=t.O()}]);