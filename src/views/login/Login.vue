<template>
  <div class="em-login-container" id="login_container" ref="loginPage" v-if="show">
    <!--<video autoplay="autoplay" loop="900">
       您的浏览器不支持 video 标签。
       <source src="../../assets/image/login_bg1.mp4" type="video/mp4">
     </video>-->
    <el-col>
      <div class="em-login-title">
        <p>XXXX园林可视化管理平台</p>
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
                <el-input v-model="form.name" type="text" placeholder="请输入用户名" prefix-icon="el-icon-users"  @keyup.enter.="loginFn"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码：" class="login_label">
              <el-col :span="44">
                <el-input v-model="form.pwd" type="password" placeholder="请输入密码" prefix-icon="el-icon-pwd"
                          @keyup.enter.native="loginFn"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked" style="color:#a0a0a0;">记住密码</el-checkbox>
              <!--<el-row class="forgetPwd"><a>忘记密码？</a></el-row>-->
              <el-row>
                <el-button class="em-login-btn em-login-button " @click="reset">重置</el-button>
                <el-button class="em-login-btn em-login-button " @click="loginFn">登录</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </el-col>
  </div>
</template>
<script>

  export default {
    name: "Login",
    data() {
      return {
        form: {
          name: '',
          pwd: ''
        },
        checked: false,
        show:false
      };
    },
    created(){
      console.log(this.$route.query);
      let {tokenId,amUrl,random} = this.$route.query;
      if(tokenId){
        this.$store.dispatch("user/LoginByUsername", {
          tokenId,
          amUrl,
          random,
          isFrom:"pc"
        }).then(this.changeRouter);
      }else{
        this.show=true;
        var name = localStorage.getItem("username");
        var password = localStorage.getItem("password");

        if(name){
          this.form.name=name;
        }
        if(password){
          this.form.pwd=password
        }
      }


    },
    methods: {
      init() {
        this.$store.dispatch("user/systemUI", {}).then((response) => {
          console.log(response);
        });
      },
      reset() {
        this.form.name = "";
        this.form.pwd = "";
      },
      loginFn() {
        let _username = this.form.name;//获取用户名
        let _password = this.form.pwd;//获取密码
        this.$store.dispatch("user/LoginByUsername", {
          username: _username,
          password: _password
        }).then(this.changeRouter);
      },

      changeRouter(response){
        localStorage.setItem('username',this.form.name);
        if(this.checked){
          localStorage.setItem('password',this.form.pwd);
        }
        else{
          localStorage.setItem('password','');
        }
        this.init();
        this.$router.push("/home/map");
      }

    }
  };
</script>
<style lang="scss" scoped>
  @import "_login";
</style>
