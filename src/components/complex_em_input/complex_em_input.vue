<template>
    <div class="complex_em_input">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="complex_em_input_select" slot="prepend" placeholder="请选择">
             <el-option v-for="(item,index) in operation.select" :label="item.name" :value="item.params" :key="index" ></el-option>
        </el-select>
  </el-input>
</div>
</template>

<script>
export default {
    props: {
        operation:{
            type:Object
        }
    },
  data() {
    return {
      input: '',
      complex_em_input_select: '请选择',
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
