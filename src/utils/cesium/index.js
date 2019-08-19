//data
import {db} from "./data/db"
import {api, toScene,addDataSource,camera,getCameraPosition, entitiesClear,dataSourceClear} from "./utils"
import {infoInit} from "./info";
import {addModeFN, modeClear} from "./mode"
import {addPolygonFN} from "./grid"
import {addMarkerFN} from "./marker"
import {addPointFN} from "./point"
import {alphaFN} from "./alpha"
import {xyzFN} from "./xyz"
import {SetMeasure, clearDrawingBoard} from "./measure"
import {emMap} from "../ol/fn";

function init(_name, tileset_url,_coordinates) {
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


  setTimeout(function () {
    let _tileset = new Cesium.Cesium3DTileset({
      name: "tileset_hc",
      url: tileset_url,
      loadSiblings: true,
      maximumMemoryUsage: 1500
    });

    viewer.scene.primitives.add(_tileset);

    // 经纬度等
    var longitude = _coordinates.longitude;
    var latitude = _coordinates.latitude;
    var height = _coordinates.height;
    // var heading = 0 // 方位角
    // 模型加载完毕后的回调
    _tileset.readyPromise.then(function (argument) {
      // 1、旋转
      let hpr = new Cesium.Matrix3();
      // new Cesium.HeadingPitchRoll(heading, pitch, roll)
      // heading围绕负z轴的旋转。pitch是围绕负y轴的旋转。Roll是围绕正x轴的旋转
      let hprObj = new Cesium.HeadingPitchRoll(Math.PI, Math.PI, Math.PI);

      //  Cesium.Matrix3.fromHeadingPitchRoll （headingPitchRoll，result）
      hpr = Cesium.Matrix3.fromHeadingPitchRoll(hprObj, hpr);

      // 2、平移
      // 2.3储存平移的结果
      let modelMatrix = Cesium.Matrix4.multiplyByTranslation(
        // 2.1从以度为单位的经度和纬度值返回Cartesian3位置
        // 2.2计算4x4变换矩阵
        Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(longitude,latitude, height)),
        new Cesium.Cartesian3(),
        new Cesium.Matrix4()
      );
      /// 3、应用旋转
      // Cesium.Matrix4.multiplyByMatrix3 （矩阵，旋转，结果）
      Cesium.Matrix4.multiplyByMatrix3(modelMatrix, hpr, modelMatrix);
      _tileset._root.transform = modelMatrix
    });
    viewer.zoomTo(_tileset);

  }, 200);


//跳转到场景全貌
/*  tileset.readyPromise.then(function () {
    let boundingSphere = tileset.boundingSphere;
    console.log(boundingSphere);
    viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius + 500.0));
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);


    let cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    // let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -50);
    let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -50);
    let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
  });*/

  infoInit(viewer);//初始化信息窗


  window[_name] = {
    viewer,
    scene,
    globe
  };

 /* console.log("window[_name]");
  console.log(window[_name]);*/

}



export default {
  db: db,
  api: api,
  init: init,
  toScene: toScene,
  addDataSource:addDataSource,
  camera:camera,
  getCameraPosition:getCameraPosition,
  alphaFN: alphaFN,
  xyzFN: xyzFN,
  addModeFN: addModeFN,
  modeClear: modeClear,
  addPolygonFN: addPolygonFN,
  addMarkerFN: addMarkerFN,
  addPointFN:addPointFN,
  dataSourceClear: dataSourceClear,
  entitiesClear: entitiesClear,
  SetMeasure: SetMeasure,
  clearDrawingBoard: clearDrawingBoard
}
