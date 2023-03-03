<template>
  <div id="partyMember" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from "echarts"
export default {
  data () {
    return {
      width: '100%',
      height: '100%',
      yearList: [],
      data: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.drawLine()
    }, 500)
  },
  methods: {
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('partyMember'))
        var echartsData = {
          title: '党员发展情况',
          city: ['2018年', '2019年', '2020年', '2021年', '2022年'],
          legend: ['在职党员', '退休党员'],
          data: [
            [50, 60, 70, 80, 90],
            [69, 75, 82, 73, 80]
          ],
        }
        var colors = ['#F56679', '#4C98FB', '#8CDF6C', '#9D50E0']
        let option = {
          title: {
            text: echartsData.title,
            x: 'center',
            top: 15,
            textStyle: {
              color: '#fff',
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
          },
          color: colors,
          legend: {
            top: 20,
            right: '2%',
            itemWidth: 10,
            itemHeight: 10,
            padding: [5, 10],
            textStyle: {
              fontSize: 14,
              color: '#96A4F4',
              padding: [3, 0, 0, 0],
            },
            data: echartsData.legend,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '2%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              color: 'white',
              rotate: 0,//倾斜度
              fontSize: 16
            },
            axisLine: {
              lineStyle: {
                color: 'white',
              },
              width: 5,
            },
            axisTick: {
              show: false,
            },
            data: echartsData.city,
          },
          yAxis: {
            name: '人数：人',
            type: 'value',
            axisLabel: {
              fontSize: 16,
              color: 'white',
            },
            axisLine: {
              lineStyle: {
                color: '#96A4F4',
              },
              width: 5,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(150, 164, 244, 0.3)',
              },
            },
          },
          series: [],
        }
        for (var i = 0; i < echartsData.legend.length; i++) {
          option.series.push({
            name: echartsData.legend[i],
            type: 'bar',
            stack: '总数',
            barWidth: '45%',
            label: {
              show: false,
              position: 'insideRight',
            },
            data: echartsData.data[i],
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                  },
                },
              },
            },
          })
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
