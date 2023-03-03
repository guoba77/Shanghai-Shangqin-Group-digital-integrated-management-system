<template>
  <div
    id="myCharHhxt"
    :style="{ width: '100%', height: '80%', marginTop: '20px' }"
  ></div>
</template>
<script>
import echarts from 'echarts'
import { getRegionSortStatistics2 } from '@/api/api'
export default {
  name: "zczeBt",
  props: {
    regionName: String
  },
  data () {
    return {
      data: [
        // { value: 1218.23, name: '商业' },
        // { value: 1842.72, name: '办公' },
        // { value: 116.64, name: '居住' },
        // { value: 150.12, name: '车位' }
      ]
    }
  },
  watch: {
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.init()
        }, 100)
      },
      immediate: true
    }
  },
  // 监听路由变化
  created () {
    // setTimeout(() => {
    //   this.init()
    // }, 100)
  },
  methods: {
    init () {
      getRegionSortStatistics2(null, this.$store.state.fgsSelValue).then(res => {
        this.data = []
        // res.data.data.forEach(element => {
        // })
        for (const key in res.data.data) {
          let obj = {}
          if (key === 'business') {
            obj.value = res.data.data[key]
            obj.name = '商业'
            this.data.push(obj)
          } else if (key === 'work') {
            obj.value = res.data.data[key]
            obj.name = '办公'
            this.data.push(obj)
          } else if (key === 'apartment') {
            obj.value = res.data.data[key]
            obj.name = '居住'
            this.data.push(obj)
          } else if (key === 'parkingLot') {
            obj.value = res.data.data[key]
            obj.name = '车位'
            this.data.push(obj)
          }
        }
        this.drawLine()

        // this.data = []
        // if (res.data.code === 0) {
        //   if (res.data.data === null) {
        //     this.data = [
        //       { value: 1218.23, name: '商业' },
        //       { value: 1842.72, name: '办公' },
        //       { value: 116.64, name: '居住' },
        //       { value: 150.12, name: '车位' }
        //     ]
        //   }
        //   this.data[0].value = res.data.data.business
        //   this.data[1].value = res.data.data.work
        //   this.data[2].value = res.data.data.apartment
        //   this.data[3].value = res.data.data.parkingLot
        //   this.drawLine()
        // }
      })
    },
    drawLine () {
      let myChart = echarts.init(document.getElementById('myCharHhxt'))
      var colorList = ['#deb140', '#c487ee', '#49dff0', '#6f81da', '#00ffb4']
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
