<template>
  <div id="myChart2Zzt2" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: true,
      path: '',
      width: '100%',
      height: '100%',
      menuName: ''
    }
  },
  created () {
    this.path = this.$route.path
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.menuName = val.query.name
      },
    }
  },
  mounted () {
    this.drawLine()
  },
  computed: {
    getStoreItem () {
      return this.$store.state.switchShow
    }
  },
  methods: {
    drawLine () {
      this.$nextTick(_ => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart2Zzt2'))
        var xData = ['1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份', '8月份', '9月份', '10月份', '11月份', '12月份']
        var lineData = [100, 100, 100, 100, 100, 100, 100]
        var lastYearData = [312, 20, 62, 34, 55, 65, 355, 123, 424, 564, 666, 444]
        var thisYearData = [11, 38, 23, 39, 66, 66, 79, 89, 100, 55, 65]
        var timeLineData = [1]
        let legend = ['房间总数(间)', '月份出租率(%)']
        var background = "rgb(0,0,0,0)" //背景
        let textColor = "#fff"
        let lineColor = "rgba(255,255,255,0.2)"
        let colors = [{
          borderColor: "rgba(227,161,96,1)",
          start: "rgba(227,161,96,0.8)",
          end: "rgba(227,161,96,0.3)"
        },
        {
          borderColor: "rgba(0,222,255,1)",
          start: "rgba(0,222,255,0.3)",
          end: "rgba(0,222,255,0.8)"
        },
        ]
        let borderData = []
        let scale = 2
        borderData = xData.map(item => {
          return scale
        })

        let option = {
          baseOption: {
            backgroundColor: background,
            timeline: {
              show: false,
              top: 0,
              data: []
            },
            tooltip: {
              trigger: 'item',
            },
            legend: {
              top: '0%',
              right: 'center',
              itemWidth: 20,
              itemHeight: 5,
              // itemGap: 343,
              icon: 'horizontal',
              textStyle: {
                color: '#ffffff',
                fontSize: 14,
              },
              data: legend
            },
            grid: [{
              show: false,
              left: '5%',
              top: '10%',
              bottom: '2%',
              containLabel: true,
              width: '37%'
            }, {
              show: false,
              left: '51%',
              top: '10%',
              bottom: '2%',
              width: '0%'
            }, {
              show: false,
              right: '5%',
              top: '10%',
              bottom: '2%',
              containLabel: true,
              width: '37%'
            }],
            xAxis: [{
              type: 'value',
              inverse: true,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: 'top',
              axisLabel: {
                show: true,
                color: textColor
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: lineColor
                }
              },
            }, {
              gridIndex: 1,
              show: false
            }, {
              gridIndex: 2,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: 'top',
              axisLabel: {
                show: true,
                color: textColor
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: lineColor
                }
              },
            }],
            yAxis: [{
              type: 'category',
              inverse: true,
              position: 'right',
              axisLine: {
                show: true,
                lineStyle: {
                  color: lineColor
                }
              },

              axisTick: {
                show: false
              },
              axisLabel: {
                show: false,
                fontSize: '12px'
              },
              data: xData
            }, {
              gridIndex: 1,
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                padding: [30, 0, 0, 0],
                textStyle: {
                  color: '#ffffff',
                  fontSize: 20
                },
                align: "center"

              },
              data: xData.map(function(value) {
                return {
                  value: value,
                  textStyle: {
                    align: 'center'
                  }
                }
              })
            }, {
              gridIndex: 2,
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: true,
                lineStyle: {
                  color: lineColor
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false

              },
              data: xData
            }],
            series: []

          },
          options: []
        }

        option.baseOption.timeline.data.push(timeLineData[0])
        option.options.push({
          series: [{
            name: "房间总数(间)",
            type: "bar",
            barWidth: 25,
            stack: "1",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: colors[0].start
                },
                {
                  offset: 1,
                  color: colors[0].end
                }
                ]),
              }
            },
            label: {
              normal: {
                show: false,
              }
            },
            data: lastYearData,
            animationEasing: "elasticOut"
          },
          {
            name: "房间总数(间)",
            type: "bar",
            barWidth: 25,
            stack: "1",
            itemStyle: {
              normal: {
                color: colors[0].borderColor

              }
            },
            data: borderData
          },
          {
            name: "月份出租率(%)",
            type: "bar",
            stack: "2",
            barWidth: 25,
            xAxisIndex: 2,
            yAxisIndex: 2,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: colors[1].start
                },
                {
                  offset: 1,
                  color: colors[1].end
                }
                ]),
              }
            },
            label: {
              normal: {
                show: false,
              }
            },
            data: thisYearData,
            animationEasing: "elasticOut"
          },
          {
            name: "月份出租率(%)",
            type: "bar",
            xAxisIndex: 2,
            yAxisIndex: 2,
            barWidth: 25,
            stack: "2",
            itemStyle: {
              normal: {
                color: colors[1].borderColor

              }
            },
            data: borderData
          },
          ]
        })

        myChart.resize()

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
