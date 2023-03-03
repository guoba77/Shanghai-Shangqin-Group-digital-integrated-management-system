<template>
  <div class="cwsj">
    <div class="head">
      <div>
        公司名：<a-input
          style="width: 200px"
          v-model="companyName"
          placeholder="回车键搜索"
          @keyup.enter="serach"
          allowClear
        />
        区域:<a-input
          style="width: 200px"
          v-model="regionName"
          placeholder="回车键搜索"
          @keyup.enter="serach"
          allowClear
        />
      </div>
      <div>
        <a-button type="primary" @click="openAdd(1)"> 新增 </a-button>
        <a-button type="primary"> 下载 </a-button>
      </div>
    </div>
    <div class="table-body">
      <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
      <a-table
        @change="handleTableChange"
        :row-key="(record) => record.id"
        :pagination="paginationOther"
        :data-source="dataThis"
      >
        <a-table-column
          align="center"
          key="regionName"
          title="区域"
          data-index="regionName"
        ></a-table-column>
        <a-table-column
          align="center"
          key="updateTime"
          title="更新时间"
          data-index="updateTime"
        ></a-table-column>
        <a-table-column
          align="center"
          key="business"
          title="商业"
          data-index="business"
        ></a-table-column>
        <a-table-column
          align="center"
          key="work"
          title="办公"
          data-index="work"
        ></a-table-column>
        <a-table-column
          align="center"
          key="apartment"
          title="公寓"
          data-index="apartment"
        ></a-table-column>
        <a-table-column
          align="center"
          key="parkingLot"
          title="车位"
          data-index="parkingLot"
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
        <a-table-column
          align="center"
          key="rate"
          title="出租率"
          data-index="rate"
        ></a-table-column>
        <a-table-column
          align="center"
          key="companyName"
          title="所属公司"
          data-index="companyName"
        ></a-table-column>
        <a-table-column
          align="center"
          key="collectionRate"
          title="收缴率"
          data-index="collectionRate"
        ></a-table-column>
        <a-table-column
          align="center"
          key="leaseNum"
          title="租赁点数量"
          data-index="leaseNum"
        ></a-table-column>
        <a-table-column align="center" width="150px" key="action" title="操作">
          <template slot-scope="text, record">
            <a-divider type="vertical" />
            <a title="修改" @click="handleEdit(2, record)"
              ><a-icon type="form" />
            </a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确认删除该记录吗?"
              ok-text="是"
              cancel-text="否"
              @confirm="removeLineRecordById(record)"
            >
              <a title="删除" :style="{ color: '#f62f2f' }"
                ><a-icon type="delete"
              /></a>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <QyAdd
      ref="add"
      :code="code"
      @resetModalVisible="resetModalVisible"
      :modalVisible="modalVisible"
    ></QyAdd>
  </div>
</template>

<script>
import { getQyData, DelQyData } from '@/api/api.js'
import QyAdd from './components/qyAdd.vue'
export default {
  name: "cw",
  components: {
    QyAdd
  },
  data () {
    return {
      companyName: '',
      regionName: '',
      code: null,
      modalVisible: false,
      selectedRowKeys: [],
      dataThis: [
      ],
      paginationOther: {
        pageSize: 10,
        total: 0,
        current: 1
      },
    }
  },
  activated () {
    this.getDataList()
  },
  created () {
    this.getDataList()
  },
  methods: {
    // 查询
    serach () {
      this.paginationOther.current = 1
      this.getDataList()
    },
    // 关闭弹框
    resetModalVisible () {
      this.modalVisible = false
    },
    // 打开新增修改弹框
    openAdd (code) {
      this.code = code
      this.modalVisible = true
    },
    // 表格分页
    handleTableChange (current) {
      this.paginationOther.current = current.current
      this.paginationOther.pageSize = current.pageSize
      this.getDataList()
    },
    async getDataList () {
      const res = await getQyData({
        companyName: this.companyName,
        regionName: this.regionName,
        pageSize: this.paginationOther.pageSize,
        pageNum: this.paginationOther.current
      })
      if (res.data.code === 0) {
        this.dataThis = res.data.data.list
        this.paginationOther.total = res.data.data.total
      }
    },
    handleEdit (code, record) {
      this.code = code
      this.modalVisible = true
      this.$refs.add.getDtail(record.id)
    },
    // 删除
    async removeLineRecordById (record) {
      await DelQyData(record.id)
      this.$message.success('删除成功')
      this.getDataList()
    }
  }
}
</script>

<style scoped>
.cwsj {
  height: 100%;
  padding: 15px;
  background: white;
}
.head {
  padding-bottom: 25px;
  display: flex;
  justify-content: space-between;
}
.table-body {
  border: 1px solid #e8e8e8;
}
</style>
