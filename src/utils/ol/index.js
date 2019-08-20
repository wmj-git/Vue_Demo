//data
import {db} from "./data/db"
import {baseMapFN} from "./baseMap"
import {emMap, clustersFn, clustersLayerFn, layerFN} from "./fn"

function openScene(_name) {

  if (!(window[_name])) {
    window[_name] = new emMap(_name);
  }
  return {
    mapName: _name
  }

}

export default {
  db,
  openScene,
  baseMapFN,
  layerFN,
  clustersFn,
  clustersLayerFn
}
