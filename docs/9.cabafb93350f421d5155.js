(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{BJHQ:function(t,r,e){"use strict";e.r(r);var o=e("H6It"),n=e("Valr"),a=e("4YGV"),s=e("QJY3"),c=e("TYT/"),i=e("mrSG"),m=e("fB3y"),b=e("cUzu"),u=function(t){function r(r){var e=t.call(this,r,"users")||this;return e.http=r,e}return Object(i.b)(r,t),r.\u0275fac=function(t){return new(t||r)(c.ec(b.b))},r.\u0275prov=c.Mb({token:r,factory:r.\u0275fac,providedIn:"root"}),r}(m.a),f=e("WHFS"),l=e("DUip"),d=e("17Os"),h=e("eHTH"),p=e("cSbt"),v=e("DjAo"),w=e("p+mS");function C(t,r){1&t&&(c.Wb(0,"mat-card-content"),c.Wb(1,"span",5),c.Kc(2,"Loading..."),c.Vb(),c.Vb())}function V(t,r){if(1&t&&(c.Wb(0,"div",12),c.Kc(1),c.Vb()),2&t){var e=c.mc(2);c.Cb(1),c.Mc(" ",e.error," ")}}function W(t,r){if(1&t){var e=c.Xb();c.Wb(0,"mat-card-content"),c.Ic(1,V,2,1,"div",6),c.Wb(2,"mat-form-field",7),c.Rb(3,"input",8),c.Wb(4,"mat-error"),c.Kc(5),c.Vb(),c.Vb(),c.Wb(6,"mat-form-field",7),c.Rb(7,"input",9),c.Wb(8,"mat-error"),c.Kc(9),c.Vb(),c.Vb(),c.Rb(10,"br"),c.Rb(11,"br"),c.Rb(12,"br"),c.Wb(13,"mat-form-field",7),c.Rb(14,"input",10),c.Wb(15,"mat-error"),c.Kc(16),c.Vb(),c.Vb(),c.Wb(17,"mat-checkbox",11),c.ic("change",(function(t){c.Bc(e);var r=c.mc();return r.resetPassword=!r.resetPassword})),c.Kc(18,"Reset Password to "),c.Wb(19,"strong"),c.Kc(20),c.Vb(),c.Vb(),c.Vb()}if(2&t){var o=c.mc();c.Cb(1),c.sc("ngIf",o.error),c.Cb(2),c.sc("formControl",o.form.controls.firstname),c.Cb(2),c.Lc(o.form.controls.firstname.errors),c.Cb(2),c.sc("formControl",o.form.controls.lastname),c.Cb(2),c.Lc(o.form.controls.lastname.errors),c.Cb(5),c.sc("formControl",o.form.controls.username),c.Cb(2),c.Lc(o.form.controls.username.errors),c.Cb(1),c.sc("checked",o.resetPassword),c.Cb(3),c.Lc(o.randomPassword)}}function g(t,r){1&t&&(c.Wb(0,"mat-card-actions"),c.Wb(1,"button",13),c.Rb(2,"i",14),c.Kc(3," Submit"),c.Vb(),c.Wb(4,"button",15),c.Rb(5,"i",16),c.Kc(6," Cancel"),c.Vb(),c.Vb())}var y=function(){function t(t,r,e,o){this.userService=t,this.modalService=r,this.router=e,this.activatedRoute=o,this.isFetching=!0,this.resetPassword=!1,this.form=new s.e({username:new s.c(""),firstname:new s.c(""),lastname:new s.c("")})}return t.prototype.ngOnInit=function(){var t=this;this.userId=this.activatedRoute.snapshot.params.id,this.isFetching=!0,this.userService.read(this.userId).subscribe((function(r){t.form.setValue({username:r.username,firstname:r.firstname,lastname:r.lastname}),t.isFetching=!1,t.randomizePassword()}))},t.prototype.submit=function(){var t=this;if(this.form.valid){var r=new a.a;r.id=this.userId,r.username=this.form.controls.username.value,r.firstname=this.form.controls.firstname.value,r.lastname=this.form.controls.lastname.value,r.password=this.randomPassword,r.reset_password=this.resetPassword,this.userService.update(r).subscribe((function(){t.modalService.swal({text:"User succesfully created",icon:"success"}),t.router.navigate(["/users"])}),(function(r){for(var e in r.error.errors)t.form.controls.hasOwnProperty(e)&&t.form.controls[e].setErrors(r.error.errors[e])}))}},t.prototype.randomizePassword=function(){for(var t="",r="0123456789".length,e=0;e<6;e++)t+="0123456789".charAt(Math.floor(Math.random()*r));this.randomPassword=t},t.\u0275fac=function(r){return new(r||t)(c.Qb(u),c.Qb(f.a),c.Qb(l.g),c.Qb(l.a))},t.\u0275cmp=c.Kb({type:t,selectors:[["app-edit"]],decls:10,vars:4,consts:[[1,"fa","fa-user-edit"],["autocomplete","off",3,"formGroup","submit"],[1,"row"],[1,"col-lg-4"],[4,"ngIf"],[1,"text-muted"],["class","alert alert-danger",4,"ngIf"],[1,"full-width"],["matInput","","placeholder","Firstname",3,"formControl"],["matInput","","placeholder","Lastname",3,"formControl"],["matInput","","placeholder","Username",3,"formControl"],["color","primary",3,"checked","change"],[1,"alert","alert-danger"],["mat-raised-button","","color","primary"],[1,"fa","fa-paper-plane"],["mat-raised-button","","color","basic","routerLink","/users"],[1,"fa","fa-times"]],template:function(t,r){1&t&&(c.Wb(0,"h1"),c.Rb(1,"i",0),c.Kc(2," Edit User Account\n"),c.Vb(),c.Wb(3,"form",1),c.ic("submit",(function(t){return r.submit()})),c.Wb(4,"div",2),c.Wb(5,"div",3),c.Wb(6,"mat-card"),c.Ic(7,C,3,0,"mat-card-content",4),c.Ic(8,W,21,9,"mat-card-content",4),c.Ic(9,g,7,0,"mat-card-actions",4),c.Vb(),c.Vb(),c.Vb(),c.Vb()),2&t&&(c.Cb(3),c.sc("formGroup",r.form),c.Cb(4),c.sc("ngIf",r.isFetching),c.Cb(1),c.sc("ngIf",0==r.isFetching),c.Cb(1),c.sc("ngIf",0==r.isFetching))},directives:[s.t,s.l,s.f,d.a,n.m,d.c,h.b,p.a,s.b,s.k,s.d,h.a,v.a,d.b,w.b,l.h],styles:[""]}),t}();function I(t,r){if(1&t&&(c.Wb(0,"div",13),c.Kc(1),c.Vb()),2&t){var e=c.mc();c.Cb(1),c.Mc(" ",e.error," ")}}var R=function(){function t(t,r,e){this.userService=t,this.modalService=r,this.router=e,this.form=new s.e({username:new s.c(""),firstname:new s.c(""),lastname:new s.c(""),password:new s.c("")})}return t.prototype.ngOnInit=function(){this.randomizePassword(),this.form.controls.username.disable()},t.prototype.setUsername=function(){var t=this.form.controls.firstname.value,r=this.form.controls.lastname.value;t.trim().length>0&&r.trim().length>0?this.form.controls.username.setValue((t.charAt(0)+"."+r).toLowerCase()):this.form.controls.username.setValue("")},t.prototype.randomizePassword=function(){for(var t="0123456789".length,r=0;r<6;r++)"0123456789".charAt(Math.floor(Math.random()*t));this.form.controls.password.setValue("password")},t.prototype.submit=function(){var t=this;if(this.form.valid){var r=new a.a;r.username=this.form.controls.username.value,r.firstname=this.form.controls.firstname.value,r.lastname=this.form.controls.lastname.value,r.password=this.form.controls.password.value,this.userService.create(r).subscribe((function(){t.modalService.swal({text:"User succesfully created",icon:"success"}),t.router.navigate(["/users"])}),(function(r){for(var e in r.error.errors)t.form.controls.hasOwnProperty(e)&&("username"==e&&"The username field is required."!=r.error.errors[e]&&t.form.controls.username.enable(),t.form.controls[e].setErrors(r.error.errors[e]))}))}},t.\u0275fac=function(r){return new(r||t)(c.Qb(u),c.Qb(f.a),c.Qb(l.g))},t.\u0275cmp=c.Kb({type:t,selectors:[["app-create"]],decls:36,vars:9,consts:[[1,"fa","fa-user-plus"],["autocomplete","off",3,"formGroup","submit"],[1,"row"],[1,"col-lg-4"],["class","alert alert-danger",4,"ngIf"],[1,"full-width"],["matInput","","placeholder","Firstname",3,"formControl","change","keydown","keyup"],["matInput","","placeholder","Lastname",3,"formControl","change","keydown","keyup"],["matInput","","placeholder","Username",3,"formControl"],["mat-raised-button","","color","primary"],[1,"fa","fa-paper-plane"],["mat-raised-button","","color","basic","routerLink","/users"],[1,"fa","fa-times"],[1,"alert","alert-danger"]],template:function(t,r){1&t&&(c.Wb(0,"h1"),c.Rb(1,"i",0),c.Kc(2," Create User Account\n"),c.Vb(),c.Wb(3,"form",1),c.ic("submit",(function(t){return r.submit()})),c.Wb(4,"div",2),c.Wb(5,"div",3),c.Wb(6,"mat-card"),c.Wb(7,"mat-card-content"),c.Ic(8,I,2,1,"div",4),c.Wb(9,"mat-form-field",5),c.Wb(10,"input",6),c.ic("change",(function(t){return r.setUsername()}))("keydown",(function(t){return r.setUsername()}))("keyup",(function(t){return r.setUsername()})),c.Vb(),c.Wb(11,"mat-error"),c.Kc(12),c.Vb(),c.Vb(),c.Wb(13,"mat-form-field",5),c.Wb(14,"input",7),c.ic("change",(function(t){return r.setUsername()}))("keydown",(function(t){return r.setUsername()}))("keyup",(function(t){return r.setUsername()})),c.Vb(),c.Wb(15,"mat-error"),c.Kc(16),c.Vb(),c.Vb(),c.Rb(17,"br"),c.Rb(18,"br"),c.Rb(19,"br"),c.Wb(20,"mat-form-field",5),c.Rb(21,"input",8),c.Wb(22,"mat-error"),c.Kc(23),c.Vb(),c.Vb(),c.Rb(24,"br"),c.Rb(25,"br"),c.Kc(26," Password: "),c.Wb(27,"strong"),c.Kc(28),c.Vb(),c.Vb(),c.Wb(29,"mat-card-actions"),c.Wb(30,"button",9),c.Rb(31,"i",10),c.Kc(32," Submit"),c.Vb(),c.Wb(33,"button",11),c.Rb(34,"i",12),c.Kc(35," Cancel"),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb()),2&t&&(c.Cb(3),c.sc("formGroup",r.form),c.Cb(5),c.sc("ngIf",r.error),c.Cb(2),c.sc("formControl",r.form.controls.firstname),c.Cb(2),c.Lc(r.form.controls.firstname.errors),c.Cb(2),c.sc("formControl",r.form.controls.lastname),c.Cb(2),c.Lc(r.form.controls.lastname.errors),c.Cb(5),c.sc("formControl",r.form.controls.username),c.Cb(2),c.Lc(r.form.controls.username.errors),c.Cb(5),c.Lc(r.form.controls.password.value))},directives:[s.t,s.l,s.f,d.a,d.c,n.m,h.b,p.a,s.b,s.k,s.d,h.a,d.b,w.b,l.h],styles:[""]}),t}(),K=e("ETwC"),U=e("/RhQ");function k(t,r){1&t&&(c.Wb(0,"th",15),c.Kc(1," Username "),c.Vb())}function S(t,r){if(1&t&&(c.Wb(0,"td",16),c.Rb(1,"i",17),c.Kc(2),c.Vb()),2&t){var e=r.$implicit;c.Cb(2),c.Mc(" ",e.username," ")}}function P(t,r){1&t&&(c.Wb(0,"th",15),c.Kc(1," Firstname "),c.Vb())}function M(t,r){if(1&t&&(c.Wb(0,"td",16),c.Kc(1),c.nc(2,"titlecase"),c.Vb()),2&t){var e=r.$implicit;c.Cb(1),c.Mc(" ",c.oc(2,1,e.firstname)," ")}}function D(t,r){1&t&&(c.Wb(0,"th",15),c.Kc(1," Lastname "),c.Vb())}function L(t,r){if(1&t&&(c.Wb(0,"td",16),c.Kc(1),c.nc(2,"titlecase"),c.Vb()),2&t){var e=r.$implicit;c.Cb(1),c.Mc(" ",c.oc(2,1,e.lastname)," ")}}function A(t,r){1&t&&(c.Wb(0,"th",15),c.Kc(1," Created "),c.Vb())}function F(t,r){if(1&t&&(c.Wb(0,"td",16),c.Kc(1),c.nc(2,"titlecase"),c.nc(3,"dfnsDistanceInWordsToNow"),c.nc(4,"parseDate"),c.Vb()),2&t){var e=r.$implicit;c.Cb(1),c.Mc(" ",c.oc(2,1,c.oc(3,3,c.oc(4,5,e.created_at)))," ")}}function Q(t,r){1&t&&(c.Wb(0,"th",15),c.Kc(1," Actions "),c.Vb())}function T(t,r){if(1&t&&(c.Wb(0,"td",16),c.Wb(1,"button",18),c.Rb(2,"i",19),c.Vb(),c.Vb()),2&t){var e=r.$implicit;c.Cb(1),c.sc("routerLink","/users/"+e.id+"/edit")}}function O(t,r){1&t&&c.Rb(0,"tr",20)}function q(t,r){1&t&&c.Rb(0,"tr",21)}var H=function(){function t(t){this.userService=t,this.displayedColumns=["username","firstname","lastname","created_at","actions"],this.users=[],this.queryParams={q:"",page:1},this.meta={},this.d=new Date}return t.prototype.ngOnInit=function(){this.fetchUsers()},t.prototype.fetchUsers=function(){var t=this;this.userService.query({params:this.queryParams}).subscribe((function(r){t.meta=t.userService.getMeta(),t.users=r}))},t.prototype.makeid=function(t){for(var r="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=e.length,n=0;n<t;n++)r+=e.charAt(Math.floor(Math.random()*o));return r},t.\u0275fac=function(r){return new(r||t)(c.Qb(u))},t.\u0275cmp=c.Kb({type:t,selectors:[["app-index"]],decls:32,vars:4,consts:[[1,"fa","fa-users"],["mat-raised-button","","color","primary","routerLink","/users/create","rou",""],["matInput","","autocomplete","off",3,"ngModel","ngModelChange","keydown.enter"],["mat-button","","matSuffix","","mat-icon-button","","aria-label","Clear"],[1,"fa","fa-search"],["mat-table","",1,"mat-elevation-28",3,"dataSource"],["matColumnDef","username"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","firstname"],["matColumnDef","lastname"],["matColumnDef","created_at"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell",""],[1,"fa","fa-user-circle"],["mat-raised-button","","color","basic",3,"routerLink"],[1,"fa","fa-edit"],["mat-header-row",""],["mat-row",""]],template:function(t,r){1&t&&(c.Wb(0,"h1"),c.Rb(1,"i",0),c.Kc(2," Users "),c.Wb(3,"a",1),c.Kc(4,"New"),c.Vb(),c.Vb(),c.Wb(5,"mat-card"),c.Wb(6,"mat-card-header"),c.Wb(7,"mat-form-field"),c.Wb(8,"input",2),c.ic("ngModelChange",(function(t){return r.queryParams.q=t}))("keydown.enter",(function(t){return r.fetchUsers()})),c.Vb(),c.Wb(9,"button",3),c.Rb(10,"i",4),c.Vb(),c.Vb(),c.Vb(),c.Wb(11,"mat-card-content"),c.Wb(12,"table",5),c.Ub(13,6),c.Ic(14,k,2,0,"th",7),c.Ic(15,S,3,1,"td",8),c.Tb(),c.Ub(16,9),c.Ic(17,P,2,0,"th",7),c.Ic(18,M,3,3,"td",8),c.Tb(),c.Ub(19,10),c.Ic(20,D,2,0,"th",7),c.Ic(21,L,3,3,"td",8),c.Tb(),c.Ub(22,11),c.Ic(23,A,2,0,"th",7),c.Ic(24,F,5,7,"td",8),c.Tb(),c.Ub(25,12),c.Ic(26,Q,2,0,"th",7),c.Ic(27,T,3,1,"td",8),c.Tb(),c.Ic(28,O,1,0,"tr",13),c.Ic(29,q,1,0,"tr",14),c.Vb(),c.Rb(30,"br"),c.Rb(31,"br"),c.Vb(),c.Vb()),2&t&&(c.Cb(8),c.sc("ngModel",r.queryParams.q),c.Cb(4),c.sc("dataSource",r.users),c.Cb(16),c.sc("matHeaderRowDef",r.displayedColumns),c.Cb(1),c.sc("matRowDefColumns",r.displayedColumns))},directives:[w.a,l.i,d.a,d.d,h.b,p.a,s.b,s.k,s.n,w.b,h.f,d.c,K.j,K.c,K.e,K.b,K.g,K.i,K.d,K.a,l.h,K.f,K.h],pipes:[n.u,o.c,U.a],styles:["table[_ngcontent-%COMP%]{width:100%}"]}),t}(),j=e("iPKQ"),x=e("7ZFx"),G=function(){function t(t,r,e){this.authService=t,this.modalService=r,this.p=e}return t.prototype.canActivate=function(t,r){var e=this.authService.currentUser.is_administrator;return 0==e&&this.modalService.toast("Content not allowed for non-admin user","Access Denied","error"),e},t.\u0275fac=function(r){return new(r||t)(c.ec(j.a),c.ec(f.a),c.ec(x.a))},t.\u0275prov=c.Mb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}(),z=[{path:"",component:H},{path:"create",component:R,canActivate:[G]},{path:":id/edit",component:y,canActivate:[G]}],_=function(){function t(){}return t.\u0275mod=c.Ob({type:t}),t.\u0275inj=c.Nb({factory:function(r){return new(r||t)},imports:[[l.j.forChild(z)],l.j]}),t}(),E=e("FpXt");e.d(r,"UsersModule",(function(){return J}));var J=function(){function t(){}return t.\u0275mod=c.Ob({type:t}),t.\u0275inj=c.Nb({factory:function(r){return new(r||t)},imports:[[n.c,_,E.a,o.b.forRoot()]]}),t}()}}]);