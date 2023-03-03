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
        {
          name: '男',
          value: [1, 7, 53, 56, 212],
        },
        {
          name: '女',
          value: [2, 14, 56, 35, 54],
        },
      ],
      stages: [
        { name: '20-30岁', max: 100 },
        { name: '30-40岁', max: 100 },
        { name: '40-50岁', max: 100 },
        { name: '50-60', max: 100 },
        { name: '60-70', max: 300 }
      ],
      show1: false
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
      this.data = val.djData.dyLeiDa
      this.drawLine()
    },
    "$store.state.zgsObj" (val, oldVal) {
      this.data = val.djData.dyLeiDa
      this.drawLine()
    }
  },
  mounted () {
    this.$axios.get(this.baseUrl + 'bloc/blocpersonneluserinfo/userStatistic', {
      headers: { 'token': localStorage.getItem('token') }
    }).then((res) => {
      this.drawLine()
    })
  },
  methods: {
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartZczeBt'))
        var color = ['#00ffff', '#409B5C', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']
        var stages = this.stages
        var scores = this.data
        function contains (arr, obj) {
          var i = arr.length
          while (i--) {
            if (arr[i].name === obj) {
              return i
            }
          }
          return false
        }
        let option = {
          color: ['#41E1FF', 'rgb(255,292,203)'],
          legend: {
            top: 0,
            right: 0,
            icon: 'rect',
            itemWidth: 17, // 图例标记的图形宽度。[ default: 25 ]
            itemHeight: 12, // 图例标记的图形高度。[ default: 14 ]
            itemGap: 9, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
            textStyle: {
              fontSize: 16,
              color: '#fff',
            },
            data: ['男', '女'],
          },
          radar: {
            radius: '60%',
            triggerEvent: true,
            name: {
              rich: {
                a: {
                  fontSize: 12,
                  color: '#fff',
                  lineHeight: '40',
                  padding: [0, 15, 0, 15],
                },
                b: {
                  color: '#41E1FF',
                  fontSize: 12,
                  padding: [0, 0, 0, 15],
                },
                c: {
                  color: '#fff',
                  fontSize: 12,
                },
                d: {
                  color: 'rgb(255,292,203)',
                  fontSize: 12,
                  padding: [0, 15, 0, 0],
                },
                triggerEvent: true,
              },
              formatter: (a) => {
                let i = contains(stages, a) // 处理对应要显示的样式
                return `{a| ${a}}\n{b| ${scores[0]['value'][i]}}{c|  / }{d| ${scores[1]['value'][i]}}`
              },
            },
            nameGap: '2',
            indicator: stages,
            splitArea: {
              areaStyle: {
                color: [
                  // '#172C65' ,'#122454','#0A1835',

                  'rgba(39,67,143, 0.1)',
                  'rgba(39,67,143, 0.2)',
                  'rgba(39,67,143, 0.4)',
                  'rgba(39,67,143, 0.6)',
                  'rgba(39,67,143, 0.8)',
                  'rgba(39,67,143, 1)',
                ].reverse(),
              },
            },
            // axisLabel:{//展示刻度
            //     show: true
            // },
            axisLine: {
              //指向外圈文本的分隔线样式
              lineStyle: {
                color: 'rgba(0,0,0,0)',
              },
            },
            splitLine: {
              lineStyle: {
                width: 2,
                color: ['rgba(45,65,110, 0.6)'].reverse(),
              },
            },
          },

          series: [
            {
              name: '进站',
              type: 'radar',
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    1,
                    0,
                    0,
                    [
                      {
                        offset: 0,
                        color: '#37c5f4',
                        opacity: 1,
                      },
                      {
                        offset: 1,
                        color: '#19469a',
                        opacity: 1,
                      },
                    ],
                    false
                  ),
                },
              },
              symbolSize: 0,
              lineStyle: {
                normal: {
                  color: '#32a9ea',
                  width: 1,
                },
              },
              data: [scores[0]],
            },
            {
              name: '出站',
              type: 'radar',
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    1,
                    0,
                    0,
                    [
                      {
                        offset: 0,
                        color: '#ffc40b',
                      },
                      {
                        offset: 1,
                        color: '#e3c424',
                      },
                    ],
                    false
                  ),

                  opacity: 0.6,
                },
              },
              symbolSize: 0,
              lineStyle: {
                normal: {
                  color: 'rgba(255,292,203, 0.6)',
                  width: 1,
                },
              },
              data: [scores[1]],
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
