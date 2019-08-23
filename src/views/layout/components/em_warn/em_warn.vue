<template>
  <div class="em_warn">
    <win :id="win.id" :data="win">
      <el-button class="em-btn-warn" @click="showDialog">
        <span>{{fire_count}}</span>
      </el-button>
    </win>
  </div>
</template>

<script>
  import win from "@/components/win/win"
  import sole_table from "@/components/sole_table/sole_table"
  import {fireWarnCount} from "@/api/warn"

  export default {
    name: "em_warn",
    data() {
      return {
        win: {
          id: "em_warn",
          title: "",
          top: "calc(100% - 148px)",
          left: "calc(100% - 400px)",
          show: true,
          resizable: false,
          class: "em-warn-window",
          control_id: "win_dialog"
        },
        fire_count: null
      }
    },
    components: {
      win,
      sole_table
    },
    created() {
      this.init();
      let url =process.env.BASE_API;
      this.socketApi.initWebSocket(url.replace("http:","ws:"));
      this.socketApi.proxyFunction('fire',(res)=>{
        console.log(res);
        if(res){
          this.init();
          this.bus.$emit("fire_info",res)
        }
      });
      this.bus.$off("close_fire_warn");
      this.bus.$on("close_fire_warn",_=>{
          this.init()
      });


    },
    methods: {
      showDialog() {
        this.$store.commit('win/win_open', {
          win_obj: {
            id: this.win.control_id
          }
        });
      },
      init() {
        fireWarnCount().then(res => {
          console.log(res);
          this.fire_count = res.data;
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "em_warn";
</style>
