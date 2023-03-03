<template>
  <div class="FwDetail">
    <div class="top">
      <!-- <Depart></Depart> -->
      <div class="title">
        <div class="text">物业管理板块</div>
        <div class="cld">
          <div
            class="item"
            @click="toDetail('上海上勤高级楼宇管理有限公司', 1)"
          >
            上海上勤高级楼宇管理有限公司
          </div>
          <div class="item" @click="toDetail('上海上勤物业管理有限公司', 1)">
            上海上勤物业管理有限公司
          </div>
        </div>
      </div>
      <div class="title">
        <div class="text">餐饮服务板块</div>
        <div class="cld">
          <div class="item" @click="toDetail('上海上勤餐饮管理有限公司', 1)">
            上海上勤餐饮管理有限公司
          </div>
          <div></div>
        </div>
      </div>
      <div class="title">
        <div class="text">汽车服务板块</div>
        <div class="cld">
          <div class="item" @click="toDetail('上海锦勤汽车服务有限公司', 1)">
            上海锦勤汽车服务有限公司
          </div>
          <div></div>
        </div>
      </div>
      <div class="title">
        <div class="text">酒店管理板块</div>
        <div class="cld">
          <div class="item" @click="toDetail('上海上勤酒店管理有限公司', 2)">
            上海上勤酒店管理有限公司
          </div>
          <div
            class="item"
            @click="toDetail('上海上勤景苑酒店管理有限公司', 2)"
          >
            上海上勤景苑酒店管理有限公司
          </div>
        </div>
      </div>
      <div class="title">
        <div class="text">资产管理板块</div>
        <div class="cld">
          <div class="item" @click="toDetail('上海上勤资产管理有限公司', 3)">
            上海上勤资产管理有限公司
          </div>
          <div class="item" @click="toDetail('上海名人苑实业有限公司', 3)">
            上海名人苑实业有限公司
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="det">
        <div
          v-if="type === 1"
          :style="{
            margin: '10px',
            fontSize: '20px',
            color: 'white',
            fontWeight: '700',
          }"
        >
          {{ text }}服务点总数： {{ toatal }}
        </div>
        <div
          v-else-if="type === 3"
          :style="{
            margin: '10px',
            fontSize: '20px',
            color: 'white',
            fontWeight: '700',
          }"
        >
          {{ text }}租赁点总数： {{ toatal }}
        </div>
        <div
          v-else-if="type === 2"
          :style="{
            margin: '10px',
            fontSize: '20px',
            color: 'white',
            fontWeight: '700',
          }"
        >
          {{ text }}二级公司数： {{ toatal }}
        </div>
        <div
          v-if="type === 2"
          :style="{
            margin: '0 auto',
            width: '90%',
            height: '85%',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
          }"
        >
          <div
            class="detData"
            v-for="(item, index) in detData"
            @click="getTable(item.name)"
            :key="index"
          >
            <div class="text">{{ item.name }}</div>
            <div class="text">{{ item.value }}</div>
          </div>
        </div>
        <div
          v-else
          :style="{
            margin: '0 auto',
            width: '90%',
            height: '85%',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
          }"
        >
          <div
            class="detData"
            v-for="(item, index) in detData"
            @click="getTable(item.regionName)"
            :key="index"
          >
            <div class="text">{{ item.regionName }}</div>
            <div class="text">{{ item.num }}</div>
          </div>
        </div>
      </div>
      <div class="table" ref="element">
        <a-table
          v-if="type === 1"
          :row-key="(record) => record.id"
          :data-source="one"
          :scroll="{ y: height }"
          :pagination="false"
        >
          <!-- <a-table-column
            align="center"
            key="a1"
            title="项目名称"
            data-index="a1"
          >
            <template slot-scope="text, record">
              <div :title="text" class="ellipsis">{{ text }}</div>
            </template>
          </a-table-column> -->
          <a-table-column
            class="address"
            align="center"
            key="entryName"
            title="项目名称"
            width="180px"
            data-index="entryName"
          >
            <template slot-scope="text, record">
              <div :title="text" class="ellipsis">{{ text }}</div>
            </template>
          </a-table-column>
          <a-table-column
            class="address"
            align="center"
            key="address"
            title="地址"
            width="180px"
            data-index="address"
          >
            <template slot-scope="text, record">
              <div :title="text" class="ellipsis">{{ text }}</div>
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            key="floorage"
            title="建筑面积"
            data-index="floorage"
          >
          </a-table-column>
          <a-table-column
            align="center"
            key="responsiblePerson"
            title="负责人"
            data-index="responsiblePerson"
          >
          </a-table-column>
          <a-table-column
            align="center"
            key="proprietor"
            title="业主/服务人数"
            data-index="proprietor"
          >
          </a-table-column>
          <a-table-column
            align="center"
            key="businessTypeName"
            title="业主类型"
            data-index="businessTypeName"
          >
          </a-table-column>
          <a-table-column
            align="center"
            key="regionName"
            title="所属区域"
            data-index="regionName"
          >
          </a-table-column>
        </a-table>
        <a-table
          v-else-if="type === 3"
          :row-key="(record) => record.id"
          :data-source="two"
          :scroll="{ y: height }"
          :pagination="false"
        >
          <a-table-column
            align="center"
            key="companyName"
            title="所属公司"
            data-index="companyName"
          ></a-table-column>
          <a-table-column
            align="center"
            key="regionName"
            title="区"
            data-index="regionName"
          ></a-table-column>
          <a-table-column
            align="center"
            key="address"
            title="地址"
            data-index="address"
            width="180px"
          >
            <template slot-scope="text, record">
              <div :title="text" class="ellipsis">{{ text }}</div>
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            key="area"
            title="面积"
            data-index="area"
          ></a-table-column>
          <a-table-column
            align="center"
            key="assetTypeName"
            title="租赁类型"
            data-index="assetTypeName"
          ></a-table-column>

          <a-table-column
            align="center"
            key="rentable"
            title="可出租"
            data-index="rentable"
          ></a-table-column>
          <a-table-column
            align="center"
            key="rented"
            title="已出租"
            data-index="rented"
          ></a-table-column>
        </a-table>
        <a-table
          v-if="type === 2"
          :row-key="(record) => record.id"
          :pagination="false"
          :data-source="three"
          @change="handleChange"
        >
          <a-table-column
            align="center"
            key="speciesTypeName"
            title="房间种类"
            data-index="speciesTypeName"
          ></a-table-column>
          <a-table-column
            align="center"
            key="num"
            title="数量"
            data-index="num"
          ></a-table-column>

          <a-table-column
            align="center"
            key="status"
            title="状态"
            data-index="status"
          ></a-table-column>
          <a-table-column
            align="center"
            key="updateTime"
            title="时间"
            data-index="updateTime"
          ></a-table-column>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>

import { getEachFwDetail, getfwList, getEachzlDtail, getzlList, selectBySubsidiaryNum, selectBlocCarList } from '@/api/api.js'
export default {
  name: 'FwDetail',
  data () {
    return {
      height: null,
      one: [],
      two: [],
      three: [],
      detData: [],
      toatal: null,
      type: null,
      dataList: [

      ],
      dataList2: [
        {
          area: '虹口区',
          data: [
            {
              a1: '广凉苑',
              a2: '虹口区凉城路210弄',
              a3: '2.52',
              a4: '王磊',
              a5: '861',
              a6: '企业',
              a7: '虹口区'
            }
          ]
        },
        {
          area: '黄浦区',
          data: [
            {
              a1: '人民大厦',
              a2: '黄浦区人民大道200号',
              a3: '8.79',
              a4: '吴斌',
              a5: '1900',
              a6: '政府机关',
              a7: '黄浦区'
            }, {
              a1: '人民大厦西车库及连通道',
              a2: '黄浦区人民大道200号',
              a3: '0.84',
              a4: '吴斌',
              a5: '1900',
              a6: '政府机关',
              a7: '黄浦区'
            }, {
              a1: '人民大厦北车库',
              a2: '黄浦区人民大道200号',
              a3: '0.84',
              a4: '吴斌',
              a5: '1900',
              a6: '政府机关',
              a7: '黄浦区'
            }, {
              a1: '信访接待大厅',
              a2: '黄浦区人民大道150号',
              a3: '0.12',
              a4: '吴斌',
              a5: '1900',
              a6: '政府机关',
              a7: '黄浦区'
            }, {
              a1: '市政大厦',
              a2: '黄浦区大沽路100号',
              a3: '7.38',
              a4: '吴斌',
              a5: '2500',
              a6: '政府机关',
              a7: '黄浦区'
            }, {
              a1: '人民广场停车库',
              a2: '黄浦区黄陂北路100号',
              a3: '2.6',
              a4: '方士侠',
              a5: '780',
              a6: '政府机关',
              a7: '黄浦区'
            }, {
              a1: '上海市社会科学界联合会',
              a2: '黄浦区淮海中路622弄7号乙',
              a3: '0.36',
              a4: '刘敏敏',
              a5: '95',
              a6: '事业单位',
              a7: '黄浦区'
            }, {
              a1: '上海市社会科学界联合会',
              a2: '黄浦区淮海中路622弄7号乙',
              a3: '0.36',
              a4: '刘敏敏',
              a5: '95',
              a6: '事业单位',
              a7: '黄浦区'
            }
          ]
        },
        {
          area: '静安区',
          data: [
            {
              a1: '民主党派大厦',
              a2: '静安区陕西北路128号',
              a3: '1.76',
              a4: '王海飞',
              a5: '423',
              a6: '政府机关',
              a7: '静安区'
            },
            {
              a1: '上海市人民政府外事办公室',
              a2: '静安区南京西路1418号',
              a3: '0.64',
              a4: '孔德一',
              a5: '185',
              a6: '政府机关',
              a7: '静安区'
            },
            {
              a1: '上海市大数据中心',
              a2: '静安区寿阳路99弄15号',
              a3: '0.62',
              a4: '朱祺逸',
              a5: '105',
              a6: '事业单位',
              a7: '静安区'
            }
          ]
        },
        {
          area: '闵行区',
          data: [
            {
              a1: '莘庄工业区管委会',
              a2: '闵行区金都路3688号',
              a3: '2.87',
              a4: '潘安',
              a5: '260',
              a6: '政府机关',
              a7: '闵行区'
            },
            {
              a1: '上海市统计资料管理中心',
              a2: '闵行区凯城路199号',
              a3: '0.79',
              a4: '',
              a5: '40',
              a6: '政府机关',
              a7: '闵行区'
            }
          ]
        },
        {
          area: '浦东新区',
          data: [
            {
              a1: '市级机关浦东集中办公点',
              a2: '浦东新区世博村路300号',
              a3: '14.16',
              a4: '陈丽',
              a5: '3400',
              a6: '事业单位',
              a7: '浦东新区'
            },
            {
              a1: '上海市电子政务灾难备份中心',
              a2: '浦东新区亮景路36号',
              a3: '1.27',
              a4: '徐庆平',
              a5: '4',
              a6: '事业单位',
              a7: '浦东新区'
            }
          ]
        },
        {
          area: '普陀区',
          data: [
            {
              a1: '西乡路188号',
              a2: '普陀区西乡路188号',
              a3: '1.03',
              a4: '石方林',
              a5: '170',
              a6: '政府机关',
              a7: '普陀区'
            }
          ]
        },
        {
          area: '青浦区',
          data: [
            {
              a1: '市委党校（淀山湖校区）',
              a2: '青浦区朱家角镇绿湖路301弄 18号',
              a3: '1.27',
              a4: '张云',
              a5: '10',
              a6: '科研院校',
              a7: '青浦区'
            }
          ]
        },
        {
          area: '徐汇区',
          data: [
            {
              a1: '高安路19号',
              a2: '徐汇区高安路19号',
              a3: '2.17',
              a4: '局文婷',
              a5: '750',
              a6: '政府机关',
              a7: '徐汇区'
            },
            {
              a1: '高安路17号',
              a2: '徐汇区高安路17号',
              a3: '0.52',
              a4: '局文婷',
              a5: '750',
              a6: '政府机关',
              a7: '徐汇区'
            },
            {
              a1: '高安路25号',
              a2: '徐汇区高安路25号',
              a3: '0.15',
              a4: '局文婷',
              a5: '750',
              a6: '政府机关',
              a7: '徐汇区'
            },
            {
              a1: '中共上海市委党史研究室',
              a2: '徐汇区康平路141号',
              a3: '0.23',
              a4: '局文婷',
              a5: '50',
              a6: '政府机关',
              a7: '徐汇区'
            },
            {
              a1: '市纪委监察委',
              a2: '徐汇区宛平路7号',
              a3: '1.45',
              a4: '肖珏昊',
              a5: '400',
              a6: '政府机关',
              a7: '徐汇区'
            },
            {
              a1: '清风苑',
              a2: '徐汇区漕宝路440号',
              a3: '1.70',
              a4: '曹晓平',
              a5: '10',
              a6: '事业单位',
              a7: '徐汇区'
            },
            {
              a1: '市委统战部',
              a2: '徐汇区复兴西路46号',
              a3: '1.10',
              a4: '马卫军',
              a5: '137',
              a6: '政府机关',
              a7: '徐汇区'
            },
            {
              a1: '市市场监督管理局',
              a2: '徐汇区柳州路615号',
              a3: '1.07',
              a4: '韩永纯',
              a5: '450',
              a6: '政府机关',
              a7: '徐汇区'
            },
            {
              a1: '市委党校（总校）',
              a2: '徐汇区虹漕南路200号',
              a3: '3.93',
              a4: '张屹蝶',
              a5: '400',
              a6: '科研院校',
              a7: '徐汇区'
            },
            {
              a1: '市委党校（123校区）',
              a2: '徐汇区虹漕南路123号',
              a3: '1.16',
              a4: '叶云',
              a5: '400',
              a6: '科研院校',
              a7: '徐汇区'
            },
            {
              a1: '市委党校（梅陇校区）',
              a2: '徐汇区梅陇路161号',
              a3: '4.34',
              a4: '黄国其',
              a5: '40',
              a6: '科研院校',
              a7: '徐汇区'
            },
            {
              a1: '工商大厦',
              a2: '徐汇区肇嘉浜路301号',
              a3: '4.15',
              a4: '',
              a5: '380',
              a6: '企业',
              a7: '徐汇区'
            },
            {
              a1: '市市场监督管理局执法总队',
              a2: '徐汇区斜土路2598号',
              a3: '0.4',
              a4: '',
              a5: '140',
              a6: '政府机关',
              a7: '徐汇区'
            }
          ]
        },
        {
          area: '长宁区',
          data: [
            {
              a1: '415改建工程',
              a2: '长宁区虹桥路1501号',
              a3: '4.3',
              a4: '谢伟',
              a5: '26',
              a6: '政府机关',
              a7: '长宁区'
            },
            {
              a1: '中科院上海硅酸盐研究所',
              a2: '长宁区定西路1295号',
              a3: '4.18',
              a4: '朱未',
              a5: '200',
              a6: '科研院校',
              a7: '长宁区'
            },
            {
              a1: '富宁大厦',
              a2: '长宁区幸福路137号',
              a3: '0.83',
              a4: '邵慧勇',
              a5: '200',
              a6: '事业单位',
              a7: '长宁区'
            },
            {
              a1: '申新花苑',
              a2: '长宁区新华路64弄',
              a3: '3.29',
              a4: '张文豪',
              a5: '573',
              a6: '企业',
              a7: '长宁区'
            }
          ]
        }
      ],

      // detShow: false,
      // gsData:[{}]
      text: '',
      // dataList: [
      //   // { name:}
      // ]
    }
  },
  // updated() {
  //   this.detData = []
  //   this.toatal = null
  // },
  watch: {
    $route (val, oldVal) {
      this.detData = []
      this.one = []
      this.two = []
      this.three = []
      this.toatal = null
      this.text = ''
    }
  },

  mounted () {
    window.addEventListener("resize", () => {
      this.$nextTick(() => {
        this.height = this.$refs.element.offsetHeight
        const height2 = document.querySelector('.ant-table-thead tr').style.height
      })
    })
  },
  methods: {
    // 获取表格数据
    async getTable (Parea) {
      this.$nextTick(() => {
        this.height = this.$refs.element.offsetHeight
      })
      if (this.type === 1) {
        const res = await getfwList({
          companyFullName: this.text,
          regionName: Parea
        })
        this.one = res.data.data.list
      } else if (this.type === 3) {
        const res = await getzlList({
          companyFullName: this.text,
          regionName: Parea
        })
        this.two = res.data.data.list
      } else if (this.type === 2) {
        const res = await selectBlocCarList({
          subsidiaryName: Parea
        })
        this.three = res.data.data.list
      }
    },
    // 获取地区服务点数量
    async toDetail (name, type) {
      this.type = type
      this.toatal = null
      this.one = []
      this.two = []
      this.three = []
      this.text = name
      if (type === 1) {
        const res = await getEachFwDetail(name)
        this.toatal = res.data.data.totalNum
        this.detData = res.data.data.list
      }
      if (type === 2) {
        const res = await selectBySubsidiaryNum(name)
        this.toatal = res.data.data.totalNum
        this.detData = res.data.data.list
      }
      if (type === 3) {
        const res = await getEachzlDtail(name)
        this.toatal = res.data.data.totalNum
        this.detData = res.data.data.list
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  text-align: center;
}
.FwDetail {
  width: 100%;
  height: 100%;
  // background-size: 100% 100%;
  background: url("../../../assets/images/bj4.png") no-repeat;
  background-size: cover;
  padding: 2%;
  .top {
    width: 100%;
    height: 35%;
    display: flex;
    justify-content: space-between;
    // margin-bottom: 2%;
    .title {
      border-radius: 10px;
      width: 18%;
      height: 100%;
      // margin: 10px;
      border: 2px solid #4ccad9;
      .text {
        text-align: center;
        color: white;
        font-weight: bold;
        line-height: 60px;
        font-size: 26px;
        border: none;
      }
      .cld {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: calc(100% - 60px);
        // background-color: skyblue;
        padding: 0 20px;
        .item {
          border-radius: 5px;
          color: #fff;
          border: 2px solid #4ccad9;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          line-height: 70px;
          width: 100%;
          height: 35%;
          // background-color: pink;
          cursor: pointer;
          &:hover {
            border: 2px solid #ade3eb;
            // color: #aaa;
          }
        }
      }
    }
  }
  .bottom {
    display: flex;
    // justify-content: space-between;
    // position: absolute;
    // top: 200px;
    // width: 1000px;
    // margin: 0 auto;
    width: 100%;
    height: 57%;
    margin-top: 2%;
    // background-color: #4ccad9;

    .det {
      border-radius: 5px;
      // height: 90%;
      width: 35%;
      border: 2px solid #4ccad9;
      margin-right: 3%;
      // background-color: pink;
      .detData {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        width: 40%;
        height: 40px;
        // border-top: 1px solid #4ccad9;
        // border-bottom: 1px solid #4ccad9;
        padding: 0 10px;
        border: 1px solid #4ccad9;
        &:hover {
          border: 1px solid #ade3eb;
          // color: #aaa;
        }
        .text {
          line-height: 100%;
          display: flex;
          align-items: center;
          // display: table-cell;
          // vertical-align: middle;
          height: 100%;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .table {
      border-radius: 5px;
      width: 62%;
      height: 100%;
      border: 2px solid #4ccad9;
      // background-color: seagreen;
    }
  }
}
/deep/ .ant-table-wrapper {
  position: relative;
  height: 100%;
  .ant-spin-nested-loading {
    height: 100%;
    text-align: right;
    .ant-spin-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      .ant-table {
        flex: 1;
        overflow: hidden;
      }
      .ant-table-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        .ant-table-body {
          flex: 1;
          overflow: auto !important;
        }
      }
    }
  }
}
/deep/ .ant-table-placeholder {
  background-color: transparent;
  color: #fff;
}
/deep/ .ant-empty-description {
  color: white;
}
/deep/ .ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  background-color: transparent;
  color: #4ccad9 !important;
  font-size: 18px;
  font-weight: bold;
}
/deep/ .ant-table-thead {
  height: 64px;
}
/deep/ .ant-table-tbody > tr > td {
  color: white;
}
/deep/
  .ant-table-tbody
  > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
  > td {
  // background: #fff;
  color: black;
}
/deep/ .ant-table-fixed-header .ant-table-scroll .ant-table-header {
  overflow: hidden;
  // opacity: 0;
  background-color: transparent;
}

/deep/ .ant-table-tbody > tr {
  background-color: transparent;
}
/deep/
  .ant-table-fixed-header
  > .ant-table-content
  > .ant-table-scroll
  > .ant-table-body {
  background: transparent;
}

/deep/ .ant-table > .ant-table-content > .ant-table-scroll > .ant-table-header {
  margin-bottom: 0px !important;
  padding-bottom: 0px !important;
  min-width: 17px !important;
  overflow: hidden !important;
}
// 滚动条背景颜色
/deep/ .ant-table-body::-webkit-scrollbar,
.info::-webkit-scrollbar {
  height: 9px;
  width: 9px;
  background-color: #3498db7e;
}

// 滚动条颜色
/deep/ .ant-table-body::-webkit-scrollbar-thumb,
.info::-webkit-scrollbar-thumb {
  border-radius: 9px;
  background-color: #3498db;
}
</style>