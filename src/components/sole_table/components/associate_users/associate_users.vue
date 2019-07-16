<template>
    <div class="associate_users">
      <el-form>
          <el-form-item>
             <el-transfer v-model="value" :data="data" filterable
              :titles="['全部用户', '选中的用户']">
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
  import {userList,setRoles,userInformation} from "@/api/table_operate"
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        userList().then(res=>{           //得到用户列表
          console.log(res.data);
          res.data.forEach((_val)=>{
            data.push({key:_val.id,label:_val.accountNumber})
          });

        });
        return data
      };
      return {
        data: generateData(),      //供选择的用户列表赋值给data
        value: [],
        roleIds:[] ,    //要修改的用户的id
      };
    },
     mounted(){
       this.bus.$off("alter_id");
       this.bus.$on("alter_id", res=>{
          this.roleIds.push(res);
         userInformation({"roleId":res}).then(val=>{
             this.value=[];
             val.data.forEach(_val=>{
                this.value.push(_val.id);
             })
         })
       });
     },
    methods:{
      submitAssociate(){
        console.log(this.roleIds);
        console.log(this.value);
        setRoles({"roleIds":this.roleIds,"userIds":this.value,"type":1}).then(res=>{
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
