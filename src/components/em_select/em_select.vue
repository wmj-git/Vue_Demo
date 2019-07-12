<template>
    <div class="em_select">
      <el-select v-model="value" placeholder="请选择" @change="change" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
</template>

<script>
    export default {
        props: {
          operation:{
            type:Object
          },
          select:{
            type:Array
          }

        },
        created(){
          if(this.operation){
            this.options=this.operation.options;
          }
          else{
             this.options=this.select;
          }

        },
        data(){
           return{
               options:"",
               value: ''
           }
        },
        methods:{
            change(val){
                this.bus.$emit("deliver_val",val)
            }
        }
    };
</script>
<style lang="scss" scoped>
  @import "em_select";
</style>
