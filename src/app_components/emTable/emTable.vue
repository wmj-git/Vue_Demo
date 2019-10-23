<template>
  <div class="emTable">
    <el-card class="box-card">
      <el-row>
        <el-col :span="48">
          <el-table
            border
            highlight-current-row
            v-loading="listLoading"
            tooltip-effect="dark"
            :data="tableData"
            :max-height="tableSet.maxHeight"
            @current-change="handleCurrentChange"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick"
            @row-dblclick="handleRowDoubleClick"
          >

            <el-table-column
              align="center"
              type="selection"
              width="54">
            </el-table-column>
            <el-table-column
              type="index"
              fixed="left"
              align="center"
              :index="tableIndex"
            >
            </el-table-column>
            <template v-for="(column,index) in tableSet.tableColumn">
              <el-table-column
                :key="index"
                :prop="column.prop"
                :label="column.label"
                :width="column.width"
                :show-overflow-tooltip="true"
              ></el-table-column>
            </template>
            <template v-for="btn in columnBtn" v-if="columnBtn.length>0">
              <el-table-column fixed="right" :label="btn.label" :min-width="btn.minWidth">
                <template slot-scope="scope">
                  <el-button
                    class="em-btn-operation"
                    :ref="btn.system_id"
                    size="mini"
                    @click.stop
                    @click="fn(btn.fn,{'index':scope.$index,'row':scope.row,'btn':btn,'control_type':btn.control_type})">
                    {{btn.title}}
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="48">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangePage"
            :current-page="pagination.currentPage"
            :page-sizes="[2,10,20,50]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.totalSize">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import vueBus from '@/utils/vueBus'
  import {add, del, update, query, downCsvmodel, upLoad, resetPassword} from "@/app_api/table";

  export default {
    name: "emTable",
    data() {
      return {
        id: "",
        tableSet: {//表组件属性设置
          resourceUrl: "",//数据地址
          maxHeight: "100",
          tableColumn: []
        },
        listLoading: true,//加载状态
        tableData: [],//表数据
        currentRow: null,//单选对象
        multipleSelection: [],//多选框对象组
        columnBtn: [],//配置表行内按钮

        pagination: { // 分页
          currentPage: 1,//当前页
          pageSize: 10,//当前信息条数
          totalSize: 0//总条数
        }
      };
    },
    props: ["data"],
    components: {},
    methods: {
      fn(_fn, _obj) {
        console.log(_obj);
        let _controlType = _obj.control_type ? _obj.control_type : "";
        switch (_controlType) {
          case "columnBtn_win":
            this.$store.commit('user/win_open', {
              win_obj: {
                system_id: _obj.btn.control_id,
                rowData: _obj.row
              }
            });
            vueBus.$emit(_obj.btn.tree_id, _obj);

            break;
          default:
            this[_fn](_obj);
        }
      },
      init() {
        console.log(this.data);
        this.id = this.data.system_id;
        this.tableSet.resourceUrl = this.data.resourceUrl;
        this.tableSet.maxHeight = this.data.maxHeight;

        //表字段
        let _tableColumn = JSON.parse(JSON.stringify(this.data.tableColumn));
        this.tableSet.tableColumn = _tableColumn.data;

        //获取行按钮数据
        if (this.data.children) {
          let _columnBtn = [];
          this.data.children.forEach(function (_obj) {
            if (_obj.system_type === "win_component_table_columnBtn") {
              _columnBtn.push(_obj);
            }
          });
          this.columnBtn = _columnBtn;
        }
        this.tableDataFn();
      },
      tableDataFn(params) {//更新表数据
        this.listLoading = true;
        let _params = {
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        };
        try {
          let _val = {};
          if (params) {
            _val = params;
          }
          for (let k in _val) {
            _params[k] = _val[k];
          }
        } catch (error) {
          console.log(error.message);
        } finally {

          query({ //页面渲染时拿表格数据
            url: this.tableSet.resourceUrl,
            params: _params
          }).then(res => {
            console.log(res);
            res.data.list.forEach((_val) => {
              for (let _i in _val) {
                if (_i === "isSpecial") {
                  if (_val[_i] === 0) {
                    _val[_i] = "否";
                  } else if (_val[_i] === 1) {
                    _val[_i] = "是";
                  }
                } else if (_i === "flowersPlantsOrTree") {
                  if (_val[_i] === 0) {
                    _val[_i] = "树";
                  } else if (_val[_i] === 1) {
                    _val[_i] = "花卉";
                  }
                }
              }
            });
            this.tableData = res.data.list;
            this.pagination.totalSize = res.data.total;
            this.listLoading = false;
          });
        }
      },
      tableIndex(index) {  //控制表格数据行号
        return (this.pagination.currentPage - 1) * this.pagination.pageSize + index + 1;
      },
      handleSizeChange(val) {//页条数

        this.pagination.pageSize = val;
        this.tableDataFn();
      },
      handleCurrentChangePage(val) {//当前页
        this.pagination.currentPage = val;
        this.tableDataFn();
      },
      handleSelectionChange(val) {   // 多选框（选中删除）
        this.multipleSelection = val;
      },
      handleCurrentChange(val) {   //单选行 （选中修改）
        this.currentRow = val;
      },
      //单击行
      handleRowClick(row, column, event) {
        console.log(1, row, column, event);
      },
      //双击行
      handleRowDoubleClick(row, column, event) {
        console.log(2, row, column, event);
      },
      //查询数据
      queryFn(_obj) {
        if (_obj.ruleForm) {
          this.tableDataFn(_obj.ruleForm);
        }
      },
      //添加一行数据
      addFn(_obj) { // 添加一行数据
        let _this = this;
        add({                      //页面渲染时拿表格数据
          url: _obj.obj.resourceUrl,
          params: _obj.ruleForm,
          type: ""
        }).then(res => {
          if (res) {
            if (res.statusCode === 200) {
              // this.$refs.dialog.cancel();
              _this.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              });
              vueBus.$emit(_obj.obj.dialog_id, {
                "fn": _obj.obj.dialog_fn
              });
              this.tableDataFn();
            }
          }
        });
      },
      //更新行数据
      updateFn(_obj) {
        let _this = this;
        update({
          url: _obj.obj.resourceUrl,
          params: _obj.ruleForm
        }).then(res => {
          if (res) {
            if (res.statusCode === 200) {
              _this.$message({
                message: '恭喜你，更新成功',
                type: 'success'
              });
              vueBus.$emit(_obj.obj.dialog_id, {
                "fn": _obj.obj.dialog_fn
              });
              this.tableDataFn();
            }
          }
        });
      },
      //删除行
      delFn(_obj) {
        console.log("del", _obj);
        let _this = this;
        let _items = [];

        if (this.multipleSelection && this.multipleSelection.length > 0) {
          this.$confirm('此操作将删除所选项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.multipleSelection.forEach((_val) => {
              _items.push(_val.id);
            });
            del({
              url: _obj.obj.resourceUrl,
              params: _items
            }).then(res => {
              if (res) {
                if (res.statusCode === 200) {
                  _this.$message({
                    message: '恭喜你，删除成功',
                    type: 'success'
                  });
                  _this.tableDataFn();
                }
              }
            });

          }).catch(() => {

          });
        } else {
          _this.$message({
            message: '请勾选要删除的行!',
            type: 'error'
          });
          return
        }


      },
      //控制对话框
      addDialog(_obj) {
        console.log(_obj);
        let _data = _obj.obj;

        if (_data.dialog_dataType) {
          switch (_data.dialog_dataType) {
            //获取表行数据
            case "currentRow":
              if (this.currentRow && _data.children) {
                let _currentRow = this.currentRow;
                let _children = _data.children[0];
                _children.children.forEach((_val) => {
                  if (_val.valueKey && _currentRow[_val.valueKey]) {
                    _val.defaultValue = _currentRow[_val.valueKey];
                  }
                })
              } else {
                this.$message({
                  message: '请点选一行!',
                  type: 'error'
                });
                return
              }
              break
          }
        }

        vueBus.$emit(_data.dialog_id, {
          "fn": _data.dialog_fn,
          "visible": true,
          "set": {
            "title": _data.dialog_title ? _data.dialog_title : "对话框",
            "width": "480px"
          },
          "children": _data.children
        });

      }
    },
    created() {
      this.init();
      vueBus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

    },
    beforeDestroy() {
      vueBus.$off(this.id);
      this.bus.$off(this.id);
    }
  };
</script>

<style lang="scss" scoped>
  @import "emTable";
</style>
