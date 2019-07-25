<template>
  <div class="scene">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>

  import cm from "@/utils/cesium/index"

  export default {
    data() {
      return {
        id: "scene",
        height: ''
      }
    },
    props: {},
    methods: {
      init() {

          this.$store.commit("scene/set_type", this.id);
          this.$store.commit("scene/set_toolbar", [
              {
                  id: "tool_flyToScene",
                  value: "场景",
                  icon: "el-icon-scene",
                  control_id: "scene",
                  fn: "toScene",
                  trigger: "none"
              },
              {
                  id: "tool_transparent",
                  value: "透明",
                  icon: "el-icon-transparent",
                  control_id: "em_slider",
                  fn: "showFn",
                  trigger: true
              },
              {
                  id: "tool_coordinates",
                  value: "坐标",
                  icon: "el-icon-coordinates",
                  control_id: "scene",
                  fn: "xyz",
                  trigger: true
              },
              {
                  id: "tool_data",
                  value: "数据",
                  icon: "el-icon-data",
                  control_id: "scene",
                  fn: "scene_data",
                  trigger: true
              },
              {
                  id: "tool_distance",
                  value: "距离",
                  icon: "el-icon-distance",
                  control_id: "scene",
                  fn: "measure_drawLine",
                  trigger: "none"
              },
              {
                  id: "tool_area",
                  value: "面积",
                  icon: "el-icon-area",
                  control_id: "scene",
                  fn: "measure_drawPloy",
                  trigger: "none"
              },
              {
                  id: "tool_hightly",
                  value: "高度",
                  icon: "el-icon-highly",
                  control_id: "scene",
                  fn: "",
                  trigger: "none"
              },
              {
                  id: "tool_label",
                  value: "清除",
                  icon: "el-icon-remove2",
                  control_id: "scene",
                  fn: "measure_clear",
                  trigger: "none"
              }
          ]);//设置场景工具面板
        window.viewer = new Cesium.Viewer('cesiumContainer', {
          scene3DOnly: true,
          animation: false, //是否显示动画控件
          baseLayerPicker: false, //是否显示图层选择控件
          geocoder: false, //是否显示地名查找控件
          timeline: false, //是否显示时间线控件
          sceneModePicker: true, //是否显示投影方式控件
          homeButton: false,
          navigationHelpButton: false, //是否显示帮助信息控件
          infoBox: true, //是否显示点击要素之后显示的信息
          /*imageryProvider: new Cesium.UrlTemplateImageryProvider({
            url: process.env.SCENE_URL + "/zhlhscene/gis/{z}/{x}/{y}.png",
            // url: "../../static/mode_3d/gis/{z}/{x}/{y}.png",
            layer: "tdtBasicLayer",
            style: "default"
          })*/
          // 天地图影像
          imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=dcfb31be4b1daef33e484e48348cb28b',
            layer: 'img',
            style: 'default',
            tileMatrixSetID: 'w',
            format: 'tiles',
            maximumLevel: 18
          })
        });
        /* //加载影像注记
         var layer1 = new Cesium.WebMapTileServiceImageryProvider({
             url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=dcfb31be4b1daef33e484e48348cb28b',
             layer: 'cia',
             style: 'default',
             tileMatrixSetID: 'w',
             format: 'tiles',
             maximumLevel: 18
         });
         viewer.imageryLayers.addImageryProvider(layer1);*/


        // 加载地形1
        // window._scene = cm.openScene(window.viewer, process.env.SCENE_URL + "/zhlhscene/b3dm/tileset.json");
        window._scene = cm.openScene(window.viewer, "https://onelz.oicp.vip/SG/b3dm/LH1-1-2.405276/tileset.json");

      },
      alpha(obj) {
        cm.alphaFN(obj.value, window.viewer, window._scene.scene);
      },
      xyz(obj) {
        cm.xyzFN(obj.trigger, window.viewer, window._scene.scene);
      },
      measure_drawPloy(obj) {
        cm.SetMeasure("drawPloy", window.viewer, window._scene.scene);
      },
      measure_drawLine(obj) {
        cm.SetMeasure("drawLine", window.viewer, window._scene.scene);
      },
      measure_clear(obj) {
        cm.clearDrawingBoard(window.viewer);
      },
      toScene() {
        cm.toScene(window.viewer, window._scene.tileset);
      },
      scene_data(obj) {
        if (obj.trigger) {
          cm.addModeFN(window.viewer);
          cm.addPolygonFN(window.viewer);
          cm.addMarkerFN(cm.db.posts, "../../static/image/marker_2.png", window.viewer);
          cm.addMarkerFN(cm.db.posts2, "../../static/image/marker_3.png", window.viewer);
        } else {
          cm.markerClear();
          cm.modeClear();
          cm.entitiesClear("grid_", window.viewer);
        }
      }
    },
    created() {
    },
    mounted() {
      this.init();
      this.bus.$on(this.id, obj => {
        this[obj.fn](obj);
      });
    }
  };
</script>
<style lang="scss" scoped>
  @import "scene";
</style>
