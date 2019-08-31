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
  import buttonGroup from "@/app_components/buttonGroup/buttonGroup"

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
          content: 'Tab 1 content',
          component: "buttonGroup",
          component_data: {
            buttonGroup: [
              {
                id: "bt_1",
                type: "info",
                icon: "el-icon-edit",
                text: "树木数据",
                trigger: true,
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "1",
                layer_name: "tree1",
                data_maker_iconUrl: "../../static/image/marker_2.png",
                maker_titleKey: "id",
                clusters_color: "#181966"
              },
              {
                id: "bt_1_1",
                type: "info",
                icon: "el-icon-edit",
                text: "marker",
                trigger: true,
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "4",
                layer_name: "fire",
                api_name: "marker",
                data_url: "/gardens/humantraffic/queryAll",
                data_maker_iconUrl: "../../static/image/marker_2.png",
                // params_pointsNo: 3,
                maker_titleKey: "id",
                clusters_color: "#ffc62e"
              },
              {
                id: "bt_1_2",
                type: "info",
                icon: "el-icon-edit",
                text: "树",
                trigger: true,
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "4",
                layer_name: "tree",
                api_name: "marker",
                data_url: "/gardens/tree/queryVicinityPrint",
                data_maker_iconUrl: "../../static/image/marker_1.png",
                params_longitude: 114.03188276054428,
                params_latitude: 22.619840297782094,
                params_distance: 10000,
                maker_titleKey: "id",
                clusters_color: "#46ff71"
              },
              {
                id: "bt_4",
                type: "info",
                icon: "",
                text: "点",
                trigger: true,
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "3",
                layer_name: "ly1",
                api_name: "geom",
                data_url: "/gardens/tree/queryVicinityPrint",
                geomType: "point",
                params_longitude: 114.03188276054428,
                params_latitude: 22.619840297782094,
                params_distance: 10000,
                geom_titleKey: "id",
                geom_style: "1",
                strokeWidth: 6,
                strokeColor: "[255, 0, 0, 255]",
                fillColor: "[0, 255, 255, 255]",
                clusters_enabled: "true",//聚合显示
                clusters_color: "#ff3d23"//聚合颜色
              },
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
              },
              {
                id: "bt_6",
                type: "info",
                icon: "el-icon-edit",
                text: "多边形",
                trigger: true,
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "3",
                layer_name: "ly3",
                api_name: "geom",
                data_url: "/gardens/tree/queryVicinityPrint",
                geomType: "polygon",
                params_longitude: 114.03188276054428,
                params_latitude: 22.619840297782094,
                params_distance: 10000,
                geom_titleKey: "id",
                strokeWidth: 2,
                strokeColor: "[200, 255, 0, 255]",
                fillColor: "[255, 0, 0, 255]"
              },
              {
                id: "bt_7",
                type: "info",
                icon: "el-icon-edit",
                text: "圆",
                trigger: true,
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "3",
                layer_name: "ly4",
                api_name: "geom",
                data_url: "/gardens/humantraffic/queryAll",
                geomType: "circle",
                geom_titleKey: "id",
                fillColor: "[230, 0, 255, 255]"
              },
              {
                id: "bt_8",
                type: "info",
                icon: "el-icon-edit",
                text: "模型",
                trigger: true,
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "3",
                layer_name: "ly5",
                api_name: "geom",
                data_url: "/gardens/humantraffic/queryAll",
                geomType: "mode",
                geom_titleKey: "id",
                strokeWidth: 1,
                strokeColor: "[255, 255, 255, 255]",
                fillColor: "[255, 0, 0, 255]",
              },
              {
                id: "bt_2",
                type: "info",
                icon: "el-icon-edit",
                text: "街道树",
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "2",
                layer_name: "tree1",
                data_url: "http://onelz.oicp.vip/proxy/server/A13041017DC845579548DA3528DF9B47/999C1448C6DD4842A35412B42226F0A3",
                data_maker_iconUrl: "../../static/image/marker_2.png",
                maker_titleKey: "OBJECTID",
                clusters_color: "#1d6633",
                trigger: true
              },
              {
                id: "bt_2_1",
                type: "info",
                icon: "el-icon-edit",
                text: "龙华区社区",
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "2",
                layer_name: "shequ",
                data_url: "http://onelz.oicp.vip/proxy/server/F92A3799DFA243BC9DEB8B2BB6DDA4C9/999C1448C6DD4842A35412B42226F0A3",
                data_maker_iconUrl: "../../static/image/marker_2.png",
                maker_titleKey: "OBJECTID",
                clusters_color: "#f566ff",
                trigger: true
              },
              {
                id: "bt_2_2",
                type: "info",
                icon: "el-icon-edit",
                text: "龙华区街道",
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "2",
                layer_name: "jiedao",
                data_url: "http://onelz.oicp.vip/proxy/server/8C20FC12319A4CB18BF0F90C4527DD54/999C1448C6DD4842A35412B42226F0A3",
                data_maker_iconUrl: "../../static/image/marker_2.png",
                maker_titleKey: "OBJECTID",
                clusters_color: "#f566ff",
                trigger: true
              },
              {
                id: "bt_3",
                type: "info",
                icon: "el-icon-edit",
                text: "垃圾箱",
                control_type: "scene",
                control_id: "",
                fn: "scene_data",
                data_type: "2",
                layer_name: "dustbin",
                data_url: "http://onelz.oicp.vip/proxy/server/4FACB86003FB479A851EFF7D09AE10F4/999C1448C6DD4842A35412B42226F0A3",
                data_maker_iconUrl: "../../static/image/marker_3.png",
                maker_titleKey: "OBJECTID",
                clusters_color: "#c42e1e",
                trigger: true
              },
            ]
          }

        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content',
          component: "",
          component_data: {

          }
        }],
        tabIndex: 2
      };
    },
    components: {
      buttonGroup
    },
    props: ["data"],
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
