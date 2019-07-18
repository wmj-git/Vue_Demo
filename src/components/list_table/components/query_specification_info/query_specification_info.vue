<template>
    <div class="query_specification_info">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item :label="item.title" v-for="(item,i) in arr" :key="i">
           <span>{{item.value}}</span>
        </el-form-item>

      </el-form>
    </div>
</template>

<script>
    export default {
        props: {
          row_title:{
            type:Array
          }
        },
      data(){
           return {
               digital:"",
               arr:[]
           }
      },
      mounted(){
           let obj={};
           this.arr=[];
           this.bus.$off("alter_all");
           this.bus.$on("alter_all",res=>{
                this.digital=res;
                console.log(this.row_title);
                console.log(this.digital);
                this.row_title.forEach((val,i)=>{
                   for(let item in this.digital){
                       if(item===val.prop){
                          obj={"title":val.name,"value":this.digital[item]};
                         console.log(obj);
                         this.arr.push(obj);

                       }
                   }
                });
             console.log(this.arr);
           });



      }
    };
</script>
<style scoped lang="scss">
  @import "_query_specification_info";
</style>
