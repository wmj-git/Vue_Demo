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
              <el-col :span="component.winSpan">
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
        <em-dialog :id="dialog.system_id" :data="dialog">
          <el-row :gutter="8" v-if="dialog.children">
            <template v-for="component in dialog.children">
              <el-col :span="component.dialogSpan">
                <component :is="component.component" :data="component"></component>
              </el-col>
            </template>
          </el-row>
        </em-dialog>
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
  import {UI} from '@/utils/system/system';
  import {nav, winComponent, systemComponent} from '../../utils/system/data/db';
  import {refreshToken} from '@/api/login';
  import {getNowFormatDate, treeStructure} from '@/utils/tools';
  import {
    setToken, setTokenTime, getTokenTime,
    TokenName, RefreshTokenName, getExpires, setExpires
  } from '@/utils/auth';

  import splitPane from 'vue-splitpane';
  // import splitpane from "@/components/splitpane/splitpane";

  //公用组件
  import win from "@/app_components/win/win";
  import emTable from "@/app_components/emTable/emTable";
  import emForm from "@/app_components/emForm/emForm";
  import emDialog from "@/app_components/emDialog/emDialog";
  import buttonGroup from "@/app_components/buttonGroup/buttonGroup";

  //局部组件
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
      emForm,
      emDialog,
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
        console.log("dialog");
        console.log(this.$store.getters["user/dialog"]);
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
        let winComponent_data = [];
        let systemComponent_data = [];
        let nav_data = [];


        if (response && response.length > 0) {
          response.forEach(function (_obj) {
            winComponent.systemType.forEach(function (_item) {
              if (_obj.system_type === _item) {
                winComponent_data.push(_obj);
              }
            });
            systemComponent.systemType.forEach(function (_item) {
              if (_obj.system_type === _item) {
                systemComponent_data.push(_obj);
              }
            });
            nav.systemType.forEach(function (_item) {
              if (_obj.system_type === _item) {
                nav_data.push(_obj);
              }
            });
          });
          winComponent_data = treeStructure(winComponent_data);
          systemComponent_data = treeStructure(systemComponent_data);
          nav_data = treeStructure(nav_data);
        }

        //解析浮动窗口(win)数据
        let _win_data = [];
        for (let _k in winComponent_data) {
          winComponent_data[_k].forEach(function (_obj) {
            if (_obj.system_type === "win") {
              _win_data.push(_obj);
            }
          });
        }
        _this.$store.commit("user/set_win", {
          win: _win_data
        });

        //解析对话框(dialog)数据
        console.log("systemComponent_data");
        console.log(systemComponent_data);
        let _dialog_data = [];
        for (let _k in systemComponent_data) {
          systemComponent_data[_k].forEach(function (_obj) {
            if (_obj.system_type === "system_layout_dialog") {
              _dialog_data.push(_obj);
            }
          });
        }
        _this.$store.commit("user/set_dialog", {
          dialog: _dialog_data
        });

        //解析主菜单(navData)数据
        let _nav_data = [];
        for (let _k in nav_data) {
          nav_data[_k].forEach(function (_obj) {
            if (_obj.system_type === "nav") {
              _nav_data.push(_obj);
            }
          });
        }
        _this.$store.commit("user/set_navData", {
          navData: _nav_data
        });

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
