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
        {{item.content}}--{{index}}
        <component :is="item.component" :data="item.component_data"></component>
      </el-tab-pane>
    </el-tabs>
    <div style="margin-bottom: 20px;">
      <el-button
        size="small"
        @click="addTab(editableTabsValue)"
      >
        add tab
      </el-button>
    </div>
  </div>
</template>

<script>

  export default {
    name: "emTabs",
    data() {
      return {
        id: "",
        tabPosition: "left",
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      };
    },
    components: {

    },
    props: ["props_data"],
    methods: {
      init() {                               //表格加载数据

      },
      addTab(targetName) {

        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
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
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  };
</script>

<style scoped lang="scss">
  @import "emTabs";
</style>
