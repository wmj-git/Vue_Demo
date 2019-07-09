<template>
    <div class="em_input">
      <el-input v-model="input" :placeholder="operation.placeholder" :readonly="readonly"></el-input>
    </div>
</template>

<script>
    export default {
        props: {
          operation:{
            type:Object
          },
          readonly:{
             type: Boolean
          }
        },
      data(){
           return {
               input:"",
               params:this.operation.params,

           }
      }
    };
</script>
<style lang="scss" scoped>
    .em_input{
       display: inline-block;
    }
</style>
