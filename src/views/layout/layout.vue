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
  </div>
</template>

<script>
  import {refreshToken} from '@/api/login'
  import {getNowFormatDate} from '@/utils/tools'
  import {setToken, setTokenTime, getTokenTime, TokenName, RefreshTokenName,getExpires,setExpires} from '@/utils/auth'

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
  import em_dialogs from "@/components/em_dialogs/em_dialogs"

  export default {
    data() {
      return {
        // wins: [],
        dialogGroup: []
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
      em_dialogs
    },
    computed:{
      wins: function () {
        return this.$store.getters["win/win"];
      }
    },
    methods: {
      init() {
        // this.wins = this.$store.state.win.win;
        this.dialogGroup = this.$store.state.win.dialog;
      },
      refreshTokenFn() {//刷新token
        setInterval(() => {
          let _time = getNowFormatDate().timestamp - getTokenTime();
          let _expires=getExpires();
          console.log(_time);
          if (_time < _expires-200000) {
            return
          }
          // alert(_time);
         this.refreshToken();
        }, 120000);
      },
      refreshToken() {//刷新token

        let _RefreshToken = this.$store.getters["user/refreshToken"];
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
      fn() {

      }
    },
    created() {
      this.init();
      this.refreshTokenFn();//刷新token
    },
    mounted() {


    }

  };
</script>
<style lang="scss" scoped>
  @import "layout";
</style>
