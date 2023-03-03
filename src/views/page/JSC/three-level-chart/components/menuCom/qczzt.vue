<template>
  <div id="myChartQc" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import echarts from "echarts"
// import moduleName from 'module'
import { selectCarTypeNum } from '@/api/api.js'
export default {
  name: "histogramChart",
  data () {
    return {
      show: true,
      xdata: [],
      data: []
    }
  },
  mounted () {
    selectCarTypeNum(this.$store.state.fgsSelValue).then((res) => {
      this.xdata = []
      this.data = []
      if (res.data.code === 0) {
        res.data.data.forEach(item => {
          this.xdata.push(item.name)
          this.data.push(item.value)
        })
        this.drawLine2()
      }
    })
  },
  methods: {
    // 汽车种类
    drawLine2 () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartQc'))
        var xdata = this.xdata
        var data = this.data
        let option = {
          backgroundColor: "rgba(0,0,0,0)", //背景色
          title: {
            show: true,
            text: '其他汽车种类(辆)',
            textStyle: {
              align: 'center',
              color: '#fff',
              fontSize: 16,
            },
            top: '0%',
            left: 'center',
          },
          tooltip: {
            trigger: "axis",
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            // borderRadius: 5,
            // borderColor: "#6baab2",
            // borderWidth: 1,
            formatter: function(params) { // params[0].data.nameCode
              let dot = '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:#02C4DD"></span>'
              return (
                params[0].name +
                "<br>" +
                "车辆数量 ：" +
                params[0].value
              )
            }
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "3%",
            top: "15%",
            containLabel: true
          },
          xAxis: {
            data: xdata,
            triggerEvent: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 40,
              // rotate: 0,
              interval: 0,
              textStyle: {
                padding: [14, 0, 0, 0],
                fontSize: 14,
                color: "rgba(255,255,255,1)"
              }
            }
          },
          yAxis: {
            triggerEvent: true,
            name: '(辆)',
            nameTextStyle: {
              color: "rgba(255,255,255,1)",
              fontSize: 16,
              padding: [0, 0, 0, 0]
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgb(148,159,167)",
                fontSize: 16
              }
            }
          },
          // color: ["#e54035"],
          series: [{
            name: "数量",
            barMinHeight: 10,
            type: "pictorialBar",
            barCategoryGap: "60%",
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              normal: {
                //barBorderRadius: 5,
                //渐变色
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "#01EAED"
                },
                {
                  offset: 0.5,
                  color: "#02C4DD"
                },
                {
                  offset: 1,
                  color: "#029ED9"
                }
                ])
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize: 20
                }
              }
            },
            data: data,
            z: 10
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
