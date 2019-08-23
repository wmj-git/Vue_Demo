function addLine(Entities, featureKey, viewer) {

  let _dataSource = new Cesium.CustomDataSource(featureKey.layer_name);


  for (let i = 0; i < Entities.length; i++) {
    let _data = Entities[i];
    let _strokeColor =JSON.parse(featureKey.strokeColor) ;
    let _fillColor =JSON.parse(featureKey.fillColor) ;

    let _entity = _dataSource.entities.add({
      name: 'line' + _data.id,
      id: 'line_' +featureKey.layer_name+"_"+ _data.id,
      featureData: _data,
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray(_data.coordinates),
        width: 8,
        material: new Cesium.PolylineOutlineMaterialProperty({
          color: new Cesium.Color.fromBytes(_fillColor[0], _fillColor[1], _fillColor[2], _fillColor[3]),
          outlineWidth: featureKey.strokeWidth,
          outlineColor: new Cesium.Color.fromBytes(_strokeColor[0], _strokeColor[1], _strokeColor[2], _strokeColor[3])
        }),
        clampToGround: true,
        classificationType: Cesium.ClassificationType.BOTH,
        minimumPixelSize: 20,
        maximumScale: 40
      }
    });
  }

  var dataSourcePromise = viewer.dataSources.add(_dataSource);
  dataSourcePromise.then(function (dataSource) {
    // alert(dataSource.name);
    var pixelRange = 15;
    var minimumClusterSize = 3;
    var enabled = featureKey.clusters_enabled;
    if (enabled === "false") {
      enabled = false;
    } else {
      enabled = true;
    }
    console.log(featureKey);
    dataSource.clustering.enabled = enabled;
    dataSource.clustering.pixelRange = pixelRange;
    dataSource.clustering.minimumClusterSize = minimumClusterSize;

    var removeListener;

    var pinBuilder = new Cesium.PinBuilder();

    var singleDigitPins = new Array(8);
    for (var i = 0; i < singleDigitPins.length; ++i) {
      singleDigitPins[i] = pinBuilder.fromText('' + (i + 2), Cesium.Color.fromCssColorString(featureKey.clusters_color), 48).toDataURL();
    }

    function customStyle() {
      if (Cesium.defined(removeListener)) {
        removeListener();
        removeListener = undefined;
      } else {
        removeListener = dataSource.clustering.clusterEvent.addEventListener(function (clusteredEntities, cluster) {
          cluster.label.show = false;
          cluster.billboard.show = true;
          cluster.billboard.id = cluster.label.id;
          cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
          cluster.billboard.image = pinBuilder.fromText(clusteredEntities.length + '', Cesium.Color.fromCssColorString(featureKey.clusters_color), 48).toDataURL();

        });
      }

      // force a re-cluster with the new styling
      var pixelRange = dataSource.clustering.pixelRange;
      dataSource.clustering.pixelRange = 0;
      dataSource.clustering.pixelRange = pixelRange;
    }

    // start with custom style
    customStyle();

  });

}

export function addLineFN(_Entities, _set, _viewer) {
  let _featureKey = {
    layer_name: "",
    type: "",//类型
    titleKey: "",//标题
    strokeWidth: 2,
    strokeColor: "[255, 0, 0, 1.0]",
    fillColor: "[0, 0, 255, 255]",
    clusters_enabled: true,//聚合显示
    clusters_color: "#46ff71"//聚合颜色
  };
  for (let k in _featureKey) {
    if (_set[k]) {
      _featureKey[k] = _set[k];
    }
  }
  addLine(_Entities, _featureKey, _viewer);
}


