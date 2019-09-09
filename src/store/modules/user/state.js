import {getToken, getRefreshToken, getTokenTime} from '@/utils/auth';

export default {
  user: '',
  status: '',
  code: '',
  token: getToken(),
  tokenTime: getTokenTime(),//刷新间隔时间
  refreshToken: getRefreshToken(),
  name: '',
  avatar: '',//头像
  introduction: '',
  systemData: [],//前端解析后的权限数据
  win: [],//UI属性数据
  permissions: [],//后台权限数据
  roles: [],
  setting: {
    articlePlatform: []
  }
};
