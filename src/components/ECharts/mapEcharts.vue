<template>
  <div id="myChartMap" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import * as vueEcharts from "echarts"
import { getSelectBlocMapDisplay, getSelectBlocMapDisplay2 } from '@/api/api'
function deWeight (arr) {
  var tmp = []
  if (Array.isArray(arr)) {
    arr.concat().sort().sort(function(a, b) {
      if (a.latitude == b.latitude && tmp.indexOf(a.latitude) === -1) tmp.push(a.latitude)
    })
  }
  return tmp
}
export default {
  name: "zczeBt",
  data () {
    return {
      path: '',
      guangxiJson: '',
      mapList: [],
      zoom: 1.6
    }
  },
  created () {
    this.path = this.$route.path
    this.guangxiJson = require("../../assets/上海市.json")
  },
  watch: {
    'zoom' (val, oldVal) {
      if (val >= 4) {
        this.drawLine(this.mapList)
      } else if (val < 4) {
        this.drawLine([])
      }
    }
  },
  // 监听路由变化
  mounted () {
    this.$nextTick(() => {
      vueEcharts.registerMap("shanghai", this.guangxiJson)
      setTimeout(() => {
        if (this.$route.path === '/fw-primaryIndex') {
          getSelectBlocMapDisplay().then((res) => {
            if (res.data.code === 0) {
              for (let i in res.data.data) {
                let obj = {}
                obj.value = [res.data.data[i][0].longitude, res.data.data[i][0].latitude]
                obj.name = res.data.data[i][0].address
                obj.datas = res.data.data[i][0].visible
                obj.list = res.data.data[i]
                this.mapList.push(obj)
              }
            }
            this.drawLine()
          })
        } else if (this.$route.path === '/threeMenuIndex') {
          getSelectBlocMapDisplay2(this.$store.state.fgsSelValue).then((res) => {
            if (res.data.code === 0) {
              for (let i in res.data.data) {
                let obj = {}
                obj.value = [res.data.data[i][0].longitude, res.data.data[i][0].latitude]
                obj.name = res.data.data[i][0].address
                obj.datas = res.data.data[i][0].visible
                obj.list = res.data.data[i]
                this.mapList.push(obj)
              }
            }
            this.drawLine()
          })
        }
      }, 100)
    })
  },
  methods: {
    drawLine (data) {
      let myChart = vueEcharts.init(document.getElementById('myChartMap'))
      myChart.hideLoading()
      var mapDate = data
      let geoCoordMap = {
        '黄浦区': [121.483572, 31.215946],
        '徐汇区': [121.439405, 31.162992],
        '长宁区': [121.380949, 31.20737],
        '静安区': [121.450659, 31.270821],
        '普陀区': [121.392042, 31.257895],
        '虹口区': [121.485443, 31.276649],
        '杨浦区': [121.529302, 31.29835],
        '闵行区': [121.418901, 31.087213],
        '宝山区': [121.404861, 31.392111],
        '嘉定区': [121.24439, 31.358138],
        '浦东新区': [121.742177, 31.083823],
        '金山区': [121.255144, 30.818932],
        '松江区': [121.220231, 31.015194],
        '青浦区': [121.085188, 31.124681],
        '奉贤区': [121.56251, 30.897998],
        '崇明区': [121.568484, 31.635916]
      }
      var data111 = [
        { name: '黄浦区', value: 11 },
        { name: '徐汇区', value: 4 },
        { name: '长宁区', value: 22 },
        { name: '静安区', value: 14 },
        { name: '普陀区', value: 19 },
        { name: '虹口区', value: 7 },
        { name: '杨浦区', value: 14 },
        { name: '闵行区', value: 22 },
        { name: '宝山区', value: 17 },
        { name: '嘉定区', value: 36 },
        { name: '浦东新区', value: 45 },
        { name: '金山区', value: 43 },
        { name: '松江区', value: 23 },
        { name: '青浦区', value: 17 },
        { name: '奉贤区', value: 32 },
        { name: '崇明区', value: 53 }
      ]
      let convertData = function(data) {
        let res = []
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }
      let option = {
        backgroundColor: 'rgba(0,0,0,0)',
        title: {
          text: '',
          subtext: '',
          x: 'center',
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          show: true,
          // enterable: true, //鼠标可进入浮层内
          triggerOn: "click", // 点击触发
          backgroundColor: 'white',
          padding: 10,
          position: ['25%', '10%'],
          extraCssText: 'background: rgb(0,0,0,0.5);',
          textStyle: {
            color: 'red',
          },
          formatter: function(params) {
            if (!params.data.datas) {
              that.$store.commit('onMapVal', params.data)
            }
            if (params.data.list) {
              let a = ''
              let tr = `<table border="1" align="center" style="text-align: center;color: white;" class="tab">
                <tr>
                  <th style="padding: 5px 10px">项目名称</th>
                  <th style="padding: 5px 10px">保障类型</th>
                  <th style="padding: 5px 10px">业务类型</th>
                  <th style="padding: 5px 10px">地址</th>
<!--                  <th style="padding: 5px 10px">面积</th>-->
<!--                  <th style="padding: 5px 10px">服务人数</th>-->
                </tr>`
              params.data.list.forEach((item) => {
                a += `<tr>
                        <td style="padding: 5px 10px">${item.entryName ? item.entryName : '--'}</td>
                        <td style="padding: 5px 10px">${item.proprietorTypeName ? item.proprietorTypeName : '--'}</td>
                        <td style="padding: 5px 10px">${item.businessTypeName ? item.businessTypeName : '--'}</td>
                        <td style="padding: 5px 10px">${item.address ? item.address : '--'}</td>
                    </tr>`
                //     <td style="padding: 5px 10px">${item.measure ? item.measure : '--'}</td>
                // <td style="padding: 5px 10px">${item.number ? item.number : '--'}</td>
              })
              let b = `<table/>`
              return tr + a + b
            }
          }
        },
        legend: {
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: ['credit_pm2.5'],
          textStyle: {
            color: '#ffffff'
          }
        },
        visualMap: {
          show: false,
          left: 'center',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ['#1488CC', '#2B32B2'] // 浅蓝
          }
        },
        geo: {
          left: '800px',
          top: '30px',
          show: true,
          map: 'shanghai',
          zoom: this.zoom,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
            }
          },
          roam: true,
          itemStyle: {
            show: true,
            normal: {
              areaColor: 'transparent',
              borderColor: '#6CA9D0',
              borderWidth: 2,
              shadowColor: 'rgba(63, 218, 255, 0.5)',
              shadowBlur: 30,
            },
            emphasis: {
              areaColor: '#40c3f4',
            },
          },
        },
        series: [
          {
            name: '',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: function(value, params) {
              if (params.data.list.length >= 3) {
                let arr = []
                params.data.list.forEach((item) => {
                  arr.push(item.businessTypeName)
                })
                if (arr.includes('餐饮') && arr.includes('物业') && arr.includes('汽服')) {
                  return 'image://' + require('@/assets/icon/a4.png')
                } else {
                  return 'image://' + require('@/assets/icon/a5.png')
                }
              } else {
                return 'image://' + require('@/assets/icon/a5.png')
              }
            },
            data: mapDate,
            symbolSize: function(val) {
              return 20
            },
            label: {
              normal: {
                // formatter: '{b}',
                formatter: function(params) {
                  // var name = params.name;
                  var value = params.data.list.length ? params.data.list.length : 0
                  // var text = `${params.data.list[0].regionName} 数量${value}个`;
                  var text = `数量${value}个`
                  return ''
                },
                position: 'right',
                show: true,
                color: '#fff',
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'white'
              }
            }
          },
          {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data111),
            symbolSize: function(val) {
              return 18
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                color: 'white',
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#1D346F',
                borderColor: '#D79D3D',
              },
              emphasis: {
                areaColor: '#0f2c70',
              },
            },
            zlevel: 1
          },
        ]
      }
      window.onresize = function() {
        myChart.resize()
      }
      let that = this
      // 监控缩放
      myChart.on('georoam', function(params) {
        // that.zoom = myChart.getOption().geo[0].zoom
        let timer = null
        if (timer) {
          return
        }
        timer = setTimeout(() => {
          timer = null
          that.zoom = myChart.getOption().geo[0].zoom
        }, 0)
        // setTimeout(() => {
        // },3000)
      })
      myChart.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.province {
  color: #cccccc;
}
</style>
