<template>
  <div class="home">
    <a-layout id="components-layout-demo-custom-trigger" class="con">
      <a-layout-sider
        v-model="collapsed"
        class="menu"
        :trigger="null"
        collapsible
      >
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="inline"
          @select="onMenuSel"
          :default-selected-keys="[selKey]"
        >
          <a-sub-menu
            :key="index"
            v-for="(item, index) in menuList"
            v-if="item.show != false"
          >
            <span slot="title">
              <a-icon :type="item.icon" />
              <span>{{ item.name }}</span>
            </span>
            <a-menu-item
              v-for="(child, index) in item.list"
              :key="child.path"
              :index="child.path"
            >
              <!-- {{ child.name }} -->
              <router-link :to="child.path">{{ child.name }}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <div class="menuHead">
            <div style="width: 33.33%; text-align: left">
              <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="() => (collapsed = !collapsed)"
              />
              <a-button
                type="parimay"
                v-if="butShow"
                style="background: #001529; color: #13c2c2"
                @click="onBack"
                >返回上一级</a-button
              >
              <a-button
                v-if="butShow2"
                type="parimay"
                style="margin-left: 10px; background: #001529; color: #13c2c2"
                @click="$router.push('/FwDetail')"
                >服务点列表</a-button
              >

              <a-select
                placeholder="请选择公司"
                :disabled="ejDisabled"
                style="
                  width: 200px;
                  background: rgba(0, 0, 0, 0);
                  color: #13c2c2;
                "
                v-model="selectValue1"
                v-show="gsData.length !== 0 && $store.state.zgsBut === '驾驶舱'"
                v-if="selShow"
                @change="handleChange1"
              >
                <a-select-option
                  v-for="item in gsData"
                  :key="item.key"
                  :value="item.value"
                >
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </div>
            <div style="width: 33.34%" class="head-font">
              {{ text }}
            </div>

            <div
              style="
                width: 33.34%;
                text-align: right;
                display: flex;
                justify-content: flex-end;
              "
            >
              <div class="item" @click="$router.push('/Synopsis')">
                企业简介
              </div>
              <div class="item" @click="$router.push('/Department')">
                组织架构
              </div>
              <a-icon
                class="trigger"
                style="margin-right: 5px"
                type="poweroff"
                @click="onGb"
              />
            </div>
          </div>
        </a-layout-header>
        <a-layout-content :style="{ background: 'rgb(0 10 24)' }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { resetRouter } from '@/router/index.js'
import { mapGetters } from 'vuex'
import { removerToken } from '../utils/token'
import { getcompanyData } from '@/api/api.js'
export default {
  data () {
    return {
      collapsed: false,
      menuList: [
        {
          name: '驾驶舱',
          icon: 'heat-map',
          list: [{ name: '集团驾驶舱', path: '/jsc' }, { name: '子公司驾驶舱', path: '/threeMenuIndex' }]
        },
        {
          name: '权限管理',
          icon: 'idcard',
          // ,{name:'板块驾驶舱',path: 'menuBk'}
          list: [{ name: '用户管理', path: '/permission' }]
        },
        {
          name: '财务数据管理',
          icon: 'stock',
          list: [{ name: '公司财务数据', path: '/cwsjgl' },
            // , { name: '财务数据上传记录', path: 'cwsclb' }
          ]
        },
        {
          name: '租赁资产管理',
          icon: 'credit-card',
          list: [{ name: '资产管理', path: '/clzcgl' }, { name: '营收管理', path: '/Revenue' }, { name: '区域统计', path: '/zcsc' }]
        },
        {
          name: '人事数据管理',
          icon: 'team',
          list: [{ name: '公司员工数据', path: '/ygsjgl' }, { name: '人事子公司数据', path: '/ygsjjl' }]
        },
        {
          name: '党建数据管理',
          icon: 'user',
          // list:[{name:'公司党组织数据',path: 'djsjgl'},{name:'公司党员数据',path: 'djDY'},{name:'党组织数据记录',path: 'dzzSJ'},{name:'党员数据记录',path: 'dySJ'}]
          list: [{ name: '公司党员数据', path: '/djDY' }, { name: '党员发展情况', path: '/djsjgl' }]
        },
        {
          name: '服务项目管理',
          icon: 'database',
          list: [{ name: '服务点采集', path: '/fwxmgl' }
            // , { name: '服务项目数据记录', path: 'fwxmjl' }
          ]
        },
        {
          name: '其它管理',
          icon: 'setting',
          list: [{ name: '子公司数据管理', path: '/Subsidiary' }, { name: '子公司车辆', path: '/SubsidiaryCar' }, { name: '子公司房间', path: '/SubHouse' }, { name: '子公司房间出租率', path: '/SubHouseRate' }]
        }
      ],
      butShow: false,
      butShow2: false,
      selShow: false,
      switchShow: true,
      but111: false,
      value: true,
      ejDisabled: false,
      bkList: [{ id: 1, name: '实业' }, { id: 2, name: '物业' }, { id: 3, name: '餐饮' }, { id: 4, name: '酒店' }, { id: 5, name: '汽服' }, { id: 0, name: '集团办' }],
      // gsList: [{id: 1,name: '上勤景苑酒店管理有限公司'},{id: 2,name: '上勤楼宇管理有限公司'},{id: 3,name: '上勤餐饮有限公司'}],
      gsList: [],
      gsData: [
      ],
      selKey: '',
      // bgColor: '#001529',
      rouPath: '',
      selectValue: '实业',
      selectValue1: '',
      butVal: '',
      menuShow: true,
      text: '集团人、财、租赁资产一体化管理系统',
      dxText: '',
      p1: '',
      p2: '',
    }
  },
  computed: {
    ...mapGetters(['menus', 'directory'])
  },
  created () {
    // this.selectMenu()
    this.selKey = this.$router.history.current.path
    // JSON.parse()
    // JSON.stringify()
    this.getcompanyList()

  },
  updated () {
    if (this.$route.path === '/fw-primaryIndex') {
      this.butShow2 = true
    } else {
      this.butShow2 = false
    }
  },
  mounted () {
    this.selectMenu()
    this.getcompanyList()
    this.path = this.$route.path
    this.butShow = this.$route.meta.butShow
    this.selShow = this.$route.meta.selShow ? this.$route.meta.selShow : false
    if (this.path === '/threeMenuIndex') {
      this.text = this.$store.state.fgsSelValue + '指标'
    } else {
      this.text = this.$route.meta.title
    }
  },
  watch: {
    "$store.state.user": {
      handler (val, oldVal) {
        this.selectMenu()
      },
      deep: true,
      // 立即监听
      immediate: true,
    },
    $route: {
      handler: function(val, oldVal) {
        if (val.path === '/fw-primaryIndex') {
          this.butShow2 = true
        } else {
          this.butShow2 = false
        }
        this.rouPath = val.path
        this.butShow = val.meta.butShow
        this.selShow = val.meta.selShow ? val.meta.selShow : false
        if (val.path === '/threeMenuIndex') {
          this.text = this.$store.state.fgsSelValue + '指标'
        } else {
          this.text = val.meta.title
        }
      },
      deep: true
    },
    "$store.state.bkSelValue" (newVal, oldVal) {
      this.selectValue = newVal
    },
    "$store.state.zgsBut" (newVal, oldVal) {
      this.butVal = newVal
      if (newVal != '驾驶舱') {
        this.text = this.selectValue1 + this.butVal + '指标'
      } else {
        this.text = this.selectValue1
      }
    },
  },
  methods: {
    onMenuSel ({ item, key, selectedKeys }) {
    },
    // 筛选菜单
    selectMenu () {
      const selectDirectory = this.menuList.filter((item, index) => {
        if (this.directory) {
          return this.directory.includes(item.name)
        }
      })
      this.menuList = selectDirectory
      this.menuList.forEach((item, index) => {
        const res = item.list.filter((cld) => {
          if (this.menus) {
            return this.menus.includes(cld.path)
          }
        })
        item.list = res
        if (res.length === 0) {
          this.menuList.splice(index, 1)
        }
      })

      // this.menuList = selectList
    },
    // 获取下拉菜单公司数据
    getcompanyList () {
      getcompanyData().then((res) => {
        if (res.data.code === 0) {
          this.gsData = res.data.data
          this.selectValue1 = res.data.data[0].value
          this.$store.commit('fgsSelValue', res.data.data[0].value)
          this.$store.commit('fgsName', res.data.data[0].value)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 子公司下拉框
    handleChange1 (value) {
      this.ejDisabled = false
      this.p2 = this.rouPath
      this.selectValue1 = value
      this.text = this.selectValue1 + this.butVal + '指标'
      this.$store.commit('fgsName', value)
      this.$store.commit('fgsSelValue', value)
      // 子公司模拟数据
      var arr = []
      var arr1 = []
      var arr2 = []
      var ll1 = []
      var ll2 = []
      let cwNum = Math.floor(Math.random() * (10000 - 5000 + 1))
      let cwNum1 = Math.floor(Math.random() * (10000 - 8000 + 1))
      let cwNum2 = Math.floor(Math.random() * (10000 - 3000 + 1))
      let cwNum3 = Math.floor(Math.random() * (10000 - 2000 + 1))
      let cwNum4 = Math.floor(Math.random() * (100 - 10 + 1))
      var arr3 = []
      var arr4 = []
      for (let i = 1; i <= 4; i++) {
        arr.push(Math.floor(Math.random() * (1000 - 500 + 1)))
        arr1.push(Math.floor(Math.random() * (800 - 300 + 1)))
        arr2.push(Math.floor(Math.random() * (1000 - 300 + 1)))
      }
      for (let i = 1; i <= 12; i++) {
        ll1.push(Math.floor(Math.random() * (1000 - 300 + 1)))
        ll2.push(Math.floor(Math.random() * (1000 - 300 + 1)))
      }
      for (let i = 1; i <= 8; i++) {
        arr3.push(Math.floor(Math.random() * (100 - 20 + 1)))
        arr4.push(Math.floor(Math.random() * (100 - 20 + 1)))
      }
      this.$store.commit('zgsObj', {
        name: value,
        // 子公司驾驶舱人事标签
        rsData: [arr, arr1, arr2],
        // 子公司驾驶舱财务标签
        cwData: [{ value: cwNum, name: '实业' }, { value: cwNum1, name: '物业' }, { value: cwNum2, name: '餐饮' }, { value: cwNum3, name: '酒店' }, { value: cwNum4, name: '汽服' }],
        // 子公司驾驶舱党建标签
        djData: {
          data: ll1,
          data1: ll2,
          dyNum: Math.floor(Math.random() * (1000 - 500 + 1)),
          dyLeiDa: [{ name: '男', value: arr3 }, { name: '女', value: arr4 },
          ]
        },
        // 子公司驾驶舱服务标签
        fwData: {
          dyNum: Math.floor(Math.random() * (1000 - 500 + 1)),
          fwData: arr3
        }
      })
      // this.$router.push({
      //   path: '/threeMenuIndex',
      //   query: {
      //     bkName: this.selectValue
      //   }
      // })
    },
    onRou (item) {
    },
    onChange (checked) {
      this.$store.commit('switchKG', checked)
    },
    onChangeMenu () {
      this.menuShow = !this.menuShow
      this.$store.commit('menuKG', this.menuShow)
    },
    // 关闭按钮
    onGb () {
      let self = this
      this.$confirm({
        title: '确认退出登录吗?',
        okText: '确定',
        cancelText: '取消',
        onOk () {
          setTimeout(() => {
            removerToken()
            self.$router.push('/')
            self.$store.dispatch('delUserAction')
            resetRouter()
          }, 1000)
        },
        onCancel () { },
      })

    },
    onBack () {
      if (this.rouPath === '/FwDetail') {
        // this.$router.push('/fw-primaryIndex')
        this.$router.push({
          path: '/fw-primaryIndex'
        })
      } else if (this.rouPath === '/threeMenuIndex') {
        this.ejDisabled = false
        this.selectValue1 = '--'
        this.$router.push({
          path: this.p2
        })
      } else if (this.rouPath === '/secondaryIndex') {
        this.selectValue = '板块'
        this.gsData = []
        this.$router.push({
          path: this.p1
        })
      } else if (this.butShow == true) {
        this.$router.push({
          path: '/jsc'
        })
      }
    }
  }
};
</script>

<style scoped lang="scss">
.base-menu:not(.ant-menu-inline-collapsed) {
  .ant-menu-submenu-popup {
    display: none;
  }
}
.item {
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px !important;
  // -webkit-transform: scale(0.5);
  margin-top: 15px;
  margin-left: 5px;
  border: 2px solid #235f66;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  text-align: center;
  line-height: 25px;
  width: 55px;
  height: 25px;
  &:hover {
    color: #eee;
    background-color: #0b5e68;
  }
}
.home {
  width: 100%;
  height: 100%;
  .con {
    width: 100%;
    height: 100%;
  }
}
.menu {
  height: 100%;
}
.menuHead {
  text-align: center;
  background-image: url("../assets/images/bj2.png");
  background-size: 100% 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  .trigger {
    color: deepskyblue;
  }
  .head-font {
    font-size: 24px;
    padding: 0px 10px;
    display: flex;
    /*color: white;*/
    color: white;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    /*background-color: #00043A;*/
  }
}
/deep/.ant-layout-header {
  height: 70px;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
/deep/ .ant-select-selection--single {
  position: relative;
  height: 32px;
  cursor: pointer;
  background: #001529;
}
/deep/ .ant-layout-header {
  height: 64px;
  padding: 0 0px;
  line-height: 64px;
  background: #001529;
}
/deep/ #components-layout-demo-custom-trigger .trigger[data-v-7e6c9408] {
  font-size: 18px;
  line-height: 64px;
  padding: 0px 5px;
  cursor: pointer;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
}
</style>
