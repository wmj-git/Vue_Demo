//算周数
export function getYearWeek(date) {
  date.getTime();
  var day1 = date.getDay();
  if (day1 == 0) day1 = 7;

  d = Math.round((date.getTime() + day1 * (24 * 60 * 60 * 1000)) / 86400000);
  return Math.ceil(d / 7) + 1;
}
//算周数end

//获取时间
export function getNowFormatDate(num) {
  var date = new Date();
  if (num != null) {
    date = new Date(date.getTime() + 24 * 60 * 60 * 1000 * (num));
  }
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds() + ':';
  var i = date.getMilliseconds();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentDate = year + seperator1 + month + seperator1 + strDate + h + m + s + i;
  return {
    timestamp:date.getTime(),
    time:currentDate
  };
}
/*
 ps：
 getNowFormatDate();//当天时间
 getNowFormatDate(-2);//前两天时间
 getNowFormatDate(2);//后两天时间
 */
export function timestampToTime(timestamp) {
  // var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}

// timestampToTime(1403058804);
// console.log(timestampToTime(1403058804));//2014-06-18 10:33:24
//获取时间end


export function treeStructure(_nodes) {
  var nodes = _nodes;

// sort
  function cmp(a, b) {
    return a.parentId - b.parentId;
  }
  nodes.sort(cmp);

  var midObj = {};
// 从后向前遍历
  for(var i = nodes.length - 1; i >= 0; i--) {
    var nowPid = nodes[i].parentId;
    var nowId = nodes[i].id;
    // 建立当前节点的父节点的children 数组
    if(midObj[nowPid]) {
      midObj[nowPid].unshift(nodes[i]);
    } else {
      midObj[nowPid] = [];
      midObj[nowPid].unshift(nodes[i]);
    }
    // 将children 放入合适的位置
    if(midObj[nowId]) {
      nodes[i].children = midObj[nowId];
      delete midObj[nowId];
    }
  }

  return midObj;
}

