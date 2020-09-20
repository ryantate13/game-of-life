(this["webpackJsonpgame-of-life"]=this["webpackJsonpgame-of-life"]||[]).push([[0],[,,,,function(e,n,t){e.exports={panel:"Header_panel__2qOlC",controls:"Header_controls__1AkqJ"}},,,function(e,n,t){e.exports={App:"App_App__15LM-"}},function(e,n,t){e.exports={board:"Game_board__io3jt"}},,function(e,n,t){e.exports=t(16)},,,,,function(e,n,t){},function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),i=t(6),o=t.n(i),l=t(1),c=t(9),s=t(7),u=t.n(s);var d="#\n          \n          \n          \n      **  \n  **** ** \n  ******  \n   ****   \n          \n          \n              \n#".replace("#\n","").replace("\n#","").split("\n"),f=250/d.length;function m(){return r.a.createElement("svg",{viewBox:"0 0 ".concat(250," ").concat(250)},d.map((function(e,n){return e.split("").map((function(e,t){return r.a.createElement("rect",{key:"".concat(n).concat(t),width:f,height:f,x:t*f,y:n*f,fill:e.trim()?"#000":"#fff",strokeWidth:1,stroke:"rgba(0,0,0,0.75)"})}))})))}var h=t(4),p=t.n(h);function v(e){var n=e.generation,t=e.frames_per_second,a=e.paused,i=e.dispatch,o=e.fill_rate;return r.a.createElement("div",{className:p.a.panel},r.a.createElement(m,null),r.a.createElement("h1",{className:p.a.h1},"Game of Life"),r.a.createElement("div",{className:p.a.controls},r.a.createElement("h4",null,"Controls",r.a.createElement("button",{disabled:!a,onClick:function(){return i({type:"play"})},title:"Start"},r.a.createElement("span",{role:"img","aria-label":"play"},"\u25b6"),"\ufe0f"),r.a.createElement("button",{disabled:a,onClick:function(){return i({type:"pause"})},title:"Pause"},r.a.createElement("span",{role:"img","aria-label":"pause"},"\u23f8"),"\ufe0f"),r.a.createElement("button",{disabled:!a,onClick:function(){return i({type:"random"})},title:"Generate Random Board"},r.a.createElement("span",{role:"img","aria-label":"random"},"\u21bb"),"\ufe0f")),r.a.createElement("h4",null,"Frames Per Second",r.a.createElement("select",{value:t,onChange:function(e){var n=e.target.value;return i({type:"frames_per_second",value:Number(n)})}},Array(60).fill(null).map((function(e,n){return n+1})).filter((function(e){return!(60%e)})).map((function(e){return r.a.createElement("option",{key:e},e)})))),r.a.createElement("h4",null,"Generation: ",n),r.a.createElement("h4",null,"Fill Rate ",o,"%",r.a.createElement("input",{disabled:!a,type:"range",min:10,max:100,step:10,value:o,onChange:function(e){var n=e.target.value;return i({type:"fill_rate",value:Number(n)})}}))))}var g=t(2),b=t(8),w=t.n(b),y=["                         ","                         ","                         ","                         ","                         ","                         ","                         ","                         ","                         ","                         ","            \u25a0            ","             \u25a0           ","           \u25a0\u25a0\u25a0           ","                         ","                         ","                         ","                         ","                         ","                         ","                         ","                         ","                         ","                         ","                         ","                         "];function _(e){for(var n=e.width,t=e.height,a=new Set,r=y.length,i=y[0].length,o=0;o<t;++o)for(var l=0;l<n;++l)y[o%r][l%i].trim()&&a.add([l,o].toString());return a}function E(e){return e.split(",").map(Number)}function k(e,n,t,a){for(var r=[],i=Math.min(e+1,t-1),o=Math.min(n+1,a-1),l=Math.max(0,e-1);l<=i;++l)for(var c=Math.max(0,n-1);c<=o;++c)l===e&&c===n||r.push([l,c]);return r}function S(e){var n=e.dispatch,t=e.dimensions,i=t.height,o=t.width,c=e.cells,s=c.alive,u=c.dying,d=e.zoom,f=Object(a.useRef)(null);Object(a.useEffect)((function(){!function(e,n){if(e&&e.current){var t=e.current.getBoundingClientRect(),a=t.width;n({type:"dimensions",height:t.height,width:a})}}(f,n)}),[f]);var m=Object(a.useRef)(null);return Object(a.useEffect)((function(){!function(e,n,t,a,r){if(e&&e.current){var i=e.current.getContext("2d"),o=function(e,n){i.fillStyle=e;var t,a=Object(g.a)(n);try{for(a.s();!(t=a.n()).done;){var r=E(t.value),o=Object(l.a)(r,2),c=o[0],s=o[1];i.fillRect(c,s,1,1)}}catch(u){a.e(u)}finally{a.f()}};a.size||r.size?(o("white",r),o("black",a)):(i.fillStyle="white",i.fillRect(0,0,n,t))}}(m,o,i,s,u)}),[m,o,i,s,u]),r.a.createElement("div",{className:w.a.board,ref:f},r.a.createElement("canvas",Object.assign({ref:m},{height:i,width:o},{style:{zoom:d}})))}var j={generation:0,frames_per_second:60,fill_rate:10,paused:!0,animation_id:0,dimensions:{height:0,width:0},cells:{alive:new Set([]),dying:new Set([])},zoom:5};function O(e,n,t){var a=function(){e.paused||(e.animation_id=setTimeout((function(){return t({type:"generate"})}),1e3/e.frames_per_second))};switch(n.type){case"fill_rate":e.fill_rate=n.value;break;case"frames_per_second":e.frames_per_second=n.value;break;case"play":e.paused=!1,a();break;case"pause":e.paused=!0,clearTimeout(e.animation_id),e.animation_id=0;break;case"random":e.generation=j.generation;for(var r=new Set,i=0;i<e.dimensions.width;++i)for(var o=0;o<e.dimensions.height;++o)Math.random()>1-e.fill_rate/100&&r.add([i,o].toString());e.cells.dying=new Set,e.cells.alive=new Set,requestAnimationFrame((function(){return t({type:"cells",cells:r})}));break;case"cells":e.cells.alive=n.cells;break;case"generate":e.cells.alive.size&&(++e.generation,e.cells=function(e,n,t){var a,r=new Set,i=new Set,o=Object(g.a)(e);try{for(o.s();!(a=o.n()).done;){var c,s=a.value,u=E(s),d=Object(l.a)(u,2),f=k(d[0],d[1],n,t).reduce((function(n,t){return n[e.has(t.toString())?"alive":"dead"].push(t),n}),{dead:[],alive:[]}),m=f.alive,h=f.dead,p=Object(g.a)(h);try{for(p.s();!(c=p.n()).done;){var v=c.value;3===k(v[0],v[1],n,t).filter((function(n){return e.has(n.toString())})).length&&i.add(v.toString())}}catch(O){p.e(O)}finally{p.f()}2!==m.length&&3!==m.length&&r.add(s)}}catch(O){o.e(O)}finally{o.f()}var b,w=Object(g.a)(r);try{for(w.s();!(b=w.n()).done;){var y=b.value;e.delete(y)}}catch(O){w.e(O)}finally{w.f()}var _,S=Object(g.a)(i);try{for(S.s();!(_=S.n()).done;){var j=_.value;e.add(j)}}catch(O){S.e(O)}finally{S.f()}return{alive:e,dying:r}}(e.cells.alive,e.dimensions.width,e.dimensions.height),a());break;case"dimensions":e.dimensions.height=Math.floor(n.height/e.zoom),e.dimensions.width=Math.floor(n.width/e.zoom),requestAnimationFrame((function(){return t({type:"cells",cells:_(e.dimensions)})}));break;default:console.error("unmatched event type",{event:n,state:e})}return Object(c.a)({},e)}function A(){var e=function(e,n){var t=Object(a.useState)(e),r=Object(l.a)(t,2),i=r[0],o=r[1];return[i,function e(t){o((function(a){return n(a,t,e)}))}]}(j,O),n=Object(l.a)(e,2),t=n[0],i=n[1];return Object.assign(window,{state:t,dispatch:i}),r.a.createElement("div",{className:u.a.App},r.a.createElement(v,{dispatch:i,generation:t.generation,frames_per_second:t.frames_per_second,paused:t.paused,fill_rate:t.fill_rate}),r.a.createElement(S,{dispatch:i,dimensions:t.dimensions,cells:t.cells,zoom:t.zoom}))}var C=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function x(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}t(15);o.a.render(r.a.createElement(A,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/game-of-life",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/game-of-life","/service-worker.js");C?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):x(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):x(n,e)}))}}()}],[[10,1,2]]]);
//# sourceMappingURL=main.35d3712a.chunk.js.map