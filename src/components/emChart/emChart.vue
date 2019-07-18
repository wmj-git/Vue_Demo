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
  import {getWordCounted, getArrCounted} from "@/utils/tools";

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
          unit_y: this.data.unit_y//单位
        };
      },
      chartInit() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = this.$echarts.init(document.getElementById(this.id));
        // 使用刚指定的配置项和数据显示图表。
        this.chart.setOption(createOption(this.chartSet), true);
      },
      setData(_data) {
        console.log(_data);

        fetchChart({
          option: _data.type,
          chart_url: _data.dataUrl,
          params: _data.params
        }).then(res => {
          let series_data = [];
          console.log("res");
          console.log(res);

          res.data.list.forEach(function (_obj) {
            series_data.push(_obj["fireAlarmId"]);
          });
          series_data = getArrCounted(series_data);


          console.log(getArrCounted(['直接访问','直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']));
          console.log(series_data);

          /* if (this.data.chart.type == "pie") {
             // this.data1=res.data[this.data.chart.type];
             // console.log(this.data1)
           }
           else if (this.data.chart.type.indexOf("line") != -1) {
             let temObj = {};
             if (res.data.listData.length != 0) {
               res.data.listData.forEach((val) => {
                 if (_val == "年") {
                   // var newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(val.createDate)[0];
                 }
                 data.push(val.createDate);
                 this.xAxis_data = data;
               });
             } else {
               this.xAxis_data = [];
             }

             this.xAxis_data = Array.from(new Set(this.xAxis_data));
             this.xAxis_data.sort();
             console.log(this.xAxis_data);
             for (let k in  res.data.grupData) {
               if (k == "S" || k == "A") {
                 for (let n in res.data.grupData[k]) {
                   let _arr = [];
                   this.xAxis_data.forEach(function (_time, _i) {
                     res.data.grupData[k][n].forEach(function (_val) {
                       if (_val.createDate === _time) {
                         _arr[_i] = _val.temValue || _val.humValue;
                       } else if (!_arr[_i]) {

                         _arr[_i] = "-";
                       }
                     });
                   });
                   temObj[n] = _arr;
                 }

               } else {
                 let _arr = [];
                 this.xAxis_data.forEach(function (_time, _i) {
                   res.data.grupData[k].forEach(function (_val) {
                     if (_val.createDate === _time) {
                       _arr[_i] = _val.humanTrafficValue;
                     } else if (!_arr[_i]) {
                       _arr[_i] = "-";
                     }
                   });
                 });
                 temObj[k] = _arr;

               }

             }
             console.log(temObj);
             let attr;
             let seriesArr = [];
             for (attr in temObj) {
               seriesArr.push({
                 name: attr,
                 data: temObj[attr],
                 type: 'line',
                 itemStyle: {       //线的样式
                   normal: {
                     lineStyle: {
                       width: 1
                     }
                   }
                 },
               });
             }
             this.series = seriesArr;
             console.log(this.series);


           }
           else {
             let alarmDate = [];
             res.data.list.forEach((val) => {
               alarmDate.push(val.createDate);
               var newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(val.createDate)[0];
               data.push(newDate);

             });
             this.xAxis_data = data;
             this.xAxis_data = Array.from(new Set(this.xAxis_data));
             this.xAxis_data.sort();
             console.log(this.xAxis_data);
             console.log(alarmDate);
             let num = [];
             this.xAxis_data.forEach((_val, _i) => {
               num.push(0);
               alarmDate.forEach((_time,) => {
                 if (_val == /\d{4}-\d{1,2}-\d{1,2}/g.exec(_time)[0]) {
                   ++num[_i];
                 }
               });
             });

             console.log(num);
             this.series = [{
               name: '火险报警次数',
               type: 'bar',
               barWidth: '40',
               data: num
             }];

           }*/
          if (_data.type === "line" || _data.type === "bar") {


            this.chart.setOption({
              legend: {
                data: ['报警次数']
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
          } else if (_data.type === "pie") {

            let _series = [];
            let _legend = [];

            for (let k in  series_data) {
              _legend.push(k);
              _series.push({
                value: series_data[k],
                name: k
              });
            }

            this.chart.setOption({
              legend: {
                data: _legend
              },
              series: [
                {
                  name: '123',
                  type: 'pie',
                  data: _series
                  /* [
                     {value: 20, name: '直接访问'},
                     {value: 310, name: '邮件营销'},
                     {value: 234, name: '联盟广告'},
                     {value: 135, name: '视频广告'},
                     {value: 1111, name: '搜索引擎'}
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
          if (this.chart) {
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
    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  };
</script>

<style lang="scss" scoped>
  @import "emChart";
</style>
