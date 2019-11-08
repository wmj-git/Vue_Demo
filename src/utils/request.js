import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {setToken, getToken, TokenName, removeToken} from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 35000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters["user/token"]) {
      // console.log("token");
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      // config.headers['X-Token'] = getToken()
      config.headers[TokenName] = getToken()

    }
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */

  response => {
    const res = response.data;
    if (res.statusCode !== 200) {
      let message = res.message;
      if (message) {
        let end = message.indexOf(">>>>");
        if (end !== -1) {
          message = message.substring(0, end)
        }

      }
      // console.log(message);

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.statusCode === 1007 || res.statusCode === 1006 || res.statusCode === 1005 || res.statusCode === 401) {
        // 请自行在引入 MessageBox
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消操作',
          type: 'warning',
          customClass: 'em-message-box'
        }).then(() => {
          removeToken();
          window.location.href = "/login"

        })
      } else {
        Message({
          message: message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      // return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    let message = "服务器繁忙，连接失败，请稍后重试";
    if (error.response) {
      let statusCode = error.response.status;
      message = error.message;
      if (statusCode === 400) {
        message = "参数填写错误，请检查后重新提交！"
      }
    }

    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
);

export default service
