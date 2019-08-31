<template>
  <div class="emCharts">
    <el-row>
      <template v-for="chart in charts">
        <el-col :span="chart.winSpan">
          <em-chart :data="chart"></em-chart>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
  import emChart from "@/components/emChart/emChart";
  import {fetchChart,fetchPie} from "@/api/chart";

  export default {
    name: "emCharts",
    data() {
      return {
        id: "",
        table_id: "",
        label: [],
        tableData: [],
        currentRow: null,
        multipleSelection: [],
        input: '',
        currentPage: 1,
        totalSize: null,
        value: '',
        dialogFormVisible: false, //导入表格弹框控制显示隐藏的布尔值
        action: "",
        pageSize: 10,
        label_input: [],
        selectOptions: [
          {
            value: "day",
            label: "日"
          },
          {
            value: "month",
            label: "月"
          },
          {
            value: "quarter",
            label: "季"
          },
          {
            value: "year",
            label: "年"
          }
        ],
        selectValue: "day",
        charts: []
      };
    },
    components: {
      emChart
    },
    props: ["data"],
    methods: {
      init() {                               //表格加载数据
        let _this = this;

        this.chartFn();
      },
      chartFn() {
        let _this = this;
        let obj = {};

        obj.timeType = this.selectValue;//获取时间显示类型(日,月,季度,年)

        this.charts.forEach(function (_chart) {
          _chart.params = obj;
          _chart.fn = "setData";
          _this.bus.$emit(_chart.id, _chart);
        });
      }
    },
    created() {
      this.bus.$on(this.id, obj => {
        this.control(obj);
      });
      this.charts = this.data.charts;
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.bus.$off(this.data.id);
    }
  };
</script>

<style scoped lang="scss">
  @import "emCharts";
</style>
