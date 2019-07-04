// var d = Cesium.Cartesian3.distance(new Cesium.Cartesian3(1.0, 0.0, 0.0), new Cesium.Cartesian3(2.0, 0.0, 0.0));
var loadedModels = [];

var tempPoints = [];
var tempEntities = [];
var tempPinEntities = [];
var tempPinLon, tempPinLat;

var handler = null;
let viewer=null;



function clearEffects() {
    if (handler != null) {
        handler.destroy();
    }
}

//设置各种操作模式
export function SetMeasure(mode,_viewer,scene) {

     viewer=_viewer;
    if (mode == "drawPloy") {
        tempPoints = [];
        handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handler.setInputAction(function (click) {
            // var cartesian = viewer.camera.pickEllipsoid(click.position, scene.globe.ellipsoid);

            var cartesian = scene.pickPosition(click.position);
            console.log(cartesian);
            if (cartesian) {
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                console.log(cartographic);
                var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                var height = cartographic.height;
                tempPoints.push({lon: longitudeString, lat: latitudeString,height:height});
                var tempLength = tempPoints.length;
                drawPoint(tempPoints[tempPoints.length - 1]);
                if (tempLength > 1) {
                    drawLine(tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1], true);
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        handler.setInputAction(function (click) {
            var cartesian = viewer.camera.pickEllipsoid(click.position, scene.globe.ellipsoid);
            if (cartesian) {
                var tempLength = tempPoints.length;
                if (tempLength < 3) {
                    alert('请选择3个以上的点再执行闭合操作命令');
                } else {
                    drawLine(tempPoints[0], tempPoints[tempPoints.length - 1], true);
                    drawPoly(tempPoints);


                    var ent =
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(((tempPoints[0].lon + (tempPoints[tempPoints.length - 1].lon + tempPoints[tempPoints.length - 2].lon) / 2) / 2),
                                ((tempPoints[0].lat + (tempPoints[tempPoints.length - 1].lat + tempPoints[tempPoints.length - 2].lat) / 2) / 2),tempPoints[tempPoints.length - 2].height),
                            label: {
                                text: SphericalPolygonAreaMeters(tempPoints).toFixed(1) + '㎡',
                                font: '22px Helvetica',
                                fillColor: Cesium.Color.BLACK
                            }
                        });
                    tempEntities.push(ent);
                    tempPoints = [];
                    clearEffects();
                }

            }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    } else if ("drawLine" == mode) {
        tempPoints = [];

        handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handler.setInputAction(function (click) {
            // var cartesian = viewer.camera.pickEllipsoid(click.position, scene.globe.ellipsoid);
            var cartesian = scene.pickPosition(click.position);
            if (cartesian) {
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                var height = cartographic.height;
                tempPoints.push({lon: longitudeString, lat: latitudeString,height:height});
                var tempLength = tempPoints.length;
                drawPoint(tempPoints[tempPoints.length - 1]);
                if (tempLength > 1) {
                    drawLine(tempPoints[tempPoints.length - 2], tempPoints[tempPoints.length - 1], true);
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.setInputAction(function (click) {
            tempPoints = [];
            clearEffects();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
}

function drawPoint(point) {
    var entity =
        viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat,point.height+2),
            label: {
                text: '',
                font: '22px Helvetica'
            },
            point: {
                pixelSize: 10,
                color: Cesium.Color.CHARTREUSE
            },
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        });
    tempEntities.push(entity);
}

function drawLine(point1, point2, showDistance) {
    var entity = viewer.entities.add({
        polyline: {
            positions: [Cesium.Cartesian3.fromDegrees(point1.lon, point1.lat,point1.height+2), Cesium.Cartesian3.fromDegrees(point2.lon, point2.lat,point2.height+2)],
            width: 10.0,
            material: new Cesium.PolylineGlowMaterialProperty({
                color: Cesium.Color.CHARTREUSE.withAlpha(.5)
            }),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
    });
    tempEntities.push(entity);
    if (showDistance) {
        var w = Math.abs(point1.lon - point2.lon);
        var h = Math.abs(point1.lat - point2.lat);
        var offsetV = w >= h ? 0.0005 : 0;
        var offsetH = w < h ? 0.001 : 0;
        var distance = getFlatternDistance(point1.lat, point1.lon, point2.lat, point2.lon);
        entity = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(((point1.lon + point2.lon) / 2) + offsetH,
                ((point1.lat + point2.lat) / 2) + offsetV,point2.height),
            label: {
                text: distance.toFixed(1) + 'm',
                font: '22px Helvetica',
                fillColor: Cesium.Color.WHITE
            },
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        });
        tempEntities.push(entity);
    }
}

function drawPoly(points) {
    var pArray = [];
    for (var i = 0; i < points.length; i++) {
        pArray.push(points[i].lon);
        pArray.push(points[i].lat);
    }
    var entity =
        viewer.entities.add({
            polygon: {
                hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(pArray)),
                material: Cesium.Color.CHARTREUSE.withAlpha(.5),
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                classificationType : Cesium.ClassificationType.CESIUM_3D_TILE
            }
        });
    tempEntities.push(entity);
}

//计算两点间距离
function getFlatternDistance(lat1, lng1, lat2, lng2) {
    var EARTH_RADIUS = 6378137.0;    //单位M
    var PI = Math.PI;

    function getRad(d) {
        return d * PI / 180.0;
    }

    var f = getRad((lat1 + lat2) / 2);
    var g = getRad((lat1 - lat2) / 2);
    var l = getRad((lng1 - lng2) / 2);

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s, c, w, r, d, h1, h2;
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;

    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;

    s = sg * (1 - sl) + (1 - sf) * sl;
    c = (1 - sg) * (1 - sl) + sf * sl;

    w = Math.atan(Math.sqrt(s / c));
    r = Math.sqrt(s * c) / w;
    d = 2 * w * a;
    h1 = (3 * r - 1) / 2 / c;
    h2 = (3 * r + 1) / 2 / s;

    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}

//计算多边形面积
var earthRadiusMeters = 6371000.0;
var radiansPerDegree = Math.PI / 180.0;
var degreesPerRadian = 180.0 / Math.PI;

function SphericalPolygonAreaMeters(points) {
    var totalAngle = 0;
    for (var i = 0; i < points.length; i++) {
        var j = (i + 1) % points.length;
        var k = (i + 2) % points.length;
        totalAngle += Angle(points[i], points[j], points[k]);
    }
    var planarTotalAngle = (points.length - 2) * 180.0;
    var sphericalExcess = totalAngle - planarTotalAngle;
    if (sphericalExcess > 420.0) {
        totalAngle = points.length * 360.0 - totalAngle;
        sphericalExcess = totalAngle - planarTotalAngle;
    } else if (sphericalExcess > 300.0 && sphericalExcess < 420.0) {
        sphericalExcess = Math.abs(360.0 - sphericalExcess);
    }
    return sphericalExcess * radiansPerDegree * earthRadiusMeters * earthRadiusMeters;
}

/*角度*/
function Angle(p1, p2, p3) {
    var bearing21 = Bearing(p2, p1);
    var bearing23 = Bearing(p2, p3);
    var angle = bearing21 - bearing23;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}

/*方向*/
function Bearing(from, to) {
    var lat1 = from.lat * radiansPerDegree;
    var lon1 = from.lon * radiansPerDegree;
    var lat2 = to.lat * radiansPerDegree;
    var lon2 = to.lon * radiansPerDegree;
    var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
    if (angle < 0) {
        angle += Math.PI * 2.0;
    }
    angle = angle * degreesPerRadian;
    return angle;
}

/**
 * 清除地图痕迹
 */
export function clearDrawingBoard(viewer) {
  // viewer.entities.removeAll();
    var primitives = viewer.entities;
    for (let i = 0; i < tempEntities.length; i++) {
        primitives.remove(tempEntities[i]);
    }
    tempEntities = [];
    clearEffects();
}
