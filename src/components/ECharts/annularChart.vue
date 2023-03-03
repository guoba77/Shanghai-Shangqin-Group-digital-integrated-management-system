<template>
  <div id="myChartXBBt" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: "zczeBt",
  data () {
    return {
      data: [
        { value: 1048, name: '男' },
        { value: 735, name: '女' }
      ],
      path: '',
      radius: '40%'
    }
  },
  created () {
    this.path = this.$route.path
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChartXBBt'))
      var color = ['#00ffff', '#ffe000']

      let option = {
        color: color,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: 'white'
          }
        },
        label: {
          formatter: '{b}：{d}%'
        },
        backgroundColor: 'rgb(0,0,0,0)',
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: this.radius,
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>
</style>
