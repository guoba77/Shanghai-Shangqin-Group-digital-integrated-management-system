<template>
  <div
    id="myChartHorizontalChart"
    :style="{ width: '100%', height: '100%' }"
  ></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: "zczeBt",
  data () {
    return {
      text: '员工职级人数占比',
      path: '',
      salvProNameData: ['高级', '中级', '初级', '主级', '副级'],
      salvProValueData: [239, 181, 154, 144, 135],
      titleLeft: 'center',
      titleTop: '0%',
      // bgColor: '#003366',
      bgColor: 'rgb(0,0,0,0)',
      color: 'skyblue'
    }
  },
  created () {
    this.path = this.$route.path
    if (this.path === '/dj-primaryIndex') {
      this.text = '党员发展情况'
      this.salvProNameData = ['2017', '2018', '2019', '2020', '2021']
      this.salvProValueData = [239, 481, 754, 844, 1035]
      this.bgColor = 'rgb(0,0,0,0)'
      this.color = 'yellow'
    } else if (this.path === '/threeMenuIndex') {
      if (this.$route.query.sjName === '党建') {
        this.text = '党员发展情况'
        this.salvProNameData = ['2017', '2018', '2019', '2020', '2021']
        this.salvProValueData = [239, 481, 754, 844, 1035]
        this.bgColor = 'rgb(0,0,0,0)'
        this.color = 'yellow'
      }
    }
  },
  watch: {
    "$store.state.bkObj" (val, oldVal) {
      this.salvProValueData = val.djList.sData
      this.drawLine()
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChartHorizontalChart'))
      var salvProName = this.salvProNameData
      var salvProValue = this.salvProValueData
      var salvProMax = []//背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }

      let option = {
        title: {
          left: this.titleLeft,
          top: this.titleTop,
          text: this.text,
          textStyle: {
            color: this.color
          }
        },
        backgroundColor: this.bgColor,
        grid: {
          left: '2%',
          right: '2%',
          bottom: '0%',
          top: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function(params) {
            return params[0].name + ' : ' + params[0].value
          }
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: salvProName
        }, {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '12'
            },
          },
          data: salvProValue
        }],
        series: [{
          name: '值',
          type: 'bar',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgb(57,89,255,1)'
              }, {
                offset: 1,
                color: 'rgb(46,200,207,1)'
              }]),
            },
          },
          barWidth: 20,
          data: salvProValue
        },
        {
          name: '背景',
          type: 'bar',
          barWidth: 20,
          barGap: '-100%',
          data: salvProMax,
          itemStyle: {
            normal: {
              color: 'rgba(0,0,0,0)',
              barBorderRadius: 30,
            }
          },
        },
        ]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>
</style>
