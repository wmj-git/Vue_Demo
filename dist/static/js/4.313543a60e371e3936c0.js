webpackJsonp([4],{B3B6:function(e,t){},W2Q3:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"Login",data:function(){return{form:{name:"",pwd:""},checked:!1}},created:function(){var e=this;document.onkeydown=function(t){13==window.event.keyCode&&e.enterSearchPwd()}},mounted:function(){this.getCookie()},methods:{init:function(){this.$store.dispatch("user/systemUI",{}).then(function(e){console.log(e)})},reset:function(){this.form.name="",this.form.pwd=""},loginFn:function(){var e=this,t=this.form.name,o=this.form.pwd;1==this.checked?this.setCookie(t,o,7):this.clearCookie(),this.$store.dispatch("user/LoginByUsername",{username:t,password:o}).then(function(t){console.log(t),e.init(),e.$router.push("/home/map")})},enterSearchPwd:function(){this.loginFn()},setCookie:function(e,t,o){var n=new Date;n.setTime(n.getTime()+864e5*o),window.document.cookie="userName="+e+";path=/;expires="+n.toGMTString(),window.document.cookie="userPwd="+t+";path=/;expires="+n.toGMTString()},getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var o=e[t].split("=");"userName"==o[0]?this.form.name=o[1]:"userPwd"==o[0]&&(this.form.pwd=o[1])}},clearCookie:function(){this.setCookie("","",-1)}}},i={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{ref:"loginPage",staticClass:"em-login-container",attrs:{id:"login_container"}},[o("el-col",[o("div",{staticClass:"em-login-title"},[o("p",[e._v("智慧龙华园林可视化管理平台")])]),e._v(" "),o("div",{staticClass:"em-login-content"},[o("el-row",[o("el-form",{ref:"form",staticClass:"em-login-form",attrs:{model:e.form,"label-width":"80px",name:"form"}},[o("el-form-item",{staticClass:"login-label",attrs:{label:""}}),e._v(" "),o("el-col",{attrs:{span:48}},[o("a",{staticClass:"title_bg"}),e._v(" "),o("a",{staticClass:"user_login"},[e._v("用户登录")])]),e._v(" "),o("el-form-item",{staticClass:"login-label",attrs:{label:"用户："}},[o("el-col",{attrs:{span:44}},[o("el-input",{attrs:{type:"text",placeholder:"请输入用户名","prefix-icon":"el-icon-users"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),o("el-form-item",{staticClass:"login_label",attrs:{label:"密码："}},[o("el-col",{attrs:{span:44}},[o("el-input",{attrs:{type:"password",placeholder:"请输入密码","prefix-icon":"el-icon-pwd"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.enterSearchPwd(t)}},model:{value:e.form.pwd,callback:function(t){e.$set(e.form,"pwd",t)},expression:"form.pwd"}})],1)],1),e._v(" "),o("el-form-item",[o("el-checkbox",{staticStyle:{color:"#a0a0a0"},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("记住密码")]),e._v(" "),o("el-row",[o("el-button",{staticClass:"em-login-btn em-login-button ",on:{click:e.reset}},[e._v("重置")]),e._v(" "),o("el-button",{staticClass:"em-login-btn em-login-button ",on:{click:e.loginFn}},[e._v("登录")])],1)],1)],1)],1)],1)])],1)},staticRenderFns:[]};var s=o("C7Lr")(n,i,!1,function(e){o("B3B6")},"data-v-7b562da6",null);t.default=s.exports}});
//# sourceMappingURL=4.313543a60e371e3936c0.js.map