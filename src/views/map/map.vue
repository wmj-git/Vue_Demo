<template>
  <div class="map">
    <div :id="id"></div>
  </div>
</template>

<script>
  import {loadJs, loadCss} from "@/utils/tools";
  import mp from "@/utils/ol/index";
  import {queryVicinityPrint, findOne, queryAllcount} from "@/api/tree";
  import {marker} from "@/api/marker";
  import {geom} from "@/api/geom";

  export default {
    data() {
      return {
        id: "map"
      };
    },
    props: {},
    methods: {
      init() {

        let _this = this;
        // 初始化场景
        let _element = document.getElementById('ol_js');
        if (_element) {
          _this.mapInit();
          _this.layerInit();
        } else {
          //动态加载依赖库
          let _url = process.env.STATIC_URL;
          // console.log('css', _url);
          loadCss("ol_css", _url + "/sceneStatic/ol/ol.css", function () {
            // console.log('css');
          });
          loadJs("ol_js", _url + "/sceneStatic/ol/ol.js", function () {
            _this.mapInit();
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
      mapInit() {
        window[this.id].init([114.031047, 22.663679], [
          mp.baseMapFN().baidu_vec
        ]);
      },
      spaceTimeBaseMap(obj) {

        let _url = "";

        if (obj.url) {
          _url = obj.url;
        }

        let _resolutions = obj.resolutions;
        var _origin = obj.origin;

        this.toScene({
          zIndex: 4
        });

        let _layer = new ol.layer.Tile({//正视投影
          name: "baseMap_layer",
          source: new ol.source.ESRICache({
            origin: _origin,
            resolutions: _resolutions,
            projection: 'EPSG:4326',
            url: _url
          })
        });
        return _layer;
      },
      spaceTimeData(obj) {

        let _url = obj.data_url;
        let _type = obj.layer_name;
        let _iconUrl = obj.data_maker_iconUrl;
        let _titleKey = obj.maker_titleKey;
        let _clustersColor = obj.clusters_color;

        // window[this.id].viewFn(0, [114.05566529913777, 22.604387298808085]);
        let _layer = mp.clustersLayerFn(_url,
          {
            type: _type,
            titleKey: _titleKey,
            iconUrl: _iconUrl
          }, _clustersColor, 48);

        this.addLayer({
          layer: _layer.layer
        });
      },
      baseMapFn(obj) {
        let _layer = null;
        console.log(obj);
        this.removeLayer({
          layer_name: "baseMap"//删除当前低图
        });

        switch (obj.layerName) {
          case "1"://天地图矢量图
            _layer = mp.baseMapFN().tLayer_vec;
            break;
          case "2"://天地图影像图
            _layer = mp.baseMapFN().tLayer_img;
            break;
          case "3"://百度矢量图
            _layer = mp.baseMapFN().baidu_vec;
            break;
          case "4"://百度影像图
            _layer = mp.baseMapFN().baidu_img;
            break;
          case "5"://时空云矢量图
            let layer = mp.baseMapFN().tLayer_vec;
            this.addLayer({
              layer: layer,
              zIndex: -1
            });
            _layer = this.spaceTimeBaseMap({
              // url: "http://onelz.oicp.vip/proxy/layer/C8DDAE2452CE48F4ACBE0D60C455A234/01D4E45CB4A84DE7B5DF3D859529D918/tile/{z}/{y}/{x}"
              url: "http://onelz.oicp.vip/proxy/layer/50F068225D3944DD805E7B986D36C7B6/999C1448C6DD4842A35412B42226F0A3/tile/{z}/{y}/{x}",
              origin:[-180,90],
              resolutions:[
                0.9410711005830282, 0.7031250000000002,
                0.3515625000000001, 0.17578125000000006,
                0.08789062500000003, 0.043945312500000014,
                0.021972656250000007, 0.010986328125000003,
                0.005493164062500002, 0.002746582031250001,
                0.0013732910156250004, 6.866455078125002E-4,
                3.433227539062501E-4, 1.7166137695312505E-4,
                8.583068847656253E-5, 4.2915344238281264E-5,
                2.1457672119140632E-5, 1.0728836059570316E-5,
                5.364418029785158E-6, 2.682209014892579E-6,
                1.34110450744629E-6
              ]
            });
            break;
          case "6"://时空云影像图
            _layer = this.spaceTimeBaseMap({
              url: "http://onelz.oicp.vip/proxy/layer/E36DF1E5DD7D4081A1E722ED2C8D7455/999C1448C6DD4842A35412B42226F0A3/tile/{z}/{y}/{x}",
              origin:[-400,400],
              resolutions:[//影像图范围
                5.9486525145757E-4, 2.97432625728785E-4,
                1.5228550437313792E-4, 7.614275218656896E-5,
                3.807137609328448E-5, 1.903568804664224E-5,
                9.51784402332112E-6, 4.75892201166056E-6,
                2.37946100583028E-6, 1.18973050291514E-6,
                5.9486525145757E-7, 2.97432625728785E-7]
            });
            break;
          case "7"://本地矢量图
            _layer = mp.baseMapFN().osmLayer_vec;
            break;
          case "8"://本地影像图
            _layer = mp.baseMapFN().osmLayer_img;
            break;
        }

        this.addLayer({
          layer: _layer,
          zIndex: -1
        });
      },
      xyz(obj) {//坐标
        console.log(obj);
        if (obj.trigger) {
          window[this.id].coordinateOnFn();
        } else {
          window[this.id].coordinateOffFn();
        }
      },
      measure_drawPloy(obj) {
        window[this.id].measureOn("area");
      },
      measure_drawLine(obj) {
        window[this.id].measureOn("distance");
      },
      measure_clear(obj) {
        window[this.id].measureClear();
        window[this.id].measureOff();
      },
      toScene(obj) {
        let _zIndex = obj.zIndex ? obj.zIndex : 1;
        let _lng = obj.lng ? obj.lng : 114.031047;
        let _lat = obj.lat ? obj.lat : 22.663679;

        window[this.id].viewFn(_zIndex, [_lng, _lat]);
      },
      addLayer(obj) {
        let _layer = obj.layer;
        if (obj.zIndex) {
          _layer.setZIndex(obj.zIndex);
        }
        window[this.id].map.addLayer(_layer);
      },
      removeLayer(obj) {

        let _map = window[this.id].map;
        let _layers = _map.getLayers().getArray();

        _layers.forEach(function (_layer) {
          console.log(_layer.get("name"));
          let _name = obj.layer_name + "_layer";
          if (_layer.get("name") === _name) {
            _map.removeLayer(_layer);
          }
        });
      },
      scene_data(obj) {//接收图层属性数据

        console.log(obj);
        switch (obj.data_type) {
          case "1"://采集的树数据
            if (obj.trigger) {
              this.queryVicinityPrintFn(obj);
            } else {
              this.removeLayer({
                layer_name: obj.layer_name
              });
            }
            break;
          case "2"://时空云数据
            if (obj.trigger) {
              this.spaceTimeData(obj);
            } else {
              this.removeLayer({
                layer_name: obj.layer_name
              });
            }
            break;
          case "3"://几何数据展示
            if (obj.trigger) {
              this.geomDataFn(obj);
            } else {
              this.removeLayer({
                layer_name: obj.layer_name
              });
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
              this.removeLayer({
                layer_name: obj.layer_name
              });
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
            distance: _val.distance ? _val.distance : 1
          }
        }).then(response => {
          let _data = [];
          if (response.statusCode === 200) {
            response.data.forEach(function (_obj) {
              _obj.icon = _val.data_maker_iconUrl;
            });
            _data = response.data;
          }
          let _layer = mp.clustersFn(_data, {
            type: _val.layer_name,
            titleKey: _val.maker_titleKey,
            iconUrlKey: "icon"
          }, _val.clusters_color, 30);
          this.addLayer({
            layer: _layer.layer
          });
        });
      },
      markerDataFn(obj) {
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

          // this.queryVicinityPrintFn(obj)

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
            }
            let _layer = mp.clustersFn(_data, {
              type: _val.layer_name,
              titleKey: _val.maker_titleKey,
              iconUrlKey: "icon"
            }, _val.clusters_color, 50);
            this.addLayer({
              layer: _layer.layer
            });


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
      geomDataFn(obj) { //矢量数据展示
        let _val = {
          addTab: "true",
          data_url: "",
          params: {},
          layer_name: "",
          layer_title: "",
          api_name: "",
          geomType: "",
          geom_style: "1",//几何样式类型
          geom_titleKey: "",
          strokeWidth: 2,
          strokeColor: "[0, 255, 0, 1.0]",
          fillColor: "[0, 0, 255, 1.0]"
        };

        for (let k in _val) {
          if (obj[k]) {
            _val[k] = obj[k];
          }
        }

        // 解析(params_xx)
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
                if (_obj.coordinates && _val.geomType === "line") {
                  let _coordinates = JSON.parse(_obj.coordinates);
                  _obj.coordinates = _coordinates.data;
                }else if(_obj.coordinates && _val.geomType === "polygon"){
                  let _data=[];
                  let _coordinates = JSON.parse(_obj.coordinates);
                  _data.push(_coordinates.data);
                  _obj.coordinates = _data;
                }
              });
              _data = response.data;
            }
            let _layer = mp.layerFN(_data, {
              type: _val.layer_name,
              geomType: _val.geomType
            }, {
              type: _val.geom_style,
              titleKey: _val.geom_titleKey,//标题
              strokeWidth: _val.strokeWidth,
              strokeColor: _val.strokeColor,
              fillColor: _val.fillColor
            });
            this.addLayer({
              layer: _layer.layer
            });
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
          id: "tool_label",
          value: "清除",
          control_type: "scene",
          icon: "el-icon-remove2",
          control_id: "",
          fn: "measure_clear",
          trigger: "none"
        }
      ]);//设置场景工具面板
      //初始化二维场景
      mp.openScene(this.id);

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
  @import "map";
</style>
