<template>
  <div id="myChartfwd" :style="{ width: width, height: height }"></div>
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
      mTime: {}
    }
  },
  created () {
    this.path = this.$route.path
  },
  mounted () {
    this.$axios.get(this.baseUrl + 'bloc/blocpersonneluserinfo/userStatistic', {
      headers: { 'token': localStorage.getItem('token') }
    }).then((res) => {
      this.drawLine()
    })
  },
  computed: {
    getStoreItem () {
      return this.$store.state.switchShow
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // this.drawLine()
      },
    },
    "$store.state.zgsObj" (val, oldVal) {
      // this.drawLine()
      // clearInterval(this.mTime)
    },

  },
  methods: {
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartfwd'))
        var color = [
          '#0CD2E6',
          '#3751E6',
          '#FFC722',
          '#886EFF',
          '#008DEC',
          '#114C90',
          '#00BFA5',
        ]

        var legend = [
          '政府机关',
          '企业',
          '科研院校',
          '事业单位',
          '医院'
        ]
        var seriesData = [{
          name: "政府机关",
          // value: Math.floor(Math.random()*(3000-1000+1)),
          value: 22,
          unit: '个'
        }, {
          name: "企业",
          value: 48,
          unit: '个'
        }, {
          name: "科研院校",
          value: 24,
          unit: '个'
        }, {
          name: "事业单位",
          value: 132,
          unit: '个'
        }, {
          name: "医院",
          value: 2,
          unit: '个'
        }]

        //数据
        let option = {
          backgroundColor: 'rgb(0,0,0,0)',
          color: color,
          grid: {
            top: '5%',
            left: 0,
            right: '1%',
            bottom: 5,
            containLabel: true,
          },
          series: [{
            name: '需求类型占比',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['45%', '65%'],
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: '{value|{c}}\n{label|{b}}',
                rich: {
                  value: {
                    padding: 5,
                    align: 'center',
                    verticalAlign: 'middle',
                    fontSize: 20,
                  },
                  label: {
                    align: 'center',
                    verticalAlign: 'middle',
                    fontSize: 16,
                  },
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                },
              },
            },
            labelLine: {
              show: false,
              length: 0,
              length2: 0,
            },
            data: seriesData,
          }],
        }
        myChart.resize()
        myChart.setOption(option, true)

        let index = 0
        let dataLength = seriesData.length // 当前饼图有多少个扇形
        let mTime = setInterval(() => {
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0, //里层的圆形
            dataIndex: index % dataLength,
          })
          index++
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: index % dataLength,
          })
        }, 2000)
        this.mTime = mTime
        //  鼠标划入
        myChart.on("mouseover", (e) => {
          // 停止定时器，清除之前的高亮
          clearInterval(mTime)
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0 //清一下高亮
          })
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: e.dataIndex, //当前鼠标选中的高亮
          })
        })

        myChart.on("mouseout", (e) => {
          clearInterval(mTime)
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: e.dataIndex,
          }) //鼠标移出后先把上次的高亮取消
          mTime = setInterval(() => {
            // 取消高亮指定的数据图形
            myChart.dispatchAction({
              type: "downplay",
              seriesIndex: 1,
              dataIndex: index % dataLength,
            })
            index++
            // 高亮指定的数据图形
            myChart.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: index % dataLength,
            })
          }, 2000)
        })

      })
    }
  }
}
</script>

<style scoped>
</style>
