(this["webpackJsonpberry-material-react-ts"]=this["webpackJsonpberry-material-react-ts"]||[]).push([[17],{462:function(e,t,r){"use strict";var i=r(362),a=r(377),s=r(374),n=r(655),o=r(403),c=r(173),d=(r(0),r(1));t.a=function(e){var t=e.formik,r=e.title,u=void 0===r?"":r,l=e.data,m=void 0===l?[]:l;return Object(d.jsxs)(i.a,{children:[Object(d.jsx)(a.a,{sx:{color:"#4C4C4C",fontWeight:"bold",marginBottom:1},children:u}),Object(d.jsx)(s.a,{style:{height:36,fontSize:12,color:"red !important"},id:"orderStatus",name:"orderStatus",defaultValue:t.values.orderStatus,value:t.values.orderStatus,onChange:t.handleChange,children:Object(c.map)(m,(function(e,t){return Object(d.jsx)(n.a,{value:e,children:e},t)}))}),t.errors.orderStatus&&Object(d.jsx)(o.a,{error:!0,children:t.errors.orderStatus})]})}},463:function(e,t,r){"use strict";var i=r(377),a=(r(0),r(1));t.a=function(e){e.formik;var t=e.title;return Object(a.jsxs)("div",{children:[Object(a.jsx)(i.a,{sx:{color:"#4C4C4C",fontWeight:"bold",marginBottom:1},required:!0,children:t}),Object(a.jsx)("input",{style:{width:"100%",height:36,borderRadius:8,border:"1px solid",borderColor:"#e5e5e5",padding:"4px 12px",marginTop:4}})]})}},698:function(e,t,r){"use strict";r.r(t);var i=r(7),a=(r(24),r(15)),s=r(0),n=r.n(s),o=r(689),c=r(380),d=r(362),u=r(401),l=r(382),m=r(306),j=r(681),b=r(695),x=r(50),h=r(86),O=r(9),f=r(377),p=r(1),A=["children","horizontal"],g=Object(O.a)((function(e){return Object(p.jsx)(f.a,Object(i.a)({},e))}),{shouldForwardProp:function(e){return"horizontal"!==e}})((function(e){var t=e.theme,r=e.horizontal;return{color:t.palette.text.primary,fontWeight:500,marginBottom:r?0:8}})),v=function(e){var t=e.children,r=e.horizontal,a=Object(h.a)(e,A);return Object(p.jsx)(g,Object(i.a)(Object(i.a)({horizontal:r},a),{},{children:t}))};v.defaultProps={horizontal:!1};var C=v,S=r(104),y=r(419),k=r(418),q=r(462),T=r(463),B=["Repayment","Disbursement"],R=["Cancel transaction","Adjust Amount","Adjust Contract Number","System Issue"],N=["By Teller\u2019s mistake","By Customer\u2019s request","By Banca\u2019s team"],D=y.b({invoiceNumber:y.c().required("Invoice Number is Required"),customerName:y.c().required("Customer Name is Required"),customerEmail:y.c().email("Enter a valid email").required("Customer Email is Required"),customerPhone:y.c().min(10,"Phone number should be of minimum 10 characters").required("Customer Phone is Required"),customerAddress:y.c().required("Customer Address is Required"),orderStatus:y.c().required("Order Status is required")});t.default=function(){var e=Object(k.b)({initialValues:{invoiceNumber:"",customerName:"",customerEmail:"",customerPhone:"",customerAddress:"",orderStatus:"pending"},validationSchema:D,onSubmit:function(e){e&&y(!0)}}),t=Object(s.useState)({subTotal:0,appliedTaxValue:.1,appliedDiscountValue:.05,taxesAmount:0,discountAmount:0,totalAmount:0}),r=Object(a.a)(t,2),h=(r[0],r[1]),O=Object(s.useState)([{id:1,product:"Logo Design",description:"lorem ipsum dolor sit amat, connecter adieu siccing eliot",quantity:6,amount:200,total:1200},{id:2,product:"Landing Page",description:"lorem ipsum dolor sit amat, connecter adieu siccing eliot",quantity:7,amount:100,total:700},{id:3,product:"Admin Template",description:"lorem ipsum dolor sit amat, connecter adieu siccing eliot",quantity:5,amount:150,total:750}]),f=Object(a.a)(O,2),A=f[0],g=(f[1],Object(s.useState)(!1)),v=Object(a.a)(g,2),y=(v[0],v[1]),E=n.a.useState(new Date),z=Object(a.a)(E,2),P=z[0],V=z[1],I=Object(s.useState)(!1),w=Object(a.a)(I,2);return w[0],w[1],Object(s.useEffect)((function(){!function(){var e={subTotal:0,appliedTaxValue:.1,appliedDiscountValue:.05,taxesAmount:0,discountAmount:0,totalAmount:0};A.forEach((function(t){e.subTotal+=t.total})),e.taxesAmount=e.subTotal*e.appliedTaxValue,e.discountAmount=(e.subTotal+e.taxesAmount)*e.appliedDiscountValue,e.totalAmount=e.subTotal+e.taxesAmount-e.discountAmount,h(e)}()}),[A]),Object(p.jsx)(S.a,{title:"Create Ticket",children:Object(p.jsx)("form",{onSubmit:e.handleSubmit,children:Object(p.jsxs)(c.a,{container:!0,spacing:x.b,children:[Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(q.a,{formik:e,title:"Transaction Type",data:B})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(q.a,{formik:e,title:"Issue Type",data:R})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(q.a,{formik:e,title:"Sub Issue Type"})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(q.a,{formik:e,title:"Requested By",data:N})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(T.a,{formik:e,title:"REF Number"})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(T.a,{formik:e,title:"Transaction Date"})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(T.a,{formik:e,title:"Transaction Amount"})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(T.a,{formik:e,title:"Contract Number"})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(T.a,{formik:e,title:"Product Type"})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(T.a,{formik:e,title:"Requester's National ID"})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(T.a,{formik:e,title:"Requester's Phone Number"})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(T.a,{formik:e,title:"REF Number"})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(T.a,{formik:e,title:"Right Amount"})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:3,children:Object(p.jsx)(T.a,{formik:e,title:"Right Contract Number"})}),Object(p.jsx)(c.a,{item:!0,xs:12,children:Object(p.jsxs)(d.a,{children:[Object(p.jsx)(C,{sx:{color:"#4C4C4C",fontWeight:"bold",marginBottom:1},children:"Description"}),Object(p.jsx)(u.a,{fullWidth:!0,id:"customerAddress",name:"customerAddress",defaultValue:"I acknowledge terms and conditions.",multiline:!0,rows:4,placeholder:"Enter Description"})]})}),Object(p.jsxs)(c.a,{item:!0,sx:{display:"flex",justifyContent:"flex-end"},xs:12,children:[Object(p.jsx)(l.a,{variant:"contained",sx:{background:"#B3B3B3",fontSize:12},children:"Cancel"}),Object(p.jsx)(l.a,{variant:"contained",sx:{marginX:1,fontSize:12},children:"Save as Draft"}),Object(p.jsx)(l.a,{sx:{background:"#27AE60",fontSize:12},variant:"contained",type:"submit",children:"Submit"})]}),Object(p.jsx)(c.a,{item:!0,xs:12,children:Object(p.jsxs)(d.a,{children:[Object(p.jsx)(C,{required:!0,children:"Customer Address"}),Object(p.jsx)(u.a,{fullWidth:!0,id:"customerAddress",name:"customerAddress",value:e.values.customerAddress,onBlur:e.handleBlur,error:e.touched.customerAddress&&Boolean(e.errors.customerAddress),helperText:e.touched.customerAddress&&e.errors.customerAddress,onChange:e.handleChange,multiline:!0,placeholder:"Enter Address"})]})}),Object(p.jsx)(c.a,{item:!0,xs:12,children:Object(p.jsx)(m.a,{})}),Object(p.jsx)(c.a,{item:!0,xs:12,md:6,children:Object(p.jsxs)(d.a,{children:[Object(p.jsx)(C,{required:!0,children:"Invoice Date"}),Object(p.jsx)(j.b,{dateAdapter:o.a,children:Object(p.jsx)(b.a,{inputFormat:"dd/MM/yyyy",renderInput:function(e){return Object(p.jsx)(u.a,Object(i.a)({fullWidth:!0},e))},value:P,onChange:function(e){V(e)}})})]})})]})})})}}}]);
//# sourceMappingURL=17.fea27790.chunk.js.map