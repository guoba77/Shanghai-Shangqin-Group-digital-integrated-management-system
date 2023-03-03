<template>
  <div id="myChartBt1" :style="{ width: '410px', height: '333px' }"></div>
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
      let myChart = echarts.init(document.getElementById('myChartBt1'))
      //数据
      var color = ['#FC4567', '#2F8DF4', '#C25EC4']
      // 绘制图表
      myChart.setOption({
        color: color,
        backgroundColor: this.show === true ? '#00043A' : '#fff',
        title: {
          text: '员工薪资',
          left: '43%',
          top: '47%',
          textStyle: {
            fontSize: 12,
            color: this.show === false ? 'black' : '#fff',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 20,
          top: 10,
          textStyle: {
            fontSize: 12,
            color: this.show === false ? 'black' : '#fff',
            fontWeight: 'normal'
          }
        },
        series: [{
          center: ['50%', '50%'],
          type: 'pie',
          roseType: 'radius',
          radius: ['30%', '50%'],
          data: [{
            value: 220,
            name: '高'
          }, {
            value: 120,
            name: '中'
          },
          {
            value: 189,
            name: '低'
          }
          ],
          label: {
            normal: {
              formatter: '{font|{c}}\n{hr|}\n{font|{d}%}',
              rich: {
                font: {
                  fontSize: 12,
                  padding: [5, 0],
                  color: this.show === false ? 'black' : '#fff',
                },
                hr: {
                  height: 0,
                  borderWidth: 1,
                  width: '100%',
                  borderColor: '#fff'
                }
              }
            },
          },
          labelLine: {
            lineStyle: {
              color: this.show === false ? 'black' : '#fff',
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            }
          }
        }]
      }, true)
    }
  }
}
</script>

<style scoped>
</style>
