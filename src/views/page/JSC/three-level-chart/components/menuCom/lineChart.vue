<template>
  <div id="myChartLine" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
import { selectRentalMonthRate } from '@/api/api.js'
export default {
  name: "zczeBt",
  data () {
    return {
      text: '营业收入',
      text111: '营业收入',
      path: '',
      dataNum: [820, 932, 901, 934, 1290, 1330, 1320, 2000, 3000, 4000, 5000, 6000],
      titleLeft: '0%',
      titleTop: '0%',
      bgColor: 'rgb(0,0,0,0)',
      color: 'white',
      pathName: '全部',
      nameData: [],
      // dataName: ['2017年', '2018年', '2019年', '2020年', '2021年'],
      dataName: [],
      goToZbzg: [],
      goToLwpq: [],
      goToQtcy: []
    }
  },
  created () {
    this.path = this.$route.path
    this.dataNum = []
    this.pathName = this.$route.query.name
  },
  watch: {
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        if (val === '上海上勤酒店管理有限公司') {
          setTimeout(() => {
            this.getCharts()
            // this.drawLine1()
            // this.goToZbzg = [10, 20, 30, 40, 10, 20, 30, 40, 10, 20, 30, 40]
            // this.goToLwpq = [80, 50, 10, 40, 10, 30, 30, 40, 30, 20, 20, 40]
            // this.goToQtcy = [30, 60, 20, 10, 10, 10, 30, 40, 40, 20, 30, 40]
            // this.drawLine1()
          }, 100)
        }
      },
      // 立即监听
      immediate: true,
    },
  },
  mounted () {
    // this.dataName = ['2022-1月', '2022-2月', '2022-3月', '2022-4月', '2022-5月', '2022-6月', '2022-7月', '2022-8月', '2022-9月', '2022-10月', '2022-11月', '2022-12月']

  },
  methods: {
    getCharts () {
      this.goToZbzg = []
      this.goToLwpq = []
      this.goToQtcy = []
      if (this.$store.state.fgsSelValue === '上海上勤酒店管理有限公司') {
        selectRentalMonthRate(this.$store.state.fgsSelValue).then((res) => {
          if (res.data.code === 0 && res.data.data.list !== null) {
            this.dataName = res.data.data.timeList
            res.data.data.list.forEach((item) => {
              const obj = {}
              obj.name = item.subsidiaryName
              this.nameData.push(obj)
            })
            res.data.data.list[0].rentalRateList.forEach(item => {
              this.goToZbzg.push(parseInt(item))
            })
            res.data.data.list[1].rentalRateList.forEach(item => {
              this.goToLwpq.push(parseInt(item))
            })
            res.data.data.list[2].rentalRateList.forEach(item => {
              this.goToQtcy.push(parseInt(item))
            })
            // this.goToZbzg = res.data.data.list[0].rentalRateList
            // this.goToLwpq = res.data.data.list[1].rentalRateList
            // this.goToQtcy = res.data.data.list[2].rentalRateList
            // res.data.data.list.forEach(item => {
            this.drawLine1()
          }


          // })
        })
        // this.drawLine1()
        // this.goToZbzg = [10, 20, 30, 40, 10, 20, 30, 40, 10, 20, 30, 40]
        // this.goToLwpq = [80, 50, 10, 40, 10, 30, 30, 40, 30, 20, 20, 40]
        // this.goToQtcy = [30, 60, 20, 10, 10, 10, 30, 40, 40, 20, 30, 40]
        // this.drawLine1()
      }
    },
    drawLine1 () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartLine'))
        let xLabel = this.dataName
        let nameData = this.nameData
        let option = {
          title: {
            left: '0%',
            top: '0%',
            // bottom: '30%',
            textStyle: {
              color: 'white',
              fontSize: '16px'
            }
          },
          tooltip: {
            // formatter: '{c}%',
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
              fontSize: 16
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
            axisLabel: {
              //坐标轴刻度标签的相关设置
              interval: 0,
              rotate: 60,//倾斜的程度
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
            max: 100,
            name: '出租率(%)',
            nameTextStyle: {
              color: "#7ec7ff",
              fontSize: 16,
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
            name: this.nameData[0].name,
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
            name: this.nameData[1].name,
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
            name: this.nameData[2].name,
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
  }
}
</script>

<style scoped>
</style>
