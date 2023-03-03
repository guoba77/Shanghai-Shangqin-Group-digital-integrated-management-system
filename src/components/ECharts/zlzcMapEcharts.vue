<template>
  <div id="myChartMap" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import * as vueEcharts from "echarts"
import { getStatisticsRegionMapArea, getStatisticsRegionMapArea2 } from '@/api/api'
export default {
  name: "zczeBt",
  data () {
    return {
      path: '',
      valList: {},
      guangxiJson: '',
      mapDate: [],
      mapDate1: [
        { name: '黄浦区', value: [121.483572, 31.215946], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a1.png') },
        { name: '徐汇区', value: [121.439405, 31.162992], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a1.png') },
        { name: '长宁区', value: [121.380949, 31.20737], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a1.png') },
        { name: '静安区', value: [121.450659, 31.270821], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a1.png') },
        { name: '普陀区', value: [121.392042, 31.257895], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a1.png') },
        { name: '虹口区', value: [121.485443, 31.276649], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a2.png') },
        { name: '杨浦区', value: [121.529302, 31.29835], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a3.png') },
        { name: '闵行区', value: [121.418901, 31.087213], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a1.png') },
        { name: '宝山区', value: [121.404861, 31.392111], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a2.png') },
        { name: '嘉定区', value: [121.24439, 31.358138], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a2.png') },
        { name: '浦东新区', value: [121.742177, 31.083823], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a1.png') },
        { name: '金山区', value: [121.255144, 30.818932], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a2.png') },
        { name: '松江区', value: [121.220231, 31.015194], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a2.png') },
        { name: '青浦区', value: [121.085188, 31.124681], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a2.png') },
        { name: '奉贤区', value: [121.56251, 30.897998], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a2.png') },
        { name: '崇明区', value: [121.568484, 31.635916], datas: 0, list: {}, img: 'image://' + require('@/assets/icon/a1.png') }
      ]
    }
  },
  created () {
    this.path = this.$route.path
    this.guangxiJson = require("../../assets/上海市.json")
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.valList = val
      },
    }
  },
  // 监听路由变化
  mounted () {
    this.$nextTick(() => {
      vueEcharts.registerMap("shanghai", this.guangxiJson)
      setTimeout(() => {
        // 地图上面出租率收缴率
        if (this.$route.path === '/wy-primaryIndex') {
          getStatisticsRegionMapArea().then(res => {
            if (res.data.code === 0) {
              this.mapDate1.forEach((map) => {
                res.data.data.forEach((item) => {
                  if (item != null) {
                    if (map.name === item.regionName) {
                      map.list = item
                      map.datas = item.num
                      this.mapDate.push(map)
                    }
                  }
                })
              })
              this.drawLine()
            }
          })
        } else if (this.$route.path === '/threeMenuIndex') {
          getStatisticsRegionMapArea2(this.$store.state.fgsSelValue).then(res => {
            if (res.data.code === 0) {
              this.mapDate1.forEach((map) => {
                res.data.data.forEach((item) => {
                  if (item != null) {
                    if (map.name === item.regionName) {
                      map.list = item
                      map.datas = item.num
                      this.mapDate.push(map)
                    }
                  }
                })
              })
              this.drawLine()
            }
          })
        }

      }, 100)
    })
  },
  methods: {
    drawLine () {
      let myChart = vueEcharts.init(document.getElementById('myChartMap'))
      myChart.hideLoading()
      var mapDate = this.mapDate
      // var geoCoordMap = {
      //   '黄浦区':[121.483572,31.215946],
      //   '徐汇区':[121.439405,31.162992],
      //   '长宁区':[121.380949,31.20737],
      //   '静安区':[121.450659,31.270821],
      //   '普陀区':[121.392042,31.257895],
      //   '虹口区':[121.485443,31.276649],
      //   '杨浦区':[121.529302,31.29835],
      //   '闵行区':[121.418901,31.087213],
      //   '宝山区':[121.404861,31.392111],
      //   '嘉定区':[121.24439,31.358138],
      //   '浦东新区':[121.742177,31.083823],
      //   '金山区':[121.255144,30.818932],
      //   '松江区':[121.220231,31.015194],
      //   '青浦区':[121.085188,31.124681],
      //   '奉贤区':[121.56251,30.897998],
      //   '崇明区':[121.07994,31.042411]
      // }
      var max = 480, min = 9 // todo
      var maxSize4Pin = 100, minSize4Pin = 20

      // var convertData = function (data) {
      //   var res = [];
      //   for (var i = 0; i < data.length; i++) {
      //     var geoCoord = geoCoordMap[data[i].name];
      //     if (geoCoord) {
      //       res.push({
      //         name: data[i].name,
      //         value: geoCoord.concat(data[i].value)
      //       });
      //     }
      //   }
      //   return res;
      // };

      let option = {
        backgroundColor: 'rgb(0,0,0,0)',
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
          extraCssText:
            'background: rgb(0,0,0,0.5)',
          textStyle: {
            color: 'red',
          },
          formatter: function(params) {
            return `
              <ul class="map-tooltip" style="color: deepskyblue;list-style: none;font-size: 18px">
              <li class="title">
                    <div class="province"><span style="color: yellow">地区：</span>${params.data.list.regionName ? params.data.list.regionName : '--'}</div>
                  </li>
                 <li class="title">
                    <div class="province"><span style="color: yellow">面积：</span>${params.data.list.area ? params.data.list.area : '--'}</div>
                  </li>
                 <li class="title">
                    <div class="province"><span style="color: yellow">出租率：</span>${params.data.list.occupancyRate ? params.data.list.occupancyRate : '--'}</div>
                 </li>
                 <li class="title">
                    <div class="province"><span style="color: yellow">收缴率：</span>${params.data.list.collectionRate ? params.data.list.collectionRate : '--'}</div>
                 </li>
              </ul>
            `
          },
        },
        visualMap: {
          show: false,
          min: 0,
          max: 500,
          left: 'left',
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
          top: '-100px',
          show: true,
          map: 'shanghai',
          zoom: 1.7,
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
              borderColor: '#3fdaff',
              borderWidth: 2,
              shadowColor: 'rgba(63, 218, 255, 0.5)',
              shadowBlur: 30,
            },
            emphasis: {
              areaColor: '#40c3f4',
            }
          }
        },
        series: [
          // {
          //   type: 'map',
          //   map: 'shanghai',
          //   geoIndex: 0,
          //   aspectScale: 0.75, //长宽比
          //   showLegendSymbol: false, // 存在legend时显示
          //   label: {
          //     normal: {
          //       show: false
          //     },
          //     emphasis: {
          //       show: false,
          //       textStyle: {
          //         color: '#fff'
          //       }
          //     }
          //   },
          //   roam: true,
          //   itemStyle: {
          //     normal: {
          //       areaColor: '#1D346F',
          //       borderColor: '#D79D3D',
          //     },
          //     emphasis: {
          //       areaColor: '#0f2c70',
          //     },
          //   },
          //   animation: false,
          //   data: data
          // },
          {
            name: '',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'image://' + require('@/assets/icon/dq1.png'),
            data: mapDate,
            symbolSize: [40, 40],
            label: {
              normal: {
                // formatter: '{b}',
                formatter: function(params) {
                  var name = params.name
                  var value = params.data.datas
                  var text = `${name}` + ' ' + `${value}个`
                  return text
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

        ]
      }
      // option.visualMap = {
      //   min: min,
      //   max: max,
      //   left: '3%',
      //   bottom: '5%',
      //   calculable: true,
      //   seriesIndex: 0,
      //   inRange: {
      //     color: ['#164CFF', '#0027AB', '#00196D'],
      //   },
      //   textStyle: {
      //     color: 'red',
      //   },
      // };
      myChart.setOption(option, true)
      myChart.on('click', (params) => {
        if (params.data) {
          this.$emit('mapVal', params.data.list)
        }
      })
      window.onresize = function() {
        myChart.resize()
      }
    }

  }
}
</script>

<style scoped>
.province {
  color: #cccccc;
}
</style>
