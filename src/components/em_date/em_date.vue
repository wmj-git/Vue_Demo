<template>
      <div class="data_pick">    <!--时间选择器-->
        <el-date-picker
          v-model="time1"
          type="date"
          placeholder="开始日期"
          :picker-options="pickerOptions0" style="width: 150px">
        </el-date-picker>
        <span style="color: white">-</span>
        <el-date-picker
          v-model="time2"
          type="date"
          placeholder="结束日期"
          :picker-options="pickerOptions1" style="width: 150px">
        </el-date-picker>
      </div>
</template>

<script>
    export default {
        props: {
        },
      data(){
            return{
              time1:'',               //对应时间选择器
              time2:'',
              pickerOptions0: {
                disabledDate: (time) => {
                  if (this.time2 != "") {
                    let currentTime = this.time2;
                    let threeMonths = currentTime.setMonth(currentTime.getMonth()-1);
                    currentTime.setMonth(currentTime.getMonth()+1);
                    return time.getTime() > this.time2 || time.getTime() < threeMonths ;
                  } else {
                    return time.getTime() > Date.now();
                  }

                }
              },
              pickerOptions1: {
                disabledDate:(time) => {
                  if( this.time1 != ""){
                    let currentTime = this.time1;
                    let threeMonths = currentTime.setMonth(currentTime.getMonth()+1);
                    currentTime.setMonth(currentTime.getMonth()-1)
                    return time.getTime() < this.time1 || time.getTime() > threeMonths ;
                  }else {
                    return time.getTime() > Date.now();
                  }

                }
              }
            }
            }
    };
</script>
<style lang="scss" scoped>
    .data_pick{
       display: inline-block;
    }
</style>
