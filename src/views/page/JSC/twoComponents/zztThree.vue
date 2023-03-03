<template>
  <div id="myChartZzt2" :style="{ width: width, height: height }"></div>
</template>

<script>
import { getPersonNum, getPersonNum2, getSelectBlocBusinessType, getOwnerType2 } from '@/api/api'
import echarts from 'echarts'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: '服务人数(人)',
      title1: '服务点总数量（个）',
      show: true,
      path: '',
      width: '100%',
      height: '100%',
      menuName: '',
      regionList: [],
      regionVal: [],
      fwData: [],
      fwNameData: [],
      name: null,
      fwData1: [2800, 300, 500, 100, 100, 100],
      timer: null
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.path = val.path
        this.drawLine()
      },
    },
    "$store.state.mapVal" (val, oldVal) {
      this.name = val.name
      this.onSHow()
    },
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.getPeo()
          this.onSHow()
        }, 100)
      },
      // 立即监听
      immediate: true,
    },
    // "$store.state.fwObj"(newVal, oldVal) {
    //   this.fwData = newVal.arr
    //   this.drawLine()
    // },
    // "$store.state.zgsObj"(newVal, oldVal) {
    //   this.drawLine()
    // }
  },
  mounted () {
    this.path = this.$route.path
    setTimeout(() => {
    }, 100)

  },

  methods: {
    getPeo () {
      this.regionList = []
      this.regionVal = []
      if (this.$route.path === '/threeMenuIndex') {
        getPersonNum2(this.$store.state.fgsSelValue).then(res => {
          if (res.data.code === 0) {
            res.data.data.forEach((item) => {
              this.regionList.push(item.regionName)
              this.regionVal.push(item.regionNum)
            })
            this.$nextTick(() => {
              this.drawLine()
            })
          }
        })
      } else {
        getPersonNum().then(res => {
          if (res.data.code === 0) {
            res.data.data.forEach((item) => {
              this.regionList.push(item.regionName)
              this.regionVal.push(item.regionNum)
            })
            this.$nextTick(() => {
              this.drawLine()
            })
          }
        })
      }

    },
    onSHow () {
      this.fwNameData = []
      this.fwData = []
      if (this.$route.path === '/threeMenuIndex' && this.$store.state.zgsBut === '服务') {
        getOwnerType2(this.$store.state.fgsSelValue, this.name).then((res) => {
          res.data.data.forEach((item) => {
            this.fwNameData.push(item.type)
            this.fwData.push(item.num)
          })
          this.drawLine()
        })
        this.title1 = '业主总数量（人）'
      } else {
        getSelectBlocBusinessType(this.name).then((res) => {
          if (res.data.code === 0) {
            res.data.data.forEach((item) => {
              this.fwNameData.push(item.type)
              this.fwData.push(item.num)
            })
            this.drawLine()
          }
        })
      }
    },
    drawLine () {
      this.$nextTick(_ => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChartZzt2'))
        var djData = this.djData
        let option = {
          title: {
            show: true,
            text: this.title,
            textStyle: {
              align: 'center',
              color: '#fff',
              fontSize: 18,
            },
            top: '3%',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: '15%',
            right: '5%',
            left: '15%',
            bottom: '12%'
          },
          xAxis: [{
            type: 'category',
            data: this.regionList,
            axisLine: {
              lineStyle: {
                color: '#fff',
              }
            },
            axisLabel: {
              color: '#e2e9ff',
              showMaxLabel: true,
              interval: 0,
              rotate: 40,
              textStyle: {
                fontSize: 10
              }
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [{
            axisLabel: {
              formatter: '{value}',
              color: '#e2e9ff',
              fontSize: 16
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(0,186,255,.6)'
              }
            },
            splitLine: {
              lineStyle: {
                color: this.show === true ? 'rgba(255,255,255,0.3)' : '#696969',
              }
            }
          }],
          series: [{
            type: 'bar',
            barWidth: '80%',
            data: this.regionVal,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,244,255,1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(0,77,167,1)' // 100% 处的颜色
                }], false),
                shadowColor: 'rgba(0,160,221,1)',
                shadowBlur: 4,
              }
            },
            label: {
              normal: {
                show: true,
                lineHeight: 20,
                formatter: '{c}',
                position: 'top',
                textStyle: {
                  color: '#00D6F9',
                  fontSize: 12
                }

              }
            }
          }]
        }
        let fwOption = {
          title: {
            show: true,
            text: this.title1,
            textStyle: {
              align: 'center',
              color: this.show === true ? '#fff' : 'black',
              fontSize: 16,
            },
            top: '10%',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: '30%',
            right: '3%',
            left: '10%',
            bottom: '12%'
          },
          xAxis: [{

            type: 'category',
            data: this.fwNameData,
            axisLine: {
              lineStyle: {
                color: this.show === true ? '#fff' : 'black',
              }
            },
            axisLabel: {
              margin: 10,
              color: this.show === true ? '#e2e9ff' : 'black',
              textStyle: {
                fontSize: 14
              },
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [{
            axisLabel: {
              formatter: '{value}',
              color: this.show === true ? '#e2e9ff' : 'black',
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(0,186,255,.6)'
              }
            },
            splitLine: {
              lineStyle: {
                color: this.show === true ? 'rgba(255,255,255,0.3)' : '#696969',
              }
            }
          }],
          series: [{
            type: 'bar',
            data: this.fwData,
            barWidth: '28px',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,244,255,1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(0,77,167,1)' // 100% 处的颜色
                }], false),
                shadowColor: 'rgba(0,160,221,1)',
                shadowBlur: 4,
              }
            },
            label: {
              normal: {
                show: true,
                lineHeight: 30,
                formatter: '{c}',
                position: 'top',
                textStyle: {
                  color: '#00D6F9',
                  fontSize: 20
                }

              }
            }
          }]
        }
        myChart.resize()
        // 绘制图表
        if (this.path === '/fw-primaryIndex') {
          myChart.setOption(fwOption, true)
        } else if (this.path === '/threeMenuIndex' && this.$store.state.zgsBut === '服务') {
          myChart.setOption(fwOption, true)
        } else {
          myChart.setOption(option, true)
        }
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      })
    },
    drawLine1 () {
      this.$nextTick(_ => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChartZzt2'))
        var xData = ['1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份', '8月份', '9月份', '10月份', '11月份', '12月份']
        var lineData = [100, 100, 100, 100, 100, 100, 100]
        var lastYearData = [312, 20, 62, 34, 55, 65, 355, 123, 424, 564, 666, 444]
        var thisYearData = [11, 38, 23, 39, 66, 66, 79, 89, 100, 55, 65]
        var timeLineData = [1]
        let legend = ['房间总数', '月份出租率']
        var background = "#0e2147" //背景
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
            legend: {
              top: '5%',
              right: '5%',
              itemWidth: 20,
              itemHeight: 5,
              // itemGap: 343,
              icon: 'horizontal',
              textStyle: {
                color: '#ffffff',
                fontSize: 20,
              },
              data: legend
            },
            grid: [{
              show: false,
              left: '5%',
              top: '10%',
              bottom: '8%',
              containLabel: true,
              width: '37%'
            }, {
              show: false,
              left: '51%',
              top: '10%',
              bottom: '8%',
              width: '0%'
            }, {
              show: false,
              right: '5%',
              top: '10%',
              bottom: '8%',
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
                show: false
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
            name: "房间总数",
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
            name: "房间总数",
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
            name: "月份出租率",
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
            name: "月份出租率",
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
