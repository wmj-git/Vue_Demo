<template>
  <div class="emChart">
    <el-row>
      <el-col :span="48">
        <el-card>
          <el-slider v-model="height"></el-slider>
          <div :id="id" style="width:100%;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {createOption} from "./data/db"
  import {fetchChart} from "@/api/chart"

  export default {
    name: "emChart",
    data() {
      return {
        id: "",
        chart: null,
        chartSet: {
          type: "",//图表类型
          optionType: "",//设置模板
          chartTitle: "标题",
          unit_y: "mm"//单位
        },
        dataUrl: "",
        height: 60
      }
    },
    props: ["data"],
    components: {},
    watch: {
      height: {
        handler(newVal, oldVal) {
          this.chartResize();
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
    computed: {
      val: function () {
        return this.$store.getters["win/win"];
      }
    },
    methods: {
      init() {
        this.id = this.data.id;
        this.height = this.data.height;
        this.dataUrl = this.data.dataUrl;
        this.chartSet = {
          type: this.data.type,//图表类型
          optionType: this.data.optionType,//设置模板
          chartTitle: this.data.chartTitle,
          unit_y: this.data.unit_y//单位
        }
      },
      chartInit() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = this.$echarts.init(document.getElementById(this.id));
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(createOption(this.chartSet), true);
      },
      setData(_data) {
        console.log(_data);
        if (_data.type==="line"||_data.type==="bar") {
          this.chart.setOption({
            legend: {
              data: ['1', '2']
            },
            xAxis: {
              data: ['1', '2', '3', '4', '5', '6', '7']
            },
            series: [
              {
                name: '1',
                type: _data.type,
                data: [5, 30, "-", "-", 100, 20, 80]
              },
              {
                name: '2',
                type: _data.type,
                data: [10, 600, 50, 10, 10, "200", 180]
              }
            ]
          });
        }else if(_data.type==="pie"){
          this.chart.setOption({
            legend: {
              data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
              {
                name: '123',
                type: 'pie',
                data: [
                  {value: 20, name: '直接访问'},
                  {value: 310, name: '邮件营销'},
                  {value: 234, name: '联盟广告'},
                  {value: 135, name: '视频广告'},
                  {value: 1111, name: '搜索引擎'}
                ]
              }
            ]
          });
        }

      },
      chartResize() {
        if (this.chart) {
          let _width = $("#" + this.id).width();
          let _height = _width * (this.height / 100);
          if(this.chart){
            this.chart.resize({
              width: _width,
              height: _height
            });
          }

        }

      },
      fn(_fn, _obj) {
        this[_fn](_obj);
      }
    },
    created() {
      this.init();
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {
     /* this.bus.$on("echart", () => {
        this.chartResize();
      });*/
      this.chartInit();//初始图表设置
    }
  }
</script>

<style lang="scss" scoped>
  @import "emChart";
</style>
