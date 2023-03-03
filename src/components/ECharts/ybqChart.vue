<template>
  <div id="myChartybp" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
import { getCompanyTakingAndRateForFiveYear, selectFinTakingAndRateMonth2 } from '../../api/api'
export default {
  name: "zczeBt",
  data () {
    return {
      bgColor: 'rgb(0,0,0,0)',
      data1: [],
      min: '30000',
      rateIncreaseList: [],
      text: '历年资产总额(万元)',
      // yearData: [ '2017年','2018年', '2019年', '2020年', '2021年']
      yearData: ['2017年', '2018年', '2019年', '2020年', '2021年']
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
      this.data1 = []
      this.rateIncreaseList = []
      if (this.path === '/cw-primaryIndex') {
        this.text = '历年资产总额(万元)'
        this.min = '300000'
        getCompanyTakingAndRateForFiveYear().then((res) => {
          this.yearData = []
          let yData = []
          res.data.data.forEach((item) => {
            yData.push(item.year + '年')
            this.data1.push(item.taking)
            this.rateIncreaseList.push(item.rateIncrease)
            // rateIncrease
          })
          this.yearData = yData.reverse()
          this.data1 = this.data1.reverse()
          this.rateIncreaseList = this.rateIncreaseList.reverse()
          this.drawLine()
        })
      } else {
        this.min = '0'
        this.text = '资产总额(万元)'
        selectFinTakingAndRateMonth2(this.$store.state.fgsSelValue).then((res) => {
          this.data1 = []
          this.rateIncreaseList = []
          // rateIncreaseList: [],
          this.yearData = res.data.data.monthList
          res.data.data.list.forEach((item) => {
            this.data1.push(item.taking)
            this.rateIncreaseList.push(item.rateIncrease)
          })
          this.drawLine()
        })
      }
    },
    drawLine (val) {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartybp'))
        var color = ['#00ffff', '#409B5C', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']
        // 总饼图
        let option = {
          title: {
            left: '0%',
            top: '3%',
            text: this.text,
            textStyle: {
              color: 'white',
              fontSize: 18
            }
          },
          grid: {
            top: '15%',
            left: '2%',
            right: '1%',
            bottom: '8%',
            containLabel: true,
          },
          backgroundColor: this.bgColor,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true,
              },
            },
            formatter (params) {
              var data = ''
              for (var i = 0; i < params.length; i++) {
                if (params[i].seriesName == '增长率') {
                  data += params[i].seriesName + ':  ' + params[i].value + ''
                } else {
                  data += params[i].seriesName + ':  ' + params[i].value + '<br/>'
                }
              }
              return data
            },
          },
          legend: {
            // data: ['资产总额', '增长率'],
            data: ['资产总额'],
            top: '2%',
            left: 'right',
            textStyle: {
              color: 'white',
              fontSize: 18
            },
          },
          xAxis: {
            type: 'category',
            data: this.yearData,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 14,
                color: 'white', //X轴文字颜色
              },
            },
          },
          yAxis: [
            {
              type: 'value',
              min: this.min,
              nameTextStyle: {
                color: 'white',
                fontSize: 16
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#eeeeee',
                },
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'white',
                  fontSize: 16,
                },
              },
            },
            {
              type: 'value',
              name: '(%)',
              max: 100,
              nameTextStyle: {
                color: 'white',
                padding: [0, 0, 0, 40], // 四个数字分别为上右下左与原位置距离
                fontSize: 16
              },
              position: 'right',
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'white',
                  fontSize: 16,
                },
              },
            },
            {
              type: 'value',
              gridIndex: 0,
              min: 0,
              max: 100,
              splitNumber: 8,
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              splitArea: {
                show: false,
                areaStyle: {
                  color: ['white', 'rgba(250,250,250,0.05)'],
                },
              },
            },
          ],
          series: [
            {
              name: '资产总额',
              type: 'bar',
              barWidth: 40,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                      color: '#4ccad9',
                      fontSize: 12
                    }
                  },
                  color: '#137abb',
                },
              },
              // data: [265499.89, 318082.35, 340600.73, 338332.73, 344735.37],
              data: this.data1,
              // itemStyle: {
              //   normal: {
              //     label: {
              //       show: true, //开启显示
              //       position: 'top', //在上方显示
              //       textStyle: { //数值样式
              //         color: 'black',
              //         fontSize: 16
              //       }
              //     }
              //   }
              // },
            },
            {
              name: '资产增长率',
              type: 'line',
              yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
              showAllSymbol: true, //显示所有图形。
              symbol: 'circle', //标记的图形为实心圆
              symbolSize: 8, //标记的大小
              itemStyle: {
                //折线拐点标志的样式
                color: '#f3454b',
                borderWidth: '2',
                borderColor: '#f3454b',
              },
              lineStyle: {
                color: '#f3454b',
              },
              data: this.rateIncreaseList,
            },
          ],
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
