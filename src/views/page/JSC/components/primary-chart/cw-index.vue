<template>
  <div class="ejIndex">
    <div class="leftBody">
      <div class="tbClass" style="width: 30%">
        <ybq-chart></ybq-chart>
      </div>
      <div class="tbClass" style="width: 40%">
        <zczeChart></zczeChart>
      </div>
      <div class="tbClass" style="width: 30%">
        <div style="position: absolute; z-index: 999" v-if="dateShow">
          <a-select
            style="width: 150px; color: white"
            @change="onSel"
            v-model="mom"
          >
            <a-select-option v-for="(item, index) in monthList" :key="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </div>
        <histogramChart :monthData="monthData"></histogramChart>
      </div>
    </div>
    <div class="rigBody">
      <div class="zxtClass">
        <lineChart></lineChart>
      </div>
      <div class="zxtClass">
        <lineChart2></lineChart2>
      </div>
      <div class="zxtClass">
        <!-- <lineChart3 v-if="dateShow"></lineChart3> -->
        <lineChart3></lineChart3>
      </div>
    </div>
  </div>
</template>

<script>
import histogramChart from "../../../../../components/ECharts/histogramChart"
import lineChart from "../../../../../components/ECharts/lineChart"
import lineChart2 from "../../../../../components/ECharts/lineChart-2"
import lineChart3 from "../../../../../components/ECharts/lineChart-3"
import zczeChart from "../../../../../components/ECharts/zczeChart"
import ybqChart from "../../../../../components/ECharts/ybqChart"
import { getMonthCW, getMaxMonth } from '../../../../../api/api'
export default {
  name: "index",
  components: {
    histogramChart,
    lineChart,
    lineChart2,
    lineChart3,
    zczeChart,
    ybqChart
  },
  data () {
    return {
      path: '',
      mom: '',
      year: '',
      monthList: [],
      monthData: [],
      dateShow: true
    }
  },
  watch: {
    "$store.state.fgsSelValue" (val, oldVal) {
    }
  },
  mounted () {
    this.path = this.$route.path
    if (this.path === '/threeMenuIndex') {
      this.dateShow = false
    }
    getMaxMonth().then((res) => {
      if (res.data.code === 0) {
        this.monthList = res.data.data
        if (res.data.data.length > 0) {
          // this.mom = res.data.data[res.data.data.length - 1]
          this.mom = res.data.data[0]
        }
        this.onSel()
      }
    })
  },
  methods: {
    onSel () {
      getMonthCW({
        month: this.mom
      }).then((res) => {
        this.monthData = res.data.data
      })
    }
  }
}
</script>

<style scoped>
.ejIndex {
  width: 100%;
  height: 100%;
  background-image: url("../../../../../assets/images/bj4.png");
  background-size: cover;
  overflow: hidden;
}
.leftBody {
  width: 100%;
  height: 60%;
  display: flex;
}
.tbClass {
  height: 100%;
  /*width: 100%;*/
}
.rigBody {
  width: 100%;
  height: 40%;
  display: flex;
  border-radius: 5px;
}
.zxtClass {
  width: 33.33%;
  height: 100%;
}
</style>
