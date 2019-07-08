<template>
    <div class="e_chart_window">
      <win :id="win.id" :data="win">
          <ehcarts :id="id" :option="option" :data="data" :series="series"></ehcarts>
        <el-row>
          <el-col :span="12" style="text-align: center">
            <el-button size="mini" @click="pie" class="em-btn-border">饼图</el-button>
          </el-col>
          <el-col :span="12"  style="text-align: center">
            <el-button size="mini" @click="circle"  class="em-btn-border">环状图</el-button>
          </el-col>
          <el-col :span="12" style="text-align: center">
            <el-button size="mini" @click="line"  class="em-btn-border">折线图</el-button>
          </el-col>
          <el-col :span="12" style="text-align: center">
            <el-button size="mini" @click="bar"  class="em-btn-border">柱状图</el-button>
          </el-col>
       </el-row>
      </win>
    </div>
</template>

<script>
  import win from "@/components/win/win"
  import ehcarts from "@/components/echarts/echarts"
  import options from '@/echart_options/options'
  import {fetchPie,fetchCircle,fetchLine} from "@/api/chart"
  export default {
        name: "em_chart_window",
        components:{
           win,
           ehcarts
        },
        data(){
           return{
             win: {
               id: "echarts",
               title: "echarts",
               top: 200,
               left: 400,
               show: true,
               resizable:false,
               width:"400",
               class:"em-table-window"
             },
             id: "pie",
             option:options.pie,
             data:[],
             series:[]
           }
        },
      created(){
        fetchPie().then(res=>{
          console.log(res.data.pie);
          this.data=res.data.pie

        })
      },
       methods:{
           pie(){
             this.id="pie";
              this.option=options.pie;
              fetchPie().then(res=>{
                 console.log(res.data.pie);
                 this.data=res.data.pie

             })
           },
           circle(){
             this.id="circle";
             this.option=options.circle;
             fetchCircle().then(res=>{
                  this.data=res.data.circle
             })
           },
           line(){
             this.id="line";
             this.option=options.line;
             fetchLine().then(res=>{
               this.series=res.data.line
               console.log(this.series)
             })
           },
           bar(){
             this.id="bar";
             this.option=options.bar;
           }
       }
    }
</script>

<style scoped>

</style>
