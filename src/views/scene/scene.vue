<template>
  <div class="scene">
    <div :id="id"></div>
  </div>
</template>

<script>
  import {loadJs, loadCss} from "@/utils/tools";
  import cm from "@/utils/cesium/index"
  import {queryVicinityPrint, findOne, queryAllcount} from "@/api/tree";
  import {marker} from "@/api/marker";
  import {geom} from "@/api/geom";

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
        let _this = this;
        // 初始化场景
        // cm.init(this.id, "https://onelz.oicp.vip/SG/b3dm/LH1-1-2.405276/tileset.json");
        let _element = document.getElementById('Cesium_js');
        if (_element) {
          _this.sceneInit();
          _this.layerInit();
        } else {
          //动态加载依赖库
          let _url = process.env.STATIC_URL;
          loadCss('widgets_css', _url + "/sceneStatic/Cesium/Widgets/widgets.css", function () {
            console.log('css');
          });
          loadJs('Cesium_js', _url + "/sceneStatic/Cesium/Cesium.js", function () {
            console.log('js');
            _this.sceneInit();
            _this.layerInit();
          });
        }

      },
      layerInit() {
        let _this=this;
        let _Tabs = this.$store.getters["scene/layerData"];
        console.log("_Tabs");
        console.log(_Tabs);
        _Tabs.forEach(function (_tab) {
          _tab.data.addTab="false";
          _this[_tab.data.fn](_tab.data);
        });

      },
      sceneInit() {
        cm.init(this.id, process.env.STATIC_URL + "/sceneData/b3dm/tileset.json", {
          longitude: 114.0497756235571,
          latitude: 22.637316560481576,
          height: -260
        });
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
          case "5":

            break;
          case "6":

            break;
          case "7":
            _layer = new Cesium.UrlTemplateImageryProvider({
              url: process.env.STATIC_URL + "/sceneData/zhlh_vec/{z}/{x}/{y}.png",
              layer: "tdtBasicLayer",
              style: "default"
            });
            window[this.id].viewer.imageryLayers.addImageryProvider(_layer);
            break;
          case "8":
            _layer = new Cesium.UrlTemplateImageryProvider({
              url: process.env.STATIC_URL + "/sceneData/zhlh_img/{z}/{x}/{y}.png",
              layer: "tdtBasicLayer",
              style: "default"
            });
            window[this.id].viewer.imageryLayers.addImageryProvider(_layer);
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
        let _height = obj.zIndex ? 300 : 32940.79281690694;
        let _lng = obj.lng ? obj.lng : 113.991282335704;
        let _lat = obj.lat ? obj.lat : 22.43563404218315;

        //跳到场景地形
        // cm.toScene(window[this.id].viewer, window[this.id].tileset);
        //摄像机地位
        cm.camera({
          scene: window[this.id].scene,
          heading: 0.20285622255189661,
          height: _height,
          latitude: _lat,
          longitude: _lng,
          pitch: -1.0720152334460842,
          roll: 0.0003150108934901752
        });
      },
      removeLayer(obj){
        cm.dataSourceClear(obj.layer_name);
      },
      scene_data(obj) {

        switch (obj.data_type) {
          case "1"://采集的树数据
            if (obj.trigger) {
              this.queryVicinityPrintFn(obj);
            } else {
              cm.dataSourceClear(obj.layer_name);
            }
            break;
          case "2"://时空云数据
            break;
          case "3"://几何和模型数据展示
            if (obj.trigger) {
              this.geomDataFn(obj);
            } else {
              cm.dataSourceClear(obj.layer_name);
              this.bus.$emit("scene_data_emTabs", {
                fn: "removeTabFn",
                name: obj.layer_name,
                title: obj.layer_title
              });
            }
            break;
          case "4"://marker显示
            if (obj.trigger) {
              this.markerDataFn(obj);
            } else {
              cm.dataSourceClear(obj.layer_name);
              this.bus.$emit("scene_data_emTabs", {
                fn: "removeTabFn",
                name: obj.layer_name,
                title: obj.layer_title
              });
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
          cm.addMarkerFN(_data, {
            type: _val.layer_name,
            titleKey: _val.maker_titleKey,
            iconUrlKey: "icon",
            clusters_color: _val.clusters_color
          }, window[this.id].viewer);

        });
      },
      markerDataFn(obj) { //聚合数据展示
        let _val = {
          addTab: "true",
          api_name: "",
          data_url: "",
          params: {},
          layer_name: "",
          layer_title: "",
          data_maker_iconUrl: "",
          maker_titleKey: "",
          clusters_color: "",
        };

        //set
        for (let k in _val) {
          if (obj[k]) {
            _val[k] = obj[k];
          }
        }
        // params
        for (let k in obj) {
          let _params = k.split("_");
          if (_params[0] === "params") {
            _val.params[_params[1]] = obj[k];
          }
        }

        if (_val.api_name === "queryVicinityPrint") {

        } else if (_val.api_name === "marker") {

          marker({
            url: _val.data_url,
            params: _val.params
          }).then(response => {
            let _data = [];
            if (response.statusCode === 200) {
              response.data.forEach(function (_obj) {
                _obj.icon = _val.data_maker_iconUrl;
              });
              _data = response.data;
              console.log(_val);
              console.log(_data);
            }
            cm.addMarkerFN(_data, {
              type: _val.layer_name,
              titleKey: _val.maker_titleKey,
              iconUrlKey: "icon",
              clusters_color: _val.clusters_color
            }, window[this.id].viewer);

            if (_val.addTab === "true") {
              this.bus.$emit("scene_data_emTabs", {
                fn: "addTab",
                name: _val.layer_name,
                title: _val.layer_title,
                data: obj,
                treeData: _data,
                treeChildren: "children",
                treeLabel: _val.maker_titleKey
              });
            }
          });

        }
      },
      geomDataFn(obj) { //数据矢量展示
        let _val = {
          addTab: "true",
          data_url: "",
          params: {},
          layer_name: "",
          layer_title: "",
          api_name: "",
          geomType: "",//几何类型
          geom_style: "1",//几何样式
          geom_titleKey: "",
          strokeWidth: 2,
          strokeColor: "[0, 255, 0, 255]",
          fillColor: "[0, 0, 255, 255]",
          clusters_enabled: "",//聚合显示
          clusters_color: "#46ff71"//聚合颜色
        };

        //set
        for (let k in _val) {
          if (obj[k]) {
            _val[k] = obj[k];
          }
        }
        // params
        for (let k in obj) {
          let _params = k.split("_");
          if (_params[0] === "params") {
            _val.params[_params[1]] = obj[k];
          }
        }

        if (_val.api_name === "geom") {
          geom({
            url: _val.data_url,
            params: _val.params
          }).then(response => {
            let _data = [];
            if (response.statusCode === 200) {
              response.data.forEach(function (_obj) {
                let _coordinates = [];

                if(_obj.coordinates){
                  _coordinates = JSON.parse(_obj.coordinates);
                  console.log(_coordinates);
                }

                if (_coordinates && _coordinates.data && _val.geomType === "line") {

                  _obj.coordinates = _coordinates.data;
                  let _data = [];
                  _obj.coordinates.forEach(function (_val) {
                    _val.forEach(function (val) {
                      _data.push(val);
                    });
                  });
                  _obj.coordinates = _data;
                  console.log(_obj);
                } else if (_coordinates && _coordinates.data && _val.geomType === "polygon") {
                  // _obj.coordinates = _coordinates.data[0];
                  _obj.coordinates = _coordinates.data;
                  let _data = [];
                  _obj.coordinates.forEach(function (_val) {
                    _val.forEach(function (val) {
                      _data.push(val);
                    });
                  });
                  _obj.coordinates = _data;
                }else{
                  _obj.coordinates = [];
                }

              });
              _data = response.data;
          /* console.log("123");
              console.log(_val);
              console.log(_data);*/
            }
            cm.addDataSource(_data,
              {
                layer_name: _val.layer_name,
                geomType: _val.geomType,
                type: _val.geom_style,
                titleKey: _val.geom_titleKey,
                strokeWidth: _val.strokeWidth,
                strokeColor: _val.strokeColor,
                fillColor: _val.fillColor,
                clusters_enabled: _val.clusters_enabled,//聚合显示
                clusters_color: _val.clusters_color//聚合颜色
              }, window[this.id].viewer);

            if (_val.addTab === "true") {
              this.bus.$emit("scene_data_emTabs", {
                fn: "addTab",
                name: _val.layer_name,
                title: _val.layer_title,
                data: obj,
                treeData: _data,
                treeChildren: "children",
                treeLabel: _val.geom_titleKey
              });
            }
          });
        }
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
