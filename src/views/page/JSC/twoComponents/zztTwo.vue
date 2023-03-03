<template>
  <div id="myChartZzt1" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: true,
      width: '100%',
      height: '100%',
      xnameData: ['汽服公司党总支', '楼宇公司党总支', '酒店公司党总支', '餐饮公司党总支', '集团总部党支部', '物业公司党支部', '资产公司党支部', '景苑公司党支部', '名人苑实业公司党支部', '转制单位党支部', '集团总部退休干部党支部'],
      data: [],
      data1: [],
      d1: [66, 72, 30, 28, 18, 19, 15, 17, 4, 2, 0],
      d2: [49, 71, 53, 10, 0, 0, 0, 0, 0, 13, 21]
    }
  },
  created () {
    this.path = this.$route.path
    for (let i = 1; i <= 12; i++) {
      this.data.push(Math.floor(Math.random() * (1000 - 100 + 1)))
      this.data1.push(Math.floor(Math.random() * (1000 - 100 + 1)))
    }
    if (this.path === '/dj-primaryIndex' || this.path === '/threeMenuIndex') {
      this.width = '100%'
      this.height = '100%'
    }
  },
  mounted () {
    if (this.path === '/dj-primaryIndex' || this.path === '/threeMenuIndex') {
      this.$axios.get(this.baseUrl + 'bloc/blocpersonneluserinfo/userStatistic', {
        headers: { 'token': localStorage.getItem('token') }
      }).then((res) => {
        this.drawLine()
      })
    } else {
      if (this.path === '/menuBk') {
        this.xnameData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
      this.$axios.get(this.baseUrl + 'bloc/blocpersonneluserinfo/userStatistic', {
        headers: { 'token': localStorage.getItem('token') }
      }).then((res) => {
        this.drawLine()
      })
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
    },
    "$store.state.bkObj" (val, oldVal) {
      this.data = val.djData.data
      this.data1 = val.djData.data1
      this.drawLine()
    },
    "$store.state.zgsObj" (val, oldVal) {
      this.d1 = val.djData.data
      this.d2 = val.djData.data1
      this.drawLine1()
    }
  },
  methods: {
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartZzt1'))
        //数据
        let option = {
          tooltip: {},
          grid: {
            top: '10%',
            left: '3%',
            right: '1%',
            bottom: '0%',
            containLabel: true,
          },
          legend: {
            itemGap: 50,
            data: ['在职党员', '退休党员'],
            textStyle: {
              color: '#f9f9f9',
              borderColor: '#fff'
            },
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: '#f9f9f9'
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              interval: 0,
              rotate: 30,
              textStyle: {
                color: '#d1e6eb',
                margin: 15,
                fontSize: 12
              },
            },
            axisTick: {
              show: false,
            },
            data: this.xnameData,
          }],
          yAxis: [{
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#0a3256'
              }
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: '#d1e6eb',

              },
            },
            axisTick: {
              show: false,
            },
          }],
          series: [
            {
              name: '在职党员',
              type: 'bar',
              barWidth: 15,
              tooltip: {
                show: false
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#fff',
                }
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#E29052',
                    },
                    {
                      offset: 1,
                      color: '#FA5A53',
                    },
                  ]),
                },
              },
              data: this.d1
            }, {
              name: '退休党员',
              type: 'bar',
              barWidth: 15,
              tooltip: {
                show: false
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#fff',
                }
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: '#00FFFF',
                    },
                    {
                      offset: 1,
                      color: '#0080FF',
                    },
                  ]),
                },
              },
              data: this.d2
            }
          ]
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
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChartZzt1'))
        var data1 = this.d1
        var data2 = this.d2
        var xData = function() {
          var data = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          // for (var i = 1; i < 10; i++) {
          //   data.push("子公司" + i );
          // }
          return data
        }()
        // 绘制图表
        let option = {
          title: {
            left: 'center',
            top: '0%',
            text: '党费交额统计',
            textStyle: {
              color: 'yellow'
            }
          },
          backgroundColor: 'rgb(0,0,0,0)',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',

              textStyle: {
                color: '#05294D',
              },
            },
            backgroundColor: '#05294D',
            borderColor: '#135469',
            borderWidth: 2,
            padding: [20, 20, 20, 20],
          },
          grid: {
            borderWidth: 0,
            top: '20%',
            left: '10%',
            right: '5%',
            bottom: '10%',
            textStyle: {
              color: this.show === false ? 'black' : '#fff',
            },
          },
          legend: {
            top: '5%',
            left: '1%',
            right: '5%',
            textStyle: {
              fontSize: '12px',
              fontFamily: 'MicrosoftYaHeiUI',
              color: this.show === false ? 'black' : '#fff',
            },
            itemWidth: 28,
            itemHeight: 28,
            data: [
              {
                name: '党部交额统计',
                icon:
                  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA1ElEQVR4Xu2WsQ2AMBADP4ghYBtGZxsYAhHEAMQ19tF+g+/PSVqFfy08fwEAA8IJUIFwATgEqQAVCCdABcIF4BagAlQgnAAVCBeAW4AKUIFwAlQgXABuASpABcIJjCtw9O3vfOaquta2f+UYApjO3v8O4P3/e2mfOQEw2jAGpFeg0g9BhwNQZeAlqAi5zzHAfcMqHwYoQu5zDHDfsMqHAYqQ+xwD3Des8mGAIuQ+xwD3Dat8GKAIuc8xwH3DKh8GKELucwxw37DKhwGKkPscA9w3rPI9drIYQbytq9EAAAAASUVORK5CYII=',
              },
              {
                name: '党员交额统计',
                icon:
                  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA1UlEQVRYR+2UMQ7CMAxFvxdyFtqVhREpZ+AEnIyRM1RiY2NsOQgTXYzSUlVNm9ZWhwrJnvPjpxfHhI2LNu4PAzADZsAM/I+BT5FnAF8JqBl0cb6sNFu0z/N751+nLisy0ISJb2DkTZBQgukshYjyT+ergxhgEA6NQwUQIcQoH4HPGpgKtwZ+NhYglpq3MhM1F5ZcLDmTBJCE1wImZ0DSvAuvfaKRAU3zJIRySAczUBfZg4GjdMInIZTfNALY3wFy6xaNblGJFpFm42nPGoAZMANmwAx8ASjjyiGj/fCxAAAAAElFTkSuQmCC',
              },
            ],
          },
          xAxis: [
            {
              type: 'category',
              axisLine: {
                lineStyle: {
                  color: this.show === true ? 'black' : '#fff',
                },
              },
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitArea: {
                show: false,
              },
              axisLabel: {
                // interval: 0,
                // color: 'rgba(255,255,255,0.7)',
                color: this.show === false ? 'black' : '#fff',
                fontSize: 12,
                // rotate: 40
              },
              data: xData,
            },
          ],
          yAxis: [
            {
              type: 'value',
              splitLine: {
                show: true,
                lineStyle: {
                  color: this.show === true ? 'rgba(255,255,255,0.3)' : '#696969',
                }
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                interval: 0,
                // color: 'rgba(255,255,255,0.5)',
                color: this.show === false ? 'black' : '#fff',
                fontSize: 16,
              },
              splitArea: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: '党部交额统计',
              type: 'bar',
              // "stack": "总量",
              barMaxWidth: 15,
              barGap: '10%',
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#05F5FF', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#020D20', // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
              data: data1,
            },
            {
              name: '党员交额统计',
              type: 'line',
              symbolSize: 8,
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: 'rgba(255, 196, 53, 1)',
                  barBorderRadius: 0,
                },
              },
              lineStyle: {
                normal: {
                  width: 3,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#F0B62A', // 0% 处的颜色
                      },
                      {
                        offset: 0.45,
                        color: '#FFC12B', // 45% 处的颜色
                      },
                      {
                        offset: 0.85,
                        color: '#FFC12B', // 85% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#FFC12B', // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
              data: data2,
            },
          ],
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
