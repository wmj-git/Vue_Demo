<template>
  <div class="map">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
  import mp from "@/utils/ol/index";
  import {queryVicinityPrint, findOne, queryAllcount} from "@/api/tree";

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

        this.$store.commit("scene/set_type", this.id);//
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
        window[this.id].init("mapContainer", [114.031047, 22.663679], [
          mp.layers.baidu_vec
        ]);

      },
      spaceTimeBaseMap(obj) {


        let _resolutions = window[this.id].resolutions;
        var _origin = [-400, 400];

        this.toScene({
          zIndex: 4
        });

        let _layer = new ol.layer.Tile({//正视投影
          name: "baseMap_layer",
          source: new ol.source.ESRICache({
            origin: _origin,
            resolutions: _resolutions,
            projection: 'EPSG:4326',
            url: 'http://onelz.oicp.vip/proxy/layer/E36DF1E5DD7D4081A1E722ED2C8D7455/999C1448C6DD4842A35412B42226F0A3/tile/{z}/{y}/{x}'
            //url: 'http://onelz.oicp.vip/proxy/layer/5D65AF2C089A4FE2985AD6090304F8BE/999C1448C6DD4842A35412B42226F0A3/tile/{z}/{y}/{x}'
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

        window[this.id].viewFn(0, [114.05566529913777, 22.604387298808085]);
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
            _layer = mp.layers.tLayer_vec;
            break;
          case "2"://天地图影像图
            _layer = mp.layers.tLayer_img;
            break;
          case "3"://百度矢量图
            _layer = mp.layers.baidu_vec;
            break;
          case "4"://百度影像图
            _layer = mp.layers.baidu_img;
            break;
          case "5"://时空云矢量图
            _layer = this.spaceTimeBaseMap();
            break;
          case "6"://时空云影像图
            _layer = this.spaceTimeBaseMap();
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
        let _zIndex = obj.zIndex ? obj.zIndex : 0;
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
      scene_data(obj) {
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
              obj.params = {
                longitude: 114.03188276054428,
                latitude: 22.619840297782094,
                distance: 10000
              };

              this.geomDataFn(obj);
            } else {
              this.removeLayer({
                layer_name: obj.layer_name
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
      geomDataFn(obj) { //矢量数据展示
        let _val = {
          data_url: "",
          params: {},
          layer_name: "",
          api_name: "",
          geomType: "",
          geom_style: "1",//几何样式类型
          geom_titleKey: "",
          strokeWidth: 2,
          strokeColor: [0, 255, 0, 1.0],
          fillColor: [0, 0, 255, 1.0]
        };

        for (let k in _val) {
          if (obj[k]) {
            _val[k] = obj[k];
          }
        }


        if(_val.api_name==="queryVicinityPrint"){

          queryVicinityPrint({
            url: _val.data_url,
            params: _val.params
          }).then(response => {
            let _data = [];
            if (response.statusCode === 200) {
              response.data.forEach(function (_obj) {

                _obj.coordinates =[[114.00614435225583, 22.64468317909319],[114.00686770840161, 22.644074037075697], [114.00888549133455, 22.64434053670835],[114.00663928014505, 22.646929390282693]];
                // _obj.coordinates =[[[114.00614435225583, 22.64468317909319],[114.00686770840161, 22.644074037075697], [114.00888549133455, 22.64434053670835],[114.00663928014505, 22.646929390282693]]];

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
          });

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
    },
    beforeDestroy() {
      this.bus.$off(this.id);
    }
  };
</script>
<style lang="scss" scoped>
  @import "map";
</style>
