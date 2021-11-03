var te=Object.defineProperty,ne=Object.defineProperties;var ae=Object.getOwnPropertyDescriptors;var L=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var V=(e,t,n)=>t in e?te(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,i=(e,t)=>{for(var n in t||(t={}))F.call(t,n)&&V(e,n,t[n]);if(L)for(var n of L(t))I.call(t,n)&&V(e,n,t[n]);return e},d=(e,t)=>ne(e,ae(t));var _=(e,t)=>{var n={};for(var o in e)F.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&L)for(var o of L(e))t.indexOf(o)<0&&I.call(e,o)&&(n[o]=e[o]);return n};import{j as c,a,S as oe,h as g,M as Y,u as N,b as S,r as f,D as j,F as se,m as re,C as ce,L as H,P as k,R as $,c as E,B as le,d as ie,e as de,f as ue,g as me,i as pe,t as he,k as ve,l as ge}from"./vendor.cb436e21.js";const fe=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};fe();const ye=({event:e})=>{const{title:t,user:n}=e;return c("div",{children:[a("strong",{children:t}),c("span",{children:[" - ",n.name]})]})};const y=e=>{oe.fire({title:"Error :(",text:e,icon:"error",confirmButtonText:"Let me try again!",confirmButtonColor:"#F01341"})},Se={content:{}},l={uiOpenModal:"[ui] Open Modal",uiCloseModal:"[ui] Close Modal",eventSetActive:"[event] Set Active",eventLogout:"[event] Logout Event",eventStartAddNew:"[event] Start Add New",eventAddNew:"[event] Add New",eventCleanActive:"[event] Clean Active",eventUpdated:"[event] Updated",eventDeleted:"[event] Deleted",eventLoaded:"[event] Loaded",authCheckingFinish:"[auth] Finish Login State",authStartLogin:"[auth] Start Login",authLogin:"[auth] Login",authStartRegister:"[auth] Start Register",authStartTokenRenew:"[auth] Start Token Renew",authLogout:"[auth] Logout"},U=()=>({type:l.uiOpenModal}),Ne=()=>({type:l.uiCloseModal}),J="https://calendar-mern-jmol.herokuapp.com/api",B=(e,t,n="GET")=>{const o=`${J}/${e}`;return n==="GET"?fetch(o):fetch(o,{method:n,headers:{"Content-type":"application/json"},body:JSON.stringify(t)})},w=(e,t,n="GET")=>{const o=`${J}/${e}`,s=localStorage.getItem("token")||"";return n==="GET"?fetch(o,{method:n,headers:{"x-token":s}}):fetch(o,{method:n,headers:{"Content-type":"application/json","x-token":s},body:JSON.stringify(t)})},we=e=>e.map(t=>d(i({},t),{end:g(t.end).toDate(),start:g(t.start).toDate()})),be=e=>async(t,n)=>{const{uid:o,name:s}=n().auth;try{const u=await(await w("events",e,"POST")).json();u.ok&&(e.id=u.event.id,e.user={_id:o,name:s},t(Le(e)))}catch(r){console.log(r)}},Le=e=>({type:l.eventAddNew,payload:e}),ke=e=>({type:l.eventSetActive,payload:e}),G=()=>({type:l.eventCleanActive}),Ce=e=>async t=>{try{const o=await(await w(`events/${e.id}`,e,"PUT")).json();o.ok?t(De(e)):y(o.msg)}catch(n){console.log(n)}},De=e=>({type:l.eventUpdated,payload:e}),_e=()=>async(e,t)=>{const{id:n}=t().calendar.activeEvent;try{const s=await(await w(`events/${n}`,{},"DELETE")).json();s.ok?e(Ee()):y(s.msg)}catch(o){console.log(o)}},Ee=()=>({type:l.eventDeleted}),Me=()=>async e=>{try{const n=await(await w("events")).json(),o=we(n.events);e(Ae(o))}catch(t){console.log(t)}},Ae=e=>({type:l.eventLoaded,payload:e}),Te=()=>({type:l.eventLogout});Y.setAppElement("#root");const q=g().minutes(0).seconds(0).add(1,"hours"),z=g().minutes(0).seconds(0).add(2,"hours"),M={title:"",notes:"",start:q.toDate(),end:z.toDate()},Re=()=>{const{modalOpen:e}=N(m=>m.ui),{activeEvent:t}=N(m=>m.calendar),n=S(),[o,s]=f.exports.useState(q.toDate()),[r,u]=f.exports.useState(z.toDate()),[h,v]=f.exports.useState(M),{notes:b,title:C,start:p,end:R}=h;f.exports.useEffect(()=>{v(t||M)},[t]);const D=()=>{n(Ne()),n(G()),v(M)},x=m=>{s(m),v(d(i({},h),{start:m}))},O=m=>{u(m),v(d(i({},h),{end:m}))},P=({target:m})=>{v(d(i({},h),{[m.name]:m.value}))};return c(Y,{isOpen:e,onRequestClose:D,closeTimeoutMS:200,style:Se,className:"modal",overlayClassName:"modal-bg",children:[c("h1",{children:[t?"Editar evento":"Nuevo evento"," "]}),a("hr",{}),c("form",{className:"container",onSubmit:m=>{m.preventDefault();const Z=g(p),ee=g(R);if(Z.isSameOrAfter(ee))return y("La fecha final siempre debe de ser mayor a la inicial");if(C.trim().length<2)return y("El evento debe de tener un t\xEDtulo");n(t?Ce(h):be(h)),D()},children:[c("div",{className:"form-group",children:[a("label",{children:"Fecha y hora inicio"}),a(j,{onChange:x,value:o,className:"form-control"})]}),c("div",{className:"form-group",children:[a("label",{children:"Fecha y hora fin"}),a(j,{onChange:O,value:r,minDate:o,className:"form-control"})]}),a("hr",{}),c("div",{className:"form-group",children:[a("label",{children:"Titulo y notas"}),a("input",{type:"text",className:"form-control",placeholder:"T\xEDtulo del evento",name:"title",autoComplete:"off",value:C,onChange:P}),a("small",{id:"emailHelp",className:"form-text text-muted",children:"Una descripci\xF3n corta"})]}),c("div",{className:"form-group",children:[a("textarea",{type:"text",className:"form-control",placeholder:"Notas",rows:"5",name:"notes",value:b,onChange:P}),a("small",{id:"emailHelp",className:"form-text text-muted",children:"Informaci\xF3n adicional"})]}),c("button",{type:"submit",className:"btnSubmit",children:[a("i",{className:"far fa-save"}),a("span",{children:" Guardar"})]})]})]})},xe=(e,t)=>async n=>{const s=await(await B("auth",{email:e,password:t},"POST")).json();s.ok?(localStorage.setItem("token",s.token),localStorage.setItem("token-init-date",new Date().getTime()),n(A({uid:s.uid,name:s.name}))):y(s.msg)},Oe=(e,t,n)=>async o=>{const r=await(await B("auth/register",{name:e,email:t,password:n},"POST")).json();r.ok?(localStorage.setItem("token",r.token),localStorage.setItem("token-init-date",new Date().getTime()),o(A({uid:r.uid,name:r.name}))):y(r.msg)},Pe=()=>async e=>{if(!!!localStorage.getItem("token")){e(W());return}const o=await(await w("auth/validate")).json();o.ok?(localStorage.setItem("token",o.token),localStorage.setItem("token-init-date",new Date().getTime()),e(A({uid:o.uid,name:o.name}))):(y(o.msg),e(W()))},W=()=>({type:l.authCheckingFinish}),A=e=>({type:l.authLogin,payload:e}),Fe=()=>e=>{localStorage.clear(),e(Te()),e(Ie())},Ie=()=>({type:l.authLogout}),Ve=()=>{const{name:e}=N(o=>o.auth),t=S();return c("nav",{className:"navbar",children:[a("span",{className:"navbar-brand",children:e}),c("button",{className:"sign-out",onClick:()=>{t(Fe())},children:[a("i",{className:"fas fa-sign-out-alt"}),a("span",{children:"Salir"})]})]})},Ye=({type:e})=>{const t=S();return c(se,{children:[e==="add"&&a("button",{className:"btn-float  btn-floatAdd",onClick:()=>{t(U())},children:a("i",{className:"fas fa-plus"})}),e==="delete"&&a("button",{className:"btn-float",onClick:()=>{t(_e())},children:a("i",{className:"fas fa-trash-can"})})]})},je={allDay:"Todo el d\xEDa",previous:"<",next:">",today:"Hoy",month:"Mes",week:"Semana",day:"D\xEDa",agenda:"Agenda",date:"Fecha",time:"Hora",event:"Evento",noEventsInRange:"No hay eventos en este rango",showMore:e=>`+ Ver m\xE1s (${e})`},He={months:"Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),monthsShort:"Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),weekdays:"Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),weekdaysShort:"Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),weekdaysMin:"Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),week:{dow:1},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"}};g.updateLocale("es",He);const $e=re(g),Ue=()=>{const e=S(),{events:t,activeEvent:n}=N(p=>p.calendar),{uid:o}=N(p=>p.auth),[s,r]=f.exports.useState(localStorage.getItem("lastView")||"month");return f.exports.useEffect(()=>{e(Me())},[e]),c("div",{className:"calendar-page",children:[a(Ve,{}),a(ce,{localizer:$e,events:t,startAccessor:"start",endAccesor:"end",messages:je,eventPropGetter:(p,R,D,x)=>({style:{backgroundColor:o===p.user._id?"#F01341":"#465660",borderRadius:"0.6rem",display:"block",color:"#fff"}}),onDoubleClickEvent:()=>{e(U())},onView:p=>{r(p),localStorage.setItem("lastView",p)},onSelectEvent:p=>{e(ke(p))},onSelectSlot:p=>{e(G())},selectable:!0,view:s,components:{event:ye}}),a(Ye,{type:n?"delete":"add"}),a(Re,{})]})},X=(e={})=>{const[t,n]=f.exports.useState(e);return[t,({target:r})=>{n(d(i({},t),{[r.name]:r.value}))},()=>{n(e)}]},Je=()=>{const e=S(),t={email:"",password:""},[n,o]=X(t),{email:s,password:r}=n;return c("div",{className:"container-background",children:[c("div",{className:"circle-container",children:[a("div",{className:"float-circle circle1"}),a("div",{className:"float-circle circle2"})]}),a("div",{className:"login-container",children:c("div",{className:"login-form",children:[a("h3",{children:"Sign in"}),c("form",{onSubmit:h=>{h.preventDefault(),e(xe(s,r))},children:[a("div",{className:"form-group",children:a("input",{type:"text",className:"form-control",placeholder:"Email",name:"email",value:s,onChange:o})}),a("div",{className:"form-group",children:a("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",value:r,onChange:o})}),a("input",{type:"submit",className:"btnSubmit",value:"Login"})]}),c("p",{className:"redirectToRegister",children:["You do not have an account? ",a(H,{to:"/register",children:"Register here"})]})]})})]})},Be=()=>{const e=S(),t={name:"",email:"",password:"",repeatPassword:""},[n,o]=X(t),{name:s,email:r,password:u,repeatPassword:h}=n;return c("div",{className:"container-background",children:[c("div",{className:"circle-container",children:[a("div",{className:"float-circle circle1"}),a("div",{className:"float-circle circle2"})]}),a("div",{className:"login-container",children:c("div",{className:"register-form",children:[a("h3",{children:"Sign up"}),c("form",{onSubmit:b=>{if(b.preventDefault(),u!==h)return y("Password must match");e(Oe(s,r,u))},children:[a("div",{className:"form-group",children:a("input",{type:"text",className:"form-control",placeholder:"Name",name:"name",value:s,onChange:o})}),a("div",{className:"form-group",children:a("input",{type:"email",className:"form-control",placeholder:"Email",name:"email",value:r,onChange:o})}),a("div",{className:"form-group",children:a("input",{type:"password",className:"form-control",placeholder:"Password",name:"password",value:u,onChange:o})}),a("div",{className:"form-group",children:a("input",{type:"password",className:"form-control",placeholder:"Repeat Password",name:"repeatPassword",value:h,onChange:o})}),a("input",{type:"submit",className:"btnSubmit",value:"Create account"})]}),c("p",{className:"redirectToLogin",children:["Do you already have an account? ",a(H,{to:"/",children:"Log in"})]})]})})]})},Ge=()=>a("div",{className:"spinner"}),T=o=>{var s=o,{isAuthenticated:e,component:t}=s,n=_(s,["isAuthenticated","component"]);return a($,d(i({},n),{component:r=>e?a(E,{to:"/"}):a(t,i({},r))}))};T.propTypes={isAuthenticated:k.bool.isRequired,component:k.func.isRequired};const K=o=>{var s=o,{isAuthenticated:e,component:t}=s,n=_(s,["isAuthenticated","component"]);return a($,d(i({},n),{component:r=>e?a(t,i({},r)):a(E,{to:"/login"})}))};K.propTypes={isAuthenticated:k.bool.isRequired,component:k.func.isRequired};const qe=()=>{const e=S(),{checking:t,uid:n}=N(o=>o.auth);return f.exports.useEffect(()=>{e(Pe())},[e]),t?a(Ge,{}):a(le,{children:a("div",{children:c(ie,{children:[a(T,{exact:!0,path:"/login",component:Je,isAuthenticated:!!n}),a(T,{exact:!0,path:"/register",component:Be,isAuthenticated:!!n}),a(K,{exact:!0,path:"/",component:Ue,isAuthenticated:!!n}),a(E,{to:"/"})]})})})},ze={checking:!0},We=(e=ze,t)=>{switch(t.type){case l.authLogin:return d(i(i({},e),t.payload),{checking:!1});case l.authCheckingFinish:return d(i({},e),{checking:!1});case l.authLogout:return{checking:!1};default:return e}},Q={events:[],activeEvent:null},Xe=(e=Q,t)=>{switch(t.type){case l.eventSetActive:return d(i({},e),{activeEvent:t.payload});case l.eventAddNew:return d(i({},e),{events:[...e.events,t.payload]});case l.eventCleanActive:return d(i({},e),{activeEvent:null});case l.eventUpdated:return d(i({},e),{events:e.events.map(n=>n.id===t.payload.id?t.payload:n)});case l.eventDeleted:return d(i({},e),{events:e.events.filter(n=>n.id!==e.activeEvent.id),activeEvent:null});case l.eventLoaded:return d(i({},e),{events:[...t.payload]});case l.eventLogout:return i({},Q);default:return e}},Ke={modalOpen:!1},{uiOpenModal:Qe,uiCloseModal:Ze}=l,et=(e=Ke,t)=>{switch(t.type){case Qe:return d(i({},e),{modalOpen:!0});case Ze:return d(i({},e),{modalOpen:!1});default:return e}},tt=de({ui:et,calendar:Xe,auth:We}),nt=typeof window!="undefined"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||pe,at=ue(tt,nt(me(he))),ot=()=>a(ve,{store:at,children:a(qe,{})});ge.render(a(ot,{}),document.getElementById("root"));