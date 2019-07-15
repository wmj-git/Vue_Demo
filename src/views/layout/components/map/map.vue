<template>
  <div class="map">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
  import {clustersFn} from "@/utils/ol/fn";
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


        this.queryVicinityPrintFn();

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

        let _url = 'http://onelz.oicp.vip/proxy/server/A13041017DC845579548DA3528DF9B47/999C1448C6DD4842A35412B42226F0A3';
        let esrijsonFormat = new ol.format.EsriJSON();
        let vectorSource = new ol.source.Vector({
          loader: function (extent, resolution, projection) {
            console.log(extent);
            var url = _url + '/query/?f=json&' +
              'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
              encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
                extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
                ',"spatialReference":{"wkid":4490}}') +
              '&geometryType=esriGeometryEnvelope&inSR=4490&outFields=*' +
              '&outSR=4490';
            $.ajax({
              url: url, dataType: 'jsonp', success: function (response) {
                if (response.error) {
                  alert(response.error.message + '\n' +
                    response.error.details.join('\n'));
                } else {
                  // dataProjection will be read from document
                  var features = esrijsonFormat.readFeatures(response, {
                    featureProjection: projection
                  });
                  if (features.length > 0) {
                    vectorSource.addFeatures(features);
                  }
                }
              }
            });
          },
          strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
            tileSize: 512
          })),
          wrapX: false
        });
        var vectorLayer = new ol.layer.Vector({
          source: vectorSource
        });

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
            // vectorLayer
          ],
          view: new ol.View({
            resolutions: _resolutions,
            center: [114.031047, 22.663679],
            zoom: 6,
            projection: 'EPSG:4326',
          })
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
      queryVicinityPrintFn() {

        queryVicinityPrint({
          params: {
            longitude: 114.031047,
            latitude: 22.663679,
            distance: 500000
          }
        }).then(response => {
          console.log("queryVicinityPrint");
          console.log(response);

          let _data = [];
          if (response.statusCode === 200) {
            response.data.forEach(function (_obj) {
              _obj.icon = "../../static/image/marker_2.png";
            });
            _data= response.data;
          }

          let _layer = clustersFn(_data, {
            type: "tree",
            titleKey: "id",
            iconUrlKey: "icon"
          }, "../../static/image/cluster0.png", 10);
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
