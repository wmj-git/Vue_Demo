import {
  SET_CODE, SET_TOKEN, SET_TOKEN_TIME, SET_REFRESH_TOKEN, SET_INTRODUCTION,
  SET_SETTING, SET_STATUS, SET_NAME, SET_PERMISSIONS, SET_SYSTEMDATA, SET_WIN, SET_DIALOG,SET_NAVDATA,
  SET_AVATAR, SET_ROLES
} from '../../mutation-types';
import {loginByUsername, logout, getUserInfo, refreshToken, loginByToken} from '@/api/login';
import {findByThisUser} from "@/api/resource";  //后台权限
import {systemData} from "@/api/systemUI";  //后台权限
import {getNowFormatDate, toTree} from '@/utils/tools';
import {
  getToken, setToken, getTokenTime, setTokenTime, removeToken, TokenName,
  setRefreshToken, getRefreshToken, RefreshTokenName, getExpires, setExpires
} from '@/utils/auth';

import {nav, winComponent, systemComponent} from '@/utils/system/data/db';

// 登录
export function LoginByUsername({commit}, userInfo) {
  if (userInfo.username) {  // 用户名密码登陆，也就是页面登陆
    const username = userInfo.username.trim();
    return new Promise((resolve, reject) => {
      loginByUsername(username, userInfo.password).then((response) => {
        handleResult(response, resolve)
      }).catch(error => {
        reject(error);
      });
    });
  } else {  // token 登陆
    return new Promise((resolve, reject) => {
      loginByToken(userInfo).then((response) => {
        handleResult(response, resolve)
      }).catch(error => {
        reject(error);
      });
    });
  }

  function handleResult(response, resolve) {
    let data = response.data;
    // console.log(data);
    // console.log(data[TokenName]);
    commit(SET_TOKEN, data[TokenName]);
    commit(SET_REFRESH_TOKEN, data[RefreshTokenName]);
    setToken(data[TokenName]);
    setRefreshToken(data[RefreshTokenName]);
    let _token_time = getNowFormatDate().timestamp;
    commit(SET_TOKEN_TIME, _token_time);
    setExpires(data["expires"]);
    resolve(response.data);
  }

}

// 获取用户信息
export function GetUserInfo({commit, state}) {
  return new Promise((resolve, reject) => {
    getUserInfo(state.token).then(response => {
      // 由于mockjs 不支持自定义状态码只能这样hack
      if (!response.data) {
        reject('Verification failed, please login again.');
      }
      const data = response.data;

      if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        commit(SET_ROLES, data.roles);
      } else {
        reject('getInfo: roles must be a non-null array!');
      }

      commit(SET_NAME, data.name);
      commit(SET_AVATAR, data.avatar);
      commit(SET_INTRODUCTION, data.introduction);
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

// 登出
export function LogOut({commit}) {
  return new Promise((resolve, reject) => {
    logout().then((res) => {
      commit(SET_TOKEN, '');
      commit(SET_ROLES, []);
      removeToken();
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}

// 前端 登出
export function FedLogOut({commit}) {
  return new Promise(resolve => {
    commit(SET_TOKEN, '');
    removeToken();
    resolve();
  });
}

// 动态修改权限
export function ChangeRoles({commit, dispatch}, role) {
  return new Promise(resolve => {
    commit(SET_TOKEN, role);
    setToken(role);
    getUserInfo(role).then(response => {
      const data = response.data;
      commit(SET_ROLES, data.roles);
      commit(SET_NAME, data.name);
      commit(SET_AVATAR, data.avatar);
      commit(SET_INTRODUCTION, data.introduction);
      resolve();
    });
  });
}


//获取后台权限及前端ui数据
export function systemPermissions({commit, state}) {
  return new Promise((resolve, reject) => {

    let _systemData = [];

    findByThisUser().then((response) => {

      commit(SET_PERMISSIONS, response.data);

      response.data.forEach(function (_obj) {

        let _description = _obj.description;
        _description = _description.replace(/\\n/g, '');//去掉换行
        _description = _description.replace(/\s*/g, "");//去掉空格
        if (_description.substr(0, 1) === "{" && _description.substr(-1) === "}") {
          _description = JSON.parse(_description);
          _obj.resourceCode = _description.system_id;//id显示

          if (_obj.isMeum) {
            _description.title = _obj.resourceName;
          } else {
            _description.title = "";
          }

          for (let k in _description) {
            _obj[k] = _description[k];
          }
          _systemData.push(_obj);
        }

      });
      commit(SET_SYSTEMDATA, _systemData);

      resolve(_systemData);
    }).catch(error => {
      reject(error);
    });
  });
}

//获取后台权限及前端ui数据
export function systemUI({commit, state}) {
  return new Promise((resolve, reject) => {

    let _systemData = [];

    findByThisUser().then((response) => {

      commit(SET_PERMISSIONS, response.data);

      response.data.forEach(function (_obj) {

        let _description = _obj.description;
        _description = _description.replace(/\\n/g, '');//去掉换行
        _description = _description.replace(/\s*/g, "");//去掉空格
        if (_description.substr(0, 1) === "{" && _description.substr(-1) === "}") {
          _description = JSON.parse(_description);
          _obj.resourceCode = _description.system_id;//id显示

          if (_obj.isMeum) {
            _description.title = _obj.resourceName;
          } else {
            _description.title = "";
          }

          for (let k in _description) {
            _obj[k] = _description[k];
          }
          _systemData.push(_obj);
        }

      });
      commit(SET_SYSTEMDATA, _systemData);


      /* 更新容器组件数据*/
      //菜单
      let nav_data = [];
      // win框
      let winComponent_data = [];
      // 对话框和抽屉对话框数据
      let systemComponent_data = [];



      if (_systemData && _systemData.length > 0) {
        _systemData.forEach(function (_obj) {
          winComponent.systemType.forEach(function (_item) {
            if (_obj.system_type === _item) {
              winComponent_data.push(_obj);
            }
          });
          systemComponent.systemType.forEach(function (_item) {
            if (_obj.system_type === _item) {
              systemComponent_data.push(_obj);
            }
          });
          nav.systemType.forEach(function (_item) {
            if (_obj.system_type === _item) {
              nav_data.push(_obj);
            }
          });
        });
        winComponent_data = toTree(winComponent_data);
        systemComponent_data = toTree(systemComponent_data);
        nav_data = toTree(nav_data);
      }

      //解析浮动窗口(win)数据
      let _win_data = [];
      winComponent_data.forEach(function (_obj) {
        if (_obj.system_type === "win") {
          _win_data.push(_obj);
        }
      });
      commit(SET_WIN, {
        win: _win_data
      });

      //解析对话框(dialog)数据
      let _dialog_data = [];
      systemComponent_data.forEach(function (_obj) {
        if (_obj.system_type === "system_layout_dialog") {
          _dialog_data.push(_obj);
        }
      });
      commit(SET_DIALOG, {
        dialog: _dialog_data
      });

      //解析主菜单(navData)数据
      let _nav_data = [];
      nav_data.forEach(function (_obj) {
        if (_obj.system_type === "nav") {
          _nav_data.push(_obj);
        }
      });
      commit(SET_NAVDATA, {
        navData: _nav_data
      });


      resolve(_systemData);
    }).catch(error => {
      reject(error);
    });
  });
}


//打开对话框
export function openDialog({commit, state}, _val) {

  console.log(_val);

  return new Promise((resolve, reject) => {
    let _systemData = state.dialog;
    console.log("_systemData");
    console.log(_systemData);
    _systemData[0].visible = true;
    _systemData[0].width = "800";
    commit("set_dialog", {
      dialog: _systemData
    });
    resolve();
  });
}

//关闭对话框
export function closeDialog({commit, state}) {

  console.log(state);
  console.log();

  return new Promise((resolve, reject) => {
    let _systemData = [];
    resolve();
  });
}
