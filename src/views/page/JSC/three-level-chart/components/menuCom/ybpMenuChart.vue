<template>
  <div id="myChartybpmenu" :style="{ width: width, height: height }"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: "zczeBt",
  data () {
    return {
      show: true,
      width: '100%',
      height: '100%',
      data: [
        {
          name: '男',
          value: [43, 90, 80, 53, 78, 89, 77, 50],
        },
        {
          name: '女',
          value: [50, 44, 56, 69, 43, 77, 90, 20],
        },
      ],
      stages: [
        { name: '20-30岁', max: 100 },
        { name: '30-40岁', max: 100 },
        { name: '40-50岁', max: 100 },
        { name: '50-60', max: 100 },
        { name: '60-70', max: 100 }
      ],
      show1: false
    }
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
  mounted () {
    this.drawLine()
  },
  methods: {
    // 板块驾驶舱实业
    drawLine () {
      this.$nextTick(_ => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChartybpmenu'))
        var highlight = '#03b7c9'

        var demoData = [{
          name: '名人苑项目进度',
          value: 60,
          unit: '%',
          pos: ['25%', '50%'],
          range: [-40, 100],
          YS: [
            [0.4, '#119eff'],
            [0.5, '#30da74'],
            [1, '#f3390d']
          ]
        },
        {
          name: '万荣路项目进度',
          value: 20,
          unit: '%',
          pos: ['75%', '50%'],
          range: [0, 100],
          splitNum: 10,
          YS: [
            [0.3, '#f3390d'],
            [0.8, '#30da74'],
            [1, '#119eff']
          ]
        }
        ]
        let option = {
          backgroundColor: 'rgb(0,0,0,0)',
          series: (function() {
            var result = []

            demoData.forEach(function(item) {
              result.push(
                // 外围刻度
                {
                  type: 'gauge',
                  center: item.pos,
                  radius: '50%', // 1行2个
                  splitNumber: item.splitNum || 10,
                  min: item.range[0],
                  max: item.range[1],
                  startAngle: 225,
                  endAngle: -45,
                  axisLine: {
                    show: true,
                    lineStyle: {
                      width: 2,
                      shadowBlur: 0,
                      color: [
                        [1, highlight]
                      ]
                    }
                  },
                  axisTick: {
                    show: true,
                    lineStyle: {
                      color: highlight,
                      width: 1
                    },
                    length: -5,
                    splitNumber: 10
                  },
                  splitLine: {
                    show: true,
                    length: -10,
                    lineStyle: {
                      color: highlight,
                    }
                  },
                  axisLabel: {
                    distance: -18,
                    textStyle: {
                      color: highlight,
                      fontSize: '10',

                    }
                  },
                  pointer: {
                    show: 0
                  },
                  detail: {
                    show: 0
                  }
                }, {
                name: '速度',
                type: 'gauge',
                center: item.pos,
                splitNumber: item.splitNum || 10,
                min: item.range[0],
                max: item.range[1],
                radius: '45%',
                axisLine: { // 坐标轴线
                  show: false,
                  lineStyle: { // 属性lineStyle控制线条样式
                    color: item.YS,
                    shadowColor: "#ccc",
                    shadowBlur: 25,
                    width: 0
                  }
                },
                axisLabel: {
                  show: false
                },
                axisTick: { // 坐标轴小标记
                  // show: false,
                  length: 20, // 属性length控制线长
                  lineStyle: { // 属性lineStyle控制线条样式
                    color: 'auto',
                    width: 2
                  }
                },
                splitLine: { // 分隔线
                  show: false,
                  length: 20, // 属性length控制线长
                  lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                  }
                },
                title: {
                  textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic'
                  }
                },
                detail: {
                  show: true,
                  offsetCenter: [0, '100%'],
                  textStyle: {
                    fontSize: 25
                  },
                  formatter: [
                    '{value} ' + (item.unit || ''),
                    '{name|' + item.name + '}'
                  ].join('\n'),
                  rich: {
                    name: {
                      fontSize: 16,
                      lineHeight: 30,
                      color: '#4be4de'
                    }
                  }
                },
                data: [{
                  value: item.value
                }],
                pointer: {
                  width: 5
                }
              },
                // 内侧指针、数值显示
                {
                  name: item.name,
                  type: 'gauge',
                  center: item.pos,
                  radius: '40%',
                  startAngle: 225,
                  endAngle: -45,
                  min: item.range[0],
                  max: item.range[1],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      width: 16,
                      color: [
                        [1, 'rgba(75,228,255,.1)']
                      ]
                    }
                  },
                  axisTick: {
                    show: 0,
                  },
                  splitLine: {
                    show: 0,
                  },
                  axisLabel: {
                    show: 0
                  },
                  pointer: {
                    show: true,
                    length: '90%',
                    width: 3,
                  },
                  itemStyle: { //表盘指针的颜色
                    color: 'rgba(255, 153, 0, 0.31)',
                    borderColor: '#ff9900',
                    borderWidth: 1
                  },
                  detail: {
                    show: false,
                    offsetCenter: [0, '100%'],
                    textStyle: {
                      fontSize: 20,
                      color: '#00eff2'
                    },
                    formatter: [
                      '{value} ' + (item.unit || ''),
                      '{name|' + item.name + '}'
                    ].join('\n'),
                    rich: {
                      name: {
                        fontSize: 14,
                        lineHeight: 30,
                        color: '#00eff2'
                      }
                    }
                  },

                  data: [{
                    value: item.value
                  }]
                }
              )
            })
            return result
          })()
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
