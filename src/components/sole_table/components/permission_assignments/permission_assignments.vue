<template>
  <div class="permission_assignments">
    <el-tree
      :data="treeData"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
    >
    </el-tree>
  </div>
</template>

<script>
  import {queryResource, setRoleResource} from "@/api/resource"
  import {treeStructure} from "@/utils/tools";

  export default {
    data() {
      return {
        roleId: null
      };
    },
    computed: {
      treeData: function () {
        return this.treeDataFn(this.$store.getters["user/permissions"]);
      }
    },
    props: ["props_data"],
    methods: {
      init() {
        console.log(this.props_data);
        this.roleId = this.props_data.id;
        this.setCheckedKeys();
      },
      treeDataFn(_obj) {
        let _tree = [];
        let _Tree = [];
        let _permissions = _obj;

        if (_permissions.length > 0) {
          _permissions.forEach(function (_obj) {
            _obj.label = _obj.resourceName;
            _tree.push(_obj);
          });
        }

        let _data = treeStructure(_tree);
        for (let _k in _data) {
          _data[_k].forEach(function (_obj) {
            _Tree.push(_obj);
          });
        }
        return _Tree;
      },
      handleCheckChange() {
        console.log(this.$refs.tree.getCheckedKeys());
        let _this = this;
        let _CheckedKeys = this.$refs.tree.getCheckedKeys();
        setRoleResource({
          "resourceIds": _CheckedKeys,
          "roleId": _this.roleId
        }).then((response) => {
          if (response.statusCode === 200) {
            this.$message({
              message: response.message,
              type: 'success'
            });
          }
          this.setCheckedKeys();
        });
      },
      setCheckedKeys() {
        let _this = this;
        queryResource({
          "id": _this.roleId
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
      }
    },
    created() {
      this.init();
    },
    mounted() {

    },
    beforeDestroy() {
    }
  };
</script>
<style lang="scss" scoped>
  @import "permission_assignments";
</style>
