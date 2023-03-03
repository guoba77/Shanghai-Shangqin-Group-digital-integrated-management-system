<template>
  <div id="myCharHhxt" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
import { getRegionSortStatistics, getRegionSortStatistics2 } from '@/api/api'
export default {
  name: "zczeBt",
  props: {
    regionName: String
  },
  data () {
    return {
      data: [
        { value: 1218.23, name: '商业' },
        { value: 1842.72, name: '办公' },
        { value: 116.64, name: '居住' },
        { value: 150.12, name: '车位' }
      ]
    }
  },
  watch: {
    regionName: function(val, oldVal) {
      this.onSHow(val)
    }
  },
  // 监听路由变化
  created () {
    setTimeout(() => {
      this.init()
    }, 100)
  },
  methods: {
    init () {
      if (this.$route.path === '/wy-primaryIndex') {
        getRegionSortStatistics(null).then(res => {
          if (res.data.code === 0) {
            if (res.data.data === null) {
              return
            }
            this.data[0].value = res.data.data.business
            this.data[1].value = res.data.data.work
            this.data[2].value = res.data.data.apartment
            this.data[3].value = res.data.data.parkingLot
            this.drawLine()
          }
        })
      } else if (this.$route.path === '/threeMenuIndex') {
        getRegionSortStatistics2(null, this.$store.state.fgsSelValue).then(res => {
          if (res.data.code === 0) {
            if (res.data.data === null) {
              return
            }
            this.data[0].value = res.data.data.business
            this.data[1].value = res.data.data.work
            this.data[2].value = res.data.data.apartment
            this.data[3].value = res.data.data.parkingLot
            this.drawLine()
          }
        })
      }
    },
    onSHow (name) {
      if (this.$route.path === '/wy-primaryIndex') {
        getRegionSortStatistics(name).then(res => {
          if (res.data.data === null) {
            return
          }
          this.data[0].value = res.data.data.business
          this.data[1].value = res.data.data.work
          this.data[2].value = res.data.data.apartment
          this.data[3].value = res.data.data.parkingLot
          this.drawLine()
        })
      } else if (this.$route.path === '/threeMenuIndex') {
        getRegionSortStatistics2(name, this.$store.state.fgsSelValue).then(res => {
          if (res.data.data === null) {
            return
          }
          this.data[0].value = res.data.data.business
          this.data[1].value = res.data.data.work
          this.data[2].value = res.data.data.apartment
          this.data[3].value = res.data.data.parkingLot
          this.drawLine()
        })
      }

    },
    drawLine () {
      let myChart = echarts.init(document.getElementById('myCharHhxt'))
      var colorList = ['#ffa800', '#ff5b00', '#bfdc3b', '#BFDC3B']
      var arr = this.data
      // 总饼图
      let option = {
        color: colorList,
        title: {
          x: 'center',
          y: 'center',
          textStyle: {
            color: "#fff",
            fontSize: 18
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}：{c}m²',
        },
        series: [{
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['25%', '50%'],
          clockwise: true,
          avoidLabelOverlap: true,
          hoverOffset: 15,
          itemStyle: {
            normal: {
              color: function(params) {
                return colorList[params.dataIndex]
              }
            }
          },
          label: {
            show: true,
            fontSize: 16,
            formatter: '{b}：{d}%'
          },
          labelLine: {
            normal: {
              length: 20,
              length2: 30,
              lineStyle: {
                width: 1
              }
            }
          },
          data: arr,
        }]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>
</style>
