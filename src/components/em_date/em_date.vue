<template>
      <div class="data_pick">    <!--时间选择器-->
        <!--<el-date-picker-->
          <!--v-model="time1"-->
          <!--type="date"-->
          <!--placeholder="开始日期"-->
          <!--:picker-options="pickerOptions0" style="width: 150px">-->
        <!--</el-date-picker>-->
        <!--<span style="color: white">-</span>-->
        <!--<el-date-picker-->
          <!--v-model="time2"-->
          <!--type="date"-->
          <!--placeholder="结束日期"-->
          <!--:picker-options="pickerOptions1" style="width: 150px">-->
        <!--</el-date-picker>-->
        <el-date-picker
          v-model="value"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
</template>

<script>
    export default {
      data(){
            // return{
            //   time1:'',               //对应时间选择器
            //   time2:'',
            //   pickerOptions0: {
            //     disabledDate: (time) => {
            //         if (this.time2) {
            //           return time.getTime() > this.time2;
            //           console.log("不为空")
            //         } else {
            //           return time.getTime() > Date.now();
            //         }
            //
            //     }
            //   },
            //   pickerOptions1: {
            //     disabledDate:(time) => {
            //         if( this.time1){
            //           return time.getTime() < this.time1 || time.getTime() > Date.now() ;
            //         }else {
            //           return time.getTime() > Date.now();
            //         }
            //
            //     }
            //   }
            // }
        return {
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }],
            disabledDate: (picker) => {
                      return picker.getTime() > Date.now();
            }
          },
          value: ''
        };
            }
    };
</script>
<style lang="scss" scoped>
    .data_pick /deep/{
       display: inline-block;
       .el-input__icon {
        line-height: 14px;
      }
      .el-range-input{
          background: transparent;
          color: #fff;
      }
      .el-range-separator{
        line-height: 15px;
        width: 8%;
        color: #fff;
      }

    }
</style>
