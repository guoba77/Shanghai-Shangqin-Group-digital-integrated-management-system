<template>
  <div class="tb">
    <div class="tbHead">
      <div v-if="hasBtn('person:select:1')" class="tbOne">
        <a-tag
          v-if="hasBtn('person:select:2')"
          class="bq"
          @click="onRouter('组织人事')"
        >
          组织人事
        </a-tag>
        <rsbqZzt></rsbqZzt>
      </div>
      <div v-if="hasBtn('finance:select:1')" class="tbTwo">
        <a-tag
          v-if="hasBtn('finance:select:2')"
          class="bq"
          @click="onRouter('财务管理')"
        >
          财务管理
        </a-tag>
        <zczeChart></zczeChart>
      </div>
      <div v-if="hasBtn('assets:select:1')" class="tbThree">
        <a-tag
          v-if="hasBtn('assets:select:2')"
          class="bq"
          @click="onRouter('资产管理')"
        >
          资产管理
        </a-tag>
        <horizontalHistogramChart2zc></horizontalHistogramChart2zc>
      </div>
    </div>
    <div class="tbBody">
      <div v-if="hasBtn('party:select:1')" class="body2">
        <a-tag
          v-if="hasBtn('party:select:2')"
          class="bq"
          @click="onRouter('党建工作')"
        >
          党建工作
        </a-tag>
        <div style="width: 100%; height: 100%">
          <dyFb></dyFb>
        </div>
      </div>
      <div v-if="hasBtn('satisfacty:select:1')" class="body3">
        <div style="width: 100%; height: 100%">
          <wy-qpt></wy-qpt>
        </div>
      </div>
      <div v-if="hasBtn('service:select:1')" class="body4">
        <a-tag
          v-if="hasBtn('service:select:2')"
          class="bq2"
          @click="onRouter('服务保证')"
        >
          服务保障
        </a-tag>
        <div style="width: 100%; height: 100%">
          <threeZzt></threeZzt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import threeZzt from "./twoComponents/zztThree"
import zczeChart from "../../../components/ECharts/zczeChart"
import leidaChart from "../../../components/ECharts/leidaChart"
import wyQpt from "./ECharts/wyQpt"
import qpt from "./ECharts/qpt"
import rsbqZzt from "./ECharts/rsbqZzt"
import horizontalHistogramChart2zc from '../../../components/ECharts/horizontalHistogramChart2zc'
import dyFb from '../../../components/ECharts/dyFb'
export default {
  name: "jsc",
  components: {
    wyQpt,
    threeZzt,
    horizontalHistogramChart2zc,
    qpt,
    dyFb,
    zczeChart,
    leidaChart,
    rsbqZzt
  },
  data () {
    return {
      zczeShow: false,
      show: true,
      menuShow: true,
      list1: [
        { name: '财务核心数值', value: '96', id: 'ybp1' },
        { name: '资产总额', value: '60', id: 'ybp2' }
      ],
      list2: [
        { name: '资产服务满意度', value: '80', id: 'ybp3' },
        { name: '人事核心数值', value: '80', id: 'ybp4' }
      ]
    }
  },
  created () {
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
    }
  },
  methods: {
    // 人事一级页面/wy-primaryIndex
    onRouter (tag) {
      this.$store.commit('butShow', true)
      this.$store.commit('dxName', tag)
      sessionStorage.setItem('tag', tag)
      if (tag === '组织人事') {
        this.$router.push('/rs-primaryIndex')
        this.$store.commit('tagName', tag)
        sessionStorage.setItem('tagId', '2')
      } else if (tag === '财务管理') {
        this.$router.push('/cw-primaryIndex')
        this.$store.commit('tagName', tag)
        sessionStorage.setItem('tagId', '3')
      } else if (tag === '资产管理') {
        this.$router.push('/wy-primaryIndex')
        this.$store.commit('tagName', tag)
        sessionStorage.setItem('tagId', '4')
      } else if (tag === '党建工作') {
        this.$router.push('/dj-primaryIndex')
        this.$store.commit('tagName', tag)
        sessionStorage.setItem('tagId', '5')
      } else if (tag === '服务保证') {
        this.$router.push('/fw-primaryIndex')
        this.$store.commit('tagName', tag)
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
  /*width: 87.9vw;*/
  /*height: 90vh;*/
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/images/bj4.png");
  background-size: cover;
  /*background-color: #153E77;*/
  overflow: hidden;
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
  width: 35%;
  height: 100%;
  margin: 0px 5px 0 0px;
}
.body3 {
  width: 40%;
  height: 100%;
  margin: 0px 5px 0 0px;
}
.body4 {
  width: 35%;
  height: 100%;
  margin: 0px 0px 0 0px;
}
.bq {
  position: absolute;
  z-index: 1000;
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
.bq2 {
  position: absolute;
  z-index: 1000;
  right: 10px;
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
