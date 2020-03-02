function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{BJHQ:function(e,t,r){"use strict";r.r(t);var n,o=r("kIIl"),a=r("ofXK"),s=r("3Pt+"),c=r("fXoL"),i=r("fB3y"),u=r("tk/3"),b=((n=function(e){function t(e){var r;return _classCallCheck(this,t),(r=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this,e,"users"))).http=e,r}return _inherits(t,e),t}(i.a)).\u0275fac=function(e){return new(e||n)(c.ec(u.b))},n.\u0275prov=c.Mb({token:n,factory:n.\u0275fac,providedIn:"root"}),n),f=r("WHFS"),m=r("tyNb"),l=r("Wp6s"),d=r("kmnG"),h=r("qFsG"),p=r("bSwM"),C=r("bTqV");function v(e,t){1&e&&(c.Wb(0,"mat-card-content"),c.Wb(1,"span",5),c.Kc(2,"Loading..."),c.Vb(),c.Vb())}function w(e,t){if(1&e&&(c.Wb(0,"div",12),c.Kc(1),c.Vb()),2&e){var r=c.mc(2);c.Cb(1),c.Mc(" ",r.error," ")}}function y(e,t){if(1&e){var r=c.Xb();c.Wb(0,"mat-card-content"),c.Ic(1,w,2,1,"div",6),c.Wb(2,"mat-form-field",7),c.Rb(3,"input",8),c.Wb(4,"mat-error"),c.Kc(5),c.Vb(),c.Vb(),c.Wb(6,"mat-form-field",7),c.Rb(7,"input",9),c.Wb(8,"mat-error"),c.Kc(9),c.Vb(),c.Vb(),c.Rb(10,"br"),c.Rb(11,"br"),c.Rb(12,"br"),c.Wb(13,"mat-form-field",7),c.Rb(14,"input",10),c.Wb(15,"mat-error"),c.Kc(16),c.Vb(),c.Vb(),c.Wb(17,"mat-checkbox",11),c.ic("change",(function(e){c.Bc(r);var t=c.mc();return t.resetPassword=!t.resetPassword})),c.Kc(18,"Reset Password to "),c.Wb(19,"strong"),c.Kc(20),c.Vb(),c.Vb(),c.Vb()}if(2&e){var n=c.mc();c.Cb(1),c.sc("ngIf",n.error),c.Cb(2),c.sc("formControl",n.form.controls.firstname),c.Cb(2),c.Lc(n.form.controls.firstname.errors),c.Cb(2),c.sc("formControl",n.form.controls.lastname),c.Cb(2),c.Lc(n.form.controls.lastname.errors),c.Cb(5),c.sc("formControl",n.form.controls.username),c.Cb(2),c.Lc(n.form.controls.username.errors),c.Cb(1),c.sc("checked",n.resetPassword),c.Cb(3),c.Lc(n.randomPassword)}}function V(e,t){1&e&&(c.Wb(0,"mat-card-actions"),c.Wb(1,"button",13),c.Rb(2,"i",14),c.Kc(3," Submit"),c.Vb(),c.Wb(4,"button",15),c.Rb(5,"i",16),c.Kc(6," Cancel"),c.Vb(),c.Vb())}var W,g=((W=function(){function e(t,r,n,o){_classCallCheck(this,e),this.userService=t,this.modalService=r,this.router=n,this.activatedRoute=o,this.isFetching=!0,this.resetPassword=!1,this.form=new s.e({username:new s.c(""),firstname:new s.c(""),lastname:new s.c("")})}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.userId=this.activatedRoute.snapshot.params.id,this.isFetching=!0,this.userService.read(this.userId).subscribe((function(t){e.form.setValue({username:t.username,firstname:t.firstname,lastname:t.lastname}),e.isFetching=!1,e.randomizePassword()}))}},{key:"submit",value:function(){var e=this;this.form.valid&&this.userService.update({id:this.userId,username:this.form.controls.username.value,firstname:this.form.controls.firstname.value,lastname:this.form.controls.lastname.value,password:this.randomPassword,reset_password:this.resetPassword}).subscribe((function(){e.modalService.swal({text:"User succesfully created",icon:"success"}),e.router.navigate(["/users"])}),(function(t){for(var r in t.error.errors)e.form.controls.hasOwnProperty(r)&&e.form.controls[r].setErrors(t.error.errors[r])}))}},{key:"randomizePassword",value:function(){for(var e="",t="0123456789".length,r=0;r<6;r++)e+="0123456789".charAt(Math.floor(Math.random()*t));this.randomPassword=e}}]),e}()).\u0275fac=function(e){return new(e||W)(c.Qb(b),c.Qb(f.a),c.Qb(m.g),c.Qb(m.a))},W.\u0275cmp=c.Kb({type:W,selectors:[["app-edit"]],decls:10,vars:4,consts:[[1,"fa","fa-user-edit"],["autocomplete","off",3,"formGroup","submit"],[1,"row"],[1,"col-lg-4"],[4,"ngIf"],[1,"text-muted"],["class","alert alert-danger",4,"ngIf"],[1,"full-width"],["matInput","","placeholder","Firstname",3,"formControl"],["matInput","","placeholder","Lastname",3,"formControl"],["matInput","","placeholder","Username",3,"formControl"],["color","primary",3,"checked","change"],[1,"alert","alert-danger"],["mat-raised-button","","color","primary"],[1,"fa","fa-paper-plane"],["mat-raised-button","","color","basic","routerLink","/users"],[1,"fa","fa-times"]],template:function(e,t){1&e&&(c.Wb(0,"h1"),c.Rb(1,"i",0),c.Kc(2," Edit User Account\n"),c.Vb(),c.Wb(3,"form",1),c.ic("submit",(function(e){return t.submit()})),c.Wb(4,"div",2),c.Wb(5,"div",3),c.Wb(6,"mat-card"),c.Ic(7,v,3,0,"mat-card-content",4),c.Ic(8,y,21,9,"mat-card-content",4),c.Ic(9,V,7,0,"mat-card-actions",4),c.Vb(),c.Vb(),c.Vb(),c.Vb()),2&e&&(c.Cb(3),c.sc("formGroup",t.form),c.Cb(4),c.sc("ngIf",t.isFetching),c.Cb(1),c.sc("ngIf",0==t.isFetching),c.Cb(1),c.sc("ngIf",0==t.isFetching))},directives:[s.t,s.l,s.f,l.a,a.l,l.c,d.b,h.a,s.b,s.k,s.d,d.a,p.a,l.b,C.b,m.h],styles:[""]}),W);function k(e,t){if(1&e&&(c.Wb(0,"div",13),c.Kc(1),c.Vb()),2&e){var r=c.mc();c.Cb(1),c.Mc(" ",r.error," ")}}var I,R=((I=function(){function e(t,r,n){_classCallCheck(this,e),this.userService=t,this.modalService=r,this.router=n,this.form=new s.e({username:new s.c(""),firstname:new s.c(""),lastname:new s.c(""),password:new s.c("")})}return _createClass(e,[{key:"ngOnInit",value:function(){this.randomizePassword(),this.form.controls.username.disable()}},{key:"setUsername",value:function(){var e=this.form.controls.firstname.value,t=this.form.controls.lastname.value;e.trim().length>0&&t.trim().length>0?this.form.controls.username.setValue((e.charAt(0)+"."+t).toLowerCase()):this.form.controls.username.setValue("")}},{key:"randomizePassword",value:function(){for(var e="0123456789".length,t=0;t<6;t++)"0123456789".charAt(Math.floor(Math.random()*e));this.form.controls.password.setValue("password")}},{key:"submit",value:function(){var e=this;this.form.valid&&this.userService.create({username:this.form.controls.username.value,firstname:this.form.controls.firstname.value,lastname:this.form.controls.lastname.value,password:this.form.controls.password.value}).subscribe((function(){e.modalService.swal({text:"User succesfully created",icon:"success"}),e.router.navigate(["/users"])}),(function(t){for(var r in t.error.errors)e.form.controls.hasOwnProperty(r)&&("username"==r&&"The username field is required."!=t.error.errors[r]&&e.form.controls.username.enable(),e.form.controls[r].setErrors(t.error.errors[r]))}))}}]),e}()).\u0275fac=function(e){return new(e||I)(c.Qb(b),c.Qb(f.a),c.Qb(m.g))},I.\u0275cmp=c.Kb({type:I,selectors:[["app-create"]],decls:36,vars:9,consts:[[1,"fa","fa-user-plus"],["autocomplete","off",3,"formGroup","submit"],[1,"row"],[1,"col-lg-4"],["class","alert alert-danger",4,"ngIf"],[1,"full-width"],["matInput","","placeholder","Firstname",3,"formControl","change","keydown","keyup"],["matInput","","placeholder","Lastname",3,"formControl","change","keydown","keyup"],["matInput","","placeholder","Username",3,"formControl"],["mat-raised-button","","color","primary"],[1,"fa","fa-paper-plane"],["mat-raised-button","","color","basic","routerLink","/users"],[1,"fa","fa-times"],[1,"alert","alert-danger"]],template:function(e,t){1&e&&(c.Wb(0,"h1"),c.Rb(1,"i",0),c.Kc(2," Create User Account\n"),c.Vb(),c.Wb(3,"form",1),c.ic("submit",(function(e){return t.submit()})),c.Wb(4,"div",2),c.Wb(5,"div",3),c.Wb(6,"mat-card"),c.Wb(7,"mat-card-content"),c.Ic(8,k,2,1,"div",4),c.Wb(9,"mat-form-field",5),c.Wb(10,"input",6),c.ic("change",(function(e){return t.setUsername()}))("keydown",(function(e){return t.setUsername()}))("keyup",(function(e){return t.setUsername()})),c.Vb(),c.Wb(11,"mat-error"),c.Kc(12),c.Vb(),c.Vb(),c.Wb(13,"mat-form-field",5),c.Wb(14,"input",7),c.ic("change",(function(e){return t.setUsername()}))("keydown",(function(e){return t.setUsername()}))("keyup",(function(e){return t.setUsername()})),c.Vb(),c.Wb(15,"mat-error"),c.Kc(16),c.Vb(),c.Vb(),c.Rb(17,"br"),c.Rb(18,"br"),c.Rb(19,"br"),c.Wb(20,"mat-form-field",5),c.Rb(21,"input",8),c.Wb(22,"mat-error"),c.Kc(23),c.Vb(),c.Vb(),c.Rb(24,"br"),c.Rb(25,"br"),c.Kc(26," Password: "),c.Wb(27,"strong"),c.Kc(28),c.Vb(),c.Vb(),c.Wb(29,"mat-card-actions"),c.Wb(30,"button",9),c.Rb(31,"i",10),c.Kc(32," Submit"),c.Vb(),c.Wb(33,"button",11),c.Rb(34,"i",12),c.Kc(35," Cancel"),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb()),2&e&&(c.Cb(3),c.sc("formGroup",t.form),c.Cb(5),c.sc("ngIf",t.error),c.Cb(2),c.sc("formControl",t.form.controls.firstname),c.Cb(2),c.Lc(t.form.controls.firstname.errors),c.Cb(2),c.sc("formControl",t.form.controls.lastname),c.Cb(2),c.Lc(t.form.controls.lastname.errors),c.Cb(5),c.sc("formControl",t.form.controls.username),c.Cb(2),c.Lc(t.form.controls.username.errors),c.Cb(5),c.Lc(t.form.controls.password.value))},directives:[s.t,s.l,s.f,l.a,l.c,a.l,d.b,h.a,s.b,s.k,s.d,d.a,l.b,C.b,m.h],styles:[""]}),I),_=r("+0xr"),P=r("/RhQ");function K(e,t){1&e&&(c.Wb(0,"th",15),c.Kc(1," Username "),c.Vb())}function O(e,t){if(1&e&&(c.Wb(0,"td",16),c.Rb(1,"i",17),c.Kc(2),c.Vb()),2&e){var r=t.$implicit;c.Cb(2),c.Mc(" ",r.username," ")}}function U(e,t){1&e&&(c.Wb(0,"th",15),c.Kc(1," Firstname "),c.Vb())}function M(e,t){if(1&e&&(c.Wb(0,"td",16),c.Kc(1),c.nc(2,"titlecase"),c.Vb()),2&e){var r=t.$implicit;c.Cb(1),c.Mc(" ",c.oc(2,1,r.firstname)," ")}}function S(e,t){1&e&&(c.Wb(0,"th",15),c.Kc(1," Lastname "),c.Vb())}function L(e,t){if(1&e&&(c.Wb(0,"td",16),c.Kc(1),c.nc(2,"titlecase"),c.Vb()),2&e){var r=t.$implicit;c.Cb(1),c.Mc(" ",c.oc(2,1,r.lastname)," ")}}function D(e,t){1&e&&(c.Wb(0,"th",15),c.Kc(1," Created "),c.Vb())}function j(e,t){if(1&e&&(c.Wb(0,"td",16),c.Kc(1),c.nc(2,"titlecase"),c.nc(3,"dfnsDistanceInWordsToNow"),c.nc(4,"parseDate"),c.Vb()),2&e){var r=t.$implicit;c.Cb(1),c.Mc(" ",c.oc(2,1,c.oc(3,3,c.oc(4,5,r.created_at)))," ")}}function F(e,t){1&e&&(c.Wb(0,"th",15),c.Kc(1," Actions "),c.Vb())}function T(e,t){if(1&e&&(c.Wb(0,"td",16),c.Wb(1,"button",18),c.Rb(2,"i",19),c.Vb(),c.Vb()),2&e){var r=t.$implicit;c.Cb(1),c.sc("routerLink","/users/"+r.id+"/edit")}}function q(e,t){1&e&&c.Rb(0,"tr",20)}function Q(e,t){1&e&&c.Rb(0,"tr",21)}var x,A,z=[{path:"",component:(x=function(){function e(t){_classCallCheck(this,e),this.userService=t,this.displayedColumns=["username","firstname","lastname","created_at","actions"],this.users=[],this.queryParams={q:"",page:1},this.meta={},this.d=new Date}return _createClass(e,[{key:"ngOnInit",value:function(){this.fetchUsers()}},{key:"fetchUsers",value:function(){var e=this;this.userService.query({params:this.queryParams}).subscribe((function(t){e.meta=e.userService.getMeta(),e.users=t}))}},{key:"makeid",value:function(e){for(var t="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=r.length,o=0;o<e;o++)t+=r.charAt(Math.floor(Math.random()*n));return t}}]),e}(),x.\u0275fac=function(e){return new(e||x)(c.Qb(b))},x.\u0275cmp=c.Kb({type:x,selectors:[["app-index"]],decls:32,vars:4,consts:[[1,"fa","fa-users"],["mat-raised-button","","color","primary","routerLink","/users/create","rou",""],["matInput","","autocomplete","off",3,"ngModel","ngModelChange","keydown.enter"],["mat-button","","matSuffix","","mat-icon-button","","aria-label","Clear"],[1,"fa","fa-search"],["mat-table","",1,"mat-elevation-28",3,"dataSource"],["matColumnDef","username"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","firstname"],["matColumnDef","lastname"],["matColumnDef","created_at"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell",""],[1,"fa","fa-user-circle"],["mat-raised-button","","color","basic",3,"routerLink"],[1,"fa","fa-edit"],["mat-header-row",""],["mat-row",""]],template:function(e,t){1&e&&(c.Wb(0,"h1"),c.Rb(1,"i",0),c.Kc(2," Users "),c.Wb(3,"a",1),c.Kc(4,"New"),c.Vb(),c.Vb(),c.Wb(5,"mat-card"),c.Wb(6,"mat-card-header"),c.Wb(7,"mat-form-field"),c.Wb(8,"input",2),c.ic("ngModelChange",(function(e){return t.queryParams.q=e}))("keydown.enter",(function(e){return t.fetchUsers()})),c.Vb(),c.Wb(9,"button",3),c.Rb(10,"i",4),c.Vb(),c.Vb(),c.Vb(),c.Wb(11,"mat-card-content"),c.Wb(12,"table",5),c.Ub(13,6),c.Ic(14,K,2,0,"th",7),c.Ic(15,O,3,1,"td",8),c.Tb(),c.Ub(16,9),c.Ic(17,U,2,0,"th",7),c.Ic(18,M,3,3,"td",8),c.Tb(),c.Ub(19,10),c.Ic(20,S,2,0,"th",7),c.Ic(21,L,3,3,"td",8),c.Tb(),c.Ub(22,11),c.Ic(23,D,2,0,"th",7),c.Ic(24,j,5,7,"td",8),c.Tb(),c.Ub(25,12),c.Ic(26,F,2,0,"th",7),c.Ic(27,T,3,1,"td",8),c.Tb(),c.Ic(28,q,1,0,"tr",13),c.Ic(29,Q,1,0,"tr",14),c.Vb(),c.Rb(30,"br"),c.Rb(31,"br"),c.Vb(),c.Vb()),2&e&&(c.Cb(8),c.sc("ngModel",t.queryParams.q),c.Cb(4),c.sc("dataSource",t.users),c.Cb(16),c.sc("matHeaderRowDef",t.displayedColumns),c.Cb(1),c.sc("matRowDefColumns",t.displayedColumns))},directives:[C.a,m.i,l.a,l.d,d.b,h.a,s.b,s.k,s.n,C.b,d.f,l.c,_.j,_.c,_.e,_.b,_.g,_.i,_.d,_.a,m.h,_.f,_.h],pipes:[a.t,o.c,P.a],styles:["table[_ngcontent-%COMP%]{width:100%}"]}),x)},{path:"create",component:R},{path:":id/edit",component:g}],E=((A=function e(){_classCallCheck(this,e)}).\u0275mod=c.Ob({type:A}),A.\u0275inj=c.Nb({factory:function(e){return new(e||A)},imports:[[m.j.forChild(z)],m.j]}),A),G=r("FpXt");r.d(t,"UsersModule",(function(){return N}));var H,N=((H=function e(){_classCallCheck(this,e)}).\u0275mod=c.Ob({type:H}),H.\u0275inj=c.Nb({factory:function(e){return new(e||H)},imports:[[a.c,E,G.a,o.b.forRoot()]]}),H)}}]);