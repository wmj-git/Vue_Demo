<template>
  <div class="em_selectsUrl">
    <el-select v-model="value" placeholder="请选择"  filterable multiple >
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
            if(val.id&&val.fertilizerName){
              obj={value:val.id,label:val.fertilizerName};
            }

            this.options.push(obj);

          });
        });

      }
    }
  };
</script>
