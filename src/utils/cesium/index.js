//data
import {db} from "./data/db"
import {api, toScene,camera, entitiesClear} from "./utils"
import {infoInit} from "./info";
import {addModeFN, modeClear} from "./mode"
import {addPolygonFN} from "./grid"
import {addMarkerFN, markerClear} from "./marker"
import {alphaFN} from "./alpha"
import {xyzFN} from "./xyz"
import {SetMeasure, clearDrawingBoard} from "./measure"
import {emMap} from "../ol/fn";

function init(_name, tileset_url) {

  let viewer = new Cesium.Viewer(_name, {
    scene3DOnly: true,
    animation: false, //是否显示动画控件
    baseLayerPicker: false, //是否显示图层选择控件
    geocoder: false, //是否显示地名查找控件
    timeline: false, //是否显示时间线控件
    sceneModePicker: true, //是否显示投影方式控件
    homeButton: false,
    navigationHelpButton: false, //是否显示帮助信息控件
    infoBox: true, //是否显示点击要素之后显示的信息
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


  let scene = viewer.scene;
  scene.invertClassification = true;
  scene.invertClassificationColor = new Cesium.Color(1.0, 1.0, 1.0, 1.0);

  let globe = viewer.scene.globe;
  globe.depthTestAgainstTerrain = true;


  let tileset = new Cesium.Cesium3DTileset({
    name: "tileset_hc",
    url: tileset_url,
    loadSiblings: true,
    maximumMemoryUsage: 1000
  });

  viewer.scene.primitives.add(tileset);

//跳转到场景全貌
  tileset.readyPromise.then(function () {
    let boundingSphere = tileset.boundingSphere;
    console.log(boundingSphere);
    viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius + 500.0));
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);


    let cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -50);
    let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
  });

// viewer.zoomTo(tileset);//场景跳转

  infoInit(viewer);//初始化信息窗

  let polyline = viewer.entities.add({
    name: '线路1',
    id: 'polyline_1',
    featureData:123132,
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        114.0497756235571,
        22.637316560481576,
        114.04689837329487,
        22.638332282431715,
        114.04532045835998,
        22.636634046220546,
        114.04450058542454,
        22.634437661214047,
        106.29083865072324,
        30.02556221957544,
        106.28666473851872,
        30.02695784278787
      ]),
      width: 18,
      material: new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.fromCssColorString('#4cf02c').withAlpha(0.8),
        outlineWidth: 2,
        outlineColor: Cesium.Color.BLACK
      }),
      clampToGround: true,
      classificationType: Cesium.ClassificationType.BOTH
    }
  });
let dataSource={};

  window[_name] = {
    viewer,
    scene,
    globe,
    tileset,
    dataSource
  };

  console.log("window[_name]");
  console.log(window[_name]);

}

export default {
  db: db,
  api: api,
  init: init,
  toScene: toScene,
  camera:camera,
  alphaFN: alphaFN,
  xyzFN: xyzFN,
  addModeFN: addModeFN,
  modeClear: modeClear,
  addPolygonFN: addPolygonFN,
  addMarkerFN: addMarkerFN,
  markerClear: markerClear,
  entitiesClear: entitiesClear,
  SetMeasure: SetMeasure,
  clearDrawingBoard: clearDrawingBoard
}
