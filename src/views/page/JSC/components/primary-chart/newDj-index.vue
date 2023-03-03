<template>
  <div class="ejIndex">
    <div style="height: 15%; width: 100%">
      <a-row>
        <a-col :span="8">
          <a-card
            :bordered="false"
            style="background-color: rgba(0, 0, 0, 0); text-align: center"
          >
            <dv-border-box-8 style="width: 100%">
              <div class="text">总党员数</div>
              <span class="title">{{ num1 }}人</span>
            </dv-border-box-8>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card
            :bordered="false"
            style="background-color: rgba(0, 0, 0, 0); text-align: center"
          >
            <dv-border-box-8 style="width: 100%">
              <div class="text">在职党员数</div>
              <span class="title">{{ num2 }}人</span>
            </dv-border-box-8>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card
            :bordered="false"
            style="background-color: rgba(0, 0, 0, 0); text-align: center"
          >
            <dv-border-box-8 style="width: 100%">
              <div class="text">退休党员数</div>
              <span class="title">{{ num3 }}人</span>
            </dv-border-box-8>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div class="tree">
      <ul class="treeul">
        <li class="d0">
          <div class="d1">
            <span style="cursor: pointer" @click="onSqdc">{{ title }}</span>
          </div>
          <div v-if="lishow">
            <ul class="d2">
              <li class="item" v-for="item in djList">
                <div class="dv">
                  <span class="body-text" @click="onButDj(item)">{{
                    item.title
                  }}</span>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="con-foot">
      <a-carousel v-if="show === 2" style="width: 90%; height: 80%" autoplay>
        <div style="width: 100%; height: 100%" v-for="item in imgList">
          <div
            style="
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: space-around;
            "
          >
            <div class="foot-img">
              <img
                class="img"
                style="width: 100%; height: 30vh"
                :src="item.url"
                :alt="item.alt"
              />
            </div>
            <div class="foot-font">
              <div>
                {{ item.title }}
              </div>
              <hr />
              <div class="content">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </a-carousel>
      <div v-else-if="show === 1" class="foot-text" v-for="item in sonList">
        <span class="body-text" @click="onButDj1(item)">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import zztTwo from "../../twoComponents/zztTwo"
import ZczeBt from "../../ECharts/zczeBt"
import pentagonalChart from "../../../../../components/ECharts/pentagonalChart"
import dyFb from "../../../../../components/ECharts/dyFb"
import img1 from '../../../../../assets/images/图片1.png'
import img2 from '../../../../../assets/images/图片2.png'
import img3 from '../../../../../assets/images/图片3.png'
import { getPartyMemberNum, getPartyMemberNum2 } from '../../../../../api/api'
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
      lishow: true,
      title: `上勤集团党委`,
      path: '',
      djList: [
        { title: '汽服公司党总支', id: 1, num1: 64, num2: 52 },
        { title: '楼宇公司党总支', id: 2, num1: 71, num2: 71 },
        { title: '酒店公司党总支', id: 3, num1: 29, num2: 54 },
        { title: '餐饮公司党总支', id: 4, num1: 28, num2: 10 },
        { title: '集团本部党支部', id: 5, num1: 17, num2: 1 },
        { title: '物业公司党支部', id: 6, num1: 20, num2: 0 },
        { title: '资管公司党支部', id: 7, num1: 6, num2: 8 },
        { title: '景苑公司党支部', id: 8, num1: 15, num2: 0 },
        { title: '名人苑公司党支部', id: 9, num1: 4, num2: 0 },
        { title: '转制单位党支部', id: 10, num1: 2, num2: 13 },
        { title: '退休干部党支部', id: 11, num1: 0, num2: 23 }
      ],
      sonList: [],
      show: 2,
      num1: 0,
      num2: 0,
      num3: 0,
      name: '',
      imgList: [
        { url: img1, alt: '图片1', title: '上勤集团召开党史学习教育总结会议', text: '1月26日，上勤集团召开党史学习教育总结会议，学习贯彻习近平总书记在中央党史学习教育总结会议上的重要讲话精神和贯彻落实上海市党史学习教育总结会议精神，回顾总结集团党史学习教育主要做法成效，巩固拓展党史学习教育经验和成果。集团党史学习教育领导小组及办公室成员、集团管干部40余人参加会议。会上，集团党委副书记、总裁、党史学习教育领导小组组长周德骏代表发言，集团党委副书记杨兵通报集团党史学习教育情况，汽服公司、餐饮公司党总支分别交流了党史学习教育开展情况。' },
        { url: img2, alt: '图片2', title: '上勤集团召开党史学习教育总结会议', text: '7月1日，上勤集团严格落实疫情防控有关要求，通过网络视频会议的方式召开2022年党风廉政建设工作会议。会议组织签订党风廉政建设责任书，总结2021年度纪检工作、部署2022年度党风廉政建设工作。集团党委副书记、总裁周德骏出席会议并讲话，集团领导班子成员、一级子公司主要负责人分别在主会场和分会场参加会议。会议由集团党委副书记杨兵主持。' },
        { url: img3, alt: '图片3', title: '上勤集团召开党史学习教育总结会议', text: '7月29日，上勤集团党政领导班子召开巡视整改专题民主生活会。市机管局党组成员、副局长张晓卯，市纪委监委、市纪委监委驻市政办公厅纪检监察组和局直属机关党委有关同志到会指导。集团党委副书记、总裁周德骏主持会议，集团党政领导班子成员参加会议。' },
      ],
      bodyText: null
    }
  },
  computed: {
    ...mapState(['fgsSelValue'])
  },
  created () {
    this.path = this.$route.path
    this.getDYNum()
  },
  watch: {
    // "$store.state.fgsSelValue" (val, oldVal) {
    //   // if(va)
    // },
    "$store.state.fgsSelValue": {
      handler (val, oldVal) {
        if (this.$route.path === '/threeMenuIndex') {
          if (val === '上海锦勤汽车服务有限公司') {
            this.lishow = true
            this.title = '汽服公司党总支'
            this.djList = [
              { title: '公司本部党支部', id: 101, num1: 13, num2: 0 },
              { title: '保障车队党支部', id: 102, num1: 25, num2: 0 },
              { title: '客运公司党支部', id: 103, num1: 10, num2: 0 },
              { title: '租赁公司党支部', id: 104, num1: 10, num2: 0 },
              { title: '汽修公司党支部', id: 105, num1: 6, num2: 0 },
              { title: '退休人员党支部', id: 106, num1: 0, num2: 52 },
            ]
          } else if (val === '上海上勤高级楼宇管理有限公司') {
            this.lishow = true
            this.title = '楼宇公司党总支'
            this.djList = [
              { title: '公司本部党支部', id: 201, num1: 16, num2: 0 },
              { title: '人民大厦物业党支部', id: 202, num1: 15, num2: 0 },
              { title: '市政大厦物业党支部', id: 203, num1: 12, num2: 0 },
              { title: '浦东办公点物业党支部', id: 204, num1: 10, num2: 0 },
              { title: '市纪委物业党支部', id: 208, num1: 8, num2: 0 },
              { title: '市委党校物业党支部', id: 205, num1: 4, num2: 0 },
              { title: '名人苑物业党支部', id: 206, num1: 6, num2: 0 },
              { title: '退休人员党支部', id: 207, num1: 0, num2: 71 },
            ]
          } else if (val === '上海上勤酒店管理有限公司') {
            this.lishow = true
            this.title = '酒店公司党总支'
            this.djList = [
              { title: '田林宾馆党支部', id: 301, num1: 22, num2: 0 },
              { title: '莘城宾馆党支部', id: 402, num1: 7, num2: 0 },
              { title: '退休人员党支部', id: 503, num1: 0, num2: 54 }
            ]
          } else if (val === '上海上勤餐饮管理有限公司') {
            this.lishow = true
            this.title = '餐饮公司党总支'
            this.djList = [
              { title: '公司本部党支部', id: 401, num1: 15, num2: 0 },
              { title: '综合党支部', id: 402, num1: 13, num2: 0 },
              { title: '退休人员党支部', id: 403, num1: 0, num2: 10 }
            ]
          } else if (val === '上海上勤物业管理有限公司') {
            this.lishow = false
            this.title = '物业公司党支部'
            this.djList = [
            ]
          } else if (val === '上海上勤资产管理有限公司') {
            this.lishow = false
            this.title = '资管公司党支部'
            this.djList = [
            ]
          } else if (val === '上海上勤景苑酒店管理有限公司') {
            this.lishow = false
            this.title = '景苑公司党支部'
            this.djList = [
            ]
          } else if (val === '上海名人苑实业有限公司') {
            this.lishow = false
            this.title = '名人苑公司党支部'
            this.djList = [
            ]
          }
        }
      },
      // 立即监听
      immediate: true,
    },
    "$store.state.name" (val, oldVal) {
      if (val) {
        this.name = val
        if (this.name === '上海锦勤汽车服务有限公司') {
          this.bodyText = 1
        } else if (this.name === '上海上勤高级楼宇管理有限公司') {
          this.bodyText = 2
        } else if (this.name === '上海上勤物业管理有限公司') {
          this.bodyText = 3
        } else if (this.name === '上海上勤餐饮管理有限公司') {
          this.bodyText = 4
        } else {
          this.show = 2
        }
      }
    }
  },
  methods: {
    async getDYNum () {
      try {
        if (this.$route.path === '/dj-primaryIndex') {
          const res = await getPartyMemberNum()
          if (res.data.code === 0) {
            this.num1 = res.data.data.totalNumber
            this.num2 = res.data.data.onNumber
            this.num3 = res.data.data.retireNumber
          }
        } else if (this.$route.path === '/threeMenuIndex') {
          const res = await getPartyMemberNum2(this.$store.state.fgsSelValue)
          if (res.data.code === 0) {
            this.num1 = res.data.data.totalNumber
            this.num2 = res.data.data.onNumber
            this.num3 = res.data.data.retireNumber
          }
        }
      }
      catch (err) {
        console.log(err)
      }
    },
    onButDj1 (item) {
    },
    onSqdc () {
      this.getDYNum()
      this.show = 2
    },
    onButDj (item) {
      this.num1 = item.num1 + item.num2
      this.num2 = item.num1
      this.num3 = item.num2
      this.bodyText = item.id
      this.show = 1
      if (item.id === 1) {
        this.sonList = [
          { title: '公司本部党支部', id: 101, num1: 13, num2: 0 },
          { title: '保障车队党支部', id: 102, num1: 25, num2: 0 },
          { title: '客运公司党支部', id: 103, num1: 10, num2: 0 },
          { title: '租赁公司党支部', id: 104, num1: 10, num2: 0 },
          { title: '汽修公司党支部', id: 105, num1: 6, num2: 0 },
          { title: '退休人员党支部', id: 106, num1: 0, num2: 52 },
        ]
      } else if (item.id === 2) {
        this.sonList = [
          { title: '公司本部党支部', id: 201, num1: 16, num2: 0 },
          { title: '人民大厦物业党支部', id: 202, num1: 15, num2: 0 },
          { title: '市政大厦物业党支部', id: 203, num1: 12, num2: 0 },
          { title: '浦东办公点物业党支部', id: 204, num1: 10, num2: 0 },
          { title: '市纪委物业党支部', id: 208, num1: 8, num2: 0 },
          { title: '市委党校物业党支部', id: 205, num1: 4, num2: 0 },
          { title: '名人苑物业党支部', id: 206, num1: 6, num2: 0 },
          { title: '退休人员党支部', id: 207, num1: 0, num2: 71 },
        ]
      } else if (item.id === 3) {
        this.sonList = [
          { title: '田林宾馆党支部', id: 301, num1: 22, num2: 0 },
          { title: '莘城宾馆党支部', id: 402, num1: 7, num2: 0 },
          { title: '退休人员党支部', id: 503, num1: 0, num2: 54 }
        ]
      } else if (item.id === 4) {
        this.sonList = [
          { title: '公司本部党支部', id: 401, num1: 15, num2: 0 },
          { title: '综合党支部', id: 402, num1: 13, num2: 0 },
          { title: '退休人员党支部', id: 403, num1: 0, num2: 10 }
        ]
      } else {
        this.show = 2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-size: 20px;
}
.img {
  object-fit: cover;
}
.ejIndex {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-image: url("../../../../../assets/images/djbjt.jpg") !important;
  // background-size: cover;
  overflow: hidden;
  .container {
    height: 85%;
    background-image: url("../../../../../assets/dj/d5.png");
    background-size: 100% 100%;
    .con-head {
      height: 12%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      color: yellow;
    }
    .con-body {
      height: 41%;
      padding: 0 56px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .con-body-text {
        width: 5%;
        height: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        color: #0876ba;
      }
      .con-body-text1 {
        width: 5%;
        height: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: bold;
        color: orangered;
      }
    }
  }
}
.body-text {
  writing-mode: vertical-lr;
  letter-spacing: 5px;
  cursor: pointer;
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
  font-size: 30px;
  border: none;
}
.title {
  font-size: 35px;
  color: yellow;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

.con-foot {
  height: 46%;
  display: flex;
  align-items: center;
  justify-content: center;
  .foot-text {
    width: 60px;
    height: 300px;
    margin: 0 15px;
    color: #e11614;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    background-image: url("../../../../../assets/dj/djht.png");
    background-size: 100% 100%;
    border-radius: 10px;
  }
  .foot-img {
    width: 40%;
    height: 30vh;
    background-size: 100% 100%;
  }
  .foot-font {
    width: 40%;
    padding: 10px;
    font-size: 24px;
    color: white;
    word-wrap: break-word;
  }
}

.tree {
  width: 100%;
  height: 45%;
}
ul,
li {
  list-style: none;
}

.dv {
  width: 60px;
  height: 240px;
  //border: 2px solid #ccc;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: #e11614;
  font-size: 18px;
  font-weight: bold;
  background-image: url("../../../../../assets/dj/djht.png");
  background-size: 100% 100%;
}
.d0 {
  width: 100%;
  height: 100%;
}
.d1 {
  width: 37.5vw;
  height: 8vh;
  font-size: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: yellow;
  font-weight: bold;
  background-color: #ff0000 !important;
}
.d2 {
  width: 80vw;
  margin: 0 auto;
}
.item {
  width: 9%;
}
ul {
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 2vh 0 0 0;
}

li {
  float: left;
  text-align: center;
  position: relative;
  padding: 2vh 2vw 0 2vw;
  font-size: 0;
}

.tree li:only-child {
  padding: 0;
}

.tree ul ul::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 0;
  height: 20px;
  border-left: 2px solid #ccc;
}

li::before {
  content: "";
  position: absolute;
  right: 50%;
  top: 0;
  width: 50%;
  height: 2vh;
  border-top: 2px solid #ccc;
}

li::after {
  content: "";
  position: absolute;
  right: 50%;
  top: 0;
  width: 50%;
  height: 2vh;
  border-top: 2px solid #ccc;
}

li::after {
  left: 50%;
  top: 0;
  right: 0;
  border-left: 2px solid #ccc;
}

li:first-child::after {
  border-radius: 5px 0 0 0;
}

.treeul li:first-child::before,
.treeul li:last-child::after {
  border: none;
}

.treeul li:last-child::before {
  border-right: 2px solid #ccc;
  border-radius: 0px 5px 0 0;
}

.treeul li:only-child::before {
  border: none;
}
</style>
