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
    <!--<em_dialogs></em_dialogs>-->
    <!--场景-->
    <router-view name="scene"/>
    <!-- 控制透明度的滑动条-->
    <em-slider></em-slider>
    <!--底部-->
    <em-bottom></em-bottom>
  </div>
</template>

<script>

  import {nav, winComponent} from './data/db';
  import {refreshToken} from '@/api/login';
  import {getNowFormatDate, treeStructure} from '@/utils/tools';
  import {
    setToken, setTokenTime, getTokenTime,
    TokenName, RefreshTokenName, getExpires, setExpires
  } from '@/utils/auth';

  import splitPane from 'vue-splitpane';
  import splitpane from "@/components/splitpane/splitpane";

  //公用组件
  import win from "@/app_components/win/win";
  import emTable from "@/app_components/emTable/emTable";
  import emForm from "@/app_components/emForm/emForm";
  import treeForm from "@/app_components/treeFrom/treeForm";
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

      splitpane,//拖动边线

      //start/公用组件=============
      win,
      emMenu,
      emNav,
      emBottom,
      emTable,
      emForm,
      treeForm,
      buttonGroup,
      //end/公用组件=============

      //start/局部组件=============
      emLogo,//logo组件
      emTools,//场景工具
      emWarn,//火灾报警
      emSlider,//透明度控制
      //end/局部组件=============

    },
    computed: {
      navData: function () {
        let _data = [];
        let _systemData = this.$store.getters["user/systemData"];

        if (_systemData && _systemData.length > 0) {
          _systemData.forEach(function (_obj) {
            nav.systemType.forEach(function (_item) {
              if (_obj.system_type === _item) {
                _data.push(_obj);
              }
            });
          });
          _data = treeStructure(_data);
        }

        let ui_data = [];

        for (let _k in _data) {
          _data[_k].forEach(function (_obj) {
            if (_obj.system_type === "nav") {
              ui_data.push(_obj);
            }
          });
        }
        console.log("_systemData");
        console.log(_data);
        console.log(ui_data);
        return ui_data;
      },
      wins: function () {
        // alert("user/win");
        console.log(this.$store.getters["user/win"]);
        let _data = this.$store.getters["user/win"];
        return _data;
      },
      dialogGroup: function () {
        return this.$store.getters["win/dialog"];
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
        let _data = [];
        if (response && response.length > 0) {
          response.forEach(function (_obj) {
            winComponent.systemType.forEach(function (_item) {
              if (_obj.system_type === _item) {
                _data.push(_obj);
              }
            });
          });
          _data = treeStructure(_data);
        }

        let ui_data = [];

        for (let _k in _data) {
          _data[_k].forEach(function (_obj) {
            if (_obj.system_type === "win") {
              ui_data.push(_obj);
            }
          });
        }
        _this.$store.commit("user/set_win", {
          win: ui_data
        });//解析浮动窗口数据

        console.log(this.wins);
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
