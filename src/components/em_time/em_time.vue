<template>
  <div class="em_time">
    <el-date-picker
      v-model="value"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    props: {
      operation: {
        type: Object
      }
    },
    data() {
      return {
        value: "",
        params: this.operation.params,
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "em_time";
</style>
