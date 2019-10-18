<template>
  <div class="treeForm">

    <split-pane split="vertical" :min-percent='20' :default-percent='34'>
      <template slot="paneL">
        <el-card class="box-card">
          <el-row>
            <el-col :span="48">
              <p class="head_title">权限</p>
              <el-tree
                :data="treeData"
                node-key="id"
                @node-click="fn"
                :default-expand-all="true"
                :expand-on-click-node="false"
                ref="tree_control"
                @node-drag-end="handleDragEnd"
                draggable
              >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span :title="node.label" class="em-tree-text">{{ node.label }}</span>
                    <span>
                      <el-button
                        class="em-btn-gradient em-btn-uniform-gradient"
                        size="mini"
                        @click="() => append(node,data)" quanxian
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
      </template>
      <template slot="paneR">
        <el-card class="box-card">
          <em-form :props_data="form_data" ref="form"></em-form>
        </el-card>
      </template>
    </split-pane>
  </div>
</template>

<script>
  import {db_form_data} from './data/db';
  import splitPane from 'vue-splitpane';
  import emForm from './components/emForm/emForm';
  import {addResource, delResource,updateResource} from "@/api/resource";
  import {treeStructure,toTree} from "@/utils/tools";


  export default {
    name: "treeForm",
    data() {
      return {
        id: 100,
        form_data: JSON.parse(JSON.stringify(db_form_data))
      };
    },
    props: ["props_data"],
    computed: {
      treeData: function () {
        return this.treeDataFn(this.$store.getters["user/permissions"]);
      }
    },
    components: {
      splitPane,
      emForm
    },
    methods: {
      init() {

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
          "weight":200
        };
        newChild.parentId = data.id;
        addResource(newChild).then(function (response) {
          // console.log(response);
          _this.$message(response.message);
          _this.bus.$emit("nav", {
            fn: "findByThisUserFn"
          });
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
      /*  console.log(draggingNode);
        console.log(dropNode);
        console.log(dropType);
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);*/
        if(dropType==="inner"){
          draggingNode.data.parentId=dropNode.data.id;
        }else{
          draggingNode.data.parentId=dropNode.data.parentId;
        }
        updateResource(draggingNode.data).then((response) => {
          console.log(response);
          this.$message(response.message);
        });

      },
      fn(...obj) {
        // console.log(obj[0]);
        // console.log(JSON.stringify(_item.Validate));
        let _form_data = [];

        for (let k in obj[0]) {
          if (k !== "children" && k !== "label") {
            let _item = {
              id: "",
              inputType: "text",
              label: '',
              disabled: false,
              valueKey: "",
              value: "",
              Validate: [],
              options_url: "",
              options: [],
            };
            _item.id = "form_" + k;
            _item.valueKey = k;
            _item.value = obj[0][k];

            let _obj = this.form_data;
            /* console.log("----------------");
             console.log(k);
             console.log(_obj[k]);*/

            _item.label = _obj[k].label;
            _item.inputType = _obj[k].type;
            _item.disabled = _obj[k].disabled;
            _item.Validate = _obj[k].Validate;
            _item.options_url = _obj[k].options_url;
            _item.options = _obj[k].options;

            _form_data.push(_item);
          }

        }
        this.$refs.form.rulesFn(JSON.parse(JSON.stringify(_form_data)));
      }
    },

    created() {
      this.bus.$emit("nav", {
        fn: "findByThisUserFn"
      });
    },
    mounted() {
      this.init();
    },
    updated() {

    }
  };
</script>

<style lang="scss" scoped>
  @import "treeForm";
</style>
