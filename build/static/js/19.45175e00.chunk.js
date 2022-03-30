(this["webpackJsonpfe-react-ts"]=this["webpackJsonpfe-react-ts"]||[]).push([[19],{421:function(e,t,n){"use strict";var o=n(12),a=n(6),r=n(4),i=n.n(r),c=n(458),s=n.n(c),l=function(){var e=Object(o.a)(i.a.mark((function e(t){var n,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",s.a.fire({backdrop:!0,title:t.title||"Are you sure?",text:"You won't be able to revert this!",icon:"info",showCancelButton:!0,confirmButtonText:null!==(n=t.confirmButtonText)&&void 0!==n?n:"Ok",denyButtonText:null!==(o=t.denyButtonText)&&void 0!==o?o:"Cancel"}).then((function(e){var n,o,a;return e.isConfirmed?null===(o=t.onConfirm)||void 0===o?void 0:o.call(t):e.isDenied?null===(a=t.onDenied)||void 0===a?void 0:a.call(t):null===(n=t.onDenied)||void 0===n?void 0:n.call(t)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.a={toast:function(e,t,n){var o="#ffffff";switch(e){case"success":o="#5cb85c";break;case"error":o="#d9534f"}return s.a.fire({icon:e,title:t,toast:!0,position:n||"bottom-end",background:o,color:"white",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:function(e){e.addEventListener("mouseenter",s.a.stopTimer),e.addEventListener("mouseleave",s.a.resumeTimer)}})},showConfirm:l,showDeleteConfirm:function(e){return s.a.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((function(t){var n,o,a;return t.isConfirmed?null===(o=e.onConfirm)||void 0===o?void 0:o.call(e):t.isDenied?null===(a=e.onDenied)||void 0===a?void 0:a.call(e):null===(n=e.onDenied)||void 0===n?void 0:n.call(e)}))},showError:function(e){return s.a.fire(Object(a.a)(Object(a.a)({},e),{},{icon:"error"}))},showSuccess:function(e){return s.a.fire(Object(a.a)(Object(a.a)({},e),{},{icon:"success"}))},showLoading:function(){return s.a.fire({title:"Loading",timerProgressBar:!0})},showInfo:function(e){return s.a.fire(Object(a.a)(Object(a.a)({},e),{},{icon:"info"}))},showWarning:function(e){return s.a.fire(Object(a.a)(Object(a.a)({},e),{},{icon:"warning"}))}}},469:function(e,t,n){"use strict";var o=n(6),a=n(66),r=n(366),i=n(803),c=n(475),s=n(1),l=["formik","title","disabled","name"];t.a=function(e){var t=e.formik,n=e.title,u=e.disabled,d=void 0!==u&&u,b=e.name,f=void 0===b?"":b,p=Object(a.a)(e,l);return Object(s.jsxs)(r.a,{spacing:1,children:[Object(s.jsx)(i.a,{sx:{color:d?"#CCCCCC":"#4C4C4C",fontWeight:700},children:n}),Object(s.jsx)(c.a,Object(o.a)({fullWidth:!0,name:f,value:t.values[f],onBlur:t.handleBlur,error:t.touched[f]&&Boolean(t.errors[f]),helperText:t.touched[f]&&t.errors[f],onChange:t.handleChange,disabled:d},p))]})}},475:function(e,t,n){"use strict";var o=n(2),a=n(7),r=n(0),i=n(9),c=n(154),s=n(311),l=n(8),u=n(14),d=n(787),b=n(788),f=n(390),p=n(803),j=n(817),v=n(818),m=n(802),g=n(89),h=n(101);function O(e){return Object(g.a)("MuiTextField",e)}Object(h.a)("MuiTextField",["root"]);var x=n(1),S=["autoComplete","autoFocus","children","className","color","defaultValue","disabled","error","FormHelperTextProps","fullWidth","helperText","id","InputLabelProps","inputProps","InputProps","inputRef","label","maxRows","minRows","multiline","name","onBlur","onChange","onFocus","placeholder","required","rows","select","SelectProps","type","value","variant"],w={standard:d.a,filled:b.a,outlined:f.a},_=Object(l.a)(j.a,{name:"MuiTextField",slot:"Root",overridesResolver:function(e,t){return t.root}})({}),P=r.forwardRef((function(e,t){var n=Object(u.a)({props:e,name:"MuiTextField"}),r=n.autoComplete,l=n.autoFocus,d=void 0!==l&&l,b=n.children,f=n.className,j=n.color,g=void 0===j?"primary":j,h=n.defaultValue,P=n.disabled,y=void 0!==P&&P,C=n.error,I=void 0!==C&&C,k=n.FormHelperTextProps,B=n.fullWidth,L=void 0!==B&&B,E=n.helperText,F=n.id,R=n.InputLabelProps,q=n.inputProps,T=n.InputProps,M=n.inputRef,N=n.label,W=n.maxRows,G=n.minRows,A=n.multiline,D=void 0!==A&&A,V=n.name,Q=n.onBlur,H=n.onChange,z=n.onFocus,U=n.placeholder,Y=n.required,J=void 0!==Y&&Y,K=n.rows,X=n.select,$=void 0!==X&&X,Z=n.SelectProps,ee=n.type,te=n.value,ne=n.variant,oe=void 0===ne?"outlined":ne,ae=Object(a.a)(n,S),re=Object(o.a)({},n,{autoFocus:d,color:g,disabled:y,error:I,fullWidth:L,multiline:D,required:J,select:$,variant:oe}),ie=function(e){var t=e.classes;return Object(c.a)({root:["root"]},O,t)}(re);var ce={};"outlined"===oe&&(R&&"undefined"!==typeof R.shrink&&(ce.notched=R.shrink),ce.label=N),$&&(Z&&Z.native||(ce.id=void 0),ce["aria-describedby"]=void 0);var se=Object(s.a)(F),le=E&&se?"".concat(se,"-helper-text"):void 0,ue=N&&se?"".concat(se,"-label"):void 0,de=w[oe],be=Object(x.jsx)(de,Object(o.a)({"aria-describedby":le,autoComplete:r,autoFocus:d,defaultValue:h,fullWidth:L,multiline:D,name:V,rows:K,maxRows:W,minRows:G,type:ee,value:te,id:se,inputRef:M,onBlur:Q,onChange:H,onFocus:z,placeholder:U,inputProps:q},ce,T));return Object(x.jsxs)(_,Object(o.a)({className:Object(i.a)(ie.root,f),disabled:y,error:I,fullWidth:L,ref:t,required:J,color:g,variant:oe,ownerState:re},ae,{children:[null!=N&&""!==N&&Object(x.jsx)(p.a,Object(o.a)({htmlFor:se,id:ue},R,{children:N})),$?Object(x.jsx)(m.a,Object(o.a)({"aria-describedby":le,id:se,labelId:ue,value:te,input:be},Z,{children:b})):be,E&&Object(x.jsx)(v.a,Object(o.a)({id:le},k,{children:E}))]}))}));t.a=P},489:function(e,t,n){"use strict";var o=n(5),a=n(7),r=n(2),i=n(0),c=n(10),s=n(174),l=n(154),u=n(8),d=n(14),b=n(385),f=n(321),p=n(89),j=n(101);function v(e){return Object(p.a)("MuiLoadingButton",e)}var m=Object(j.a)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),g=n(1),h=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],O=Object(u.a)(b.a,{shouldForwardProp:function(e){return function(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e&&"classes"!==e}(e)||"classes"===e},name:"MuiLoadingButton",slot:"Root",overridesResolver:function(e,t){return[t.root,t.startIconLoadingStart&&Object(o.a)({},"& .".concat(m.startIconLoadingStart),t.startIconLoadingStart),t.endIconLoadingEnd&&Object(o.a)({},"& .".concat(m.endIconLoadingEnd),t.endIconLoadingEnd)]}})((function(e){var t=e.ownerState,n=e.theme;return Object(r.a)(Object(o.a)({},"& .".concat(m.startIconLoadingStart,", & .").concat(m.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0}),"center"===t.loadingPosition&&Object(o.a)({transition:n.transitions.create(["background-color","box-shadow","border-color"],{duration:n.transitions.duration.short})},"&.".concat(m.loading),{color:"transparent"}),"start"===t.loadingPosition&&t.fullWidth&&Object(o.a)({},"& .".concat(m.startIconLoadingStart,", & .").concat(m.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginRight:-8}),"end"===t.loadingPosition&&t.fullWidth&&Object(o.a)({},"& .".concat(m.startIconLoadingStart,", & .").concat(m.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginLeft:-8}))})),x=Object(u.a)("div",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:function(e,t){var n=e.ownerState;return[t.loadingIndicator,t["loadingIndicator".concat(Object(c.a)(n.loadingPosition))]]}})((function(e){var t=e.theme,n=e.ownerState;return Object(r.a)({position:"absolute",visibility:"visible",display:"flex"},"start"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{left:14},"start"===n.loadingPosition&&"text"===n.variant&&{left:6},"center"===n.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:t.palette.action.disabled},"end"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{right:14},"end"===n.loadingPosition&&"text"===n.variant&&{right:6},"start"===n.loadingPosition&&n.fullWidth&&{position:"relative",left:-10},"end"===n.loadingPosition&&n.fullWidth&&{position:"relative",right:-10})})),S=i.forwardRef((function(e,t){var n=Object(d.a)({props:e,name:"MuiLoadingButton"}),o=n.children,u=n.disabled,b=void 0!==u&&u,p=n.id,j=n.loading,m=void 0!==j&&j,S=n.loadingIndicator,w=n.loadingPosition,_=void 0===w?"center":w,P=n.variant,y=void 0===P?"text":P,C=Object(a.a)(n,h),I=Object(s.a)(p),k=null!=S?S:Object(g.jsx)(f.a,{"aria-labelledby":I,color:"inherit",size:16}),B=Object(r.a)({},n,{disabled:b,loading:m,loadingIndicator:k,loadingPosition:_,variant:y}),L=function(e){var t=e.loading,n=e.loadingPosition,o=e.classes,a={root:["root",t&&"loading"],startIcon:[t&&"startIconLoading".concat(Object(c.a)(n))],endIcon:[t&&"endIconLoading".concat(Object(c.a)(n))],loadingIndicator:["loadingIndicator",t&&"loadingIndicator".concat(Object(c.a)(n))]},i=Object(l.a)(a,v,o);return Object(r.a)({},o,i)}(B);return Object(g.jsx)(O,Object(r.a)({disabled:b||m,id:I,ref:t},C,{variant:y,classes:L,ownerState:B,children:"end"===B.loadingPosition?Object(g.jsxs)(i.Fragment,{children:[o,m&&Object(g.jsx)(x,{className:L.loadingIndicator,ownerState:B,children:k})]}):Object(g.jsxs)(i.Fragment,{children:[m&&Object(g.jsx)(x,{className:L.loadingIndicator,ownerState:B,children:k}),o]})}))}));t.a=S},571:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var o=n(572),a=n.n(o),r=n(573),i=n.n(r),c=n(489),s=n(385),l=n(34),u=(n(0),n(22)),d=n(119),b=n(1);function f(e){var t=e.onBack,n=e.loading,o=Object(l.a)(),r=Object(u.f)();return Object(b.jsxs)(d.a,{boxShadow:!0,shadow:"0px 4px 4px rgba(0, 0, 0, 0.05)",sx:{boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.05)",border:"1px solid #E5E5E5 !important",mb:3},contentSX:{padding:"8px !important"},children:[Object(b.jsx)(s.a,{disableElevation:!0,type:"button",variant:"contained",startIcon:Object(b.jsx)(a.a,{}),onClick:function(){t?null===t||void 0===t||t():r(-1)},sx:{mr:2,bgcolor:o.palette.grey.A200,color:"#000"},children:"Back"}),Object(b.jsx)(c.a,{disableElevation:!0,disabled:n,type:"submit",variant:"contained",color:"primary",startIcon:Object(b.jsx)(i.a,{}),loading:n,loadingPosition:"start",children:"Save"})]})}},572:function(e,t,n){"use strict";var o=n(77);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n(90)),r=n(1),i=(0,a.default)((0,r.jsx)("path",{d:"M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"}),"KeyboardBackspace");t.default=i},573:function(e,t,n){"use strict";var o=n(77);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n(90)),r=n(1),i=(0,a.default)((0,r.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"}),"Save");t.default=i},575:function(e,t,n){"use strict";var o=n(23),a=n(24),r=n(169),i=n(170),c=n(172),s=n(11),l=function(e){Object(r.a)(n,e);var t=Object(i.a)(n);function n(){return Object(o.a)(this,n),t.call(this,"/v1/users")}return Object(a.a)(n,[{key:"getGroups",value:function(e){return s.a.get("".concat(this.apiName,"/group?parent_id=").concat(e))}},{key:"getRoles",value:function(){return s.a.get("".concat(this.apiName,"/role"))}}]),n}(c.a);t.a=new l},578:function(e,t,n){"use strict";var o=n(6),a=n(803),r=n(817),i=n(802),c=n(815),s=n(818),l=n(34),u=n(0),d=n(3);function b(e,t,n){void 0===t&&(t=[]),void 0===n&&(n={loading:!1});var o=Object(u.useRef)(0),a=function(){var e=Object(u.useRef)(!1),t=Object(u.useCallback)((function(){return e.current}),[]);return Object(u.useEffect)((function(){return e.current=!0,function(){e.current=!1}}),[]),t}(),r=Object(u.useState)(n),i=r[0],c=r[1],s=Object(u.useCallback)((function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];var r=++o.current;return i.loading||c((function(e){return Object(d.a)(Object(d.a)({},e),{loading:!0})})),e.apply(void 0,t).then((function(e){return a()&&r===o.current&&c({value:e,loading:!1}),e}),(function(e){return a()&&r===o.current&&c({error:e,loading:!1}),e}))}),t);return[i,s]}var f=n(11),p=n(1);t.a=function(e){var t=e.formik,n=t.errors,d=(t.handleBlur,t.handleChange),j=t.touched,v=(t.values,t.setValues,e.label),m=e.name,g=e.required,h=e.selectProps,O=e.dataSource,x=e.api,S=e.transformFn,w=e.renderItem,P=e.handleSelect,y=Object(l.a)(),C=function(e,t){void 0===t&&(t=[]);var n=b(e,t,{loading:!0}),o=n[0],a=n[1];return Object(u.useEffect)((function(){a()}),[a]),o}((function(){return x&&!_.some(O)?f.a.get(x).then((function(e){return _.isFunction(S)?_.map(e.data,S):e.data})):Promise.resolve(O)}),[x,O]),I=C.value;C.loading;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(a.a,{sx:{color:null!==h&&void 0!==h&&h.disabled?"#CCCCCC":"#4C4C4C",fontWeight:"700"},required:g,htmlFor:m,children:v}),Object(p.jsxs)(r.a,{fullWidth:!0,error:Boolean(j["".concat(m)]&&n["".concat(m)]),sx:Object(o.a)({},y.typography.customInput),children:[Object(p.jsxs)(i.a,Object(o.a)(Object(o.a)({},Object(o.a)(Object(o.a)({},h),{},{onSelectValue:{}})),{},{value:null===h||void 0===h?void 0:h.value,name:m,onChange:function(e){return P?null===P||void 0===P?void 0:P(_.find(I,["id",e.target.value])):d(e)},onBlur:function(e){return P?null===P||void 0===P?void 0:P(_.find(I,["id",e.target.value])):d(e)},defaultValue:"",children:[!(null!==h&&void 0!==h&&h.notAllowSelectNull)&&Object(p.jsx)(c.a,{value:null,children:Object(p.jsx)("em",{children:"None"})}),_.isFunction(w)?_.map(I,w):_.map(I,(function(e,t){return Object(p.jsx)(c.a,{value:e.id,children:e.name},t)}))]})),j["".concat(m)]&&n["".concat(m)]&&Object(p.jsx)(s.a,{error:!0,id:"".concat(m,"--error"),children:n["".concat(m)]})]})]})}},812:function(e,t,n){"use strict";n.r(t);var o=n(12),a=n(13),r=n(4),i=n.n(r),c=n(57),s=n(78),l=n(0),u=n.n(l),d=n(104),b=n(22),f=n(575),p=n(421),j=n(6),v=n(382),m=n(118),g=n(34),h=n(578),O=n(469),x=n(571),S=n(442),w=n(119),P=n(443),y=n(1),C={fullname:"",email:"",phone:"",position:"Staff",group_id:"0",sub_group_id:"0",role:"",password:""},I=function(e){var t=e.onSubmit,n=e.dataInitial,o=e.isLoading,a=e.isEdit,r=e.groups,i=e.roles,c=e.subGroups,s=e.onChangeGroup,u=e.isPartner,d=(e.onChangePosition,Object(g.a)()),b=Object(S.b)({initialValues:C,validationSchema:P.d({fullname:P.f().required("Partner is required"),email:P.f().email("Must be a valid email").max(255).required("Email is required"),phone:P.f().min(10,"Phone must be 10 characters").max(10,"Phone must be 10 characters").trim().required("Phone is required").matches(/^\d+$/,"Phone is not in correct format"),position:P.f().required("Position is required"),group_id:P.f().required("Group is required"),sub_group_id:P.f().required("Sub-Group is required"),role:P.f().required("Role is required")}),onSubmit:t,onReset:function(e){}});return Object(l.useEffect)((function(){n&&b.setValues(Object(j.a)(Object(j.a)({},b.values),n))}),[n]),Object(y.jsx)(y.Fragment,{children:Boolean(o)?Object(y.jsx)("div",{children:"Loading"}):Object(y.jsxs)("form",{onSubmit:function(e){b.handleSubmit(e),console.log(b.errors)},children:[Object(y.jsx)(x.a,{loading:b.isSubmitting}),Object(y.jsx)(w.a,{boxShadow:!0,shadow:"0px 4px 4px rgba(0, 0, 0, 0.05)",sx:{boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.05)",border:"1px solid #E5E5E5 !important",mb:3},children:Object(y.jsxs)(v.a,{container:!0,spacing:2,children:[Object(y.jsx)(v.a,{item:!0,xs:12,children:Object(y.jsxs)(m.a,{variant:"h3",sx:{color:d.palette.primary.main},children:[Boolean(a)?"User Details - Edit":"Add New User"," ",Boolean(u)?" Of Partner":""]})}),Object(y.jsx)(v.a,{item:!0,xs:12,children:Object(y.jsxs)(v.a,{container:!0,spacing:2,children:[Object(y.jsx)(v.a,{item:!0,xs:12,md:4,children:Object(y.jsx)(O.a,{formik:b,title:"Full Name",name:"fullname"})}),Object(y.jsx)(v.a,{item:!0,xs:12,md:4,children:Object(y.jsx)(O.a,{formik:b,title:"Email",name:"email"})}),Object(y.jsx)(v.a,{item:!0,xs:12,md:4,children:Object(y.jsx)(O.a,{formik:b,title:"Phone",name:"phone"})}),!Boolean(u)&&Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(v.a,{item:!0,xs:12,md:!0,children:Object(y.jsx)(h.a,{formik:b,label:"Position",name:"position",dataSource:[{id:"Manager",name:"Manager"},{id:"Staff",name:"Staff"}],selectProps:{notAllowSelectNull:!0,value:b.values.position}})}),Object(y.jsx)(v.a,{item:!0,xs:12,md:!0,children:Object(y.jsx)(h.a,{formik:b,label:"Role",name:"role",dataSource:i,selectProps:{notAllowSelectNull:!0,value:b.values.role}})}),Object(y.jsx)(v.a,{item:!0,xs:12,md:!0,children:Object(y.jsx)(h.a,{formik:b,label:"Group",name:"group_id",dataSource:r,handleSelect:function(e){e&&(b.setFieldValue("group_id",e.id),b.setFieldValue("sub_group_id",0),s(e))},selectProps:{notAllowSelectNull:!0,value:b.values.group_id}})}),Boolean("Manager"!==b.values.position)&&Object(y.jsx)(v.a,{item:!0,xs:12,md:!0,children:Object(y.jsx)(h.a,{formik:b,label:"Sub-Group",name:"sub_group_id",dataSource:c,selectProps:{notAllowSelectNull:!0,value:b.values.sub_group_id}})})]})]})})]})})]})})},k=u.a.memo(I),B=function(e){Object.assign({},e),Object(b.f)();var t=Object(b.g)().id,n=Object(l.useState)(!1),r=Object(a.a)(n,2),u=r[0],j=r[1],v=Object(l.useState)(null),m=Object(a.a)(v,2),g=m[0],h=m[1],O=Object(s.a)().user,x=(null===O||void 0===O?void 0:O.role)===c.a.PARTNER,S=Object(d.useQuery)(["qGroupsQuery"],(function(){return f.a.getGroups(0)}),{keepPreviousData:!0,onError:function(e){p.a.toast("error",(null===e||void 0===e?void 0:e.message)||"Something went error !")},onSuccess:function(e){}}),w=Object(d.useQuery)(["qSubGroupsQuery",g],(function(){return g?f.a.getGroups(g):null}),{keepPreviousData:!0,onError:function(e){p.a.toast("error",(null===e||void 0===e?void 0:e.message)||"Something went error !")},onSuccess:function(e){}}),P=Object(d.useQuery)(["qRolesQuery"],(function(){return f.a.getRoles()}),{keepPreviousData:!0,onError:function(e){p.a.toast("error",(null===e||void 0===e?void 0:e.message)||"Something went error !")},onSuccess:function(e){}}),C=Object(d.useQuery)(["detail_data",t],(function(){return t?(j(!0),f.a.getById(t)):(j(!1),null)}),{keepPreviousData:!0,onError:function(e){p.a.toast("error",(null===e||void 0===e?void 0:e.message)||"Something went error !")},onSuccess:function(e){h(_.get(e,"data.data.group_id"))}}),I=function(){var e=Object(o.a)(i.a.mark((function e(t,n){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{u||((a=_.pick(t,["fullname","email","phone","position","group_id","sub_group_id","role","password","partner_id","user_type"])).sub_group_id="Manager"===a.position?"0":a.sub_group_id,f.a.insert(a).then((function(e){p.a.toast("success","Created new User"),n.resetForm()})).catch((function(e){p.a.toast("error","".concat(null===e||void 0===e?void 0:e.message," ").concat(_.map(e.details,(function(e){return"\n<i> - ".concat(e,"</i>")})))||"Something went error !")}))),u&&(r=_.pick(t,["id","status","fullname","email","phone","position","group_id","sub_group_id","role","password"]),p.a.showConfirm({onConfirm:function(){var e=Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:f.a.updatePut(r).then((function(e){p.a.toast("success","Updated User"),C.refetch()})).catch((function(e){p.a.toast("error","".concat(null===e||void 0===e?void 0:e.message," ").concat(_.map(e.details,(function(e){return"\n<i> - ".concat(e,"</i>")})))||"Something went error !")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()})),n.setStatus({success:!0}),n.setSubmitting(!1)}catch(c){console.error(c),n.setStatus({success:!1}),n.setSubmitting(!1)}case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object(y.jsx)(k,{onSubmit:I,dataInitial:_.get(C,"data.data.data",x?{status:0,created_by:null===O||void 0===O?void 0:O.id,partner_id:null===O||void 0===O?void 0:O.partner_id,user_type:2,role:c.a.PARTNER_STAFF}:{status:0,created_by:null===O||void 0===O?void 0:O.id,partner_id:null===O||void 0===O?void 0:O.partner_id,user_type:1}),onChangeGroup:function(e){h(e.id)},groups:_.get(S,"data.data.data",[]),subGroups:_.get(w,"data.data.data",[]),roles:_.map(_.get(P,"data.data.data",[]),(function(e){return{id:e.code,name:e.name}})),isLoading:C.isLoading,isEdit:u,isPartner:x})};t.default=u.a.memo(B)}}]);
//# sourceMappingURL=19.45175e00.chunk.js.map