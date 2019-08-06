var _ModeDataSource = new Cesium.CustomDataSource('modeData');

function addMode(Entities, viewer) {
  /*Entities:[
      {    id:12,
           name:"",
           mode:"Apps/SampleData/models/CesiumMilkTruck/CesiumMilkTruck.glb",
           position:[106.2918632114032, 30.023059320962865,106.29324606449137]
      }
  ]*/
  _ModeDataSource.entities.removeAll();
  for (var i = 0; i < Entities.length; i++) {
    var position = Cesium.Cartesian3.fromDegrees(Entities[i].position[0], Entities[i].position[1], Entities[i].position[2]);
    var heading = Cesium.Math.toRadians(10);
    var pitch = 0;
    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
    let mode = _ModeDataSource.entities.add({
      name:  Entities[i].name,
      id: 'mode_' + Entities[i].id,
      position: position,
      orientation: orientation,
      model: {
        uri: Entities[i].mode,
        minimumPixelSize: 1,
        maximumScale: 1
      }
      /*,
      label: {
  `    text: 'Philadelphia',
       font: '12px Helvetica',
        pixelOffset: new Cesium.Cartesian2(0, -50),
        fillColor: Cesium.Color.SKYBLUE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 1,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE
      }*/
    });
  }
  var dataSourcePromise = viewer.dataSources.add(_ModeDataSource);
  dataSourcePromise.then(function (dataSource) {
    console.log(dataSource.name);
  });
}

export function addModeFN(viewer) {
  let Entities = [
    {
      id: 123,
      name:"管道",
      mode: "../../static/mode_3d/gd.gltf",
      position: [106.29057012618736,
        30.023299599766734,
        10]
    },
    {
      id: 12,
      name:"路灯",
      mode: "../../static/mode_3d/light.gltf",
      position: [106.29100714056409,
        30.024022718641977,
        34.93395027507901]
    },
    {
      id: 112,
      name:"监测器",
      mode: "../../static/mode_3d/monitor.gltf",
      position: [106.29079752585808 ,30.02358039824531 ,34.93395027507901]
    }
  ];
  addMode(Entities, viewer);
}

export function modeClear() {
  _ModeDataSource.entities.removeAll();
}
