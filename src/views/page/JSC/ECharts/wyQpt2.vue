<template>
  <div id="myChartwyQp2" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: [0.7, 0.7, 0.7],
      value: 43.2,
      text: '万平方米'
    }
  },
  mounted () {
    if (this.$route.query.name === '餐饮') {
      this.value = '3000人'
      this.text = '总人员'
    } else if (this.$route.query.name === '酒店') {
      this.value = '2156'
      this.text = '房间总数'
    } else if (this.$route.query.name === '汽服') {
      this.value = '8888辆'
      this.text = '车辆总数'
    } else if (this.$route.query.name === '实业') {
      this.value = '8888辆'
      this.text = '车辆总数'
    } else if (this.$route.query.name === '物业') {
      this.value = '8888辆'
      this.text = '车辆总数'
    } else {
      this.value = '2546'
      this.text = '人员总数'
    }
    this.drawLine()
  },
  methods: {
    drawLine () {
      this.$nextTick(_ => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChartwyQp2'))
        let angle = 0 //角度，用来做简单的动画效果的
        let value = 43.2
        var timerId
        let option = {
          title: {
            text: '{a|' + `${this.value}\n ` + '}{c|' + `${this.text}` + '}',
            x: 'center',
            y: 'center',
            textStyle: {
              rich: {
                a: {
                  fontSize: 22,
                  color: '#29EEF3'
                },

                c: {
                  fontSize: 16,
                  color: '#fff',
                  // padding: [5,0]
                }
              }
            }
          },

          series: [
            // 紫色
            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (0 + angle) * Math.PI / 180,
                    endAngle: (90 + angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#8383FA",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                }
              },
              data: [0]
            }, {
              name: "ring5", //紫点
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2
                let y0 = api.getHeight() / 2
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6
                let point = getCirlPoint(x0, y0, r, (90 + angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#8450F9", //绿
                    fill: "#8450F9"
                  },
                  silent: true
                }
              },
              data: [0]
            },
            // 蓝色

            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (180 + angle) * Math.PI / 180,
                    endAngle: (270 + angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#4386FA",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                }
              },
              data: [0]
            },
            {
              name: "ring5", // 蓝色
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2
                let y0 = api.getHeight() / 2
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6
                let point = getCirlPoint(x0, y0, r, (180 + angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#4386FA", //绿
                    fill: "#4386FA"
                  },
                  silent: true
                }
              },
              data: [0]
            },

            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (270 + -angle) * Math.PI / 180,
                    endAngle: (40 + -angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                }
              },
              data: [0]
            },
            // 橘色

            {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (90 + -angle) * Math.PI / 180,
                    endAngle: (220 + -angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#FF8E89",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                }
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2
                let y0 = api.getHeight() / 2
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65
                let point = getCirlPoint(x0, y0, r, (90 + -angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#FF8E89", //粉
                    fill: "#FF8E89"
                  },
                  silent: true
                }
              },
              data: [0]
            }, {
              name: "ring5", //绿点
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2
                let y0 = api.getHeight() / 2
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65
                let point = getCirlPoint(x0, y0, r, (270 + -angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB", //绿
                    fill: "#0CD3DB"
                  },
                  silent: true
                }
              },
              data: [0]
            }, {
              name: '吃猪肉频率',
              type: 'pie',
              radius: ['72%', '50%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",

                }
              },
              data: [{
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: { // 完成的圆环的颜色
                      colorStops: [{
                        offset: 0,
                        color: '#A098FC' // 0% 处的颜色
                      },
                      {
                        offset: 0.3,
                        color: '#4386FA' // 0% 处的颜色
                      },
                      {
                        offset: 0.6,
                        color: '#4FADFD' // 0% 处的颜色
                      },
                      {
                        offset: 0.8,
                        color: '#0CD3DB' // 100% 处的颜色
                      }, {
                        offset: 1,
                        color: '#646CF9' // 100% 处的颜色
                      }
                      ]
                    },
                  }
                }
              },
              {
                value: value,
                name: "",
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#173164"
                  }
                }
              }
              ]
            },
            {
              name: '吃猪肉频率',
              type: 'pie',
              radius: ['52%', '55%'],
              silent: true,
              clockwise: true,
              startAngle: 270,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",

                }
              },
              data: [{
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: { // 完成的圆环的颜色
                      colorStops: [{
                        offset: 0,
                        color: '#00EDF3' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#646CF9' // 100% 处的颜色
                      }]
                    },
                  }
                }
              },
              {
                value: value,
                name: "",
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#173164"
                  }
                }
              }
              ]
            },

          ]
        }
        //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
        function getCirlPoint (x0, y0, r, angle) {
          let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
          let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
          return {
            x: x1,
            y: y1
          }
        }

        function draw () {
          angle = angle + 3
          myChart.setOption(option, true)
          //window.requestAnimationFrame(draw);
        }
        if (timerId) {
          clearInterval(timerId)
        }
        timerId = setInterval(function() {
          //用setInterval做动画感觉有问题
          draw()
        }, 100)
        myChart.resize()
        // 绘制图表
        myChart.setOption(option, true)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
