<template>
  <div id="sjxt2" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: true
    }
  },
  mounted () {
    this.drawLine()
  },
  computed: {
    getStoreItem () {
      return this.$store.state.switchShow
    }
  },
  watch: {
    getStoreItem () {
      this.show = this.$store.state.switchShow
      this.drawLine()
    }
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('sjxt2'))
      let type = ['单位支出', '支出']
      // 绘制图表
      myChart.setOption({
        title: {
          left: 'center',
          top: '5%',
          text: '月度收缴比例',
          textStyle: {
            color: 'white'
          }
        },
        backgroundColor: '#031d33',
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: ["长宁区", "黄埔区", '静安区', '浦东新区', '松江区'],
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            //	margin:15,
            textStyle: {
              color: "#65D5FF",
              fontStyle: "normal",
              fontSize: 16
            }
          },
          axisTick: {
            //坐标轴刻度相关设置。
            show: false
          },
          axisLine: {
            //坐标轴轴线相关设置
            lineStyle: {
              color: "rgba(77, 128, 254, 0.2)"
            }
          },
          splitLine: {
            //坐标轴在 grid 区域中的分隔线。
            show: true,
            lineStyle: {
              color: "rgba(77, 128, 254, 0.2)"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: "#65D5FF",
                fontStyle: "normal",
                fontSize: 16
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(77, 128, 254, 0.2)"
              }
            }
          }
        ],
        series: [
          {
            name: '1月',
            type: "pictorialBar",
            barWidth: "60%",
            stack: "总量",
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0, 151, 251, 1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0, 34, 66, 0.2)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                } //渐变颜色
              }
            },
            symbol:
              "path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z",

            data: [23, 84, 100, 74, 87]
          }],
      }, true)
    }
  }
}
</script>

<style scoped>
</style>
