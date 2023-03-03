<template>
  <div id="myChartZGS2" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import echarts from "echarts"

export default {
  name: "histogramChart",
  created () {
    this.path = this.$route.path
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChartZGS2'))
      this.$nextTick(() => {
        myChart.resize()  //图表自适应
      })
      // 物业柱状图
      let wyOption = {
        title: {
          left: 'center',
          top: '5%',
          text: '资产分布',
          textStyle: {
            color: 'white'
          }
        },
        backgroundColor: '#323a5e',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '14%',
          top: '16%',
          containLabel: true
        },
        legend: {
          data: ['办公', '公寓', '商业'],
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
          data: ['长宁区', '黄埔区', '静安区', '浦东区'],
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
          min: 0,
          max: 100,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.3)'
            }
          },
          axisLabel: {
            formatter: '{value} %',
          }
        },
        "dataZoom": [{
          "show": true,
          "height": 12,
          "xAxisIndex": [
            0
          ],
          bottom: '8%',
          "start": 10,
          "end": 90,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: "#d3dee5",

          },
          textStyle: {
            color: "#fff"
          },
          borderColor: "#90979c"
        }, {
          "type": "inside",
          "show": true,
          "height": 15,
          "start": 1,
          "end": 35
        }],
        series: [{
          name: '办公',
          type: 'bar',
          barWidth: '15%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#fccb05'
              }, {
                offset: 1,
                color: '#f5804d'
              }]),
              barBorderRadius: 12,
            },
          },
          data: [80, 90, 40, 60]
        },
        {
          name: '公寓',
          type: 'bar',
          barWidth: '15%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#8bd46e'
              }, {
                offset: 1,
                color: '#09bcb7'
              }]),
              barBorderRadius: 11,
            }

          },
          data: [90, 70, 50, 50]
        },
        {
          name: '商业',
          type: 'bar',
          barWidth: '15%',
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
          data: [40, 60, 40, 70]
        }]
      }

      var app = {
        currentIndex: -1,
      }
      setInterval(function() {
        var dataLen = wyOption.series[0].data.length

        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        app.currentIndex = (app.currentIndex + 1) % dataLen
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        })
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })


      }, 1000)
      myChart.setOption(wyOption, true)
      window.addEventListener('resize', () => { // 监听浏览器的缩放 图表自适应
        if (myChart) { // 用if判断 后台不会报错
          this.myChart.resize()
        }
      })
      // 点击事件
      // myChart.on('click', function (params) {
      //   //此处的value值为饼状图里 data的name 值
      //   let value = params.name;
      //   alert(value);
      // })
    }
  }
}
</script>

<style scoped>
</style>
