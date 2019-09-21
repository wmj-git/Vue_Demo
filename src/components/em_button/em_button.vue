<template>
    <div class="em_button">
      <el-button :icon="operation.icon" @click="onclick(operation)" class="em-btn-simple" :disabled="operation.disabled">{{operation.operate}}</el-button>
    </div>
</template>

<script>
    export default {
        props: {
          operation:{
            type:Object
          },
          table_id:{
             type: String
          }
        },
      create(){

      },
      methods:{

        onclick(operation){
          this.bus.$emit(this.operation.control_id,operation);
          console.log(this.operation.control_id)
        }

      }
    };
</script>
<style lang="scss" scoped>
    @import "em_button";
</style>
