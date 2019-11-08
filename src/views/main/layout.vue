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
      <template v-if="win.winLayout==='1'">
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
      <template v-else-if="win.winLayout==='2'">
        <win :id="win.system_id" :data="win">
          <div :style="{width: '100%',height:win.setHeight}">
            <split-pane split="vertical" :min-percent='Number(win.minPercent)' :default-percent='Number(win.defaultPercent)'>
              <template v-if="win.children" v-for="component in win.children">
                <template slot="paneL" v-if="win.paneL && component.paneType==='paneL'">
                  <el-col :span="component.winSpan" :offset="component.winOffset">
                    <component :is="component.component" :data="component"></component>
                  </el-col>
                </template>
                <template slot="paneR" v-if="win.paneR && component.paneType==='paneR'">
                  <el-col :span="component.winSpan" :offset="component.winOffset">
                    <component :is="component.component" :data="component"></component>
                  </el-col>
                </template>
              </template>
            </split-pane>
          </div>
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

    <!--抽屉框-->
    <template v-for="drawer in drawerGroup">
      <template v-if="drawer.dialogLayout=='1'">
        <em-drawer :id="drawer.system_id" :data="drawer"></em-drawer>
      </template>
    </template>
  </div>
</template>

<script>

  import {refreshToken} from '@/api/login';
  import {getNowFormatDate, TimeFn} from '@/utils/tools';
  import {
    setToken, setTokenTime, getTokenTime,
    TokenName, RefreshTokenName, getExpires, setExpires
  } from '@/utils/auth';

  import splitPane from 'vue-splitpane';

  // 容器组件
  import win from "@/app_components/win/win";
  import emDialog from "@/app_components/emDialog/emDialog";
  import emDrawer from "@/app_components/emDrawer/emDrawer"

  // 功能组件
  import emTable from "@/app_components/emTable/emTable";
  import emTree from "@/app_components/emTree/emTree";
  import emTransfer from "@/app_components/emTransfer/emTransfer";
  import emForm from "@/app_components/emForm/emForm";
  import emButtonGroup from "@/app_components/emButtonGroup/emButtonGroup";
  import buttonGroup from "@/app_components/buttonGroup/buttonGroup";

  //系统布局组件
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
      win,
      emDialog,
      emDrawer,

      //start/功能组件=============
      emTable,
      emTree,
      emTransfer,
      emForm,
      emButtonGroup,
      buttonGroup,
      //end/公用组件=============

      //start/功能组件=============
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
      },
      drawerGroup: function () {
        return this.$store.getters["user/drawer"];
      }
    },
    methods: {
      refreshTokenFn() {//刷新token
        const tm = new TimeFn("t1", () => {
          let _time = getNowFormatDate().timestamp - getTokenTime();
          let _expires = getExpires();
          // console.log(_time);
          if (_time < _expires - 200000) {
            return;
          }
          // alert(_time);
          this.refreshToken();
        }, () => {
          return true
        }, 120000);
        tm.run();
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
