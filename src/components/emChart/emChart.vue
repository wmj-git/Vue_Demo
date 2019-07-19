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
  import {createOption} from "./data/db";
  import {fetchChart} from "@/api/chart";
  import {getWordCounted, getArrCounted,timestampToTime,computTimeHorizon} from "@/utils/tools";

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
          unit_y: "mm",//单位
          seriesType: "pie_handle_a",//
          seriesFields: "{fireAlarmId:{}}"
        },
        dataUrl: "",
        params: {},
        height: 60
      };
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
          unit_y: this.data.unit_y,//单位
          seriesType: this.data.seriesType,//
          seriesFields: this.data.seriesFields
        };
      },
      chartInit() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = this.$echarts.init(document.getElementById(this.id));
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(createOption(this.chartSet), true);
      },
      setData(params_data) {
        let _this = this;
        console.log(params_data);
        if (params_data) {
          this.params = params_data.params;
        }
        fetchChart({
          chart_url: this.dataUrl,
          params: this.params
        }).then(res => {
          console.log("res");
          console.log(res);

          if (this.chartSet.type === "line" || this.chartSet.type === "bar") {

            let _legend = [];
            let _xAxis = [];
            let _series = [];
            let series_data = [];


            //计算时间总数
            if (this.chartSet.seriesType === "lineBar_handle_a") {
              let _data = [];
              let time_data = [];

              res.data.list.forEach(function (_obj) {
                let date = new Date(_obj[_this.chartSet.seriesFields]);
                let _time=date.getTime();
                series_data.push(_time);
              });
              series_data.sort( function (a, b) {
                return a - b;
              });


              console.log("series_data.sort(sequence)");
              series_data.forEach(function (_obj) {
                let date = new Date(_obj);
                let _time=null;
                let T="/";
                let Y = date.getFullYear();
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) ;
                let D = date.getDate();

                switch (_this.params.timeType) {
                  case "day":
                    _time=Y+T+M+T+D;
                    break;
                  case "month":
                    _time=Y+T+M;
                    break;
                  case "quarter":
                    let _t=computTimeHorizon(date.getTime(),3);
                    _time=_t.year+T+_t.quarter+"季";
                    break;
                  case "year":
                    _time=Y;
                    break;
                }


                time_data.push(_time);
              });

              series_data = getArrCounted(time_data);

              for (let k in  series_data) {
                _xAxis.push(k);
                _data.push(series_data[k]);
              }
              console.log(_xAxis);
              _series = [{
                name: '',
                type: this.chartSet.type,
                data: _data
              }]
            }


            this.chart.setOption({
              legend: {
                data: _legend
              },
              xAxis: {
                data: _xAxis
                // ['1', '2', '3', '4', '5', '6', '7']
              },
              series: _series
              /*[
              {
                name: '1',
                type: this.chartSet.type,
                data: [5, 30, "-", "-", 100, 20, 80]
              },
              {
                name: '2',
                type: this.chartSet.type,
                data: [10, 600, 50, 10, 10, "200", 180]
              }
              ]*/
            });
          } else if (this.chartSet.type === "pie") {

            let _series = [];
            let _legend = [];
            let series_data = [];

            if (this.chartSet.seriesType === "pie_handle_a") {

              res.data.list.forEach(function (_obj) {
                series_data.push(_obj[_this.chartSet.seriesFields]);
              });
              series_data = getArrCounted(series_data);
              console.log(series_data);

              for (let k in  series_data) {
                _legend.push(k);
                _series.push({
                  value: series_data[k],
                  name: k
                });
              }

            }


            this.chart.setOption({
              legend: {
                data: _legend
              },
              series: [
                {
                  name: '',
                  type: this.chartSet.type,
                  data: _series
                  /* [
                     {value: 20, name: '直接访问'},
                     {value: 310, name: '邮件营销'}
                   ]*/
                }
              ]
            });
          }
        });
      },
      chartResize() {
        if (this.chart) {
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
    },
    mounted() {

      this.chartInit();//初始图表设置
    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  };
</script>

<style lang="scss" scoped>
  @import "emChart";
</style>
