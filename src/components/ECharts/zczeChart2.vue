<template>
  <div id="myChartZczeChart2" :style="{ width: width, height: height }"></div>
</template>
<script>
import echarts from 'echarts'
import { yjRsNl, yjRsNl2 } from '../../api/api'
export default {
  name: "zczeBt",
  data () {
    return {
      show: true,
      width: '100%',
      height: '100%',
      fontSize: '18',
      fontSize2: '30',
      data: [
        { value: 359, name: '35岁以下占比' },
        { value: 545, name: '35岁（含）至45岁占比' },
        { value: 777, name: '45岁（含）及以上占比' },
      ],
      // oldData: ['35岁以下', '35岁~45岁', '45岁~55岁', '55岁以下'],
      oldData: [],
      valData: [],
      show1: false,
      text: '年龄分布(人)',
    }
  },
  watch: {
    "$store.state.jztObj" (val, oldVal) {
      this.data = val.zczeData1
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
      this.width = '100%'
      this.height = '100%'
      this.text = '年龄分布(人)'
      this.fontSize2 = 24
      this.fontSize = 14
      this.oldData = []
      this.valData = []
      if (this.path === '/rs-primaryIndex') {
        yjRsNl().then((res) => {
          if (res.data.code === 0) {
            res.data.data.forEach((item) => {
              this.oldData.push(item.name)
              this.valData.push(item.value)
            })
            this.drawLine1()
          }
        })
      } else if (this.path === '/threeMenuIndex') {
        yjRsNl2(this.$store.state.fgsSelValue).then((res) => {
          if (res.data.code === 0) {
            res.data.data.forEach((item) => {
              this.oldData.push(item.name)
              this.valData.push(item.value)
            })
            this.drawLine1()
          }
        })
      }
    },
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartZczeChart2'))
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
            fontSize: 34 * scale,
            align: 'center'
          },
          white: {
            color: "#fff",
            align: 'center',
            fontSize: 14 * scale,
            padding: [21, 0]
          },
          blue: {
            color: '#49dff0',
            fontSize: 16 * scale,
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
            top: '45%',
            padding: [24, 0],
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
            top: '35%',
            icon: 'none',
            align: 'center',
            textStyle: {
              color: "#fff",
              fontSize: 16 * scale,
              rich: rich
            },
          },
          series: [{
            name: '总考生数量',
            type: 'pie',
            radius: ['42%', '50%'],
            center: ['50%', '45%'],
            hoverAnimation: false,
            color: ['#e2640f', '#0e31de', '#09d5ec', '#0e83ef', '#6f81da', '#00ffb4'],
            label: {
              normal: {
                formatter: function(params, ticket, callback) {
                  var total = 0 //考生总数量
                  var percent = 0 //考生占比
                  echartData.forEach(function(value, index, array) {
                    total += value.value
                  })
                  percent = ((params.value / total) * 100).toFixed(1)
                  return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}'
                },
                rich: rich
              },
            },
            labelLine: {
              normal: {
                length: 40 * scale,
                length2: 0,
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

    },
    drawLine1 () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartZczeChart2'))
        let option = {
          title: {
            text: '年龄分布',
            textStyle: {
              align: 'center',
              color: 'white',
              fontSize: 18,
            },
            top: '10%',
            left: 'center',
          },
          xAxis: {
            type: 'category',
            data: this.oldData,
            axisLine: { //x轴线的颜色以及宽度
              show: true,
              lineStyle: {
                color: "#fff",
                width: 0,
                type: "solid"
              }
            },
            axisLabel: { //x轴文字的配置
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 12
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
                width: 0,
                type: "solid"
              }
            },
            axisLabel: { //x轴文字的配置
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 16
              }
            }
          },
          grid: {
            top: '20%',
            left: '15%',
            right: '5%',
            bottom: '13%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          series: [
            {
              data: this.valData,
              type: 'bar',
              barWidth: 40,
              itemStyle: {    //柱状颜色和圆角
                color: '#3a7fea',
                barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
              },
              label: {
                normal: {
                  show: true,
                  lineHeight: 10,
                  formatter: '{c}',
                  position: 'top',
                  textStyle: {
                    color: '#00D6F9',
                    fontSize: 12
                  }
                }
              }
            }
          ]
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
