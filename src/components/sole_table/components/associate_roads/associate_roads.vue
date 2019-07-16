<template>
    <div class="associate_roads">
      <el-form>
        <el-form-item>
          <el-transfer v-model="value" :data="data" filterable
                       :titles="['全部路段', '选中的路段']">
          </el-transfer>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAssociate" class="em-button">确认修改</el-button>
          <el-button @click="cancel" class="em-button">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {roadList,roadInformation,setRoads} from "@/api/table_operate"
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        roadList().then(res=>{           //得到用户列表
          console.log(res.data);
          res.data.forEach((_val)=>{
            data.push({key:_val.id,label:_val.roadName})
          });

        });
        return data
      };
      return {
        data: generateData(),      //供选择的用户列表赋值给data
        value: [],
        entId:null,    //要修改的用户的id
      };
    },
    mounted(){
      this.bus.$off("alter_id");
      this.bus.$on("alter_id", res=>{
        this.entId=res;
        console.log(res);
        roadInformation({"entId":res}).then(val=>{
          this.value=[];
          console.log(val);
          val.data.forEach(_val=>{
            this.value.push(_val.id);
          })
        })
      });
    },
    methods:{

      submitAssociate(){
        setRoads({"roadIds":this.value,"entId":this.entId}).then(res=>{
          console.log(res);
          if(res.statusCode===200){
            this.$message({
              message: '关联用户成功',
              type: 'success'
            });
            this.$emit("closeCommonDialog")
          }
        });
      },
      cancel(){
        this.$emit("closeCommonDialog")
      }
    }
  };
</script>
<style scoped lang="scss">
  @import "_associate_roads";
</style>
