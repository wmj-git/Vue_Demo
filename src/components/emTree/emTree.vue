<template>
  <div class="emTree">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      default-expand-all
      @node-click="handleNodeClick"
      :filter-node-method="filterNode"
      ref="tree">
       <span class="span-ellipsis" slot-scope="{ node, data }">
         <span :title="node.label">{{ node.label }}</span>
       </span>
    </el-tree>
  </div>
</template>

<script>

  export default {
    name: "emTree",
    data() {
      return {
        id: "",
        filterText: '',
        treeData: [
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
          }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    components: {},
    props: ["data"],
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      init() {
        console.log(this.data);
        this.id = this.data.id;
        this.treeData = this.data.treeData;
        this.defaultProps.children = this.data.treeChildren;
        this.defaultProps.label = this.data.treeLabel;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data[this.defaultProps.label].indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        console.log(data);
        let _this = this;
        let control_id = this.$store.getters["scene/type"];

        let _lng = null;
        let _lat = null;
        if (data.geometry === "Point") {
          _lng = data.gpsLongitude;
          _lat = data.gpsLatitude;
        } else if ((data.geometry === "LineString" || data.geometry === "Polygon") && !(data.coordinates[0] instanceof Array)) {
          let _coordinates = data.coordinates;
          _lng = _coordinates[0];
          _lat = _coordinates[1];
        } else if (data.geometry === "LineString") {
          let _coordinates = data.coordinates;
          let _coordinate = _coordinates[0];
          _lng = _coordinate[0];
          _lat = _coordinate[1];
        } else if (data.geometry === "Polygon") {
          let _coordinates = data.coordinates;
          let _coordinate = _coordinates[0][0];
          _lng = _coordinate[0];
          _lat = _coordinate[1];
        } else if (!(data.geometry)) {//单位关联道路

          let _tg = true;
          let tabs = this.$store.getters["scene/layerData"];
          tabs.forEach((tab) => {
            if (tab.name === _this.data.layerName + "_" + data.id) {
              _tg = false;
            }
          });

          if (_tg) {
            // 场景加数据图层
            this.bus.$emit(control_id, {
              trigger: true,
              fn: "scene_data",
              data_type: "3",
              layer_name: _this.data.layerName + "_" + data.id,
              layer_title: data.entName,
              api_name: "geom",
              data_url: "/gardens/road/queryByEndId",
              params_entId: data.id,
              geomType: "line",
              geom_titleKey: "roadName",
              strokeWidth: 4,
              strokeColor: "[125, 0, 0, 255]",
              fillColor: "[160, 0, 12, 255]"
            });
          }
          return
        } else {
          return
        }
        // 场景定位
        this.bus.$emit(control_id, {
          fn: "toScene",
          lng: _lng,
          lat: _lat,
          zIndex: 6
        });
      }
    },
    created() {
      this.init();
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    },
    mounted() {

    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  };
</script>

<style scoped lang="scss">
  @import "emTree";
</style>
