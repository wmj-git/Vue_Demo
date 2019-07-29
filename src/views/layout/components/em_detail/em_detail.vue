<template>
    <div class="em_detail">
      <el-button @click="hideDetail">X</el-button>
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item class="picture" v-if="imgUrl!==''">
          <el-image
            :src="baseUrl+imgUrl"
            fit="fill">
          </el-image>
        </el-form-item>
        <el-form-item :label="item.name" v-for="(item,index) in data " :key="index">
          <span>{{item.value}}</span>
        </el-form-item>

      </el-form>
    </div>
</template>

<script>
    export default {
        props: {
        },
        data(){
           return{
             id:"detail",
             data:[],
             imgUrl:'',
             baseUrl:''
           }
        },
        mounted(){
           this.bus.$on(this.id,res=>{
             console.log(res);
               this.data=[];
               if(res.imgUrl){
                 this.imgUrl=res.imgUrl;
                 this.baseUrl=res.baseUrl;
               }
               else{
                 this.imgUrl='';
                 this.baseUrl='';
               }
               res.label.forEach(val=>{
                 console.log(val);
                 for(let i in res.row){
                    if(i===val.params){
                      this.data.push({name:val.name,value:res.row[i]});
                    }

                 }
               })
           })
        },
        methods:{
          hideDetail(){
            $(".em_detail").removeClass("addWidth");
          }
        }
    };
</script>
<style scoped lang="scss">
  @import "_em_detail";
</style>
