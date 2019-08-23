import {SET_TYPE, SET_TOOLBAR, SET_DRAWER} from "../../mutation-types";

export default {

  [SET_TYPE](state, type) {
    state.type = type;
  },
  [SET_TOOLBAR](state, toolbar) {
    state.toolbar = toolbar;
  },
  [SET_DRAWER](state, drawer) {
    state.drawer = drawer;
  }
};
