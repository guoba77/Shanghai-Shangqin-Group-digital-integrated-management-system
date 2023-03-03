<template>
  <div id="myChartDepart" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: "depart",
  data () {
    return {
      data: [

      ],
    }
  },
  created () {
    this.path = this.$route.path
  },
  mounted () {
    setTimeout(() => {
      this.drawLine()
    }, 500)
    // this.$$nextTick(() => {
    //   this.drawLine()
    // })
  },
  methods: {
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChartDepart'))
      // var color = ['#00ffff', '#ffe000']
      let option = {
        toolbox: {
          show: true,
          feature: {
            // dataView : {show: true, readOnly: false},
          }
        },
        tooltip: {
          show: false,
          trigger: 'item',
          formatter: "{b}: {c}"
        },
        series: [
          {
            type: "tree",
            orient: "horizontal",
            edgeShape: 'curve',
            top: '10%',
            initialTreeDepth: 3,
            expandAndCollapse: true,
            symbolSize: 9,
            // symbolSize: [135, 42],
            // itemStyle: {
            //   color: 'transparent',
            //   borderWidth: 0,
            // },
            // lineStyle: {
            //   color: '#D5D5D5',
            //   width: 1,
            //   // curveness: 0.7,
            // },
            animationDuration: 0,
            data: [
              {
                name: "上勤集团",
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#157eff"
                      },
                      {
                        offset: 1,
                        color: "#35c2ff"
                      }
                    ])
                  }
                },
                label: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right',
                  padding: 5,
                  fontSize: 40,
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  // shadowBlur:3,
                  // shadowOffsetX: 2,
                  // shadowOffsetY: 2,
                  // shadowColor: '#999',
                  padding: [20, 20, 20, 20],
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 14,
                      lineHeight: 20
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }

                },
                children: [
                  {
                    name: '物业管理板块',
                    value: 4,
                    label: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      // padding: 5,
                      fontSize: 16,
                      backgroundColor: '#eee',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      // shadowBlur:3,
                      // shadowOffsetX: 2,
                      // shadowOffsetY: 2,
                      // shadowColor: '#999',
                      padding: [10, 10, 10, 10],
                      rich: {
                        a: {
                          color: '#999',
                          lineHeight: 22,
                          align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                          borderColor: '#aaa',
                          width: '100%',
                          borderWidth: 0.5,
                          height: 0
                        },
                        b: {
                          fontSize: 14,
                          lineHeight: 20
                        },
                        per: {
                          color: '#eee',
                          backgroundColor: '#334455',
                          padding: [2, 4],
                          borderRadius: 2
                        }
                      }
                    },
                    children: [
                      {
                        name: '上勤高级楼宇管理有限公司',
                        value: 4,
                        label: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right',
                          padding: 5,
                          fontSize: 14,
                          backgroundColor: '#eee',
                          borderColor: '#aaa',
                          borderWidth: 1,
                          borderRadius: 4,
                          // shadowBlur:3,
                          // shadowOffsetX: 2,
                          // shadowOffsetY: 2,
                          // shadowColor: '#999',
                          // padding: [0, 7],
                          rich: {
                            a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                            },
                            b: {
                              fontSize: 14,
                              lineHeight: 20
                            },
                            per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                            }
                          },
                        },
                        children: [
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          }
                        ]
                      },
                      {
                        name: `上勤物业`,
                        value: 4,
                        label: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right',
                          padding: 5,
                          fontSize: 14,
                          backgroundColor: '#eee',
                          borderColor: '#aaa',
                          borderWidth: 1,
                          borderRadius: 4,
                          // shadowBlur:3,
                          // shadowOffsetX: 2,
                          // shadowOffsetY: 2,
                          // shadowColor: '#999',
                          // padding: [0, 7],
                          rich: {
                            a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                            },
                            b: {
                              color: 'black',
                              fontSize: 14,
                              lineHeight: 20
                            },
                            per: {
                              margin: [10, 0, 0, 0],
                              color: 'black',
                              // backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                            }
                          }
                        },
                        children: [
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    name: '餐饮服务板块',
                    value: 4,
                    label: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      padding: 5,
                      fontSize: 16,
                      backgroundColor: '#eee',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      // shadowBlur:3,
                      // shadowOffsetX: 2,
                      // shadowOffsetY: 2,
                      // shadowColor: '#999',
                      padding: [10, 10, 10, 10],
                      rich: {
                        a: {
                          color: '#999',
                          lineHeight: 22,
                          align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                          borderColor: '#aaa',
                          width: '100%',
                          borderWidth: 0.5,
                          height: 0
                        },
                        b: {
                          fontSize: 14,
                          lineHeight: 20
                        },
                        per: {
                          color: '#eee',
                          backgroundColor: '#334455',
                          padding: [2, 4],
                          borderRadius: 2
                        }
                      }

                    },
                    children: [
                      {
                        name: '上勤高级楼宇管理有限公司',
                        value: 4,
                        label: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right',
                          padding: 5,
                          fontSize: 14,
                          backgroundColor: '#eee',
                          borderColor: '#aaa',
                          borderWidth: 1,
                          borderRadius: 4,
                          // shadowBlur:3,
                          // shadowOffsetX: 2,
                          // shadowOffsetY: 2,
                          // shadowColor: '#999',
                          // padding: [0, 7],
                          rich: {
                            a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                            },
                            b: {
                              fontSize: 14,
                              lineHeight: 20
                            },
                            per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                            }
                          }

                        },
                        children: [
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          }
                        ]
                      },
                      {
                        name: '上勤物业管理有限公司',
                        value: 4,
                        label: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right',
                          padding: 5,
                          fontSize: 14,
                          backgroundColor: '#eee',
                          borderColor: '#aaa',
                          borderWidth: 1,
                          borderRadius: 4,
                          // shadowBlur:3,
                          // shadowOffsetX: 2,
                          // shadowOffsetY: 2,
                          // shadowColor: '#999',
                          // padding: [0, 7],
                          rich: {
                            a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                            },
                            b: {
                              fontSize: 14,
                              lineHeight: 20
                            },
                            per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                            }
                          }
                        },
                        children: [
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          }
                        ]
                      },
                    ]
                  },
                  {
                    name: '汽车服务板块',
                    value: 4,
                    label: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      padding: 5,
                      fontSize: 16,
                      backgroundColor: '#eee',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      // shadowBlur:3,
                      // shadowOffsetX: 2,
                      // shadowOffsetY: 2,
                      // shadowColor: '#999',
                      padding: [10, 10, 10, 10],
                      rich: {
                        a: {
                          color: '#999',
                          lineHeight: 22,
                          align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                          borderColor: '#aaa',
                          width: '100%',
                          borderWidth: 0.5,
                          height: 0
                        },
                        b: {
                          fontSize: 14,
                          lineHeight: 20
                        },
                        per: {
                          color: '#eee',
                          backgroundColor: '#334455',
                          padding: [2, 4],
                          borderRadius: 2
                        }
                      }

                    },
                    children: [
                      {
                        name: '上勤高级楼宇管理有限公司',
                        value: 4,
                        label: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right',
                          padding: 5,
                          fontSize: 14,
                          backgroundColor: '#eee',
                          borderColor: '#aaa',
                          borderWidth: 1,
                          borderRadius: 4,
                          // shadowBlur:3,
                          // shadowOffsetX: 2,
                          // shadowOffsetY: 2,
                          // shadowColor: '#999',
                          // padding: [0, 7],
                          rich: {
                            a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                            },
                            b: {
                              fontSize: 14,
                              lineHeight: 20
                            },
                            per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                            }
                          }

                        }
                        ,
                        children: [
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          }
                        ]
                      },
                      {
                        name: '上勤物业管理有限公司',
                        value: 4,
                        label: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right',
                          padding: 5,
                          fontSize: 14,
                          backgroundColor: '#eee',
                          borderColor: '#aaa',
                          borderWidth: 1,
                          borderRadius: 4,
                          // shadowBlur:3,
                          // shadowOffsetX: 2,
                          // shadowOffsetY: 2,
                          // shadowColor: '#999',
                          // padding: [0, 7],
                          rich: {
                            a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                            },
                            b: {
                              fontSize: 14,
                              lineHeight: 20
                            },
                            per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                            }
                          }
                        }
                        ,
                        children: [
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          }
                        ]
                      },
                    ]
                  },
                  {
                    name: '酒店管理板块',
                    value: 4,
                    label: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      padding: 5,
                      fontSize: 16,
                      backgroundColor: '#eee',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      // shadowBlur:3,
                      // shadowOffsetX: 2,
                      // shadowOffsetY: 2,
                      // shadowColor: '#999',
                      padding: [10, 10, 10, 10],
                      rich: {
                        a: {
                          color: '#999',
                          lineHeight: 22,
                          align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                          borderColor: '#aaa',
                          width: '100%',
                          borderWidth: 0.5,
                          height: 0
                        },
                        b: {
                          fontSize: 14,
                          lineHeight: 20
                        },
                        per: {
                          color: '#eee',
                          backgroundColor: '#334455',
                          padding: [2, 4],
                          borderRadius: 2
                        }
                      }

                    },
                    children: [
                      {
                        name: '上勤高级楼宇管理有限公司',
                        value: 4,
                        label: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right',
                          padding: 5,
                          fontSize: 14,
                          backgroundColor: '#eee',
                          borderColor: '#aaa',
                          borderWidth: 1,
                          borderRadius: 4,
                          // shadowBlur:3,
                          // shadowOffsetX: 2,
                          // shadowOffsetY: 2,
                          // shadowColor: '#999',
                          // padding: [0, 7],
                          rich: {
                            a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                            },
                            b: {
                              fontSize: 14,
                              lineHeight: 20
                            },
                            per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                            }
                          }

                        }
                        ,
                        children: [
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          }
                        ]
                      },
                      {
                        name: '上勤物业管理有限公司',
                        value: 4,
                        label: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right',
                          padding: 5,
                          fontSize: 14,
                          backgroundColor: '#eee',
                          borderColor: '#aaa',
                          borderWidth: 1,
                          borderRadius: 4,
                          // shadowBlur:3,
                          // shadowOffsetX: 2,
                          // shadowOffsetY: 2,
                          // shadowColor: '#999',
                          // padding: [0, 7],
                          rich: {
                            a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                            },
                            b: {
                              fontSize: 14,
                              lineHeight: 20
                            },
                            per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                            }
                          }
                        }
                        ,
                        children: [
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          },
                          {
                            name: '虹口区     1',
                            value: 4,
                            label: {
                              // name: '虹口区    1',
                              position: 'left',
                              verticalAlign: 'middle',
                              align: 'center',
                              padding: 5,
                              fontSize: 14,
                              backgroundColor: '#eee',
                              margin: [20, 20., 20, 20],
                              // formatter: '  {per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3}{per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3} {per|虹口区: 3}{per|虹口区: 3}  ',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                                },
                                b: {
                                  fontSize: 14,
                                  lineHeight: 20
                                },
                                per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                                }
                              },
                            }
                          }
                        ]
                      },
                    ]
                  },
                  {
                    name: '资产管理板块',
                    value: 4,
                    label: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      padding: 5,
                      fontSize: 16,
                      backgroundColor: '#eee',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      // shadowBlur:3,
                      // shadowOffsetX: 2,
                      // shadowOffsetY: 2,
                      // shadowColor: '#999',
                      padding: [10, 10, 10, 10],
                      rich: {
                        a: {
                          color: '#999',
                          lineHeight: 22,
                          align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                          borderColor: '#aaa',
                          width: '100%',
                          borderWidth: 0.5,
                          height: 0
                        },
                        b: {
                          fontSize: 14,
                          lineHeight: 20
                        },
                        per: {
                          color: '#eee',
                          backgroundColor: '#334455',
                          padding: [2, 4],
                          borderRadius: 2
                        }
                      }

                    },
                    children: [
                      {
                        name: '上勤高级楼宇管理有限公司',
                        value: 4,
                        label: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right',
                          padding: 5,
                          fontSize: 14,
                          backgroundColor: '#eee',
                          borderColor: '#aaa',
                          borderWidth: 1,
                          borderRadius: 4,
                          // shadowBlur:3,
                          // shadowOffsetX: 2,
                          // shadowOffsetY: 2,
                          // shadowColor: '#999',
                          // padding: [0, 7],
                          rich: {
                            a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                            },
                            b: {
                              fontSize: 14,
                              lineHeight: 20
                            },
                            per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                            }
                          }

                        }
                      },
                      {
                        name: '上勤物业管理有限公司',
                        value: 4,
                        label: {
                          position: 'left',
                          verticalAlign: 'middle',
                          align: 'right',
                          padding: 5,
                          fontSize: 14,
                          backgroundColor: '#eee',
                          borderColor: '#aaa',
                          borderWidth: 1,
                          borderRadius: 4,
                          // shadowBlur:3,
                          // shadowOffsetX: 2,
                          // shadowOffsetY: 2,
                          // shadowColor: '#999',
                          // padding: [0, 7],
                          rich: {
                            a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                            },
                            b: {
                              fontSize: 14,
                              lineHeight: 20
                            },
                            per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                            }
                          }
                        }
                      },
                    ]
                  }
                ]
              }]
          }
        ]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped>
</style>
