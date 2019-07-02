//创建描述位置的对话框
function createDescription(lng, lat, h) {
    let data = {
        position: [lng, lat, h]
    };
    let url = "http://localhost:3000/posts";
    api(url, "post", data);
    let res = api(url, "get", {});
    console.log(res);
    let positions1 = [];
    let positions2 = [];
    for (var i = 0; i < res.length; i++) {

        for (var j = 0; j < res[i].position.length; j++) {
            positions1.push(res[i].position[j]);
        }
        positions2.push(res[i].position[0]);
        positions2.push(res[i].position[1]);
    }
    let _url = "http://localhost:3000/p";
    let _res = api(_url, "post", {
        position1: positions1,
        position2: positions2
})
    ;
    console.log(_res);
}

//经纬度换算
function formatDegree(pValue) {
    var value = Math.abs(pValue);
    var v1 = Math.floor(value);
    var v2 = Math.floor((value - v1) * 60);
    var v3 = Math.round((value - v1) * 3600 % 60);
    return v1 + '°' + v2 + '\'' + v3 + '"';
}

// 经纬度获取
var xyzObj = [];
var handler = null;

export function xyzFN(nm,viewer,scene) {

    if (nm) {
        handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handler.setInputAction(function (e) {
//首先移除之前添加的点
//             viewer.entities.removeAll(PINS[0]);
            for (var i = 0; i < xyzObj.length; i++) {
                viewer.entities.remove(xyzObj[i]);
            }

//获取点击位置笛卡尔坐标
            var position = scene.pickPosition(e.position);
            console.log(position);

//将笛卡尔坐标转化为经纬度坐标
            var cartographic = Cesium.Cartographic.fromCartesian(position);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            var height = cartographic.height;
            if (height < 0) {
                height = 0;
            }

//坐标信息显示
            var xyzShow = viewer.entities.add({
                position: position,
                label: {
                    text: '经度：' + formatDegree(longitude) + ',纬度：' + formatDegree(latitude) + ',高度：' + height.toFixed(0) + 'm',
                    pixelOffset: new Cesium.Cartesian2(0, -60), // default: (0, 0)
                    fillColor: Cesium.Color.LIME,
                    font: "18pt Lucida Console",
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 1,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE
                }
            });

            xyzObj.push(xyzShow);

            // viewer.selectedEntity = null;


//在点击位置添加对应点
            var pi = viewer.entities.add(new Cesium.Entity({
                point: new Cesium.PointGraphics({
                    color: new Cesium.Color(1, 1, 0),
                    pixelSize: 10,
                    outlineColor: new Cesium.Color(0, 1, 1)
                }),
                position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height + 0.5),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }));

            xyzObj.push(pi);
            // createDescription(longitude, latitude, height);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    } else {
        for (var i = 0; i < xyzObj.length; i++) {
            viewer.entities.remove(xyzObj[i]);
        }
        handler.destroy();
    }

    console.log(handler.isDestroyed());

}

// 经纬度获取end
