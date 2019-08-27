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
  import buttonGroup from "@/app_components/buttonGroup/buttonGroup"
  import emTree from "@/components/emTree/emTree"

  export default {
    name: "emTabs",
    data() {
      return {
        id: "",
        tabPosition: "left",
        editableTabsValue: '2',
        editableTabs: [
          {
            title: 'Tab 1',
            name: '1',
            component: "buttonGroup",
            component_data: {
              buttonGroup: [
                {
                  id: "bt_4_1",
                  type: "info",
                  icon: "",
                  text: "文本",
                  trigger: true,
                  control_type: "scene",
                  control_id: "",
                  fn: "scene_data",
                  data_type: "3",
                  layer_name: "ly11",
                  api_name: "geom",
                  data_url: "/gardens/humantraffic/queryAll",
                  geomType: "text",
                  // params_pointsNo: 3,
                  geom_titleKey: "id",
                  geom_style: "2",
                  strokeWidth: 1,
                  strokeColor: "[0, 255, 0, 255]",
                  clusters_enabled: "false",//聚合显示
                },
                {
                  id: "bt_5",
                  type: "info",
                  icon: "el-icon-edit",
                  text: "线",
                  trigger: true,
                  control_type: "scene",
                  control_id: "",
                  fn: "scene_data",
                  data_type: "3",
                  layer_name: "ly2",
                  api_name: "geom",
                  data_url: "/gardens/tree/queryVicinityPrint",
                  geomType: "line",
                  params_longitude: 114.03188276054428,
                  params_latitude: 22.619840297782094,
                  params_distance: 10000,
                  geom_titleKey: "id",
                  strokeWidth: 1,
                  strokeColor: "[0, 255, 0, 255]",
                  fillColor: "[0, 100, 255, 255]"
                }
              ]
            }
          }, {
            title: 'Tab 2',
            name: '2',
            component: "emTree",
            component_data: {}
          }],
        tabIndex: 2
      };
    },
    components: {
      buttonGroup,
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
