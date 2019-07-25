//data
import {db} from "./data/db"
import layers from "./baseMap"
import {emMap,clustersFn,clustersLayerFn} from "./fn"

function openScene(_name) {

    if(!(window[_name])){
        window[_name]=new emMap();
    }
    return {
        mapName:_name
    }

}


export default {
    db,
    openScene,
    layers,
    clustersFn,
    clustersLayerFn
}
