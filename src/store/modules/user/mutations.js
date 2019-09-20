import {
  SET_CODE, SET_TOKEN, SET_TOKEN_TIME, SET_REFRESH_TOKEN, SET_INTRODUCTION, SET_PERMISSIONS,
  SET_SETTING, SET_STATUS, SET_NAME, SET_SYSTEMDATA,
  SET_AVATAR, SET_ROLES, SET_WIN, WIN_OPEN, WIN_CLOSE
} from '../../mutation-types';

export default {
  [SET_CODE]: (state, code) => {
    state.code = code
  },
  [SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [SET_TOKEN_TIME]: (state, tokenTime) => {
    state.tokenTime = tokenTime
  },
  [SET_REFRESH_TOKEN]: (state, refreshToken) => {
    state.refreshToken = refreshToken
  },
  [SET_INTRODUCTION]: (state, introduction) => {
    state.introduction = introduction
  },
  [SET_SYSTEMDATA]: (state, systemData) => {
    state.systemData = systemData
  },
  [SET_WIN](state, {win}) {
    state.win = win;
  },
  [WIN_OPEN](state, {win_obj}) {
    // state.win.push({"system_id": win_obj.system_id, "show": false});
    let _win = state.win;
    state.win = [];
    for (let i = 0; i < _win.length; i++) {
      if (_win[i].system_id === win_obj.system_id && _win[i].show === false) {
        _win[i].show = true;
      } else if (_win[i].system_id === win_obj.system_id && _win[i].show === true) {
        _win[i].show = false;
      }
      state.win.push(_win[i]);
    }
  },
  [WIN_CLOSE](state, {win_id}) {

    let _win = state.win;
    state.win = [];
    if (win_id === "all") {
      for (let i = 0; i < _win.length; i++) {
        _win[i].show = false;
        state.win.push(_win[i]);
      }
    } else {
      for (let i = 0; i < _win.length; i++) {
        if (_win[i].system_id === win_id) {
          // state.win.splice(i, 1);
          _win[i].show = false;
        }
        state.win.push(_win[i]);
      }
    }
  },
  [SET_PERMISSIONS]: (state, permissions) => {
    state.permissions = permissions
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
