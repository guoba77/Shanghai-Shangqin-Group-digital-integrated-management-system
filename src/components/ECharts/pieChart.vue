<template>
  <div id="myChartZczeBt1" :style="{ width: '100%', height: '100%' }"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: "zczeBt",
  data () {
    return {
      data: [
        { value: 1048, name: '汽服' },
        { value: 735, name: '酒店' },
        { value: 580, name: '餐饮' },
        { value: 484, name: '物业' },
        { value: 300, name: '实业' }
      ],
      data1: [
        { value: 300, name: '上海上勤景苑酒店管理有限公司' },
        { value: 200, name: '上勤楼宇管理有限公司' },
        { value: 900, name: '上海上勤餐饮管理有限公司' }
      ],
      data2: [
        { value: 1048, name: '博士' },
        { value: 735, name: '硕士' },
        { value: 580, name: '本科' },
        { value: 484, name: '大专' },
        { value: 300, name: '高中' }
      ],
      path: '',
      radius: '60%',
      name: '',
      valList: {},
      text: '',
      bgColor: 'rgb(0,0,0,0)',
      rouName: ''
    }
  },
  created () {

  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.rouName = val.query.name
      },
    },
    "$store.state.erName" (newVal, oldVal) {
      if (newVal === '汽服') {
        this.data1 = [
          { value: 300, name: '上海锦勤汽车服务有限公司' }
        ]
        this.drawLine()
        sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      } else if (newVal === '物业') {
        this.data1 = [
          { value: 300, name: '上海上勤高级楼宇管理有限公司' },
          { value: 1000, name: '上海上勤物业管理有限公司' }
        ]
        this.drawLine()
        sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      } else if (newVal === '餐饮') {
        this.data1 = [
          { value: 300, name: '上海上勤餐饮管理有限公司' }
        ]
        this.drawLine()
        sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      } else if (this.$route.query.name === '酒店') {
        this.data1 = [
          { value: 300, name: '上海上勤酒店管理有限公司' },
          { value: 1000, name: '上海上勤景苑酒店管理有限公司' },
        ]
        this.drawLine()
        sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      } else if (this.$route.query.name === '实业') {
        this.data1 = [
          { value: 300, name: '上海上勤资产管理有限公司' },
          { value: 400, name: '上海名人苑实业有限公司' }
        ]
        this.drawLine()
        sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      } else if (this.$route.query.name === '集团办') {
        this.data1 = [
          { value: 300, name: '上海上勤资产管理有限公司' },
          { value: 400, name: '上海名人苑实业有限公司' },
          { value: 300, name: '上海上勤酒店管理有限公司' },
          { value: 1000, name: '上海上勤景苑酒店管理有限公司' },
          { value: 300, name: '上海上勤餐饮管理有限公司' },
          { value: 300, name: '上海上勤餐饮管理有限公司' },
          { value: 300, name: '上海锦勤汽车服务有限公司' },
          { value: 300, name: '上海上勤高级楼宇管理有限公司' },
          { value: 1000, name: '上海上勤物业管理有限公司' }
        ]
        this.drawLine()
        sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      }
    },
    "$store.state.jztObj" (val, oldVal) {
      this.data2 = val.pieData
      this.drawLine()
    },
    "$store.state.bkObj" (val, oldVal) {
      this.data2 = val.rsList.pieData
      this.drawLine()
    }
  },
  // 监听路由变化
  mounted () {
    this.path = this.$route.path
    if (this.$route.query.name === '汽服') {
      this.data1 = [
        { value: 300, name: '上海锦勤汽车服务有限公司' }
      ]
      sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      this.drawLine()
    } else if (this.$route.query.name === '物业') {
      this.data1 = [
        { value: 300, name: '上海上勤高级楼宇管理有限公司' },
        { value: 500, name: '上海上勤物业管理有限公司' }
      ]
      sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      this.drawLine()
    } else if (this.$route.query.name === '餐饮') {
      this.data1 = [
        { value: 300, name: '上海上勤餐饮管理有限公司' }
      ]
      sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      this.drawLine()
    } else if (this.$route.query.name === '酒店') {
      this.data1 = [
        { value: 300, name: '上海上勤酒店管理有限公司' },
        { value: 1000, name: '上海上勤景苑酒店管理有限公司' }
      ]
      sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      this.drawLine()
    } else if (this.$route.query.name === '实业') {
      this.data1 = [
        { value: 300, name: '上海上勤资产管理有限公司' },
        { value: 400, name: '上海名人苑实业有限公司' }
      ]
      sessionStorage.setItem('gsData', JSON.stringify(this.data1))
      this.drawLine()
    }
    if (this.path === '/rs-primaryIndex') {
      this.radius = '50%'
      this.name = '人数'
      this.text = ''
      this.data2 = []
      this.bgColor = 'rgb(0,0,0,0)'
      this.$axios.get(this.baseUrl + 'bloc/blocpersonneluserinfo/userCountDegreeLevel', {
        headers: { 'token': localStorage.getItem('token') }
      }).then((res) => {
        for (let i in res.data.data) {
          var obj = {
            value: res.data.data[i].countUser,
            name: res.data.data[i].degreeName
          }
          this.data2.push(obj)
        }
        this.drawLine()
      })
      // this.data2 = [
      //   { value: 1048, name: '博士' },
      //   { value: 735, name: '硕士' },
      //   { value: 580, name: '本科' },
      //   { value: 484, name: '大专' },
      //   { value: 300, name: '高中' }
      // ]
    } else if (this.path === '/fw-primaryIndex') {
      this.text = ''
      this.data2 = [
        { value: 1048, name: '政府机关' },
        { value: 735, name: '企业' },
        { value: 580, name: '科研院校' },
        { value: 484, name: '事业单位' },
        { value: 300, name: '医院' }
      ]
      this.drawLine()
    } else if (this.path === '/threeMenuIndex') {
      if (this.$route.query.sjName === '服务') {
        this.text = ''
        this.data2 = [
          { value: 1048, name: '政府机关' },
          { value: 735, name: '企业' },
          { value: 580, name: '科研院校' },
          { value: 484, name: '事业单位' },
          { value: 300, name: '医院' }
        ]
        this.drawLine()
      } else if (this.$route.query.sjName === '人事') {
        this.text = ''
        this.name = ''
        this.data2 = [
          { value: 1048, name: '博士' },
          { value: 735, name: '硕士' },
          { value: 580, name: '本科' },
          { value: 484, name: '大专' },
          { value: 300, name: '高中' }
        ]
        this.drawLine()
      } else {
        this.drawLine()
      }
    }
  },
  methods: {
    drawLine (val) {
      let myChart = echarts.init(document.getElementById('myChartZczeBt1'))
      var color = ['#00ffff', '#409B5C', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']
      // 总饼图
      let option = {
        title: {
          text: this.text,
          textStyle: {
            color: 'white'
          },
          top: '5%',
          left: 'center'
        },
        color: color,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: 'white'
          }
        },
        backgroundColor: this.bgColor,
        series: [
          {
            name: this.name,
            type: 'pie',
            radius: this.radius,
            data: this.path == '/cw-primaryIndex' ? this.data : this.path == '/secondaryIndex' ? this.data1 : this.data2,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option, true)
      myChart.on('click', (params) => {
        //此处的value值为饼状图里 data的name 值
        let value = params.name
        if (this.path === '/cw-primaryIndex') {
          this.$router.push({
            path: '/cw-primaryIndex',
            query: {
              name: value
            }
          })
        } else if (this.path === '/secondaryIndex') {
          this.$router.push({
            path: '/secondaryIndex',
            query: {
              name: value
            }
          })
        } else if (this.path === '/threeIndex') {
          this.$router.push({
            path: '/threeIndex',
            query: {
              name: value
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
