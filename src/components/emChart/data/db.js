export function createOption(_obj) {
  let _option = null;
  let _set = {
    type: "line",//图表类型
    optionType: "option_bar_line",//设置模板
    chartTitle: "标题",
    unit_y: ""//单位
  };
  for (let k in _set) {
    if (_obj[k]) {
      _set[k] = _obj[k];
    }
  }

  let option = {
    option_bar_line: {
      title: {
        text: _set.chartTitle,
        x: 'left',
        textStyle: {
          color: "#fff",
          fontSize:14
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: `{a} <br/>{b} : ({c}${_set.unit_y})`
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        bottom: 4,
        textStyle: {
          color: "#fff"
        },
        data: []
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        type: 'category',
        data: []
      },
      yAxis: {
        name: "单位/"+_set.unit_y,
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
       /* {
          name: '销量',
          type: 'bar',
          data: [5, 20, "-", 10, 10, 20, 80]
        },
        {
          name: '销量1',
          type: 'line',
          data: [5, 20, "-", 10, 10, 20, 80]
        }*/
      ]
    },
    option_pie: {
      title: {
        text: _set.chartTitle,
        x: 'left',
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}"+_set.unit_y+")"
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        top: 4,
        right: 0,
        textStyle: {
          color: "#fff"
        },
        data: []
      },
      series: [
        {
          name: '',
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
           /* {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}*/
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
  _option = option[_obj.optionType];
  return _option;
}
