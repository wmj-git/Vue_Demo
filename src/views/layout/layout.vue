<template>
  <div class="em_layout">
    <!--顶部标题-->
    <em_logo_title></em_logo_title>
    <!--报警器-->
    <em_warn></em_warn>
    <!--风险等级数据监测-->
    <!--<em_venture></em_venture>-->
    <!--主菜单-->
    <em_nav></em_nav>
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
    <em_bottom></em_bottom>
    <!-- 数据展示图窗口-->
    <!--<template v-for="item in data_show">-->
      <!--<win :id="item.id" :data="item">-->
        <!--<component :is="item.component_name"></component>-->
      <!--</win>-->
    <!--</template>-->
  </div>
</template>

<script>
  import {refreshToken} from '@/api/login'
  import {getNowFormatDate} from '@/utils/tools'
  import {setToken, setTokenTime, getTokenTime, TokenName, RefreshTokenName, getExpires, setExpires} from '@/utils/auth'
  import win from "@/components/win/win"
  import splitpane from "@/components/splitpane/splitpane"
  import sole_table from "@/components/sole_table/sole_table"
  import list_table from "@/components/list_table/list_table"
  import echart_table from "@/components/echart_table/echart_table"
  import em_dialog from "@/components/em_dialog/em_dialog"
  import button_group from "@/components/button_group/button_group"
  import em_menu from "./components/em_menu/em_menu"
  import em_nav from "./components/em_nav/em_nav"
  import em_bottom from "./components/em_bottom/em_bottom"
  import em_logo_title from "./components/em_title/em_logotitle"
  import em_warn from "./components/em_warn/em_warn"
  import em_venture from "./components/em_venture/em_venture"
  import em_chart_window from "./components/em_chart_window/em_chart_window"
  import em_tools from "./components/em_tools/em_tools"
  import em_slider from "./components/em_slider/em_slider"
  import treeForm from "@/app_components/treeFrom/treeForm"
  import buttonGroup from "@/app_components/buttonGroup/buttonGroup"
  import em_dialogs from "@/components/em_dialogs/em_dialogs"
  import number_show from "./components/number_show/number_show"
  import echart_alone_show from "./components/echart_alone_show/echart_alone_show"
  import echarts_show from "./components/echarts_show/echarts_show"
  import table_show from "./components/table_show/table_show"

  import emChart from "@/app_components/emChart/emChart"
  export default {
    data() {
      const screenWidth = _ => {
        const width = Number( document.documentElement.clientWidth)-550;
        return width;
      };
      return {
        // wins: [],
        // dialogGroup: []
        sreenWidth:"",
        data_show:[
          {
            component_name:"number_show",
            id:"point_counting",
            title:"",
            top:120,
            left:10,
            resizable: false,

          },
          {
            component_name:"number_show",
            id:"garden_details",
            title:"公园详情",
            top:320,
            left:10,
            resizable: false,
            class: "em-layout-window",
          },
          {
            component_name:"echart_alone_show",
            id:"pedestrians_counting",
            title:"客流量统计",
            top:520,
            left:10,
            resizable: false,
            class: "em-layout-window",
          },
          {
            component_name:"number_show",
            id:"greenroad_detail",
            title:"绿道详情",
            top:720,
            left:10,
            resizable: false,
          },
          {
            component_name:"echarts_show",
            id:"greenfield_protect_monitor",
            title:"绿地养护监控",
            top:120,
            left: screenWidth(),
            resizable: false,
          },
          {
            component_name:"table_show",
            id:"garden_enviroment_monitor",
            title:"园林环境监控",
            top:320,
            left: screenWidth(),
            resizable: false,
          },
          {
            component_name:"table_show",
            id:"green_belt_details",
            title:"绿化带养护综合详情",
            top:520,
            left:screenWidth(),
            resizable: false,
          },
        ]
      }
    },
    components: {
      win,
      splitpane,
      em_dialog,
      button_group,
      em_menu,
      em_nav,
      em_bottom,
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
      emChart
    },
    computed: {
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
          console.log(_time);
          if (_time < _expires - 200000) {
            return
          }
          // alert(_time);
          this.refreshToken();
        }, 120000);
      },
      refreshToken() {//刷新token
        let _RefreshToken = this.$store.getters["user/refreshToken"];
        console.log(_RefreshToken);
        refreshToken({
          [RefreshTokenName]: _RefreshToken
        }).then(response => {
          let data = response.data;
          this.$store.commit("user/set_token", data[TokenName]);
          setToken(data[TokenName]);
          let _token_time = getNowFormatDate().timestamp;
          this.$store.commit("user/set_token_time", _token_time);
          setTokenTime(_token_time);

          console.log(data);
        })
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
