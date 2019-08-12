import store from '@/store'



function addMarker(Entities, viewer) {

  let _this = null;
  let _mapNmame = store.getters["scene/type"];
  if (window[_mapNmame]) {
    _this = window[_mapNmame];
  } else {
    return
  }
  var _dataSource = new Cesium.CustomDataSource('markerData');
  _this.dataSources["markerData"]=_dataSource;
  /*Entities:[
      {    id:12,
           image:"img/marker_red.png",
           position:[106.2918632114032, 30.023059320962865,106.29324606449137]
      }
  ]*/

  for (var i = 0; i < Entities.length; i++) {

    var _entity = _dataSource.entities.add({
      name: 'marker' + Entities[i].id,
      id: 'marker_' + Entities[i].id,
      featureData: Entities[i],
      // position: Cesium.Cartesian3.fromDegrees(Entities[i].position[0], Entities[i].position[1], Entities[i].position[2]),
      position: Cesium.Cartesian3.fromDegrees(Entities[i].position[0], Entities[i].position[1]),
      billboard: {
        image: Entities[i].image, // default: undefined
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
      name: 'marker' + Entities[i].id,
      featureData: Entities[i],
      position: Cesium.Cartesian3.fromDegrees(Entities[i].position[0], Entities[i].position[1]),
      ellipse: {
        semiMinorAxis: 0.5,
        semiMajorAxis: 0.5,
        material: Entities[i].image,
        classificationType: Cesium.ClassificationType.BOTH
      }
    });
    var _entity2 = _dataSource.entities.add({
      name: 'marker_point_' + Entities[i].id,
      featureData: Entities[i],
      position: Cesium.Cartesian3.fromDegrees(Entities[i].position[0], Entities[i].position[1]),
      ellipse: {
        semiMinorAxis: 1.8,
        semiMajorAxis: 1.8,
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
    var pin50 = pinBuilder.fromText('50+', Cesium.Color.RED, 48).toDataURL();
    var pin40 = pinBuilder.fromText('40+', Cesium.Color.ORANGE, 48).toDataURL();
    var pin30 = pinBuilder.fromText('30+', Cesium.Color.YELLOW, 48).toDataURL();
    var pin20 = pinBuilder.fromText('20+', Cesium.Color.GREEN, 48).toDataURL();
    var pin10 = pinBuilder.fromText('10+', Cesium.Color.BLUE, 48).toDataURL();

    var singleDigitPins = new Array(8);
    for (var i = 0; i < singleDigitPins.length; ++i) {
      singleDigitPins[i] = pinBuilder.fromText('' + (i + 2), Cesium.Color.VIOLET, 48).toDataURL();
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

          if (clusteredEntities.length >= 50) {
            cluster.billboard.image = pinBuilder.fromText(clusteredEntities.length + '', Cesium.Color.RED, 48).toDataURL();
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
          }
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

export function addMarkerFN(Entities, img, viewer) {
let _dataSource=null;

  let _Entities = [
    {
      "position": [
        106.2932697824955,
        30.02273793031921,
        24.383082368235286
      ],
      "id": 1
    }
  ];
  let _image = "../../static/image/marker_red.png";
  if (Entities instanceof Array) {
    _Entities = Entities;
    _image = img;
  } else {
    return
  }

  for (var i = 0; i < _Entities.length; i++) {
    Entities[i].image = _image;
  }

  _dataSource=addMarker(_Entities, viewer);

  return _dataSource;
}

export function markerClear() {
  let _this = null;
  let _mapNmame = store.getters["scene/type"];
  if (window[_mapNmame]) {
    _this = window[_mapNmame];
  } else {
    return
  }
  let _dataSource=_this.dataSources["markerData"];
  if(_this.viewer.dataSources.contains(_dataSource)){
    _this.viewer.dataSources.remove(_dataSource);
  }else {

  }
  // _this.viewer.dataSources.removeAll();
}
