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
export function toScene(viewer,tileset) {
  var boundingSphere = tileset.boundingSphere;
  console.log(boundingSphere);
  viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius + 500.0));
  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
}

export function entitiesClear(value,viewer) {
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
