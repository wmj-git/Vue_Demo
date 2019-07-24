<template>
  <div class="map">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
  import {clustersFn, clustersLayerFn} from "@/utils/ol/fn";
  import mp from "@/utils/ol/index";
  import {queryVicinityPrint, findOne, queryAllcount} from "@/api/tree";

  export default {
    data() {
      return {
        id: "map",
        height: '',
        treeSource: ""
      };
    },
    props: {},
    methods: {
      init() {
        let _this = this;

        let _resolutions = [
          5.9486525145757E-4, 2.97432625728785E-4,
          1.5228550437313792E-4, 7.614275218656896E-5,
          3.807137609328448E-5, 1.903568804664224E-5,
          9.51784402332112E-6, 4.75892201166056E-6,
          2.37946100583028E-6, 1.18973050291514E-6,
          5.9486525145757E-7, 2.97432625728785E-7];
        let _origin = [-400, 400];

        let _Source = new ol.layer.Tile({//正视投影
          source: new ol.source.ESRICache({
            origin: _origin,
            resolutions: _resolutions,
            projection: 'EPSG:4326',
            url: 'http://onelz.oicp.vip/proxy/layer/E36DF1E5DD7D4081A1E722ED2C8D7455/999C1448C6DD4842A35412B42226F0A3/tile/{z}/{y}/{x}'
          })
        });

        var ly = clustersLayerFn(
          'http://onelz.oicp.vip/proxy/server/A13041017DC845579548DA3528DF9B47/999C1448C6DD4842A35412B42226F0A3',
          {
            type: "tree",
            titleKey: "OBJECTID",
            iconUrl: "../../static/image/marker_2.png"
          }, "#1d6633", 48);
        window._map = new ol.Map({
          controls: ol.control.defaults({attribution: false, zoom: false, rotate: true}).extend([
            //new ol.control.LayerSwitcher({ trash: false, extent: true }),
            //new ol.control.ScaleLine(),
            //new ol.control.Zoom({ target: undefined}),
            //new ol.control.Rotate({
            // autoHide: true,
            // label: “N”
            //}),
            //new ol.control.MeasureTool({ sphereradius: 6378137 })
          ]),
          target: 'mapContainer',
          layers: [
            // mp.layers.tianSource,
            // _Source,
            mp.layers.baidu_a,
            // osmSource,
            // ly.layer
          ],
          view: new ol.View({
            resolutions: _resolutions,
            center: [114.031047, 22.663679],
            zoom: 0,
            projection: 'EPSG:4326',
          })
        });
        this.queryVicinityPrintFn(114.03188276054428, 22.619840297782094);


        window._map.on('moveend', function (e) {
          let _map = e.map;
          let _extent = _map.getView().calculateExtent(_map.getSize());
          let _point = ol.extent.getCenter(_extent);
          console.log(_point);
          let _zoom = e.map.getView().getZoom();
          console.log(_zoom);

          if (ly.clusterSource) {
            if (_zoom > 6) {
              ly.clusterSource.setDistance(0);
            } else {
              ly.clusterSource.setDistance(50);
            }
          }
        });
      },
      alpha(obj) {
        mp.alphaFN();
      },
      xyz(obj) {
        mp.xyzFN();
      },
      measure_drawPloy(obj) {
        mp.SetMeasure();
      },
      measure_drawLine(obj) {
        mp.SetMeasure("drawLine", window.viewer, window._scene.scene);
      },
      measure_clear(obj) {
        mp.clearDrawingBoard(window.viewer);
      },
      toScene() {
        mp.toScene();
      },
      scene_data(obj) {

      },
      queryVicinityPrintFn(lng, lat) {

        queryVicinityPrint({
          params: {
            longitude: lng,
            latitude: lat,
            distance: 50000
          }
        }).then(response => {
         /* console.log("queryVicinityPrint");
          console.log(response);*/

          let _data = [];
          if (response.statusCode === 200) {
            response.data.forEach(function (_obj) {
              _obj.icon = "../../static/image/marker_3.png";
            });
            _data = response.data;
          }

          let _layer = clustersFn(_data, {
            type: "tree",
            titleKey: "id",
            iconUrlKey: "icon"
          }, "#312332", 30);
          window._map.addLayer(_layer.layer);
        });
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
  @import "map";
</style>
