<template>
  <div class="bottom">
    <win :id="win.id" :data="win">
      <div style="width: 100%;" class="em-bottom-container">
        <!--<el-dialog title="密码修改" :visible.sync="dialogFormVisible" :append-to-body="true" v-dialogDrag="true"-->
                   <!--@close="cancel('ruleForm')">-->
          <!--<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">-->
            <!--<el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassword">-->
              <!--<el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">-->
              <!--<el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">-->
              <!--<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
          <!--<div slot="footer" class="dialog-footer">-->
            <!--<el-button @click="cancel('ruleForm')" class="em-button">取 消</el-button>-->
            <!--<el-button type="primary" @click="confirm('ruleForm')" class="em-button">确 定</el-button>-->
          <!--</div>-->
        <!--</el-dialog>-->
        <el-dialog title="数据展示" :visible.sync="digitalCollapseVisible" :append-to-body="true" v-dialogDrag="true">
          <el-collapse>
            <el-collapse-item  v-for="(item,index) in data" :key="index">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title" >{{item.title}}</span>
                </template>
                  <div v-for="(val,i) in item.list"  :key="i">
                       {{val.name}}:{{val.num}}{{val.init}}
                  </div>
            </el-collapse-item>
          </el-collapse>
        </el-dialog>

        <!--<el-input v-model="input" placeholder="请输入内容" style="width: 150px"></el-input>-->

        <!--<el-button class="data_button em-btn-icon-hover" @click="dialogFormVisible = true">-->
          <!--密码修改-->
        <!--</el-button>-->
        <el-button class="data_button em-btn-icon-hover-v1" @click="loginOut">
          退&emsp;&emsp;出
        </el-button>
        <el-button class="data_button em-btn-icon-hover" @click="digitalCollapseVisible=true">
          数据
        </el-button>
        <el-button class="data_button em-btn-icon-hover-v3" @click="twoMap">
          二维场景
        </el-button>
        <el-button class="data_button em-btn-icon-hover-v2" @click="threeMap">
          三维场景
        </el-button>
        <el-select class="data_button" v-model="selectValue" placeholder="选择底图" @change="selectFn">
          <el-option
            v-for="item in selectOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="map-title">底图:</span>
      </div>
    </win>
  </div>
</template>

<script>
  import win from "@/components/win/win"
  import {modify} from "@/api/table_operate"
  import {logout} from  "@/api/login"
  import {digital} from  "@/api/digital"
  import {removeToken} from  "@/utils/auth"
  export default {
    name: "em_bottom",
    components: {
      win
    },
    data() {
      // var validatePass1 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入原密码'));
      //   } else {
      //     callback();
      //   }
      // };
      // var validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入新密码'));
      //   } else {
      //     if (this.ruleForm.checkPass !== '') {
      //       this.$refs.ruleForm.validateField('checkPass');
      //     }
      //     callback();
      //   }
      // };
      // var validatePass3 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入新密码'));
      //   } else if (value !== this.ruleForm.newPassword) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };

      return {
        win: {
          id: "bottom",
          title: "",
          top: "",
          left: "calc((100% - 78%)/2)",
          show: true,
          resizable: false,
          width: "78%",
          height: "58px",
          class: "em-bottom-window"
          //class: "em-table-window"
        },
        data: [
          {
            title: "各数量统计",
            list: [
              {name: "公园总数", num: 15, init: "座",id:"civicBuilding"},
              {name: "视频监控点", num: 15, init: "个",id:"monitoringPoints"},
              {name: "环境监测点", num: 5866, init: "个",id:"temhumPoints"},
              {name: "防火监测点", num: 2368, init: "个",id:"fireAlarm"},
              {name: "绿道", num: 102, init: "条",id:"flowerGreenSpace"},
            ]
          },
          {
            title: "公园详情",
            list: [{name: "绿化总面积", num: 899, init: "公顷",id:""},
              {name: "绿化率", num: "58.9%", init: ""},
              {name: "占地总面积", num: 1286, init: "公顷"},
              {name: "年均人流量", num: 85689, init: "人次"},

            ]
          },
          {
            title: "客流量统计",
            list: [{name: "当前客流量", num: 25638, init: "人次"},
              {name: "饱和度", num: "52%", init: ""},
              {name: "客流量最多", num: "羊台山森林公园", init: "公顷"}
            ]
          },
          {
            title: "绿道详情",
            list: [{name: "绿化总面积", num: 899, init: "公顷"},
              {name: "绿化率", num: "58.9%", init: ""},
              {name: "总占地面积", num: 1286, init: "公顷"},
              {name: "年均人流量", num: 85689, init: "人次"},
            ]
          },
          {
            title: "绿地养护监控",
            list: [{name: "自动浇灌设备故障率", num: "6.31%", init: ""},
              {name: "出水量统计", num: 5.02, init: "升"},
              {name: "浇灌速率统计", num: 2.20, init: "小时/次"}
            ]
          }
        ],
        input: '',
        dialogFormVisible: false,
        digitalCollapseVisible: false,
        ruleForm: {
          oldPassword: '',
          newPassword: '',
          checkPass: '',
        },
        rules: {
          /* oldPassword: [
             {validator: validatePass1, trigger: 'blur'}
           ],
           newPassword: [
             {validator: validatePass2, trigger: 'blur'}
           ],
           checkPass: [
             {validator: validatePass3, trigger: 'blur'}
           ]*/
        },
        formLabelWidth: '60px',
        selectOption: [
          {
            value: '1',
            label: '天地图矢量图'
          },
          {
            value: '2',
            label: '天地图影像图'
          },
          {
            value: '3',
            label: '百度矢量图'
          },
          {
            value: '4',
            label: '百度影像图'
          },
          {
            value: '5',
            label: '时空云矢量图'
          },
          {
            value: '6',
            label: '时空云影像图'
          },
          {
            value: '7',
            label: '本地矢量图'
          },
          {
            value: '8',
            label: '本地影像图'
          }
        ],
        selectValue: "",
        post: {
          momitor: '14'
        }
      }
    },
    methods: {
      confirm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            modify({
              url: "/user/userext/updatePwd",
              params: {oldPassword: this.ruleForm.oldPassword, newPassword: this.ruleForm.newPassword}
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
        this.$store.dispatch("user/LogOut").then(res=>{
          console.log(res);
          this.$router.push("/login");
        })

      },
      alterpasswordSuceess() {
        this.$message({
          message: '密码修改成功',
          type: 'success'
        });
        setTimeout(() => {
          this.loginOut();
        }, 500)
      },
      twoMap() {
        this.$router.push("/home/map");
      },
      threeMap() {
        this.$router.push("/home/scene");
      },
      selectFn() {
        let _scene = this.$store.getters["scene/type"];
        this.bus.$emit(_scene, {
          fn: "baseMapFn",
          layerName: this.selectValue
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "_em_bottom.scss";
</style>

