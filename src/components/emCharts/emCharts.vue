<template>
    <div class="emCharts">
        <el-row style="height: 100%">
            <div class="table digital_table" style="height:50%">
                <el-row class="operation">
                    <template v-for="item in data.operation">
                        <component :is="item.type" :operation="item" :table_id="table_id" ref="child"
                                   @keyup.enter.native="search()"></component>
                    </template>
                </el-row>
                <el-table
                        height="600px"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        ref="multipleTable"
                        tooltip-effect="dark"
                        :data="tableData"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        @row-dblclick="showDetail">

                    <el-table-column
                            type="index"
                            fixed="left"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column v-for="(item,index) in label"
                                     :key="index"
                                     :prop="item.prop"
                                     :label="item.name"
                                     :min-width="item.width"
                                     align="center"
                    >
                    </el-table-column>
                </el-table>
                <div class="pages">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChangepage"
                            :current-page="currentPage"
                            :page-sizes="[10, 20,30,40]"
                            :page-size="10"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalSize">
                    </el-pagination>
                </div>
            </div>
            <div style="height: 50%;">
                <el-select v-model="selectValue" placeholder="请选择" @change="chartFn" clearable>
                    <el-option
                            v-for="item in selectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div style="height:90%;">
                    <el-row>
                        <template v-for="chart in charts">
                            <el-col :span="chart.winSpan">
                                <em-chart :data="chart"></em-chart>
                            </el-col>
                        </template>
                    </el-row>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
    import emChart from "@/components/emChart/emChart";
    import {fetchChart} from "@/api/chart";
    import {fetchPie} from "@/api/chart";

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
                let obj = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                };
                this.$nextTick(() => {

                    if(_this.$refs.child){
                        if (_this.$refs.child[0].time1) {
                            let time1 = _this.$refs.child[0].time1 ? _this.$refs.child[0].time1 : "";    //时间范围查询参数
                            if (time1) {
                                obj.startTime = time1.getTime();
                            }
                        }
                        if (_this.$refs.child[0].time2) {
                            let time2 = _this.$refs.child[0].time2;
                            if (time2) {
                                obj.endTime = time2.getTime();
                            }
                        }
                    }
                });
                find({                      //页面渲染时拿表格数据
                    url: this.data.table.table_url,
                    params: obj
                }).then(res => {
                    console.log(res);
                    if (res.data.pageData) {
                        this.totalSize = res.data.pageData.total;
                    } else {
                        this.totalSize = res.data.total;
                    }

                    if (res.data.list) {
                        this.tableData = res.data.list;
                    } else {
                        this.tableData = res.data.pageData.list;
                    }
                });


                this.chartFn();
            },
            chartFn() {
                let _this = this;
                let obj = {};

                if (this.$refs.child) {
                    if (this.$refs.child[0].time1) {
                        let time1 = _this.$refs.child[0].time1 ? _this.$refs.child[0].time1 : "";    //时间范围查询参数
                        if (time1) {
                            obj.startTime = time1.getTime();
                        }
                    }
                    if (this.$refs.child[0].time2) {
                        let time2 = _this.$refs.child[0].time2 ? _this.$refs.child[0].time2 : "";
                        if (time2) {
                            obj.endTime = time2.getTime();
                        }
                    }
                }

                obj.timeType = this.selectValue;//获取时间显示类型(日,月,季度,年)

                this.charts.forEach(function (_chart) {
                    _chart.params = obj;
                    _chart.fn = "setData";
                    _this.bus.$emit(_chart.id, _chart);
                });
            }
        },
        created() {
            let _this = this;
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
