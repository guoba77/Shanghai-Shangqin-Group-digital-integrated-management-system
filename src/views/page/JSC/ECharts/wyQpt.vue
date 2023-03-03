s<template>
  <div id="m111" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import { getBpData, getBpData2 } from '@/api/api.js'
import echarts from 'echarts'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: [
        // { value: 32.48, name: '人均营业收入' }, // 中间的
        // { value: 19.11, name: '资产负债率' }, // 左边的
        // { value: 98.52, name: '服务满意度' }, // 右边的
      ],
      // value12: Math.floor(Math.random()*(1000-500+1)),
      value12: '270.7',
      path: '',
      menuName: '',
      aaa: Math.floor(Math.random() * (1000 - 500 + 1)),
      timer: null
    }
  },
  watch: {
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.getBp()
        }, 100)
      },
      // 立即监听
      immediate: true,
    },
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.getBp()
    // })
  },
  methods: {
    async getBp () {
      if (this.$route.path === '/threeMenuIndex') {
        const res = await getBpData2(this.$store.state.fgsSelValue)
        // console.log(res)
        // console.log(123)

        if (res.data.data.length !== 0) {
          res.data.data.forEach((item) => {
            item['name'] = item.content
          })
          if (res.data.data.length === 2) {
            res.data.data.push({
              content: "资产负债率",
              name: "资产负债率",
              value: '0%',
            })
          }
          res.data.data[1].value = res.data.data[1].value.substr(0, res.data.data[1].value.length - 1)
          res.data.data[2].value = res.data.data[2].value.substr(0, res.data.data[2].value.length - 1)
          this.data = res.data.data
          this.drawLine1()
        } else {
          this.data = []
          this.drawLine1()
        }
      } else {
        const res = await getBpData()
        res.data.data.forEach((item) => {
          item['name'] = item.content
        })
        res.data.data[0].value = res.data.data[0].value.substr(0, res.data.data[1].value.length - 1)
        res.data.data[1].value = res.data.data[1].value.substr(0, res.data.data[1].value.length - 1)
        res.data.data[2].value = res.data.data[2].value.substr(0, res.data.data[2].value.length - 1)
        this.data = res.data.data
        this.drawLine1()
      }
    },
    drawLine1 () {
      this.$nextTick(_ => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('m111'))
        // var tTitle = '仪表盘';
        let option = {
          title: {
            x: 'center',
            bottom: 30,
            // text: tTitle,
            textStyle: {
              fontWeight: 'normal',
              fontSize: 30,
              color: "#fff"
            },
          },
          tooltip: {
            show: false,
          },
          series:
            [
              {
                type: 'gauge',
                name: '中，外',
                center: ['50%', '50%'], // 默认全局居中
                radius: '50%',
                splitNumber: 10, //刻度数量
                min: 0,
                max: 100,
                startAngle: 220,
                endAngle: -40,
                clockwise: true,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 2,
                    shadowBlur: 0,
                    color: [
                      [1, '#468EFD']
                    ]
                  }
                },
                axisTick: {
                  show: true,
                  lineStyle: {
                    color: '#468EFD',
                    width: 1
                  },
                  length: -15,
                  // splitNumber: 10
                },
                splitLine: {
                  show: true,
                  length: -20,
                  lineStyle: {
                    color: '#468EFD',
                  }
                },
                axisLabel: {
                  distance: -20,
                  textStyle: {
                    color: "#468EFD",
                    fontSize: 20,
                    fontWeight: "bold"
                  }
                },
                pointer: { //仪表盘指针
                  show: 0
                },
                detail: {
                  show: false
                }
              },
              {
                name: this.data[0] ? this.data[0].name : null,
                type: 'gauge',
                startAngle: 220,
                endAngle: -40,
                center: ['50%', '50%'], // 默认全局居中
                radius: '45%',
                min: 0,
                max: 100,
                splitNumber: 2,
                axisLine: { // 坐标轴线
                  lineStyle: {
                    color: [
                      [0.5, '#55CD96'],
                      [1, "#E75B64"]
                    ], // 属性lineStyle控制线条样式
                    width: 3
                  }
                },
                axisLabel: { // 坐标轴小标记
                  show: false
                },
                splitLine: { // 分隔线
                  show: false,
                },
                pointer: { // 分隔线 指针
                  show: false // 控制指针显示隐藏
                },
                detail: {
                  offsetCenter: ["0", "0%"],
                  show: true,
                  textStyle: {
                    fontSize: 40
                  },
                  formatter: function(value) {
                    return value + '{a|万元}'
                  },
                  rich: {
                    a: {
                      fontSize: 25
                    }
                  }
                },
                title: {
                  show: true,
                  offsetCenter: ["0", "110%"],
                  color: "#C1ED84",
                  // fontWeight: "bolder",
                  fontSize: 27
                },
                data: [this.data[0]]
              },
              {
                type: 'gauge',
                name: '左，外',
                center: ['20%', '55%'], // 默认全局居中
                radius: '35%',
                splitNumber: 5, //刻度数量
                min: 0,
                max: 100,
                endAngle: 45,
                clockwise: true,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 2,
                    shadowBlur: 0,
                    color: [
                      [1, '#468EFD']
                    ]
                  }
                },
                axisTick: {
                  show: true,
                  lineStyle: {
                    color: '#468EFD',
                    width: 1
                  },
                  length: -15,
                  splitNumber: 10
                },
                splitLine: {
                  show: true,
                  length: -20,
                  lineStyle: {
                    color: '#468EFD',
                  }
                },
                axisLabel: {
                  distance: -20,
                  textStyle: {
                    color: "#468EFD",
                    fontSize: "15",
                    fontWeight: "bold"
                  }
                },
                pointer: { //仪表盘指针
                  show: 0
                },
                detail: {
                  show: false
                }
              },
              {
                type: 'gauge',
                name: this.data[1] ? this.data[1].name : null,
                center: ['20%', '55%'], // 默认全局居中
                radius: '30%',
                min: 0,
                max: 100,
                endAngle: 45,
                splitNumber: 2,
                axisLine: { // 坐标轴线
                  lineStyle: {
                    color: [
                      [0.3, '#55CD96'],
                      [1, "#E75B64"]
                    ], // 属性lineStyle控制线条样式
                    width: 3
                  }
                },
                axisLabel: { // 坐标轴小标记
                  show: false
                },
                splitLine: { // 分隔线
                  show: false,
                },
                pointer: { // 分隔线 指针
                  show: true
                },
                detail: {
                  show: true,
                  offsetCenter: [0, '50%'],
                  textStyle: {
                    fontSize: 25
                  },
                  formatter: function(value) {
                    return value + '{a|%}'
                  },
                  rich: {
                    a: {
                      fontSize: 20
                    }
                  }
                },
                title: {
                  show: true,
                  offsetCenter: ["0", '150%'],
                  color: "#C1ED84",
                  // fontWeight: "bolder",
                  fontSize: 24
                },
                data: [this.data[1]]
              },
              {
                type: 'gauge',
                name: '右，外',
                center: ['80%', '55%'], // 默认全局居中
                radius: '35%',
                splitNumber: 5, //刻度数量
                min: 0,
                max: 100,
                startAngle: 140,
                endAngle: -45,
                clockwise: true,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 2,
                    shadowBlur: 0,
                    color: [
                      [1, '#468EFD']
                    ]
                  }
                },
                axisTick: {
                  show: true,
                  lineStyle: {
                    color: '#468EFD',
                    width: 1
                  },
                  length: -15,
                  splitNumber: 10
                },
                splitLine: {
                  show: true,
                  length: -20,
                  lineStyle: {
                    color: '#468EFD',
                  }
                },
                axisLabel: {
                  distance: -20,
                  textStyle: {
                    color: "#468EFD",
                    fontSize: "15",
                    fontWeight: "bold"
                  }
                },
                pointer: { //仪表盘指针
                  show: 0
                },
                detail: {
                  show: false
                }
              },
              {
                type: 'gauge',
                name: this.data[2] ? this.data[2].name : null,
                center: ['80%', '55%'], // 默认全局居中
                radius: '30%',
                min: 0,
                max: 100,
                startAngle: 140,
                endAngle: -45,
                splitNumber: 2,
                axisLine: { // 坐标轴线
                  lineStyle: {
                    color: [
                      [0.6, '#E75B64'],
                      [1, "#55CD96"]
                    ], // 属性lineStyle控制线条样式
                    width: 3
                  }
                },
                axisLabel: { // 坐标轴小标记
                  show: false
                },
                splitLine: { // 分隔线
                  show: false,
                },
                pointer: { // 分隔线 指针
                  show: true
                },
                detail: {
                  show: true,
                  offsetCenter: [0, '50%'],
                  textStyle: {
                    fontSize: 25
                  },
                  formatter: function(value) {
                    return value + '{a|%}'
                  },
                  rich: {
                    a: {
                      fontSize: 20
                    }
                  }
                },
                title: {
                  show: true,
                  offsetCenter: ["0", "150%"],
                  color: "#C1ED84",
                  // fontWeight: "bolder",
                  fontSize: 24
                },
                data: [this.data[2]]
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
