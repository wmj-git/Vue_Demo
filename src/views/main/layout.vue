<template>
  <div class="em_layout">

    <!--主菜单-->
    <template v-for="item in navData">
      <em-nav :data="item"></em-nav>
    </template>

    <!--地图工具-->
    <em-tools></em-tools>
    <!--logo-->
    <em-logo></em-logo>
    <!--报警器-->
    <em-warn></em-warn>

    <!--{{wins}}-->
    <!--功能窗口-->
    <template v-for="win in wins" v-if="win.show">
      <template v-if="win.winLayout=='1'">
        <win :id="win.system_id" :data="win">
          <el-row :gutter="8" v-if="win.children">
            <template v-for="component in win.children">
              <el-col :span="component.winSpan" :offset="component.winOffset">
                <component :is="component.component" :data="component"></component>
              </el-col>
            </template>
          </el-row>
        </win>
      </template>
    </template>
    <!--对话框-->
    <template v-for="dialog in dialogGroup">
      <template v-if="dialog.dialogLayout=='1'">
        <em-dialog :id="dialog.system_id" :data="dialog"></em-dialog>
      </template>
    </template>
    <!--场景-->
    <router-view name="scene"/>
    <!-- 控制透明度的滑动条-->
    <em-slider></em-slider>
    <!--底部-->
    <em-bottom></em-bottom>
  </div>
</template>

<script>

  import {refreshToken} from '@/api/login';
  import {getNowFormatDate} from '@/utils/tools';
  import {
    setToken, setTokenTime, getTokenTime,
    TokenName, RefreshTokenName, getExpires, setExpires
  } from '@/utils/auth';

  import splitPane from 'vue-splitpane';

  // 容器组件
  import win from "@/app_components/win/win";
  import emDialog from "@/app_components/emDialog/emDialog";

  // 功能组件
  import emTable from "@/app_components/emTable/emTable";
  import emTree from "@/app_components/emTree/emTree";
  import emForm from "@/app_components/emForm/emForm";
  import emButtonGroup from "@/app_components/emButtonGroup/emButtonGroup";
  import buttonGroup from "@/app_components/buttonGroup/buttonGroup";

  //公用组件


  //系统组件
  import emLogo from "./components/emLogo/emLogo";
  import emTools from "./components/emTools/emTools";
  import emWarn from "./components/emWarn/emWarn";
  import emSlider from "./components/emSlider/emSlider";
  import emNav from "./components/emNav/emNav";
  import emMenu from "./components/emMenu/emMenu";
  import emBottom from "./components/emBottom/emBottom";


  export default {
    data() {
      return {
        id: "sysLayer"
      };
    },
    components: {

      splitPane,//拖动边线

      //start/公用组件=============
      win,
      emTable,
      emTree,
      emForm,
      emDialog,
      emButtonGroup,
      buttonGroup,
      //end/公用组件=============

      //start/局部组件=============
      emMenu,
      emNav,
      emBottom,
      emLogo,//logo组件
      emTools,//场景工具
      emWarn,//火灾报警
      emSlider,//透明度控制
      //end/局部组件=============

    },
    computed: {
      navData: function () {
        return this.$store.getters["user/navData"];
      },
      wins: function () {
        return this.$store.getters["user/win"];
      },
      dialogGroup: function () {
        return this.$store.getters["user/dialog"];
      }
    },
    methods: {
      refreshTokenFn() {//刷新token
        setInterval(() => {
          let _time = getNowFormatDate().timestamp - getTokenTime();
          let _expires = getExpires();
          // console.log(_time);
          if (_time < _expires - 200000) {
            return;
          }
          // alert(_time);
          this.refreshToken();
        }, 120000);
      },
      refreshToken() {//刷新token
        let _RefreshToken = this.$store.getters["user/refreshToken"];
        // console.log(_RefreshToken);
        refreshToken({
          [RefreshTokenName]: _RefreshToken
        }).then(response => {
          let data = response.data;
          this.$store.commit("user/set_token", data[TokenName]);
          setToken(data[TokenName]);
          let _token_time = getNowFormatDate().timestamp;
          this.$store.commit("user/set_token_time", _token_time);
          setTokenTime(_token_time);

          // console.log(data);
        });
      }
    },
    created() {
      let _this = this;
      //刷新token
      this.refreshTokenFn();
      //刷新ui数据
      this.$store.dispatch("user/systemUI", {}).then((response) => {
        console.log(response);
      });

    },
    mounted() {
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }

  };
</script>
<style lang="scss" scoped>
  @import "layout";
</style>
