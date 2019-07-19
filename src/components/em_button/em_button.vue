<template>
    <div class="em_button">
         <!--<el-button :icon="operation.icon" @click="onclick(operation.fn,operation.url,table_id,operation.download_url,operation.import_url)" class="em-btn-simple">{{operation.operate}}</el-button>-->
      <el-button :icon="operation.icon" @click="onclick(operation)" class="em-btn-simple">{{operation.operate}}</el-button>

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
           // onclick(fn,url,table_id,download_url,import_url,download_user_url,download_department_url){
           //   this.bus.$emit(this.operation.control_id,{fn:fn,url:url,table_id:table_id,download_url:download_url,import_url:import_url});
           //   console.log(this.operation.control_id)
           // }
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
