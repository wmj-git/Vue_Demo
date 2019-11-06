import {getToken, getRefreshToken, getTokenTime} from '@/utils/auth';

export default {
  //应用
  token: getToken(),
  tokenTime: getTokenTime(),//刷新间隔时间
  refreshToken: getRefreshToken(),
  systemData: [],//权限数据解析后的UI数据
  permissions: [],//后台权限数据
  win: [],//浮动功能窗口数据
  dialog: [],//功能对话框
  drawer: [],// 抽屉框
  navData: [],//主菜单数据

  //未应用
  user: '',//用户账号
  status: '',//用户状态
  code: '',//用户编码
  name: '',//用户名称
  avatar: '',//头像
  introduction: '',//用户描述
  roles: [],//角色
  setting: {//初始功能块设置

  }
};
