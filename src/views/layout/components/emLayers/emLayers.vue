<template>
  <div class="emLayers">
    <el-tabs v-model="editableTabsValue" closable @tab-remove="removeTab" :tab-position="tabPosition">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <span slot="label">{{item.title}}</span>
        <component :is="item.component" :data="item.component_data"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import emTree from "@/components/emTree/emTree"

  export default {
    name: "emLayers",
    data() {
      return {
        id: "",
        tabPosition: "left",
        editableTabsValue: '',
        Tabs: []
      };
    },
    components: {
      emTree
    },
    props: ["data"],
    computed: {
      editableTabs: function () {
        return this.$store.getters["scene/layerData"];
      }
    },
    methods: {
      init() {                               //表格加载数据
        this.id = this.data.emTabs_id;
      },
      addTab(_obj) {
        console.log(_obj);
        let _Tabs = this.$store.getters["scene/layerData"];
        let newTabName = _obj.name;
        let newTabTitle = _obj.title;
        let _treeData = _obj.treeData;
        let _treeChildren = _obj.treeChildren;
        let _treeLabel = _obj.treeLabel;
        _Tabs.push({
          title: newTabTitle,
          name: newTabName,
          component: "emTree",
          component_data: {
            id: newTabName + "_tree",
            layerName:newTabName,
            treeData: _treeData,
            treeChildren: _treeChildren,
            treeLabel: _treeLabel
          }
        });
        this.$store.commit("scene/set_layerData", _Tabs);
        this.editableTabsValue = newTabName;

      },
      removeTab(targetName) {
        let tabs = this.$store.getters["scene/layerData"];
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        let _editableTabs = tabs.filter(tab => tab.name !== targetName);
        this.$store.commit("scene/set_layerData", _editableTabs);

        // 移除场景图层
        let control_id = this.$store.getters["scene/type"];
        this.bus.$emit(control_id, {
          fn: "removeLayer",
          layer_name: targetName
        });
      },
      removeTabFn(_obj) {
        this.removeTab(_obj.name);
      }
    },
    created() {
      this.init();
    },
    mounted() {
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  };
</script>

<style scoped lang="scss">
  @import "emLayers";
</style>
