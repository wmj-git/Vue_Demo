//data
import {db} from "./data/db"
import {api, toScene, entitiesClear} from "./utils"
import {addModeFN, modeClear} from "./mode"
import {addPolygonFN} from "./grid"
import {addMarkerFN, markerClear} from "./marker"
import {alphaFN} from "./alpha"
import {xyzFN} from "./xyz"
import {SetMeasure, clearDrawingBoard} from "./measure"
import layers from "./baidu"

function openScene() {

}


export default {
  db: db,
  api: api,
  openScene: openScene,
  toScene: toScene,
  alphaFN: alphaFN,
  xyzFN: xyzFN,
  addModeFN: addModeFN,
  modeClear: modeClear,
  addPolygonFN: addPolygonFN,
  addMarkerFN: addMarkerFN,
  markerClear: markerClear,
  entitiesClear: entitiesClear,
  SetMeasure: SetMeasure,
  clearDrawingBoard: clearDrawingBoard,
  layers:layers
}
