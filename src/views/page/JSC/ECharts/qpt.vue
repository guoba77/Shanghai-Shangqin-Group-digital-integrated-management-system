<template>
  <div id="myChartQp" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: [0.7, 0.7, 0.7],
      // value: Math.floor(Math.random()*(1200-500+1))
      value: '491'
    }
  },
  watch: {
    // "$store.state.bkObj"(val,oldVal){
    //   this.value = val.djData.dyNum
    //   this.drawLine()
    // },
    // "$store.state.zgsObj"(val,oldVal){
    //   this.$nextTick(function (){
    //     this.value = val.djData.dyNum
    //     this.drawLine()
    //   })
    // }
  },
  mounted () {
    // this.$axios.get(this.baseUrl + 'bloc/blocpersonneluserinfo/userStatistic',{
    //   headers: { 'token': localStorage.getItem('token')}
    // }).then((res) => {
    this.drawLine()
    // })
  },
  methods: {
    drawLine () {
      this.$nextTick(_ => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChartQp'))
        const series = [
          {
            type: 'liquidFill',
            shape: 'circle',
            radius: '70%',
            center: ['50%', '50%'],
            data: this.data,
            // 球体配置
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: '#3dfff6',
                shadowBlur: 20,
                shadowColor: '#12786f'
              }
            },
            color: ['rgba(50, 255, 238, .6)', 'rgba(154, 255, 247, .6)'],
            backgroundStyle: {
              color: 'transparent',
            },
            label: {
              show: true,
              textStyle: {
                color: '#12786f',
                insideColor: '#12786f',
                fontSize: 20
              },
              formatter: params => {
                return `${this.value}人\n {a|党员人数}`
              },
              rich: {
                a: {
                  fontSize: 18,
                }
              }
            }
          },
        ]
        myChart.resize()
        // 绘制图表
        myChart.setOption({ series }, true)
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
