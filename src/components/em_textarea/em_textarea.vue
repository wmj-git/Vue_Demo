<template>
    <div class="em_textarea">
      <el-input
        type="textarea"
        :rows="2"
        :placeholder="operation.placeholder"
        v-model="input">
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
      data(){
          return{
            input:"",
            params:this.operation.params
          }
      }

    };
</script>
<style lang="scss" scoped>
  .em_textarea{
    display: inline-block;
  }
</style>
