var polygonEntities = [];

 function addPolygon(Entities,viewer) {
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
        id: 'polygon_'+Entities[i].id + '',
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(Entities[i].DegreesArray)),
          material: Cesium.Color.fromCssColorString(Entities[i].color).withAlpha(Entities[i].alpha),
          // material: 'img/marker_2.png',
          classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
        },
        label: {
          text: 'Philadelphia',
          font: '24px Helvetica',
          show:true,
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
      name:"网格1",
      color: "#4cf02c",//颜色
      alpha: 0.5,//透明
      DegreesArray: [
        106.29282937918697,
        30.022281908661093,
        106.291999480957,
        30.022879352956828,
        106.2920136045095,
        30.023112987439145,
        106.29261456815746,
        30.023051998323616,
        106.29338972669095,
        30.022776696423847]
    },
    {
      id: "grid_2",
      name:"网格2",
      color: "#f06e59",//颜色
      alpha: 0.5,//透明
      DegreesArray: [106.29197302854351,
        30.023209046528144,
        106.29265934910684,
        30.02360085888042,
        106.29284214830184,
        30.02413564738979,
        106.29254324950375,
        30.024189993570058,
        106.29243373537803,
        30.02435817667486,
        106.29237492064723,
        30.024667137146444,
        106.2916454417605,
        30.024551608854356,
        106.2916779045739,
        30.02358918434753,
        106.29188539050014,
        30.023220805658674]
    }
  ];
  addPolygon(Entities,viewer);
}



