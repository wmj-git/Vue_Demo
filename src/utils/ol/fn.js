

export function createQeomStyle(_feature, _style) {

  let Style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      width: _style.strokeWidth,
      color: _style.strokeColor
    }),
    fill: new ol.style.Fill({
      color: _style.fillColor
    }),
    text: new ol.style.Text({
      text: _feature[_style.titleKey] ? _feature[_style.titleKey] + "" : "",
      offsetX: 12,
      offsetY: -8,
      fill: new ol.style.Fill({
        color: '#fff'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.6)',
        width: 4
      }),
    })
  });

  return Style;
}

export function layerFN(_features, _Key, _geomStyle) {

  /* _features=[{
             id:"",
             lng:"",
             lat:"",
             radius:50,
             coordinates:[[104,22],[122,12]]

             ...
    }]*/


  let features = [];
  let source = null;
  let layer = null;

  let _geomKey = {
    type: "",//类型
    titleKey: "id",//标题
    strokeWidth: 2,
    strokeColor: [255, 0, 0, 1.0],
    fillColor: [0, 0, 255, 1.0]
  };
  for (let k in _geomKey) {
    if (_geomStyle[k]) {
      _geomKey[k] = _geomStyle[k];
    }
  }

  let _featureKey = {
    type: "typeName",//类型
    geomType: "Point"//几何对象类型
  };
  for (let k in _featureKey) {
    if (_Key[k]) {
      _featureKey[k] = _Key[k];
    }
  }
  source = new ol.source.Vector({
    wrapX: false
  });

  for (let i = 0; i < _features.length; ++i) {

    if (_featureKey.geomType === "Point") {
      let coordinates = [_features[i].lng, _features[i].lat];
      features[i] = new ol.Feature({
        geometry: new ol.geom.Point(coordinates),
        featureData: _features[i]
      });
      features[i].setStyle(createQeomStyle(_features[i], _geomKey));
    } else if (_featureKey.geomType === "LineString") {
      let coordinates = _features[i].coordinates ? _features[i].coordinates : [];
      features[i] = new ol.Feature({
        geometry: new ol.geom.LineString(coordinates),
        featureData: _features[i]
      });
      features[i].setStyle(createQeomStyle(_features[i], _geomKey));
    } else if (_featureKey.geomType === "Circle") {
      let coordinates = [_features[i].lng, _features[i].lat];
      let radius = _features[i].radius ? _features[i].radius : 100;
      let circleIn3857 = new ol.geom.Circle(ol.proj.transform(coordinates, 'EPSG:4326', 'EPSG:3857'), radius, 'XY');
      let circleIn4326 = circleIn3857.transform('EPSG:3857', 'EPSG:4326');

      features[i] = new ol.Feature({
        geometry: circleIn4326,
        featureData: _features[i]
      });
      features[i].setStyle(createQeomStyle(_features[i], _geomKey));
    }

    features[i].setId(_featureKey.type + "_" + _features[i].id);
  }


  source.addFeatures(features);
  layer = new ol.layer.Vector({
    source: source
  });

  return {
    features: features,
    source: source,
    layer: layer
  }
}

export function ClearLayerFN(_map, _layers) {
  console.log(Array.isArray(_layers));
  if (Array.isArray(_layers)) {
    _layers.forEach(function (_layer) {
      _map.removeLayer(_layer);
    });
  }
}

export function clustersFn(_features, _Key, _clusterImgUrl, _distance) {//_features:数据, _Key:属性配置, _clusterImgUrl:聚合图标

  /* _features=[{
            id:"",
            lng:"",
            lat:"",
            _Key.iconUrlKey:"",
            ...
   }]*/

  let _featureKey = {
    type: "typeName",//类型
    titleKey: "id",//标题
    iconUrlKey: "iconUrl"//图标地址
  };
  for (let k in _featureKey) {
    if (_Key[k]) {
      _featureKey[k] = _Key[k];
    }
  }


  let features = [];
  for (let i = 0; i < _features.length; ++i) {
    let coordinates = [_features[i].gpsLongitude, _features[i].gpsLatitude];

    features[i] = new ol.Feature({
      geometry: new ol.geom.Point(coordinates),
      featureData: _features[i]
    });
    features[i].setId(_featureKey.type + "_" + _features[i].id);
  }

  let clusterSource = new ol.source.Cluster({
    distance: _distance,
    source: new ol.source.Vector({
      features: features
    })
  });

  function createEarthquakeStyle(iconFeature) {

    // console.log(iconFeature.get("featureData")[_iconKey]);
    let _data = iconFeature.get("featureData");
    let iconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0, 0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        scale: 0.28,
        src: _data[_featureKey.iconUrlKey] + ""
      })),
      text: new ol.style.Text({
        text: _data[_featureKey.titleKey] + "",
        offsetX: 12,
        offsetY: -8,
        fill: new ol.style.Fill({
          color: '#fff'
        }),
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.6)',
          width: 4
        }),
      })
    });

    return iconStyle;
  }

  let styleCache = {};
  let clusterLayer = new ol.layer.Vector({
    source: clusterSource,
    style: function (feature) {
      var size = feature.get('features').length;
      var style = styleCache[size];
      if (size > 1) {
        if (!style) {
          style = new ol.style.Style({
            image: new ol.style.Icon(({
              anchor: [0.5, 28],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              opacity: 0.8,
              scale: 1.0,
              src: _clusterImgUrl
            })),
            text: new ol.style.Text({
              text: size.toString(),
              fill: new ol.style.Fill({
                color: '#fff'
              })
            })
          });
          styleCache[size] = style;
        }
      } else {
        var originalFeature = feature.get('features')[0];
        // console.log(originalFeature);
        style = createEarthquakeStyle(originalFeature);
      }
      return style;
    }
  });

  return {
    features: features,
    source: clusterSource,
    layer: clusterLayer
  }

}

function xfsContent(_OBJ) {//消防栓信息显示模板
  let obj = null;
  $.each(["exption", "normal", 'offLine', 'repaired'], function (i, n) {
    $.each(appData.sseData[n], function (k, m) {
      if (_OBJ.lng === m.googleLang) {
        obj = m;
        return;
      }
    });
  });
  let _addressDesc = '<li>安装详址：' + (obj.addressDesc || "") + '<\/li>';
  if (obj.addressInfo === obj.addressDesc) {//安装详址是否与地址相同
    _addressDesc = "";
  }

  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size:22px;" >' +
    '<li>编号：' + (obj.id || "无") + '<\/li>' +
    // '<li>名   称：' + (obj.hydrantCode || "无") + '<\/li>' +
    '<li>规格型号：' + 'DN65*2,' + obj.hydrantTypeCanme + '<\/li>' +
    '<li>安装位置：' + obj.addressInfo + '<\/li>' +
    _addressDesc +
    '<li>设备状态：' + obj.hydrantAvailableStateCanme + '<\/li>' +
    '<li>上传时间：' + (obj.collTime || "") + '<\/li>' +
    '<li>所属中队：' + (obj.squadronCname || "") + '<\/li>' +
    '<li>管理单位：' + (obj.wwCname || "") + '<\/li>' +
    '<li>联系电话：' + (obj.phoneNumber || "") + '<\/li>' +
    '<li>所属区段：' + (obj.areaCname || "") + '<\/li>' +
    '<\/ul>' +
    '<ul type="none" style="margin: 0px;padding:0 0 0 18px;font-size:22px;" class="list_style_main">' +
    '<li>' +
    '<label>水   压：<\/label>' +
    '<input type="text" disabled value=' + (obj.preValue ? obj.preValue + "MPa" : "0") + '>' +
    '<\/li>' +
    '<li>' +
    '<label>流   量：<\/label>' +
    '<input type="text" disabled value=' + (obj.totalFlow ? obj.totalFlow + "m³" : "0") + '>' +
    '<\/li>' +
    '<li>' +
    '<label>开   度：<\/label>' +
    '<input type="text" disabled value=' + (obj.openAngle ? obj.openAngle + "" : "0") + '>' +
    '<\/li>' +
    '<li>' +
    '<label>电   压：<\/label>' +
    '<input type="text" disabled value=' + (obj.currentVoltage ? obj.currentVoltage + "V" : "0") + '>' +
    '<\/li>' +
    '<\/ul>';

  return _content;
}

function personContent(_OBJ) {//消防栓信息显示模板

  let _data = _OBJ.content;

  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size: 22px">' +
    '<li>姓   名：' + _data.name + '<\/li>' +
    '<li>单   位：' + _data.dept + '<\/li>' +
    '<li>电   话：' + _data.PhoneNumber + '<\/li>' +
    '<li>位   置：' + _data.address + '<\/li>' +
    '<\/ul>';

  return _content;
}

function fireDispatchFn() {
  Event.trigger('onClickCell', {
    id: "fireAlarmRecord_panel_1_table",
    tableId: "fireAlarmRecord_panel_1_table",
    field: "dispatchBtn",
    row: appData.map.fireObj,
    halign: "center",
    align: "left"
  });
}

function fireCloseFn() {
  Event.trigger('onClickCell', {
    id: "fireAlarmRecord_panel_1_table",
    tableId: "fireAlarmRecord_panel_1_table",
    field: "closeBtn",
    row: appData.map.fireObj,
    halign: "center",
    align: "left"
  });
}

function fireContent(_OBJ) {//火警信息显示模板

  let _data = _OBJ.content;

  let _content = '<ul type="none" style="margin: 0px;padding:0px;font-size:22px;">' +
    '<li>报警时间：' + (_data.alarmTimeStr || "无") + '<\/li>' +
    '<li>报警等级：' + (_data.alarmLevelCname || "无") + '<\/li>' +
    '<li>报警类型：' + (_data.alarmTypeCname || "无") + '<\/li>' +
    '<li>报警位置：' + (_data.alarmAddress || "无") + '<\/li>' +
    '<li>报警描述：' + (_data.alarmDesc || "无") + '<\/li>' +
    '<\/ul>' +
    '<ul type="none" style="margin: 0px;padding:0 0 0 18px;font-size:22px;"  class="list_style_main">' +
    '<li>' +
    '<input type="button"  value=' + "派遣任务" + ' onclick="fireDispatchFn()">' +
    '<\/li>' +
    '<li>' +
    '<input type="button"  value=' + "解除报警" + ' onclick="fireCloseFn()">' +
    '<\/li>' +
    '<\/ul>';

  return _content;
}


function emMap() {
  this.map = null;
  this.view = null;
  // 信息框
  this.Info = null;
  this.InfoOverlay = null;

  // 消防栓
  this.xfsMarker = null;
  this.xfsExptionObj = null;
  this.xfsExptionOverlays = [];

  // 人员
  this.personMarker = null;
  //人员轨迹
  this.personLine = null;

  // 坐标
  this.coordinate_container = null;
  this.coordinate_content = null;
  this.coordinate_closer = null;
  this.coordinate_overlay = null;

  //测量
  this.measureSource = null;
  this.measureVector = null;
  this.helpTooltip_Overlays = [];
  this.measureTooltip_Overlays = [];
  this.sketch = null;
  this.helpTooltipElement = null;
  this.helpTooltip = null;
  this.measureTooltipElement = null;
  this.measureTooltip = null;
  this.continuePolygonMsg = '测量面积';
  this.continueLineMsg = '测量距离';
  this.measure_draw = null;

  // 火警
  this.fireObj = null;
  this.fireOverlays = [];


}

emMap.prototype.init = function (_el, _LngLat, _layers) {

  let _this=this;
  this.view = new ol.View({
    center: _LngLat,
    zoom: 15,
    maxZoom: 19,
    minZoom: 0,
    projection: 'EPSG:4326',
  });
  this.map = new ol.Map({
    target: _el,
    layers: _layers,
    view: this.view
  });

  this.map.on('moveend', function (e) {
    let _map = e.map;
    let _extent = _map.getView().calculateExtent(_map.getSize());
    let _point = ol.extent.getCenter(_extent);
    console.log(_point);
    $.each(appData.gis, function (i, n) {
      n.GisIcon(_point[0], _point[1]);
      n.GisView(_point[0], _point[1]);
    });

    let _zoom = _this.view.getZoom();
    console.log(_zoom);

    if(_this.xfsMarker.source){
      if (_zoom > 17) {
        _this.xfsMarker.source.setDistance(0);
      }else{
        _this.xfsMarker.source.setDistance(50);
      }
    }
  });

  $("body").append(`<div id="em_ol_info" class="em-tooltip em-tooltip-static" style="z-index: 800"></div>`);
  this.Info = document.getElementById('em_ol_info');
  this.InfoOverlay = new ol.Overlay({
    element: this.Info,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [6, -32],
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });
  this.map.addOverlay(this.InfoOverlay);
  this.map.on('pointermove', this.InfoPointermoveFn);
  this.map.on('click', this.InfoClickFn);


  // 测量
  this.measureSource = new ol.source.Vector();
  this.measureVector = new ol.layer.Vector({
    source: this.measureSource,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.4)'
      }),
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33'
        })
      })
    })
  });
  this.map.addLayer(this.measureVector);


};
emMap.prototype.viewFn = function (_num, _center) {
  this.view.animate({
    center: _center,
    zoom: _num,
    duration: 1000
  });
};

emMap.prototype.xfsMarkerFn = function (data) {
  let _this = this;
  let _data = data;
  //创建图片对象
  var icon = "images/hybrant_mark_ok.png";
  var icon1 = "images/hybrant_mark_success1.png";
  var icon2 = "images/hybrant_mark_success2.gif";
  var icon3 = "images/hybrant_mark_success3.png";
  var icon4 = "images/hybrant_mark_success2.png";


  if (this.xfsMarker) {
    this.map.removeLayer(this.xfsMarker.layer);
    this.clearXfsExptionOverlayFn();
  }

  for (var i = 0; i < _data.length; i++) {

    _data[i].lng = _data[i].googleLang;
    _data[i].lat = _data[i].googleLat;

    if (_data[i].hydrantAvailableState === 28) {
      _data[i].iconUrl = icon;

    } else if (_data[i].hydrantAvailableState === 29) {
      _data[i].iconUrl = icon1;

    } else if (_data[i].hydrantAvailableState === 31) {
      _data[i].iconUrl = icon3;

    } else {
      if (_data[i].id <= 465) {
        _data[i].iconUrl = icon2;

        $("body").append(`<img id="xfs${data[i].id}" src="images/hybrant_mark_success2.gif" style="width:28px;height:34px;"/>`);
        let _popup = new ol.Overlay({
          id: "xfs_" + _data[i].id,
          position: [_data[i].lng, _data[i].lat],
          element: document.getElementById('xfs' + data[i].id),
          className: "xfs-overlay"
        });
        _popup.set("overlayData", _data[i]);
        this.xfsExptionOverlays.push(_popup);
        this.map.addOverlay(_popup);
        $(_popup.getElement()).on('click', function () {
          let _data = _popup.get("overlayData");
          // _this.xfsExptionObj = _data;
          _this.infoFn({
            type: "xfs",
            content: _data,
            lng: _data.googleLang,
            lat: _data.googleLat
          });
        }).on("mouseover", function () {
          $(this).css("cursor", 'pointer');
        });

      } else {
        _data[i].iconUrl = icon4;
      }
    }
  }

  this.xfsMarker = clustersFn(_data, {
    type: "xfs",
    titleKey: "id",
    iconUrlKey: "iconUrl"
  }, "images/cluster0.png", 50);
  this.map.addLayer(this.xfsMarker.layer);
};
// 添加人员标注
emMap.prototype.personMarkerFn = function (data) {//添加覆盖物
  let _data = data;
  console.log(_data);

  //创建图片对象
  let _icon = "images/men.png";

  for (let i = 0; i < _data.length; i++) {
    let _coordinate = _data[i].axis;
    _data[i].id = _data[i].modelName;
    _data[i].lng = _coordinate[0];
    _data[i].lat = _coordinate[1];
    _data[i].iconUrl = _icon;

  }
  if (this.personMarker) {
    this.map.removeLayer(this.personMarker.layer);
  }
  this.personMarker = clustersFn(_data, {
    type: "person",
    titleKey: "name",
    iconUrlKey: "iconUrl"
  }, "images/men.png", 0);
  this.map.addLayer(this.personMarker.layer);

};
//添加人员轨迹
emMap.prototype.personLineFn = function (data) {//添加覆盖物
  let _data = data;
  console.log(_data);
  if (data.length <= 0) {
    return
  }
  let _feature = {
    id: "",
    coordinates: []
  };
  let _coordinates = [];
  for (let i = 0; i < _data.length; i++) {
    _coordinates.push([_data[i].googleLang, _data[i].googleLat]);
  }
  _feature.id = _data[0].time;
  _feature.accountNo = _data[0].accountNo;
  _feature.coordinates = _coordinates;

  if (this.personLine) {
    this.map.removeLayer(this.personLine.layer);
  }
  this.personLine = layerFN([_feature], {
    type: "line",
    geomType: "LineString"
  }, {
    titleKey: "accountNo",//标题
    strokeWidth: 2,
    strokeColor: [0, 255, 0, 1.0],
    fillColor: [0, 0, 255, 1.0]
  });
  this.map.addLayer(this.personLine.layer);
};
//范围查询功能
emMap.prototype.scopeFn = function (data) {//添加覆盖物

  let _data = data;
  console.log(_data);
  if (data.length <= 0) {
    return
  }
  let _features = [];
  let _feature = {
    id: "1",
    lng: 0,
    lat: 0,
    radius: 0
  };

  _data.forEach(function (_obj) {
    for (let _k in _feature) {
      _feature[_k] = _obj[_k];
    }
    _features.push(_feature);
  });

  if (this.scope) {
    this.map.removeLayer(this.scope.layer);

  }
  this.scope = layerFN(_features, {
    type: "scope",
    geomType: "Circle"
  }, {
    titleKey: "name",//标题
    strokeWidth: 2,
    strokeColor: [0, 255, 0, 1.0],
    fillColor: [0, 0, 255, 0.4]
  });
  this.map.addLayer(this.scope.layer);
};

function scopeClick(evt) {
  let coordinate = evt.coordinate;
  console.log(coordinate);
  appData.map.scopeFn([{
    id: "1",
    lng: coordinate[0],
    lat: coordinate[1],
    radius: 100
  }]);
  appData.map.map.un('click', scopeClick);
}

emMap.prototype.scopeToolFn = function () {//添加覆盖物
  let _this = this;
  if (_this.scope) {
    _this.map.removeLayer(_this.scope.layer);
  }
  _this.map.on('click', scopeClick);
};


emMap.prototype.MarkerClearFn = function (_layer) {
  if (_layer) {
    this.map.removeLayer(_layer);
  }
};
// display popup on click
emMap.prototype.InfoClickFn = function (evt) {
  let _this = null;
  let _Info = null;
  if (appData.map) {
    _Info = appData.map.Info;
    _this = appData.map;
  } else {
    return
  }

  let feature = evt.map.forEachFeatureAtPixel(evt.pixel,
    function (feature) {
      return feature;
    });
  if (feature) {
    console.log(feature);

    if (feature.get('features') && feature.get('features').length === 1) {
      let _feature = feature.get('features')[0];
      let _type = _feature.getId().split("_");
      _this.infoFn({
        type: _type[0],
        content: _feature.get("featureData"),
        lng: _feature.get("featureData").lng,
        lat: _feature.get("featureData").lat
      });
    } else if (feature.get("featureData")) {
      let _type = feature.getId().split("_");
      _this.infoFn({
        type: _type[0],
        content: feature.get("featureData"),
        lng: feature.get("featureData").lng,
        lat: feature.get("featureData").lat
      });
    } else {
      return
    }


  } else {
    $(_Info).hide();
  }
};
// change mouse cursor when over marker
emMap.prototype.InfoPointermoveFn = function (e) {
  if (e.dragging) {
    $(this.Info).hide();
    return;
  }
  let pixel = e.map.getEventPixel(e.originalEvent);
  let hit = e.map.hasFeatureAtPixel(pixel);
  $("#cesiumContainer").css("cursor", hit ? 'pointer' : '');

};
emMap.prototype.infoFn = function (OBJ) {

  /*OBJ={
      type: "info",
      content: data,
      lng: data.googleLang,
      lat: data.googleLat
  }*/

  let _content;
  if (OBJ.type && OBJ.type === "info") {
    _content = '<span style="color: white">' + OBJ.content + '<\/span>';
  } else if (OBJ.type && OBJ.type === "xfs") {
    _content = xfsContent(OBJ);
  } else if (OBJ.type && OBJ.type === "fire") {
    _content = fireContent(OBJ);
  } else if (OBJ.type && OBJ.type === "person") {
    _content = personContent(OBJ);
  } else {
    return
  }

  $(this.Info).html(_content);
  $(this.Info).show();
  this.InfoOverlay.setPosition([OBJ.lng, OBJ.lat]);
};

emMap.prototype.coordinateLisen = function (evt) {
  let _coordinateContent = null;
  let _coordinateOverlay = null;
  if (appData.map) {
    _coordinateContent = appData.map.coordinate_content;
    _coordinateOverlay = appData.map.coordinate_overlay;
  } else {
    return
  }

  let coordinate = evt.coordinate;
  let hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));
  _coordinateContent.innerHTML = '经：<code>' + formatDegree(coordinate[0]) + '</code>,<br>纬：<code>' + formatDegree(coordinate[1]) + '</code>';
  console.log(coordinate);
  _coordinateOverlay.setPosition(coordinate);
};
emMap.prototype.coordinateOnFn = function () {
  let _this = this;

  $("body").append(`
        <div id="coordinate" class="ol-popup">
            <a href="#" id="coordinate_closer" class="ol-popup-closer"></a>
            <div id="coordinate_content"></div>
        </div>
    `);

  this.coordinate_container = document.getElementById('coordinate');
  this.coordinate_content = document.getElementById('coordinate_content');
  this.coordinate_closer = document.getElementById('coordinate_closer');

  this.coordinate_overlay = new ol.Overlay({
    element: this.coordinate_container,
    autoPan: true,
    autoPanAnimation: {
      duration: 100
    }
  });

  this.coordinate_closer.onclick = function () {
    _this.coordinate_overlay.setPosition(undefined);
    _this.coordinate_closer.blur();
    return false;
  };
  this.map.addOverlay(this.coordinate_overlay);
  this.map.on('singleclick', this.coordinateLisen);

};
emMap.prototype.coordinateOffFn = function () {
  $("#coordinate").remove();
  this.map.removeOverlay(this.coordinate_overlay);
  // ol.Observable.unByKey(_lisen);
  this.map.un('singleclick', this.coordinateLisen);
};


//测量
emMap.prototype.pointerMoveHandler = function (evt) {
  let _helpTooltipElement = null;
  let _helpTooltip = null;
  let _continuePolygonMsg = null;
  let _continueLineMsg = null;

  if (appData.map) {
    _helpTooltipElement = appData.map.helpTooltipElement;
    _helpTooltip = appData.map.helpTooltip;
    _continuePolygonMsg = appData.map.continuePolygonMsg;
    _continueLineMsg = appData.map.continueLineMsg;

  } else {
    return
  }

  if (evt.dragging) {
    return;
  }
  var helpMsg = '点击测量';

  if (this.sketch) {
    var geom = (this.sketch.getGeometry());
    if (geom instanceof ol.geom.Polygon) {
      helpMsg = _continuePolygonMsg;
    } else if (geom instanceof ol.geom.LineString) {
      helpMsg = _continueLineMsg;
    }
  }

  _helpTooltipElement.innerHTML = helpMsg;
  _helpTooltip.setPosition(evt.coordinate);

  _helpTooltipElement.classList.remove('hidden');
};
emMap.prototype.formatLength = function (line) {
  let length = ol.sphere.getLength(line, {
    projection: 'EPSG:4326'
  });
  let output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) +
      ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100) +
      ' ' + 'm';
  }
  return output;
};
emMap.prototype.formatArea = function (polygon) {
  let area = ol.sphere.getArea(polygon, {
    projection: 'EPSG:4326'
  });
  let output;
  if (area > 10000) {
    output = (Math.round(area / 1000000 * 100) / 100) +
      ' ' + 'km<sup>2</sup>';
  } else {
    output = (Math.round(area * 100) / 100) +
      ' ' + 'm<sup>2</sup>';
  }
  return output;
};
emMap.prototype.addInteraction = function (_type) {
  let _this = this;

  let type = (_type == 'area' ? 'Polygon' : 'LineString');
  _this.measure_draw = new ol.interaction.Draw({
    source: _this.measureSource,
    type: type,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.4)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 6,
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.8)'
        })
      })
    })
  });
  this.map.addInteraction(_this.measure_draw);

  this.createMeasureTooltip();
  this.createHelpTooltip();

  let listener;
  _this.measure_draw.on('drawstart', function (evt) {
    // set sketch
    _this.sketch = evt.feature;

    var tooltipCoord = evt.coordinate;

    listener = _this.sketch.getGeometry().on('change', function (evt) {
      var geom = evt.target;
      var output;
      if (geom instanceof ol.geom.Polygon) {
        output = _this.formatArea(geom);
        tooltipCoord = geom.getInteriorPoint().getCoordinates();
      } else if (geom instanceof ol.geom.LineString) {
        output = _this.formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();
      }
      _this.measureTooltipElement.innerHTML = output;
      _this.measureTooltip.setPosition(tooltipCoord);
    });
  }, this);

  _this.measure_draw.on('drawend', function () {
    _this.measureTooltipElement.className = 'emMeasure-tooltip emMeasure-tooltip-static';
    _this.measureTooltip.setOffset([0, -7]);
    // unset sketch
    _this.sketch = null;
    // unset tooltip so that a new one can be created
    _this.measureTooltipElement = null;
    _this.createMeasureTooltip();
    ol.Observable.unByKey(listener);
  }, this);
};
emMap.prototype.createHelpTooltip = function () {
  let _this = this;
  if (this.helpTooltipElement) {
    this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
  }
  this.helpTooltipElement = document.createElement('div');
  this.helpTooltipElement.className = 'emMeasure-tooltip hidden';
  this.helpTooltip = new ol.Overlay({
    element: _this.helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left'
  });
  this.helpTooltip_Overlays.push(this.helpTooltip);
  this.map.addOverlay(this.helpTooltip);
};
emMap.prototype.createMeasureTooltip = function () {
  let _this = this;
  if (this.measureTooltipElement) {
    this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
  }
  this.measureTooltipElement = document.createElement('div');
  this.measureTooltipElement.className = 'emMeasure-tooltip emMeasure-tooltip-measure';
  this.measureTooltip = new ol.Overlay({
    element: _this.measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  this.measureTooltip_Overlays.push(this.measureTooltip);
  this.map.addOverlay(this.measureTooltip);
};
emMap.prototype.measureOn = function (_type) {
  this.map.on('pointermove', this.pointerMoveHandler);
  this.map.removeInteraction(this.measure_draw);
  this.addInteraction(_type);
};
emMap.prototype.measureOff = function () {
  let _this = this;
  this.helpTooltip_Overlays.forEach(function (_obj) {
    _this.map.removeOverlay(_obj);
  });
  this.helpTooltip_Overlays = [];
  this.map.un('pointermove', this.pointerMoveHandler);
  this.map.removeInteraction(this.measure_draw);
};
emMap.prototype.measureClear = function () {
  let _this = this;
  this.measureTooltip_Overlays.forEach(function (_obj) {
    _this.map.removeOverlay(_obj);
  });
  this.measureTooltip_Overlays = [];
  this.measureSource.clear();
};

// 添加火警标注
emMap.prototype.addFireFn = function (_icon, _data) {//添加覆盖物
  /* [{
        id:"",
        lng:"",
        lat""
   }]*/
  let _this = this;
  for (let i = 0; i < _data.length; i++) {
    $("body").append(`<img id="fire_${_data[i].id}" src="images/fire2d.gif" style="width:48px;height:58px;"/>`);
    let _el = document.getElementById("fire_" + _data[i].id);
    let _popup = new ol.Overlay({
      id: "fire_" + _data[i].id,
      position: [_data[i].lng, _data[i].lat],
      offset: [-10, -32],
      element: _el,
      className: "fire-overlay"
    });
    _popup.set("overlayData", _data[i]);
    /* _popup.on("change:overlayData", function (e) {
         console.log(123);
         console.log(e.target);
         console.log(e.type);
     });*/
    this.fireOverlays.push(_popup);
    this.map.addOverlay(_popup);
    $(_popup.getElement()).on('click', function () {
      let _data = _popup.get("overlayData");
      _this.fireObj = _data;
      // console.log(_data);
      _this.infoFn({
        type: "fire",
        content: _data,
        lng: _data.googleLang,
        lat: _data.googleLat
      });
    }).on("mouseover", function () {
      $(this).css("cursor", 'pointer');
    });
  }
};
emMap.prototype.clearOverlayFn = function (_overlay) {//删除覆盖物
  if (_overlay && _overlay.length > 0) {
    for (let i = 0; i < _overlay.length; i++) {
      this.map.removeOverlay(_overlay[i]);
    }
    this.fireOverlays = [];
  }
};
emMap.prototype.clearXfsExptionOverlayFn = function () {//删除覆盖物
  let _overlays = this.xfsExptionOverlays;
  if (_overlays && _overlays.length > 0) {
    for (let i = 0; i < _overlays.length; i++) {
      this.map.removeOverlay(_overlays[i]);
    }
    this.xfsExptionOverlays = [];
  }
};
