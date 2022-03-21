(this["webpackJsonpberry-material-react-ts"]=this["webpackJsonpberry-material-react-ts"]||[]).push([[23],{414:function(e,t,n){"use strict";var a=n(173);t.a={showToast:function(e,t){Object(a.b)(t,{type:e})}}},425:function(e,t,n){"use strict";var a=n(6),r=n(64),i=n(362),s=n(772),c=n(497),o=n(1),u=["formik","title","disabled","name"];t.a=function(e){var t=e.formik,n=e.title,d=e.disabled,l=void 0!==d&&d,m=e.name,b=void 0===m?"":m,j=Object(r.a)(e,u);return Object(o.jsxs)(i.a,{spacing:1,children:[Object(o.jsx)(s.a,{sx:{color:l?"#CCCCCC":"#4C4C4C",fontWeight:700},children:n}),Object(o.jsx)(c.a,Object(a.a)({fullWidth:!0,name:b,value:t.values[b],onBlur:t.handleBlur,error:t.touched[b]&&Boolean(t.errors[b]),helperText:t.touched[b]&&t.errors[b],onChange:t.handleChange,disabled:l},j))]})}},433:function(e,t,n){"use strict";var a=n(23),r=n(24),i=n(167),s=n(169),c=n(172),o=n(11),u=function(e){Object(i.a)(n,e);var t=Object(s.a)(n);function n(){var e;return Object(r.a)(this,n),(e=t.call(this,"/v1/tickets")).downloadTicket=function(e){return o.a.post("/v1/tickets/exportExcel",{ids:e},{responseType:"blob"})},e.deleteTicket=function(e){return o.a.post("/v1/tickets/deleteTickets",{ids:e})},e.uploadTicket=function(e){var t=new FormData;return t.append("file",e),o.a.post("/v1/tickets/import",t,{headers:{"Content-Type":"multipart/form-data"}})},e.addDescription=function(e){return o.a.post("v1/tickets/descriptions",e)},e.addAttachment=function(e){return o.a.post("v1/tickets/attachments",e,{headers:{"Content-Type":"multipart/form-data"}})},e.createTicket=function(e){return o.a.post("v1/tickets",e,{headers:{"Content-Type":"multipart/form-data"}})},e.editTicket=function(e,t){return o.a.post("v1/tickets/draft/".concat(t),e,{headers:{"Content-Type":"multipart/form-data"}})},e.assignTo=function(e){return o.a.post("v1/tickets/assigneesandsupporters",e)},e}return Object(a.a)(n)}(c.a);t.a=new u},489:function(e,t,n){"use strict";var a=n(362),r=n(772),i=n(770),s=n(781),c=n(784),o=n(119),u=n(1);t.a=function(e){var t=e.formik,n=e.title,d=void 0===n?"":n,l=e.data,m=void 0===l?{}:l,b=e.name,j=void 0===b?"":b,h=e.disabled;return Object(u.jsxs)(a.a,{spacing:1,children:[Object(u.jsx)(r.a,{sx:{color:h?"#CCCCCC":"#4C4C4C",fontWeight:700},children:d}),Object(u.jsx)(i.a,{id:j,name:j,defaultValue:t.values[j],value:0===t.values[j]?"":t.values[j],onChange:t.handleChange,disabled:h,children:Object(o.map)(m,(function(e,t){return Object(u.jsx)(s.a,{value:_.toNumber(t),children:e},t)}))}),t.errors[j]&&Object(u.jsx)(c.a,{error:!0,children:t.errors[j]})]})}},559:function(e,t,n){"use strict";var a=n(6),r=n(28),i=n(545),s=n(558),c=n(553),o=n(377),u=n(362),d=n(497),l=n(116),m=n(390),b=n(381),j=n(8),h=n(352),p=n(21),f=n(152),x=n(426),O=n(0),v=n(457),y=n(58),g=n(117),k=n(64),C=n(772),q=n(1),T=["children","horizontal"],R=Object(j.a)((function(e){return Object(q.jsx)(C.a,Object(a.a)({},e))}),{shouldForwardProp:function(e){return"horizontal"!==e}})((function(e){var t=e.theme,n=e.horizontal;return{color:t.palette.text.primary,fontWeight:500,marginBottom:n?0:8}})),w=function(e){var t=e.children,n=e.horizontal,r=Object(k.a)(e,T);return Object(q.jsx)(R,Object(a.a)(Object(a.a)({horizontal:n},r),{},{children:t}))};w.defaultProps={horizontal:!1};var D=w,N=n(420),E=n(489),F=n(425),I=N.c({transaction_type:N.e().required("Transaction Type is Required"),issue_type:N.e().required("Issue Type is Required"),sub_issue_type:N.b().when("issue_type",{is:3,then:N.b().required("Sub Issue Type is Required")}),right_amount:N.e().when("issue_type",{is:2,then:N.b().typeError("Right Amount must be a number").required("Right Amount Number is Required")}),requested_by:N.e().required("Requested By is Required"),ref_number:N.e().required("Ref Number is Required"),transaction_date:N.e().required("Transaction Date is Required"),transaction_amount:N.b().typeError("Transaction Amount must be a number").required("Transaction Amount is Required"),contract_number:N.e().required("Contract Number is Required"),wrong_transaction:N.e().required("Wrong Transaction is Required"),right_contract_number:N.e().required("Right Contract Number is Required"),right_product_type:N.b().when("issue_type",{is:3,then:N.b().required("Right Product Type is Required")}),requester_national_id:N.e().min(12,"Requested's Nation ID should be of minimum 12 characters").max(12,"Requested's Nation ID should be of minimum 12 characters").required("Requested's Nation ID is Required").typeError("Requested's Nation ID must be a number"),requester_phone:N.e().min(10,"Phone number should be of minimum 10 characters").max(10,"Phone number should be of minimum 10 characters").required("Requester's Phone Number is Required").typeError("Requester's Phone Number must be a number")}),P={transaction_type:1,issue_type:1,sub_issue_type:0,requested_by:1,ref_number:"",transaction_date:new Date,transaction_amount:"",contract_number:"",wrong_transaction:"",right_contract_number:"",right_amount:"",right_product_type:0,requester_national_id:"",requester_phone:"",status:null,description:"",attachments:[]},S=(t.a=function(e){var t,n=e.onSubmit,j=e.onCancel,h=e.data,k=Object(x.b)({initialValues:P,validationSchema:I,onSubmit:function(e){return n(e)}});Object(O.useEffect)((function(){if(h){var e=_.pickBy(h,(function(e,t){return _.keys(P).includes(t)}));k.setValues(e)}}),[h]),Object(O.useEffect)((function(){3!==k.values.issue_type&&(k.setFieldValue("sub_issue_type",0),k.setFieldValue("right_product_type",0)),2!==k.values.issue_type&&k.setFieldValue("right_amount","")}),[k.values.issue_type]);var C=function(e){var t=e.status;k.isValid&&k.setFieldValue("status",t)},T=Object(v.a)({onDrop:function(e){k.setFieldValue("attachments",[].concat(Object(r.a)(e),Object(r.a)(k.values.attachments)))},maxFiles:5}),R=T.getRootProps,w=T.getInputProps;return Object(q.jsx)(g.a,{title:_.isEmpty(h)?"Create Ticket":"Edit Ticket",children:Object(q.jsx)("form",{onSubmit:k.handleSubmit,children:Object(q.jsxs)(o.a,{container:!0,spacing:y.b,children:[Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(E.a,{name:"transaction_type",formik:k,title:"Transaction Type",data:f.k})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(E.a,{name:"issue_type",formik:k,title:"Issue Type",data:f.e})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(E.a,{disabled:3!==k.values.issue_type,name:"sub_issue_type",formik:k,title:"Sub Issue Type",data:f.j})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(E.a,{name:"requested_by",formik:k,title:"Requested By",data:f.i})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(F.a,{formik:k,title:"REF Number",name:"ref_number"})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsxs)(u.a,{children:[Object(q.jsx)(D,{sx:{color:"#4C4C4C",fontWeight:"bold"},children:"Transaction Date"}),Object(q.jsx)(i.b,{dateAdapter:c.a,children:Object(q.jsx)(s.a,{inputFormat:"dd/MM/yyyy",renderInput:function(e){return Object(q.jsx)(d.a,Object(a.a)({fullWidth:!0},e))},value:k.values.transaction_date,onChange:function(e){return k.setFieldValue("transaction_date",e)}})})]})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(F.a,{formik:k,title:"Transaction Amount",name:"transaction_amount"})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(F.a,{formik:k,title:"Contract Number",name:"contract_number"})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(F.a,{formik:k,title:"Product Type of Wrong Transaction",name:"wrong_transaction"})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(F.a,{formik:k,title:"Right Contract Number",name:"right_contract_number"})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(F.a,{formik:k,title:"Right Amount",name:"right_amount",disabled:2!==k.values.issue_type})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(E.a,{disabled:3!==k.values.issue_type,name:"right_product_type",formik:k,title:"Product Type of Right Contract #",data:f.g})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(F.a,{formik:k,title:"Requester's National ID",name:"requester_national_id"})}),Object(q.jsx)(o.a,{item:!0,xs:12,md:3,children:Object(q.jsx)(F.a,{formik:k,title:"Requester's Phone Number",name:"requester_phone"})}),Object(q.jsx)(o.a,{item:!0,xs:12,children:Object(q.jsx)(F.a,{formik:k,title:"Description",multiline:!0,rows:4,placeholder:"Enter Description",name:"description"})}),Object(q.jsxs)(o.a,{item:!0,xs:12,children:[Object(q.jsx)(S,Object(a.a)(Object(a.a)({sx:{padding:3,backgroundColor:"rgba(39, 174, 96, .15)",cursor:"pointer"}},R({className:"dropzone"})),{},{children:Object(q.jsxs)(u.a,{direction:"row",justifyContent:"center",alignItems:"center",spacing:1,children:[Object(q.jsx)(V,Object(a.a)({id:"contained-button-file"},w())),Object(q.jsx)(p.v,{}),Object(q.jsx)(l.a,{children:"Browse or Drop file here"})]})})),null===(t=k.values.attachments)||void 0===t?void 0:t.map((function(e,t){return Object(q.jsxs)(u.a,{direction:"row",alignItems:"center",children:[Object(q.jsxs)("li",{style:{margin:"8px 4px"},children:[e.path||e.name," - ",e.size," bytes"]}),Object(q.jsx)(m.a,{onClick:function(){return function(e){var t=k.values.attachments.filter((function(t,n){return n!==e}));k.setFieldValue("attachments",t)}(t)},children:Object(q.jsx)(p.z,{})})]},t)}))]}),Object(q.jsxs)(o.a,{item:!0,sx:{display:"flex",justifyContent:"flex-end"},xs:12,children:[Object(q.jsx)(b.a,{variant:"contained",sx:{background:"#999999"},onClick:j,children:"Cancel"}),Object(q.jsx)(b.a,{variant:"contained",sx:{marginX:1,background:"#2F80ED"},type:"submit",onClick:function(){return C({status:0})},children:"Save as Draft"}),Object(q.jsx)(b.a,{sx:{background:"#27AE60"},variant:"contained",type:"submit",onClick:function(){return C({status:1})},children:"Submit"})]})]})})})},Object(j.a)(h.a)({backgroundImage:"url(\n        \"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='14' ry='14' stroke='%23CCCCCCFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e\"\n        )",borderRadius:14})),V=Object(j.a)("input")({display:"none"})},759:function(e,t,n){"use strict";n.r(t);var a=n(103),r=n(22),i=n(433),s=n(414),c=n(559),o=n(1);t.default=function(){var e,t,n=Object(r.g)().ticket_id,u=Object(r.f)(),d=Object(a.useMutation)((function(e){return i.a.editTicket(e,n)}),{onSuccess:function(e){console.log(e),s.a.showToast("success","Upload Success!"),u(-1)},onError:function(e){s.a.showToast("error",e.message)}}),l=Object(a.useQuery)("qTicketDetail_".concat(n),(function(){return i.a.getById(n)}),{keepPreviousData:!1});return Object(o.jsx)(c.a,{onSubmit:function(e){var t=e.attachments,n=new FormData,a=[];t.forEach((function(e){_.has(e,"id")?a.push(e.id):n.append("attachments[]",e)})),n.append("attachmentIds[]",a),_.forEach(_.omit(e,"attachments"),(function(e,t){return n.append("".concat(t),"transaction_date"===t?moment(e).format("DD/MM/YYYY"):e)})),n.append("action",0),d.mutate(n)},onCancel:function(){return u(-1)},data:null===(e=l.data)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.data})}}}]);
//# sourceMappingURL=23.a6a69d31.chunk.js.map