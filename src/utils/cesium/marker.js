var _dataSource = new Cesium.CustomDataSource('markerData');

function addMarker(Entities, viewer) {
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
      position: Cesium.Cartesian3.fromDegrees(Entities[i].position[0], Entities[i].position[1], Entities[i].position[2]),
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
      position: Cesium.Cartesian3.fromDegrees(Entities[i].position[0], Entities[i].position[1]),
      ellipse: {
        semiMinorAxis: 0.5,
        semiMajorAxis: 0.5,
        material: Entities[i].image,
        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
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
            cluster.billboard.image = pin50;
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

  let _Entities = [
    {
      "position": [
        106.2932697824955,
        30.02273793031921,
        24.383082368235286
      ],
      "id": 1
    },
    {
      "position": [
        106.2931895268016,
        30.02275619057545,
        25.735578698598523
      ],
      "id": 2
    },
    {
      "position": [
        106.29314311472511,
        30.022715132174884,
        26.061277744162968
      ],
      "id": 3
    },
    {
      "position": [
        106.29311252570369,
        30.022699557789853,
        28.94964472667028
      ],
      "id": 4
    },
    {
      "position": [
        106.29307670432215,
        30.022634192815808,
        26.563525391393735
      ],
      "id": 5
    }
  ];
  let _image = "../../static/image/marker_red.png";
  if ( Entities instanceof Array) {
    _Entities=Entities;
    _image=img;
  }else {
    return
  }


  for (var i = 0; i < _Entities.length; i++) {
    Entities[i].image = _image;
  }
  addMarker(_Entities, viewer);
}

export function markerClear() {
  _dataSource.entities.removeAll();
}
