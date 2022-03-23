(this["webpackJsonpberry-material-react-ts"]=this["webpackJsonpberry-material-react-ts"]||[]).push([[0],{733:function(e,t,n){"use strict";var r=n(2),o=n(7),a=n(0),i=(n(123),n(9)),c=n(150),s=n(124),l=n(389),u=n(364).a,d=n(30),p=n(65),b=n(1),f=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function v(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function h(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function m(e,t){if(void 0===t)return!0;var n=e.innerText;return void 0===n&&(n=e.textContent),0!==(n=n.trim().toLowerCase()).length&&(t.repeating?n[0]===t.keys[0]:0===n.indexOf(t.keys.join("")))}function O(e,t,n,r,o,a){for(var i=!1,c=o(e,t,!!t&&n);c;){if(c===e.firstChild){if(i)return!1;i=!0}var s=!r&&(c.disabled||"true"===c.getAttribute("aria-disabled"));if(c.hasAttribute("tabindex")&&m(c,a)&&!s)return c.focus(),!0;c=o(e,c,n)}return!1}var j=a.forwardRef((function(e,t){var n=e.actions,i=e.autoFocus,c=void 0!==i&&i,j=e.autoFocusItem,g=void 0!==j&&j,y=e.children,P=e.className,x=e.disabledItemsFocusable,M=void 0!==x&&x,C=e.disableListWrap,w=void 0!==C&&C,k=e.onKeyDown,T=e.variant,E=void 0===T?"selectedMenu":T,R=Object(o.a)(e,f),D=a.useRef(null),F=a.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Object(p.a)((function(){c&&D.current.focus()}),[c]),a.useImperativeHandle(n,(function(){return{adjustStyleForScrollbar:function(e,t){var n=!D.current.style.width;if(e.clientHeight<D.current.clientHeight&&n){var r="".concat(u(Object(s.a)(e)),"px");D.current.style["rtl"===t.direction?"paddingLeft":"paddingRight"]=r,D.current.style.width="calc(100% + ".concat(r,")")}return D.current}}}),[]);var I=Object(d.a)(D,t),z=-1;a.Children.forEach(y,(function(e,t){a.isValidElement(e)&&(e.props.disabled||("selectedMenu"===E&&e.props.selected||-1===z)&&(z=t))}));var S=a.Children.map(y,(function(e,t){if(t===z){var n={};return g&&(n.autoFocus=!0),void 0===e.props.tabIndex&&"selectedMenu"===E&&(n.tabIndex=0),a.cloneElement(e,n)}return e}));return Object(b.jsx)(l.a,Object(r.a)({role:"menu",ref:I,className:P,onKeyDown:function(e){var t=D.current,n=e.key,r=Object(s.a)(t).activeElement;if("ArrowDown"===n)e.preventDefault(),O(t,r,w,M,v);else if("ArrowUp"===n)e.preventDefault(),O(t,r,w,M,h);else if("Home"===n)e.preventDefault(),O(t,null,w,M,v);else if("End"===n)e.preventDefault(),O(t,null,w,M,h);else if(1===n.length){var o=F.current,a=n.toLowerCase(),i=performance.now();o.keys.length>0&&(i-o.lastTime>500?(o.keys=[],o.repeating=!0,o.previousKeyMatched=!0):o.repeating&&a!==o.keys[0]&&(o.repeating=!1)),o.lastTime=i,o.keys.push(a);var c=r&&!o.repeating&&m(r,o);o.previousKeyMatched&&(c||O(t,r,!1,M,v,o))?e.preventDefault():o.previousKeyMatched=!1}k&&k(e)},tabIndex:c?0:-1},R,{children:S}))})),g=n(384),y=n(8),P=n(14),x=n(72),M=n(93),C=n(353),w=n(376),k=n(87),T=n(99);function E(e){return Object(k.a)("MuiPopover",e)}Object(T.a)("MuiPopover",["root","paper"]);var R=["onEntering"],D=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps"];function F(e,t){var n=0;return"number"===typeof t?n=t:"center"===t?n=e.height/2:"bottom"===t&&(n=e.height),n}function I(e,t){var n=0;return"number"===typeof t?n=t:"center"===t?n=e.width/2:"right"===t&&(n=e.width),n}function z(e){return[e.horizontal,e.vertical].map((function(e){return"number"===typeof e?"".concat(e,"px"):e})).join(" ")}function S(e){return"function"===typeof e?e():e}var L=Object(y.a)(w.a,{name:"MuiPopover",slot:"Root",overridesResolver:function(e,t){return t.root}})({}),N=Object(y.a)(g.a,{name:"MuiPopover",slot:"Paper",overridesResolver:function(e,t){return t.paper}})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),H=a.forwardRef((function(e,t){var n=Object(P.a)({props:e,name:"MuiPopover"}),l=n.action,u=n.anchorEl,p=n.anchorOrigin,f=void 0===p?{vertical:"top",horizontal:"left"}:p,v=n.anchorPosition,h=n.anchorReference,m=void 0===h?"anchorEl":h,O=n.children,j=n.className,g=n.container,y=n.elevation,w=void 0===y?8:y,k=n.marginThreshold,T=void 0===k?16:k,H=n.open,K=n.PaperProps,V=void 0===K?{}:K,A=n.transformOrigin,W=void 0===A?{vertical:"top",horizontal:"left"}:A,B=n.TransitionComponent,G=void 0===B?C.a:B,J=n.transitionDuration,U=void 0===J?"auto":J,X=n.TransitionProps,Y=(X=void 0===X?{}:X).onEntering,q=Object(o.a)(n.TransitionProps,R),Q=Object(o.a)(n,D),Z=a.useRef(),$=Object(d.a)(Z,V.ref),_=Object(r.a)({},n,{anchorOrigin:f,anchorReference:m,elevation:w,marginThreshold:T,PaperProps:V,transformOrigin:W,TransitionComponent:G,transitionDuration:U,TransitionProps:q}),ee=function(e){var t=e.classes;return Object(c.a)({root:["root"],paper:["paper"]},E,t)}(_),te=a.useCallback((function(){if("anchorPosition"===m)return v;var e=S(u),t=(e&&1===e.nodeType?e:Object(s.a)(Z.current).body).getBoundingClientRect();return{top:t.top+F(t,f.vertical),left:t.left+I(t,f.horizontal)}}),[u,f.horizontal,f.vertical,v,m]),ne=a.useCallback((function(e){return{vertical:F(e,W.vertical),horizontal:I(e,W.horizontal)}}),[W.horizontal,W.vertical]),re=a.useCallback((function(e){var t={width:e.offsetWidth,height:e.offsetHeight},n=ne(t);if("none"===m)return{top:null,left:null,transformOrigin:z(n)};var r=te(),o=r.top-n.vertical,a=r.left-n.horizontal,i=o+t.height,c=a+t.width,s=Object(M.a)(S(u)),l=s.innerHeight-T,d=s.innerWidth-T;if(o<T){var p=o-T;o-=p,n.vertical+=p}else if(i>l){var b=i-l;o-=b,n.vertical+=b}if(a<T){var f=a-T;a-=f,n.horizontal+=f}else if(c>d){var v=c-d;a-=v,n.horizontal+=v}return{top:"".concat(Math.round(o),"px"),left:"".concat(Math.round(a),"px"),transformOrigin:z(n)}}),[u,m,te,ne,T]),oe=a.useCallback((function(){var e=Z.current;if(e){var t=re(e);null!==t.top&&(e.style.top=t.top),null!==t.left&&(e.style.left=t.left),e.style.transformOrigin=t.transformOrigin}}),[re]);a.useEffect((function(){H&&oe()})),a.useImperativeHandle(l,(function(){return H?{updatePosition:function(){oe()}}:null}),[H,oe]),a.useEffect((function(){if(H){var e=Object(x.a)((function(){oe()})),t=Object(M.a)(u);return t.addEventListener("resize",e),function(){e.clear(),t.removeEventListener("resize",e)}}}),[u,H,oe]);var ae=U;"auto"!==U||G.muiSupportAuto||(ae=void 0);var ie=g||(u?Object(s.a)(S(u)).body:void 0);return Object(b.jsx)(L,Object(r.a)({BackdropProps:{invisible:!0},className:Object(i.a)(ee.root,j),container:ie,open:H,ref:t,ownerState:_},Q,{children:Object(b.jsx)(G,Object(r.a)({appear:!0,in:H,onEntering:function(e,t){Y&&Y(e,t),oe()},timeout:ae},q,{children:Object(b.jsx)(N,Object(r.a)({elevation:w},V,{ref:$,className:Object(i.a)(ee.paper,V.className),children:O}))}))}))})),K=n(34);function V(e){return Object(k.a)("MuiMenu",e)}Object(T.a)("MuiMenu",["root","paper","list"]);var A=["onEntering"],W=["autoFocus","children","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant"],B={vertical:"top",horizontal:"right"},G={vertical:"top",horizontal:"left"},J=Object(y.a)(H,{shouldForwardProp:function(e){return Object(y.b)(e)||"classes"===e},name:"MuiMenu",slot:"Root",overridesResolver:function(e,t){return t.root}})({}),U=Object(y.a)(g.a,{name:"MuiMenu",slot:"Paper",overridesResolver:function(e,t){return t.paper}})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),X=Object(y.a)(j,{name:"MuiMenu",slot:"List",overridesResolver:function(e,t){return t.list}})({outline:0}),Y=a.forwardRef((function(e,t){var n=Object(P.a)({props:e,name:"MuiMenu"}),s=n.autoFocus,l=void 0===s||s,u=n.children,d=n.disableAutoFocusItem,p=void 0!==d&&d,f=n.MenuListProps,v=void 0===f?{}:f,h=n.onClose,m=n.open,O=n.PaperProps,j=void 0===O?{}:O,g=n.PopoverClasses,y=n.transitionDuration,x=void 0===y?"auto":y,M=n.TransitionProps,C=(M=void 0===M?{}:M).onEntering,w=n.variant,k=void 0===w?"selectedMenu":w,T=Object(o.a)(n.TransitionProps,A),E=Object(o.a)(n,W),R=Object(K.a)(),D="rtl"===R.direction,F=Object(r.a)({},n,{autoFocus:l,disableAutoFocusItem:p,MenuListProps:v,onEntering:C,PaperProps:j,transitionDuration:x,TransitionProps:T,variant:k}),I=function(e){var t=e.classes;return Object(c.a)({root:["root"],paper:["paper"],list:["list"]},V,t)}(F),z=l&&!p&&m,S=a.useRef(null),L=-1;return a.Children.map(u,(function(e,t){a.isValidElement(e)&&(e.props.disabled||("selectedMenu"===k&&e.props.selected||-1===L)&&(L=t))})),Object(b.jsx)(J,Object(r.a)({classes:g,onClose:h,anchorOrigin:{vertical:"bottom",horizontal:D?"right":"left"},transformOrigin:D?B:G,PaperProps:Object(r.a)({component:U},j,{classes:Object(r.a)({},j.classes,{root:I.paper})}),className:I.root,open:m,ref:t,transitionDuration:x,TransitionProps:Object(r.a)({onEntering:function(e,t){S.current&&S.current.adjustStyleForScrollbar(e,R),C&&C(e,t)}},T),ownerState:F},E,{children:Object(b.jsx)(X,Object(r.a)({onKeyDown:function(e){"Tab"===e.key&&(e.preventDefault(),h&&h(e,"tabKeyDown"))},actions:S,autoFocus:l&&(-1===L||p),autoFocusItem:z,variant:k},v,{className:Object(i.a)(I.list,v.className),children:u}))}))}));t.a=Y},781:function(e,t,n){"use strict";var r=n(5),o=n(7),a=n(2),i=n(0),c=n(9),s=n(150),l=n(115),u=n(8),d=n(14),p=n(45),b=n(316),f=n(65),v=n(30),h=n(218),m=n(222),O=n(148),j=n(87),g=n(99);function y(e){return Object(j.a)("MuiMenuItem",e)}var P=Object(g.a)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),x=n(1),M=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],C=Object(u.a)(b.a,{shouldForwardProp:function(e){return Object(u.b)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.dense&&t.dense,n.divider&&t.divider,!n.disableGutters&&t.gutters]}})((function(e){var t,n=e.theme,o=e.ownerState;return Object(a.a)({},n.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!o.disableGutters&&{paddingLeft:16,paddingRight:16},o.divider&&{borderBottom:"1px solid ".concat(n.palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:n.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},Object(r.a)(t,"&.".concat(P.selected),Object(r.a)({backgroundColor:Object(l.a)(n.palette.primary.main,n.palette.action.selectedOpacity)},"&.".concat(P.focusVisible),{backgroundColor:Object(l.a)(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.focusOpacity)})),Object(r.a)(t,"&.".concat(P.selected,":hover"),{backgroundColor:Object(l.a)(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:Object(l.a)(n.palette.primary.main,n.palette.action.selectedOpacity)}}),Object(r.a)(t,"&.".concat(P.focusVisible),{backgroundColor:n.palette.action.focus}),Object(r.a)(t,"&.".concat(P.disabled),{opacity:n.palette.action.disabledOpacity}),Object(r.a)(t,"& + .".concat(h.a.root),{marginTop:n.spacing(1),marginBottom:n.spacing(1)}),Object(r.a)(t,"& + .".concat(h.a.inset),{marginLeft:52}),Object(r.a)(t,"& .".concat(O.a.root),{marginTop:0,marginBottom:0}),Object(r.a)(t,"& .".concat(O.a.inset),{paddingLeft:36}),Object(r.a)(t,"& .".concat(m.a.root),{minWidth:36}),t),!o.dense&&Object(r.a)({},n.breakpoints.up("sm"),{minHeight:"auto"}),o.dense&&Object(a.a)({minHeight:32,paddingTop:4,paddingBottom:4},n.typography.body2,Object(r.a)({},"& .".concat(m.a.root," svg"),{fontSize:"1.25rem"})))})),w=i.forwardRef((function(e,t){var n=Object(d.a)({props:e,name:"MuiMenuItem"}),r=n.autoFocus,l=void 0!==r&&r,u=n.component,b=void 0===u?"li":u,h=n.dense,m=void 0!==h&&h,O=n.divider,j=void 0!==O&&O,g=n.disableGutters,P=void 0!==g&&g,w=n.focusVisibleClassName,k=n.role,T=void 0===k?"menuitem":k,E=n.tabIndex,R=Object(o.a)(n,M),D=i.useContext(p.a),F={dense:m||D.dense||!1,disableGutters:P},I=i.useRef(null);Object(f.a)((function(){l&&I.current&&I.current.focus()}),[l]);var z,S=Object(a.a)({},n,{dense:F.dense,divider:j,disableGutters:P}),L=function(e){var t=e.disabled,n=e.dense,r=e.divider,o=e.disableGutters,i=e.selected,c=e.classes,l={root:["root",n&&"dense",t&&"disabled",!o&&"gutters",r&&"divider",i&&"selected"]},u=Object(s.a)(l,y,c);return Object(a.a)({},c,u)}(n),N=Object(v.a)(I,t);return n.disabled||(z=void 0!==E?E:-1),Object(x.jsx)(p.a.Provider,{value:F,children:Object(x.jsx)(C,Object(a.a)({ref:N,role:T,tabIndex:z,component:b,focusVisibleClassName:Object(c.a)(L.focusVisible,w)},R,{ownerState:S,classes:L}))})}));t.a=w}}]);
//# sourceMappingURL=0.dd0f5092.chunk.js.map