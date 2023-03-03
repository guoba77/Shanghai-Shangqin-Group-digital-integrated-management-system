<template>
  <div class="ejIndex">
    <div class="leftBody">
      <div class="tbClass">
        <div style="width: 100%; height: 40%">
          <div v-if="$route.path === '/threeMenuIndex'" class="pfTitle">
            业主类型
          </div>
          <div v-else class="pfTitle">服务保障信息</div>
          <bt></bt>
        </div>
        <div style="width: 100%; height: 60%">
          <zztThree></zztThree>
        </div>
      </div>
    </div>
    <mapEcharts></mapEcharts>
  </div>
</template>

<script>
import mapEcharts from "../../../../../components/ECharts/mapEcharts"
import zztThree from "../../twoComponents/zztThree"
import bt from '../../ECharts/bt'
export default {
  name: "index",
  components: {
    mapEcharts,
    zztThree,
    bt
  },
  data () {
    return {
      path: '',
      num: '270个',
      visible: true,
      dialogStyle: {
        top: '80px',
        right: '480px'
      },
      name: '',
      zb: []
    }
  },
  created () {
    this.path = this.$route.path
    if (this.path === '/threeMenuIndex') {
      this.num = '40个'
    }
  },
  watch: {
    "$store.state.fwObj" (newVal, oldVal) {
      this.num = newVal.num + '个'
      this.name = newVal.params.name
      this.zb = newVal.zb
    },
    "$store.state.bkObj" (newVal, oldVal) {
      this.num = newVal.num + '个'
    }
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
  width: 25%;
  height: 85%;
  position: absolute;
  z-index: 1000;
  border-radius: 5px;
}
.conBody {
  width: 100%;
  height: 100%;
}
.rigBody {
  color: yellow;
  width: 100%;
  border: 1px solid #cccccc;
}
.tbClass {
  height: 70%;
  display: flex;
  flex-direction: column;
  border: 1px solid #cccccc;
}
.zxtClass {
  height: 33.33%;
  /*border: 1px solid #cccccc;*/
}
.pfTitle {
  color: white;
  padding: 10px;
  font-size: 24px;
  text-align: center;
}
.pfText {
  border: 2px dashed #fff0f6;
  padding: 20px 35px;
  border-radius: 10px;
  color: white;
}
/deep/ .ant-modal-content {
  background-color: rgb(0, 0, 0, 0);
}
</style>
