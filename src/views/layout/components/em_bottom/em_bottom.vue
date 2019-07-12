<template>
  <div class="bottom">
    <win :id="win.id" :data="win">
      <div style="width: 100%;" class="em-bottom-container">
        <el-dialog title="密码修改" :visible.sync="dialogFormVisible" :append-to-body="true" v-dialogDrag="true" @close="cancel('ruleForm')">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
            <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassword">
              <el-input  type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
              <el-input  type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
              <el-input  type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel('ruleForm')" class="em-button">取 消</el-button>
            <el-button type="primary" @click="confirm('ruleForm')" class="em-button">确 定</el-button>
          </div>
        </el-dialog>
        <el-input v-model="input" placeholder="请输入内容" style="width: 150px"></el-input>

        <el-button class="data_button em-btn-icon-hover" @click="dialogFormVisible = true">
          密码修改
        </el-button>
        <el-button class="data_button em-btn-icon-hover-v1" @click="loginOut">
          退&emsp;&emsp;出
        </el-button>
        <el-button class="data_button em-btn-scene" @click="threeMap">
          三维场景
        </el-button>
        <el-button class="data_button em-btn-scene" @click="twoMap">
          二维场景
        </el-button>

      </div>
    </win>
  </div>
</template>

<script>
  import win from "@/components/win/win"
  import {modify} from "@/api/table_operate"

  export default {
    name: "em_bottom",
    components: {
      win
    },
    data() {
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        win: {
          id: "bottom",
          title: "",
          top: "",
          left: 20,
          show: true,
          resizable: false,
          width: "98%",
          class: "em-bottom-window"
        },
        input: '',
        dialogFormVisible: false,
        ruleForm: {
          oldPassword: '',
          newPassword: '',
          checkPass: '',

        },
        rules: {
          oldPassword: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          newPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass3, trigger: 'blur' }
          ]
        },
        formLabelWidth: '80px'
      }
    },
    methods: {
      confirm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            modify({
              url: "/user/userext/updatePwd",
              params: {oldPassword:this.ruleForm.oldPassword,newPassword:this.ruleForm.newPassword}
            }).then(res => {
              console.log(res)
              if (res.statusCode == 200) {
                this.alterpasswordSuceess()
                this.dialogFormVisible = false;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false
      },
      loginOut() {
        this.$router.push("/login");
      },
      alterpasswordSuceess() {
        this.$message({
          message: '密码修改成功',
          type: 'success'
        });
        setTimeout(() => {
          this.loginOut();
        }, 2000)

      },
      twoMap() {
        this.$router.push("/home/map");
      },
      threeMap() {
        this.$router.push("/home/scene");
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "_em_bottom.scss";
</style>

