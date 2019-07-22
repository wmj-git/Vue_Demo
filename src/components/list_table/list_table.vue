<template>
  <div class="list_table" style="width: 100%;height: 100%">
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
        <el-button @click="dialogFormVisible = false" class="em-btn_shadow">取 消</el-button>
        <el-button type="primary" @click="submitUpload" class="em-btn_shadow">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="commonDialogTitle" :width="commonDialogWidth" :visible.sync="dialogCommonVisible"
               :modal-append-to-body="false" v-dialogDrag="true">
      <component :is="commonDialogComponent" @closeCommonDialog="closeCommonDialog" ref="dialogComponent"
                 v-if="dialogCommonVisible" :row_title="label"></component>
    </el-dialog>
    <el-row style="height: 100%">
      <el-col :span="10" style="height: 100%;" class="table-classification">
        <ul>
          <li v-for="(item,index) in list.data" :id="index" @click="change(item.id)"
              v-bind:class='{active:item.id==classID}'>{{item.name}}
          </li>
        </ul>

      </el-col>
      <el-col :span="38" style="height: 100%" class="table-container">
        <div class="table digital_table" style="height: 100%">
          <el-row class="operation">
            <template v-for="item in this.data[digital_table_id].operation">
              <component :is="item.type" :operation="item" :table_id="table_id" ref="child"
                         @keyup.enter.native="search()" :key="item.id"></component>
            </template>
          </el-row>
          <el-table
            class="my-table"
            border
            height="600px"
            highlight-current-row
            @current-change="handleCurrentChange"
            ref="multipleTable"
            tooltip-effect="dark"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="index"
              fixed="left"
              align="center"
              :index="table_idx"
            >
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
              min-width="220"
              v-if="typeof (data[digital_table_id].table.after_digital_button)!='undefined'"
            >
              <template slot-scope="scope">
                <el-button class="em-btn-operation" v-for="item in data[digital_table_id].table.after_digital_button"
                           :key="item.id"
                           size="small"
                           @click="rightButton(item)">{{item.name}}
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

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    add,
    dele,
    modify,
    find,
    downCsvmodel,
    upLoad,
    completeProgram,
    querySpecifications
  } from "@/api/table_operate"
  import {findMenuByThisUser} from "@/api/resource"
  import {getToken} from '@/utils/auth'
  import em_button from "@/components/em_button/em_button"
  import em_input from "@/components/em_input/em_input"
  import em_select from "@/components/em_select/em_select"
  import complex_em_input from "@/components/complex_em_input/complex_em_input"
  import em_dialogs from "@/components/em_dialogs/em_dialogs"
  import em_date from "@/components/em_date/em_date"
  import query_specification_info from "./components/query_specification_info/query_specification_info"
  import execute_program from "./components/execute_program/execute_program"

  export default {
    name: "compone",
    components: {
      em_button,
      em_input,
      em_select,
      complex_em_input,
      em_dialogs,
      em_date,
      query_specification_info,
      execute_program
    },
    props: ["data"],
    data() {
      return {
        classID: 0,
        list: {},
        digital_table_id: "",
        label: [],
        table_id: "",
        label_input: [],
        tableData: [],
        currentRow: null,
        multipleSelection: [],
        totalSize: null,
        currentPage: 1,
        pageSize: 10,
        delever_obj: "",      // 主要保存add,alter请求的url,table_id
        alter_obj: "",        //单选行选中进行修改的对象
        ids: [],         //要删除的对象的id数组
        dialogFormVisible: false, //导入表格弹框控制显示隐藏的布尔值
        dialogCommonVisible: false,  //等弹框控制显示隐藏的布尔值
        action: "",
        fileList: [],
        isAddEventClick: false,
        headers: {
          "Authorization": getToken()
        },
        commonDialogComponent: "",  //渲染在查看执行规则等的动态组件名
        commonDialogTitle: "",     //渲染在查看执行规则等的弹框的title名
        commonDialogWidth: ""     //渲染在查看执行规则等的弹框的宽度
      }
    },
    created() {
      this.list = this.data.list;
      this.digital_table_id = this.list.data[0].id;
    },
    mounted() {
      // findMenuByThisUser({"pid":7}).then(res=>{
      //     console.log(res)
      // });
      $("ul li:first-child").addClass('active');
      this.table_id = this.data[this.digital_table_id].table.id;
      this.label = this.data[this.digital_table_id].table.label;
      this.label_input = this.data[this.digital_table_id].table.label.filter(val => {
        return val.add_show
      });
      this.init(); //初始化表格数据
      console.log(this.label)
    },

    methods: {
      change(id) {
        this.classID = id;
        $("ul li:first-child").removeClass('active');
        console.log(id);
        this.digital_table_id = id;
        this.table_id = this.data[this.digital_table_id].table.id;
        this.label = this.data[this.digital_table_id].table.label;
        this.label_input = this.data[this.digital_table_id].table.label.filter(val => {
          return val.add_show
        });
        for (var i = 0; i < this.$refs.child.length; i++) {
          if (this.$refs.child[i].complex_em_input_select) {
            console.log("清空");
            this.$refs.child[i].input = "";
            this.$refs.child[i].complex_em_input_select = "";
          }
          if (this.$refs.child[i].input && this.$refs.child[i].params) {
            this.$refs.child[i].input = ""
          }

        }
        this.init();

      },
      handleSelectionChange(val) {// 多选框（选中删除）
        this.multipleSelection = val;
        console.log(this.multipleSelection);
        this.bus.$emit("count", this.multipleSelection)

      },
      handleCurrentChange(val) {     //单选行 （选中修改）
        this.currentRow = val;
        this.alter_obj = this.currentRow;
        console.log(this.alter_obj);
        this.bus.$emit("alter", this.alter_obj)

      },
      handleCurrentChangepage(val) {        //当前页
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.init();
      },
      handleSizeChange(val) {                 //每页几条
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.init();  //重新请求表格数据
      },
      init() {                               //表格加载数据

        let obj = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        };

        for (var i = 0; i < this.$refs.child.length; i++) {
          console.log(this.$refs.child[i]);
          if (this.$refs.child[i].input && this.$refs.child[i].params) {                              //input框是操作中第一个组件时
            console.log(this.$refs.child[i].params);
            console.log(this.$refs.child[i].input);
            let role_manage_input = this.$refs.child[i].input;
            let params = this.$refs.child[i].params;
            obj[params] = role_manage_input;
          }
          if (this.$refs.child[i].complex_em_input_select && this.$refs.child[i].input) {   //选择参数进行查询
            console.log(this.$refs.child[i].complex_em_input_select);
            let comlex_input = this.$refs.child[i].complex_em_input_select;
            let commo_input = this.$refs.child[i].input;
            obj[comlex_input] = commo_input;
          }
          if (this.$refs.child[i].time1) {
            let time1 = this.$refs.child[i].time1;    //时间范围查询参数
            if (time1) {
              obj.startTime = time1.getTime();

            }
          }
          if (this.$refs.child[i].time2) {
            let time2 = this.$refs.child[i].time2;
            if (time2) {
              obj.endTime = time2.getTime();
            }
          }
        }
        find({                      //页面渲染时拿表格数据
          url: this.data[this.digital_table_id].table.table_url,
          params: obj
        }).then(res => {
          console.log(res);
          this.tableData = res.data.list;
          this.totalSize = res.data.total;
        });

        this.control();

      },
      rightButton(obj) {
        console.log(obj.fn);
        this[obj.fn](obj);

        this.commonDialogComponent = obj.component_name;
        this.commonDialogTitle = obj.dialog_name;
        this.commonDialogWidth = obj.dialog_width;
        setTimeout(() => {
          console.log(obj);
          this.bus.$emit("alter_all", this.alter_obj, obj);   //是查找执行规格等接受的数据

        });
      },
      control() {
        this.bus.$off(this.data[this.digital_table_id].table.id);
        this.bus.$on(this.data[this.digital_table_id].table.id, obj => this[obj.fn](obj));
      },
      add(obj) {
        console.log(this.$refs.dialog);
        this.$refs.dialog.showdialog(obj);  //调用子组件em_dialogs的方法显示弹出框;
        this.delever_obj = obj;
        console.log(this.delever_obj)
      },
      dele(obj) {
        this.multipleSelection.forEach(val => {
          console.log(val);
          this.ids.push(val.id);   //提取出需要传给后台的参数ids
        });
        if (this.ids.length !== 0) {
          this.$confirm('此操作将删除所选项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {


            dele({
              url: obj.url,
              params: this.ids

            }).then(res => {
              this.ids = [];
              if (res.statusCode === 200) {
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
        console.log("查询");
        this.currentPage = 1;
        this.init();
      },
      modify(obj) {
        console.log(this.$refs.dialog);
        this.$refs.dialog.showdialog(obj);  //调用子组件em_dialogs的方法显示弹出框;
        this.delever_obj = obj;
        console.log(this.delever_obj);
      },
      recieveObj(val) {              //把dialog表单里的数据拿到
        console.log(this.delever_obj.url);
        console.log(this.delever_obj.table_id);
        if (val.fn === "add") {
          add({
            url: this.delever_obj.url,
            params: val.form,
            id: this.delever_obj.table_id
          }).then(res => {
            console.log(res);
            if (res.statusCode === 200) {
              this.$refs.dialog.cancel();
              this.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              });
              this.init();
            }

          });
        }
        if (val.fn === "modify") {
          modify({
            url: this.delever_obj.url,
            params: val.form
          }).then(res => {
            console.log(res);
            if (res.statusCode === 200) {
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
      import(obj) {
        this.dialogFormVisible = true;
        this.delever_obj = obj;
        this.action = process.env.BASE_API + obj.import_url;
        console.log(this.action);
      },
      downloadModel() {                 //下载导出需要的模板
        console.log(this.delever_obj);
        window.location.href = process.env.BASE_API + this.delever_obj.download_url
      },
      export(obj) {                    //将数据以表格形式导出
        window.location.href = process.env.BASE_API + obj.url
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
        if (response.data.jsonmsg.ERRORMSG === "") {
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
      coutProgram(obj) {
        console.log(obj);
        this.$refs.dialog.showdialog(obj);  //调用子组件em_dialogs的方法显示弹出框;
      },
      table_idx(index) {                                   //控制表格数据行号
        return (this.currentPage - 1) * this.pageSize + index + 1
      },

      querySpecificationInfo(obj) {               //打开查看肥料规则等的公共弹窗
        this.dialogCommonVisible = true;

      },
      closeCommonDialog() {
        this.dialogCommonVisible = false;  //关闭查看肥料规则等的公共弹窗
      },
      executeProgram() {               //生成记录
        this.dialogCommonVisible = true;
      },
      complete() {
        let arr = [];
        this.$confirm('此操作不可逆, 是否完成?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setTimeout(_ => {
            arr.push(this.alter_obj.id);
            completeProgram({ids: arr}).then(res => {
              this.$message({
                type: 'success',
                message: '已完成!'
              });
              this.init();
            })
          })

        }).catch(() => {

        });


      }
    }
  }
</script>

<style scoped lang="scss">
  @import "list_table";

  .table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

</style>
