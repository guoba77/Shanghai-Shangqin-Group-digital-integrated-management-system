<template>
  <div style="width: 100%; height: 100%" class="aaa">
    <div style="width: 100%; height: 5%">
      <a-radio-group ref="getheight" default-value="1">
        <a-radio-button
          @click="onRadio({ name: '驾驶舱', id: 1 })"
          style="background: rgba(0, 0, 0, 0); color: #13c2c2"
          value="1"
        >
          驾驶舱
        </a-radio-button>
        <a-radio-button
          @click="onRadio({ name: '人事', id: 2 })"
          style="background: rgba(0, 0, 0, 0); color: #13c2c2"
          value="2"
        >
          人事
        </a-radio-button>
        <a-radio-button
          @click="onRadio({ name: '财务', id: 3 })"
          style="background: rgba(0, 0, 0, 0); color: #13c2c2"
          value="3"
        >
          财务
        </a-radio-button>
        <a-radio-button
          v-if="zlzcShow"
          @click="onRadio({ name: '租赁资产', id: 4 })"
          style="background: rgba(0, 0, 0, 0); color: #13c2c2"
          value="4"
        >
          租赁资产
        </a-radio-button>
        <a-radio-button
          @click="onRadio({ name: '党建', id: 5 })"
          style="background: rgba(0, 0, 0, 0); color: #13c2c2"
          value="5"
        >
          党建
        </a-radio-button>
        <a-radio-button
          v-if="fwShow"
          @click="onRadio({ name: '服务', id: 6 })"
          style="background: rgba(0, 0, 0, 0); color: #13c2c2"
          value="6"
        >
          服务
        </a-radio-button>
      </a-radio-group>
    </div>
    <div style="width: 100%; height: 95%">
      <threeJSC v-if="name === '驾驶舱'"></threeJSC>
      <rsMenuIndex v-if="name === '人事'"></rsMenuIndex>
      <cw-menu-index v-if="name === '财务'"></cw-menu-index>
      <wy-menu-index v-if="name === '租赁资产'"></wy-menu-index>
      <dj-menu-index v-if="name === '党建'"></dj-menu-index>
      <fw-menu-index v-if="name === '服务'"></fw-menu-index>
    </div>
  </div>
</template>

<script>
import threeJSC from "./components/threeJSC"
import rsMenuIndex from "../components/primary-chart/rs-index"
import cwMenuIndex from "../components/primary-chart/cw-index"
import wyMenuIndex from "../components/primary-chart/znzc-index"
import djMenuIndex from "../components/primary-chart/newDj-index"
import fwMenuIndex from "../components/primary-chart/fw-index"
import jsc from "../jsc"
export default {
  name: "menuThree",
  data () {
    return {
      menuList: [
        { name: '驾驶舱', id: 1 },
        { name: '人事', id: 2 },
        { name: '财务', id: 3 },
        { name: '租赁资产', id: 4 },
        { name: '党建', id: 5 },
        { name: '服务', id: 6 }
      ],
      name: '驾驶舱',
      value111: 1,
      gsName: '',
      zlzcShow: true,
      fwShow: false
    }
  },
  components: {
    threeJSC,
    rsMenuIndex,
    cwMenuIndex,
    wyMenuIndex,
    djMenuIndex,
    fwMenuIndex,
    jsc
  },
  mounted () {
    // const that = this
    document.body.clientHeight
    window.onresize = () => {
      // this.tableHeight = document.body.clientHeight - 517 + 'px'
    }
  },
  created () {
    this.$store.commit('zgsBut', '驾驶舱')
  },
  watch: {
    // let height= this.$refs.getheight.offsetHeight
    $route: {
      handler: function(val, oldVal) {
      },
    },
    // "$store.state.name" (val, oldVal) {
    //   this.gsName = val
    //   if (this.gsName === '上海上勤资产管理有限公司' || this.gsName === '上海名人苑实业有限公司') {
    //     this.zlzcShow = true
    //   } else {
    //     this.zlzcShow = false
    //   }
    // },
    "$store.state.zgsBut": {
      handler (val, oldVal) {
        this.name = val
      },
      // 立即监听
      immediate: true,
    },
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        if (val === '上海锦勤汽车服务有限公司' || val === '上海上勤高级楼宇管理有限公司' || val === '上海上勤物业管理有限公司' || val === '上海上勤餐饮管理有限公司') {
          this.fwShow = true
        } else {
          this.fwShow = false
        }
        if (val === '上海上勤资产管理有限公司' || val === '上海名人苑实业有限公司') {
          this.zlzcShow = true
        } else {
          this.zlzcShow = false
        }
      },
      // 立即监听
      immediate: true,
    },
    // "$store.state.fgsSelValue" (val, oldVal) {
    //   if (val === '上海上勤资产管理有限公司' || val === '上海名人苑实业有限公司') {
    //     this.zlzcShow = true
    //   } else {
    //     this.zlzcShow = false
    //   }
    // },
  },
  computed: {
  },
  methods: {
    onRadio (i) {
      this.name = i.name
      this.menuId = i.id
      this.$store.commit('zgsBut', i.name)
    }
  }
}
</script>

<style scoped>
.aaa {
  background-image: url("../../../../assets/images/bj4.png");
  background-size: cover;
}
/deep/ .ant-radio-button-wrapper {
  background: none;
}
</style>
