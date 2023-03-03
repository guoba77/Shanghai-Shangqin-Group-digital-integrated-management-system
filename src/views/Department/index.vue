<template>
  <div class="Synopsis">
    <div class="tools">
      <div class="item" @click="$router.push('/Synopsis')">企业简介</div>
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
            <a>组织架构</a>
          </a-menu-item>
          <a-menu-item>
            <a @click="goLogin">登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
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
  background-image: url("../../assets/images/department2.png");
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
}
</style>