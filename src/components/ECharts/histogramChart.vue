<template>
  <div id="myChartZGS" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import echarts from "echarts"
import { getMothzz, getMothzz2 } from '@/api/api.js'
export default {
  name: "histogramChart",
  data () {
    return {
      // data: ['高级楼宇', '上勤物业', '上勤餐饮','锦勤汽服', '上勤酒店', '名人苑', '景苑酒店','上勤实业'],
      data: [],
      sjData1: [],
      sjData2: [],
      sjData3: [],
      nameData: ['营业收入', '成本费用', '利润总额'],
      text: '子公司指标'
    }
  },
  props: {
    monthData: Array
  },
  created () {
    this.path = this.$route.path
    // for(let i=1; i<= 12; i++){
    //   this.sjData1.push(Math.floor(Math.random()*(1000-100+1)))
    //   this.sjData2.push(Math.floor(Math.random()*(1000-100+1)))
    //   this.sjData3.push(Math.floor(Math.random()*(1000-100+1)))
    // }
  },
  watch: {
    "$store.state.bkObj" (val, oldVal) {
      this.sjData1 = val.rsList.data1
      this.sjData2 = val.rsList.data2
      this.sjData3 = val.rsList.data3
      if (this.$store.state.tagName === '财务') {
        this.drawLine()
      } else if (this.$store.state.tagName === '人事') {
        this.drawLine1()
      }

    },
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        this.getMonthData()
      },
      // 立即监听
      immediate: true,
    },
    monthData (newVal, oldVal) {
      if (this.path != '/threeMenuIndex') {
        this.sjData1 = []
        this.sjData2 = []
        this.sjData3 = []
        this.data = []
        newVal.forEach((item) => {
          this.data.push(item.companyName)
          for (var i = 0; i < item.subjectFigureList.length; i++) {
            if (item.subjectFigureList[i].subject === '营业收入') {
              this.sjData1.push(item.subjectFigureList[i].figure)
            } else if (item.subjectFigureList[i].subject === '利润总额') {
              this.sjData2.push(item.subjectFigureList[i].figure)
            } else if (item.subjectFigureList[i].subject === '成本情况') {
              this.sjData3.push(item.subjectFigureList[i].figure)
            }
          }
          this.drawLine()
        })
      } else {
        this.drawLine()
      }
    }
  },
  mounted () {
    if (this.path === '/rs-primaryIndex' || this.$store.state.tagName === '人事') {
      if (this.$store.state.dxName === '人事') {
        this.text = '人数统计'
        this.drawLine1()
      } else if (this.$store.state.dxName === '财务') {
        this.text = '各公司指标'
        this.data = [1, 2, 3, 4, 5, 6]
        this.drawLine()
      } else {
        this.sjData1 = []
        this.$axios.get(this.baseUrl + 'bloc/blocpersonneluserinfo/userStatisticByYear', {
          headers: { 'token': localStorage.getItem('token') },
          params: {
            year: 2022
          }
        }).then((res) => {
          for (let i in res.data.data) {
            this.sjData1.push(res.data.data[i].on)
          }
          this.text = '人事指标'
          this.drawLine1()
        })
      }
    } else if (this.path === '/cw-primaryIndex' || this.$store.state.tagName === '财务') {
      if (this.$store.state.dxName === '人事') {
        this.text = '人数统计'
        setTimeout(() => {
          this.drawLine1()
        }, 100)
      } else if (this.$store.state.dxName === '财务') {
        this.text = ''
        this.drawLine()
      } else {
        this.drawLine()
      }
    } else if (this.path === '/menuBk') {
      if (this.$store.state.dxName === '人事') {
        this.text = '人数统计'
        this.drawLine1()
      } else if (this.$store.state.dxName === '财务') {
        this.text = '子公司收入'
        this.drawLine()
      } else {
        this.getMonthData()
      }
    }
  },
  methods: {
    // 获取12月份数据
    async getMonthData () {
      if (this.$route.path === '/threeMenuIndex' && this.$store.state.zgsBut === '财务') {
        this.sjData1 = []
        this.sjData2 = []
        this.sjData3 = []
        const res = await getMothzz2(this.$store.state.fgsSelValue)
        if (res.data.data) {
          res.data.data.forEach((item) => {
            this.sjData1.push(item.subjectFigureList[0].figure)
            this.sjData2.push(item.subjectFigureList[1].figure)
            this.sjData3.push(item.subjectFigureList[2].figure)
            this.data.push(item.month)
          })
          this.drawLine()
        }
      }
    },
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartZGS'))
        // 总柱状图
        let option = {
          title: {
            text: this.text,
            textStyle: {
              color: 'white'
            },
            top: '5%',
            left: '0%'
          },
          backgroundColor: 'rgb(0,0,0,0)',
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0%',
            right: '2%',
            bottom: '2%',
            top: '15%',
            containLabel: true
          },
          legend: {
            data: this.nameData,
            right: 10,
            top: 12,
            textStyle: {
              color: "#fff",
              fontSize: 18
            },
            itemWidth: 12,
            itemHeight: 10,
            // itemGap: 35
          },
          xAxis: {
            type: 'category',
            data: this.data,
            axisLine: {
              lineStyle: {
                color: 'white',
                fontSize: '12px'
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40,//倾斜的程度
              // rotate: this.path != '/threeMenuIndex' ? 40 : 0,
              textStyle: {
                fontFamily: 'Microsoft YaHei'
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: 'white'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.3)'
              }
            },
            axisLabel: {}
          },
          series: [{
            name: this.nameData[0],
            type: 'bar',
            barWidth: '20%',
            data: this.sjData1,
            itemStyle: {    //柱状颜色和圆角
              color: '#3a7fea',
              barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
            },
          },
          {
            name: this.nameData[1],
            type: 'bar',
            barWidth: '20%',
            data: this.sjData3,
            itemStyle: {    //柱状颜色和圆角
              color: '#91CC75',
              barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
            },
          },
          {
            name: this.nameData[2],
            type: 'bar',
            barWidth: '20%',
            data: this.sjData2,
            itemStyle: {    //柱状颜色和圆角
              color: '#FAC858',
              barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
            },
          }]
        }
        myChart.resize()
        myChart.setOption(option, true)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      })
    },
    drawLine1 () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartZGS'))
        // 人事柱状图
        let rsOption = {
          title: {
            left: 'center',
            top: '5%',
            text: this.text,
            textStyle: {
              color: 'skyblue'
            }
          },
          // backgroundColor: '#323a5e',
          backgroundColor: 'rgb(0,0,0,0)',
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '3%',
            top: '16%',
            containLabel: true
          },
          legend: {
            data: ['人数'],
            right: 10,
            top: 12,
            textStyle: {
              color: "#fff"
            },
            itemWidth: 12,
            itemHeight: 10,
            // itemGap: 35
          },
          xAxis: {
            type: 'category',
            data: this.data,
            axisLine: {
              lineStyle: {
                color: 'white',
                fontSize: '12px'
              }
            },
            axisLabel: {
              // interval: 0,
              // rotate: 40,
              textStyle: {
                fontFamily: 'Microsoft YaHei'
              }
            },
          },

          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: 'white'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.3)'
              }
            },
            axisLabel: {}
          },
          series: [{
            name: '人数',
            type: 'bar',
            barWidth: '35%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#248ff7'
                }, {
                  offset: 1,
                  color: '#6851f1'
                }]),
                barBorderRadius: 11,
              }
            },
            data: this.sjData1
          }]
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
