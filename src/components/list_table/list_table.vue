<template>
  <div class="list_table" style="width: 100%;height: 100%">
    <el-row style="height: 100%">
      <el-col :span="6" style="height: 100%;" class="table-classification">
          <p>{{list.title}}</p>
          <ul>
            <!--<li v-for="(item,index) in list.data" @click="get_tableData(item.id)"  :id="item.id">{{item.typeCname}}</li>-->
            <li v-for="(item,index) in list.data" :id="item.index">{{item}}</li>
          </ul>

      </el-col>
      <el-col :span="42" style="height: 100%" class="table-container">
        <div class="table digital_table" style="height: 100%">
          <el-row class="operation">
            <template v-for="item in this.data.operation">
              <component :is="item.type" :operation="item" ref="child"></component>
            </template>
          </el-row>
          <el-table
            height="600px"
            highlight-current-row
            @current-change="handleCurrentChange"
            ref="multipleTable"
            tooltip-effect="dark"
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            @selection-change="handleSelectionChange">
            style="width: 100%"
            >
            <el-table-column
              type="index"
              fixed="left"
              align="center"
            >
            </el-table-column>
            <el-table-column
              align="center"
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column v-for="(item,index) in label"
                             :key="index"
                             :prop="item.En"
                             :label="item.Ch"
                             :min-width="item.width"
                             align="center"
            >
            </el-table-column>
          </el-table>
          <div class="pages">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChangepage"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="5"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length">
            </el-pagination>
          </div>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {add, dele, edit, find} from "@/api/table_operate"
  import em_button from "@/components/em_button/em_button"
  import em_input from "@/components/em_input/em_input"
  import em_select from "@/components/em_select/em_select"
  import complex_em_input from "@/components/complex_em_input/complex_em_input"
  import FileSaver from "file-saver";

  import XLSX from "xlsx";

  export default {
    name: "compone",
    components: {
      em_button,
      em_input,
      em_select,
      complex_em_input
    },
    props: ["data"],
    mounted(){
      console.log(this.data);
      this.bus.$on(this.data.table.id, obj => {
        this.control(obj)
      });
    },
    data() {
      return {
       /* id:"type_manage",*/
        list: {
          id:"type_manage_list",
          // title: "",
          // data:[]
          title:"分类",
          data:["人员类型","特殊树种类型","特殊植物类型"]
        },
        // label: [],
        label:[{Ch:"日期",En:"date",width:"180"},{Ch:"姓名",En:"name",width:"180"},{Ch:"地址",En:"address",width:"300"}],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-09',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-10',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-11',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-12',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-13',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-14',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-15',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-16',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        currentRow: null,
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    props:["data"],
    // created() {
    //      this.list.title=this.data.list.title;
    //      this.label=this.data.table.label;
    //      list({
    //        listUrl:this.data.list.list_url,
    //        params: this.data.list.params
    //
    //      }).then(res=>{
    //          this.list.data=res.data.data.filter(val=>{
    //              return val[this.data.list.keyObj.keyName]==this.data.list.keyObj.keyValue;
    //          });
    //          console.log(this.list.data);
    //          this.tableData=res.data.data.filter(val=>{
    //            return val[this.data.list.keyObj.keyName]!=this.data.list.keyObj.keyValue;
    //
    //          });
    //          console.log(this.tableData);
    //      })
    //
    // },
    methods: {
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      handleCurrentChange(val) {
        this.currentRow = val;
        console.log(this.currentRow)
      },
      handleCurrentChangepage(val) {

        console.log(`当前页: ${val}`);
        this.currentPage = val;
        console.log(this.currentPage)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
      },
      exportExcel() {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('.el-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), 'sheetjs.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      // get_tableData(id){
      //      console.log(id)
      //     table({
      //         table_url:this.data.table.table_url,
      //         params: {
      //           parentId:id,
      //           pageNum:this.currentPage,
      //           pageSize:this.pageSize
      //         }
      //     }).then(res=>{
      //          console.log(res.data.data.data);
      //          this.tableData=res.data.data.data;
      //          // console.log(this.tableData)
      //     })
      // },
      init() {
        // this.bus.$on("em_complex_input",res=>{
        //   console.log(res);
        //
        // });
        let obj = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        };

      },
      control(obj) {
        this[obj.fn](obj);

      },
      add(obj) {
        this.$store.commit("win/dialog_open", {
          obj: {
            id: "type_manage_add_operation"
          }
        });
        console.log("add");
      },
      modify(){
        this.$store.commit("win/dialog_open", {
          obj: {
            id: "edit_operation"
          }
        });
        console.log("modify")
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "list_table";
</style>
