<template>
  <div class="emTabs">
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
    name: "emTabs",
    data() {
      return {
        id: "",
        tabPosition: "left",
        editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 2
      };
    },
    components: {
      emTree
    },
    props: ["data"],
    methods: {
      init() {                               //表格加载数据
        this.id =this.data.emTabs_id;
      },
      addTab(_obj) {
        console.log(_obj.targetName);
        let newTabName = ++this.tabIndex + '' + _obj.targetName;
        this.editableTabs.push({
          title: newTabName,
          name: newTabName,
          component: "emTree",
          component_data: {}
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
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
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    created() {

    },
    mounted() {
      this.init();
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
  @import "emTabs";
</style>
