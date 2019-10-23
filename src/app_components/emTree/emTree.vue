<template>
  <div class="emTree">
    <el-card class="box-card">
      <el-row>
        <el-col :span="48">
          <p class="head_title">{{set.title}}</p>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree
            ref="tree"
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            @node-click="handleNodeClick"
            :show-checkbox="set.checkbox"
            @check-change="handleCheckChange"
            :default-expand-all="true"
            :expand-on-click-node="true"
            @node-drag-end="handleDragEnd"
            :filter-node-method="filterNode"
            draggable>
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span :title="node.label" class="em-tree-text">{{ node.label }}</span>
                    <span v-if="set.buttons">
                      <el-button
                        class="em-btn-gradient em-btn-uniform-gradient"
                        size="mini"
                        @click="() => append(node,data)"
                      >
                        添加
                      </el-button>
                      <el-button
                        class="em-btn-gradient em-btn-uniform-gradient"
                        size="mini"
                        @click="() => remove(node, data)"
                      >
                        删除
                      </el-button>
                    </span>
                  </span>
          </el-tree>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import vueBus from '@/utils/vueBus'
  import {queryCheckedKeys, query, add, del, update} from "@/app_api/tree";
  import {toTree} from "@/utils/tools";

  export default {
    name: "emTree",
    data() {
      return {
        id: "",
        set: {
          title: "权限",
          buttons: false,
          checkbox: false,
          treeDataType: "",
          treeDataUrl: "",
          treeDataParams: {},
          checkedKeysType: "",
          checkedKeysUrl: "",
          checkedKeysParams: {},
        },
        treeData: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        setFn: {
          handleNodeClick: "",
          handleCheckChange: "",
          handleDragEnd: ""
        }
      };
    },
    props: ["data"],
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    computed: {},
    components: {},
    methods: {
      fn(_fn, _obj) {
        let _controlType = _obj.control_type ? _obj.control_type : "";
        switch (_controlType) {
          case "win":

            break;
          case "component":
            vueBus.$emit(_obj.btn.control_id, {});
            break;
          default:
            this[_fn](_obj);
        }
      },
      init() {
        this.id = this.data.system_id;
        this.set.checkbox = this.data.checkbox;
        this.set.buttons = this.data.buttons;
        this.set.treeDataType = this.data.treeDataType ? this.data.treeDataType : "query";
        this.set.treeDataUrl = this.data.treeDataUrl ? this.data.treeDataUrl : "";
        this.set.treeDataParams = this.data.treeDataParams ? this.data.treeDataParams : "";
        this.set.checkedKeysType = this.data.checkedKeysType ? this.data.checkedKeysType : "";
        this.set.checkedKeysUrl = this.data.checkedKeysUrl ? this.data.checkedKeysUrl : "";
        this.set.checkedKeysParams = this.data.checkedKeysParams ? this.data.checkedKeysParams : "";

        this.defaultProps.children = this.data.propsChildren;
        this.defaultProps.label = this.data.propsLabel;

        this.treeDataFn();
        if (this.set.checkbox) {
          this.setCheckedKeys();
        }


      },
      treeDataFn() {
        let _tree = [];
        switch (this.set.treeDataType) {
          case "permissions":
            _tree = this.$store.getters["user/permissions"];
            break;
          case "query":
            query({
              "url": this.set.treeDataUrl,
              "params": this.set.treeDataParams
            }).then((response) => {
              console.log(response);
              if (response.statusCode === 200) {
                response.data.forEach(function (_obj) {
                  _tree.push(_obj);
                });
              }
            });
            break;
        }
        this.treeData = toTree(_tree);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data[this.defaultProps.label].indexOf(value) !== -1;
      },
      append(node, data) {
        /* let _this = this;
         const newChild = {
           "dataStatus": 0,
           "description": "{}",
           "id": 0,
           "parentId": 0,
           "resourceCode": "{}",
           "resourceName": "新建权限",
           "resourceType": "none",
           "resourceUrl": "none",
           "isMeum": true,
           "weight": 200
         };
         newChild.parentId = data.id;
         add(newChild).then(function (response) {
           _this.$message(response.message);
         });*/
      },
      remove(node, data) {
        /* let _this = this;
         this.$confirm('此操作将永久删除, 是否继续?', '提示', {
           cancelButtonText: '取消',
           confirmButtonText: '确定',
           type: 'warning'
         }).then(() => {
           del([data.id]).then(function (response) {
             // console.log(response);
             _this.$message(response.message);
             _this.bus.$emit("nav", {
               fn: "findByThisUserFn"
             });
           });
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除'
           });
         });*/
      },
      handleNodeClick(data) {
        console.log(data);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {

        /* if (dropType === "inner") {
           draggingNode.data.parentId = dropNode.data.id;
         } else {
           draggingNode.data.parentId = dropNode.data.parentId;
         }
         update(draggingNode.data).then((response) => {
           console.log(response);
           this.$message(response.message);
         });*/

      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);

      },
      getCheckedKeys() {
        return this.$refs.tree.getCheckedKeys();
      },
      setCheckedKeys() {
        let _this = this;

        switch (this.set.checkedKeysType) {
          case "table":
            console.log("table",this.data);
            if (this.data.rowData) {
              for (let _k in this.set.checkedKeysParams) {
                let _rowKey=this.set.checkedKeysParams[_k];
                if(this.data.rowData[_rowKey]){
                  this.set.checkedKeysParams[_k]=this.data.rowData[_rowKey];
                }
              }
            }
            console.log(this.set.checkedKeysParams);
            queryCheckedKeys({
              "url": this.set.checkedKeysUrl,
              "params": this.set.checkedKeysParams
            }).then((response) => {
              console.log(response);
              if (response.statusCode === 200) {
                let _Keys = [];
                response.data.forEach(function (_obj) {
                  if (_obj.checked) {
                    _Keys.push(_obj.id);
                  }
                });
                _this.$refs.tree.setCheckedKeys(_Keys);
              }
            });
            break
        }

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
  @import "emTree";
</style>
