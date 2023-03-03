<template>
  <div id="myChartersbq" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import { jTRsBq, getPeozc, getPeozc2 } from '../../../../api/api'
import echarts from 'echarts'
export default {
  name: "yysrZxt",
  data () {
    return {
      show: true,
      xNameData1: ['锦勤', '上勤', '汽车', '景苑', '楼宇', '物业', '餐饮', '实业', '投资'],
      xNameData: [],
      lineData: ["离职人数", "在职人数", "总人数"],
      path: '',
      data1: [],
      width: '100%',
      height: '100%',
      data: [
        // { value: 43, name: '10年以下' },
        // { value: 56, name: '10年~20年' },
        // { value: 21, name: '20年~30年' },
        // { value: 67, name: '30年以上' }
      ],
      show1: false,
      text: '人员组成',
      val: {},
      fontSize: '14',
      fontSize2: '24',
      timer: null
    }
  },
  mounted () {
    // this.getPeozcList()
  },
  watch: {
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.data = []
          this.getPeozcList()
        }, 100)
      },
      immediate: true
    },
  },
  methods: {
    getPeozcList () {
      this.data = []
      if (this.$route.path === '/jsc') {
        getPeozc().then((res) => {
          if (res.data.code === 0) {
            // this.data = res.data.data
            for (const key in res.data.data) {
              const obj = { value: null, name: '' }
              if (key === 'onGuard') {
                obj.value = res.data.data[key]
                obj.name = '在编在岗'
              } else if (key === 'laborDispatching') {
                obj.value = res.data.data[key]
                obj.name = '劳务派遣'
              } else if (key === 'otherEmployees') {
                obj.value = res.data.data[key]
                obj.name = '其他从业'
              } else if (key === 'serviceOutsourcing') {
                obj.value = res.data.data[key]
                obj.name = '服务外包'
              }
              this.data.push(obj)
            }
            this.drawLine1()
          }
        }
        )
      } else if (this.$route.path === '/threeMenuIndex') {
        getPeozc2(this.$store.state.fgsSelValue).then((res) => {
          if (res.data.code === 0) {
            // this.data = res.data.data
            for (const key in res.data.data) {
              const obj = { value: null, name: '' }
              if (key === 'onGuard') {
                obj.value = res.data.data[key]
                obj.name = '在编在岗'
              } else if (key === 'laborDispatching') {
                obj.value = res.data.data[key]
                obj.name = '劳务派遣'
              } else if (key === 'otherEmployees') {
                obj.value = res.data.data[key]
                obj.name = '其他从业'
              } else if (key === 'serviceOutsourcing') {
                obj.value = res.data.data[key]
                obj.name = '服务外包'
              }
              this.data.push(obj)
            }
            this.drawLine1()
          }
        })
      }
    },
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartersbq'))
        let data1 = [492, 125, 428, 222, 210, 115, 38, 9]
        let data2 = [211, 401, 313, 17, 0, 0, 0, 4]
        let data3 = [54, 25, 29, 80, 0, 1, 11, 0]
        let option = {
          backgroundColor: 'rgb(0,0,0,0)',
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '5%',
            top: '15%',
            containLabel: true
          },
          legend: {
            data: ['在编在岗', '劳务派遣', '其他从业'],
            left: '40%',
            top: '10px',
            icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
            textStyle: {
              color: "white"
            },
            itemWidth: 10,
            itemHeight: 10,
          },
          xAxis: {
            type: 'category',
            data: this.xNameData,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
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
              show: true,
              alignWithLabel: true,
            },
          },
          yAxis: {
            name: '(人)',
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f1f1f1'
              }
            },
            axisLabel: {
              color: 'white',
              textStyle: {
                fontSize: 12
              },
            },
            axisTick: {
              show: true,
              alignWithLabel: true,
            },
          },
          series: [{
            name: '在编在岗',
            type: 'bar',
            barWidth: '17%',
            itemStyle: {
              normal: {
                color: '#9C9AFF',
                barBorderRadius: [12, 12, 0, 0],
              },
            },
            data: data1
          },
          {
            name: '劳务派遣',
            type: 'bar',
            barWidth: '17%',
            itemStyle: {
              normal: {
                color: '#FC8B62',
                barBorderRadius: [12, 12, 0, 0],
              }

            },
            data: data2
          },
          {
            name: '其他从业',
            type: 'bar',
            barWidth: '17%',
            itemStyle: {
              normal: {
                color: '#7015ee',
                barBorderRadius: [12, 12, 0, 0],
              }
            },
            data: data3
          }
          ]
        }
        myChart.setOption(option, true)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      })
    },
    drawLine1 () {
      this.$nextTick(() => {
        let myChart = echarts.init(document.getElementById('myChartersbq'))
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
            fontSize: 13 * scale,
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
            top: '50%',
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
            data: [echartData.length > 0 ? echartData[0].name : null],
            // data: ['高等教育学'],
            // itemGap: 50,
            left: 'center',
            top: '40%',
            icon: 'none',
            align: 'center',
            textStyle: {
              color: "#fff",
              fontSize: 18 * scale,
              rich: rich
            },
          },
          series: [{
            type: 'pie',
            radius: ['32%', '45%'],
            center: ['50%', '47%'],
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
                  return '{white|' + params.name + '} {blue|' + percent + '%}\n{hr|}\n{yellow|' + params.value + '人}'
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
    }
  }
}
</script>

<style scoped>
</style>
