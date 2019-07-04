<template>
    <div class="associate_users">
      <el-form>
          <el-form-item>
             <el-transfer v-model="value" :data="data"
              :titles="['全部角色', '选中角色']">
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
  import {roleList,setRoles} from "@/api/table_operate"
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        roleList().then(res=>{           //得到角色列表
          res.data.list.forEach((_val)=>{
            data.push({key:_val.id,label:_val.roleCname})
          });

        });
        return data
      };
      return {
        data: generateData(),      //供选择的角色列表赋值给data
        value: [],
        userId:"" ,    //要修改的用户的id
      };
    },
    methods:{
      recieveRoles(userId){
        this.userId=userId;
      },
      submitAssociate(){
        console.log(this.value);
        setRoles({"roleIds":this.value,"userId":this.userId}).then(res=>{
          console.log(res);
          if(res.statusCode==200){
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
  @import "_associate_users";
</style>
