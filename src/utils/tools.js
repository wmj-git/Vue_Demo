//统计一个数组中有多少个不重复的单词：
// 不用reduce时：
// var arr = ["apple","orange","apple","orange","pear","orange"];
export function getWordCounted(arr) {
    var obj = {};
    for (var i = 0, l = arr.length; i < l; i++) {
        var item = arr[i];
        obj[item] = (obj[item] + 1) || 1;
    }
    return obj;
}

// console.log(getWordCounted());//{apple: 2, orange: 3, pear: 1}
// 用reduce时：
// var arr = ["apple","orange","apple","orange","pear","orange"];
export function getArrCounted(arr) {
    return arr.reduce(function (prev, next) {
        prev[next] = (prev[next] + 1) || 1;
        return prev;
    }, {});
}

// console.log(getArrCounted());//{apple: 2, orange: 3, pear: 1}


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
        timestamp: date.getTime(),
        time: currentDate
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
    for (var i = nodes.length - 1; i >= 0; i--) {
        var nowPid = nodes[i].parentId;
        var nowId = nodes[i].id;
        // 建立当前节点的父节点的children 数组
        if (midObj[nowPid]) {
            midObj[nowPid].unshift(nodes[i]);
        } else {
            midObj[nowPid] = [];
            midObj[nowPid].unshift(nodes[i]);
        }
        // 将children 放入合适的位置
        if (midObj[nowId]) {
            nodes[i].children = midObj[nowId];
            delete midObj[nowId];
        }
    }

    return midObj;
}


//获取指定日期whereTheTime的所在周、月、季度、半年、全年
//type为1：周，2：月，3：季度，4：半年，5：全年
export function computTimeHorizon(whereTheTime, type) {
    let _time = null;

    var d = new Date(whereTheTime);
    var year = d.getFullYear();
    var month = parseInt(d.getMonth()) + 1;
    switch (type) {
        case 1://周
            //获取周一
            var beginWhereTheTime = GetMondayAndSunday(d);
            var dd = new Date(beginWhereTheTime);
            //获取周天
            dd.setDate(dd.getDate() + 6);
            var monthSunday = parseInt(dd.getMonth()) + 1;
            var endWhereTheTime = dd.getFullYear() + "-" + formatDate(monthSunday) + "-" + formatDate(dd.getDate());
            _time = {
                beginTime: beginWhereTheTime,
                endTime: endWhereTheTime
            };
            break;
        case 2://月
            //获取月第一天
            var fristDay = new Date(year, month, 1);
            var beginWhereTheTime = year + "-" + formatDate(month) + "-" + formatDate(fristDay.getDate());
            //获取月最后一天
            var lastDay = new Date(year, month, 0);
            var endWhereTheTime = year + "-" + formatDate(month) + "-" + formatDate(lastDay.getDate());
            _time = {
                beginTime: beginWhereTheTime,
                endTime: endWhereTheTime
            };
            break;
        case 3://季度
            var beginWhereTheTime, endWhereTheTime;
            //获取当前月所在季度
            var quarter = getQuarterStartMonth(month);
            if (quarter != 0) {
                //获取季度第一天
                var fristDay = new Date(year, quarter, 1);
                //获取季度最后一天
                var lastDay = new Date(year, quarter + 2, 0);
                beginWhereTheTime = year + "-" + formatDate(quarter) + "-" + formatDate(fristDay.getDate());
                endWhereTheTime = year + "-" + formatDate(quarter + 2) + "-" + formatDate(lastDay.getDate());
            }
            _time = {
                year: year,
                quarter: quarter,
                beginTime: beginWhereTheTime,
                endTime: endWhereTheTime
            };
            break;
        case 4://半年
            var startMonth = 0;
            var endMonth = 0;
            if (month < 7) {//上半年
                startMonth = 1;
                endMonth = 6;
            } else {//下半年
                startMonth = 7;
                endMonth = 12;
            }
            //获取第一天
            var fristDay = new Date(year, 1, 1);
            //获取最后一天
            var lastDay = new Date(year, 6, 0);
            var beginWhereTheTime = year + "-" + formatDate(startMonth) + "-" + formatDate(fristDay.getDate());
            var endWhereTheTime = year + "-" + formatDate(endMonth) + "-" + formatDate(lastDay.getDate());

            _time = {
                year: year,
                startMonth: startMonth,
                endMonth: endMonth,
                beginTime: beginWhereTheTime,
                endTime: endWhereTheTime
            };
            break;
        case 5://全年
            var beginWhereTheTime = year + "-01-01";
            var endWhereTheTime = year + "-12-31";
            _time = {
                beginTime: beginWhereTheTime,
                endTime: endWhereTheTime
            };
            break;
    }

    return _time;
}

//获取指定日期所在周周一
function GetMondayAndSunday(dd) {
    var week = dd.getDay(); //获取时间的星期数
    var minus = week ? week - 1 : 6;
    dd.setDate(dd.getDate() - minus); //获取minus天前的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取月份
    var d = dd.getDate();
    return y + "-" + formatDate(m) + "-" + formatDate(d);
}

//格式化月和日为MM、dd
function formatDate(value) {
    if (value < 10) {
        value = "0" + value;
    }
    return value;
}

//获取当前月所在季度的开始月
function getQuarterStartMonth(month) {
    var quarterStartMonth = 0;
    if (month < 4) {
        quarterStartMonth = 1;
    }
    if (3 < month && month < 7) {
        quarterStartMonth = 2;
    }
    if (6 < month && month < 10) {
        quarterStartMonth = 3;
    }
    if (month > 9) {
        quarterStartMonth = 4;
    }
    return quarterStartMonth;
}

// 动态加载js文件
export function loadJs(url,callback){
  var script=document.createElement('script');
  script.type="text/javascript";
  if(typeof(callback)!="undefined"){
    if(script.readyState){
      script.onreadystatechange=function(){
        if(script.readyState == "loaded" || script.readyState == "complete"){
          script.onreadystatechange=null;
          callback();
        }
      }
    }else{
      script.onload=function(){
        callback();
      }
    }
  }
  script.src=url;
  document.body.appendChild(script);
}
/*loadJs("test.js",function(){
  alert('done');
});*/


// 动态加载css文件
export function loadCss(url,callback){
  let link=document.createElement('link');
  link.type="text/css";
  link.rel="stylesheet";
  if(typeof(callback)!="undefined"){
    if(link.readyState){
      link.onreadystatechange=function(){
        if(link.readyState == "loaded" || link.readyState == "complete"){
          link.onreadystatechange=null;
          callback();
        }
      }
    }else{
      link.onload=function(){
        callback();
      }
    }
  }
  link.href=url;
  document.body.appendChild(link);
}
/*loadCss("test.js",function(){
  alert('done');
});*/
