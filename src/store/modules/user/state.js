import { getToken,getRefreshToken,getTokenTime } from '@/utils/auth'

export default {
  user: '',
  status: '',
  code: '',
  token: getToken(),
  tokenTime: getTokenTime(),
  refreshToken: getRefreshToken(),
  name: '',
  avatar: '',//头像
  introduction: '',
  systemData:[],
  win:[],
  permissions:[],
  roles: [],
  setting: {
    articlePlatform: []
  }
}
