<template>
 <div class="venture">
   <win :id="win.id" :data="win">
     <el-row>
       <em class="level_one">风险等级：1</em>
       <el-button class="data_button btn-level-one">
         <span>232</span>
       </el-button>
       <em class="level_two">风险等级：2</em>
       <el-button class="data_button btn-level-two">
         <span>232</span></el-button>
       <em class="level_three">风险等级：3</em>
       <el-button class="data_button btn-level-three">
         <span>232</span></el-button>
     </el-row>
   </win>
 </div>
</template>

<script>
     import win from "@/components/win/win"
    export default {
        name: "em_venture",
      data(){
        return{
          win: {
            id: "em_warn",
            title: "",
            top: 10,
            left: 100,
            width:450,
            show: true,
            resizable:false,
            class:"em-risk-window"
          },
        }
        },
      components:{
        win
      },
      created() {
        var bodywidth=Number(document.body.clientWidth);
        console.log(bodywidth);
        this.win.left=bodywidth-450;
      }
    }
</script>

<style scoped lang="scss">
@import "em_ventute";
</style>
