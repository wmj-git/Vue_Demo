import {
  SET_CODE, SET_TOKEN, SET_TOKEN_TIME, SET_REFRESH_TOKEN, SET_INTRODUCTION,
  SET_SETTING, SET_STATUS, SET_NAME, SET_PERMISSIONS, SET_SYSTEMDATA,
  SET_AVATAR, SET_ROLES
} from '../../mutation-types';
import {loginByUsername, logout, getUserInfo, refreshToken, loginByToken} from '@/api/login';
import {findByThisUser} from "@/api/resource";  //后台权限
import {systemData} from "@/api/systemUI";  //后台权限
import {getNowFormatDate} from '@/utils/tools';
import {
  getToken, setToken, getTokenTime, setTokenTime, removeToken, TokenName,
  setRefreshToken, getRefreshToken, RefreshTokenName, getExpires, setExpires
} from '@/utils/auth';


// 登录
export function LoginByUsername({commit}, userInfo) {
  if(userInfo.username){  // 用户名密码登陆，也就是页面登陆
    const username = userInfo.username.trim();
    return new Promise((resolve, reject) => {
      loginByUsername(username, userInfo.password).then((response)=>{
        handleResult(response, resolve)
      }).catch(error => {
        reject(error);
      });
    });
  }else {  // token 登陆
    return new Promise((resolve, reject) => {
      loginByToken(userInfo).then((response)=>{
        handleResult(response, resolve)
      }).catch(error => {
        reject(error);
      });
    });
  }

  function handleResult(response,resolve){
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
export function systemUI({commit, state}) {
  return new Promise((resolve, reject) => {

    let _systemData = [];

    findByThisUser().then((response) => {
      // console.log(response);
      commit(SET_PERMISSIONS, response.data);

      response.data.forEach(function (_obj) {
        systemData.forEach(function (_item) {
          if(_obj.resourceCode===_item.system_id){
            _item.id=_obj.id;
            _item.parentId=_obj.parentId;
            _item.resourceUrl=_obj.resourceUrl;
            _systemData.push(_item);
          }
        })
      });
      commit(SET_SYSTEMDATA, _systemData);
      resolve(_systemData);
    }).catch(error => {
      reject(error);
    });
  });
}
