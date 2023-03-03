<template>
  <div v-if="menuName === '集团办'" class="tb">
    <div class="tbHead">
      <div class="tbOne">
        <!--        <a-tag class="bq">-->
        <!--          人事-->
        <!--        </a-tag>-->
        <yysrZxt></yysrZxt>
      </div>
      <div class="tbTwo">
        <!--        <a-tag class="bq">-->
        <!--          财务-->
        <!--        </a-tag>-->
        <div
          style="display: flex; text-align: center; width: 100%; height: 100%"
        >
          <zczeChart></zczeChart>
        </div>
      </div>
      <div class="tbThree">
        <!--        <a-tag class="bq">-->
        <!--          租赁资产-->
        <!--        </a-tag>-->
        <zztFour></zztFour>
      </div>
    </div>
    <div class="tbBody">
      <div class="body2" style="display: flex">
        <!--        <a-tag class="bq">-->
        <!--          党建-->
        <!--        </a-tag>-->
        <div style="width: 60%">
          <twoZzt></twoZzt>
        </div>
        <div style="width: 40%">
          <div style="height: 50%"><qpt></qpt></div>
          <div style="height: 50%"><leidaChart></leidaChart></div>
        </div>
      </div>
      <div class="body3" style="display: flex">
        <!--        <a-tag class="bq2">-->
        <!--          服务-->
        <!--        </a-tag>-->
        <div style="width: 40%">
          <div style="height: 50%">
            <wyQpt></wyQpt>
          </div>
          <div style="height: 50%">
            <fdhxtChart></fdhxtChart>
          </div>
        </div>
        <div style="width: 60%">
          <threeZzt></threeZzt>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="menuName === '实业'" class="tb">
    <div class="tbHead">
      <div class="tbOne">
        <!--        <a-tag class="bq">-->
        <!--          人事-->
        <!--        </a-tag>-->
        <yysrZxt></yysrZxt>
      </div>
      <div class="tbTwo">
        <!--        <a-tag class="bq">-->
        <!--          财务-->
        <!--        </a-tag>-->
        <div
          style="display: flex; text-align: center; width: 100%; height: 100%"
        >
          <zczeChart></zczeChart>
        </div>
      </div>
      <div class="tbThree">
        <!--        <a-tag class="bq">-->
        <!--          租赁资产-->
        <!--        </a-tag>-->
        <zztFour></zztFour>
      </div>
    </div>
    <div class="tbBody">
      <div class="body2" style="display: flex">
        <!--        <a-tag class="bq">-->
        <!--          党建-->
        <!--        </a-tag>-->
        <div style="width: 60%">
          <twoZzt></twoZzt>
        </div>
        <div style="width: 40%">
          <div style="height: 50%"><qpt></qpt></div>
          <div style="height: 50%"><leidaChart></leidaChart></div>
        </div>
      </div>
      <div class="body3" style="display: flex">
        <!--        <a-tag class="bq2">-->
        <!--          当前项目-->
        <!--        </a-tag>-->
        <div style="width: 40%">
          <div style="height: 50%">
            <div style="font-size: 16px; color: #13c2c2">名人苑项目面积</div>
            <wyQpt3></wyQpt3>
          </div>
          <div style="height: 50%">
            <div style="font-size: 16px; color: #13c2c2">
              万荣路项目人员总数
            </div>
            <wyQpt2></wyQpt2>
          </div>
        </div>
        <div style="width: 60%">
          <ybpMenuChart></ybpMenuChart>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="menuName === '物业'" class="tb">
    <div class="tbHead">
      <div class="tbOne">
        <!--        <a-tag class="bq">-->
        <!--          人事-->
        <!--        </a-tag>-->
        <yysrZxt></yysrZxt>
      </div>
      <div class="tbTwo">
        <!--        <a-tag class="bq">-->
        <!--          财务-->
        <!--        </a-tag>-->
        <div
          style="display: flex; text-align: center; width: 100%; height: 100%"
        >
          <zczeChart></zczeChart>
        </div>
      </div>
      <div class="tbThree">
        <!--        <a-tag class="bq">-->
        <!--          楼宇属性-->
        <!--        </a-tag>-->
        <menuBt></menuBt>
      </div>
    </div>
    <div class="tbBody">
      <div class="body2" style="display: flex">
        <!--        <a-tag class="bq">-->
        <!--          党建-->
        <!--        </a-tag>-->
        <div style="width: 60%">
          <twoZzt></twoZzt>
        </div>
        <div style="width: 40%">
          <div style="height: 50%"><qpt></qpt></div>
          <div style="height: 50%"><leidaChart></leidaChart></div>
        </div>
      </div>
      <div class="body3" style="display: flex">
        <!--        <a-tag class="bq2">-->
        <!--          服务-->
        <!--        </a-tag>-->
        <div style="width: 40%">
          <div style="height: 50%">
            <wyQpt></wyQpt>
          </div>
          <div style="height: 50%">
            <fdhxtChart></fdhxtChart>
          </div>
        </div>
        <div style="width: 60%">
          <threeZzt></threeZzt>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="menuName === '餐饮'" class="tb">
    <div class="tbHead">
      <div class="tbOne">
        <!--        <a-tag class="bq">-->
        <!--          人事-->
        <!--        </a-tag>-->
        <yysrZxt></yysrZxt>
      </div>
      <div class="tbTwo">
        <!--        <a-tag class="bq">-->
        <!--          财务-->
        <!--        </a-tag>-->
        <div
          style="display: flex; text-align: center; width: 100%; height: 100%"
        >
          <zczeChart></zczeChart>
        </div>
      </div>
      <div class="tbThree">
        <!--        <a-tag class="bq">-->
        <!--          餐饮文化-->
        <!--        </a-tag>-->
        <div
          style="
            position: absolute;
            z-index: 999;
            color: white;
            font-size: 16px;
          "
        >
          餐饮文化
        </div>
        <video width="95%" height="95%" autoplay="autoplay">
          <source src="../../../../../assets/images/jd.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
    <div class="tbBody">
      <div class="body2" style="display: flex">
        <!--        <a-tag class="bq">-->
        <!--          党建-->
        <!--        </a-tag>-->
        <div style="width: 60%">
          <twoZzt></twoZzt>
        </div>
        <div style="width: 40%">
          <div style="height: 50%"><qpt></qpt></div>
          <div style="height: 50%"><leidaChart></leidaChart></div>
        </div>
      </div>
      <div class="body3" style="display: flex">
        <!--        <a-tag class="bq2">-->
        <!--          服务-->
        <!--        </a-tag>-->
        <div style="width: 40%">
          <div style="height: 50%">
            <div style="font-size: 16px; color: #13c2c2">公司总人数</div>
            <wyQpt2></wyQpt2>
          </div>
          <div style="height: 50%">
            <fdhxtChart></fdhxtChart>
          </div>
        </div>
        <div style="width: 60%">
          <threeZzt></threeZzt>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="menuName === '酒店'" class="tb">
    <div class="tbHead">
      <div class="tbOne">
        <!--        <a-tag class="bq">-->
        <!--          人事-->
        <!--        </a-tag>-->
        <yysrZxt></yysrZxt>
      </div>
      <div class="tbTwo">
        <!--        <a-tag class="bq">-->
        <!--          财务-->
        <!--        </a-tag>-->
        <div
          style="display: flex; text-align: center; width: 100%; height: 100%"
        >
          <zczeChart></zczeChart>
        </div>
      </div>
      <div class="tbThree">
        <!--        <a-tag class="bq">-->
        <!--          荣誉奖章-->
        <!--        </a-tag>-->
        <div
          style="
            position: absolute;
            z-index: 999;
            color: white;
            font-size: 16px;
          "
        >
          荣誉奖章
        </div>
        <a-carousel autoplay>
          <img src="../../../../../assets/荣誉勋章图片/ry1.png" />
          <img src="../../../../../assets/荣誉勋章图片/r2.png" />
          <img src="../../../../../assets/荣誉勋章图片/r3.png" />
          <img src="../../../../../assets/荣誉勋章图片/r4.png" />
          <img src="../../../../../assets/荣誉勋章图片/r5.png" />
          <img src="../../../../../assets/荣誉勋章图片/r6.png" />
          <img src="../../../../../assets/荣誉勋章图片/r7.png" />
          <img src="../../../../../assets/荣誉勋章图片/r8.png" />
        </a-carousel>
      </div>
    </div>
    <div class="tbBody">
      <div class="body2" style="display: flex">
        <!--        <a-tag class="bq">-->
        <!--          党建-->
        <!--        </a-tag>-->
        <div style="width: 60%">
          <twoZzt></twoZzt>
        </div>
        <div style="width: 40%">
          <div style="height: 50%"><qpt></qpt></div>
          <div style="height: 50%"><leidaChart></leidaChart></div>
        </div>
      </div>
      <div class="body3" style="display: flex">
        <!--        <a-tag class="bq2">-->
        <!--          酒店房间-->
        <!--        </a-tag>-->
        <div style="width: 40%">
          <div style="height: 50%">
            <wyQpt2></wyQpt2>
          </div>
          <div style="height: 50%">
            <fdhxtChart></fdhxtChart>
          </div>
        </div>
        <div style="width: 60%">
          <bkZzt2></bkZzt2>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="menuName === '汽服'" class="tb">
    <div class="tbHead">
      <div class="tbOne">
        <!--        <a-tag class="bq">-->
        <!--          人事-->
        <!--        </a-tag>-->
        <yysrZxt></yysrZxt>
      </div>
      <div class="tbTwo">
        <!--        <a-tag class="bq">-->
        <!--          财务-->
        <!--        </a-tag>-->
        <div
          style="display: flex; text-align: center; width: 100%; height: 100%"
        >
          <zczeChart></zczeChart>
        </div>
      </div>
      <div class="tbThree">
        <!--        <a-tag class="bq">-->
        <!--          汽车种类-->
        <!--        </a-tag>-->
        <qczzt></qczzt>
      </div>
    </div>
    <div class="tbBody">
      <div class="body2" style="display: flex">
        <!--        <a-tag class="bq">-->
        <!--          党建-->
        <!--        </a-tag>-->
        <div style="width: 60%">
          <twoZzt></twoZzt>
        </div>
        <div style="width: 40%">
          <div style="height: 50%"><qpt></qpt></div>
          <div style="height: 50%"><leidaChart></leidaChart></div>
        </div>
      </div>
      <div class="body3" style="display: flex">
        <!--        <a-tag class="bq2">-->
        <!--          服务-->
        <!--        </a-tag>-->
        <div style="width: 40%">
          <div style="height: 50%">
            <wyQpt2></wyQpt2>
          </div>
          <div style="height: 50%">
            <fdhxtChart></fdhxtChart>
          </div>
        </div>
        <div style="width: 60%">
          <threeZzt></threeZzt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qpt from "../../ECharts/qpt"
import tbOneZzt from "../../../../../components/ECharts/sjxzzt"
import bt from "../../ECharts/bt"
import twoBt from "../../twoComponents/btOne"
import twoZzt from "../../twoComponents/zztTwo"
import threeZzt from "../../twoComponents/zztThree"
import zztFour from "../../twoComponents/zztFour"
import zczeBt from "../../ECharts/zczeBt"
import yysrZxt from "../../ECharts/yysrZxt"
import zczeChart from "../../../../../components/ECharts/zczeChart"
import leidaChart from "../../../../../components/ECharts/leidaChart"
import fdhxtChart from "../../../../../components/ECharts/fdhxtChart"
import wyQpt from "../../ECharts/wyQpt"
import ybpMenuChart from "./menuCom/ybpMenuChart"
import wyQpt2 from "../../ECharts/wyQpt2"
import wyQpt3 from "../../ECharts/wyQpt3"
import bkZzt2 from "./menuCom/bkZzt2"
import qczzt from "./menuCom/qczzt"
import pieChart from "../../../../../components/ECharts/pieChart"
import menuBt from "./menuCom/menuBt"
export default {
  name: "jsc",
  components: {
    qpt,
    ybpMenuChart,
    pieChart,
    menuBt,
    bkZzt2,
    wyQpt2,
    wyQpt3,
    bt,
    qczzt,
    twoBt,
    twoZzt,
    threeZzt,
    tbOneZzt,
    zztFour,
    zczeBt,
    yysrZxt,
    zczeChart,
    leidaChart,
    fdhxtChart,
    wyQpt
  },
  data () {
    return {
      zczeShow: false,
      show: true,
      isTrue: false,
      menuShow: true,
      menuName: '实业',
    }
  },
  created () {
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
    $route: {
      handler: function(val, oldVal) {
        this.menuName = val.query.name
      },
    }
  },
  methods: {
    // 人事一级页面/wy-primaryIndex
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
  right: 10px;
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
/deep/ .video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 360px;
  line-height: 360px;
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
img {
  width: 10vh;
  height: 33vh;
  padding-right: 10px;
}
</style>
