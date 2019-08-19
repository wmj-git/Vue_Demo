function addCircle(Entities, featureKey, viewer) {

  let _dataSource = new Cesium.CustomDataSource(featureKey.layer_name);


  for (let i = 0; i < Entities.length; i++) {
    let _data = Entities[i];
    let _strokeColor =JSON.parse(featureKey.strokeColor) ;
    let _fillColor =JSON.parse(featureKey.fillColor) ;
    let radius = _data.radius ? _data.radius : 10;
    let _entity = _dataSource.entities.add({
      name: 'circle' + _data.id,
      id: 'circle_' +featureKey.layer_name+"_"+ _data.id,
      featureData: _data,
      position: Cesium.Cartesian3.fromDegrees(_data.gpsLongitude, _data.gpsLatitude),
      ellipse: {
        semiMinorAxis: radius,
        semiMajorAxis: radius,
        material: new Cesium.Color.fromBytes(_fillColor[0], _fillColor[1], _fillColor[2], _fillColor[3]),
        outline: true,
        classificationType: Cesium.ClassificationType.BOTH
      }
    });
  }

  var dataSourcePromise = viewer.dataSources.add(_dataSource);
  dataSourcePromise.then(function (dataSource) {
    // alert(dataSource.name);

  });

}

export function addCircleFN(_Entities, _set, _viewer) {
  let _featureKey = {
    layer_name: "",
    type: "",//类型
    titleKey: "",//标题
    strokeWidth: 2,
    strokeColor: "[255, 0, 0, 1.0]",
    fillColor: "[0, 0, 255, 1.0]",
    clusters_enabled: true,//聚合显示
    clusters_color: "#46ff71"//聚合颜色
  };
  for (let k in _featureKey) {
    if (_set[k]) {
      _featureKey[k] = _set[k];
    }
  }
  addCircle(_Entities, _featureKey, _viewer);
}


