<template>
    <div class="em_warn">
        <win :id="win.id" :data="win">
            <el-button  class="em-btn-warn">
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
              left: 370,
              show: true,
              resizable:false,
              class:"em-warn-window"
            },
          }
        },
      components:{
          win
      }
    }
</script>

<style scoped lang="scss">
  @import "em_warn";
</style>
