<template>
  <div id="dyFb" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from "echarts"
import { getPMDevelopment, getPMDevelopment2 } from '../../api/api'
export default {
  data () {
    return {
      width: '100%',
      height: '100%',
      yearList: [],
      data: [],
      organizationId: null,
      timer: null
    }
  },
  mounted () {
    if (this.$route.path !== '/threeMenuIndex') {
      setTimeout(() => {
        this.getPMDevelopmentList()
      }, 500)
    }
  },
  watch: {
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        if (this.$route.path === '/threeMenuIndex') {
          if (val === '上海锦勤汽车服务有限公司') {
            this.organizationId = 1
          } else if (val === '上海上勤高级楼宇管理有限公司') {
            this.organizationId = 2
          } else if (val === '上海上勤酒店管理有限公司') {
            this.organizationId = 3
          } else if (val === '上海上勤餐饮管理有限公司') {
            this.organizationId = 4
          } else if (val === '上海上勤物业管理有限公司') {
            this.organizationId = 6
          } else if (val === '上海上勤资产管理有限公司') {
            this.organizationId = 7
          } else if (val === '上海上勤景苑酒店管理有限公司') {
            this.organizationId = 8
          } else if (val === '上海名人苑实业有限公司') {
            this.organizationId = 9
          }
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            this.yearList = []
            this.data = []
            this.getPMDevelopmentList()
          }, 100)
        }

      },
      // 立即监听
      immediate: true,
    },
  },
  methods: {
    async getPMDevelopmentList () {
      this.yearList = []
      this.data = []
      try {
        if (this.$route.path === '/threeMenuIndex') {
          const res = await getPMDevelopment2(this.$store.state.fgsSelValue, this.organizationId)
          if (res.data.code === 0) {
            res.data.data.forEach((item) => {
              this.yearList.push(item.year + '年')
              this.data.push(item.number)
            })
            this.drawLine()
          }
        } else {
          const res = await getPMDevelopment()
          if (res.data.code === 0) {
            res.data.data.forEach((item) => {
              this.yearList.push(item.year + '年')
              this.data.push(item.number)
            })
            this.drawLine()
          }
        }

      }
      catch (err) {
        console.log(err)
      }
    },
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('dyFb'))
        let option = {
          title: {
            show: true,
            text: '党员发展情况(人)',
            textStyle: {
              align: 'center',
              color: 'white',
              fontSize: 18,
            },
            top: '3%',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '12%',
            top: '10%',
            right: '8%',
            bottom: '10%',
          },
          xAxis: {
            type: 'category',
            data: this.yearList,
            axisLine: { show: true, lineStyle: { color: 'white' } },
          },
          yAxis: {
            type: 'value',
            axisLine: { show: true, lineStyle: { color: 'white' } },
          },
          series: [
            {
              name: '总人数',
              type: 'bar',
              barWidth: 35,
              stack: '数量',
              data: this.data,
              // 	itemStyle: {
              // normal: {

              // }

              itemStyle: {
                normal: {
                  //颜色渐变
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#317EEA'
                  }, {
                    offset: 1,
                    color: '#4DB9F6'
                  }]),
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                      color: '#4ccad9',
                      fontSize: 12
                    }
                  }
                }
              }
            }

          ]
        }
        myChart.resize()
        myChart.setOption(option)
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
