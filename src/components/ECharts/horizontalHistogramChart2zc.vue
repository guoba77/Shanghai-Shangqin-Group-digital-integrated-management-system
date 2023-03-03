<template>
  <div
    id="myChartHorizontalChart2"
    :style="{ width: '100%', height: '100%' }"
  ></div>
</template>

<script>
import { getStatisticsRentalArea } from '@/api/api'
import echarts from 'echarts'
export default {
  name: "zczeBt",
  data () {
    return {
      text: '人产均值',
      path: '',
      salvProNameData: ['高级', '中级', '初级', '主级', '副级'],
      salvProValueData: [239, 181, 154, 144, 135],
      titleLeft: 'center',
      titleTop: '0%',
      bgColor: '#003366',
      color: 'white',
      regionList: [],
      regionVal: []
    }
  },
  mounted () {
    setTimeout(() => {
      getStatisticsRentalArea().then((res) => {
        if (res.data.code === 0) {
          res.data.data.forEach((item) => {
            this.regionList.push(item.regionName)
            this.regionVal.push(item.area)
          })
        }
        this.drawLine()
      })
    }, 500)
  },
  methods: {
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartHorizontalChart2'))
        let option = {
          title: {
            left: 'center',
            top: '2%',
            text: '租赁情况(平方米)',
            textStyle: {
              color: 'white'
            }
          },
          grid: {
            left: '3%',
            right: '12%',
            bottom: '5%',
            top: '5%',
            containLabel: true,
          },
          barWidth: 15,
          xAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.2)",
                type: 'dashed'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: { //  改变x轴字体颜色和大小
              textStyle: {
                color: "white",
                fontSize: 12
              }
            }
          },
          yAxis: {
            type: 'category',
            data: this.regionList,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: { //  改变y轴颜色
              lineStyle: {
                color: '#2c4054'
              }
            },
            axisLabel: { //  改变y轴字体颜色和大小
              //formatter: '{value} m³ ', //  给y轴添加单位
              textStyle: {
                color: "rgba(250,250,250,0.6)",
                fontSize: 16
              }
            }
          },
          series: [{
            type: 'bar',
            name: "产出",
            barWidth: 20,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: { //数值样式
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: 600
                  }
                },
                color: new echarts.graphic.LinearGradient(0.5, 0, 0, 0, [{
                  offset: 0,
                  color: 'rgba(24,144,255,1)'
                }, {
                  offset: 1,
                  color: 'rgba(24,144,255,0)'
                }]),
                barBorderRadius: 15
              }
            },
            data: this.regionVal
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
/* div{
  color: #7ab143;
} */
</style>
