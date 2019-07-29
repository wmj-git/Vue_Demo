<template>
    <div class="echart">
        <div :id="id" style="height: 100%;width: 100%;"></div>
    </div>
</template>
<script>
    export default {
        name: "Chart",
        data() {
            return {
                chart: ""
            }
        },
        props: {
            id: {
                type: String
            },
            option: {
                type: Object,
                default: {}
            },
            data: {
                type: Array
            },
            series: {
                type: Array
            },
            xAxis_data: {
                type: Array
            }

        },
        mounted() {
            // setTimeout(()=>{
            //   if(!this.chart){
            //     console.log('定時器調動')
            //     this.init();
            //   }
            // },2000);
            this.bus.$on("echart", () => {
                console.log('echart調動');
                this.init();

            })

        },
        watch: {
            //观察option的变化
            option: {
                handler(newVal, oldVal) {
                    if (this.chart) {
                        if (newVal) {
                            this.chart.setOption(newVal);
                        } else {
                            this.chart.setOption(oldVal);
                        }
                    }
                },
                deep: true //对象内部属性的监听，关键。
            },
            data: {
                handler(newVal, oldVal) {
                    if (this.chart) {
                        if (newVal) {
                            this.chart.setOption({
                                series: [{
                                    data: newVal
                                }]
                            });
                        } else {
                            this.chart.setOption({
                                series: [{
                                    data: oldVal
                                }]
                            });
                        }
                    }
                },
                deep: true //对象内部属性的监听，关键。
            },
            series: {
                handler(newVal, oldVal) {
                    if (this.chart) {
                        this.option.series = this.series;
                    }
                    this.init();
                    console.log(this.id)

                },
                deep: true //对象内部属性的监听，关键。
            },
            xAxis_data: {
                handler(newVal, oldVal) {
                    if (this.chart) {
                        this.option.xAxis = {
                            type: 'category',
                            data: newVal,
                            axisLine: {
                                lineStyle: {
                                    color: '#fff'
                                },
                            },
                            axisTick: {   //取消刻度线
                                show: false
                            },
                        };
                    }
                },
                deep: true //对象内部属性的监听，关键。
            }
        },
        methods: {
            init() {
                console.log("我被調用了");
                let _width = $("#" + this.id).width();
                let _height = $("#" + this.id).height();
                this.chart = this.$echarts.init(document.getElementById(this.id));
                this.chart.resize({
                    width: _width,
                    height: _height
                });
                this.chart.setOption(this.option, true);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "echarts";
</style>
