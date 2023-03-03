<template>
  <div id="myChartbt111" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import echarts from 'echarts'
import { getRegionSortStatistics2 } from '@/api/api.js'
export default {
  name: 'hello',
  data () {
    return {
      legend: [],
      seriesData: [
      ],
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
          this.getFJlist()
        }, 100)
      },
      immediate: true
    }
  },
  mounted () {
    // this.getFJlist()
  },
  methods: {
    async getFJlist () {
      this.seriesData = []
      this.legend = []
      const res = await getRegionSortStatistics2(null, this.$store.state.fgsSelValue)
      if (res.data.code == 0) {
        // res.data.data.forEach(element => {
        // })
        for (const key in res.data.data) {
          let obj = {}
          if (key === 'business') {
            obj.value = res.data.data[key]
            obj.name = '商业'
            this.legend.push('商业')
            this.seriesData.push(obj)
          } else if (key === 'work') {
            obj.value = res.data.data[key]
            obj.name = '办公'
            this.legend.push('办公')
            this.seriesData.push(obj)
          } else if (key === 'apartment') {
            obj.value = res.data.data[key]
            obj.name = '居住'
            this.legend.push('居住')
            this.seriesData.push(obj)
          } else if (key === 'parkingLot') {
            obj.value = res.data.data[key]
            obj.name = '车位'
            this.legend.push('车位')
            this.seriesData.push(obj)
          }
        }
        this.drawLine()
      }
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChartbt111'))
      var color = [
        '#0CD2E6',
        '#3751E6',
        '#FFC722',
        '#886EFF',
        '#008DEC',
        '#114C90',
        '#00BFA5',
      ]


      var seriesData = this.seriesData
      // 绘制图表
      var option = {
        backgroundColor: 'rgb(0,0,0,0)',
        color: color,
        title: {
          show: true,
          text: '管理面积（平米）',
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 16,
          },
          top: '0%',
          left: 'center',
        },
        grid: {
          top: '15%',
          left: '10%',
          bottom: 5,
          containLabel: true,
        },
        legend: {
          orient: 'vertical',
          top: '0%',
          right: 30,
          textStyle: {
            align: 'left',
            verticalAlign: 'middle',
            rich: {
              name: {
                color: 'rgba(255,255,255,0.5)',
                fontSize: 16,
              },
              value: {
                color: 'rgba(255,255,255,0.5)',
                fontSize: 16,
              },
              rate: {
                color: 'rgba(255,255,255,0.9)',
                fontSize: 16,
              },
            },
          },
          data: this.legend,
          formatter: (name) => {
            if (seriesData.length) {
              const item = seriesData.filter((item) => item.name === name)[0]
              return `{name|${name}：}{value| ${item.value}}`
            }
          },
        },
        series: [{
          name: '需求类型占比',
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['45%', '60%'],
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
                  fontSize: 32,
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

      myChart.setOption(option, true)


      getDefaultSelected(myChart)

      function getDefaultSelected (myChart) {
        let index = 0
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0,
        })
        myChart.on('mouseover', (e) => {
          if (e.dataIndex !== index) {
            myChart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: index,
            })
          }
        })
        myChart.on('mouseout', (e) => {
          index = e.dataIndex
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: e.dataIndex,
          })
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
