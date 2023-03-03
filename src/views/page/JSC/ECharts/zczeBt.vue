<template>
  <div id="myChartZczeBt" :style="{ width: width, height: height }"></div>
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
        { value: 1048, name: '实业' },
        { value: 735, name: '物业' },
        { value: 580, name: '餐饮' },
        { value: 484, name: '酒店' },
        { value: 300, name: '汽服' }
      ],
      djData: [
        { value: 128, name: '博士' },
        { value: 735, name: '硕士' },
        { value: 580, name: '本科' },
        { value: 484, name: '大专' },
        { value: 342, name: '高中及以下' }
      ],
      show1: false
    }
  },
  computed: {
    getStoreItem () {
      return this.$store.state.switchShow
    }
  },
  created () {
    this.path = this.$route.path
    if (this.path === '/wy-primaryIndex') {
      this.width = '100%'
      this.height = '100%'
    } else if (this.path === '/dj-primaryIndex') {
      this.width = '100%'
      this.height = '100%'
    } else if (this.path === '/threeMenuIndex') {
      if (this.$route.query.sjName === '党建') {
        this.width = '100%'
        this.height = '100%'
      } else if (this.$route.query.sjName === '租赁资产') {
        this.width = '100%'
        this.height = '100%'
        this.data = [
          { value: 1048, name: '第一季度' },
          { value: 735, name: '第二季度' },
          { value: 580, name: '第三季度' },
          { value: 666, name: '第四季度' }
        ]
      } else if (this.$route.query.sjName === '驾驶舱') {
        this.width = '100%'
        this.height = '100%'
        this.data = [
          { value: 886, name: '负债总额' },
          { value: 546, name: '权益总额' },
          { value: 322, name: '货币资金' },
          { value: 899, name: '现金流水' }
        ]
      } else {
        this.width = '100%'
        this.height = '100%'
        this.data = [
          { value: 886, name: '负债总额' },
          { value: 546, name: '权益总额' },
          { value: 322, name: '货币资金' },
          { value: 899, name: '现金流水' }
        ]
      }
    }
  },
  watch: {
    getStoreItem () {
      this.show = this.$store.state.switchShow
      this.drawLine()
    },
    "$store.state.bkObj" (val, oldVal) {
      this.data = val.djList.djData1
      this.drawLine()
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartZczeBt'))
        var color = ['#00ffff', '#006ced', '#ffe000']
        let option = {
          backgroundColor: 'rgb(0,0,0,0)',
          legend: {
            right: 10,
            top: 10,
            itemGap: 20,
            itemWidth: 14,
            orient: "vertical",
            textStyle: { fontSize: 14, color: this.show === true ? '#fff' : 'black' }
          },
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '营收贡献',
              type: 'pie',
              radius: '55%',
              data: this.data,
              label: {
                normal: {
                  position: 'inner',
                  formatter: params => {
                    return (
                      params.percent.toFixed(0) + '%'
                    )
                  }
                }
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        let wyOption = {
          backgroundColor: '#323a5e',
          title: {
            show: true,
            text: '季度营业收占比',
            textStyle: {
              align: 'center',
              color: this.show === true ? '#fff' : 'black',
              fontSize: 16,
            },
            top: '1%',
            left: 'center',
          },
          legend: {
            right: 10,
            top: 10,
            itemGap: 20,
            itemWidth: 14,
            orient: "vertical",
            textStyle: { fontSize: 14, color: this.show === true ? '#fff' : 'black' }
          },
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '资产总额',
              type: 'pie',
              radius: '55%',
              data: [
                { value: 1048, name: '第一季度' },
                { value: 735, name: '第二季度' },
                { value: 580, name: '第三季度' },
                { value: 484, name: '第四季度' }
              ],
              label: {
                normal: {
                  position: 'inner',
                  formatter: params => {
                    return (
                      params.percent.toFixed(0) + '%'
                    )
                  }
                }
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        let djOption = {
          color: color,
          backgroundColor: 'rgb(0,0,0,0)',
          title: {
            show: true,
            text: '党员学历',
            textStyle: {
              align: 'center',
              color: 'yellow',
              fontSize: 16,
            },
            top: '1%',
            left: '1%',
          },
          legend: {
            right: 10,
            top: 10,
            itemGap: 10,
            itemWidth: 14,
            orient: "vertical",
            textStyle: { fontSize: 12, color: this.show === true ? '#fff' : 'black' }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}人 ({d}%)"
          },
          series: [
            {
              name: '党龄结构',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.djData,
              label: {
                normal: {
                  position: 'inner',
                  formatter: params => {
                    return (
                      params.percent.toFixed(0) + '%'
                    )
                  }
                }
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        let sjOption = {
          color: color,
          backgroundColor: 'rgb(0,0,0,0)',
          title: {
            show: true,
            text: '党龄结构',
            textStyle: {
              align: 'center',
              color: 'yellow',
              fontSize: 16,
            },
            top: '1%',
            left: '1%',
          },
          legend: {
            right: 10,
            top: 10,
            itemGap: 10,
            itemWidth: 14,
            orient: "vertical",
            textStyle: { fontSize: 12, color: this.show === true ? '#fff' : 'black' }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}人 ({d}%)"
          },
          series: [
            {
              name: '党龄结构',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              // data: ['', '', '', '', '', '', '', '', ''],
              data: [
                { value: 128, name: '20-30年' },
                { value: 735, name: '30-40年' },
                { value: 580, name: '40-50年' },
                { value: 484, name: '50-60年' },
                { value: 342, name: '60-70年' }
              ],
              label: {
                normal: {
                  position: 'inner',
                  formatter: params => {
                    return (
                      params.percent.toFixed(0) + '%'
                    )
                  }
                }
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }

        myChart.resize()
        if (this.path === '/wy-primaryIndex') {
          myChart.setOption(wyOption, true)
        } else if (this.path === '/dj-primaryIndex') {
          myChart.setOption(djOption, true)
        } else if (this.path === '/threeMenuIndex' || this.path === '/menuBk') {
          if (this.$route.query.sjName === '党建') {
            myChart.setOption(sjOption, true)
          } else {
            myChart.setOption(option, true)
          }
        } else {
          myChart.setOption(option, true)
        }
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
