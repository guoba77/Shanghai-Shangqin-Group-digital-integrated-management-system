<template>
  <div class="ejIndex">
    <div class="leftBody">
      <div style="height: 50%">
        <zczeChart3gl></zczeChart3gl>
      </div>
      <div style="height: 50%">
        <zcze-chart2></zcze-chart2>
      </div>
    </div>
    <div class="cenBody">
      <div class="tbClass">
        <rsJNPie></rsJNPie>
      </div>
      <div class="tbClass1">
        <lineChart></lineChart>
      </div>
    </div>
    <div class="rigBody">
      <div class="tbClass">
        <xbfbChart></xbfbChart>
      </div>
      <div class="tbClass1">
        <xueliZZT></xueliZZT>
      </div>
    </div>
  </div>
</template>

<script>
import lineChart from "../../../../../components/ECharts/lineChart"
import xbfbChart from "../../../../../components/ECharts/xbfbChart"
import zczeChart3gl from "../../../../../components/ECharts/zczeChart3gl"
import zczeChart2 from "../../../../../components/ECharts/zczeChart2"
import rsJNPie from "../../../../../components/ECharts/rsJNPie"
import xueliZZT from "../../../../../components/ECharts/xueliZZT"
export default {
  name: "index",
  components: {
    lineChart,
    xbfbChart,
    zczeChart3gl,
    zczeChart2,
    rsJNPie,
    xueliZZT
  },
  data () {
    return {
      path: '',
      ygglData: []
    }
  },
  created () {
    this.path = this.$route.path
  },
  mounted () {
    this.butShow = localStorage.setItem('butShow', true)
    // 人事一级页面员工工龄
    this.$axios.get(this.baseUrl + 'bloc/blocpersonneluserinfo/userJobYearsIntervalNumber', {
      headers: { 'token': localStorage.getItem('token') }
    }).then((res) => {
      for (let i in res.data.data) {
        var obj = {
          name: i,
          value: res.data.data[i]
        }
        this.ygglData.push(obj)
      }
    })
  },
  methods: {

  }
}
</script>

<style scoped>
.ejIndex {
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url("../../../../../assets/images/bj4.png");
  background-size: cover;
  overflow: hidden;
}
.leftBody {
  width: 30%;
  border-radius: 5px;
}
.cenBody {
  width: 40%;
  border-radius: 5px;
}
.rigBody {
  width: 30%;
  border-radius: 5px;
}
.tbClass {
  height: 60%;
  /*background: #323a5e;*/
}
.tbClass1 {
  height: 40%;
  /*background: #323a5e;*/
}
.zxtClass {
  height: 33.33%;
}
.title {
  font-size: 26px;
  color: white;
  display: flex;
  height: 104px;
  line-height: 104px;
  justify-content: space-around;
}
</style>
