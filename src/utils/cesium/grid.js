var polygonEntities = [];

/*
function addPolygon(Entities, viewer) {
  /!*Entities:[
      {   id: "grid_1",
           name:"网格1",
           color:"#4cf02c",//颜色
           alpha:0.5,//透明
           DegreesArray:[
                 106.2918632114032, 30.023059320962865,
                 106.29324606449137, 30.022007827132164,
                 106.2913523065459, 30.021380200455827,
                 106.2901463755924, 30.023047827872077]
      }
  ]*!/

  for (let i = 0; i < Entities.length; i++) {
    let polygon = viewer.entities.add({
      name: Entities[i].name + '',
      id: 'polygon_' + Entities[i].id + '',
      featureData: Entities[i],
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(Entities[i].DegreesArray)),
        material: Cesium.Color.fromCssColorString(Entities[i].color).withAlpha(Entities[i].alpha),
        // material: 'img/marker_2.png',
        classificationType: Cesium.ClassificationType.BOTH
      },
      label: {
        text: 'Philadelphia',
        font: '24px Helvetica',
        show: true,
        pixelOffset: new Cesium.Cartesian2(0, -30),
        fillColor: Cesium.Color.SKYBLUE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 1,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE
      }
    });
    polygonEntities.push(polygon);
  }
}
*/

/*export function addPolygonFN(viewer) {
  let Entities = [
    {
      id: "grid_1",
      name: "网格1",
      color: "#4cf02c",//颜色
      alpha: 0.5,//透明
      DegreesArray: [
        114.04682681351373,
        22.635035622884402,
        114.04704799233183,
        22.634297263060592,
        114.04818422102824,
        22.634969649453275,
        114.04724136922447,
        22.635661923001926
      ]
    },
    {
      id: "grid_2",
      name: "网格2",
      color: "#f06e59",//颜色
      alpha: 0.5,//透明
      DegreesArray: [
        114.05285407838477,
        22.63726858102103,
        114.05274984426649,
        22.635610757222853,
        114.0553999522053,
        22.63450004147433,
        114.05737373760712,
        22.635771992261713,
        114.05425314903218,
        22.63779115291469
      ]
    }
  ];
  addPolygon(Entities, viewer);
}*/
function addPolygon(Entities, featureKey, viewer) {

  var _dataSource = new Cesium.CustomDataSource(featureKey.type);

  for (let i = 0; i < Entities.length; i++) {
    let _data = Entities[i];
    var _entity = _dataSource.entities.add({
      name: 'polygon' +_data.id,
      id: 'polygon_' + _data.id,
      featureData: _data,
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(_data.DegreesArray)),
        material: Cesium.Color.fromCssColorString(_data.color).withAlpha(_data.alpha),
        // material: 'img/marker_2.png',
        classificationType: Cesium.ClassificationType.BOTH
      },
      label: {
        text: 'Philadelphia',
        font: '24px Helvetica',
        show: true,
        pixelOffset: new Cesium.Cartesian2(0, -30),
        fillColor: Cesium.Color.SKYBLUE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 1,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE
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
export function addPolygonFN(_Entities, _set, _viewer) {
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
  addPolygon(_Entities, _featureKey, _viewer);
}





