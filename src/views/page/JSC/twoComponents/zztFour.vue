<template>
  <div id="myChartZGS" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import echarts from "echarts"
import { selectServiceRegionArea } from '@/api/api.js'
export default {
  name: "histogramChart",
  data () {
    return {
      areaData: [],
      arr1: [],
      show: true,
      t1: '',
      path: '',
      menuName: '',
      timer: null
      // nameData: ["办公", "公寓", '商业']
    }
  },
  computed: {
    getStoreItem () {
      return this.$store.state.switchShow
    }
  },
  watch: {
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          if (val === '上海上勤高级楼宇管理有限公司' || val === '上海上勤餐饮管理有限公司' || val === '上海上勤物业管理有限公司' || val === '上海上勤资产管理有限公司' || val === '上海名人苑实业有限公司') {
            this.selectArea()
          }
        }, 100)
      },
      immediate: true
    }
  },
  mounted () {
    // this.selectArea()
  },
  methods: {
    selectArea () {
      this.arr1 = []
      this.areaData = []
      selectServiceRegionArea(this.$store.state.fgsSelValue).then((res) => {
        if (res.data.code === 0) {
          res.data.data.forEach(item => {
            this.arr1.push(item.value)
            this.areaData.push(item.name)
          })
        }
        this.drawLine()
      })
    },
    drawLine () {

      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartZGS'))
        let option = {
          title: {
            show: true,
            text: '服务点各区面积（m2）',
            textStyle: {
              align: 'center',
              color: '#fff',
              fontSize: 16,
            },
            top: '1%',
            left: 'center',
          },
          // legend: {
          //   data: this.nameData,
          //   top: "5%",
          //   right: '10',
          //   textStyle: {
          //     color: "rgba(250,250,250,0.6)",
          //     fontSize: 16
          //   }
          // },
          grid: {
            left: '15%'
          },
          barWidth: 15,
          xAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.2)"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: { //  改变x轴颜色
              lineStyle: {
                color: '#26D9FF'
              }
            },
            axisLabel: { //  改变x轴字体颜色和大小
              textStyle: {
                color: "rgba(250,250,250,0.6)",
                fontSize: 16
              }
            }
          },
          yAxis: {
            type: 'category',
            data: this.areaData,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: { //  改变y轴颜色
              lineStyle: {
                color: 'rgb(0,0,0,0)'
              }
            },
            axisLabel: { //  改变y轴字体颜色和大小
              //formatter: '{value} m³ ', //  给y轴添加单位
              textStyle: {
                color: "rgba(250,250,250,0.6)",
                fontSize: 16
              }
            }
          },
          series: [{
            type: 'bar',
            name: "办公",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'right', //在上方显示
                  textStyle: { //数值样式
                    color: "rgba(250,250,250,0.6)",
                    fontSize: 16,
                    fontWeight: 600
                  }
                },
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                  offset: 0,
                  color: 'rgba(61,126,235,1)'
                }, {
                  offset: 1,
                  color: 'rgba(61,126,235,0)'
                }]),
                borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                  offset: 0,
                  color: 'rgba(160,196,225,1)'
                }, {
                  offset: 1,
                  color: 'rgba(61,126,235,1)'
                }]),
                borderWidth: 2
              }
            },
            data: this.arr1
          },
            // {
            //   type: 'bar',
            //   name: "公寓",
            //   itemStyle: {
            //     normal: {
            //       label: {
            //         show: true, //开启显示
            //         position: 'right', //在上方显示
            //         textStyle: { //数值样式
            //           color: "rgba(250,250,250,0.6)",
            //           fontSize: 16,
            //           fontWeight: 600
            //         }
            //       },
            //       color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            //         offset: 0,
            //         color: 'rgba(15,197,243,1)'
            //       }, {
            //         offset: 1,
            //         color: 'rgba(15,197,243,0)'
            //       }]),
            //       borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            //         offset: 0,
            //         color: 'rgba(180,240,255,1)'
            //       }, {
            //         offset: 1,
            //         color: 'rgba(15,197,243,1)'
            //       }]),
            //       borderWidth: 2
            //     }
            //   },
            //   data: arr2
            // },
            // {
            //   type: 'bar',
            //   name: "商业",
            //   itemStyle: {
            //     normal: {
            //       label: {
            //         show: true, //开启显示
            //         position: 'right', //在上方显示
            //         textStyle: { //数值样式
            //           color: "rgba(250,250,250,0.6)",
            //           fontSize: 16,
            //           fontWeight: 600
            //         }
            //       },
            //       color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            //         offset: 0,
            //         color: 'rgba(15,197,243,1)'
            //       }, {
            //         offset: 1,
            //         color: 'rgba(15,197,243,0)'
            //       }]),
            //       borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            //         offset: 0,
            //         color: 'rgba(180,240,255,1)'
            //       }, {
            //         offset: 1,
            //         color: 'rgba(15,197,243,1)'
            //       }]),
            //       borderWidth: 2
            //     }
            //   },
            //   data: arr3
            // }
          ]
        }

        var app = {
          currentIndex: -1,
        }
        this.t1 = setInterval(function() {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          //console.log(app.currentIndex);
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex,
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })


        }, 1000)
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
