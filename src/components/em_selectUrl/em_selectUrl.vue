<template>
  <div class="em_selectUrl">
    <el-select v-model="value" placeholder="请选择" clearable filterable >
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
  import {selectUrl} from "@/api/table_operate";
  export default {
    props: {
      operation:{
        type:Object
      }
    },
    mounted(){
       console.log(this.operation.optionUrl);
       this.setOption()
    },
    data(){
      return{
        options:[],
        value: ''
      }
    },
    methods:{
      setOption(){
        selectUrl({
           url:this.operation.optionUrl
        }).then(res=>{
           console.log(res.data);
           res.data.forEach((val)=>{
             let obj;
             if(val.enumIntValue!==""&&val.enumCvalue){
               obj={value:val.enumIntValue,label:val.enumCvalue};
             }
             if(val.id&&val.fullName){
                obj={value:val.id,label:val.fullName};
             }
             if(val.id&&val.personTypeName){
               obj={value:val.id,label:val.personTypeName};
             }
             if(val.id&&val.entName){
               obj={value:val.id,label:val.entName};
             }
             if(val.id&&val.districtName){
               obj={value:val.id,label:val.districtName};
             }
             if(val.id&&val.plantCname){
               obj={value:val.id,label:val.plantCname};
             }
             if(val.id&&val.gridName){
               obj={value:val.id,label:val.gridName};
             }
             if(val.id&&val.roadName){
               obj={value:val.id,gitlabel:val.roadName};
             }
             if(val.rankName){
               obj={value:val.rankName,label:val.rankName};
             }
             if(val.id&&val.treeTypeName){
               obj={value:val.id,label:val.treeTypeName};
             }
             if(val.id&&val.plantTypeName){
               obj={value:val.id,label:val.plantTypeName};
             }
             if(val.id&&val.fertilizerName){
               obj={value:val.id,label:val.fertilizerName};
             }
             if(val.id&&val.orgName){
               obj={value:val.id,label:val.orgName};
             }

             this.options.push(obj);

           });
        });

      }
    }
  };
</script>
