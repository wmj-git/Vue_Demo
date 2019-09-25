import {getToken, getRefreshToken, getTokenTime} from '@/utils/auth';

export default {
  //应用
  token: getToken(),
  tokenTime: getTokenTime(),//刷新间隔时间
  refreshToken: getRefreshToken(),
  systemData: [],//前端解析后的UI数据
  permissions: [],//后台权限数据
  win: [],//浮动功能窗口数据
  dialog: [
    {
      type: "em_input",
      placeholder: "账户",
      name: "账户",
      params: ""
    }
  ],//功能对话框

  //未应用
  user: '',
  status: '',
  code: '',
  name: '',
  avatar: '',//头像
  introduction: '',
  roles: [],
  setting: {
    articlePlatform: []
  }
};
