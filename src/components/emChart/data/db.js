export const option = {
  option_bar_line: {
    title: {
      text: '某站点用户访问来源',
      x: 'left',
      textStyle: {
        color: "#fff"
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : ({c}%)"
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      bottom: 4,
      textStyle: {
        color: "#fff"
      },
      data: ['销量', '销量1']
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      name: "单位/米",
      nameTextStyle: {
        color: "#fff"
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, "-", 10, 10, 20, 80]
      },
      {
        name: '销量1',
        type: 'line',
        data: [5, 20, "-", 10, 10, 20,80]
      }
    ]
  },
  option_pie: {
    title: {
      text: '某站点用户访问来源',
      x: 'left',
      textStyle: {
        color: "#fff"
      }
    },
    tooltip: {
      trigger: 'item',
      formatter:
        "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      top: 4,
      right: 0,
      textStyle: {
        color: "#fff"
      },
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['42%', '60%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '18',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: true
          }
        },
        data: [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'}
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
};
