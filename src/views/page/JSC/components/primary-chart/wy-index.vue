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
        <zcze-bt></zcze-bt>
      </div>
    </div>
    <div class="cenBody">
      <div class="tbClass" style="display: flex">
        <threeAnnularChart></threeAnnularChart>
      </div>
      <div class="tbClass">
        <histogramChart></histogramChart>
      </div>
    </div>
    <div class="rigBody">
      <div class="tbClass">
        <histogramChart2></histogramChart2>
      </div>
      <div class="tbClass">
        <sjxzzt></sjxzzt>
      </div>
    </div>
  </div>
</template>

<script>
import histogramChart from "../../../../../components/ECharts/histogramChart"
import annularChart from "../../../../../components/ECharts/annularChart"
import zczeBt from "../../ECharts/zczeBt"
import histogramChart2 from "../../../../../components/ECharts/histogramChart2"
import sjxzzt from "../../../../../components/ECharts/sjxzzt"
import threeAnnularChart from "../../../../../components/ECharts/threeAnnularChart"
export default {
  name: "index",
  components: {
    histogramChart,
    annularChart,
    zczeBt,
    histogramChart2,
    sjxzzt,
    threeAnnularChart
  },
  data() {
    return{
      path: '',
      data: [
        {
          title: '年度总收入', num: '28099080.00元'
        },
        {
          title: '总面积', num: '300879平'
        },
        {
          title: '支出', num: '250000元'
        },
        {
          title: '盈利', num: '1800000'
        },
      ]
    }
  },
  created() {
    this.path = this.$route.path
    if(this.path === '/threeMenuIndex') {
      if(this.$route.query.sjName === '租赁资产') {
        this.data = [
          {
            title: '年度总收入', num: '8099080.00元'
          },
          {
            title: '总面积', num: '3279平'
          },
          {
            title: '支出', num: '250000元'
          },
          {
            title: '盈利', num: '2000000元'
          },
        ]
      }
    }
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
  background-image: url("../../../../../assets/images/bj4.png");
  background-size: cover;
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
