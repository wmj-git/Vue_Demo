<template>
  <div class="em_layout">
    <!--顶部标题-->
    <em_logo_title></em_logo_title>
    <!--报警器-->
    <em_warn></em_warn>
    <!--风险等级数据监测-->
    <!--<em_venture></em_venture>-->
    <!--主菜单-->
    <template v-for="item in navData">
      <em-nav :data="item"></em-nav>
    </template>

    <!--工具栏-->
    <em_tools></em_tools>
    <!--功能窗口-->
    <template v-for="win in wins" v-if="win.show">
      <win :id="win.id" :data="win">
        <component :is="win.component" :data="win.component_data"></component>
      </win>
    </template>
    <!--对话框-->
    <em_dialogs></em_dialogs>
    <!--场景-->
    <router-view name="scene"/>
    <!-- 控制透明度的滑动条-->
    <em_slider></em_slider>
    <!--底部-->
    <em-bottom></em-bottom>

  </div>
</template>

<script>

  import {nav} from './data/db';
  import {refreshToken} from '@/api/login';
  import {getNowFormatDate, treeStructure} from '@/utils/tools';
  import {
    setToken,
    setTokenTime,
    getTokenTime,
    TokenName,
    RefreshTokenName,
    getExpires,
    setExpires
  } from '@/utils/auth';
  import win from "@/components/win/win";
  import splitpane from "@/components/splitpane/splitpane";
  import sole_table from "@/components/sole_table/sole_table";
  import list_table from "@/components/list_table/list_table";
  import echart_table from "@/components/echart_table/echart_table";
  import em_dialog from "@/components/em_dialog/em_dialog";
  import button_group from "@/components/button_group/button_group";
  import em_menu from "./components/em_menu/em_menu";
  import emNav from "./components/emNav/emNav";
  import emBottom from "./components/emBottom/emBottom";
  import em_logo_title from "./components/em_title/em_logotitle";
  import em_warn from "./components/em_warn/em_warn";
  import em_venture from "./components/em_venture/em_venture";
  import em_chart_window from "./components/em_chart_window/em_chart_window";
  import em_tools from "./components/em_tools/em_tools";
  import em_slider from "./components/em_slider/em_slider";
  import treeForm from "@/app_components/treeFrom/treeForm";
  import buttonGroup from "@/app_components/buttonGroup/buttonGroup";
  import em_dialogs from "@/components/em_dialogs/em_dialogs";
  import number_show from "./components/number_show/number_show";
  import echart_alone_show from "./components/echart_alone_show/echart_alone_show";
  import echarts_show from "./components/echarts_show/echarts_show";
  import table_show from "./components/table_show/table_show";

  export default {
    data() {
      return {};
    },
    components: {
      win,
      splitpane,
      em_dialog,
      button_group,
      em_menu,
      emNav,
      emBottom,
      em_logo_title,
      em_warn,
      em_venture,
      sole_table,
      list_table,
      echart_table,
      em_chart_window,
      em_tools,
      em_slider,
      treeForm,
      em_dialogs,
      number_show,
      echart_alone_show,
      echarts_show,
      table_show,
      buttonGroup,
    },
    computed: {
      navData: function () {


        let _data=treeStructure(nav.uiData);
        let ui_data=[];

        for( let _k in _data){
          _data[_k].forEach(function (_obj) {
            if(_obj.system_type===nav.systemType[0]){
              ui_data.push(_obj);
            }
          });
        }
        console.log(ui_data);
        return ui_data;
      },
      wins: function () {
        return this.$store.getters["win/win"];
      },
      dialogGroup: function () {
        return this.$store.state.win.dialog;
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
      },

    },
    created() {
      this.refreshTokenFn();//刷新token

    },

  };
</script>
<style lang="scss" scoped>
  @import "layout";
</style>
