import store from '@/store'
import {addModeFN} from "./mode"
import {addPointFN} from "./point"
import {addTextFN} from "./text"
import {addLineFN} from "./line"
import {addPolygonFN} from "./polygon"
import {addCircleFN} from "./circle"


export function api(url, type, data) {
  let _data = null;
  $.ajax({
    url: url,
    type: type,
    data: JSON.stringify(data),
    cache: false,
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    async: false,//false同步请求
    statusCode: {
      404: function () {
        // console.log('404');
      },
      200: function () {
        // console.log('200');
      }
    },
    success: function (result) {
      // console.log(result);
      _data = result;
    }
  });
  return _data;
}

//回到场景
export function toScene(viewer, tileset) {
  var boundingSphere = tileset.boundingSphere;
  console.log(boundingSphere);
  viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius + 500.0));
  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
}

//相机移动
export function camera(val) {

  let _val = {
    scene: "",
    longitude: 114.05566529913777,
    latitude: 22.604387298808085,
    height: 5899.935147224181,
    heading: 6.00167603155171,
    pitch: -0.992391732163183,
    roll: 0.0003317087969181287
  };


  for (let k in _val) {
    if (val[k]) {
      _val[k] = val[k];
    }
  }


  _val.scene.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(_val.longitude, _val.latitude, _val.height + 20),
    orientation: {
      heading: _val.heading,
      pitch: _val.pitch,
      roll: _val.roll
    }
  });
}

// 获取相机位置
export function getCameraPosition(scene) {
  let position = {
    longitude: 106.29265355440698,
    latitude: 30.023569031855335,
    height: 800.0,
    heading: 5.154573786584606,
    pitch: -1.14229615865957967,
    roll: 3.2294167340296553e-12
  };


  let cartographic = Cesium.Cartographic.fromCartesian(scene.camera.position);
  let longitude = Cesium.Math.toDegrees(cartographic.longitude);
  let latitude = Cesium.Math.toDegrees(cartographic.latitude);
  let height = cartographic.height;
  // console.log("longitude:" + longitude + "--latitude:" + latitude + "--height:" + height);
  // console.log("position:" + scene.camera.position + "--heading:" + scene.camera.heading + "--pitch:" + scene.camera.pitch + "--roll:" + scene.camera.roll);

  position.longitude = longitude;
  position.latitude = latitude;
  position.height = height;
  position.heading = scene.camera.heading;
  position.pitch = scene.camera.pitch;
  position.roll = scene.camera.roll;

  // console.log(position);

  return position;
}

export function entitiesClear(value, viewer) {
  let removes = [], Entities = [];
  Entities = viewer.entities.values;

  var LN = new RegExp(value);//删除匹配

  for (var i = 0; i < Entities.length; i++) {
    if (LN.test(Entities[i].id)) {
      removes.push(Entities[i].id);
    }
  }
  for (var i = 0; i < removes.length; i++) {
    viewer.entities.removeById(removes[i]);
  }
}

//添加数据图层
export function addDataSource(_Entities, _Set, viewer) {

  if (_Set.geomType === "Point") {//点
    addPointFN(_Entities, _Set, viewer);
  } else if (_Set.geomType === "Text") {//文本
    addTextFN(_Entities, _Set, viewer);
  } else if (_Set.geomType === "LineString") {//线
    addLineFN(_Entities, _Set, viewer);
  } else if (_Set.geomType === "Polygon") {//多边形
    addPolygonFN(_Entities, _Set, viewer);
  } else if (_Set.geomType === "Circle") {//圆
    addCircleFN(_Entities, _Set, viewer);
  } else if (_Set.geomType === "Mode") {//模型
    addModeFN(_Entities, _Set, viewer);
  }

}

//移除数据图层
export function dataSourceClear(_dataSourceName) {
  let _this = null;
  let _mapNmame = store.getters["scene/type"];
  if (window[_mapNmame]) {
    _this = window[_mapNmame];
  } else {
    return
  }

  if (_dataSourceName === "all") {
    _this.viewer.dataSources.removeAll();
    return;
  }

  let _length = _this.viewer.dataSources.length;
  console.log(_length);
  for (let i = 0; i <= _length; i++) {
    let _dataSource = _this.viewer.dataSources.get(i);
    console.log(_dataSource);
    if (_this.viewer.dataSources.contains(_dataSource)) {
      let _name = _dataSource.name;
      console.log(_name);
      if (_name === _dataSourceName) {
        _this.viewer.dataSources.remove(_dataSource);
      }
    }
  }
}
