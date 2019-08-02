<template>
    <div class="echart_table" style="width: 100%;height: 100%">
        <em_dialogs ref="dialog" :label="label_input" @eventFromDialog="recieveObj"></em_dialogs>
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
    import {add, dele, modify, find, downCsvmodel, upLoad,getPictureImg} from "@/api/table_operate";
    import emChart from "@/components/emChart/emChart";
    import {fetchChart} from "@/api/chart";
    import {fetchPie} from "@/api/chart";
    import em_button from "@/components/em_button/em_button";
    import em_input from "@/components/em_input/em_input";
    import em_dialogs from "@/components/em_dialogs/em_dialogs";
    import complex_em_input from "@/components/complex_em_input/complex_em_input";
    import em_date from "@/components/em_date/em_date";
  export default {
    name: "echart_table",
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
            emChart,
            em_button,
            em_input,
            em_dialogs,
            complex_em_input,
            em_date
        },
        props: ["data"],
        methods: {
            resize() {
                console.log('resize');
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            handleCurrentChangepage(val) {
                this.currentPage = val;
                this.init();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.init();
            },
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
            },
            recieveObj(val) {              //把dialog表单里的数据拿到
                console.log(this.delever_obj.url);
                console.log(this.delever_obj.id);
                if (val.fn == "add") {
                    add({
                        url: this.delever_obj.url,
                        params: val.form,
                        id: this.delever_obj.table_id
                    }).then(res => {
                        console.log(res);
                        if (res.statusCode == 200) {
                            this.$message({
                                message: '恭喜你，添加成功',
                                type: 'success'
                            });
                            this.init();
                        }

                    });
                }
                if (val.fn == "modify") {
                    modify({
                        url: this.delever_obj.url,
                        params: val.form
                    }).then(res => {
                        console.log(res);
                        if (res.statusCode == 200) {
                            this.$message({
                                message: '恭喜你，修改成功',
                                type: 'success'
                            });
                            this.init();
                        }
                    });
                }


            },
            control(obj) {
                this[obj.fn](obj);
            },
            add(obj) {
                this.$refs.dialog.showdialog(obj);  //调用子组件em_dialogs的方法显示弹出框;
                this.delever_obj = obj;
                console.log(this.delever_obj);
            },
            search() {
                this.currentPage = 1;
                this.init();
            },
            showDetail(row){
              var sideBar = $(".em_detail_window");
              console.log(sideBar);
              if (!sideBar.hasClass("addWidth")) {
                console.log(sideBar);
                $(".em_detail_window").addClass("addWidth");
              }
              if(row&&this.data.table.picture_url){
                getPictureImg({url:this.data.table.picture_url,id:row.id}).then(res=>{
                  this.imgUrl=res.data[0].fileName;
                  this.baseUrl=process.env.IMG_API;
                  this.bus.$emit("detail",{row:row,label:this.label,imgUrl:this.imgUrl,baseUrl:this.baseUrl})
                })
              }
              else{
                this.bus.$emit("detail",{row:row,label:this.label})
              }

            }
        },
        created() {
            let _this = this;
            this.bus.$on(this.data.table.id, obj => {
                this.control(obj);
            });
            console.log(this.data);
            this.label = this.data.table.label;
            this.charts = this.data.charts;

        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.bus.$off(this.data.table.id);
        }
    };
</script>

<style scoped lang="scss">
    @import "_echart_table";

    .table {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
</style>
