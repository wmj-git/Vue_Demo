<template>
  <div class="sole_table table-container" style="width: 100%;height: 100%">
    <em_dialogs ref="dialog" :label="label_input" @eventFromDialog="recieveObj"></em_dialogs>
    <el-dialog title="导入" :visible.sync="dialogFormVisible" :modal-append-to-body="false" v-dialogDrag="true">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :limit="1"
        :headers="headers"
        name="upfile"
        accept=".xls,.docx,.xlsx,.csv "
        :on-error="uploadFileErro"
        :on-success="uploadFileSuccess"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary" class="em-btn-border">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="downloadModel" class="em-btn-border">
          下载模板
        </el-button>
        <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="em-button">取 消</el-button>
        <el-button type="primary" @click="submitUpload" class="em-button">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="commonDialogTitle" :width="commonDialogWidth" :visible.sync="dialogCommonVisible"
               :modal-append-to-body="false" v-dialogDrag="true">
      <component :is="commonDialogComponent" @closeCommonDialog="closeCommonDialog" ref="dialogComponent" v-if="dialogCommonVisible"></component>
    </el-dialog>
    <div class="table digital_table">
      <el-row class="operation">
        <template v-for="item in this.data.operation">
          <component :is="item.type" :operation="item" :table_id="table_id" ref="child" @keyup.enter.native="search()"></component>
        </template>
      </el-row>
      <el-table
        class="my-table"
        v-loading="listLoading"
        border
        height="600px"
        highlight-current-row
        @current-change="handleCurrentChange"
        @expand-change="openCurrentChangeRow"
        ref="multipleTable"
        tooltip-effect="dark"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="index"
          fixed="left"
          align="center"
          :index="table_idx"
        >
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" >
                  <el-form-item :label="item.name" v-for="(item,i) in label" :key="i">
                    <span>{{ props.row[item.prop]}}</span>
                  </el-form-item>

              <el-form-item class="picture" v-if="imgUrl!==''">
                <el-image
                  :src="baseUrl+imgUrl"
                  fit="fill">
                </el-image>
              </el-form-item>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column v-for="(item,index) in label"
                         :key="index"
                         :prop="item.prop"
                         :label="item.name"
                         :min-width="item.width"
                          align="center"
                         :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          min-width="160"
          v-if="typeof (data.table.after_digital_button)!='undefined'"
        >
          <template slot-scope="scope">
            <el-button class="em-btn-operation" v-for="item in data.table.after_digital_button"
                       :key="item.id"
                       size="small"
                       @click="control(item)">{{item.name}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangepage"
          :current-page="currentPage"
          :page-sizes="[10, 20,30,40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize">
        </el-pagination>
      </div>
    </div>
  </div>


</template>

<script>

  import {add, dele, modify, find, downCsvmodel, upLoad, resetPassword,delEntRoad,roadInformation,getPictureImg} from "@/api/table_operate"
  import em_button from "@/components/em_button/em_button"
  import em_input from "@/components/em_input/em_input"
  import em_dialogs from "@/components/em_dialogs/em_dialogs"
  import complex_em_input from "@/components/complex_em_input/complex_em_input"
  import em_date from "@/components/em_date/em_date"
  import {getToken} from '@/utils/auth'
  import role_assignments from "./components/role_assinments/role_assinments"
  import associate_users from "./components/associate_users/associate_users"
  import associate_roads from "./components/associate_roads/associate_roads"
  import permission_assignments from "./components/permission_assignments/permission_assignments"

  export default {
    name: "sole_table",
    components: {
      em_button,
      em_input,
      complex_em_input,
      em_date,
      em_dialogs,
      role_assignments,
      associate_users,
      associate_roads,
      permission_assignments,
    },
    data() {
      return {
        label: [],
        table_id: "",
        label_input: [],
        tableData: [],
        listLoading: false,
        currentRow: null,
        multipleSelection: [],
        ids: [],         //要删除的对象的id数组
        input: '',
        currentPage: 1,
        pageSize: 10,
        totalSize: null,
        table_list: [],
        baseUrl:"",          //表格展开详情里图片的固定url
        imgUrl:"",          //表格展开详情里图片的变化url
        formLabelWidth: '120px',
        dialogVisible: false,
        delever_obj: "",      // 主要保存add,alter请求的url,table_id
        alter_obj: "",       //单选行选中进行修改的对象
        dialogFormVisible: false, //导入表格弹框控制显示隐藏的布尔值
        dialogCommonVisible: false,  //角色分配，权限分配，关联用户等等弹框控制显示隐藏的布尔值
        fileList: [],
        action: "",
        operation_height: 34,
        headers: {
          "Authorization": getToken()
        },
        commonDialogComponent: "",  //渲染在角色分配等的动态组件名
        commonDialogTitle: "",     //渲染在角色分配等的弹框的title名
        commonDialogWidth: ""     //渲染在角色分配等的弹框的宽度
      }
    },
    props: ["data"],
    methods: {

      handleSelectionChange(val) {// 多选框（选中删除）
        this.multipleSelection = val;
        console.log(this.multipleSelection);

      },
      handleCurrentChange(val) {     //单选行 （选中修改）
        this.currentRow = val;
        this.alter_obj = this.currentRow;
        console.log(this.alter_obj);
        this.bus.$emit("alter", this.alter_obj)          //是修改弹框需要接受的数据

      },
      handleCurrentChangepage(val) {        //当前页
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        // console.log(this.currentPage);
        this.init();
      },
      handleSizeChange(val) {                 //每页几条
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.init();  //重新请求表格数据
      },
      openCurrentChangeRow(row,expandRows){     //展开行时
         if(expandRows[0]&&this.data.table.picture_url){
           getPictureImg({url:this.data.table.picture_url,id:expandRows[0].id}).then(res=>{
                 this.imgUrl=res.data[0].fileName;

                 this.baseUrl=process.env.IMG_API
           })
         }
      },
      init() {                               //表格加载数据

        let obj = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        };
        console.log(this.$refs.child[0]);
        if (this.$refs.child[0].time1) {
          console.log(this.$refs.child[0].time1);
          let time1 = this.$refs.child[0].time1;    //时间范围查询参数
          if (time1) {
            obj.startTime = time1.getTime();

          }
        }
        if (this.$refs.child[0].time2) {
          let time2 = this.$refs.child[0].time2;
          if (time2) {
            obj.endTime = time2.getTime();
          }
        }
        if (this.$refs.child[1].time1) {
          let time1 = this.$refs.child[1].time1;    //时间范围查询参数
          if (time1) {
            obj.startTime = time1.getTime();

          }
        }
        if (this.$refs.child[1].time2) {
          let time2 = this.$refs.child[1].time2;
          if (time2) {
            obj.endTime = time2.getTime();
          }
        }
        if (this.$refs.child[1].input && this.$refs.child[1].params) {
          let input = this.$refs.child[1].input.trim();        //input框是操作中第二个组件时
          let params = this.$refs.child[1].params;
          if (input && params) {
            obj[params] = input;
          }
        }
        if (this.$refs.child[0].complex_em_input_select && this.$refs.child[0].input) {   //选择参数进行查询
          let comlex_input = this.$refs.child[0].complex_em_input_select;
          let commo_input = this.$refs.child[0].input.trim();
          obj[comlex_input] = commo_input;
        }
        if (this.$refs.child[0].input && this.$refs.child[0].params) {                              //input框是操作中第一个组件时
          let role_manage_input = this.$refs.child[0].input.trim();
          let params = this.$refs.child[0].params;
          obj[params] = role_manage_input;
        }
        if(this.$refs.child[2]){
          if (this.$refs.child[2].input && this.$refs.child[2].params) {                              //input框是操作中第三个组件时
            let operate_input = this.$refs.child[2].input.trim();
            let params = this.$refs.child[2].params;
            obj[params] = operate_input;
          }
        }
        if(this.$refs.child[3]){
          if (this.$refs.child[3].input && this.$refs.child[3].params) {                              //input框是操作中第四个组件时
            let url_input = this.$refs.child[3].input.trim();
            let params = this.$refs.child[3].params;
            obj[params] = url_input;
          }
        }


        find({                      //页面渲染时拿表格数据
          url: this.data.table.table_url,
          params: obj
        }).then(res => {
          console.log(res);
          res.data.list.forEach((_val) => {
            for (let _i in _val) {
              if(_i==="isSpecial"){
                if (_val[_i] === 0) {
                  _val[_i] = "否";
                } else if (_val[_i] === 1) {
                  _val[_i] = "是"
                }
              }
              else if(_i==="flowersPlantsOrTree"){
                if (_val[_i] === 0) {
                  _val[_i] = "树";
                } else if (_val[_i] === 1) {
                  _val[_i] = "花卉"
                }
              }
            }

          });

          this.tableData = res.data.list;
          this.totalSize = res.data.total;
        })
      },
      table_idx(index) {                         //控制表格数据行号
        return (this.currentPage - 1) * this.pageSize + index + 1
      },
      control(obj) {
        this[obj.fn](obj);
        if (obj.component_name) {
          this.commonDialogComponent = obj.component_name;
          this.commonDialogTitle = obj.dialog_name;
          this.commonDialogWidth = obj.dialog_width;
          setTimeout(() => {
            this.bus.$emit("alter_id", this.alter_obj.id);   //是分配角色等接受的数据
          });
        }
      },
      add(obj) {
        this.$refs.dialog.showdialog(obj);  //调用子组件em_dialogs的方法显示弹出框;
        this.delever_obj = obj;
        console.log(this.delever_obj)
      },
      dele(obj) {
        this.multipleSelection.forEach(val => {
          this.ids.push(val.id);   //提取出需要传给后台的参数ids
        });
        if (this.ids.length != 0) {
          this.$confirm('此操作将删除所选项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            dele({
              url: obj.url,
              params: this.ids

            }).then(res =>
            {
              this.ids = [];
              if (res.statusCode == 200) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.init();
              }

            })

          }).catch(() => {

          });
        }
      },
      search() {
        this.currentPage = 1;
        this.init();
      },
      modify(obj) {
        console.log(this.$refs.dialog);
        this.$refs.dialog.showdialog(obj);  //调用子组件em_dialogs的方法显示弹出框;
        this.delever_obj = obj;
        console.log(this.delever_obj);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      import(obj) {
        this.dialogFormVisible = true;
        this.delever_obj = obj;
        this.action = process.env.BASE_API + obj.import_url;
        console.log(this.action);
      },
      downloadModel() {                 //下载导出需要的模板
        window.location.href = process.env.BASE_API + this.delever_obj.download_url
      },
      export(obj) {                    //将数据以表格形式导出
        window.location.href = process.env.BASE_API + obj.url
      },
      recieveObj(val) {              //把dialog表单里的数据拿到
        console.log(this.delever_obj.url);
        console.log(this.delever_obj.table_id);
        if (val.fn == "add") {
          add({
            url: this.delever_obj.url,
            params: val.form,
            id: this.delever_obj.table_id
          }).then(res => {
            console.log(res);
            if (res.statusCode == 200) {
              this.$refs.dialog.cancel();
              this.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              });
              this.init();

            }

          });
        }
        if (val.fn == "modify") {
          modify({
            url: this.delever_obj.url,
            params: val.form
          }).then(res => {
            console.log(res);
            if (res.statusCode == 200) {
              this.$refs.dialog.cancel();
              this.$message({
                message: '恭喜你，修改成功',
                type: 'success'
              });
              this.init();
            }
          });
        }


      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);

      },
      uploadFileErro(err, file, fileList) {
        console.log(err);
        this.$message.error('错了哦，这是一条错误消息');

      },
      uploadFileSuccess(response, file, fileList) {
        console.log(response.data.jsonmsg.ERRORMSG);
        if (response.data.jsonmsg.ERRORMSG == "") {
          this.$message({
            message: '恭喜你，导入成功',
            type: 'success'
          });
          this.init();
        } else {
          this.$message({
            message: response.data.jsonmsg.ERRORMSG.slice(response.data.jsonmsg.ERRORMSG.indexOf("=") + 1),
            type: 'error'
          });
        }

      },
      resetPasswordBox() {     //重置密码的方法
        this.$confirm('此操作将重置此用户密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'em-message-box'
        }).then(() => {
          resetPassword(this.alter_obj.id).then(res => {
            if (res.statusCode == 200) {
              this.$message({
                message: '恭喜你，重置密码成功',
                type: 'success'
              });
            }
          })
        }).catch(() => {

        })
      },
      showCommonDialog() {                  //打开角色分配等的公共弹窗
        this.dialogCommonVisible = true;
      },
      closeCommonDialog() {
        this.dialogCommonVisible = false;  //关闭角色分配等的公共弹窗
      },
      roleAssignments() {           //触发角色分配的弹框
        this.showCommonDialog();
      },
      permissionAssignments() {         //触发权限分配的弹框
        this.showCommonDialog();
      },
      associateUsers() {             //触发关联用户的弹框
        this.showCommonDialog();
      },
      associateRoads(){
        this.showCommonDialog();
      },
      cancelAssociation(){   //养护单位取消与路段的关联
        this.$confirm('此操作将永久取消关联, 是否继续?', '取消关联', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setTimeout(() => {
            roadInformation({"entId":this.alter_obj.id}).then(val=>{
              this.roadIds=[];
              val.data.forEach(_val=>{
                this.roadIds.push(_val.id);
              });
              console.log(this.roadIds);
              delEntRoad({entId:this.alter_obj.id,roadIds:this.roadIds}).then(res=>{
                if(res.statusCode===200){
                  this.$message({
                    message: '取消关联成功',
                    type: 'success'
                  });
                }
              })
            });
          });
        }).catch(() => {
        });


      }
    },
    mounted() {
      console.log(typeof (this.data.table.after_digital_button));
      this.table_id = this.data.table.id;
      this.label = this.data.table.label;
      this.label_input = this.data.table.label.filter(val => {
        return val.add_show
      });
      console.log(this.label);
      this.init(); //初始化表格数据

      this.bus.$on(this.data.table.id, obj => {// 通过按钮组件（添加，删除..）的点击事件触发此组件的control方法
        this.control(obj);
      });
    },
    beforeDestroy() {
      this.bus.$off(this.data.table.id);
    }
  }
</script>

<style scoped lang="scss">
  @import "sole_table";
</style>
