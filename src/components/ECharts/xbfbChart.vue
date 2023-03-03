<template>
  <div id="myChartXb" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import { RsXbFb, RsXbFb2 } from '../../api/api'
import echarts from 'echarts'
export default {
  name: "zczeBt",
  data () {
    return {
      text: '营业收入',
      path: '',
      data: ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11', '2021-12'],
      dataNum: [820, 932, 901, 934, 1290, 1330, 1320, 2000, 3000, 4000, 5000, 6000],
      titleLeft: '0%',
      titleTop: '0%',
      ti: {},
      bgColor: '#323a5e',
      color: 'white',
      labelColor: 'white',
      lineColor: 'white',
      pathName: '全部',
      dataArray: [
        { name: '35岁以下', num: 359 },
        { name: '35岁（含）至45岁', num: 545 },
        { name: '45岁及以上', num: 777 }
      ],
      dataArr: [
        { name: '男', num: 1062 },
        { name: '女', num: 619 }
      ]
    }
  },
  watch: {
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        setTimeout(() => {
          this.onSHow()
        }, 100)
      },
      immediate: true
    }
  },
  mounted () {
    this.path = this.$route.path
  },
  methods: {
    onSHow () {
      this.dataArr = []
      if (this.path === '/rs-primaryIndex') {
        RsXbFb().then((res) => {
          if (res.data.code === 0) {
            res.data.data.forEach((item) => {
              if (item.gender != null) {
                let obj = {
                  name: item.gender,
                  num: item.value
                }
                this.dataArr.push(obj)
              }
            })
            this.drawLine()
          }
        })
      } else if (this.path === '/threeMenuIndex' && this.$store.state.zgsBut === '人事') {
        RsXbFb2(this.$store.state.fgsSelValue).then((res) => {
          if (res.data.code === 0) {
            res.data.data.forEach((item) => {
              if (item.gender != null) {
                let obj = {
                  name: item.gender,
                  num: item.value
                }
                this.dataArr.push(obj)
              }
            })
            this.drawLine()
          }
        })
      }
    },
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChartXb'))
      const dataArray = this.dataArray
      const dataArr = this.dataArr
      // 计算总数
      let total = dataArray.reduce((p, v) => { return p + v.num }, 0)
      const colorList = [
        [{ offset: 0, color: 'rgba(173, 255, 248, 1)' }, { offset: 1, color: 'rgba(50, 255, 238, 1)' }],
        [{ offset: 0, color: '#409B5C' }, { offset: 1, color: 'rgba(0, 233, 179, 1)' }],
        [{ offset: 0, color: 'rgba(178, 255, 191, 1)' }, { offset: 1, color: 'rgba(29, 246, 66, 1)' }],
        [{ offset: 0, color: 'yellow' }, { offset: 1, color: 'rgba(240, 255, 71, 1)' }],
        [{ offset: 0, color: 'rgba(255, 234, 149, 1)' }, { offset: 1, color: 'rgba(255, 213, 47, 1)' }],
        [{ offset: 0, color: 'rgba(255, 180, 145, 1)' }, { offset: 1, color: 'rgba(255, 126, 76, 1)' }],
        [{ offset: 0, color: 'rgba(255, 156, 150, 1)' }, { offset: 1, color: 'rgba(255, 96, 86, 1)' }],
        [{ offset: 0, color: '' }, { offset: 1, color: 'rgba(97, 187, 255, 1)' }],
      ]
      const colorList2 = [
        [{ offset: 0, color: '#68d3ff' }, { offset: 1, color: '#bfecff' }],
        [{ offset: 0, color: '#ff938d' }, { offset: 1, color: '#ffdfdd' }]
      ]

      const color = ['#00ffff', 'rgba(0, 233, 179, 1)', '#ffe000', 'rgba(240, 255, 71, 1)', 'rgba(255, 213, 47, 1)', 'rgba(255, 126, 76, 1)', 'rgba(255, 96, 86, 1)', 'rgba(97, 187, 255, 1)',]
      const color2 = ['#00a7ec', '#ff564c']
      // data数据
      const echartData = dataArray.map((v, i) => ({
        name: v.name,
        value: v.num,
        itemStyle: {
          color: { type: 'linear', colorStops: colorList[i] }
        },
        label: {
          color: color[i]
        }
      }))

      const totalData = dataArr.map((v, i) => ({
        name: v.name,
        value: v.num,
        itemStyle: { color: { type: 'linear', colorStops: colorList2[i] } },
        label: { color: color2[i] }
      }))

      // tooltip
      const tooltip = {
        trigger: 'item',
        formatter: params => {
          return `<div>${params.data.name}: ${params.data.value + '人'}</div>`
        }
      }
      const legend = {
        top: '20',
        left: 'center',
        itemWidth: 20,
        itemHeight: 8,
        textStyle: {
          color: '#aab2cd',
          fontSize: 18
        },
      }
      // series
      const series = [{
        name: '性别比例',
        type: 'pie',
        center: ['50%', '50%'],
        radius: [0, '50%'],
        label: {
          fontSize: 16,
          position: 'inner',
          formatter: params => {
            return `{${params.name === '男' ? 'a' : 'b'}|}\n\n${params.percent.toFixed(0)}%`
          },
          rich: {
            b: {
              width: 24,
              height: 34,
              backgroundColor: { image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAARCAYAAAGeOn00AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTAxLTI2VDE0OjAxOjA3KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wMS0yNlQwNjowMTowNyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wMS0yNlQwNjowMTowNyswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzkzNDUzODc1N0MwMTFFQjg4MUFBREMzRTE4MjA1QkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzkzNDUzODg1N0MwMTFFQjg4MUFBREMzRTE4MjA1QkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozOTM0NTM4NTU3QzAxMUVCODgxQUFEQzNFMTgyMDVCRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozOTM0NTM4NjU3QzAxMUVCODgxQUFEQzNFMTgyMDVCRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pqz3FB4AAAFASURBVHjaYvwf5sMAAkxA7A7EvCxAYidIBCCAGIBSniDhOSBCGiCAGGEqQYAFSv8HEQABBJN5BsRSTFAZKZihN6DK/oM4v6CyjCCOHhAfBfEAAgjZaJAhkiAxZGteArEYkpUiIO3zgVifAQE+AXE6SEciVMAXiDcDMT+IAxBA6HYkA/F2mBthAGTxPHQ/MsBcAwMgHcIwX0HxS5jEGyDmQ7LnPRB7gIyqBuInSIEDsqsd5qr/SMaDAkyTCc1iP5AgunOPQD0IBgABhhI/aIEJAs9hkYLsDXSQAsQvgPgplM2AS4M3EH8A4q1ALAFKHlA2SMwHXcMiIN4CxHOB+CaSITehYpuhasAa7gFxDBDbQd2vjqRBHSpmC1VzGxSwSlBJkElJWPzUA5VjQvdDMjR8G5DEGqFiKfhCaRYSeya6JACa+kVE7jeZ3AAAAABJRU5ErkJggg==" },
            },
            a: {
              width: 24,
              height: 34,
              backgroundColor: { image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAAGTJA1zAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTAxLTI2VDE0OjAxOjA3KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wMS0yNlQwNjowMTowNyswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wMS0yNlQwNjowMTowNyswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzkzNDUzODM1N0MwMTFFQjg4MUFBREMzRTE4MjA1QkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzkzNDUzODQ1N0MwMTFFQjg4MUFBREMzRTE4MjA1QkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozOTM0NTM4MTU3QzAxMUVCODgxQUFEQzNFMTgyMDVCRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozOTM0NTM4MjU3QzAxMUVCODgxQUFEQzNFMTgyMDVCRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkPD8hsAAAEYSURBVHjaYmRY/oYBBJiAOBaI/4MYi4GYESCAGIBSz0A8SRAhDBBAjDCVMNUgsAREAAQQTMYTJrodxGgBGQaT+g+TYgAIIGRj/gPxC5gFMAEQkADiDSDBdxCHgGkQMAIJCkE5eVBaDiCA4A4A4rlALIXsRJCAJMxGFigtxYAEQCp3QW2HYbA7/yMpagXiyyDtj4FYFuqkGiB+C9IuB/M5lBZmQtK6HT3UUAQBAgwlXIHgGZJ7nyM7FVk3CKRAQ+8plI0ROXZQ07ZCQ1Qayr4HxJYwhQJAvAeIPzBggh9AvA+IeZmg4cgKTSToACTGAcTzQJ5xAjK+APEpaFDCaHNoXJoBMQ8L1GgGtCCBKWSAasTwNUzhdnRBADYqQ0hfEuEBAAAAAElFTkSuQmCC' }
            }
          }
        },
        selectedMode: 'single',
        data: totalData,
      }]

      let option = { legend, tooltip, series, color, backgroundColor: 'rgba(0, 0, 0, 0)' }

      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>
</style>
