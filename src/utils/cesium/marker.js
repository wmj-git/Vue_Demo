
function addMarker(Entities, featureKey, viewer) {

  var _dataSource = new Cesium.CustomDataSource(featureKey.type);

  for (var i = 0; i < Entities.length; i++) {
    let _data = Entities[i];
    var _entity = _dataSource.entities.add({
      name: '' +_data[featureKey.titleKey],
      id: 'marker_img_' + featureKey.type+"_"+ _data.id,
      featureData: _data,
      // position: Cesium.Cartesian3.fromDegrees(Entities[i].position[0], Entities[i].position[1], Entities[i].position[2]),
      position: Cesium.Cartesian3.fromDegrees(_data.gpsLongitude, _data.gpsLatitude),
      billboard: {
        image: _data[featureKey.iconUrlKey], // default: undefined
        show: true, // default
        pixelOffset: new Cesium.Cartesian2(0, -10), // default: (0, 0)
        eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
        scale: 1.0, // default: 1.0
        color: new Cesium.Color(1.0, 1.0, 1.0, 1.0), // default: WHITE
        // rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
        alignedAxis: Cesium.Cartesian3.ZERO, // default
        width: 20, // default: undefined
        height: 20, // default: undefined
        minimumPixelSize: 100,
        maximumScale: 200
      }
    });
    var _entity1 = _dataSource.entities.add({
      name: '' +_data[featureKey.titleKey],
      id: 'marker_icon_' + featureKey.type+"_"+ _data.id,
      featureData: _data,
      position: Cesium.Cartesian3.fromDegrees(_data.gpsLongitude, _data.gpsLatitude),
      ellipse: {
        semiMinorAxis: 0.5,
        semiMajorAxis: 0.5,
        material: _data[featureKey.iconUrlKey],
        classificationType: Cesium.ClassificationType.BOTH
      }
    });
    var _entity2 = _dataSource.entities.add({
      name: '' +_data[featureKey.titleKey],
      id: 'marker_point_' + featureKey.type+"_"+ _data.id,
      featureData: _data,
      position: Cesium.Cartesian3.fromDegrees(_data.gpsLongitude, _data.gpsLatitude),
      ellipse: {
        semiMinorAxis: 1.2,
        semiMajorAxis: 1.2,
        material: Cesium.Color.RED,
        outline: true,
        classificationType: Cesium.ClassificationType.BOTH
      }
    });
  }

  var dataSourcePromise = viewer.dataSources.add(_dataSource);
  dataSourcePromise.then(function (dataSource) {
    // alert(dataSource.name);
    var pixelRange = 15;
    var minimumClusterSize = 3;
    var enabled = true;

    dataSource.clustering.enabled = enabled;
    dataSource.clustering.pixelRange = pixelRange;
    dataSource.clustering.minimumClusterSize = minimumClusterSize;

    var removeListener;

    var pinBuilder = new Cesium.PinBuilder();
    var pin50 = pinBuilder.fromText('50+', Cesium.Color.fromCssColorString(featureKey.clusters_color), 48).toDataURL();
    var pin40 = pinBuilder.fromText('40+', Cesium.Color.fromCssColorString(featureKey.clusters_color), 48).toDataURL();
    var pin30 = pinBuilder.fromText('30+',Cesium.Color.fromCssColorString(featureKey.clusters_color), 48).toDataURL();
    var pin20 = pinBuilder.fromText('20+', Cesium.Color.fromCssColorString(featureKey.clusters_color), 48).toDataURL();
    var pin10 = pinBuilder.fromText('10+', Cesium.Color.fromCssColorString(featureKey.clusters_color), 48).toDataURL();

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

         /* if (clusteredEntities.length >= 50) {
            cluster.billboard.image = pinBuilder.fromText(clusteredEntities.length + '', Cesium.Color.fromCssColorString(featureKey.clusters_color), 48).toDataURL();
          } else if (clusteredEntities.length >= 40) {
            cluster.billboard.image = pin40;
          } else if (clusteredEntities.length >= 30) {
            cluster.billboard.image = pin30;
          } else if (clusteredEntities.length >= 20) {
            cluster.billboard.image = pin20;
          } else if (clusteredEntities.length >= 10) {
            cluster.billboard.image = pin10;
          } else {
            cluster.billboard.image = singleDigitPins[clusteredEntities.length - 2];
          }*/
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

export function addMarkerFN(_Entities, _set, _viewer) {
  let _featureKey = {
    type: "",//类型
    titleKey: "",//标题
    iconUrlKey: "",//图标地址
    clusters_color: ""//聚合颜色
  };
  for (let k in _featureKey) {
    if (_set[k]) {
      _featureKey[k] = _set[k];
    }
  }
  addMarker(_Entities, _featureKey, _viewer);
}


