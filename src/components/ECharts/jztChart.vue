<template>
  <div id="myChartJzt" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: true,
      width: '100%',
      height: '100%',
      num1: 10,
      num2: 20,
      num3: 100,
    }
  },
  created () {
    this.path = this.$route.path
  },
  mounted () {
    this.$axios.get(this.baseUrl + 'bloc/blocpersonneluserinfo/userCountEachRank?year=2022', {
      headers: { 'token': localStorage.getItem('token') }
    }).then((res) => {
      this.drawLine()
    })
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
    }
  },
  methods: {
    drawLine () {
      this.$nextTick(_ => {
        let myChart = echarts.init(document.getElementById('myChartJzt'))

        //数据
        let option = {
          color: ["#A4E1FF", "#53B7F4", "#694EEB", "#9B1AD9"],
          title: {
            text: '高级技师' + this.num1 + '人，技师' + this.num2 + '人，高级工' + this.num3 + '人',
            x: 'center',
            bottom: '3%',
            textStyle: {
              color: 'orange',
              fontSize: 22
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
          },

          calculable: true,
          series: [{
            name: '',
            type: 'funnel',
            left: 100,
            right: 100,
            min: 0,
            maxSize: '100%',
            sort: 'ascending',
            gap: 2,
            label: {
              show: true,
              formatter: "{a|}\n{b|{b}}",
              rich: {
                // a: {
                //   color: 'rgba(222,240,255,1)',
                //   fontSize: 30
                // },
                b: {
                  color: 'rgba(101,166,196,1)',
                  fontSize: 22
                }
              }
            },
            labelLine: {
              length: 20,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            data: [{
              value: 10,
              name: '领导班子'
            },
            {
              value: 20,
              name: '中层'
            },
            {
              value: 30,
              name: '子公司中层'
            },
            {
              value: 40,
              name: '员工'
            }
            ]
          }, {
            name: 'DATA',
            type: 'funnel',
            left: 100,
            right: 100,
            min: 0,
            maxSize: '100%',
            sort: 'ascending',
            gap: 2,
            label: {
              show: true,
              formatter: function(params) {
                return params.percent + '%'
              },
              position: 'inside',
              fontSize: 18,
              fontWeight: 'bold',
              color: 'orange'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            data: [{
              value: 10,
              name: '领导班子'
            },
            {
              value: 20,
              name: '中层'
            },
            {
              value: 30,
              name: '子公司中层'
            },
            {
              value: 40,
              name: '员工'
            }
            ]
          }]
        }
        myChart.resize()
        myChart.setOption(option, true)
        myChart.on('mouseover', (params) => {
          let num = Math.floor(Math.random() * (1000 - 500 + 1) + 1000)
          let num1 = Math.floor(Math.random() * (1000 - 500 + 1) + 1000)
          let num2 = Math.floor(Math.random() * (1000 - 500 + 1) + 1000)
          let num3 = Math.floor(Math.random() * (1000 - 500 + 1) + 1000)
          let num4 = Math.floor(Math.random() * (1500 - 200 + 1) + 1500)
          let num5 = Math.floor(Math.random() * (500 - 200 + 1) + 500)
          let num6 = Math.floor(Math.random() * (500 - 200 + 1) + 500)
          let num7 = Math.floor(Math.random() * (500 - 200 + 1) + 500)
          let num8 = Math.floor(Math.random() * (800 - 300 + 1) + 800)
          let num9 = Math.floor(Math.random() * (800 - 300 + 1) + 800)
          let num10 = Math.floor(Math.random() * (800 - 400 + 1) + 800)
          let num11 = Math.floor(Math.random() * (800 - 500 + 1) + 800)
          let num12 = Math.floor(Math.random() * (100 - 50 + 1) + 100)
          let num13 = Math.floor(Math.random() * (100 - 50 + 1) + 100)
          let p1 = Math.floor(Math.random() * (1000 - 500 + 1) + 1000)
          let p2 = Math.floor(Math.random() * (1200 - 500 + 1) + 1200)
          let p3 = Math.floor(Math.random() * (1200 - 500 + 1) + 1200)
          let p4 = Math.floor(Math.random() * (800 - 500 + 1) + 800)
          let p5 = Math.floor(Math.random() * (800 - 500 + 1) + 800)
          // Math.floor(Math.random()*(1000-800+1)+1000);
          var jztObj = {
            zczeData: [{ value: num, name: '10年以下' }, { value: num1, name: '10年~20年' }, { value: num2, name: '20年~30年' }, { value: num3, name: '30年以上' }],
            zczeData1: [{ value: num4, name: '20-30岁' }, { value: num5, name: '30-40岁' }, { value: num6, name: '40-50岁' }, { value: num7, name: '50岁以上' }],
            dataArray: [{ name: '30岁以下', num: num8 }, { name: '30-39岁', num: num9 }, { name: '40-49岁', num: num10 }, { name: '50岁以上', num: num11 }],
            dataArr: [{ name: '女', num: num12 }, { name: '男', num: num13 }],
            pieData: [{ value: p1, name: '博士' }, { value: p2, name: '硕士' }, { value: p3, name: '本科' }, { value: p4, name: '大专' }, { value: p5, name: '高中' }
            ]
          }
          this.$store.commit('jztObj', jztObj)
        })
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
