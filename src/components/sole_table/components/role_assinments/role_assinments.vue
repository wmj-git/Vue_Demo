<template>
    <div class="role_assinments">
      <el-form  label-width="100px">
        <el-form-item label="角色">
          <el-select v-model="roles" multiple placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="em-button" @click="submitRoles">确认修改</el-button>
          <el-button @click="cancel" class="em-button">取消</el-button>
        </el-form-item>
      </el-form>

    </div>
</template>

<script>
  import {roleList,setRoles} from "@/api/table_operate"
    export default {
        data(){
            return{
              roles:"" ,    //选择的角色
              userId:"",     //要修改的用户的id
              roleOptions: [],// 角色管理的选项
            }
        },
      beforeCreate(){
          let roleArr=[];
          roleList().then(res=>{           //得到角色列表
            res.data.list.forEach((_val)=>{
              roleArr.push({"value":_val.id,"label":_val.roleCname})
            });
            this.roleOptions=roleArr;
            console.log( this.roleOptions)
          })

      },
        methods:{
          recieveRoles(userId){
            this.userId=userId;
          },
          submitRoles(){               //提交修改好的角色
            console.log(this.roles);
            setRoles({"roleIds":this.roles,"userId":this.userId}).then(res=>{
              console.log(res);
              if(res.statusCode==200){
                this.$message({
                  message: '角色分配成功',
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
