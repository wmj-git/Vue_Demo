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
                        control_type:"scene",
                        icon: "el-icon-scene",
                        control_id: "",
                        fn: "toScene",
                        trigger: "none"
                    },
                    {
                        id: "tool_transparent",
                        value: "透明",
                        control_type:"emit",
                        icon: "el-icon-transparent",
                        control_id: "em_slider",
                        fn: "showFn",
                        trigger: true
                    },
                    {
                        id: "tool_coordinates",
                        value: "坐标",
                        control_type:"scene",
                        icon: "el-icon-coordinates",
                        control_id: "",
                        fn: "xyz",
                        trigger: true
                    },
                    {
                        id: "tool_data",
                        value: "数据",
                        control_type:"tool",
                        icon: "el-icon-data",
                        control_id: "scene_data",
                        fn: "handleData",
                        trigger: true
                    },
                    {
                        id: "tool_distance",
                        value: "距离",
                        control_type:"scene",
                        icon: "el-icon-distance",
                        control_id: "",
                        fn: "measure_drawLine",
                        trigger: "none"
                    },
                    {
                        id: "tool_area",
                        value: "面积",
                        control_type:"scene",
                        icon: "el-icon-area",
                        control_id: "",
                        fn: "measure_drawPloy",
                        trigger: "none"
                    },
                    {
                        id: "tool_hightly",
                        value: "高度",
                        control_type:"scene",
                        icon: "el-icon-highly",
                        control_id: "",
                        fn: "",
                        trigger: "none"
                    },
                    {
                        id: "tool_label",
                        value: "清除",
                        control_type:"scene",
                        icon: "el-icon-remove2",
                        control_id: "",
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
                      // url: process.env.SCENE_URL + "/scene/gis/{z}/{x}/{y}.png",
                      url: "192.168.20.18:800/scene/gis/{z}/{x}/{y}.png",
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
                 //加载影像注记
                /*   var layer1 = new Cesium.WebMapTileServiceImageryProvider({
                       url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=dcfb31be4b1daef33e484e48348cb28b',
                       layer: 'cia',
                       style: 'default',
                       tileMatrixSetID: 'w',
                       format: 'tiles',
                       maximumLevel: 18
                   });
                window.viewer.imageryLayers.addImageryProvider(layer1);*/


                // 加载地形1
                // window._scene = cm.openScene(window.viewer, process.env.SCENE_URL + "/zhlhscene/b3dm/tileset.json");
                window._scene = cm.openScene(window.viewer, "https://onelz.oicp.vip/SG/b3dm/LH1-1-2.405276/tileset.json");

               /* this.scene_data({
                  trigger:true
                });*/
            },
            baseMapFn(obj) {
            let _layer = null;
            console.log(obj);

            switch (obj.layerName) {
              case "1"://天地图矢量图

                break;
              case "2"://天地图影像图

                break;
              case "3"://百度矢量图

                break;
              case "4"://百度影像图

                break;
              case "5"://时空云矢量图

                break;
              case "6"://时空云影像图

                break;
            }

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
        },
        beforeDestroy() {
            this.bus.$off(this.id);
        }
    };
</script>
<style lang="scss" scoped>
    @import "scene";
</style>
