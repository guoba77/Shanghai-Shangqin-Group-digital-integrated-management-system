<template>
  <div id="myChartLine2" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
import { getThisYearEachMonthProfitFigure, getThisYearEachMonthProfitFigure2 } from '../../api/api'
export default {
  name: "zczeBt",
  data () {
    return {
      text: '成本费用',
      path: '',
      data: ['一月份', '二月份', '三月份', '四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份'],
      dataNum: [820, 932, 901, 934, 1290, 1330, 1320, 2000, 3000, 4000, 5000, 6000],
      titleLeft: '0%',
      titleTop: '0%',
      ti: {},
      valName: '',
      pathName: ''
    }
  },
  watch: {
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        setTimeout(() => {
          this.onSHow()
        }, 100)
      },
      immediate: true
    }
  },
  mounted () {
    this.path = this.$route.path
    this.onSHow()
  },
  methods: {
    onSHow () {
      if (this.path === '/threeMenuIndex' && this.$store.state.zgsBut === '财务') {
        getThisYearEachMonthProfitFigure2(this.$store.state.fgsSelValue).then((res) => {
          let resData = res.data.data.reverse()
          let data1 = []
          let data2 = []
          let data3 = []
          resData.forEach((item) => {
            data1.push(item.month + '月')
            if (item.subjectFigureList.length === 1) {
              item.subjectFigureList.forEach((ttem) => {
                if (ttem.subject === '利润总额') {
                  data3.push(ttem.figure)
                }
                data2.push(null)

              })
            } else {
              item.subjectFigureList.forEach((ttem) => {
                if (ttem.subject === '利润预算') {
                  data2.push(ttem.figure)
                } else {
                  if (ttem.subject === '利润总额') {
                    data3.push(ttem.figure)
                  }
                }
              })
            }
          })
          this.drawLine2(data1, data2, data3)
        })
      } else {
        getThisYearEachMonthProfitFigure().then((res) => {
          let resData = res.data.data.reverse()
          let data1 = []
          let data2 = []
          let data3 = []
          resData.forEach((item) => {
            data1.push(item.month + '月')
            if (item.subjectFigureList.length === 1) {
              item.subjectFigureList.forEach((ttem) => {
                data2.push(null)
                if (ttem.subject === '利润总额') {
                  data3.push(ttem.figure)
                }
              })
            } else {
              item.subjectFigureList.forEach((ttem) => {
                if (ttem.subject === '利润预算') {
                  data2.push(ttem.figure)
                } else {
                  if (ttem.subject === '利润总额') {
                    data3.push(ttem.figure)
                  }
                }
              })
            }
          })
          this.drawLine2(data1, data2, data3)
        })
      }
    },
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartLine2'))
        let data = this.dataNum

        let option = {
          // backgroundColor: '#323a5e',
          backgroundColor: 'rgb(0,0,0,0)',
          title: {
            text: this.path === '/secondaryIndex' ? '成本费用(' + this.pathName + ')' : this.path === '/threeIndex' ? '成本费用(' + this.pathName + ')' : this.text,
            textStyle: {
              color: 'white'
            }
          },
          grid: {
            top: '15%',
            left: '10%',
            right: '5%',
            bottom: '15%',
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'transparent',
            axisPointer: {
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(126,199,255,0)' // 0% 处的颜色
                  }, {
                    offset: 0.5,
                    color: 'rgba(126,199,255,1)' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(126,199,255,0)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
            }
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: '#233653'
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                color: '#7ec7ff',
                padding: 16,
                fontSize: 14
              },
              formatter: function(data) {
                return data
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#192a44'
              },
            },
            axisTick: {
              show: false,
            },
            data: this.data
          }],
          yAxis: [{
            // name: '营业总额',
            nameTextStyle: {
              color: "#7ec7ff",
              fontSize: 16,
              padding: 0
            },
            min: 0,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#192a44'
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#233653"
              }

            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7ec7ff',
                padding: 5
              },
              formatter: function(value) {
                if (value === 0) {
                  return value
                }
                return value
              }
            },
            axisTick: {
              show: false,
            },
          }],
          series: [{
            name: this.text,
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
              normal: {
                width: 5,
                color: "rgba(25,163,223,1)", // 线条颜色
              },
              borderColor: 'rgba(0,0,0,.4)',
            },
            itemStyle: {
              color: "rgba(25,163,223,1)",
              borderColor: "#646ace",
              borderWidth: 2

            },
            tooltip: {
              show: true
            },
            areaStyle: { //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "rgba(25,163,223,.3)"


                },
                {
                  offset: 1,
                  color: "rgba(25,163,223, 0)"
                }
                ], false),
                shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: this.dataNum
          }]
        }

        let index = 0
        this.t1 = setInterval(() => {
          myChart.dispatchAction({
            type: 'showTip',
            // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
            seriesIndex: 0,
            // 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
            dataIndex: index

          })
          index++
          if (index >= data.length) {
            index = 0
          }
        }, 5000)
        myChart.resize()
        myChart.setOption(option, true)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      })
    },
    drawLine2 (d1, d2, d3) {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartLine2'))
        let xLabel = d1
        let goToSchool = d3
        let goOutSchool = d2
        let nameData = [{ name: '当期利润' }, { name: '预算利润' }]

        let option = {
          title: {
            text: '利润(万元)',
            textStyle: {
              color: 'white'
            },
            top: this.titleTop,
            left: this.titleLeft
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'transparent',
            axisPointer: {
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(126,199,255,0)' // 0% 处的颜色
                  }, {
                    offset: 0.5,
                    color: 'rgba(126,199,255,1)' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(126,199,255,0)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
            }
          },
          legend: {
            align: "left",
            right: '5%',
            top: '5%',
            type: 'plain',
            textStyle: {
              color: '#7ec7ff',
              fontSize: 18
            },
            // icon:'rect',
            itemGap: 25,
            itemWidth: 18,
            icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
            data: nameData
          },
          grid: {
            top: '15%',
            left: '15%',
            right: '5%',
            bottom: '20%',
            // containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: '#233653'
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              interval: 0,
              rotate: 35,
              textStyle: {
                color: '#7ec7ff',
                padding: 16,
                fontSize: 12
              },
              formatter: function(data) {
                return data
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#192a44'
              },
            },
            axisTick: {
              show: false,
            },
            data: xLabel
          }],
          yAxis: [{
            splitLine: {
              show: true,
              lineStyle: {
                color: '#192a44'
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#233653"
              }

            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7ec7ff',
                padding: 1,
                fontSize: 18
              },
              formatter: function(value) {
                if (value === 0) {
                  return value
                }
                return value
              }
            },
            axisTick: {
              show: false,
            },
          }],
          series: [
            {
              name: '当期利润',
              symbol: 'circle',
              symbolSize: 8,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#00a0e9',
                  lineStyle: {
                    width: 2//设置线条粗细
                  },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0.4,
                      color: 'rgba(0,168,255,0.0)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(0,160,233,0.3)'
                    }])
                  }
                }
              },
              data: goToSchool
            }, {
              name: '预算利润',
              type: 'line',
              symbol: 'circle',
              symbolSize: 8,
              itemStyle: {
                normal: {
                  color: '#ce5a60',
                  lineStyle: {
                    width: 2,//设置线条粗细
                  },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                      offset: 0.4,
                      color: 'rgba(247,71,83,0.0)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(247,71,83,0.3)'
                    }])
                  }
                }
              },
              data: goOutSchool
            }
          ]
        }
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
