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
    import {getWordCounted, getArrCounted, timestampToTime, computTimeHorizon} from "@/utils/tools";

    export default {
        name: "emChart",
        data() {
            return {
                id: "",
                chart: null,
                chartSet: {},
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
                    valueType: this.data.valueType ? this.data.valueType : "",//
                    seriesFields: this.data.seriesFields ? this.data.seriesFields : "",
                    legendField: this.data.legendField ? this.data.legendField : "",
                    xAxisField: this.data.xAxisField ? this.data.xAxisField : "",
                    yAxisField: this.data.yAxisField ? this.data.yAxisField : ""
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
                if (params_data) {
                    this.params = params_data.params;
                }
                fetchChart({
                    chart_url: this.dataUrl,
                    params: this.params
                }).then(res => {
                    console.log("res");
                    console.log(res);
                    let _res = null;
                    if (res.data.listData) {
                        _res = res.data.listData;
                    } else {
                        _res = res.data;
                    }


                    if (this.chartSet.type === "line" || this.chartSet.type === "bar") {

                        let _legend = [];
                        let _xAxis = [];
                        let _yAxis = [];
                        let _series = [];


                        if (this.chartSet.seriesType === "lineBar_handle_a") { //计算时间总数
                            let _data = [];
                            let _time_data = null;
                            _time_data = this.timeFn(_res, this.chartSet.xAxisField);
                            // 计算_legend值
                            if (this.chartSet.xAxisField === this.chartSet.legendField) {
                                _legend.push("总数");
                            } else {
                                let _num = [];
                                _res.forEach(function (_obj) {
                                    _num.push(_obj[_this.chartSet.legendField]);
                                });
                                _num = getArrCounted(_num);
                                for (let k in  _num) {
                                    _legend.push(k);
                                }
                            }
                            console.log("_legend");
                            console.log(_legend);
                            // 计算_xAxis值
                            for (let k in  _time_data) {
                                _xAxis.push(k);
                            }

                            // 计算_yAxis和_series值

                            if (this.chartSet.yAxisField === this.chartSet.legendField && this.chartSet.xAxisField === this.chartSet.yAxisField) {
                                let _mode = {
                                    name: '总数',
                                    type: this.chartSet.type,
                                    data: []
                                };
                                for (let k in  _time_data) {
                                    _mode.data.push(_time_data[k]);
                                }
                                _series.push(_mode);
                            } else if (this.chartSet.yAxisField !== this.chartSet.legendField && this.chartSet.xAxisField === this.chartSet.yAxisField) {
                                _legend.forEach(function (_val) {
                                    _res.forEach(function (_obj) {
                                        let _num = null;
                                        if (_obj[_this.chartSet.legendField] == _val) {
                                            _num = _obj;
                                            if (_yAxis[_val]) {
                                                _yAxis[_val].push(_num);
                                            } else {
                                                _yAxis[_val] = [];
                                                _yAxis[_val].push(_num);
                                            }
                                        }
                                    });
                                });

                                for (let _k in _yAxis) {
                                    let _data = null;
                                    let _d = [];

                                    _data = this.timeFn(_yAxis[_k], this.chartSet.yAxisField);

                                    _xAxis.forEach(function (_obj) {
                                        if (_data[_obj]) {
                                            _d.push(_data[_obj]);
                                        } else {
                                            _d.push("-");
                                        }
                                    });
                                    _series.push({
                                        name: _k,
                                        type: this.chartSet.type,
                                        data: _d
                                    });

                                }

                            } else if (this.chartSet.yAxisField !== this.chartSet.legendField && this.chartSet.xAxisField !== this.chartSet.yAxisField) {

                                _legend.forEach(function (_val) {
                                    _res.forEach(function (_obj) {
                                        let _num = null;
                                        if (_obj[_this.chartSet.legendField] == _val) {
                                            _num = _obj;
                                            if (_yAxis[_val]) {
                                                _yAxis[_val].push(_num);
                                            } else {
                                                _yAxis[_val] = [];
                                                _yAxis[_val].push(_num);
                                            }
                                        }
                                    });
                                });

                                for (let _k in _yAxis) {
                                    let _data = null;
                                    let _d = [];

                                    _data = this.analyzeFn(_yAxis[_k], this.chartSet.xAxisField, this.chartSet.yAxisField, this.chartSet.valueType);

                                    _xAxis.forEach(function (_obj) {
                                        if (_data[_obj]) {
                                            _d.push(_data[_obj]);
                                        } else {
                                            _d.push("-");
                                        }
                                    });
                                    _series.push({
                                        name: _k,
                                        type: this.chartSet.type,
                                        data: _d
                                    });
                                }
                            }
                            console.log("_yAxis");
                            console.log(_yAxis);
                            console.log(_series);
                            // _series = [];
                        } else if (this.chartSet.type === "lineBar_handle_b") {


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
                            }
                            ]*/
                        });
                    } else if (this.chartSet.type === "pie") {

                        let _series = [];
                        let _legend = [];
                        let series_data = [];

                        if (this.chartSet.seriesType === "pie_handle_a") {

                            _res.forEach(function (_obj) {
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
            timeFn(_list, _Field) {
                let _this = this;
                let _time_data = [];
                let time_data = [];

                _list.forEach(function (_obj) {
                    let date = new Date(_obj[_Field]);
                    let _time = date.getTime();
                    _time_data.push(_time);
                });
                _time_data.sort(function (a, b) {
                    return a - b;
                });
                _time_data.forEach(function (_obj) {
                    let date = new Date(_obj);
                    let _time = null;
                    let T = "/";
                    let Y = date.getFullYear();
                    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                    let D = date.getDate();

                    switch (_this.params.timeType) {
                        case "day":
                            _time = Y + T + M + T + D;
                            break;
                        case "month":
                            _time = Y + T + M;
                            break;
                        case "quarter":
                            let _t = computTimeHorizon(date.getTime(), 3);
                            _time = _t.year + T + _t.quarter + "季";
                            break;
                        case "year":
                            _time = Y;
                            break;
                    }
                    time_data.push(_time);
                });
                _time_data = getArrCounted(time_data);
                console.log(_time_data);

                return _time_data;
            },
            analyzeFn(_list, _xField, _yField, _type) {

                let _this = this;
                let value_data = {};

                _list.forEach(function (_obj) {
                    let date = new Date(_obj[_xField]);
                    let _time = date.getTime();
                    let T = "/";
                    let Y = date.getFullYear();
                    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                    let D = date.getDate();

                    switch (_this.params.timeType) {
                        case "day":
                            _time = Y + T + M + T + D;
                            break;
                        case "month":
                            _time = Y + T + M;
                            break;
                        case "quarter":
                            let _t = computTimeHorizon(date.getTime(), 3);
                            _time = _t.year + T + _t.quarter + "季";
                            break;
                        case "year":
                            _time = Y;
                            break;
                    }
                    _obj[_xField] = _time;
                });

                _list.forEach(function (_obj) {
                    if (value_data[_obj[_xField]]) {
                        switch (_type) {
                            case "min"://最小值
                                if (value_data[_obj[_xField]] > _obj[_yField]) {
                                    value_data[_obj[_xField]] = _obj[_yField];
                                }
                                break;
                            case "max"://最大值
                                if (value_data[_obj[_xField]] < _obj[_yField]) {
                                    value_data[_obj[_xField]] = _obj[_yField];
                                }
                                break;
                            case "sum"://总和
                            case "mean"://平均值
                                value_data[_obj[_xField]].push(_obj[_yField]);
                                break;
                        }


                    } else {
                        if (_type === "sum" || _type === "mean") {
                            value_data[_obj[_xField]] = [];
                            value_data[_obj[_xField]].push(_obj[_yField]);
                        }else {
                            value_data[_obj[_xField]] = _obj[_yField];
                        }

                    }
                });

                //求总和
                if (_type === "sum") {
                    for(let _i in value_data){
                        let _sum=null;
                        value_data[_i].forEach(function (_val) {
                            _sum+=_val;
                        });

                        value_data[_i]=_sum;
                    }
                }
                //求平均数
                if ( _type === "mean") {
                    for(let _i in value_data){
                        let _value=null;
                        let _num=null;
                        value_data[_i].forEach(function (_val) {
                            _value+=_val;
                            _num+=1;
                        });
                        value_data[_i]=_value/_num;
                    }
                }

                console.log(value_data);

                return value_data;

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
