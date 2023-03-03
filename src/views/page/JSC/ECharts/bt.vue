<template>
  <div id="myChartBt" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import { getSelectBlocBusinessType, getOwnerType, getOwnerType2 } from '@/api/api'
import echarts from 'echarts'
export default {
  name: 'hello',
  data () {
    return {
      show: true,
      data: [],
      name: null
    }
  },
  watch: {
    "$store.state.mapVal" (val, oldVal) {
      this.name = val.name
      this.onSHow()
    }
  },
  mounted () {
    setTimeout(() => {
      this.onSHow()
    }, 100)
  },
  methods: {
    onSHow () {
      this.data = []
      if (this.$route.path === '/threeMenuIndex') {
        // this.data = [{ name: '科研院校', value: 20 }, { name: '企业', value: 20 }, { name: '事业单位', value: 20 }, { name: '医院', value: 20 }, { name: '政府机关', value: 20 }]
        // this.drawLine()
        getOwnerType2(this.$store.state.fgsSelValue, this.name).then((res) => {
          res.data.data.forEach((item) => {
            let obj = {
              value: item.num,
              name: item.type
            }
            this.data.push(obj)
          })
          this.drawLine()
        })
      } else {
        getSelectBlocBusinessType(this.name).then((res) => {
          if (res.data.code === 0) {
            this.data = []
            res.data.data.forEach((item) => {
              let obj = {
                value: item.num,
                name: item.type
              }
              this.data.push(obj)
            })
            this.drawLine()
          }
        })
      }
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChartBt'))
      //数据
      // 绘制图表
      myChart.setOption({
        color: ['#59A2FE', '#FFB717', '#FC8F6B', '#70E07B', '#FBDA3D', '#11E5F1', '#E3A0FF', '#8294FC', '#6AD6FE'],
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          itemWidth: 18,
          itemHeight: 10,
          right: '3%',
          align: 'left',
          top: '0',
          textStyle: {
            fontSize: 16,
            fontFamily: 'PingFangSC-Regular, PingFang SC',
            fontWeight: 400,
            color: 'white',
            lineHeight: 30,
          },
        },
        series: [
          {
            type: 'pie',
            center: ['40%', '45%'],
            radius: [0, 50],
            labelLine: {
              normal: {
                length: 20,
                length2: 30,
              },
            },
            label: {
              normal: {
                formatter: '{a|{b}}\n{per|{d}%}',
                rich: {
                  a: {
                    fontSize: 16,
                    lineHeight: 16,
                    align: 'center',
                  },
                  per: {
                    color: 'white',
                    align: 'center',
                    fontSize: 14,
                    lineHeight: 16,
                  },
                },
              },
            },
            data: this.data
          },
        ],
      }, true)
    }
  }
}
</script>

<style scoped>
</style>
