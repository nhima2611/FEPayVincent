(this["webpackJsonpfe-react-ts"]=this["webpackJsonpfe-react-ts"]||[]).push([[18],{410:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(170);function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Object(r.a)(e,t)}},414:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(448),a=n(472);function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}var i=n(173);function c(e,t){if(t&&("object"===o(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return Object(i.a)(e)}function s(e){var t=Object(a.a)();return function(){var n,a=Object(r.a)(e);if(t){var o=Object(r.a)(this).constructor;n=Reflect.construct(a,arguments,o)}else n=a.apply(this,arguments);return c(this,n)}}},420:function(e,t,n){"use strict";var r=n(11),a=n(6),o=n(4),i=n.n(o),c=n(457),s=n.n(c),l=function(){var e=Object(r.a)(i.a.mark((function e(t){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s.a.fire({backdrop:!0,title:t.title||"Are you sure?",text:"You won't be able to revert this!",icon:"info",showCancelButton:!0,confirmButtonText:null!==(n=t.confirmButtonText)&&void 0!==n?n:"Ok",denyButtonText:null!==(r=t.denyButtonText)&&void 0!==r?r:"Cancel"}).then((function(e){var n,r,a;return e.isConfirmed?null===(r=t.onConfirm)||void 0===r?void 0:r.call(t):e.isDenied?null===(a=t.onDenied)||void 0===a?void 0:a.call(t):null===(n=t.onDenied)||void 0===n?void 0:n.call(t)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.a={toast:function(e,t,n){var r="#ffffff";switch(e){case"success":r="#5cb85c";break;case"error":r="#d9534f"}return s.a.fire({icon:e,title:t,toast:!0,position:n||"bottom-end",background:r,color:"white",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",s.a.stopTimer),e.addEventListener("mouseleave",s.a.resumeTimer)}})},showConfirm:l,showDeleteConfirm:function(e){return s.a.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((function(t){var n,r,a;return t.isConfirmed?null===(r=e.onConfirm)||void 0===r?void 0:r.call(e):t.isDenied?null===(a=e.onDenied)||void 0===a?void 0:a.call(e):null===(n=e.onDenied)||void 0===n?void 0:n.call(e)}))},showError:function(e){return s.a.fire(Object(a.a)(Object(a.a)({},e),{},{icon:"error"}))},showSuccess:function(e){return s.a.fire(Object(a.a)(Object(a.a)({},e),{},{icon:"success"}))},showLoading:function(){return s.a.fire({title:"Loading",timerProgressBar:!0})},showInfo:function(e){return s.a.fire(Object(a.a)(Object(a.a)({},e),{},{icon:"info"}))},showWarning:function(e){return s.a.fire(Object(a.a)(Object(a.a)({},e),{},{icon:"warning"}))}}},448:function(e,t,n){"use strict";function r(e){return r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},r(e)}n.d(t,"a",(function(){return r}))},472:function(e,t,n){"use strict";function r(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}n.d(t,"a",(function(){return r}))},478:function(e,t,n){"use strict";var r=n(13),a=n(0),o=n.n(a),i=n(583),c=n(368),s=n(1),l=o.a.forwardRef((function(e,t){var n,a,o,l,d=e.children,u=e.type,b=e.direction,j=e.offset,f=e.scale;switch(b){case"up":case"left":o=j,l=0;break;default:o=0,l=j}var m=Object(i.a)(o,l),h=Object(r.a)(m,2),v=h[0],O=h[1],p=Object(i.a)(o,l),g=Object(r.a)(p,2),x=g[0],y=g[1];switch(u){case"rotate":return Object(s.jsx)(c.a.div,{ref:t,animate:{rotate:360},transition:{repeat:1/0,repeatType:"loop",duration:2,repeatDelay:0},children:d});case"slide":return"up"===b||"down"===b?Object(s.jsx)(c.a.div,{ref:t,animate:{y:void 0!==x?x:""},onHoverEnd:function(){return y()},onHoverStart:function(){return y()},children:d}):Object(s.jsx)(c.a.div,{ref:t,animate:{x:void 0!==v?v:""},onHoverEnd:function(){return O()},onHoverStart:function(){return O()},children:d});default:return"number"===typeof f&&(f={hover:f,tap:f}),Object(s.jsx)(c.a.div,{ref:t,whileHover:{scale:null===(n=f)||void 0===n?void 0:n.hover},whileTap:{scale:null===(a=f)||void 0===a?void 0:a.tap},children:d})}}));l.defaultProps={type:"scale",offset:10,direction:"right",scale:{hover:1,tap:.9}},t.a=l},489:function(e,t,n){"use strict";var r=n(5),a=n(7),o=n(2),i=n(0),c=n(10),s=n(168),l=n(148),d=n(8),u=n(14),b=n(380),j=n(316),f=n(87),m=n(99);function h(e){return Object(f.a)("MuiLoadingButton",e)}var v=Object(m.a)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),O=n(1),p=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],g=Object(d.a)(b.a,{shouldForwardProp:function(e){return function(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e&&"classes"!==e}(e)||"classes"===e},name:"MuiLoadingButton",slot:"Root",overridesResolver:function(e,t){return[t.root,t.startIconLoadingStart&&Object(r.a)({},"& .".concat(v.startIconLoadingStart),t.startIconLoadingStart),t.endIconLoadingEnd&&Object(r.a)({},"& .".concat(v.endIconLoadingEnd),t.endIconLoadingEnd)]}})((function(e){var t=e.ownerState,n=e.theme;return Object(o.a)(Object(r.a)({},"& .".concat(v.startIconLoadingStart,", & .").concat(v.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0}),"center"===t.loadingPosition&&Object(r.a)({transition:n.transitions.create(["background-color","box-shadow","border-color"],{duration:n.transitions.duration.short})},"&.".concat(v.loading),{color:"transparent"}),"start"===t.loadingPosition&&t.fullWidth&&Object(r.a)({},"& .".concat(v.startIconLoadingStart,", & .").concat(v.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginRight:-8}),"end"===t.loadingPosition&&t.fullWidth&&Object(r.a)({},"& .".concat(v.startIconLoadingStart,", & .").concat(v.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginLeft:-8}))})),x=Object(d.a)("div",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:function(e,t){var n=e.ownerState;return[t.loadingIndicator,t["loadingIndicator".concat(Object(c.a)(n.loadingPosition))]]}})((function(e){var t=e.theme,n=e.ownerState;return Object(o.a)({position:"absolute",visibility:"visible",display:"flex"},"start"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{left:14},"start"===n.loadingPosition&&"text"===n.variant&&{left:6},"center"===n.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:t.palette.action.disabled},"end"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{right:14},"end"===n.loadingPosition&&"text"===n.variant&&{right:6},"start"===n.loadingPosition&&n.fullWidth&&{position:"relative",left:-10},"end"===n.loadingPosition&&n.fullWidth&&{position:"relative",right:-10})})),y=i.forwardRef((function(e,t){var n=Object(u.a)({props:e,name:"MuiLoadingButton"}),r=n.children,d=n.disabled,b=void 0!==d&&d,f=n.id,m=n.loading,v=void 0!==m&&m,y=n.loadingIndicator,w=n.loadingPosition,S=void 0===w?"center":w,L=n.variant,C=void 0===L?"text":L,I=Object(a.a)(n,p),P=Object(s.a)(f),B=null!=y?y:Object(O.jsx)(j.a,{"aria-labelledby":P,color:"inherit",size:16}),_=Object(o.a)({},n,{disabled:b,loading:v,loadingIndicator:B,loadingPosition:S,variant:C}),E=function(e){var t=e.loading,n=e.loadingPosition,r=e.classes,a={root:["root",t&&"loading"],startIcon:[t&&"startIconLoading".concat(Object(c.a)(n))],endIcon:[t&&"endIconLoading".concat(Object(c.a)(n))],loadingIndicator:["loadingIndicator",t&&"loadingIndicator".concat(Object(c.a)(n))]},i=Object(l.a)(a,h,r);return Object(o.a)({},r,i)}(_);return Object(O.jsx)(g,Object(o.a)({disabled:b||v,id:P,ref:t},I,{variant:C,classes:E,ownerState:_,children:"end"===_.loadingPosition?Object(O.jsxs)(i.Fragment,{children:[r,v&&Object(O.jsx)(x,{className:E.loadingIndicator,ownerState:_,children:B})]}):Object(O.jsxs)(i.Fragment,{children:[v&&Object(O.jsx)(x,{className:E.loadingIndicator,ownerState:_,children:B}),r]})}))}));t.a=y},512:function(e,t,n){"use strict";var r=n(0);t.a=function(){var e=Object(r.useRef)(!0);return Object(r.useEffect)((function(){return function(){e.current=!1}}),[]),e}},513:function(e,t,n){"use strict";var r=n(75);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(88)),o=n(1),i=(0,a.default)((0,o.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.default=i},514:function(e,t,n){"use strict";var r=n(75);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(88)),o=n(1),i=(0,a.default)((0,o.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.default=i},515:function(e,t,n){"use strict";var r=n(6),a=n(64),o=n(352),i=n(116),c=n(1),s=["children"];t.a=function(e){var t=e.children,n=Object(a.a)(e,s);return Object(c.jsx)(i.a,Object(r.a)(Object(r.a)({boxShadow:!0,shadow:"0px 4px 16px rgba(0, 0, 0, 0.25)",sx:{boxShadow:"0px 4px 16px rgba(0, 0, 0, 0.25)",border:"1px solid #CCCCCC",borderRadius:"24px",maxWidth:{xs:450,lg:420},margin:{xs:1.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1},n),{},{children:Object(c.jsx)(o.a,{sx:{p:{xs:2,sm:3,xl:5}},children:t})}))}},516:function(e,t,n){"use strict";var r=n(8),a=Object(r.a)("div")((function(e){e.theme;return{backgroundImage:"url(images/img_bg_login.png)",backgroundSize:"cover",minHeight:"100vh"}}));t.a=a},576:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return i}));var r=n(184),a=n.n(r),o=function(e){return e<2?{label:"Poor",color:a.a.errorMain}:e<3?{label:"Weak",color:a.a.warningDark}:e<4?{label:"Normal",color:a.a.orangeMain}:e<5?{label:"Good",color:a.a.successMain}:e<6?{label:"Strong",color:a.a.successDark}:{label:"Poor",color:a.a.errorMain}},i=function(e){var t=0;return e.length>5&&(t+=1),e.length>7&&(t+=1),function(e){return new RegExp(/[0-9]/).test(e)}(e)&&(t+=1),function(e){return new RegExp(/[!#@$%^&*)(+=._-]/).test(e)}(e)&&(t+=1),function(e){return new RegExp(/[a-z]/).test(e)&&new RegExp(/[A-Z]/).test(e)}(e)&&(t+=1),t}},583:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(3),a=n(0),o=function(e,t,n){var r=t-e;return((n-e)%r+r)%r+e};function i(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=Object(a.useRef)(0),i=Object(r.e)(Object(a.useState)(e[n.current]),2),c=i[0],s=i[1];return[c,function(t){n.current="number"!==typeof t?o(0,e.length,n.current+1):t,s(e[n.current])}]}},762:function(e,t,n){"use strict";var r=n(235),a=Object(r.a)();t.a=a},763:function(e,t,n){"use strict";var r=n(75);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(88)),o=n(1),i=(0,a.default)((0,o.jsx)("path",{d:"m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"}),"ArrowForward");t.default=i},798:function(e,t,n){"use strict";n.r(t);var r=n(357),a=n(377),o=n(115),i=n(308),c=n(34),s=n(76),l=n(38),d=n(361),u=n(383),b=n(1),j=function(){return Object(b.jsxs)(d.a,{direction:"row",justifyContent:"space-between",children:[Object(b.jsx)(o.a,{variant:"subtitle2",component:u.a,href:"https://berrydashboard.io",target:"_blank",underline:"hover"}),Object(b.jsx)(o.a,{variant:"subtitle2",component:u.a,href:"https://codedthemes.com",target:"_blank",underline:"hover"})]})},f=n(178),m=n(6),h=n(13),v=n(763),O=n.n(v),p=n(513),g=n.n(p),x=n(514),y=n.n(x),w=n(489),S=n(372),L=n(7),C=n(2),I=n(0),P=n.n(I),B=n(9),E=n(148),M=n(14),R=n(8),z=n(87),k=n(99);function N(e){return Object(z.a)("MuiStepper",e)}Object(k.a)("MuiStepper",["root","horizontal","vertical","alternativeLabel"]);var D=n(10);var W=I.createContext({});var T=I.createContext({});function A(e){return Object(z.a)("MuiStepConnector",e)}Object(k.a)("MuiStepConnector",["root","horizontal","vertical","alternativeLabel","active","completed","disabled","line","lineHorizontal","lineVertical"]);var F=["className"],V=Object(R.a)("div",{name:"MuiStepConnector",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.orientation],n.alternativeLabel&&t.alternativeLabel,n.completed&&t.completed]}})((function(e){var t=e.ownerState;return Object(C.a)({flex:"1 1 auto"},"vertical"===t.orientation&&{marginLeft:12},t.alternativeLabel&&{position:"absolute",top:12,left:"calc(-50% + 20px)",right:"calc(50% + 20px)"})})),H=Object(R.a)("span",{name:"MuiStepConnector",slot:"Line",overridesResolver:function(e,t){var n=e.ownerState;return[t.line,t["line".concat(Object(D.a)(n.orientation))]]}})((function(e){var t=e.ownerState,n=e.theme;return Object(C.a)({display:"block",borderColor:"light"===n.palette.mode?n.palette.grey[400]:n.palette.grey[600]},"horizontal"===t.orientation&&{borderTopStyle:"solid",borderTopWidth:1},"vertical"===t.orientation&&{borderLeftStyle:"solid",borderLeftWidth:1,minHeight:24})})),q=I.forwardRef((function(e,t){var n=Object(M.a)({props:e,name:"MuiStepConnector"}),r=n.className,a=Object(L.a)(n,F),o=I.useContext(W),i=o.alternativeLabel,c=o.orientation,s=void 0===c?"horizontal":c,l=I.useContext(T),d=l.active,u=l.disabled,j=l.completed,f=Object(C.a)({},n,{alternativeLabel:i,orientation:s,active:d,completed:j,disabled:u}),m=function(e){var t=e.classes,n=e.orientation,r={root:["root",n,e.alternativeLabel&&"alternativeLabel",e.active&&"active",e.completed&&"completed",e.disabled&&"disabled"],line:["line","line".concat(Object(D.a)(n))]};return Object(E.a)(r,A,t)}(f);return Object(b.jsx)(V,Object(C.a)({className:Object(B.a)(m.root,r),ref:t,ownerState:f},a,{children:Object(b.jsx)(H,{className:m.line,ownerState:f})}))})),Y=["activeStep","alternativeLabel","children","className","connector","nonLinear","orientation"],G=Object(R.a)("div",{name:"MuiStepper",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.orientation],n.alternativeLabel&&t.alternativeLabel]}})((function(e){var t=e.ownerState;return Object(C.a)({display:"flex"},"horizontal"===t.orientation&&{flexDirection:"row",alignItems:"center"},"vertical"===t.orientation&&{flexDirection:"column"},t.alternativeLabel&&{alignItems:"flex-start"})})),J=Object(b.jsx)(q,{}),U=I.forwardRef((function(e,t){var n=Object(M.a)({props:e,name:"MuiStepper"}),r=n.activeStep,a=void 0===r?0:r,o=n.alternativeLabel,i=void 0!==o&&o,c=n.children,s=n.className,l=n.connector,d=void 0===l?J:l,u=n.nonLinear,j=void 0!==u&&u,f=n.orientation,m=void 0===f?"horizontal":f,h=Object(L.a)(n,Y),v=Object(C.a)({},n,{alternativeLabel:i,orientation:m}),O=function(e){var t=e.orientation,n=e.alternativeLabel,r=e.classes,a={root:["root",t,n&&"alternativeLabel"]};return Object(E.a)(a,N,r)}(v),p=I.Children.toArray(c).filter(Boolean),g=p.map((function(e,t){return I.cloneElement(e,Object(C.a)({index:t,last:t+1===p.length},e.props))})),x=I.useMemo((function(){return{activeStep:a,alternativeLabel:i,connector:d,nonLinear:j,orientation:m}}),[a,i,d,j,m]);return Object(b.jsx)(W.Provider,{value:x,children:Object(b.jsx)(G,Object(C.a)({ownerState:v,className:Object(B.a)(O.root,s),ref:t},h,{children:g}))})})),Z=n(814),$=n(801),K=n(385),Q=n(815),X=n(386),ee=n(388),te=n(762),ne=n(439),re=n(512),ae=n(22),oe=n(420),ie=n(457),ce=n.n(ie),se=n(478),le=n(576),de=n(440),ue=function(e){var t=e.onSubmit,n=e.loading,r=Object(c.a)();return Object(b.jsx)(ne.a,{initialValues:{email:"",submit:null},validationSchema:de.d().shape({email:de.f().email("Must be a valid email").max(255).required("Email is required")}),onSubmit:function(e,n){n.setErrors,n.setStatus,n.setSubmitting;t(_.get(e,"email"))},children:function(e){var t=e.errors,a=e.handleBlur,o=e.handleChange,i=e.handleSubmit,c=(e.isSubmitting,e.touched),s=e.values;return Object(b.jsxs)("form",{noValidate:!0,onSubmit:i,children:[Object(b.jsxs)(Z.a,{fullWidth:!0,error:Boolean(c.email&&t.email),sx:Object(m.a)({},r.typography.customInput),children:[Object(b.jsx)($.a,{htmlFor:"outlined-adornment-email-forgot",children:"Email Address / Username"}),Object(b.jsx)(K.a,{id:"outlined-adornment-email-forgot",type:"email",value:s.email,name:"email",onBlur:a,onChange:o,label:"Email Address / Username"}),c.email&&t.email&&Object(b.jsx)(Q.a,{error:!0,id:"standard-weight-helper-text-email-forgot",children:t.email})]}),Object(b.jsx)(te.a,{sx:{mt:2},children:Object(b.jsx)(se.a,{children:Object(b.jsx)(w.a,{disableElevation:!0,disabled:n,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"primary",endIcon:Object(b.jsx)(O.a,{}),loading:n,loadingPosition:"end",children:"Send Mail"})})})]})}})},be=function(e){var t=e.onSubmit,n=e.loading,r=Object(c.a)();return Object(b.jsx)(ne.a,{initialValues:{verify:"",submit:null},validationSchema:de.d().shape({verify:de.f().required()}),onSubmit:function(e,n){n.setErrors,n.setStatus,n.setSubmitting;t(_.get(e,"verify"))},children:function(e){var t=e.errors,a=e.handleBlur,o=e.handleChange,i=e.handleSubmit,c=(e.isSubmitting,e.touched),s=e.values;return Object(b.jsxs)("form",{noValidate:!0,onSubmit:i,children:[Object(b.jsxs)(Z.a,{fullWidth:!0,error:Boolean(c.verify&&t.verify),sx:Object(m.a)({},r.typography.customInput),children:[Object(b.jsx)($.a,{htmlFor:"outlined-adornment-verify-forgot",children:"Verify Code"}),Object(b.jsx)(K.a,{id:"outlined-adornment-verify-forgot",type:"number",value:s.verify,name:"verify",onBlur:a,onChange:o,label:"Verify Code",placeholder:"xxxxxx"}),c.verify&&t.verify&&Object(b.jsx)(Q.a,{error:!0,id:"standard-weight-helper-text-verify-forgot",children:t.verify})]}),Object(b.jsx)(te.a,{sx:{mt:2},children:Object(b.jsx)(se.a,{children:Object(b.jsx)(w.a,{disableElevation:!0,disabled:n,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"primary",endIcon:Object(b.jsx)(O.a,{}),loading:n,loadingPosition:"end",children:"Next"})})})]})}})},je=function(e){var t=e.onSubmit,n=e.loading,r=Object(c.a)(),i=P.a.useState(!1),s=Object(h.a)(i,2),l=s[0],d=s[1],u=P.a.useState(0),j=Object(h.a)(u,2),f=j[0],v=j[1],O=P.a.useState(),p=Object(h.a)(O,2),x=p[0],S=p[1],L=function(){d(!l)},C=function(e){e.preventDefault()};return Object(b.jsx)(ne.a,{initialValues:{password:"",confirm_password:"",submit:null},validationSchema:de.d().shape({password:de.f().max(255).required("Password is required"),confirm_password:de.f().oneOf([de.e("password"),null],"Passwords must match")}),onSubmit:function(e){t(_.omit(e,"submit"))},children:function(e){var t=e.errors,i=e.handleBlur,c=e.handleChange,s=e.handleSubmit,d=(e.isSubmitting,e.touched),u=e.values;return Object(b.jsxs)("form",{noValidate:!0,onSubmit:s,children:[Object(b.jsxs)(Z.a,{fullWidth:!0,error:Boolean(d.password&&t.password),sx:Object(m.a)({},r.typography.customInput),children:[Object(b.jsx)($.a,{htmlFor:"outlined-adornment-password-register",children:"Password"}),Object(b.jsx)(K.a,{id:"outlined-adornment-password-register",type:l?"text":"password",value:u.password,name:"password",label:"Password",onBlur:i,onChange:function(e){c(e),function(e){var t=Object(le.b)(e);v(t),S(Object(le.a)(t))}(e.target.value)},endAdornment:Object(b.jsx)(X.a,{position:"end",children:Object(b.jsx)(ee.a,{"aria-label":"toggle password visibility",onClick:L,onMouseDown:C,edge:"end",size:"large",children:l?Object(b.jsx)(g.a,{}):Object(b.jsx)(y.a,{})})}),inputProps:{}}),d.password&&t.password&&Object(b.jsx)(Q.a,{error:!0,id:"standard-weight-helper-text-password-register",children:t.password})]}),0!==f&&Object(b.jsx)(Z.a,{fullWidth:!0,children:Object(b.jsx)(te.a,{sx:{mb:2},children:Object(b.jsxs)(a.a,{container:!0,spacing:2,alignItems:"center",children:[Object(b.jsx)(a.a,{item:!0,children:Object(b.jsx)(te.a,{style:{backgroundColor:null===x||void 0===x?void 0:x.color},sx:{width:85,height:8,borderRadius:"7px"}})}),Object(b.jsx)(a.a,{item:!0,children:Object(b.jsx)(o.a,{variant:"subtitle1",fontSize:"0.75rem",children:null===x||void 0===x?void 0:x.label})})]})})}),Object(b.jsxs)(Z.a,{fullWidth:!0,error:Boolean(d.confirm_password&&t.confirm_password),sx:Object(m.a)({},r.typography.customInput),children:[Object(b.jsx)($.a,{htmlFor:"outlined-adornment-confirm_password-register",children:"Confirm Password"}),Object(b.jsx)(K.a,{id:"outlined-adornment-confirm_password-register",type:l?"text":"password",value:u.confirm_password,name:"confirm_password",label:"Confirm Password",onBlur:i,onChange:function(e){c(e)},endAdornment:Object(b.jsx)(X.a,{position:"end",children:Object(b.jsx)(ee.a,{"aria-label":"toggle confirm_password visibility",onClick:L,onMouseDown:C,edge:"end",size:"large",children:l?Object(b.jsx)(g.a,{}):Object(b.jsx)(y.a,{})})}),inputProps:{}}),d.confirm_password&&t.confirm_password&&Object(b.jsx)(Q.a,{error:!0,id:"standard-weight-helper-text-confirm_password-register",children:t.confirm_password})]}),Object(b.jsx)(te.a,{sx:{mt:2},children:Object(b.jsx)(se.a,{children:Object(b.jsx)(w.a,{disableElevation:!0,disabled:n,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"primary",loading:n,loadingPosition:"end",children:"Submit"})})})]})}})},fe=function(e){Object.assign({},e),Object(c.a)(),Object(re.a)();var t=Object(ae.f)(),n=Object(I.useState)(0),r=Object(h.a)(n,2),a=r[0],o=r[1],i=Object(I.useState)(!1),l=Object(h.a)(i,2),d=l[0],u=l[1],j=Object(I.useState)(null),f=Object(h.a)(j,2),v=f[0],O=f[1],p=Object(I.useState)(0),g=Object(h.a)(p,2),x=g[0],y=g[1],w=Object(I.useState)(""),L=Object(h.a)(w,2),C=L[0],P=L[1],B=Object(s.a)(),_=B.resetPassword,E=B.forgotPassword,M=function(e){u(!0),O(null);try{E(e).then((function(t){u(!1),t.data.success?(oe.a.toast("success","Check mail for verify code","top"),y(t.data.verify_code),P(e),o((function(e){return e+1}))):O(Object(b.jsxs)(S.a,{severity:"error",className:"mb-4",children:[t.message," !"]}))})).catch((function(e){u(!1),O(Object(b.jsxs)(S.a,{severity:"error",className:"mb-4",children:[e.message," !"]}))}))}catch(t){u(!1),O(Object(b.jsxs)(S.a,{severity:"error",className:"mb-4",children:[t.message," !"]}))}},R=function(e){O(null),e.toString()===x.toString()?o((function(e){return e+1})):O(Object(b.jsx)(S.a,{severity:"error",className:"mb-4",children:"Verify not match !"}))},z=function(e){u(!0),O(null);try{_(Object(m.a)(Object(m.a)({},e),{},{verify_code:x,email:C})).then((function(e){u(!1),e.data.success?oe.a.showSuccess({toast:!1,showConfirmButton:!1,timer:3e3,timerProgressBar:!0,icon:"success",title:"Successfully",text:e.data.message,didOpen:function(e){e.addEventListener("mouseenter",ce.a.stopTimer),e.addEventListener("mouseleave",ce.a.resumeTimer)}}).then((function(e){t("/login")})):O(Object(b.jsxs)(S.a,{severity:"error",className:"mb-4",children:[e.message," !"]}))})).catch((function(e){u(!1),O(Object(b.jsxs)(S.a,{severity:"error",className:"mb-4",children:[e.message," !"]}))}))}catch(n){u(!1),O(Object(b.jsxs)(S.a,{severity:"error",className:"mb-4",children:[n.message," !"]}))}};return Object(b.jsxs)(b.Fragment,{children:[v,Object(b.jsx)(U,{activeStep:a}),Object(b.jsx)(b.Fragment,{children:function(e){switch(e){case 0:return Object(b.jsx)(ue,{loading:d,onSubmit:M});case 1:return Object(b.jsx)(be,{loading:d,onSubmit:R});case 2:return Object(b.jsx)(je,{loading:d,onSubmit:z});default:return Object(b.jsx)(b.Fragment,{})}}(a)})]})},me=n(515),he=n(516);t.default=function(){var e=Object(c.a)(),t=Object(s.a)().isLoggedIn,n=Object(r.a)(e.breakpoints.down("md"));return Object(b.jsx)(he.a,{children:Object(b.jsxs)(a.a,{container:!0,direction:"column",justifyContent:"center",sx:{minHeight:"100vh"},children:[Object(b.jsx)(a.a,{item:!0,xs:12,children:Object(b.jsx)(a.a,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:Object(b.jsx)(a.a,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:Object(b.jsx)(me.a,{children:Object(b.jsxs)(a.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[Object(b.jsx)(a.a,{item:!0,sx:{mb:3},children:Object(b.jsx)(l.b,{to:"#",children:Object(b.jsx)(f.a,{})})}),Object(b.jsx)(a.a,{item:!0,xs:12,children:Object(b.jsxs)(a.a,{container:!0,alignItems:"center",justifyContent:"center",textAlign:"center",spacing:2,children:[Object(b.jsx)(a.a,{item:!0,xs:12,children:Object(b.jsx)(o.a,{color:e.palette.primary.main,gutterBottom:!0,variant:n?"h3":"h2",children:"Forgot password?"})}),Object(b.jsx)(a.a,{item:!0,xs:12,children:Object(b.jsx)(o.a,{variant:"caption",fontSize:"16px",textAlign:"center",children:"Enter your email address below and we'll send you password reset link."})})]})}),Object(b.jsx)(a.a,{item:!0,xs:12,children:Object(b.jsx)(fe,{})}),Object(b.jsx)(a.a,{item:!0,xs:12,children:Object(b.jsx)(i.a,{})}),Object(b.jsx)(a.a,{item:!0,xs:12,children:Object(b.jsx)(a.a,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:Object(b.jsx)(o.a,{component:l.b,to:t?"/pages/login/login3":"/login",variant:"subtitle1",sx:{textDecoration:"none"},color:"secondary",children:"Already have an account?"})})})]})})})})}),Object(b.jsx)(a.a,{item:!0,xs:12,sx:{m:3,mt:1},children:Object(b.jsx)(j,{})})]})})}}}]);
//# sourceMappingURL=18.c2c508fc.chunk.js.map