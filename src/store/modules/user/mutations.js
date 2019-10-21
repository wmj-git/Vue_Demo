import {
  SET_CODE, SET_TOKEN, SET_TOKEN_TIME, SET_REFRESH_TOKEN, SET_INTRODUCTION, SET_PERMISSIONS,
  SET_SETTING, SET_STATUS, SET_NAME, SET_SYSTEMDATA,
  SET_AVATAR, SET_ROLES, SET_WIN, SET_DIALOG, WIN_OPEN, WIN_CLOSE, SET_NAVDATA
} from '../../mutation-types';

export default {

  [SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [SET_TOKEN_TIME]: (state, tokenTime) => {
    state.tokenTime = tokenTime
  },
  [SET_REFRESH_TOKEN]: (state, refreshToken) => {
    state.refreshToken = refreshToken
  },
  [SET_WIN](state, {win}) {
    state.win = [];
    state.win = state.win.concat(win);
  },
  [SET_DIALOG](state, {dialog}) {
    state.dialog = [];
    state.dialog = state.dialog.concat(dialog);
  },
  [SET_NAVDATA](state, {navData}) {
    state.navData = [];
    state.navData = state.navData.concat(navData);
  },
  [WIN_OPEN](state, {win_obj}) {
    let _win = state.win;

    state.win = [];

    for (let i = 0; i < _win.length; i++) {
      if (_win[i].system_id === win_obj.system_id && _win[i].show === false) {
        for (let _k in win_obj) {
          _win[i][_k] = win_obj[_k];
        }
        _win[i].show = true;
      } else if (_win[i].system_id === win_obj.system_id && _win[i].show === true) {
        _win[i].show = false;
      }

      state.win.push(_win[i]);
    }
  },
  [WIN_CLOSE](state, {win_obj}) {

    let _win = state.win;
    state.win = [];
    if (win_obj.system_id === "all") {
      for (let i = 0; i < _win.length; i++) {
        _win[i].show = false;
        state.win.push(_win[i]);
      }
    } else {
      for (let i = 0; i < _win.length; i++) {
        if (_win[i].system_id === win_obj.system_id) {
          _win[i].show = false;
        }
        state.win.push(_win[i]);
      }
    }
  },
  [SET_PERMISSIONS]: (state, permissions) => {
    let _permissions = permissions;
    state.permissions = [];
    state.permissions = state.permissions.concat(_permissions);
  },
  [SET_SYSTEMDATA]: (state, systemData) => {
    let _systemData = systemData;
    state.systemData = [];
    state.systemData = state.systemData.concat(_systemData);
  },


  // 未用
  [SET_CODE]: (state, code) => {
    state.code = code
  },
  [SET_INTRODUCTION]: (state, introduction) => {
    state.introduction = introduction
  },
  [SET_SETTING]: (state, setting) => {
    state.setting = setting
  },
  [SET_STATUS]: (state, status) => {
    state.status = status
  },
  [SET_NAME]: (state, name) => {
    state.name = name
  },
  [SET_AVATAR]: (state, avatar) => {
    state.avatar = avatar
  },
  [SET_ROLES]: (state, roles) => {
    state.roles = roles
  }
};
