<template>
  <div id="myChartLine" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
import { getCompanyThisYearEachMonthTakingFigure, RsYgQs, RsYgQs2 } from '../../api/api'
export default {
  name: "zczeBt",
  data () {
    return {
      text: '营业收入',
      text111: '营业收入',
      path: '',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      dataNum: [],
      titleLeft: '0%',
      titleTop: '0%',
      bgColor: 'rgb(0,0,0,0)',
      color: 'white',
      labelColor: 'white',
      lineColor: 'white',
      lenData: [{ name: '上学' }],
      nameData: [{ name: '在编在岗' }, { name: '劳务派遣' }, { name: '其他从业' }, { name: '服务外包' }],
      // dataName: ['2017年', '2018年', '2019年', '2020年', '2021年'],
      dataName: [],
      goToZbzg: [],
      goToLwpq: [],
      goToQtcy: [],
      goToFwwb: []
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
  },
  methods: {
    onSHow () {
      this.dataName = []
      this.goToZbzg = []
      this.goToLwpq = []
      this.goToQtcy = []
      this.goToFwwb = []
      if (this.$route.path === '/rs-primaryIndex') {
        setTimeout(() => {
          RsYgQs().then((res) => {
            console.log(res)
            if (res.data.code === 0 && res.data.data.length !== 0) {
              res.data.data.forEach((item) => {
                this.dataName.push(item.year + '年')
                item.blocList.forEach((ttem) => {
                  if (ttem.name === '在编在岗') {
                    this.goToZbzg.push(ttem.value)
                  } else if (ttem.name === '劳务派遣') {
                    this.goToLwpq.push(ttem.value)
                  } else if (ttem.name === '其它从业') {
                    this.goToQtcy.push(ttem.value)
                  } else if (ttem.name === '服务外包') {
                    this.goToFwwb.push(ttem.value)
                  }
                })
              })
            }
            this.drawLine1()
          })
        }, 100)
      } else if (this.$route.path === '/threeMenuIndex' && this.$store.state.zgsBut === '人事') {
        setTimeout(() => {
          RsYgQs2(this.$store.state.fgsSelValue).then((res) => {
            if (res.data.code === 0 && res.data.data.length !== 0) {
              res.data.data.forEach((item) => {
                this.dataName.push(item.year + '年')
                item.blocList.forEach((ttem) => {
                  if (ttem.name === '在编在岗') {
                    this.goToZbzg.push(ttem.value)
                  } else if (ttem.name === '劳务派遣') {
                    this.goToLwpq.push(ttem.value)
                  } else if (ttem.name === '其它从业') {
                    this.goToQtcy.push(ttem.value)
                  } else if (ttem.name === '服务外包') {
                    this.goToFwwb.push(ttem.value)
                  }
                })
              })
            }
            this.drawLine1()
          })
        }, 100)
      } else if (this.$route.path === '/cw-primaryIndex') {
        getCompanyThisYearEachMonthTakingFigure().then((res) => {
          let resData = res.data.data.reverse()
          let data1 = []
          let data2 = []
          let data3 = []
          resData.forEach((item) => {
            data1.push(item.month + '月')
            item.subjectFigureList.forEach((ttem) => {
              if (ttem.subject === '营收预算') {
                data2.push(ttem.figure)
              } else {
                if (ttem.subject === '营业收入') {
                  data3.push(ttem.figure)
                }
              }
            })
          })
          this.drawLine2(data1, data2, data3)
        })
      } else if (this.$route.path === '/threeMenuIndex' && this.$store.state.zgsBut === '财务') {
        getCompanyThisYearEachMonthTakingFigure(this.$store.state.fgsSelValue).then((res) => {
          let resData = res.data.data.reverse()
          let data1 = []
          let data2 = []
          let data3 = []
          resData.forEach((item) => {
            data1.push(item.month + '月')
            if (item.subjectFigureList.length === 1) {
              item.subjectFigureList.forEach((ttem) => {
                data2.push(null)
                if (ttem.subject === '营业收入') {
                  data3.push(ttem.figure)
                }
              })
            } else {
              item.subjectFigureList.forEach((ttem) => {
                if (ttem.subject === '营收预算') {
                  data2.push(ttem.figure)
                } else {
                  if (ttem.subject === '营业收入') {
                    data3.push(ttem.figure)
                  }
                }
              })
            }
          })
          this.drawLine2(data1, data2, data3)
        })
      } else {
        getCompanyThisYearEachMonthTakingFigure().then((res) => {
          let resData = res.data.data.reverse()
          let data1 = []
          let data2 = []
          let data3 = []
          resData.forEach((item) => {
            data1.push(item.month + '月')
            if (item.subjectFigureList.length === 1) {
              item.subjectFigureList.forEach((ttem) => {
                data2.push(null)
                if (ttem.subject === '营业收入') {
                  data3.push(ttem.figure)
                }
              })
            } else {
              item.subjectFigureList.forEach((ttem) => {
                if (ttem.subject === '营收预算') {
                  data2.push(ttem.figure)
                } else {
                  if (ttem.subject === '营业收入') {
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
        let myChart = echarts.init(document.getElementById('myChartLine'))
        let option = {
          backgroundColor: this.bgColor,
          title: {
            text: this.text,
            textStyle: {
              color: this.color
            },
            top: this.titleTop,
            left: this.titleLeft
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
              normal: { label: { show: true } },
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
          if (index >= this.data.length) {
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
    drawLine1 () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartLine'))
        let xLabel = this.dataName
        // let goToZbzg = [1781, 1781, 1752, 1596, 1681]
        // let goToLwpq = [964, 964, 1106, 1107, 1097]
        // let goToQtcy = [196, 196, 178, 208, 200]
        let goOutSchool2 = []
        for (let i = 1; i <= 6; i++) {
          goOutSchool2.push(Math.floor(Math.random() * (1000 - 500 + 1)))
        }
        let nameData = this.nameData
        let option = {
          title: {
            left: '15%',
            top: '0%',
            // text: '上勤集团公司员工趋势',
            textStyle: {
              color: 'skyblue',
              fontSize: '16px'
            }
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
            itemWidth: 18,
            itemHeight: 8,
            icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',

            data: nameData
          },
          grid: {
            top: '15%',
            left: '10%',
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
                color: 'white'
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
            data: xLabel
          }],
          yAxis: [{
            name: '员工趋势',
            nameTextStyle: {
              color: "#7ec7ff",
              fontSize: 18,
              padding: 10
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#192a44'
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "white"
              }

            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'white',
                fontSize: 16,
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
            name: '在编在岗',
            data: this.goToZbzg,
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            connectNulls: true,
            lineStyle: {
              color: '#FF8736'
            },
            itemStyle: {
              normal: {
                color: 'rgb(247, 197, 3)',
                lineStyle: {
                  width: 5
                }
              }
            }
          },
          {
            name: '劳务派遣',
            data: this.goToLwpq,
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            connectNulls: true,
            lineStyle: {
              color: '#18cedf'
            },
            itemStyle: {
              normal: {
                color: '#00a0e9',
                lineStyle: {
                  width: 5
                }
              }
            },
          }, {
            name: '其他从业',
            data: this.goToQtcy,
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            connectNulls: true,
            lineStyle: {
              color: '#ed0c0c'
            },
            itemStyle: {
              normal: {
                color: '#ce5a60',
                lineStyle: {
                  width: 5
                }
              }
            },
          }, {
            name: '服务外包',
            data: this.goToFwwb,
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            connectNulls: true,
            lineStyle: {
              color: 'aquamarine'
            },
            itemStyle: {
              normal: {
                color: 'aquamarine',
                lineStyle: {
                  width: 5
                }
              }
            },
          },
          ]
        }
        let len = 0
        let Interval = setInterval(() => {
          if (len === xLabel.length) {
            len = 0
          }
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: len,
          })
          len++
        }, 1000)
        myChart.on('mouseover', (params) => { // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
          window.clearInterval(Interval)
        })

        myChart.on('mouseout', (params) => { // 用户鼠标移出时，重新开始自动切换
          if (Interval)
            window.clearInterval(Interval)
          Interval = setInterval(() => {
            if (len === xLabel.length) {
              len = 0
            }
            myChart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: len,
            })
            len++
          }, 1000)
        })

        myChart.resize()
        myChart.setOption(option, true)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      })
    },
    drawLine2 (d1, d2, d3) {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartLine'))
        let xLabel = d1
        let goToSchool = d3
        let goOutSchool = d2
        // for(let i = 1; i<= 12; i ++) {
        //   goToSchool.push(Math.floor(Math.random()*(1000-500+1)))
        //   goOutSchool.push(Math.floor(Math.random()*(1000-500+1)))
        // }
        let nameData = [{ name: '当期营收' }, { name: '预算营收' }]

        let option = {
          title: {
            text: '营业收入(万元)',
            textStyle: {
              color: this.color
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
              name: '当期营收',
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
              name: '预算营收',
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

        // let len = 0
        // setInterval(() => {
        //   if (len === xLabel.length) {
        //     len = 0
        //   }
        //   myChart.dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: len,
        //   })
        //   len++
        // }, 1000)

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
