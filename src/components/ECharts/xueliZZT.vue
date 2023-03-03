<template>
  <div id="myChartXL" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import { RsXlFb, RsXlFb2 } from '../../api/api'
import echarts from "echarts"
export default {
  name: "xueliZZT",
  data () {
    return {
      // ["研究生及以上","大学本科","大学专科","高中或其他"],
      nameData: [],
      valData: [],
      path: ''
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
      setTimeout(() => {
        this.nameData = []
        this.valData = []
        if (this.path === '/rs-primaryIndex') {
          RsXlFb().then((res) => {
            if (res.data.code === 0) {
              res.data.data.forEach((item) => {
                this.nameData.push(item.degreeName)
                this.valData.push(item.countUser)
                this.drawLine()
              })
            }
          })
        } else if (this.path === '/threeMenuIndex' && this.$store.state.zgsBut === '人事') {
          RsXlFb2(this.$store.state.fgsSelValue).then((res) => {
            if (res.data.code === 0) {
              res.data.data.forEach((item) => {
                this.nameData.push(item.degreeName)
                this.valData.push(item.countUser)
                this.drawLine()
              })
            }
          })
        }
      }, 100)
    },
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartXL'))
        var colorList = ['#39B3FF', '#47E0E0', '#7891D9', '#83D978', '#C7A530', '#FF8439']

        let option = {
          backgroundColor: "rgba(0, 0, 0, 0)",
          title: {
            text: '学历分布',
            textStyle: {
              align: 'center',
              color: 'white',
              fontSize: 18,
            },
            top: '0%',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(75, 253, 238, 0.4)',
            textStyle: {
              color: '#CFE3FC',
            },
            borderWidth: 1,
          },
          grid: {
            top: '10%',
            right: '5%',
            left: "10%",
            bottom: '15%'
          },
          xAxis: [{
            type: 'category',
            data: this.nameData,
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisLabel: {
              rotate: 0,
              margin: 10,
              color: '#e2e9ff',
              textStyle: {
                fontSize: 14
              },
              formatter: function(params) {
                var newParamsName = ""
                var paramsNameNumber = params.length
                var provideNumber = 4 //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""
                    var start = p * provideNumber
                    var end = start + provideNumber
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + "\n"
                    }
                    newParamsName += tempStr
                  }
                } else {
                  newParamsName = params
                }
                return newParamsName
              }
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [{
            name: "人数（人）",
            nameTextStyle: {
              fontSize: 16
            },
            axisLabel: {
              formatter: '{value}',
              color: '#e2e9ff',
              fontSize: 16
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.12)'
              }
            }
          }],
          series: [{
            type: 'bar',
            data: this.valData,
            barWidth: '30%',
            itemStyle: {    //柱状颜色和圆角
              color: '#3a7fea',
              barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
            },
            label: {
              normal: {
                show: true,
                lineHeight: 10,
                formatter: '{c}',
                position: 'top',
                textStyle: {
                  color: '#00D6F9',
                  fontSize: 16
                }

              }
            }
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
