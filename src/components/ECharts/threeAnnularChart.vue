<template>
  <div id="myChartXBBt" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: "zczeBt",
  data () {
    return {
      data: [
        { value: 1048, name: '男' },
        { value: 735, name: '女' }
      ],
      pieData: [
        {
          name: '年度总收入',
          value: 100000000,
        },
        {
          name: '总支出',
          value: 2500000,
        },
        {
          name: '总盈利',
          value: 1800000,
        },
      ],
      path: '',
      radius: '50%'
    }
  },
  created () {
    this.path = this.$route.path
    if (this.path === '/threeMenuIndex') {
      if (this.$route.query.sjName === '租赁资产') {
        this.pieData = [
          {
            name: '年度总收入',
            value: 100000000,
          },
          {
            name: '总支出',
            value: 2500000,
          },
          {
            name: '总盈利',
            value: 2000000,
          },
        ]
      }
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChartXBBt'))
      let pieData = this.pieData

      var titleArr = [],
        seriesArr = []

      pieData.forEach(function(item, index) {
        titleArr.push({
          text: item.name,
          left: index * 35 + 15.5 + '%',
          top: '10%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '20',
            color: 'white',
            textAlign: 'center',
          },
        })
        seriesArr.push(
          {
            //  name: item.name,
            type: 'pie',
            clockWise: false,
            radius: ['28%', '33%'],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#0ff',
                  },
                  {
                    offset: 1,
                    color: '#5467df',
                  },
                ]),
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            center: [index * 35 + 15.5 + '%', '50%'],
            data: [

              {
                value: 100 - item.value,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: '#ffffff',
                  },
                  emphasis: {
                    color: '#ffffff',
                  },
                },
              },
              {
                value: item.value,
                label: {
                  normal: {
                    formatter: function(params) {
                      return params.value + "元"
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                      fontSize: '16',
                      // fontWeight: 'bold',
                      color: '#1cc7ff',
                    },
                  },
                },
              }
            ],
          },

        )
      })

      let option = {
        grid: {
          left: '5%',
          right: '2%',
          bottom: '0%',
          top: '0%',
          containLabel: true,
        },
        backgroundColor: '#323a5e',
        title: titleArr,
        series: seriesArr,
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>
</style>
