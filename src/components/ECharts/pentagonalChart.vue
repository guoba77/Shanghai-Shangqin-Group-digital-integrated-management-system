<template>
  <div id="myChartWjx" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: "zczeBt",
  data () {
    return {
      text: '营业收入',
      path: '',
      data: [66, 32, 45, 51, 9],
      titleLeft: '0%',
      titleTop: '0%',
      ti: {},
      bgColor: '#323a5e'
    }
  },
  created () {
    this.path = this.$route.path
  },
  watch: {
    "$store.state.bkObj" (val, oldVal) {
      this.data = val.djList.pData
      this.drawLine()
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChartWjx'))
      var offset = 0
      let option = {
        backgroundColor: 'rgb(0,0,0,0)',
        title: {
          text: '年龄结构',
          textStyle: {
            color: 'yellow'
          }
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: [''],
          show: false,
        },
        radar: [
          {
            indicator: [
              { text: '20-30岁', max: 100 },
              { text: '31-40岁', max: 100 },
              { text: '41-50岁', max: 100 },
              { text: '51-60岁', max: 100 },
              { text: '61-70岁', max: 100 },
            ],
            name: {
              textStyle: {
                fontSize: '12',
                color: '#6B99B7',
              },
            },
            splitNumber: 5,
            splitArea: {
              areaStyle: {
                color: [
                  'rgba(224,134,82, 0.1)', 'rgba(224,134,82, 0.2)',
                  'rgba(224,134,82, 0.4)', 'rgba(224,134,82, 0.6)',
                  'rgba(224,134,82, 0.8)', 'rgba(224,134,82, 1)'
                ].reverse(),
              },
            },
            label: {
              show: true,
              color: '#6B99B7',
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: '#FFFFFF',
              fontSize: 12,
              formatter: function(value, index) {
                offset++
                if (offset < 6) {
                  if (value === 0.4) {
                    return [
                      '{yxStyle| }',
                      '{lhStyle| }',
                      '{pjStyle| }',
                      '{jdStyle| }',
                      '{jcStyle| }',
                    ].join('\n')
                  }
                }
              },
              rich: {
                jcStyle: {
                  color: 'rgb(203, 119, 155)',
                  fontSize: 24,
                  width: 250,
                  height: 30,
                  align: 'right',
                },
                jdStyle: {
                  color: 'rgb(177, 158, 66)',
                  fontSize: 24,
                  width: 250,
                  height: 30,
                  align: 'right',
                  padding: [5, 30],
                },
                pjStyle: {
                  color: 'rgb(87, 217, 254)',
                  fontSize: 24,
                  width: 250,
                  height: 20,
                  align: 'right',
                  padding: [5, 70],
                },
                lhStyle: {
                  color: 'rgb(147, 194, 255)',
                  fontSize: 24,
                  width: 250,
                  height: 30,
                  align: 'right',
                  padding: [5, 100],
                },
                yxStyle: {
                  color: 'rgb(46, 208, 213)',
                  fontSize: 24,
                  width: 250,
                  height: 30,
                  align: 'right',
                  padding: [5, 140],
                },
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgb(1,166,229,0.7)',
              },
            },
            center: ['50%', '60%'],
            radius: 60,
          },
        ],
        series: [
          {
            type: 'radar',
            symbolSize: [8, 8],
            lineStyle: {
              color: 'yellow',
            },
            itemStyle: {
              borderWidth: 1,
              color: 'yellow',
              borderColor: 'yellow',
              shadowBlur: 1,
              shadowColor: 'yellow',
            },
            areaStyle: {
              color: '#0099ff00',
            },
            data: [
              {
                value: this.data,
                name: '',
              },
            ],
          },
        ],
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>
</style>
