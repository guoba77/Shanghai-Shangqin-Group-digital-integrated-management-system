<template>
  <div id="myChartZczeChart" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
import { jTRsBq, jTRsBq2 } from '../../api/api'
export default {
  name: "zczeBt",
  data () {
    return {
      show: true,
      width: '100%',
      height: '100%',
      data: [],
      show1: false,
      text: '司龄分布(人)',
      val: {},
      fontSize: '14',
      fontSize2: '24',
    }
  },
  watch: {
    "$store.state.jztObj" (val, oldVal) {
      this.data = val.zczeData
      this.fontSize2 = 24
      this.fontSize = 14
      this.drawLine()
    },
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        setTimeout(() => {
          this.onSHow()
        }, 100)
      },
      immediate: true
    }
  },
  mounted () {
  },
  methods: {
    onSHow () {
      this.path = this.$route.path
      this.data = []
      if (this.path === '/rs-primaryIndex') {
        this.width = '100%'
        this.height = '100%'
        this.text = '司龄分布(人)'
        this.fontSize2 = 24
        this.fontSize = 14
        this.data = []
        jTRsBq().then((res) => {
          if (res.data.code === 0) {
            this.data = res.data.data
            this.drawLine()
          }
        })
      } else if (this.path === '/threeMenuIndex') {
        jTRsBq2(this.$store.state.fgsSelValue).then((res) => {
          if (res.data.code === 0) {
            this.data = res.data.data
            this.drawLine()
          }
        })
      }
    },
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartZczeChart'))
        var scale = 1
        var echartData = this.data
        var rich = {
          yellow: {
            color: "#ffc72b",
            fontSize: this.fontSize2 * scale,
            padding: [5, 4],
            align: 'center'
          },
          total: {
            color: "#ffc72b",
            fontSize: 30 * scale,
            align: 'center'
          },
          white: {
            color: "#fff",
            align: 'center',
            fontSize: 16 * scale,
            padding: [5, 0]
          },
          blue: {
            color: '#49dff0',
            fontSize: 14 * scale,
            align: 'center'
          },
          hr: {
            borderColor: '#0b5263',
            width: '100%',
            borderWidth: 1,
            height: 0,
          }
        }
        let option = {
          backgroundColor: 'rgb(0,0,0,0)',
          title: {
            text: this.text,
            left: 'center',
            top: '57%',
            padding: [5, 0],
            textStyle: {
              color: '#fff',
              fontSize: this.fontSize * scale,
              align: 'center'
            }
          },
          legend: {
            selectedMode: false,
            formatter: function(name) {
              var total = 0 //各科正确率总和
              var averagePercent //综合正确率
              echartData.forEach(function(value, index, array) {
                total += value.value
              })
              return '{total|' + total + '}'
            },
            data: [echartData[0].name],
            // data: ['高等教育学'],
            // itemGap: 50,
            left: 'center',
            top: '47%',
            icon: 'none',
            align: 'center',
            textStyle: {
              color: "#fff",
              fontSize: 16 * scale,
              rich: rich
            },
          },
          series: [{
            type: 'pie',
            radius: ['32%', '45%'],
            center: ['50%', '55%'],
            hoverAnimation: false,
            color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
            label: {
              normal: {
                formatter: function(params, ticket, callback) {
                  var total = 0
                  var percent = 0
                  echartData.forEach(function(value, index, array) {
                    total += value.value
                  })
                  percent = ((params.value / total) * 100).toFixed(1)
                  // return '{white|' + params.name + '} {blue|' + percent + '%}\n{hr|}\n{yellow|' + params.value + '人}';
                  return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '人}'
                },
                rich: rich
              },
            },
            labelLine: {
              normal: {
                length: 15 * scale,
                length2: 10,
                lineStyle: {
                  color: 'yellow'
                }
              }
            },
            data: echartData
          }]
        }

        if (this.path === '/cw-primaryIndex') {
          myChart.on('click', (params) => {
            //此处的value值为饼状图里 data的name 值
            let value = params.name
            if (this.path === '/cw-primaryIndex') {
              this.$router.push({
                path: '/cw-primaryIndex',
                query: {
                  name: value
                }
              })
            } else if (this.path === '/secondaryIndex') {
              this.$router.push({
                path: '/secondaryIndex',
                query: {
                  name: value
                }
              })
            } else if (this.path === '/threeIndex') {
              this.$router.push({
                path: '/threeIndex',
                query: {
                  name: value
                }
              })
            }
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
