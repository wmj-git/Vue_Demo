import {SET_TYPE, SET_TOOLBAR,SET_LAYERDATA, SET_DRAWER} from "../../mutation-types";

export default {

  [SET_TYPE](state, type) {
    state.type = type;
  },
  [SET_TOOLBAR](state, toolbar) {
    state.toolbar = toolbar;
  },
  [SET_LAYERDATA](state, layerData) {
    state.layerData = layerData;
  },
  [SET_DRAWER](state, drawer) {
    state.drawer = drawer;
  }
};
