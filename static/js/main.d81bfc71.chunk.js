(this["webpackJsonpreact-redux-crud-app"]=this["webpackJsonpreact-redux-crud-app"]||[]).push([[0],{18:function(e,t,c){},19:function(e,t,c){},26:function(e,t,c){"use strict";c.r(t);var s=c(1),a=c(4),n=c.n(a),r=c(11),i=c.n(r),o=(c(18),c(19),c(20),c(6)),l=c(9),j=c(3),d=function(e){var t,c,n={task:"",priority:"",status:"",notes:""},r=Object(a.useState)(n),i=Object(l.a)(r,2),d=i[0],u=i[1];Object(a.useEffect)((function(){""===e.currentId?u(Object(o.a)({},n)):u(Object(o.a)({},e.RelatedPersonsObjects[e.currentId]))}),[e.currentId,e.RelatedPersonsObjects]);var b=function(e){var t=e.target,c=t.name,s=t.value;u(Object(o.a)(Object(o.a)({},d),{},Object(j.a)({},c,s)))};return Object(s.jsxs)("form",{className:"Form",autoComplete:"off",onSubmit:function(t){t.preventDefault(),e.addOrEdit(d)},children:[Object(s.jsxs)("div",{className:"form-group input-group",children:[Object(s.jsx)("div",{className:"input-group-prepend",children:Object(s.jsx)("div",{className:"input-group-text",children:Object(s.jsx)("i",{className:"fas fa-user"})})}),Object(s.jsx)("input",{className:"form-control",name:"task",placeholder:"Task",value:d.task,onChange:b,required:!0})]}),Object(s.jsxs)("div",{className:"form-group input-group ",children:[Object(s.jsx)("div",{className:"input-group-prepend",children:Object(s.jsx)("div",{className:"input-group-text",children:Object(s.jsx)("i",{className:"fas fa-mobile-alt"})})}),Object(s.jsxs)("select",(t={className:"form-control",name:"priority",placeholder:"Priority"},Object(j.a)(t,"name","priority"),Object(j.a)(t,"value",d.priority),Object(j.a)(t,"onChange",b),Object(j.a)(t,"required",!0),Object(j.a)(t,"children",[Object(s.jsx)("option",{value:"",children:"Urgency"}),Object(s.jsx)("option",{value:"High",children:"High"}),Object(s.jsx)("option",{value:"Medium",children:"Medium"}),Object(s.jsx)("option",{value:"Low",children:"Low"})]),t))]}),Object(s.jsxs)("div",{className:"form-group input-group ",children:[Object(s.jsx)("div",{className:"input-group-prepend",children:Object(s.jsx)("div",{className:"input-group-text",children:Object(s.jsx)("i",{className:"fas fa-mobile-alt"})})}),Object(s.jsxs)("select",(c={className:"form-control",name:"status",placeholder:"status"},Object(j.a)(c,"name","status"),Object(j.a)(c,"value",d.status),Object(j.a)(c,"onChange",b),Object(j.a)(c,"required",!0),Object(j.a)(c,"children",[Object(s.jsx)("option",{value:"",children:"Status"}),Object(s.jsx)("option",{value:"To-Do",children:" To Do"}),Object(s.jsx)("option",{value:"Progress",children:"In-Progress"}),Object(s.jsx)("option",{value:"Testing",children:"Testing"}),Object(s.jsx)("option",{value:"Complete",children:"Complete"})]),c))]}),Object(s.jsxs)("div",{className:"form-group input-group ",children:[Object(s.jsx)("div",{className:"input-group-prepend",children:Object(s.jsx)("div",{className:"input-group-text",children:Object(s.jsx)("i",{className:"fas fa-comment"})})}),Object(s.jsx)("input",{className:"form-control",name:"notes",placeholder:"Notes",value:d.notes,onChange:b,required:!0,type:"text"})]}),Object(s.jsx)("div",{className:"form-group",children:Object(s.jsx)("input",{type:"submit",value:""===e.currentId?"Save":"Update",className:"btn btn-primary btn-block"})})]})},u=c(12),b=(c(22),u.a.initializeApp({apiKey:"AIzaSyB9qlWdNkD_BnYqEe6nv-NU1F67C5c3sNs",authDomain:"react-crud-916fd.firebaseapp.com",projectId:"react-crud-916fd",storageBucket:"react-crud-916fd.appspot.com",messagingSenderId:"249856415759",appId:"1:249856415759:web:e9c1ec5e5affc62a406b7a"}).database().ref()),p=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),c=t[0],n=t[1],r=Object(a.useState)({}),i=Object(l.a)(r,2),j=i[0],u=i[1];Object(a.useEffect)((function(){b.child("RelatedPersons").on("value",(function(e){null!=e.val()?u(Object(o.a)({},e.val())):u({})}))}),[]);return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("div",{className:"jumbotron jumbotron-fluid",children:Object(s.jsx)("div",{className:"container",children:Object(s.jsx)("h1",{className:"display-4 text-center",children:"TO DO LIST"})})}),Object(s.jsx)("div",{className:"Flex ",children:Object(s.jsx)(d,Object(o.a)({},{currentId:c,RelatedPersonsObjects:j,addOrEdit:function(e){""===c?b.child("RelatedPersons").push(e,(function(e){e?console.log(e):n("")})):b.child("RelatedPersons/".concat(c)).set(e,(function(e){e?console.log(e):n("")}))}}))}),Object(s.jsx)("div",{className:"Flex ",children:Object.keys(j).map((function(e){return Object(s.jsxs)("div",{className:"Card",children:[Object(s.jsx)("h5",{children:"Task"}),Object(s.jsx)("p",{children:j[e].task}),Object(s.jsx)("h5",{children:"Priority"}),Object(s.jsx)("p",{children:j[e].priority}),Object(s.jsx)("h5",{children:"Status"}),Object(s.jsx)("p",{children:j[e].status}),Object(s.jsx)("h5",{children:"Notes"}),Object(s.jsx)("p",{children:j[e].notes}),Object(s.jsx)("button",{className:"btn text-primary",onClick:function(){n(e)},children:Object(s.jsx)("i",{className:"fas fa-pencil-alt"})}),Object(s.jsx)("button",{className:"btn text-danger",onClick:function(){var t;t=e,window.confirm("Are you sure to delete this record?")&&b.child("RelatedPersons/".concat(t)).remove((function(e){e?console.log(e):n("")}))},children:Object(s.jsx)("i",{className:"far fa-trash-alt"})})]},e)}))})]})};var O=function(){return Object(s.jsx)("div",{className:"row",children:Object(s.jsx)("div",{className:"col-md-8 offset-md-2",children:Object(s.jsx)(p,{})})})},m=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,27)).then((function(t){var c=t.getCLS,s=t.getFID,a=t.getFCP,n=t.getLCP,r=t.getTTFB;c(e),s(e),a(e),n(e),r(e)}))};i.a.render(Object(s.jsx)(n.a.StrictMode,{children:Object(s.jsx)(O,{})}),document.getElementById("root")),m()}},[[26,1,2]]]);
//# sourceMappingURL=main.d81bfc71.chunk.js.map