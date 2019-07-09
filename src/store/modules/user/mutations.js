import {
  SET_CODE, SET_TOKEN,SET_TOKEN_TIME, SET_REFRESH_TOKEN,SET_INTRODUCTION,SET_PERMISSIONS,
  SET_SETTING, SET_STATUS, SET_NAME,SET_SYSTEMDATA,
  SET_AVATAR,SET_ROLES
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
