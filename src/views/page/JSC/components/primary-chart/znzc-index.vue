<template>
  <div class="ejIndex">
    <div class="leftBody">
      <div
        style="
          background-color: rgba(0, 0, 0, 0);
          height: 13%;
          padding: 10px;
          text-align: center;
          border: 1px solid rgb(0 195 204);
          border-radius: 10px;
        "
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-card
              :bordered="false"
              style="background-color: rgba(0, 0, 0, 0)"
            >
              <div class="text">总出租率</div>
              <span class="title">{{ num1 }}</span>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card
              :bordered="false"
              style="background-color: rgba(0, 0, 0, 0)"
            >
              <div class="text">总收缴率数值</div>
              <span class="title">{{ num2 }}</span>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div
        style="
          height: 50%;
          border: 1px solid rgb(0 195 204);
          border-radius: 10px;
          margin-top: 5px;
        "
      >
        <div style="padding: 5px">
          <div style="font-size: 22px; color: white; margin-left: 30px">
            管理面积
          </div>
          <div
            style="
              width: 100%;
              height: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-evenly;
            "
          >
            <div
              v-for="i in data"
              style="
                color: white;
                font-size: 18px;
                border-bottom: 1px solid #8cc8ff;
                width: 40%;
                margin: 10px;
              "
            >
              {{ i.name }}：<span style="color: #8cc8ff">{{ i.value }}m²</span>
            </div>
          </div>
        </div>
        <ringDiagramChart
          :regionName="regionName"
          style="width: 100%; height: 200px"
        ></ringDiagramChart>
      </div>
    </div>
    <zlzcMapEcharts v-on:mapVal="onMap"></zlzcMapEcharts>
  </div>
</template>

<script>
import ringDiagramChart from "../../../../../components/ECharts/ringDiagramChart"
import mapEcharts from "../../../../../components/ECharts/mapEcharts"
import horizontalHistogramChart2zc from "../../../../../components/ECharts/horizontalHistogramChart2zc"
import zlzcMapEcharts from "../../../../../components/ECharts/zlzcMapEcharts"
import { getStatisticsLeaseRate, getStatisticsLeaseRate2, getRegionSortStatistics, getRegionSortStatistics2 } from '@/api/api'
export default {
  name: "index",
  components: {
    mapEcharts,
    ringDiagramChart,
    horizontalHistogramChart2zc,
    zlzcMapEcharts
  },
  data () {
    return {
      path: '',
      num: '270.7万平方',
      data: [
        { value: null, name: '商业' },
        { value: null, name: '办公' },
        { value: null, name: '居住' },
        { value: null, name: '车位' }
      ],
      num1: 0,
      num2: 0,
      num3: 1,
      num4: 0,
      regionName: ''
    }
  },
  created () {
    if (this.path === '/threeMenuIndex') {
      this.num = '40万平方米'
    }
  },
  mounted () {
    if (this.$route.path === '/wy-primaryIndex') {
      getStatisticsLeaseRate(1).then(res => {
        if (res.data.code === 0 && res.data.data !== null) {
          this.num1 = res.data.data.occupancyRate
          this.num2 = res.data.data.collectionRate
        }
      })
    } else if (this.$route.path === '/threeMenuIndex') {
      getStatisticsLeaseRate2(this.$store.state.fgsSelValue).then(res => {
        // console.log(res)
        if (res.data.code === 0 && res.data.data !== null) {
          this.num1 = res.data.data.occupancyRate
          this.num2 = res.data.data.collectionRate
        }
      })
    }

    if (this.$route.path === '/wy-primaryIndex') {
      getRegionSortStatistics(null).then(res => {
        if (res.data.code === 0 && res.data.data !== null) {
          this.data[0].value = res.data.data.business ? res.data.data.business : 0
          this.data[1].value = res.data.data.work ? res.data.data.work : 0
          this.data[2].value = res.data.data.apartment ? res.data.data.apartment : 0
          this.data[3].value = res.data.data.parkingLot ? res.data.data.parkingLot : 0
        }
      })
    } else if (this.$route.path === '/threeMenuIndex') {
      getRegionSortStatistics2(null, this.$store.state.fgsSelValue).then(res => {
        if (res.data.code === 0 && res.data.data !== null) {
          this.data[0].value = res.data.data.business ? res.data.data.business : 0
          this.data[1].value = res.data.data.work ? res.data.data.work : 0
          this.data[2].value = res.data.data.apartment ? res.data.data.apartment : 0
          this.data[3].value = res.data.data.parkingLot ? res.data.data.parkingLot : 0
        }
      })
    }

  },
  methods: {
    onMap (val) {
      this.num1 = val.occupancyRate
      this.num2 = val.collectionRate
      this.regionName = val.regionName
      if (this.$route.path === '/wy-primaryIndex') {
        getRegionSortStatistics(val.regionName).then(res => {
          if (res.data.code === 0) {
            this.data[0].value = res.data.data.business ? res.data.data.business : 0
            this.data[1].value = res.data.data.work ? res.data.data.work : 0
            this.data[2].value = res.data.data.apartment ? res.data.data.apartment : 0
            this.data[3].value = res.data.data.parkingLot ? res.data.data.parkingLot : 0
          }
        })
      } else if (this.$route.path === '/threeMenuIndex') {
        getRegionSortStatistics2(val.regionName, this.$store.state.fgsSelValue).then(res => {
          if (res.data.code === 0) {
            this.data[0].value = res.data.data.business ? res.data.data.business : 0
            this.data[1].value = res.data.data.work ? res.data.data.work : 0
            this.data[2].value = res.data.data.apartment ? res.data.data.apartment : 0
            this.data[3].value = res.data.data.parkingLot ? res.data.data.parkingLot : 0
          }
        })
      }

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
  width: 25%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1000;
  /*justify-content: space-between;*/
}
.rigBody {
  width: 100%;
  height: 100%;
  /*border-left: 2px solid #cccccc;*/
  border-radius: 5px;
}
.tbClass {
  height: 50%;
  /*border: 1px solid #cccccc;*/
}
/deep/ .ant-card-body {
  padding: 17px;
  zoom: 1;
}
.text {
  color: white;
  font-weight: bold;
  font-size: 20px;
}
.title {
  font-size: 22px;
  color: deepskyblue;
}
</style>
