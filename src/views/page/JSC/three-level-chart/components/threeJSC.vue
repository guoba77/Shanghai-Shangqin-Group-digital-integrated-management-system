<template>
  <div class="tb">
    <div class="tbHead">
      <div class="tbOne">
        <rsbqZzt></rsbqZzt>
      </div>
      <div class="tbTwo">
        <div
          style="display: flex; text-align: center; width: 100%; height: 100%"
        >
          <zczeChart></zczeChart>
        </div>
      </div>
      <div class="tbThree">
        <ringDiagramChart2
          v-if="gsName === '上海名人苑实业有限公司'"
        ></ringDiagramChart2>
        <ringDiagramChart2
          v-if="gsName === '上海上勤资产管理有限公司'"
        ></ringDiagramChart2>
        <qczzt v-if="gsName === '上海锦勤汽车服务有限公司'"></qczzt>
        <!-- <qczzt v-if="gsName === '上海名人苑实业有限公司'"></qczzt> -->
        <!-- <menuBt v-else-if="gsName === '上海上勤物业管理有限公司'"></menuBt> -->
        <!-- <menuBt v-else-if="gsName === '上海上勤餐饮管理有限公司'"></menuBt> -->
        <menuBt v-else-if="gsName === '上海上勤酒店管理有限公司'"></menuBt>
        <menuBt v-else-if="gsName === '上海上勤景苑酒店管理有限公司'"></menuBt>

        <!-- <houseZzt v-else-if="gsName === '上海上勤酒店管理有限公司'"></houseZzt> -->
        <!-- <houseZzt
          v-else-if="gsName === '上海上勤景苑酒店管理有限公司'"
        ></houseZzt>
        <bk-zzt2
          v-else-if="gsName === '上海上勤景苑酒店管理有限公司'"
        ></bk-zzt2> -->
        <zztFour
          v-else-if="
            gsName === '上海上勤高级楼宇管理有限公司' ||
            gsName === '上海上勤餐饮管理有限公司' ||
            gsName === '上海上勤物业管理有限公司'
          "
        ></zztFour>
      </div>
    </div>
    <div class="tbBody">
      <div class="body2">
        <!-- <partyMember v-if="gsName === '上海锦勤汽车服务有限公司'"></partyMember> -->
        <!-- <dyFb v-else></dyFb> -->
        <dyFb></dyFb>
      </div>
      <div class="body3">
        <wyQpt></wyQpt>
      </div>
      <div class="body3">
        <LineChart v-if="gsName === '上海上勤酒店管理有限公司'"></LineChart>
        <LineChart2
          v-if="gsName === '上海上勤景苑酒店管理有限公司'"
        ></LineChart2>
        <!-- <bk-zzt2 v-if="gsName === '上海上勤酒店管理有限公司'"></bk-zzt2>
        <bk-zzt2 v-if="gsName === '上海上勤景苑酒店管理有限公司'"></bk-zzt2> -->
        <!-- <districtsNumECharts
          v-if="gsName === '上海上勤资产管理有限公司'"
        ></districtsNumECharts> -->
        <EachAreapeople
          v-if="gsName === '上海名人苑实业有限公司'"
        ></EachAreapeople>
        <EachAreapeople
          v-if="gsName === '上海上勤资产管理有限公司'"
        ></EachAreapeople>
        <threeZzt v-else></threeZzt>
      </div>
    </div>
  </div>
</template>
<script>
import ringDiagramChart2 from './menuCom/ringDiagramChart2.vue'
import EachAreapeople from './menuCom/EachAreapeople.vue'
import threeZzt from "../../twoComponents/zztThree"
import zztFour from "../../twoComponents/zztFour"
import zczeChart from "../../../../../components/ECharts/zczeChart"
import qczzt from "./menuCom/qczzt"
import menuBt from "./menuCom/menuBt"
import bkZzt2 from "./menuCom/bkZzt2"

import rsbqZzt from '../../ECharts/rsbqZzt'
import dyFb from '../../../../../components/ECharts/dyFb'
import wyQpt from "../../ECharts/wyQpt"
import houseZzt from './menuCom/houseZzt'
import districtsNumECharts from './menuCom/districtsNumECharts'
import partyMember from '../../../../../components/ECharts/partyMember'
import LineChart from '@/views/page/JSC/three-level-chart/components/menuCom/lineChart'
import LineChart2 from '@/views/page/JSC/three-level-chart/components/menuCom/lineChart2'
export default {
  name: "jsc",
  components: {
    bkZzt2,
    menuBt,
    qczzt,
    threeZzt,
    zztFour,
    zczeChart,
    wyQpt,
    rsbqZzt,
    dyFb,
    houseZzt,
    districtsNumECharts,
    partyMember,
    LineChart,
    LineChart2,
    EachAreapeople,
    ringDiagramChart2
  },
  data () {
    return {
      zczeShow: false,
      show: true,
      isTrue: false,
      menuShow: true,
      gsName: ''
    }
  },
  created () {
    this.gsName = this.$store.state.fgsSelValue
    this.isTrue = true
  },
  computed: {
    getStoreItem () {
      return this.$store.state.switchShow
    },
    getMenu () {
      return this.$store.state.menuShow
    }
  },
  watch: {
    getStoreItem () {
      this.show = this.$store.state.switchShow
    },
    getMenu () {
      this.menuShow = this.$store.state.menuShow
    },
    "$store.state.name" (newVal, oldVal) {
      this.gsName = newVal
    }
  },
  methods: {
    // 人事一级页面/wy-primaryIndex
    onRouter (tag) {
      if (tag === '人事') {
        this.$router.push('/rs-primaryIndex')
        sessionStorage.setItem('tagId', '2')
      } else if (tag === '财务') {
        this.$router.push('/cw-primaryIndex')
        sessionStorage.setItem('tagId', '3')
      } else if (tag === '租赁资产') {
        this.$router.push('/wy-primaryIndex')
        sessionStorage.setItem('tagId', '4')
      } else if (tag === '党建') {
        this.$router.push('/dj-primaryIndex')
        sessionStorage.setItem('tagId', '5')
      } else if (tag === '服务') {
        this.$router.push('/fw-primaryIndex')
        sessionStorage.setItem('tagId', '6')
      }
    },
    resetModalVisible (value) {
      this.zczeShow = false
    }
  }
}
</script>

<style scoped>
.tb {
  width: 87.9vw;
  height: 85vh;
  background-image: url("../../../../../assets/images/bj4.png");
  background-size: cover;
  overflow: hidden;
  /*background-color: #153E77;*/
}
.tb1 {
  width: 88vw;
  height: 90vh;
  background: #f0fff0;
}
.tb2 {
  width: 100vw;
  height: 90vh;
  background-size: cover;
}
.tbHead {
  height: 50%;
  width: 100%;
  display: flex;
}
.tbOne {
  width: 33.3%;
  height: 100%;
  margin: 0 5px 0 0px;
}
.tbTwo {
  width: 33.3%;
  height: 100%;
  margin: 0 5px 0 0px;
}
.tbThree {
  width: 33.4%;
  height: 100%;
  border-radius: 15px;
  margin: 0 0px 0 0px;
}
.c1 {
  width: 20px;
  font-size: 14px;
  word-wrap: break-word;
  padding-top: 50px;
  color: white;
  padding-left: 6px;
}
.c2 {
  width: 20px;
  font-size: 14px;
  word-wrap: break-word;
  padding-top: 50px;
  color: black;
  padding-left: 6px;
}
.tbBody {
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.body2 {
  width: 50%;
  height: 100%;
  margin: 0px 5px 0 0px;
}
.body3 {
  width: 50%;
  height: 100%;
  margin: 0px 0px 0 0px;
}
.bq {
  position: absolute;
  z-index: 1000;
  color: #fff;
  border: 1px solid rgba(0, 251, 252, 0.5);
  width: 120px;
  background: none;
  background-image: linear-gradient(
    to right,
    rgba(0, 251, 252, 0.5) 0%,
    rgba(0, 230, 230, 0.4) 5%,
    rgba(0, 210, 210, 0.3) 10%,
    rgba(0, 190, 190, 0.2) 90%,
    rgba(0, 170, 170, 0.1) 95%,
    rgba(0, 150, 150, 0) 100%
  );
}
.bq2 {
  position: absolute;
  z-index: 1000;
  right: 0;
  cursor: pointer;
  color: #fff;
  border: 1px solid rgba(0, 251, 252, 0.5);
  width: 120px;
  background: none;
  background-image: linear-gradient(
    to right,
    rgba(0, 251, 252, 0.5) 0%,
    rgba(0, 230, 230, 0.4) 5%,
    rgba(0, 210, 210, 0.3) 10%,
    rgba(0, 190, 190, 0.2) 90%,
    rgba(0, 170, 170, 0.1) 95%,
    rgba(0, 150, 150, 0) 100%
  );
}
/deep/ .ant-tag {
  padding: 4px 14px;
  font-size: 16px;
}
</style>
