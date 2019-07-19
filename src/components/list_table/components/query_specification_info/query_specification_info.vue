<template>
    <div class="query_specification_info">
      <el-table
        :data="digital"
        style="width: 100%">
        <el-table-column v-for="item in label"
          :prop="item.prop"
          :label="item.name"
          width="180">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import {querySpecifications} from "@/api/table_operate"

  export default {
        props: {
          row_title:{
            type:Array
          }
        },
      data(){
           return {
               digital:[],
               label:[]
           }
      },
      mounted(){
          let ids=[];
          this.bus.$off("alter_all");
          this.bus.$on("alter_all",(obj1,obj2)=>{
            console.log(obj2.label);
             this.label=obj2.label;
              ids.push(obj1.id);
              console.log(ids);
              querySpecifications({ids:ids}).then(val=>{
                  this.digital=val.data;
                  console.log(this.digital);
              })
          })



      }
    };
</script>
<style scoped lang="scss">
  @import "_query_specification_info";
</style>
