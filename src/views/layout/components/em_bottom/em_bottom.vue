<template>
  <div class="bottom">
    <win :id="win.id" :data="win">
      <div style="width: 100%;" class="em-bottom-container">
        <el-dialog title="密码修改" :visible.sync="dialogFormVisible" :append-to-body="true" v-dialogDrag="true">
          <el-form :model="form">
            <el-form-item label="旧密码" :label-width="formLabelWidth">
              <el-input v-model="form.oldPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input v-model="form.newPassword" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel" class="em-button">取 消</el-button>
            <el-button type="primary" @click="confirm" class="em-button">确 定</el-button>
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
        form: {
          oldPassword: '',
          newPassword: ''
        },
        formLabelWidth: '60px'
      }
    },
    created() {
      var bodyheight = Number(document.body.clientHeight);
      var bodywidth = Number(document.body.clientWidth);
      console.log(bodyheight);
       //this.win.top=bodyheight-60;

    },
    methods: {
      confirm() {
        this.dialogFormVisible = false;
        modify({
          url: "/user/userext/updatePwd",
          params: this.form
        }).then(res => {
          console.log(res)
          if (res.statusCode == 200) {
            this.alterpasswordSuceess()
          }
        })
      },
      cancel() {
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

