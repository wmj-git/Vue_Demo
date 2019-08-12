<template>
  <div class="scene">
    <div :id="id"></div>
  </div>
</template>

<script>

  import cm from "@/utils/cesium/index"
  import {queryVicinityPrint, findOne, queryAllcount} from "@/api/tree";

  export default {
    data() {
      return {
        id: "_scene",
        height: '',

      }
    },
    props: {},
    methods: {
      init() {

        // 初始化场景
        // cm.init(this.id, "https://onelz.oicp.vip/SG/b3dm/LH1-1-2.405276/tileset.json");
        cm.init(this.id, process.env.SCENE_URL + "/sceneData/b3dm/tileset.json",{
          longitude: 114.0497756235571,
          latitude: 22.637316560481576,
          height: -260
        });
       /* cm.init(this.id, "http://localhost:800/sceneData/b3dm/tileset.json", {
          longitude: 114.0497756235571,
          latitude: 22.637316560481576,
          height: -160
        });*/
      },
      baseMapFn(obj) {
        let _layer = null;
        console.log(window[this.id]);

        window[this.id].viewer.imageryLayers.removeAll();

        switch (obj.layerName) {
          case "1"://天地图矢量图
            // window[this.id].tileset.show = true;
            _layer = new Cesium.WebMapTileServiceImageryProvider({
              url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=dcfb31be4b1daef33e484e48348cb28b',
              layer: 'img',
              style: 'default',
              tileMatrixSetID: 'w',
              format: 'tiles',
              maximumLevel: 18
            });
            window[this.id].viewer.imageryLayers.addImageryProvider(_layer);
            break;
          case "2"://天地图影像图
            // window[this.id].tileset.show = false;
            _layer = new Cesium.WebMapTileServiceImageryProvider({
              url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=dcfb31be4b1daef33e484e48348cb28b',
              layer: 'img',
              style: 'default',
              tileMatrixSetID: 'w',
              format: 'tiles',
              maximumLevel: 18
            });
            window[this.id].viewer.imageryLayers.addImageryProvider(_layer);
            break;
          case "3"://百度矢量图
            _layer = new Cesium.WebMapTileServiceImageryProvider({
              url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=dcfb31be4b1daef33e484e48348cb28b',
              layer: 'cia',
              style: 'default',
              tileMatrixSetID: 'w',
              format: 'tiles',
              maximumLevel: 18
            });
            window[this.id].viewer.imageryLayers.addImageryProvider(_layer);
            break;
          case "4"://百度影像图

            break;
          case "5"://时空云矢量图
            _layer = new Cesium.UrlTemplateImageryProvider({
              url: process.env.SCENE_URL + "/sceneData/gis/{z}/{x}/{y}.png",
              // url: "192.168.20.18:800/scene/gis/{z}/{x}/{y}.png",
              layer: "tdtBasicLayer",
              style: "default"
            });
            window[this.id].viewer.imageryLayers.addImageryProvider(_layer);
            break;
          case "6"://时空云影像图

            break;
        }

      },
      alpha(obj) {
        cm.alphaFN(obj.value, window[this.id].viewer, window[this.id].scene);
      },
      xyz(obj) {
        cm.xyzFN(obj.trigger, window[this.id].viewer, window[this.id].scene);
      },
      measure_drawPloy(obj) {
        cm.SetMeasure("drawPloy", window[this.id].viewer, window[this.id].scene);
      },
      measure_drawLine(obj) {
        cm.SetMeasure("drawLine", window[this.id].viewer, window[this.id].scene);
      },
      measure_clear(obj) {
        cm.clearDrawingBoard(window[this.id].viewer);
      },
      toScene(obj) {
        //跳到场景地形
        // cm.toScene(window[this.id].viewer, window[this.id].tileset);
        //摄像机地位
        cm.camera({
          scene: window[this.id].scene,
          longitude: 114.05566529913777,
          latitude: 22.604387298808085
        });
      },
      scene_data(obj) {

        switch (obj.data_type) {
          case "1"://采集的树数据
            if (obj.trigger) {
              this.alpha({
                value: 0.4
              });
              this.queryVicinityPrintFn(obj);
            } else {
              this.alpha({
                value: 1.0
              });
              cm.markerClear();
            }

            /* if (obj.trigger) {
               cm.addModeFN(window.viewer);
               cm.addPolygonFN(window.viewer);
               cm.addMarkerFN(cm.db.posts, "../../static/image/marker_2.png", window.viewer);
               cm.addMarkerFN(cm.db.posts2, "../../static/image/marker_3.png", window.viewer);
             } else {
               cm.markerClear();
               cm.modeClear();
               cm.entitiesClear("grid_", window.viewer);
             }*/
            break;
          case "2"://时空云数据
            break;
          case "3"://几何数据展示
            if (obj.trigger) {
              cm.addPolygonFN(window[this.id].viewer);
            } else {
              cm.entitiesClear("grid_", window[this.id].viewer);
            }
            break;
          case "4"://模型
            if (obj.trigger) {
              cm.addModeFN(window[this.id].viewer);
            } else {
              cm.modeClear();
            }
            break;
        }

      },
      queryVicinityPrintFn(obj) { //树木范围查询显示
        let _val = {
          lng: null,
          lat: null,
          distance: null,
          layer_name: "",
          data_maker_iconUrl: "",
          maker_titleKey: "",
          clusters_color: "",
        };

        for (let k in _val) {
          if (obj[k]) {
            _val[k] = obj[k];
          }
        }

        queryVicinityPrint({
          params: {
            longitude: _val.lng ? _val.lng : 114.03188276054428,
            latitude: _val.lat ? _val.lat : 22.619840297782094,
            distance: _val.distance ? _val.distance : 10000
          }
        }).then(response => {
          let _data = [];
          if (response.statusCode === 200) {
            response.data.forEach(function (_obj) {
              _obj.icon = _val.data_maker_iconUrl;
            });
            _data = response.data;
            console.log(_data);
          }
          cm.addMarkerFN(cm.db.posts2, "../../static/image/marker_2.png", window[this.id].viewer);
         /* let _layer = mp.clustersFn(_data, {
            type: _val.layer_name,
            titleKey: _val.maker_titleKey,
            iconUrlKey: "icon"
          }, _val.clusters_color, 30);
          this.addLayer({
            layer: _layer.layer
          });*/
        });
      },
      markerDataFn(obj) { //矢量数据展示

      },
      geomDataFn(obj) { //矢量数据展示

      }
    },
    created() {
      this.$store.commit("scene/set_type", this.id);
      this.$store.commit("scene/set_toolbar", [
        {
          id: "tool_flyToScene",
          value: "场景",
          control_type: "scene",
          icon: "el-icon-scene",
          control_id: "",
          fn: "toScene",
          trigger: "none"
        },
        {
          id: "tool_transparent",
          value: "透明",
          control_type: "emit",
          icon: "el-icon-transparent",
          control_id: "em_slider",
          fn: "showFn",
          trigger: true
        },
        {
          id: "tool_coordinates",
          value: "坐标",
          control_type: "scene",
          icon: "el-icon-coordinates",
          control_id: "",
          fn: "xyz",
          trigger: true
        },
        {
          id: "tool_data",
          value: "数据",
          control_type: "tool",
          icon: "el-icon-data",
          control_id: "scene_data",
          fn: "handleData",
          trigger: true
        },
        {
          id: "tool_distance",
          value: "距离",
          control_type: "scene",
          icon: "el-icon-distance",
          control_id: "",
          fn: "measure_drawLine",
          trigger: "none"
        },
        {
          id: "tool_area",
          value: "面积",
          control_type: "scene",
          icon: "el-icon-area",
          control_id: "",
          fn: "measure_drawPloy",
          trigger: "none"
        },
        {
          id: "tool_hightly",
          value: "高度",
          control_type: "scene",
          icon: "el-icon-highly",
          control_id: "",
          fn: "",
          trigger: "none"
        },
        {
          id: "tool_label",
          value: "清除",
          control_type: "scene",
          icon: "el-icon-remove2",
          control_id: "",
          fn: "measure_clear",
          trigger: "none"
        }
      ]);//设置场景工具面板
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
<style lang="scss" scoped>
  @import "scene";
</style>
