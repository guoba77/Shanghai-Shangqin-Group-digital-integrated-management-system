<template>
  <div class="ejIndex">
    <div class="leftBody">
      <div class="tbClass">
        <div v-for="i in data">
          <div class="title">
            <div>{{i.title}}</div>
            <div>{{i.num}}</div>
          </div>
        </div>
      </div>
      <div class="tbClass">
        <lineChart></lineChart>
      </div>
    </div>
    <div class="cenBody">
      <div class="tbClass" style="display: flex">
        <div style="width: 50%;height: 100%"><pieChart></pieChart></div>
        <div style="width: 50%;height: 100%"><annularChart></annularChart></div>
      </div>
      <div class="tbClass">
        <histogramChart></histogramChart>
      </div>
    </div>
    <div class="rigBody">
      <div class="tbClass">
        <horizontalHistogramChart></horizontalHistogramChart>
      </div>
      <div class="tbClass">
        <lineChart3></lineChart3>
      </div>
    </div>
  </div>
</template>

<script>
import pieChart from "../../../../../components/ECharts/pieChart"
import histogramChart from "../../../../../components/ECharts/histogramChart"
import lineChart from "../../../../../components/ECharts/lineChart"
import lineChart2 from "../../../../../components/ECharts/lineChart-2"
import lineChart3 from "../../../../../components/ECharts/lineChart-3"
import annularChart from "../../../../../components/ECharts/annularChart"
import horizontalHistogramChart from "../../../../../components/ECharts/horizontalHistogramChart"
export default {
  name: "index",
  components: {
    pieChart,
    histogramChart,
    lineChart,
    lineChart2,
    lineChart3,
    annularChart,
    horizontalHistogramChart
  },
  data() {
    return{
      path: '',
      data: [
        {
          title: '总人数', num: '2800'
        },
        {
          title: '干部', num: '300'
        },
        {
          title: '文员', num: '500'
        },
        {
          title: '科研', num: '100'
        },
      ]
    }
  },
  created() {
    this.path = this.$route.path
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style scoped>
.ejIndex{
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.leftBody{
  width: 30%;
  border: 2px solid #cccccc;
  border-radius: 5px;
}
.cenBody{
  width: 40%;
  border: 2px solid #cccccc;
  border-radius: 5px;
}
.rigBody{
  width: 30%;
  border: 2px solid #cccccc;
  border-radius: 5px;
}
.tbClass{
  height: 50%;
  border: 1px solid #cccccc;
  background: #323a5e;
}
.zxtClass{
  height: 33.33%;
  border: 1px solid #cccccc;
}
.title{
  font-size: 26px;
  color: white;
  border-bottom: 1px solid #cccccc;
  display: flex;
  height: 104px;
  line-height: 104px;
  justify-content: space-around;
}
</style>
