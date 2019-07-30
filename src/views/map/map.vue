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
                        id: "tool_label",
                        value: "清除",
                        control_type:"scene",
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
            baseMapFn(obj) {

                console.log(obj);

                let _map=window[this.id].map;
                let _layers=_map.getLayers().getArray();

                _layers.forEach(function (_layer) {
                    if(_layer.get("name")==="baseMap"){
                        _map.removeLayer(_layer);
                    }
                });

                let _layer = this.spaceTimeBaseMap();
                this.addLayer({
                    layer: _layer,
                    zIndex: 0
                });
            },
            spaceTimeBaseMap() {

                let _resolutions = window[this.id].resolutions;
                var _origin = [-400, 400];
                let _layer = new ol.layer.Tile({//正视投影
                    name:"baseMap",
                    source: new ol.source.ESRICache({
                        origin: _origin,
                        resolutions: _resolutions,
                        projection: 'EPSG:4326',
                        url: 'http://onelz.oicp.vip/proxy/layer/E36DF1E5DD7D4081A1E722ED2C8D7455/999C1448C6DD4842A35412B42226F0A3/tile/{z}/{y}/{x}'
                    })
                });
                return _layer;
            },
            spaceTimeData(obj) {
                window[this.id].viewFn(0, "none");
                let _layer = mp.clustersLayerFn(
                    'http://onelz.oicp.vip/proxy/server/A13041017DC845579548DA3528DF9B47/999C1448C6DD4842A35412B42226F0A3',
                    {
                        type: "tree",
                        titleKey: "OBJECTID",
                        iconUrl: "../../static/image/marker_2.png"
                    }, "#1d6633", 48);

                this.addLayer({
                    layer: _layer.layer
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
                window[this.id].viewFn(0, [114.031047, 22.663679]);
            },
            scene_data(obj) {
                console.log(obj);

                if(obj.value){
                    window[this.id].map.removeLayer(_layer);
                }

                switch (obj.value) {
                    case "1":
                        this.queryVicinityPrintFn(114.03188276054428, 22.619840297782094, 50000);//采集的树数据
                        break;
                    case "2":
                        this.spaceTimeData();//时空云数据
                        break;
                }
            },
            addLayer(obj) {
                let _layer = obj.layer;
                if (obj.zIndex) {
                    _layer.setZIndex(obj.zIndex);
                }
                window[this.id].map.addLayer(_layer);
            },
            queryVicinityPrintFn(lng, lat, distance) { //树木范围查询显示
                // this.queryVicinityPrintFn(114.03188276054428, 22.619840297782094,50000);
                queryVicinityPrint({
                    params: {
                        longitude: lng,
                        latitude: lat,
                        distance: distance
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

                    let _layer = mp.clustersFn(_data, {
                        type: "tree",
                        titleKey: "id",
                        iconUrlKey: "icon"
                    }, "#312332", 30);
                    this.addLayer({
                        layer: _layer.layer
                    });
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
        },
        beforeDestroy() {
            this.bus.$off(this.id);
        }
    };
</script>
<style lang="scss" scoped>
    @import "map";
</style>
