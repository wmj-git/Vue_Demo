var polygonEntities = [];

function addPolygon(Entities, viewer) {
  /*Entities:[
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
  ]*/

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

export function addPolygonFN(viewer) {
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
}



