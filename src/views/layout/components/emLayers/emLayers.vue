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
  import buttonGroup from "@/app_components/buttonGroup/buttonGroup"
  import emTree from "@/components/emTree/emTree"

  export default {
    name: "emLayers",
    data() {
      return {
        id: "",
        tabPosition: "left",
        editableTabsValue: '',
        Tabs:[]
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
        let _Tabs=this.$store.getters["scene/layerData"];
        let newTabName =_obj.name;
        let newTabTitle =_obj.title;
        _Tabs.push({
          title: newTabTitle,
          name: newTabName,
          component: "emTree",
          component_data: {}
        });
        this.$store.commit("scene/set_layerData", _Tabs);
        this.editableTabsValue = newTabName;

      },
      removeTab(_obj) {
        let tabs = this.Tabs;
        let activeName = this.editableTabsValue;
        if (activeName === _obj.name) {
          tabs.forEach((tab, index) => {
            if (tab.name === _obj.name) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.Tabs = tabs.filter(tab => tab.name !== targetName);
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
