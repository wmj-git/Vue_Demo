<template>
    <div class="em_warn">
      <el-dialog title="火警详情信息" :visible.sync="dialogTableVisible" :append-to-body="true"  :close-on-click-modal="false" v-dialog-drag>

      </el-dialog>
        <win :id="win.id" :data="win">
            <el-button  class="em-btn-warn" @click="showDialog">
              <span>69</span>
            </el-button>
        </win>
    </div>
</template>

<script>
    import win from "@/components/win/win"
    export default {
        name: "em_warn",
        data(){
          return{
            win: {
              id: "em_warn",
              title: "",
              top: 36,
              left: 358,
              show: true,
              resizable:false,
              class:"em-warn-window",
              component: "sole_table"
            },
            dialogTableVisible: false,
          }
        },
      components:{
          win
      },
      mounted(){

      },
      methods:{
           showDialog(){
             this.dialogTableVisible=true
           }
      }
    }
</script>

<style scoped lang="scss">
  @import "em_warn";
</style>
