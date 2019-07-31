var websock = null;
import { getToken } from '@/utils/auth'

// 初始化weosocket
function initWebSocket (url) {
  // ws地址 -->这里是你的请求路径
  var ws= `${url}/webscoket/${getToken()}/groupKey`;
  websock = new WebSocket(ws);
  websock.onmessage = function (e) {
    websocketonmessage(e)
  };
  websock.onclose = function (e) {
    websocketclose(e)
  };
  websock.onopen = function () {
    websocketOpen()
  };

  // 连接发生错误的回调方法
  websock.onerror = function () {
    console.log('WebSocket连接发生错误')
  }
}

// 实际调用的方法
function sendSock (agentData, callback) {
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData)
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback)
    }, 1000)
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData, callback)
    }, 1000)
  }
}

// 数据接收
function websocketonmessage (e) {
  console.log(e.data);
  let data = e.data;
  if(data.indexOf("{") !== -1 && data.indexOf("}") !== -1){  // 是JSON字符串
    let obj = JSON.parse(data);
    if(obj.type === 'fire'){

    }
    // console.log(val)
  }else{
    console.log(e.data)
  }

}


// 数据发送
function websocketsend (agentData) {
  websock.send(JSON.stringify(agentData))
}

// 关闭
function websocketclose (e) {
  console.log('connection closed (' + e.code + ')')
}

// 创建 websocket 连接
function websocketOpen (e) {
  console.log('连接成功')
}

export {
  initWebSocket
}



