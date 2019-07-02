<template>
  <div class="em-login-container" id="login_container" ref="loginPage">
    <!--<video autoplay="autoplay" loop="900">
       您的浏览器不支持 video 标签。
       <source src="../../assets/image/login_bg1.mp4" type="video/mp4">
     </video>-->
    <el-col>
      <div class="em-login-title">
        <p>智慧龙华园林可视化管理平台</p>
      </div>
      <div class="em-login-content">
        <el-row>
          <el-form ref="form" :model="form" label-width="80px" class="em-login-form" name="form">
            <el-form-item label="" class="login-label">

            </el-form-item>
            <el-col :span="48">
              <a class="title_bg"></a>
              <a class="user_login">用户登录</a>
            </el-col>
            <el-form-item label="用户：" class="login-label">
              <el-col :span="44">
                <el-input v-model="form.name" type="text" placeholder="请输入用户名"  prefix-icon="el-icon-users"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码：" class="login_label">
              <el-col :span="44">
                <el-input v-model="form.pwd" type="password" placeholder="请输入密码"  prefix-icon="el-icon-pwd"
                          @keyup.enter="enterSearchPwd"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked" style="color:#a0a0a0;" >记住密码</el-checkbox>
              <!--<el-row class="forgetPwd"><a>忘记密码？</a></el-row>-->
              <el-row>
                <el-button class="em-reset-btn em-btn-bubbles" @click="reset">重置</el-button>
                <el-button class="em-login-btn em-btn-bubbles" @click="loginFn">登录</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </el-col>
  </div>
</template>
<script>
  export default{
    name: "Login",
    data(){
      return {
        form: {
          name: '',
          pwd: ''
        },
        checked:false
      }
    },
    created() {
      var lett = this;
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
          lett.enterSearchPwd();
        }
      }
    },
    mounted(){
      this.getCookie();
    },
    methods: {
      reset(){
        this.form.name="";
        this.form.pwd="";
      },
      loginFn() {
        let _username= this.form.name;//获取用户名
        let _password=this.form.pwd;//获取密码
        if(this.checked==true) {
          this.setCookie(_username, _password, 7);
        }
        else{
          this.clearCookie();
        }
        this.$store.dispatch("user/LoginByUsername", {
          username: _username,
          password: _password
        }).then((response) => {
          console.log(response);
          this.$router.push("/home/map");

        });
      },
      enterSearchPwd(){
        this.loginFn();
      },
      setCookie(c_name,c_pwd,exdays) {
        var exdate=new Date();//获取时间
        exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
        //字符串拼接cookie
        window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
        window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
      },
      //读取cookie
      getCookie:function () {
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
            //判断查找相对应的值
            if(arr2[0]=='userName'){

              this.form.name=arr2[1];//保存到保存数据的地方

            }else if(arr2[0]=='userPwd'){

              this.form.pwd=arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie:function () {
        this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
      }

    }
  }
</script>
<style  lang="scss" scoped>
  @import "_login";
</style>
