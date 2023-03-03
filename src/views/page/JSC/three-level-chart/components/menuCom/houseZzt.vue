<template>
  <div id="myChartHouse" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import echarts from "echarts"

export default {
  name: "histogramChart",
  data () {
    return {
      show: true,
    }
  },
  mounted () {
    this.drawLine1()
    // Districts
  },
  methods: {
    // 房屋种类
    drawLine1 () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartHouse'))
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            textStyle: {
              color: '#CFE3FC',
            },
            borderWidth: 1,
          },
          grid: {
            top: '15%',
            right: '10%',
            left: "10%",
            bottom: '12%'
          },
          xAxis: [{
            type: 'category',
            data: ["普通房", "商务房"],
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisLabel: {
              margin: 10,
              color: '#e2e9ff',
              textStyle: {
                fontSize: 16
              },
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [{
            name: "数量（间）",
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
            data: [70, 200],
            barWidth: '20%',
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
