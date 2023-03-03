<template>
  <div class="ejIndex">
    <div class="leftBody">
      <div class="tbClass">
        <div style="height: 80%; padding: 15px">
          <a-carousel autoplay>
            <img class="lBimg" src="../../../../../assets/images/dj111.png" />
            <img class="lBimg" src="../../../../../assets/images/dj222.png" />
          </a-carousel>
        </div>
        <div
          style="height: 20%; padding: 5px 10px; font-size: 20px; color: white"
        >
          市委党史学习教育第五巡回指导组到汽服公司本部党支部指导专题组织生活会
        </div>
      </div>
      <div class="tbClass">
        <dyFb></dyFb>
      </div>
    </div>
    <div class="cenBody">
      <div style="height: 20%; padding: 20px 0">
        <a-row>
          <a-col :span="8">
            <a-card
              :bordered="false"
              style="background-color: rgb(0, 0, 0, 0); text-align: center"
            >
              <dv-border-box-8>
                <div class="text">总党员数</div>
                <span class="title">6687人</span>
              </dv-border-box-8>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card
              :bordered="false"
              style="background-color: rgb(0, 0, 0, 0); text-align: center"
            >
              <dv-border-box-8>
                <div class="text">在职党员数</div>
                <span class="title">4432人</span>
              </dv-border-box-8>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card
              :bordered="false"
              style="background-color: rgb(0, 0, 0, 0); text-align: center"
            >
              <dv-border-box-8>
                <div class="text">退休党员数</div>
                <span class="title">2255人</span>
              </dv-border-box-8>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div style="height: 80%">
        <img
          style="width: 100%; height: 98%"
          src="../../../../../assets/images/dj11111.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import zztTwo from "../../twoComponents/zztTwo"
import ZczeBt from "../../ECharts/zczeBt"
import pentagonalChart from "../../../../../components/ECharts/pentagonalChart"
import dyFb from "../../../../../components/ECharts/dyFb"
export default {
  name: "index",
  components: {
    ZczeBt,
    zztTwo,
    pentagonalChart,
    dyFb
  },
  data () {
    return {
      path: '',
      data: [
        {
          title: '正式党员', num: '2800'
        },
        {
          title: '预备党员', num: '300'
        },
        {
          title: '发展党员', num: '500'
        },
        {
          title: '流动党员', num: '100'
        },
        {
          title: '基层党组织', num: '100'
        },
        {
          title: '军队退役党员', num: '100'
        },
      ]
    }
  },
  created () {
    this.path = this.$route.path
  },

  methods: {

  }
}
</script>

<style scoped>
.ejIndex {
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url("../../../../../assets/images/djbjt.jpg") !important;
  overflow: hidden;
}
.leftBody {
  width: 30%;
  border-radius: 5px;
}
.cenBody {
  width: 70%;
  border-radius: 5px;
  padding-right: 20px;
}
.rigBody {
  width: 15%;
  border-radius: 5px;
}
.tbClass {
  height: 50%;
  /*background: #323a5e;*/
}
.tbClass111 {
  width: 100%;
  height: 48%;
  background-size: cover;
  background-position: center 0;
}
.tbClass222 {
  width: 95%;
  height: 45%;
  background-size: cover;
  background-position: center 0;
}
.zxtClass {
  height: 33.33%;
}
/*.title{*/
/*  font-size: 20px;*/
/*  color: white;*/
/*  border-bottom: 1px solid #cccccc;*/
/*  border-right: 1px solid #cccccc;*/
/*  border-left: 1px solid #cccccc;*/
/*  display: flex;*/
/*  height: 69px;*/
/*  line-height: 69px;*/
/*  justify-content: space-around;*/
/*}*/
/deep/ .ant-progress-text {
  display: inline-block;
  width: 2em;
  margin-left: 8px;
  color: yellow;
  font-size: 1em;
  line-height: 1;
  white-space: nowrap;
  text-align: left;
  vertical-align: middle;
  word-break: normal;
}
/deep/ .ant-progress-inner {
  position: relative;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 100px;
  background: orange;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 360px;
  line-height: 360px;
  background: grb(0, 0, 0, 0);
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.lBimg {
  width: 8vh;
  height: 25vh;
  padding-right: 10px;
}
/deep/ .ant-card-body {
  padding: 17px;
  zoom: 1;
}
.text {
  color: white;
  font-weight: bold;
  font-size: 40px;
  border: none;
}
.title {
  font-size: 35px;
  color: yellow;
}
</style>
