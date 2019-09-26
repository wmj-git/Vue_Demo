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
  import {option} from "./data/db"
  export default {
    name: "emChart",
    data() {
      return {
        id: "cc",
        chart: null,
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
    methods: {
      init() {

      },
      chartInit() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = this.$echarts.init(document.getElementById(this.id));

        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(option.option_bar_line, true);
      },
      chartResize() {
        if(this.chart){
          let _width = $("#" + this.id).width();
          let _height = _width * (this.height / 100);
          this.chart.resize({
            width: _width,
            height: _height
          });
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
      this.bus.$on("echart", () => {
        this.chartResize();
      })
    },
    mounted() {
      this.chartInit();
    }
  }
</script>

<style lang="scss" scoped>
  @import "emChart";
</style>
