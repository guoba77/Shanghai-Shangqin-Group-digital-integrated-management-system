<template>
  <div class="Synopsis">
    <div class="tools">
      <div class="item" @click="$router.push('/Department')">组织架构</div>
      <div class="item" @click="goLogin">管理系统</div>
      <!-- <a-dropdown>
        <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
          <a-icon
            :style="{ fontSize: '25px', color: 'white' }"
            type="unordered-list"
          />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a @click="$router.push('/')">企业简介</a>
          </a-menu-item>
          <a-menu-item>
            <a @click="$router.push('/Department')">组织架构</a>
          </a-menu-item>
          <a-menu-item>
            <a @click="goLogin">登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown> -->
    </div>
    <div class="content">
      <p class="text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
import router, { asyncRoutes } from '@/router/index.js'
export default {
  data () {
    return {
      text: `市国资委委托市机管局监管的国有独资企业。2003年1月，为推进上海机关后勤体制改革, 探索机关后勤服务社会化模式,根据市委、市政府关于机关后勤体制改革的要求, 市机管局所属的9家企事业单位转制组建了上海锦勤（集团）有限公司和上海盛勤（集团）有限公司。2009年7月，两个集团合并重组成
立了上海上勤（集团）有限公司。集团主要以“承担本市各级机
关政务活动的后勤服务保障，提高机关后勤服务质量; 运用市
场机制盘活机关后勤资源, 实现国有资产保值增值; 为机关后
勤改革提供支撑, 加快实现机关后勤服务社会化和市场化”为
三大职能，弘扬“海纳百川、追求卓越、开明睿智、大气谦和”的
上海城市精神和“精细、极致、专业、满意”的服务价值观，遵循
“服务保障是立身之本, 改革创新是发展之要”的发展理念，是全国机关后勤改革创新发展的领军企业。集团下设汽车服务、
      物业管理、餐饮服务、酒店管理、资产管理五大服务板块。集团现有总资产为33.83亿元, 净资产为26.80亿元。`
    }
  },
  created () {
    // this.getuser()
  },
  methods: {
    goLogin () {
      this.$router.push('/jsc')
    }
  }
}
</script>

<style lang="scss" scoped>
.Synopsis {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("../../assets/images/bg1.jpg");
  // filter: opacity(0.6);
  // filter: brightness(50%);
  background-size: 100% 100%;
  .tools {
    position: absolute;
    right: 25px;
    top: 20px;
    .item {
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-bottom: 10px;
      background-color: rgb(203, 234, 252);
      color: black;
      text-align: center;
      line-height: 30px;
      width: 100px;
      height: 30px;
      &:hover {
        background-color: rgb(154, 211, 244);
      }
    }
  }
  .content {
    &:after {
      content: "";
      // background: url("../../assets/images/bj0.png");
      // opacity: 0.95;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
      border-radius: 20px;
    }
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%);
    // background-image: url("../../assets/images/bj0.png");
    background-position: center;
    // background-color: rgba(28, 58, 58, 0.2);
    width: 1200px;
    height: calc(100% - 200px);
    // height: 660px;
    .text {
      padding: 10px;
      text-align: left;
      color: white;
      margin: 40px;
      line-height: 3;
      text-indent: 2em;
      font-size: 22px;
    }
  }
}
</style>
