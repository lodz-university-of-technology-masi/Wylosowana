(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{131:function(e,t,a){e.exports=a(544)},139:function(e,t,a){},544:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(51),l=a.n(r),o=(a(136),a(16)),c=a.n(o),i=a(27),u=a(11),m=a(12),d=a(15),p=a(13),h=a(14),f=a(549),g=a(550),E=a(551),v=(a(139),a(46)),b=a(45),w=a(25),y=a(23),O=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).handleLogOut=function(){var e=Object(i.a)(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,y.a.signOut();case 4:a.props.auth.setAuthStatus(!1),a.props.auth.setUser(null),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0.message);case 11:case"end":return e.stop()}},e,null,[[1,8]])}));return function(t){return e.apply(this,arguments)}}(),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement(v.a,{bg:"dark",variant:"dark"},s.a.createElement(v.a.Brand,{href:"#/"},"Wylosowana"),s.a.createElement(v.a.Toggle,null),s.a.createElement(v.a.Collapse,{className:"justify-content-end"},this.props.auth.isAuthenticated&&this.props.auth.user&&s.a.createElement("p",{className:"hello-username"},"Hello ",this.props.auth.user.username),this.props.auth.isAuthenticated&&this.props.auth.user&&"Recruiter"===this.props.auth.user.attributes.profile&&s.a.createElement(b.a,null,s.a.createElement(w.a,{variant:"outline-info",href:"#/createtest"},"Add Test"),s.a.createElement("div",{className:"navbar-buttons-space"})),this.props.auth.isAuthenticated&&this.props.auth.user&&"Recruiter"===this.props.auth.user.attributes.profile&&s.a.createElement(b.a,null,s.a.createElement(w.a,{variant:"outline-info",href:"#/showtests"},"Show Tests"),s.a.createElement("div",{className:"navbar-buttons-space"})),this.props.auth.isAuthenticated&&this.props.auth.user&&"Candidate"===this.props.auth.user.attributes.profile&&s.a.createElement(b.a,null,s.a.createElement(w.a,{variant:"outline-info",href:"#/showtest"},"Show Test"),s.a.createElement("div",{className:"navbar-buttons-space"})),!this.props.auth.isAuthenticated&&s.a.createElement(b.a,null,s.a.createElement(w.a,{variant:"outline-info",href:"#/register"},"Register"),s.a.createElement("div",{className:"navbar-buttons-space"}),s.a.createElement(w.a,{variant:"outline-info",href:"#/login"},"Log in")),this.props.auth.isAuthenticated&&s.a.createElement(w.a,{onClick:this.handleLogOut,variant:"outline-info",href:"#/"},"Log out")))}}]),t}(n.Component),N=a(125);function j(){return s.a.createElement(N.a,null,s.a.createElement("h1",null,"Hello, world!"),s.a.createElement("p",null,"This is a simple react-bootstrap example."),s.a.createElement("p",null,s.a.createElement(w.a,{variant:"primary",href:"https://react-bootstrap.github.io/getting-started/introduction/"},"Learn more")))}var S=a(31),C=a(29);var k=function(e){return e.formerrors&&(e.formerrors.blankfield||e.formerrors.passwordmatch)?s.a.createElement("div",{className:"error container help is-danger"},s.a.createElement("div",{className:"row justify-content-center"},e.formerrors.passwordmatch?"Password value does not match confirm password value":""),s.a.createElement("div",{className:"row justify-content-center help is-danger"},e.formerrors.blankfield?"All fields are required":"")):e.apierrors?s.a.createElement("div",{className:"error container help is-danger"},s.a.createElement("div",{className:"row justify-content-center"},e.apierrors)):e.formerrors&&e.formerrors.cognito?s.a.createElement("div",{className:"error container help is-danger"},s.a.createElement("div",{className:"row justify-content-center"},e.formerrors.cognito.message)):s.a.createElement("div",null)};var I=function(e,t){for(var a=document.getElementsByClassName("is-danger"),n=0;n<a.length;n++)a[n].classList.contains("error")||a[n].classList.remove("is-danger");return t.hasOwnProperty("username")&&""===t.username?(document.getElementById("username").classList.add("is-danger"),{blankfield:!0}):t.hasOwnProperty("firstname")&&""===t.firstname?(document.getElementById("firstname").classList.add("is-danger"),{blankfield:!0}):t.hasOwnProperty("lastname")&&""===t.lastname?(document.getElementById("lastname").classList.add("is-danger"),{blankfield:!0}):t.hasOwnProperty("email")&&""===t.email?(document.getElementById("email").classList.add("is-danger"),{blankfield:!0}):t.hasOwnProperty("verificationcode")&&""===t.verificationcode?(document.getElementById("verificationcode").classList.add("is-danger"),{blankfield:!0}):t.hasOwnProperty("password")&&""===t.password?(document.getElementById("password").classList.add("is-danger"),{blankfield:!0}):t.hasOwnProperty("oldpassword")&&""===t.oldpassword?(document.getElementById("oldpassword").classList.add("is-danger"),{blankfield:!0}):t.hasOwnProperty("newpassword")&&""===t.newpassword?(document.getElementById("newpassword").classList.add("is-danger"),{blankfield:!0}):t.hasOwnProperty("confirmpassword")&&""===t.confirmpassword?(document.getElementById("confirmpassword").classList.add("is-danger"),{blankfield:!0}):t.hasOwnProperty("password")&&t.hasOwnProperty("confirmpassword")&&t.password!==t.confirmpassword?(document.getElementById("password").classList.add("is-danger"),document.getElementById("confirmpassword").classList.add("is-danger"),{passwordmatch:!0}):t.hasOwnProperty("newpassword")&&t.hasOwnProperty("confirmpassword")&&t.newpassword!==t.confirmpassword?(document.getElementById("newpassword").classList.add("is-danger"),document.getElementById("confirmpassword").classList.add("is-danger"),{passwordmatch:!0}):void 0},x=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).state={username:"",password:"",errors:{cognito:null,blankfield:!1}},a.clearErrorState=function(){a.setState({errors:{cognito:null,blankfield:!1}})},a.handleSubmit=function(){var e=Object(i.a)(c.a.mark(function e(t){var n,s,r;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a.clearErrorState(),(n=I(t,a.state))&&a.setState({errors:Object(C.a)({},a.state.errors,n)}),s=a.state,s.username,s.email,s.password,e.prev=5,e.next=8,y.a.signIn(a.state.username,a.state.password);case 8:r=e.sent,console.log(r),a.props.auth.setAuthStatus(!0),a.props.auth.setUser(r),a.props.history.push("/"),e.next=20;break;case 15:e.prev=15,e.t0=e.catch(5),null,e.t0.message?e.t0:{message:e.t0},a.setState({errors:Object(C.a)({},a.state.errors,{cognito:e.t0})});case 20:case"end":return e.stop()}},e,null,[[5,15]])}));return function(t){return e.apply(this,arguments)}}(),a.onInputChange=function(e){a.setState(Object(S.a)({},e.target.id,e.target.value)),document.getElementById(e.target.id).classList.remove("is-danger")},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("section",{className:"section auth"},s.a.createElement("div",{className:"container"},s.a.createElement("h1",null,"Log in"),s.a.createElement(k,{formerrors:this.state.errors}),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control"},s.a.createElement("input",{className:"input",type:"text",id:"username","aria-describedby":"usernameHelp",placeholder:"Enter username or email",value:this.state.username,onChange:this.onInputChange}))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control has-icons-left"},s.a.createElement("input",{className:"input",type:"password",id:"password",placeholder:"Password",value:this.state.password,onChange:this.onInputChange}),s.a.createElement("span",{className:"icon is-small is-left"},s.a.createElement("i",{className:"fas fa-lock"})))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control"},s.a.createElement("a",{href:"#/forgotpassword"},"Forgot password?"))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control"},s.a.createElement("button",{className:"button is-success"},"Login"))))))}}]),t}(n.Component),L=a(21),A=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).state={username:"",email:"",password:"",confirmpassword:"",profile:"",errors:{cognito:null,blankfield:!1,passwordmatch:!1}},a.clearErrorState=function(){a.setState({errors:{cognito:null,blankfield:!1,passwordmatch:!1}})},a.handleSubmit=function(){var e=Object(i.a)(c.a.mark(function e(t){var n,s,r,l,o,i,u;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a.clearErrorState(),(n=I(t,a.state))&&a.setState({errors:Object(C.a)({},a.state.errors,n)}),s=a.state,r=s.username,l=s.email,o=s.password,i=s.profile,e.prev=5,e.next=8,y.a.signUp({username:r,password:o,attributes:{email:l,profile:i}});case 8:u=e.sent,console.log(u),a.props.history.push("/welcome"),e.next=18;break;case 13:e.prev=13,e.t0=e.catch(5),null,e.t0.message?e.t0:{message:e.t0},a.setState({errors:Object(C.a)({},a.state.errors,{cognito:e.t0})});case 18:case"end":return e.stop()}},e,null,[[5,13]])}));return function(t){return e.apply(this,arguments)}}(),a.onInputChange=function(e){a.setState(Object(S.a)({},e.target.id,e.target.value)),document.getElementById(e.target.id).classList.remove("is-danger")},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"handleChange",value:function(e){this.setState({profile:e.target.value})}},{key:"render",value:function(){return s.a.createElement("section",{className:"section auth"},s.a.createElement("div",{className:"container"},s.a.createElement("h1",null,"Register"),s.a.createElement(k,{formerrors:this.state.errors}),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control"},s.a.createElement("input",{className:"input",type:"text",id:"username","aria-describedby":"userNameHelp",placeholder:"Enter username",value:this.state.username,onChange:this.onInputChange}))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control has-icons-left has-icons-right"},s.a.createElement("input",{className:"input",type:"email",id:"email","aria-describedby":"emailHelp",placeholder:"Enter email",value:this.state.email,onChange:this.onInputChange}),s.a.createElement("span",{className:"icon is-small is-left"},s.a.createElement("i",{className:"fas fa-envelope"})))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control has-icons-left"},s.a.createElement("input",{className:"input",type:"password",id:"password",placeholder:"Password",value:this.state.password,onChange:this.onInputChange}),s.a.createElement("span",{className:"icon is-small is-left"},s.a.createElement("i",{className:"fas fa-lock"})))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control has-icons-left"},s.a.createElement("input",{className:"input",type:"password",id:"confirmpassword",placeholder:"Confirm password",value:this.state.confirmpassword,onChange:this.onInputChange}),s.a.createElement("span",{className:"icon is-small is-left"},s.a.createElement("i",{className:"fas fa-lock"})))),s.a.createElement(L.a.Group,{controlId:"controlSelectProfile"},s.a.createElement(L.a.Label,null,"Select a profile"),s.a.createElement(L.a.Control,{as:"select",onChange:this.handleChange.bind(this),value:this.state.profile},s.a.createElement("option",{value:"Candidate"},"Candidate"),s.a.createElement("option",{value:"Recruiter"},"Recruiter"))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control"},s.a.createElement("button",{className:"button is-success"},"Register"))))))}}]),t}(n.Component),P=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).state={email:"",errors:{cognito:null,blankfield:!1}},a.clearErrorState=function(){a.setState({errors:{cognito:null,blankfield:!1}})},a.forgotPasswordHandler=function(){var e=Object(i.a)(c.a.mark(function e(t){var n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a.clearErrorState(),(n=I(t,a.state))&&a.setState({errors:Object(C.a)({},a.state.errors,n)}),e.prev=4,e.next=7,y.a.forgotPassword(a.state.email);case 7:a.props.history.push("/forgotpasswordverification"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(4),console.log(e.t0);case 13:case"end":return e.stop()}},e,null,[[4,10]])}));return function(t){return e.apply(this,arguments)}}(),a.onInputChange=function(e){a.setState(Object(S.a)({},e.target.id,e.target.value)),document.getElementById(e.target.id).classList.remove("is-danger")},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("section",{className:"section auth"},s.a.createElement("div",{className:"container"},s.a.createElement("h1",null,"Forgot your password?"),s.a.createElement("p",null,"Please enter the email address associated with your account and we'll email you a password reset link."),s.a.createElement(k,{formerrors:this.state.errors}),s.a.createElement("form",{onSubmit:this.forgotPasswordHandler},s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control has-icons-left has-icons-right"},s.a.createElement("input",{type:"email",className:"input",id:"email","aria-describedby":"emailHelp",placeholder:"Enter email",value:this.state.email,onChange:this.onInputChange}),s.a.createElement("span",{className:"icon is-small is-left"},s.a.createElement("i",{className:"fas fa-envelope"})))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control"},s.a.createElement("a",{href:"#/forgotpassword"},"Forgot password?"))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control"},s.a.createElement("button",{className:"button is-success"},"Submit"))))))}}]),t}(n.Component),T=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).state={verificationcode:"",email:"",newpassword:"",errors:{cognito:null,blankfield:!1}},a.clearErrorState=function(){a.setState({errors:{cognito:null,blankfield:!1}})},a.passwordVerificationHandler=function(){var e=Object(i.a)(c.a.mark(function e(t){var n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a.clearErrorState(),(n=I(t,a.state))&&a.setState({errors:Object(C.a)({},a.state.errors,n)}),e.prev=4,e.next=7,y.a.forgotPasswordSubmit(a.state.email,a.state.verificationcode,a.state.newpassword);case 7:a.props.history.push("/changepasswordconfirmation"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(4),console.log(e.t0);case 13:case"end":return e.stop()}},e,null,[[4,10]])}));return function(t){return e.apply(this,arguments)}}(),a.onInputChange=function(e){a.setState(Object(S.a)({},e.target.id,e.target.value)),document.getElementById(e.target.id).classList.remove("is-danger")},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("section",{className:"section auth"},s.a.createElement("div",{className:"container"},s.a.createElement("h1",null,"Set new password"),s.a.createElement("p",null,"Please enter the verification code sent to your email address below, your email address and a new password."),s.a.createElement(k,{formerrors:this.state.errors}),s.a.createElement("form",{onSubmit:this.passwordVerificationHandler},s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control"},s.a.createElement("input",{type:"text",className:"input",id:"verificationcode","aria-describedby":"verificationCodeHelp",placeholder:"Enter verification code",value:this.state.verificationcode,onChange:this.onInputChange}))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control has-icons-left"},s.a.createElement("input",{className:"input",type:"email",id:"email","aria-describedby":"emailHelp",placeholder:"Enter email",value:this.state.email,onChange:this.onInputChange}),s.a.createElement("span",{className:"icon is-small is-left"},s.a.createElement("i",{className:"fas fa-envelope"})))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control has-icons-left"},s.a.createElement("input",{type:"password",className:"input",id:"newpassword",placeholder:"New password",value:this.state.newpassword,onChange:this.onInputChange}),s.a.createElement("span",{className:"icon is-small is-left"},s.a.createElement("i",{className:"fas fa-lock"})))),s.a.createElement("div",{className:"field"},s.a.createElement("p",{className:"control"},s.a.createElement("button",{className:"button is-success"},"Submit"))))))}}]),t}(n.Component);function q(){return s.a.createElement("section",{className:"section auth"},s.a.createElement("div",{className:"container"},s.a.createElement("h1",null,"Welcome!"),s.a.createElement("p",null,"You have successfully registered a new account."),s.a.createElement("p",null,"We've sent you an email. Please click on confirmation link to verify your account")))}var B=a(129),Q=a(32),H=a(57),R=a.n(H),_=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).handleNameChange=function(e){a.setState({name:e.target.value})},a.handleOpenQuestionQuestionChange=function(e){return function(t){var n=a.state.questions.map(function(a,n){return e!==n?a:Object(C.a)({},a,{question:t.target.value})});a.setState({questions:n})}},a.handleAddOpenQuestion=function(){a.setState({questions:[].concat(Object(B.a)(a.state.questions),[a.state.tempQuestion])})},a.handleRemoveOpenQuestion=function(e){return function(){a.setState({questions:a.state.questions.filter(function(t,a){return e!==a})})}},a.handleAddCloseQuestion=function(){a.setState({questions:a.state.questions.concat([{no:0,guestion:"",answers:[],correct:[]}])})},a.handleSaveTest=function(){a.handleAddOpenQuestion()},a.state={name:"",lang:"",questions:[],tempQuestion:""},a.handleQuestionTextChange=a.handleQuestionTextChange.bind(Object(Q.a)(Object(Q.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(Q.a)(Object(Q.a)(a))),a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"handleLanguageChange",value:function(e){this.setState({lang:e.target.value})}},{key:"handleQuestionTextChange",value:function(e){this.setState({tempQuestion:e.target.value})}},{key:"handleSubmit",value:function(e){console.log(this.state.name);var t=this.state.questions.filter(function(e){return""!=e}).map(function(e,t){return{no:t,question:e}});console.log(t);var a={testName:this.state.name,langs:[{lang:this.state.lang,questions:t}],candidate_ids:[]};R.a.ajax({type:"POST",dataType:"json",url:"https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests",data:JSON.stringify(a),success:function(e,t){t&&console.log(t),console.log(e)}}),this.props.history.push("/")}},{key:"render",value:function(){var e=this;return s.a.createElement("section",{className:"section auth"},s.a.createElement(L.a,{onSubmit:this.handleSubmit},s.a.createElement("h1",null,"Test"),s.a.createElement(L.a.Group,{controlId:"controlInputName"},s.a.createElement(L.a.Label,null,"Name"),s.a.createElement(L.a.Control,{type:"name",placeholder:"Name",onChange:this.handleNameChange})),s.a.createElement(L.a.Group,{controlId:"controlSelectLang"},s.a.createElement(L.a.Label,null,"Select a language"),s.a.createElement(L.a.Control,{as:"select",onChange:this.handleLanguageChange.bind(this),value:this.state.language},s.a.createElement("option",{value:"EN"},"English"),s.a.createElement("option",{value:"PL"},"Polish"))),s.a.createElement("h4",null,"Questions"),this.state.questions.map(function(t,a){return s.a.createElement(L.a.Group,{controlId:"controlQuestion"},s.a.createElement(L.a.Label,null,"Question"),s.a.createElement(L.a.Control,{as:"textarea",rows:"3",onChange:e.handleQuestionTextChange}),s.a.createElement(w.a,{id:"deleteButton",onClick:e.handleRemoveOpenQuestion(a),variant:"danger",size:"sm"},"Delete"))}),s.a.createElement(w.a,{id:"addOpenQuestionButton",variant:"info",onClick:this.handleAddOpenQuestion},"Add Open Question"),s.a.createElement("div",null,s.a.createElement(w.a,{id:"saveTestButton",type:"submit",variant:"info",className:"mt-3",onClick:this.handleSaveTest}," Save Test "))))}}]),t}(n.Component),D=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("section",{className:"section auth"},s.a.createElement("div",{className:"container"},s.a.createElement("h1",null,"Show Test")))}}]),t}(n.Component),U=a(126),G=a(127),W=(a(542),function(e){function t(e){var a;Object(u.a)(this,t),(a=Object(d.a)(this,Object(p.a)(t).call(this,e))).createTable=function(){var e=[];if(a.state.tests.Items)for(var t=0;t<a.state.tests.Items.length;t++){var n=a.state.tests.Items[t],r="<div>";if(n.langs)for(var l=0;l<n.langs.length;l++){var o="";if(n.langs[l].questions)for(var c=0;c<n.langs[l].questions.length;c++)o+="<li>"+n.langs[l].questions[c].question+"</li>";r+="<ul>"+o+"</ul>"}r+="</div><br/><br/>",e.push(s.a.createElement("li",null,s.a.createElement("strong",null,n.testName,":"),s.a.createElement("br",null),s.a.createElement("ul",{dangerouslySetInnerHTML:{__html:r}})))}return e};var n=Object(Q.a)(Object(Q.a)(a)),r=[];return R.a.ajax({type:"GET",dataType:"json",url:"https://jqt7k6tt7i.execute-api.us-east-1.amazonaws.com/demo/tests",success:function(e,t){t&&console.log(t),console.log(e),r=e,n.setState({tests:r})}}),console.log(r),a.state={tests:[]},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return s.a.createElement("section",{class:"section"},s.a.createElement("ul",null,this.createTable()))}}]),t}(n.Component));U.a.add(G.a);var z=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).state={isAuthenticated:!1,isAuthenticating:!0,user:null},a.setAuthStatus=function(e){a.setState({isAuthenticated:e})},a.setUser=function(e){a.setState({user:e})},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(i.a)(c.a.mark(function e(){var t,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.a.currentSession();case 3:return t=e.sent,this.setAuthStatus(!0),console.log(t),e.next=8,y.a.currentAuthenticatedUser();case 8:a=e.sent,this.setUser(a),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:this.setState({isAuthenticating:!1});case 16:case"end":return e.stop()}},e,this,[[0,12]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e={isAuthenticated:this.state.isAuthenticated,user:this.state.user,setAuthStatus:this.setAuthStatus,setUser:this.setUser};return!this.state.isAuthenticating&&s.a.createElement("div",{className:"App"},s.a.createElement(f.a,null,s.a.createElement("div",null,s.a.createElement(O,{auth:e}),s.a.createElement(g.a,null,s.a.createElement(E.a,{exact:!0,path:"/",render:function(t){return s.a.createElement(j,Object.assign({},t,{auth:e}))}}),s.a.createElement(E.a,{exact:!0,path:"/login",render:function(t){return s.a.createElement(x,Object.assign({},t,{auth:e}))}}),s.a.createElement(E.a,{exact:!0,path:"/register",render:function(t){return s.a.createElement(A,Object.assign({},t,{auth:e}))}}),s.a.createElement(E.a,{exact:!0,path:"/forgotpassword",render:function(t){return s.a.createElement(P,Object.assign({},t,{auth:e}))}}),s.a.createElement(E.a,{exact:!0,path:"/forgotpasswordverification",render:function(t){return s.a.createElement(T,Object.assign({},t,{auth:e}))}}),s.a.createElement(E.a,{exact:!0,path:"/welcome",render:function(t){return s.a.createElement(q,Object.assign({},t,{auth:e}))}}),s.a.createElement(E.a,{exact:!0,path:"/createtest",render:function(t){return s.a.createElement(_,Object.assign({},t,{auth:e}))}}),s.a.createElement(E.a,{exact:!0,path:"/showtests",render:function(t){return s.a.createElement(W,Object.assign({},t,{auth:e}))}}),s.a.createElement(E.a,{exact:!0,path:"/showtest",render:function(t){return s.a.createElement(D,Object.assign({},t,{auth:e}))}})))))}}]),t}(n.Component),F=a(59);y.b.configure({Auth:{mandatorySingIn:!0,region:F.cognito.REGION,userPoolId:F.cognito.USER_POOL_ID,userPoolWebClientId:F.cognito.APP_CLIENT_ID}}),l.a.render(s.a.createElement(z,null),document.getElementById("root"))},59:function(e){e.exports={cognito:{REGION:"us-east-1",USER_POOL_ID:"us-east-1_dSK98ykly",APP_CLIENT_ID:"1ubc2o10fqt01gfq2nlkgk5l0o"}}},65:function(e,t){}},[[131,1,2]]]);
//# sourceMappingURL=main.4250ee1a.chunk.js.map