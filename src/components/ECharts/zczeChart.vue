<template>
  <div id="myChartZczeChart" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
import { getCompanyRevenueAccountedFor, revenueSubsidiaryCompany } from '../../api/api'
function formatNum (value) {
  if (!value && value !== 0) return 0
  let str = value.toString()
  let reg =
    str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
  return str.replace(reg, "$1,")
}
export default {
  name: "zczeBt",
  data () {
    return {
      show: true,
      width: '100%',
      height: '100%',
      data: [
        // { value: 18708.07, name: '上勤物业' },
      ],
      show1: false,
      text: '营收占比(万元)',
      val: {},
      fontSize: '20',
      fontSize2: '24',
      name: '实业',
      totalNum: 0,
      totalNum1: 0,
      timer: null
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
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.totalNum = 0
          this.data = []
          this.getcharts()
        }, 100)
        // if (this.path === '/threeMenuIndex') {
        //   this.width = '100%'
        //   this.height = '100%'
        //   this.text = '营收占比(万元)'
        //   this.fontSize2 = 30
        //   this.fontSize = 18
        //   getCompanyRevenueAccountedFor(this.$store.state.fgsSelValue).then((res) => {
        //     // this.data = []
        //     if (res.data.code === 0) {
        //       this.totalNum1 = res.data.data.blocFinTakingRateList[0].yearFigure
        //       this.drawLine1()
        //     }
        //   })
        // }
      },
      immediate: true
    }
  },
  mounted () {

  },
  methods: {
    getcharts () {
      this.path = this.$route.path
      if (this.path === '/threeMenuIndex') {
        this.totalNum = 0
        this.data = []
        this.width = '100%'
        this.height = '100%'
        this.text = '营收占比(万元)'
        this.fontSize2 = 30
        this.fontSize = 18
        // this.data = []
        // this.totalNum = res.data.data.blocFinTakingRateList[0].yearFigure
        revenueSubsidiaryCompany(this.$store.state.fgsSelValue).then((res) => {
          this.data = []
          if (res.data.data.list !== null) {
            res.data.data.list.forEach((item) => {
              this.totalNum = res.data.data.totalNum
              let obj = {
                name: item.name,
                value: item.value
              }
              this.data.push(obj)
            })
            this.drawLine()
          }

        })

      } else if (this.path === '/jsc') {
        getCompanyRevenueAccountedFor().then((res) => {
          this.data = []
          this.totalNum = res.data.data.totalNum
          res.data.data.blocFinTakingRateList.forEach((item) => {
            let obj = {
              name: item.companyName,
              value: item.yearFigure
            }
            this.data.push(obj)
          })
          this.drawLine()
        })
      } else {
        getCompanyRevenueAccountedFor().then((res) => {
          this.data = []
          this.totalNum = res.data.data.totalNum
          res.data.data.blocFinTakingRateList.forEach((item) => {
            let obj = {
              name: item.companyName,
              value: item.yearFigure
            }
            this.data.push(obj)
          })
          this.drawLine()
        })
      }
    },
    drawLine () {
      this.$nextTick(_ => {
        let that = this
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
            padding: [0, 0, 10, 0]
          },
          blue: {
            color: '#49dff0',
            fontSize: 14 * scale,
            align: 'left',
            padding: [5, 0]
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
            padding: [1, 0],
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
              // return '{total|' + formatNum(total.toFixed(2)) + '}'
              return '{total|' + that.totalNum + '}'
            },
            data: [echartData.length > 0 ? echartData[0].name : null],
            left: 'center',
            top: '40%',
            icon: 'none',
            align: 'center',
            textStyle: {
              color: "#fff",
              fontSize: 14 * scale,
              rich: rich
            },
          },
          series: [{
            type: 'pie',
            radius: ['42%', '50%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            color: ['#c487ee', '#deb140', '#49dff0'],

            label: {
              normal: {
                formatter: function(params, ticket, callback) {
                  var total = 0
                  var percent = 0
                  echartData.forEach(function(value, index, array) {
                    total += value.value
                  })
                  percent = ((params.value / total) * 100).toFixed(1)
                  // return '{white|' + params.name + '} {white|' + percent + '%   } \n ' + params.value + '万元'
                  return '{white|' + params.name + percent + '%' + '}' + '\n' + '{blue|' + + params.value + '万元' + '}'
                },
                rich: rich
              },
            },
            labelLine: {
              normal: {
                length: 20 * scale,
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
    },
    drawLine1 () {
      let that = this
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
            fontSize: 18 * scale,
            padding: [1, 0]
          },
          blue: {
            color: '#49dff0',
            fontSize: 16 * scale,
            align: 'right'
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
            top: '48%',
            padding: [1, 0],
            textStyle: {
              color: '#fff',
              fontSize: this.fontSize * scale,
              align: 'center'
            }
          },
          legend: {
            selectedMode: false,
            formatter: function(name) {
              // var total = 0 //各科正确率总和
              // var averagePercent //综合正确率
              // echartData.forEach(function(value, index, array) {
              //   total += value.value
              // })
              return that.totalNum1
            },
            data: [echartData[0].name],
            left: 'center',
            top: '35%',
            icon: 'none',
            align: 'center',
            textStyle: {
              color: "#fff",
              fontSize: 28 * scale
            },
          },
          series: [{
            type: 'pie',
            radius: ['46%', '60%'],
            center: ['50%', '45%'],
            hoverAnimation: false,
            color: ['#c487ee', '#deb140', '#49dff0'],
            label: {
              normal: {
                formatter: function(params, ticket, callback) {
                  var total = 0
                  var percent = 0
                  echartData.forEach(function(value, index, array) {
                    total += value.value
                  })
                  percent = ((params.value / total) * 100).toFixed(1)
                  // return '{white|' + params.name + '} {white|' + percent + '%}';
                  return ''
                },
                rich: rich
              },
              data: echartData
            },
            labelLine: {
              normal: {
                length: 0 * scale,
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
