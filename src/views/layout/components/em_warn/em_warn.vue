<template>
    <div class="em_warn">
        <win :id="win.id" :data="win">
            <el-button  class="em-btn-warn" @click="showDialog">
              <span>69</span>
            </el-button>
        </win>
    </div>
</template>

<script>
    import win from "@/components/win/win"
    import sole_table from "@/components/sole_table/sole_table"
    export default {
        name: "em_warn",
        data(){
          return{
            win: {
              id: "em_warn",
              title: "",
              top: 24,
              left: 358,
              show: true,
              resizable:false,
              class:"em-warn-window",
              control_id:"win_dialog"
            },
            winDialog:{}
          }
        },
      components:{
          win,
          sole_table
      },
      created(){
        this.socketApi.sendSock("lalala",function (res) {
           return res
        });
      },
      methods:{
           showDialog(){
             this.$store.commit('win/win_open', {
               win_obj: {
                 id: this.win.control_id
               }
             });
           }
      }
    }
</script>

<style scoped lang="scss">
  @import "em_warn";
</style>
