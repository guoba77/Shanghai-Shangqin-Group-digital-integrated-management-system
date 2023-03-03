<template>
  <div style="width: 100%; height: 100%" class="aaa">
    <a-radio-group :default-value="value111">
      <a-radio-button
        @click="onRadio({ name: '驾驶舱', id: 1 })"
        style="background: rgb(0, 0, 0, 0); color: #13c2c2"
        value="1"
      >
        驾驶舱
      </a-radio-button>
      <a-radio-button
        @click="onRadio({ name: '人事', id: 2 })"
        style="background: rgb(0, 0, 0, 0); color: #13c2c2"
        value="2"
      >
        人事
      </a-radio-button>
      <a-radio-button
        @click="onRadio({ name: '财务', id: 3 })"
        style="background: rgb(0, 0, 0, 0); color: #13c2c2"
        value="3"
      >
        财务
      </a-radio-button>
      <a-radio-button
        v-if="disabled"
        @click="onRadio({ name: '租赁资产', id: 4 })"
        style="background: rgb(0, 0, 0, 0); color: #13c2c2"
        value="4"
      >
        租赁资产
      </a-radio-button>
      <a-radio-button
        @click="onRadio({ name: '党建', id: 5 })"
        style="background: rgb(0, 0, 0, 0); color: #13c2c2"
        value="5"
      >
        党建
      </a-radio-button>
      <a-radio-button
        @click="onRadio({ name: '服务', id: 6 })"
        style="background: rgb(0, 0, 0, 0); color: #13c2c2"
        value="6"
      >
        服务
      </a-radio-button>
    </a-radio-group>
    <div style="width: 100%; height: 95%">
      <threeJSC v-if="name === '驾驶舱'"></threeJSC>
      <rsIndex v-if="name === '人事'"></rsIndex>
      <cw-menu-index v-if="name === '财务'"></cw-menu-index>
      <wy-menu-index v-if="name === '租赁资产'"></wy-menu-index>
      <dj-menu-index v-if="name === '党建'"></dj-menu-index>
      <fw-menu-index v-if="name === '服务'"></fw-menu-index>
    </div>
  </div>
</template>

<script>
import threeJSC from "./components/menuJSC"
import cwMenuIndex from "../components/primary-chart/cw-index"
import wyMenuIndex from "../components/primary-chart/znzc-index"
import djMenuIndex from "../components/primary-chart/dj-index"
import fwMenuIndex from "../components/primary-chart/fw-index"
import rsIndex from "../components/primary-chart/rs-index"
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
      disabled: true
    }
  },
  components: {
    threeJSC,
    rsIndex,
    cwMenuIndex,
    wyMenuIndex,
    djMenuIndex,
    fwMenuIndex
  },
  created () {
    this.value111 = sessionStorage.getItem('tagId') ? sessionStorage.getItem('tagId') : '1'
    this.name = sessionStorage.getItem('tag') ? sessionStorage.getItem('tag') : '1'
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
      },
    },
    "$store.state.zlzcName" (val, oldVal) {
      if (val === '实业' || val === '' || val === undefined || val === null) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    }
  },
  methods: {
    onRadio (i) {
      this.name = i.name
      this.menuId = i.id
      this.$store.commit('dxName', i.name)
      this.$store.commit('bkBut', i.name)
      this.$router.push({
        path: '/menuBk',
        query: {
          sjName: i.name
        }
      })
    }
  }
}
</script>

<style scoped>
.aaa {
  background-image: url("../../../../assets/images/bj4.png");
  background-size: cover;
}
</style>
