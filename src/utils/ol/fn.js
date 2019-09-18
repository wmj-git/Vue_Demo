import store from '@/store'
import vueBus from '@/utils/vueBus'
import {contentFN} from '../content'

//经纬度换算
function formatDegree(pValue) {
  var value = Math.abs(pValue);
  var v1 = Math.floor(value);
  var v2 = Math.floor((value - v1) * 60);
  var v3 = Math.round((value - v1) * 3600 % 60);
  return v1 + '°' + v2 + '\'' + v3 + '"';
}


export function createQeomStyle(_feature, _style) {
  let Style = null;
  let _fillColor = JSON.parse(_style.fillColor);
  let _strokeColor = JSON.parse(_style.strokeColor);
  _fillColor[3] = _fillColor[3] / 255;
  _strokeColor[3] = _strokeColor[3] / 255;
  switch (_style.type) {
    case "1":
      Style = new ol.style.Style({
        stroke: new ol.style.Stroke({
          width: _style.strokeWidth,
          color: _strokeColor
        }),
        fill: new ol.style.Fill({
          color: _fillColor,
          // color: 'rgba('+_color[0]+', '+_color[1]+', '+_color[2]+', '+_color[3]+')'
        }),
        text: new ol.style.Text({
          text: _feature[_style.titleKey] ? _feature[_style.titleKey] + "" : "",
          offsetX: 0,
          offsetY: -28,
          fill: new ol.style.Fill({
            color: '#fff'
          }),
          stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 0.6)',
            width: 4
          }),
        })
      });
      break;
    case "2"://text形式
      Style = new ol.style.Style({
        text: new ol.style.Text({
          text: _feature[_style.titleKey] ? _feature[_style.titleKey] + "" : "",
          fill: new ol.style.Fill({
            color: JSON.parse(_style.fillColor)
          }),
          stroke: new ol.style.Stroke({
            color: JSON.parse(_style.strokeColor),
            width: _style.strokeWidth
          }),
        })
      });
      break;

  }
  return Style;
}

//获取时空云数据
export function clustersLayerFn(dataUrl, _Key, _clusterImgUrl, _distance) {//时空云数据
  // let _extent = [113.97796915, 22.608145238000002, 114.04398656100001, 22.704755608];

  let _featureKey = {
    type: "typeName",//类型
    titleKey: "id",//标题
    iconUrl: ""//图标地址
  };
  for (let k in _featureKey) {
    if (_Key[k]) {
      _featureKey[k] = _Key[k];
    }
  }
  let _url = dataUrl ? dataUrl : "";

//读取时空运部件数据=======================================================

  let _data = [];
  let url = _url + '/query/?f=json&' +
    'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
    encodeURIComponent('{"xmin":' + -180 + ',"ymin":' + -90 + ',' +
      '"xmax":' + 180 + ',"ymax":' + 90 +
      ',"spatialReference":{"wkid":4490}}') +
    '&geometryType=esriGeometryEnvelope&inSR=4490&outFields=*' +
    '&outSR=4490';
  $.ajax({
    url: url, async: true, dataType: 'json', success: function (response) {
      console.log("response");
      console.log(response);
      if (response.error) {
        console.log(response.error.message + '\n' +
          response.error.details.join('\n'));
      } else {
        response.features.forEach(function (feature) {
          _data.push(feature);
        });
        console.log(_data);
      }
    }
  });



/*  let urlLayer = _url + '/layers/?f=json';
  let _layers = null;
  let _data = [];
  $.ajax({
    url: urlLayer, async: false, dataType: 'json', success: function (response) {
      console.log("layers");
      console.log(response);
      if (response.error) {
        console.log(response.error.message + '\n' +
          response.error.details.join('\n'));
      } else {
        _layers = response.layers;
      }
    }
  });
  console.log(_layers);

  for (let i = 0; i < _layers.length; i++) {

    let url = _url + '/' + i + '/query/?f=json&' +
      'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
      encodeURIComponent('{"xmin":' + -180 + ',"ymin":' + -90 + ',' +
        '"xmax":' + 180 + ',"ymax":' + 90 +
        ',"spatialReference":{"wkid":4490}}') +
      '&geometryType=esriGeometryEnvelope&inSR=4490&outFields=*' +
      '&outSR=4490';
    $.ajax({
      url: url, async: true, dataType: 'json', success: function (response) {
        console.log("response");
        console.log(response);
        if (response.error) {
          console.log(response.error.message + '\n' +
            response.error.details.join('\n'));
        } else {
          response.features.forEach(function (feature) {
            _data.push(feature);
          });
          console.log(_data);
        }
      }
    });
  }*/
//=======================================================

  let esrijsonFormat = new ol.format.EsriJSON();
  let vectorSource = new ol.source.Vector({
      /* loader: function (extent, resolution, projection) {

         var urlLayer = _url + '/layers/?f=json';
         if (vectorSource.getFeatures().length > 0) {
           vectorSource.clear();
           console.log(vectorSource.getFeatures().length);
           return
         }

         let _layers = null;
         let _data = [];
         console.log(_url);
         $.ajax({
           url: urlLayer, async: false, dataType: 'json', success: function (response) {
             console.log("layers");
             console.log(response);
             if (response.error) {
               console.log(response.error.message + '\n' +
                 response.error.details.join('\n'));
             } else {
               _layers = response.layers;
             }
           }
         });
         console.log(_layers);

         for(let i=0;i<_layers.length;i++){

           let url = _url + '/'+i+'/query/?f=json&' +
             'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
             encodeURIComponent('{"xmin":' + -180 + ',"ymin":' + -90 + ',' +
               '"xmax":' + 180 + ',"ymax":' + 90 +
               ',"spatialReference":{"wkid":4490}}') +
             '&geometryType=esriGeometryEnvelope&inSR=4490&outFields=*' +
             '&outSR=4490';
           $.ajax({
             url: url, async: true, dataType: 'json', success: function (response) {
               console.log("response");
               console.log(response);
               if (response.error) {
                 console.log(response.error.message + '\n' +
                   response.error.details.join('\n'));
               } else {
                 // dataProjection will be read from document
                 var features = esrijsonFormat.readFeatures(response, {
                   featureProjection: projection
                 });
                 console.log(projection);
                 console.log(features);
                 if (features.length > 0) {
                   console.log("features2");
                   _data.push(features);
                   vectorSource.addFeatures(features);
                 }
                 console.log(_data);
                 /!*if (features.length > 0) {
                   let _DATA = [];
                   features.forEach(function (feature) {
                     feature.setId(_featureKey.type + "_" + feature.get(_featureKey.titleKey));
                     let _keys = feature.getKeys();
                     let _featureData = {};
                     _keys.forEach(function (_key) {

                       if (_key === "geometry") {

                       } else {
                         _featureData[_key] = feature.get(_key);
                       }
                     });
                     _featureData["coordinates"] = feature.get("geometry").getCoordinates();
                     feature.set("featureData", _featureData);
                     _DATA.push(_featureData);
                   });
                   console.log("features2");
                   // console.log(features);
                   console.log(_DATA);
                   vectorSource.addFeatures(features);

                 }*!/
               }
             }
           });
         }

       },*/
    /* strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
       tileSize: 512
     })),*/
    wrapX: false
  });


  let clusterSource = new ol.source.Cluster({
    distance: _distance,
    source: vectorSource
  });

  function createEarthquakeStyle(iconFeature) {

    // console.log(iconFeature.getKeys());


    let _data = iconFeature.get(_featureKey.titleKey);

    let iconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0, 0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        scale: 0.4,
        src: _featureKey.iconUrl + ""
      })),
      text: new ol.style.Text({
        text: _data + "",
        // text:  "123",
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
  let layer = new ol.layer.Vector({
    name: _featureKey.type + "_layer",
    layer_type: "Cluster",
    source: clusterSource,
    style: function (feature) {
      var size = feature.get('features').length;
      // console.log(feature.get('features'));
      var style = styleCache[size];
      if (size > 1) {
        if (!style) {
          style = new ol.style.Style({
            image: new ol.style.Icon(({
              anchor: [0.5, 28],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              opacity: 0.8,
              scale: 1.28,
              color: _clusterImgUrl,
              src: "../../static/image/cluster.png"
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
        style = createEarthquakeStyle(originalFeature);
      }
      return style;
    }
  });

  return {
    layer, vectorSource, clusterSource
  }
}

//几何类型没有聚合的数据图层
export function layerFN(_features, _Key, _geomStyle) {

  let features = [];
  let source = null;
  let layer = null;

  let _featureKey = {
    type: "layerName",//类型
    geomType: "Point",//几何对象类型
  };
  for (let k in _featureKey) {
    if (_Key[k]) {
      _featureKey[k] = _Key[k];
    }
  }

  let _geomKey = {
    type: "",//样式类型
    titleKey: "id",//标题
    strokeWidth: 2,
    strokeColor: "[255, 0, 0, 1.0]",
    fillColor: "[0, 0, 255, 1.0]"
  };
  for (let k in _geomKey) {
    if (_geomStyle[k]) {
      _geomKey[k] = _geomStyle[k];
    }
  }


  source = new ol.source.Vector({
    wrapX: false
  });


  console.log(_features);
  for (let i = 0; i < _features.length; ++i) {

    if (_featureKey.geomType === "point") {//点
      let coordinates = [_features[i].gpsLongitude, _features[i].gpsLatitude];
      features[i] = new ol.Feature({
        geometry: new ol.geom.Point(coordinates),
        featureData: _features[i]
      });
    } else if (_featureKey.geomType === "text") {//文本
      let coordinates = [_features[i].gpsLongitude, _features[i].gpsLatitude];
      features[i] = new ol.Feature({
        geometry: new ol.geom.Point(coordinates),
        featureData: _features[i]
      });
      features[i].setStyle(createQeomStyle(_features[i], _geomKey));
    } else if (_featureKey.geomType === "line") {//线

      let coordinates = _features[i].coordinates ? _features[i].coordinates : [];
      features[i] = new ol.Feature({
        geometry: new ol.geom.LineString(coordinates),
        featureData: _features[i]
      });
      features[i].setStyle(createQeomStyle(_features[i], _geomKey));
    } else if (_featureKey.geomType === "polygon") {//多边形
      let coordinates = _features[i].coordinates ? _features[i].coordinates : [];
      features[i] = new ol.Feature({
        geometry: new ol.geom.Polygon(coordinates),
        featureData: _features[i]
      });
      features[i].setStyle(createQeomStyle(_features[i], _geomKey));
    } else if (_featureKey.geomType === "circle") {//圆
      let coordinates = [_features[i].gpsLongitude, _features[i].gpsLatitude];
      let radius = _features[i].radius ? _features[i].radius : 10;
      let circleIn3857 = new ol.geom.Circle(ol.proj.transform(coordinates, 'EPSG:4326', 'EPSG:3857'), radius, 'XY');
      let circleIn4326 = circleIn3857.transform('EPSG:3857', 'EPSG:4326');

      features[i] = new ol.Feature({
        geometry: circleIn4326,
        featureData: _features[i]
      });

      features[i].setStyle(createQeomStyle(_features[i], _geomKey));
    }

    features[i].setId(_featureKey.geomType + "_" + _featureKey.type + "_" + _features[i].id);
  }


  source.addFeatures(features);
  layer = new ol.layer.Vector({
    name: _featureKey.type + "_layer",
    layer_type: "Layer",
    source: source
  });

  return {
    features: features,
    source: source,
    layer: layer
  }
}


//有聚合的数据图层
export function clustersFn(_features, _Key, _clusterColor, _distance) {//_features:数据, _Key:属性配置, _clusterImgUrl:聚合图标

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
    features[i].setId("marker_" + _featureKey.type + "_" + _features[i].id);
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
        anchor: [32, 62],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        scale: 0.4,
        src: _data[_featureKey.iconUrlKey] + ""
      })),
      text: new ol.style.Text({
        text: _data[_featureKey.titleKey] + "",
        offsetX: 0,
        offsetY: -32,
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
    name: _featureKey.type + "_layer",
    layer_type: "Cluster",
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
              scale: 1.28,
              color: _clusterColor,
              src: "../../static/image/cluster.png"
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
        // clusterSource.setDistance(0);
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


export function emMap(_name) {
  this.el = _name;
  this.resolutions = [//影像图范围
    5.9486525145757E-4, 2.97432625728785E-4,
    1.5228550437313792E-4, 7.614275218656896E-5,
    3.807137609328448E-5, 1.903568804664224E-5,
    9.51784402332112E-6, 4.75892201166056E-6,
    2.37946100583028E-6, 1.18973050291514E-6,
    5.9486525145757E-7, 2.97432625728785E-7];

  this.map = null;
  this.view = null;
  // 信息框
  this.Info = null;
  this.InfoOverlay = null;

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

}

emMap.prototype.init = function (_LngLat, _layers) {

  let _this = this;
  let _resolutions = this.resolutions;
  this.view = new ol.View({
    resolutions: _resolutions,
    center: _LngLat,
    zoom: 1,
    maxZoom: 19,
    minZoom: 0,
    projection: 'EPSG:4326',
  });
  this.map = new ol.Map({
    controls: ol.control.defaults({attribution: false, zoom: false, rotate: true}).extend([
      //new ol.control.LayerSwitcher({ trash: false, extent: true }),
      //new ol.control.ScaleLine(),
      //new ol.control.Zoom({ target: undefined}),
      //new ol.control.Rotate({
      // autoHide: true,
      // label: “N”
      //}),
      //new ol.control.MeasureTool({ sphereradius: 6378137 })
    ]),
    target: _this.el,
    layers: _layers,
    view: _this.view
  });
  this.map.on('moveend', function (e) {
    let _map = e.map;
    let _extent = _map.getView().calculateExtent(_map.getSize());
    let _point = ol.extent.getCenter(_extent);
    // console.log(_point);
    /* $.each(appData.gis, function (i, n) {
       n.GisIcon(_point[0], _point[1]);
       n.GisView(_point[0], _point[1]);
     });*/

    let _zoom = _this.view.getZoom();
    // console.log(_zoom);

    let _layers = _map.getLayers().getArray();
    if (_zoom > 5) {
      _layers.forEach(function (_layer) {
        let _source = _layer.getSource();
        if (_layer.get("layer_type") === "Cluster") {
          _source.setDistance(0);
        }
      });
    } else {
      _layers.forEach(function (_layer) {
        let _source = _layer.getSource();
        if (_layer.get("layer_type") === "Cluster") {
          _source.setDistance(50);
        }
      });
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
      duration: 100
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
  if (_center === "none") {
    this.view.animate({
      zoom: _num,
    });
  } else {
    this.view.animate({
      center: _center,
      zoom: _num,
      duration: 100
    });
  }

};


// display popup on click
emMap.prototype.InfoClickFn = function (evt) {

  let _this = null;
  let _mapNmame = store.getters["scene/type"];
  if (window[_mapNmame]) {
    _this = window[_mapNmame];
  } else {
    return
  }


  let feature = evt.map.forEachFeatureAtPixel(evt.pixel,
    function (feature) {
      return feature;
    });
  if (feature) {
    console.log(feature);
    let _type = null;
    let _featureData = null;
    if (feature.get('features') && feature.get('features').length === 1) {
      let _feature = feature.get('features')[0];
      _type = _feature.getId().split("_");
      _featureData = _feature.get("featureData");
    } else if (feature.get("featureData")) {
      _type = feature.getId().split("_");
      _featureData = feature.get("featureData");
    } else {
      return
    }

    vueBus.$emit("set_drawer", {
      fn: "showFN",
      type: _type[1],
      content: _featureData
    });
  }
};
// change mouse cursor when over marker
emMap.prototype.InfoPointermoveFn = function (evt) {

  let _this = null;
  let _mapNmame = store.getters["scene/type"];
  if (window[_mapNmame]) {
    _this = window[_mapNmame];
  } else {
    return
  }

  let _Info = _this.Info;

  if (evt.dragging) {
    $(_Info).hide();
    return;
  }


  let pixel = evt.map.getEventPixel(evt.originalEvent);
  let hit = evt.map.hasFeatureAtPixel(pixel);
  $("#" + _mapNmame).css("cursor", hit ? 'pointer' : '');


  let feature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  if (feature) {
    let _coordinate = evt.coordinate;

    if (feature.get('features') && feature.get('features').length === 1) {
      let _feature = feature.get('features')[0];
      let _type = _feature.getId().split("_");
      _this.infoFn({
        type: _type[1],
        content: _feature.get("featureData"),
        lng: _coordinate[0],
        lat: _coordinate[1]
      });
    } else if (feature.get("featureData")) {
      let _type = feature.getId().split("_");
      _this.infoFn({
        type: _type[1],
        content: feature.get("featureData"),
        lng: _coordinate[0],
        lat: _coordinate[1]
      });
    } else {
      return;
    }
  } else {
    // $(_Info).hide();
  }

};
emMap.prototype.infoFn = function (OBJ) {
  console.log(OBJ);
  /*OBJ={
      type: "info",
      content: data,
      lng: data.googleLang,
      lat: data.googleLat
  }*/

  let _content = contentFN(OBJ);

  $(this.Info).html(_content);
  $(this.Info).show();
  this.InfoOverlay.setPosition([OBJ.lng, OBJ.lat]);
};


//坐标查询
emMap.prototype.coordinateLisen = function (evt) {

  let _coordinateContent = null;
  let _coordinateOverlay = null;
  let _mapNmame = store.getters["scene/type"];
  console.log(window[_mapNmame]);
  if (window[_mapNmame]) {
    _coordinateContent = window[_mapNmame].coordinate_content;
    _coordinateOverlay = window[_mapNmame].coordinate_overlay;
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


  let _map = null;
  let _mapNmame = store.getters["scene/type"];
  if (window[_mapNmame]) {
    _map = window[_mapNmame];
  } else {
    return
  }


  if (_map) {
    _helpTooltipElement = _map.helpTooltipElement;
    _helpTooltip = _map.helpTooltip;
    _continuePolygonMsg = _map.continuePolygonMsg;
    _continueLineMsg = _map.continueLineMsg;

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
