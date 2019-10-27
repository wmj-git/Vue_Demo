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
  import vueBus from '@/utils/vueBus';
  import {addResource, delResource, updateResource} from "@/api/resource";
  import {toTree} from "@/utils/tools";

  export default {
    name: "emTree",
    data() {
      return {
        id: "",
        set: {
          title: "权限",
          buttons: false,
          checkbox: false
        },
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        setFn: {}
      };
    },
    props: ["data"],
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    computed: {
      treeData: function () {
        return this.treeDataFn(this.$store.getters["user/permissions"]);
      }
    },
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
      filterNode(value, data) {
        if (!value) return true;
        return data[this.defaultProps.label].indexOf(value) !== -1;
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
      handleNodeClick(data) {
        console.log(data);
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

      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
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
