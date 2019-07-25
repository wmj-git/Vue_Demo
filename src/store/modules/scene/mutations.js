import {SET_TYPE,SET_TOOLBAR} from "../../mutation-types";

export default {

    [SET_TYPE](state, type) {
        state.type = type;
    },
    [SET_TOOLBAR](state, toolbar) {
        state.toolbar = toolbar;
    }
};
