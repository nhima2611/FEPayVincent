(this["webpackJsonpfe-react-ts"]=this["webpackJsonpfe-react-ts"]||[]).push([[22],{414:function(e,t,n){"use strict";var a=n(449),c=n.n(a);t.a=new c.a},423:function(e,t,n){"use strict";var a=n(175);t.a={showToast:function(e,t){Object(a.b)(t,{type:e})}}},441:function(e,t,n){"use strict";n.d(t,"b",(function(){return k}));var a=n(66),c=n(6),o=n(28),i=n(13),r=n(474),s=n.n(r),l=n(519),d=n(520),u=n(521),j=n(522),b=n(523),O=n(581),p=n(357),f=n(118),h=n(524),g=n(582),v=n(518),x=n(567),m=n(171),w=n(0),C=n.n(w),S=n(473),y=n(414),E=n(1),P=["indeterminate"],k=Object(w.createRef)();t.a=function(e){var t=e.data,n=e.columns,a=e.onClickRowItem,r=e.showCustomFilter,v=void 0!==r&&r,P=e.rowId,R=void 0===P?"":P,A=e.disableCheckbox,I=e.manualSortBy,L=void 0===I||I,H=e.manualPagination,D=void 0===H||H,F=e.hiddenColumns,z=void 0===F?[]:F,B=C.a.useMemo((function(){return{text:function(e,t,n){return e.filter((function(e){var a=null===e||void 0===e?void 0:e.values[t];return void 0===a||String(a).toLowerCase().startsWith(String(n).toLowerCase())}))}}}),[]),G=Object(w.useContext)(m.b),N=Object(i.a)(G,2),W=N[0],M=W.queryPageIndex,U=W.queryPageSize,q=W.totalCount,J=N[1],Y=Object(S.useTable)({columns:n,data:t,initialState:{pageIndex:M,pageSize:U,hiddenColumns:z},manualSortBy:L,disableSortRemove:!0,manualPagination:D,manualFilters:!0,pageCount:q,filterTypes:B,autoResetSelectedRows:!1,getRowId:function(e){return _.get(e,R)}},S.useFilters,S.useSortBy,S.usePagination,S.useRowSelect,(function(e){A||e.visibleColumns.push((function(e){return[{id:"selection",Header:function(e){var t=e.getToggleAllPageRowsSelectedProps;return Object(E.jsx)("div",{children:Object(E.jsx)(T,Object(c.a)({},t()))})},Cell:function(e){var t=e.row;return Object(E.jsx)("div",{children:Object(E.jsx)(T,Object(c.a)({},t.getToggleRowSelectedProps()))})}}].concat(Object(o.a)(e))}))})),K=Y.getTableProps,Q=Y.getTableBodyProps,V=Y.headerGroups,X=Y.prepareRow,Z=Y.page,$=(Y.canPreviousPage,Y.canNextPage,Y.pageOptions),ee=(Y.pageCount,Y.gotoPage),te=(Y.nextPage,Y.previousPage,Y.setPageSize),ne=(Y.selectedFlatRows,Y.toggleAllPageRowsSelected),ae=Y.setAllFilters,ce=Y.setFilter,oe=Y.state,ie=oe.pageIndex,re=oe.pageSize,se=oe.sortBy,le=oe.filters,de=oe.selectedRowIds,ue=function(){return ae([])},je=function(e){e&&ne(!1)};Object(w.useImperativeHandle)(k,(function(){return{setFilter:ce}})),C.a.useEffect((function(){y.a.addListener("DESELECT_ALL_ROWS",je)}),[]),C.a.useEffect((function(){J({type:"PAGE_SIZE_CHANGED",payload:re}),ee(0)}),[re,ee]),C.a.useEffect((function(){de&&J({type:"SELECTED_CHANGE",payload:de})}),[de]),C.a.useEffect((function(){se&&J({type:"SORT_BY_OBJECT_CHANGED",payload:se})}),[se]),C.a.useEffect((function(){le&&J({type:"FILTERS_CHANGED",payload:le})}),[le]);var be=ie>0?Math.max(0,(1+ie)*re-$.length):0,Oe=C.a.useState(!1),pe=Object(i.a)(Oe,1)[0];return Object(E.jsxs)("div",{children:[Object(E.jsx)(u.a,Object(c.a)(Object(c.a)({},K()),{},{children:Object(E.jsxs)(j.a,{"aria-labelledby":"tableTitle",size:pe?"small":"medium",children:[Object(E.jsx)(b.a,{children:V.map((function(e){return Object(E.jsx)(l.a,Object(c.a)(Object(c.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(E.jsx)(d.a,Object(c.a)(Object(c.a)({},"selection"===e.id?e.getHeaderProps():e.getHeaderProps(e.getSortByToggleProps())),{},{sx:{padding:.5,minWidth:e.minWidth,textAlign:"left"},children:Object(E.jsxs)(O.a,{active:e.isSorted,direction:e.isSortedDesc?"desc":"asc",IconComponent:s.a,children:[e.render("Header"),"selection"!==e.id?Object(E.jsx)(p.a,{component:"span",sx:x.a,children:e.isSortedDesc?"sorted descending":"sorted ascending"}):null]})}))}))}))}))}),v&&Object(E.jsx)(b.a,{children:V.map((function(e){return Object(E.jsx)(l.a,Object(c.a)(Object(c.a)({},e.getHeaderGroupProps()),{},{sx:{textAlign:"center"},children:e.headers.map((function(e){return"selection"===e.id?Object(E.jsx)(d.a,Object(c.a)(Object(c.a)({},e.getHeaderProps()),{},{onClick:ue,children:Object(E.jsx)(f.a,{sx:{cursor:"pointer"},children:"Clear"})})):Object(E.jsx)(d.a,Object(c.a)(Object(c.a)({},e.getHeaderProps()),{},{sx:{px:1},children:e.canFilter?e.render("Filter"):null}))}))}))}))}),Object(E.jsxs)(h.a,Object(c.a)(Object(c.a)({},Q()),{},{children:[!Boolean(t.length)&&Object(E.jsx)(l.a,{children:Object(E.jsx)(d.a,{sx:{textAlign:"left"},colSpan:n.length+1,children:"Empty Data"})}),Z.map((function(e){return X(e),Object(E.jsx)(l.a,Object(c.a)(Object(c.a)({hover:!0},e.getRowProps()),{},{onClick:function(){return null===a||void 0===a?void 0:a(e)},sx:{textDecoration:"none",cursor:"pointer"},children:e.cells.map((function(e){return Object(E.jsx)(d.a,Object(c.a)(Object(c.a)({},e.getCellProps()),{},{sx:{padding:.5,wordBreak:"break-all"},children:e.render("Cell")}))}))}))})),be>0&&Object(E.jsx)(l.a,{style:{height:(pe?33:53)*be},children:Object(E.jsx)(d.a,{colSpan:n.length+1})})]}))]})})),Object(E.jsx)(g.a,{component:"div",rowsPerPageOptions:[10,20,50],count:$.length,rowsPerPage:U,page:M,onPageChange:function(e,t){ee(t),J({type:"PAGE_CHANGED",payload:t})},onRowsPerPageChange:function(e){te(Number(e.target.value))}})]})};var T=C.a.forwardRef((function(e,t){var n=e.indeterminate,o=Object(a.a)(e,P),i=C.a.useRef(),r=t||i;return C.a.useEffect((function(){r.current.indeterminate=n}),[r,n]),Object(E.jsx)(E.Fragment,{children:Object(E.jsx)(v.a,Object(c.a)(Object(c.a)({ref:r},o),{},{onClick:function(e){e.stopPropagation()}}))})}))},480:function(e,t,n){"use strict";var a=n(24),c=n(23),o=n(169),i=n(170),r=function(e){Object(o.a)(n,e);var t=Object(i.a)(n);function n(){return Object(c.a)(this,n),t.call(this,"/v1/partners")}return Object(a.a)(n)}(n(172).a);t.a=new r},481:function(e,t,n){"use strict";var a=n(6),c=n(13),o=n(5),i=n(390),r=n(118),s=n(366),l=n(580),d=n(385),u=n(357),j=n(391),b=n(8),O=n(34),p=n(168),f=n(21),h=n(171),g=n(78),v=n(0),x=n(38),m=n(414),w=n(1),C=Object(b.a)(i.a,{shouldForwardProp:p.b})((function(e){var t,n=e.theme;return t={width:434,height:36,marginLeft:16,marginRight:16,paddingLeft:16,paddingRight:16,"& input":{background:"transparent !important",paddingLeft:"4px !important"}},Object(o.a)(t,n.breakpoints.down("lg"),{width:250}),Object(o.a)(t,n.breakpoints.down("md"),{width:100,background:"dark"===n.palette.mode?n.palette.dark[800]:"#fff"}),t})),S=Object(b.a)("input")({display:"none"});t.a=function(e){var t=e.onClickUser,n=e.urlAddTicket,o=e.onClickDownload,i=e.onUploadFile,b=e.onClickTrash,p=e.title,E=void 0===p?"Partner List":p,P=Object(O.a)(),k=(Object(g.a)().user,Object(v.useContext)(h.b)),T=Object(c.a)(k,1)[0].selectedIds,R=Object(v.useState)(""),A=Object(c.a)(R,2),I=A[0],L=A[1];Object(v.useEffect)((function(){m.a.emit("SEARCH_TICKET_LIST",{value:I})}),[I]);var H=function(e){null===i||void 0===i||i(e.target.files[0])};return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(r.a,{sx:{mb:1},children:"".concat(E," - ").concat(_.keys(T).length," Selected")}),Object(w.jsxs)(s.a,{direction:"row",spacing:1.5,sx:{marginBottom:1},children:[Object(w.jsx)(l.a,{title:"Download",children:Object(w.jsx)(d.a,{sx:Object(a.a)(Object(a.a)({},y.btn),{},{minWidth:36,padding:0}),variant:"outlined",onClick:o,children:Object(w.jsx)(f.j,{size:18})})}),Object(w.jsx)(l.a,{title:"Upload",children:Object(w.jsxs)("label",{style:{display:"flex"},htmlFor:"contained-button-file",children:[Object(w.jsx)(S,{accept:".xlsx, .xls, .csv",type:"file",id:"contained-button-file",onChange:H,onClick:function(e){e.target.value=null}}),Object(w.jsx)(d.a,{sx:Object(a.a)(Object(a.a)({},y.btn),{},{minWidth:36,padding:0}),component:"span",variant:"outlined",children:Object(w.jsx)(f.w,{size:18})})]})}),Object(w.jsx)(l.a,{title:"Delete",children:Object(w.jsx)(d.a,{onClick:b,sx:Object(a.a)(Object(a.a)({},y.btn),{},{minWidth:36,padding:0}),variant:"outlined",children:Object(w.jsx)(f.v,{size:18})})}),Object(w.jsx)(l.a,{title:"Toggle Mode",children:Object(w.jsx)(d.a,{sx:Object(a.a)(Object(a.a)({},y.btn),{},{minWidth:36,padding:0}),variant:"outlined",onClick:t,children:Object(w.jsx)(f.x,{size:18})})}),Object(w.jsx)(u.a,{sx:{flexGrow:1}}),Object(w.jsx)(u.a,{children:Object(w.jsx)(C,{id:"input-search-header",value:I,onChange:function(e){return L(e.target.value)},placeholder:"Search",startAdornment:Object(w.jsx)(j.a,{position:"start",children:Object(w.jsx)(f.q,{stroke:1.5,size:"1rem",color:P.palette.grey[500]})}),"aria-describedby":"search-helper-text",inputProps:{"aria-label":"weight"},sx:{height:36}})}),Object(w.jsx)(d.a,{variant:"outlined",sx:{borderColor:"#E5E5E5",color:"#008345",borderRadius:2,height:36,fontSize:12,fontWeight:"bold"},startIcon:Object(w.jsx)(f.p,{color:"#008345",size:18}),component:x.b,to:n,children:"Add New"})]})]})};var y={btn:{borderColor:"#E5E5E5",height:36}}},542:function(e,t,n){"use strict";var a=n(0);function c(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.addEventListener&&e.addEventListener.apply(e,t)}function o(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];e&&e.removeEventListener&&e.removeEventListener.apply(e,t)}var i="undefined"!==typeof window,r=function(e,t){return new URLSearchParams(e).get(t)};t.a=i?function(e){var t=window.location,n=Object(a.useState)((function(){return r(t.search,e)})),i=n[0],s=n[1];return Object(a.useEffect)((function(){var n=function(){s(r(t.search,e))};return c(window,"popstate",n),c(window,"pushstate",n),c(window,"replacestate",n),function(){o(window,"popstate",n),o(window,"pushstate",n),o(window,"replacestate",n)}}),[]),i}:function(){return null}},809:function(e,t,n){"use strict";n.r(t);var a=n(13),c=n(357),o=n(382),i=n(481),r=n(171),s=n(0),l=n.n(s),d=n(104),u=n(22),j=n(542),b=n(480),O=n(119),p=n(414),f=n(423),h=n(28),g=n(393),v=n(766),x=n(815),m=n(21),w=n(441),C=n(121),S=n(1),y=function(e){var t=e.data,n=void 0===t?[]:t,c=e.loading,o=e.cols,i=void 0===o?[]:o,r=e.onClickRowItem,d=Object(s.useState)(null),u=Object(a.a)(d,2),j=u[0],b=u[1],p=function(e){e.stopPropagation(),b(null===e||void 0===e?void 0:e.currentTarget)},f=function(){b(null)},y=l.a.useMemo((function(){return i[0]?i.map((function(e){return"action"===e?{Header:Object(C.startCase)(Object(C.camelCase)(e)),accessor:e,Cell:function(e){e.value;return Object(S.jsx)(g.a,{onClick:p,children:Object(S.jsx)(m.i,{})})},Filter:""}:{Header:Object(C.startCase)(Object(C.camelCase)(e)),accessor:e,Cell:function(e){var t=e.value;return Object(S.jsx)("div",{style:{maxHeight:40,overflow:"hidden"},children:t})},Filter:""}})):[]}),[i]),E=l.a.useMemo((function(){return Object(h.a)(n)}),[n]);return Object(S.jsxs)(O.a,{content:!1,border:!1,children:[Object(S.jsxs)(v.a,{id:"menu-followers-card",anchorEl:j,keepMounted:!0,open:Boolean(j),onClose:f,variant:"selectedMenu",anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:[Object(S.jsx)(x.a,{onClick:f,sx:{color:"#27AE60",fontSize:12,fontWeight:500},children:"Edit"}),Object(S.jsx)(x.a,{onClick:f,sx:{color:"#808080",fontSize:12,fontWeight:500},children:"View"}),Object(S.jsx)(x.a,{onClick:f,sx:{color:"#FF0015",fontSize:12,fontWeight:500},children:"Delete"})]}),c?Object(S.jsx)("div",{children:"loading..."}):Object(S.jsx)(w.a,{rowId:"partner_id",onClickRowItem:r,data:E,columns:y})]})};t.default=function(){var e,t,n=Object(s.useContext)(r.b),l=Object(a.a)(n,2),h=l[0],g=h.queryPageIndex,v=h.queryPageSize,x=h.sortByObject,m=h.filters,w=(h.selectedIds,h.resetState,l[1]),C=Object(s.useState)(""),E=Object(a.a)(C,2),P=E[0],k=E[1],T=Object(j.a)("f"),R=Object(d.useQuery)(["partner_table",g,v,P,x,m],(function(){var e,t,n,a="per_page=".concat(v,"&page=").concat(g+1),c=0===(null===P||void 0===P?void 0:P.length)?"":"&keyword=".concat(P),o="view_type=".concat(1),i=Boolean(x.length)?"&order_by=".concat(null!==(e=null===(t=x[0])||void 0===t?void 0:t.id)&&void 0!==e?e:"ticket_id","&sorted_by=").concat(null!==(n=x[0])&&void 0!==n&&n.desc?"desc":"asc"):"",r=Boolean(m)?_.map(m,(function(e){var t=["created_date","last_status_date"].includes(e.id);return"&".concat(e.id,"=").concat(t?moment(e.value).format("DD/MM/YYYY"):e.value)})).join(""):"";return b.a.getAll("".concat(a).concat(c,"&").concat(o).concat(i).concat(r))}),{keepPreviousData:!0,onError:function(e){f.a.showToast("error",e.message)},onSuccess:function(e){var t,n,a;w({type:"TOTAL_COUNT_CHANGED",payload:null===(t=e.data)||void 0===t||null===(n=t.meta)||void 0===n||null===(a=n.pagination)||void 0===a?void 0:a.total})}}),A=R.isLoading,I=R.data,L=(R.refetch,Object(u.f)()),H=_.debounce((function(e){var t=e.value;k(t)}),1500,{maxWait:1500});Object(s.useEffect)((function(){return p.a.addListener("SEARCH_TICKET_LIST",H),function(){p.a.removeAllListeners()}}),[]),Object(s.useEffect)((function(){var e,t;T&&(w({type:"PAGE_CHANGED",payload:(null===(e=JSON.parse(T))||void 0===e?void 0:e.queryPageIndex)||0}),k((null===(t=JSON.parse(T))||void 0===t?void 0:t.keyword)||""))}),[T]);return Object(S.jsx)(c.a,{sx:{display:"flex"},children:Object(S.jsx)(o.a,{container:!0,children:Object(S.jsx)(o.a,{item:!0,xs:12,children:Object(S.jsxs)(O.a,{contentSX:{p:2},children:[Object(S.jsx)(i.a,{onClickDownload:function(){},onClickUser:function(){},urlAddTicket:"create",onUploadFile:function(){},onClickTrash:function(){}}),Object(S.jsx)(y,{onClickRowItem:function(e){var t,n;console.log(e),L(null===(t=e.values)||void 0===t||null===(n=t.partner_id)||void 0===n?void 0:n.toString())},loading:A,data:null===I||void 0===I||null===(e=I.data)||void 0===e?void 0:e.data,cols:null===I||void 0===I||null===(t=I.data)||void 0===t?void 0:t.cols})]})})})})}}}]);
//# sourceMappingURL=22.34f5f34b.chunk.js.map