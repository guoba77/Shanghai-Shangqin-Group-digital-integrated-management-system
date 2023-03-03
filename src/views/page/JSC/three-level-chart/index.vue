<template>
  <div class="ejIndex">
    <div class="leftBody">
      <div class="tbClass">
        <pieChart></pieChart>
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
        <lineChart3></lineChart3>
      </div>
    </div>
  </div>
</template>

<script>
import pieChart from "../../../../components/ECharts/pieChart"
import histogramChart from "../../../../components/ECharts/histogramChart"
import lineChart from "../../../../components/ECharts/lineChart"
import lineChart2 from "../../../../components/ECharts/lineChart-2"
import lineChart3 from "../../../../components/ECharts/lineChart-3"

export default {
  name: "index",
  components: {
    pieChart,
    histogramChart,
    lineChart,
    lineChart2,
    lineChart3
  },
}
</script>

<style scoped>
.ejIndex {
  display: flex;
  width: 100%;
  height: 100%;
}
.leftBody {
  width: 40%;
  border: 2px solid #cccccc;
  border-radius: 5px;
}
.rigBody {
  width: 60%;
  border: 2px solid #cccccc;
  border-radius: 5px;
}
.tbClass {
  height: 100%;
  border: 1px solid #cccccc;
}
.zxtClass {
  height: 33.33%;
  border: 1px solid #cccccc;
}
</style>
