export default {
  bar:{
    title:{
      text:'单位：次',
      left:'5%',
      top:'15%',
      textStyle:{
        fontSize:12,
        color:'#fff'
      }
    },
    grid: {
      left: '3%',
      right: '6%',
      bottom: '3%',
      top:'20%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        // data : ['永川', '江津', '重庆'],
        axisTick: {
           show:false
        },
        axisLine:{
          lineStyle :{
            color: '#fff'
          }
        },
      }
    ],
    yAxis : [
      {
        type : 'value',
        axisLine:{
          lineStyle :{
            color: '#fff'
          }
        },
        splitLine:{    //隐藏网格线
          show:false
        },
        axisTick: {
          show:false
        }
      }
    ],
    barGap:'0',    //两个不同类型柱子之间的间距
    series : [
      // {
      //   name:'火险报警次数',
      //   type:'bar',
      //   barWidth: '25%',
      //   data:[100, 200,300]
      // }
    ],
    legend:{
      orient: 'horizontal',
      top:'1%',
      textStyle:{
        fontSize: 12,//字体大小
        color: '#ffffff',//字体颜色
        top:'20%'
      }
    }
  },

  line:{
    title:{
       text:'单位：次',
       left:'12%',
       top:'13%',
       textStyle:{
          fontSize:12,
          color:'#fff'
       }
    },
    xAxis: {
      type: 'category',
      // data: ['1/3', '2/3', '3/3','4/3','5/3'],
      axisLine: {
        lineStyle: {
          color: '#fff'
        },
      },
      axisTick:{   //取消刻度线
        show:false
      },
    },
    yAxis: {
      type: 'value',
      axisLine:{
        lineStyle :{
          color: '#fff'
        }
      },
      axisTick:{    //取消刻度线
        show:false
      },
      splitLine:{    //隐藏网格线
        show:false
      }
    },
  tooltip: {
    trigger: 'item',
    formatter: "{a}:{c}"
  },
  legend:{
    orient: 'vertical',
    icon: "roundRect",
    x: '85%',
    y: '20%',
    itemWidth:15,
    itemHeight:10,
    textStyle:{
      fontSize: 12,//字体大小
      color: '#ffffff'//字体颜色
    },
  },
  grid:{            //控制折现图的大小
       // top:40,
       // x:25,
       // x2:40,
       // y2:30
      left: '3%',
      right: '20%',
      bottom: '3%',
      top:'20%',
      containLabel: true
  },
  series: [

    ]
  },
  circle: {
    tooltip: {
      trigger: 'item',
      // formatter: "{a} <br/>{b}: {c} ({d}%)"
      formatter: "{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      icon: "roundRect",          //图例的形状
      selectedMode: false,//选中哪个图例 false后图例不可点击
      itemWidth:10,
      itemHeight:10,
      x: '65%',
      y: 'top',
      textStyle:{
        fontSize: 12,//字体大小
        color: '#ffffff'//字体颜色
      },
      // data:['直接访问','邮件营销','联盟广告'],
      // formatter: function(name) {      //让图例的文字显示为数据
      //   var index = 0;
      //   var clientlabels = ['直接访问','邮件营销','联盟广告'];
      //   // var clientcounts = [335,310,234];
      //   var clientcounts =[
      //     {value:335, name:'直接访问'},
      //     {value:310, name:'邮件营销'},
      //     {value:234, name:'联盟广告'}
      //   ]
      //   clientlabels.forEach(function(value,i){
      //     if(value == name){
      //       index = i;
      //     }
      //   });
      //   return  clientcounts[index].value;
      // }

    },
    series: [
      {
        type:'pie',
        color: ['#f00','#ff0','#0f0'],
        radius: ['50%', '70%'],   //设置内半径和外半径，形成环状
        center:['40%','50%'],      // 图在容器中的位置
        avoidLabelOverlap: false,  //避免标注重叠
        hoverAnimation: false,//移入放大
        label: {
          normal: {
            show: true,           //环形中央自定义文字
            position: 'center',
            formatter:function(){
              return '风险预警'
            },
            textStyle:{
                      fontSize:15,
                       color:'#fff',
                  }
          },
          emphasis: {
            // show: true,
            show: false,         //关掉环形中央默认的文字
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[

        ]
      }
    ]
  },
  pie : {
    tooltip : {
      trigger: 'item',
      formatter: " {b} : {c} ({d}%)"
    },
    color:['#F3F781','#00FFFF','#2EFE2E'],
    legend: {
      orient: 'vertical',
      x: '65%',
      y: '20%',
      textStyle:{
        fontSize: 12,//字体大小
        color: '#ffffff'//字体颜色
      },
    },
    series : [
      {
        type: 'pie',
        radius : '60%',
        center: ['39%', '50%'],
        label: {        //此处为指示线文字
          show: true,
          position: 'outer', //标签的位置
          textStyle: {
            fontWeight: 200,
            fontSize: 12    //文字的字体大小
          },
          formatter: function (p) {   //指示线对应文字
            var data = p.data.value;
            return data;
          }
        },
        labelLine:{
          normal:{
            show: true,
            length: 20,
            length2: 0,  //改为直线
          }
        },
        data:[
            {"name":"永川","value": 220},
            {"name":"江津","value": 220},
            {"name":"重庆","value": 220}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }


}
