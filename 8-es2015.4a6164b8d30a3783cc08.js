(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{BJHQ:function(t,r,e){"use strict";e.r(r);var o=e("kIIl"),s=e("ofXK"),a=e("3Pt+"),n=e("fXoL"),c=e("fB3y"),i=e("tk/3");let m=(()=>{class t extends c.a{constructor(t){super(t,"users"),this.http=t}}return t.\u0275fac=function(r){return new(r||t)(n.ec(i.b))},t.\u0275prov=n.Mb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var b=e("WHFS"),u=e("tyNb"),l=e("Wp6s"),f=e("kmnG"),d=e("qFsG"),h=e("bSwM"),p=e("bTqV");function w(t,r){1&t&&(n.Wb(0,"mat-card-content"),n.Wb(1,"span",5),n.Jc(2,"Loading..."),n.Vb(),n.Vb())}function C(t,r){if(1&t&&(n.Wb(0,"div",12),n.Jc(1),n.Vb()),2&t){const t=n.mc(2);n.Cb(1),n.Lc(" ",t.error," ")}}function V(t,r){if(1&t){const t=n.Xb();n.Wb(0,"mat-card-content"),n.Hc(1,C,2,1,"div",6),n.Wb(2,"mat-form-field",7),n.Rb(3,"input",8),n.Wb(4,"mat-error"),n.Jc(5),n.Vb(),n.Vb(),n.Wb(6,"mat-form-field",7),n.Rb(7,"input",9),n.Wb(8,"mat-error"),n.Jc(9),n.Vb(),n.Vb(),n.Rb(10,"br"),n.Rb(11,"br"),n.Rb(12,"br"),n.Wb(13,"mat-form-field",7),n.Rb(14,"input",10),n.Wb(15,"mat-error"),n.Jc(16),n.Vb(),n.Vb(),n.Wb(17,"mat-checkbox",11),n.ic("change",(function(r){n.Ac(t);const e=n.mc();return e.resetPassword=!e.resetPassword})),n.Jc(18,"Reset Password to "),n.Wb(19,"strong"),n.Jc(20),n.Vb(),n.Vb(),n.Vb()}if(2&t){const t=n.mc();n.Cb(1),n.rc("ngIf",t.error),n.Cb(2),n.rc("formControl",t.form.controls.firstname),n.Cb(2),n.Kc(t.form.controls.firstname.errors),n.Cb(2),n.rc("formControl",t.form.controls.lastname),n.Cb(2),n.Kc(t.form.controls.lastname.errors),n.Cb(5),n.rc("formControl",t.form.controls.username),n.Cb(2),n.Kc(t.form.controls.username.errors),n.Cb(1),n.rc("checked",t.resetPassword),n.Cb(3),n.Kc(t.randomPassword)}}function W(t,r){1&t&&(n.Wb(0,"mat-card-actions"),n.Wb(1,"button",13),n.Rb(2,"i",14),n.Jc(3," Submit"),n.Vb(),n.Wb(4,"button",15),n.Rb(5,"i",16),n.Jc(6," Cancel"),n.Vb(),n.Vb())}let g=(()=>{class t{constructor(t,r,e,o){this.userService=t,this.modalService=r,this.router=e,this.activatedRoute=o,this.isFetching=!0,this.resetPassword=!1,this.form=new a.e({username:new a.c(""),firstname:new a.c(""),lastname:new a.c("")})}ngOnInit(){this.userId=this.activatedRoute.snapshot.params.id,this.isFetching=!0,this.userService.read(this.userId).subscribe(t=>{this.form.setValue({username:t.username,firstname:t.firstname,lastname:t.lastname}),this.isFetching=!1,this.randomizePassword()})}submit(){this.form.valid&&this.userService.update({id:this.userId,username:this.form.controls.username.value,firstname:this.form.controls.firstname.value,lastname:this.form.controls.lastname.value,password:this.randomPassword,reset_password:this.resetPassword}).subscribe(()=>{this.modalService.swal({text:"User succesfully created",icon:"success"}),this.router.navigate(["/users"])},t=>{for(const r in t.error.errors)this.form.controls.hasOwnProperty(r)&&this.form.controls[r].setErrors(t.error.errors[r])})}randomizePassword(){let t="",r="0123456789".length;for(let e=0;e<6;e++)t+="0123456789".charAt(Math.floor(Math.random()*r));this.randomPassword=t}}return t.\u0275fac=function(r){return new(r||t)(n.Qb(m),n.Qb(b.a),n.Qb(u.g),n.Qb(u.a))},t.\u0275cmp=n.Kb({type:t,selectors:[["app-edit"]],decls:10,vars:4,consts:[[1,"fa","fa-user-edit"],["autocomplete","off",3,"formGroup","submit"],[1,"row"],[1,"col-lg-4"],[4,"ngIf"],[1,"text-muted"],["class","alert alert-danger",4,"ngIf"],[1,"full-width"],["matInput","","placeholder","Firstname",3,"formControl"],["matInput","","placeholder","Lastname",3,"formControl"],["matInput","","placeholder","Username",3,"formControl"],["color","primary",3,"checked","change"],[1,"alert","alert-danger"],["mat-raised-button","","color","primary"],[1,"fa","fa-paper-plane"],["mat-raised-button","","color","basic","routerLink","/users"],[1,"fa","fa-times"]],template:function(t,r){1&t&&(n.Wb(0,"h1"),n.Rb(1,"i",0),n.Jc(2," Edit User Account\n"),n.Vb(),n.Wb(3,"form",1),n.ic("submit",(function(t){return r.submit()})),n.Wb(4,"div",2),n.Wb(5,"div",3),n.Wb(6,"mat-card"),n.Hc(7,w,3,0,"mat-card-content",4),n.Hc(8,V,21,9,"mat-card-content",4),n.Hc(9,W,7,0,"mat-card-actions",4),n.Vb(),n.Vb(),n.Vb(),n.Vb()),2&t&&(n.Cb(3),n.rc("formGroup",r.form),n.Cb(4),n.rc("ngIf",r.isFetching),n.Cb(1),n.rc("ngIf",0==r.isFetching),n.Cb(1),n.rc("ngIf",0==r.isFetching))},directives:[a.t,a.l,a.f,l.a,s.l,l.c,f.b,d.a,a.b,a.k,a.d,f.a,h.a,l.b,p.b,u.h],styles:[""]}),t})();function v(t,r){if(1&t&&(n.Wb(0,"div",13),n.Jc(1),n.Vb()),2&t){const t=n.mc();n.Cb(1),n.Lc(" ",t.error," ")}}let y=(()=>{class t{constructor(t,r,e){this.userService=t,this.modalService=r,this.router=e,this.form=new a.e({username:new a.c(""),firstname:new a.c(""),lastname:new a.c(""),password:new a.c("")})}ngOnInit(){this.randomizePassword(),this.form.controls.username.disable()}setUsername(){let t=this.form.controls.firstname.value,r=this.form.controls.lastname.value;t.trim().length>0&&r.trim().length>0?this.form.controls.username.setValue(t.charAt(0)+"."+r):this.form.controls.username.setValue("")}randomizePassword(){let t="",r="0123456789".length;for(let e=0;e<6;e++)t+="0123456789".charAt(Math.floor(Math.random()*r));this.form.controls.password.setValue(t)}submit(){this.form.valid&&this.userService.create({username:this.form.controls.username.value,firstname:this.form.controls.firstname.value,lastname:this.form.controls.lastname.value,password:this.form.controls.password.value}).subscribe(()=>{this.modalService.swal({text:"User succesfully created",icon:"success"}),this.router.navigate(["/users"])},t=>{for(const r in t.error.errors)this.form.controls.hasOwnProperty(r)&&("username"==r&&"The username field is required."!=t.error.errors[r]&&this.form.controls.username.enable(),this.form.controls[r].setErrors(t.error.errors[r]))})}}return t.\u0275fac=function(r){return new(r||t)(n.Qb(m),n.Qb(b.a),n.Qb(u.g))},t.\u0275cmp=n.Kb({type:t,selectors:[["app-create"]],decls:36,vars:9,consts:[[1,"fa","fa-user-plus"],["autocomplete","off",3,"formGroup","submit"],[1,"row"],[1,"col-lg-4"],["class","alert alert-danger",4,"ngIf"],[1,"full-width"],["matInput","","placeholder","Firstname",3,"formControl","change","keydown","keyup"],["matInput","","placeholder","Lastname",3,"formControl","change","keydown","keyup"],["matInput","","placeholder","Username",3,"formControl"],["mat-raised-button","","color","primary"],[1,"fa","fa-paper-plane"],["mat-raised-button","","color","basic","routerLink","/users"],[1,"fa","fa-times"],[1,"alert","alert-danger"]],template:function(t,r){1&t&&(n.Wb(0,"h1"),n.Rb(1,"i",0),n.Jc(2," Create User Account\n"),n.Vb(),n.Wb(3,"form",1),n.ic("submit",(function(t){return r.submit()})),n.Wb(4,"div",2),n.Wb(5,"div",3),n.Wb(6,"mat-card"),n.Wb(7,"mat-card-content"),n.Hc(8,v,2,1,"div",4),n.Wb(9,"mat-form-field",5),n.Wb(10,"input",6),n.ic("change",(function(t){return r.setUsername()}))("keydown",(function(t){return r.setUsername()}))("keyup",(function(t){return r.setUsername()})),n.Vb(),n.Wb(11,"mat-error"),n.Jc(12),n.Vb(),n.Vb(),n.Wb(13,"mat-form-field",5),n.Wb(14,"input",7),n.ic("change",(function(t){return r.setUsername()}))("keydown",(function(t){return r.setUsername()}))("keyup",(function(t){return r.setUsername()})),n.Vb(),n.Wb(15,"mat-error"),n.Jc(16),n.Vb(),n.Vb(),n.Rb(17,"br"),n.Rb(18,"br"),n.Rb(19,"br"),n.Wb(20,"mat-form-field",5),n.Rb(21,"input",8),n.Wb(22,"mat-error"),n.Jc(23),n.Vb(),n.Vb(),n.Rb(24,"br"),n.Rb(25,"br"),n.Jc(26," Password: "),n.Wb(27,"strong"),n.Jc(28),n.Vb(),n.Vb(),n.Wb(29,"mat-card-actions"),n.Wb(30,"button",9),n.Rb(31,"i",10),n.Jc(32," Submit"),n.Vb(),n.Wb(33,"button",11),n.Rb(34,"i",12),n.Jc(35," Cancel"),n.Vb(),n.Vb(),n.Vb(),n.Vb(),n.Vb(),n.Vb()),2&t&&(n.Cb(3),n.rc("formGroup",r.form),n.Cb(5),n.rc("ngIf",r.error),n.Cb(2),n.rc("formControl",r.form.controls.firstname),n.Cb(2),n.Kc(r.form.controls.firstname.errors),n.Cb(2),n.rc("formControl",r.form.controls.lastname),n.Cb(2),n.Kc(r.form.controls.lastname.errors),n.Cb(5),n.rc("formControl",r.form.controls.username),n.Cb(2),n.Kc(r.form.controls.username.errors),n.Cb(5),n.Kc(r.form.controls.password.value))},directives:[a.t,a.l,a.f,l.a,l.c,s.l,f.b,d.a,a.b,a.k,a.d,f.a,l.b,p.b,u.h],styles:[""]}),t})();var R=e("+0xr"),J=e("yNUO");let k=(()=>{class t{transform(t){return J(t)}}return t.\u0275fac=function(r){return new(r||t)},t.\u0275pipe=n.Pb({name:"parseDate",type:t,pure:!0}),t})();function I(t,r){1&t&&(n.Wb(0,"th",15),n.Jc(1," Username "),n.Vb())}function U(t,r){if(1&t&&(n.Wb(0,"td",16),n.Rb(1,"i",17),n.Jc(2),n.Vb()),2&t){const t=r.$implicit;n.Cb(2),n.Lc(" ",t.username," ")}}function P(t,r){1&t&&(n.Wb(0,"th",15),n.Jc(1," Firstname "),n.Vb())}function H(t,r){if(1&t&&(n.Wb(0,"td",16),n.Jc(1),n.nc(2,"titlecase"),n.Vb()),2&t){const t=r.$implicit;n.Cb(1),n.Lc(" ",n.oc(2,1,t.firstname)," ")}}function S(t,r){1&t&&(n.Wb(0,"th",15),n.Jc(1," Lastname "),n.Vb())}function D(t,r){if(1&t&&(n.Wb(0,"td",16),n.Jc(1),n.nc(2,"titlecase"),n.Vb()),2&t){const t=r.$implicit;n.Cb(1),n.Lc(" ",n.oc(2,1,t.lastname)," ")}}function L(t,r){1&t&&(n.Wb(0,"th",15),n.Jc(1," Created "),n.Vb())}function M(t,r){if(1&t&&(n.Wb(0,"td",16),n.Jc(1),n.nc(2,"titlecase"),n.nc(3,"dfnsDistanceInWordsToNow"),n.nc(4,"parseDate"),n.Vb()),2&t){const t=r.$implicit;n.Cb(1),n.Lc(" ",n.oc(2,1,n.oc(3,3,n.oc(4,5,t.created_at)))," ")}}function F(t,r){1&t&&(n.Wb(0,"th",15),n.Jc(1," Actions "),n.Vb())}function K(t,r){if(1&t&&(n.Wb(0,"td",16),n.Wb(1,"button",18),n.Rb(2,"i",19),n.Vb(),n.Vb()),2&t){const t=r.$implicit;n.Cb(1),n.rc("routerLink","/users/"+t.id+"/edit")}}function q(t,r){1&t&&n.Rb(0,"tr",20)}function O(t,r){1&t&&n.Rb(0,"tr",21)}const Q=[{path:"",component:(()=>{class t{constructor(t){this.userService=t,this.displayedColumns=["username","firstname","lastname","created_at","actions"],this.users=[],this.queryParams={q:"",page:1},this.meta={},this.d=new Date}ngOnInit(){this.fetchUsers()}fetchUsers(){this.userService.query({params:this.queryParams}).subscribe(t=>{this.meta=this.userService.getMeta(),this.users=t})}makeid(t){for(var r="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=e.length,s=0;s<t;s++)r+=e.charAt(Math.floor(Math.random()*o));return r}}return t.\u0275fac=function(r){return new(r||t)(n.Qb(m))},t.\u0275cmp=n.Kb({type:t,selectors:[["app-index"]],decls:32,vars:4,consts:[[1,"fa","fa-users"],["mat-raised-button","","color","primary","routerLink","/users/create","rou",""],["matInput","","autocomplete","off",3,"ngModel","ngModelChange","keydown.enter"],["mat-button","","matSuffix","","mat-icon-button","","aria-label","Clear"],[1,"fa","fa-search"],["mat-table","",1,"mat-elevation-28",3,"dataSource"],["matColumnDef","username"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","firstname"],["matColumnDef","lastname"],["matColumnDef","created_at"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell",""],[1,"fa","fa-user-circle"],["mat-raised-button","","color","basic",3,"routerLink"],[1,"fa","fa-edit"],["mat-header-row",""],["mat-row",""]],template:function(t,r){1&t&&(n.Wb(0,"h1"),n.Rb(1,"i",0),n.Jc(2," Users "),n.Wb(3,"a",1),n.Jc(4,"New"),n.Vb(),n.Vb(),n.Wb(5,"mat-card"),n.Wb(6,"mat-card-header"),n.Wb(7,"mat-form-field"),n.Wb(8,"input",2),n.ic("ngModelChange",(function(t){return r.queryParams.q=t}))("keydown.enter",(function(t){return r.fetchUsers()})),n.Vb(),n.Wb(9,"button",3),n.Rb(10,"i",4),n.Vb(),n.Vb(),n.Vb(),n.Wb(11,"mat-card-content"),n.Wb(12,"table",5),n.Ub(13,6),n.Hc(14,I,2,0,"th",7),n.Hc(15,U,3,1,"td",8),n.Tb(),n.Ub(16,9),n.Hc(17,P,2,0,"th",7),n.Hc(18,H,3,3,"td",8),n.Tb(),n.Ub(19,10),n.Hc(20,S,2,0,"th",7),n.Hc(21,D,3,3,"td",8),n.Tb(),n.Ub(22,11),n.Hc(23,L,2,0,"th",7),n.Hc(24,M,5,7,"td",8),n.Tb(),n.Ub(25,12),n.Hc(26,F,2,0,"th",7),n.Hc(27,K,3,1,"td",8),n.Tb(),n.Hc(28,q,1,0,"tr",13),n.Hc(29,O,1,0,"tr",14),n.Vb(),n.Rb(30,"br"),n.Rb(31,"br"),n.Vb(),n.Vb()),2&t&&(n.Cb(8),n.rc("ngModel",r.queryParams.q),n.Cb(4),n.rc("dataSource",r.users),n.Cb(16),n.rc("matHeaderRowDef",r.displayedColumns),n.Cb(1),n.rc("matRowDefColumns",r.displayedColumns))},directives:[p.a,u.i,l.a,l.d,f.b,d.a,a.b,a.k,a.n,p.b,f.f,l.c,R.j,R.c,R.e,R.b,R.g,R.i,R.d,R.a,u.h,R.f,R.h],pipes:[s.t,o.c,k],styles:["table[_ngcontent-%COMP%]{width:100%}"]}),t})()},{path:"create",component:y},{path:":id/edit",component:g}];let x=(()=>{class t{}return t.\u0275mod=n.Ob({type:t}),t.\u0275inj=n.Nb({factory:function(r){return new(r||t)},imports:[[u.j.forChild(Q)],u.j]}),t})();var A=e("FpXt");e.d(r,"UsersModule",(function(){return T}));let T=(()=>{class t{}return t.\u0275mod=n.Ob({type:t}),t.\u0275inj=n.Nb({factory:function(r){return new(r||t)},imports:[[s.c,x,A.a,o.b.forRoot()]]}),t})()}}]);