<template>
  <div class="emTree">
    <el-row>
      <el-col :span="48">
        <p class="head_title">权限</p>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          @node-click="fn"
          :default-expand-all="true"
          :expand-on-click-node="true"
          ref="id"
          @node-drag-end="handleDragEnd"
          draggable>
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span :title="node.label" class="em-tree-text">{{ node.label }}</span>
                    <span>
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

  </div>
</template>

<script>

  import splitPane from 'vue-splitpane';
  import {addResource, delResource, updateResource} from "@/api/resource";
  import {toTree} from "@/utils/tools";

  export default {
    name: "emTree",
    data() {
      return {
        id: "",
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    props: ["data"],

    computed: {
      treeData: function () {
        // return this.treeDataFn(this.$store.getters["user/permissions"]);
        return [
          {
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          },
          {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          },
          {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }]
      }
    },
    components: {
      splitPane
    },
    methods: {
      fn() {

      },
      init() {
        this.id = this.data.system_id;
      },
      treeDataFn(_obj) {
        let _tree = [];
        let _permissions = _obj;
        if (_permissions.length > 0) {
          _permissions.forEach(function (_obj) {
            _obj.label = _obj.resourceName;
            _tree.push(_obj);
          });
        }
        return toTree(_tree);
      },
      append(node, data) {
        let _this = this;
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
        addResource(newChild).then(function (response) {
          _this.$message(response.message);
        });
      },
      remove(node, data) {
        let _this = this;
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          delResource([data.id]).then(function (response) {
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
        });
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {

        if (dropType === "inner") {
          draggingNode.data.parentId = dropNode.data.id;
        } else {
          draggingNode.data.parentId = dropNode.data.parentId;
        }
        updateResource(draggingNode.data).then((response) => {
          console.log(response);
          this.$message(response.message);
        });

      }

    },
    created() {
      this.init();

    },
    mounted() {

    },
    updated() {

    }
  };
</script>

<style lang="scss" scoped>
  @import "emTree";
</style>
