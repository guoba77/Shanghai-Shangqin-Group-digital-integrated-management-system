<template>
  <div class="cwsj">
    <div class="head">
      <div class="serach">
        公司名称：<a-input
          style="width: 200px"
          v-model="companyName"
          placeholder="回车键搜索"
          @keyup.enter="serach"
          allowClear
        />
        入职时间：
        <a-range-picker
          :placeholder="['开始日期', '结束日期']"
          @change="onChange"
          allowClear
        />
      </div>
      <div>
        <a-button type="primary" @click="openAdd(1)"> 新增 </a-button>
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
          key="companyName"
          title="公司名称"
          data-index="companyName"
        ></a-table-column>
        <a-table-column
          align="center"
          key="time"
          title="时间"
          data-index="time"
        ></a-table-column>
        <a-table-column
          align="center"
          key="receivable"
          title="应收"
          data-index="receivable"
        ></a-table-column>
        <a-table-column
          align="center"
          key="netReceipts"
          title="实收"
          data-index="netReceipts"
        ></a-table-column>
        <a-table-column
          align="center"
          key="rate"
          title="出租率"
          data-index="rate"
        ></a-table-column>
        <a-table-column
          align="center"
          key="collectionRate"
          title="收缴率"
          data-index="collectionRate"
        ></a-table-column>
        <a-table-column
          align="center"
          key="received"
          title="待收"
          data-index="received"
        ></a-table-column>
        <a-table-column align="center" width="150px" key="action" title="操作"
          >-->
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
    <RnAdd
      :code="code"
      ref="add"
      :modalVisible="modalVisible"
      @resetModalVisible="resetModalVisible"
    ></RnAdd>
  </div>
</template>

<script>
import RnAdd from './components/RnAdd.vue'
import { getRnData, DelRnData } from '@/api/api.js'
export default {
  name: "cw",
  components: {
    RnAdd
  },
  data () {
    return {

      startTime: null,
      endTime: null,
      companyName: '',
      code: null,
      modalVisible: false,
      selectedRowKeys: [],
      dataThis: [
      ],
      paginationOther: {
        current: 1,
        pageSize: 10,
        total: 0,
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
    // 日期change查询
    onChange (date, dateString) {
      this.startTime = dateString[0] ? dateString[0] : null
      this.endTime = dateString[1] ? dateString[1] : null
      this.paginationOther.current = 1
      this.getDataList()
    },
    // 关闭弹窗
    resetModalVisible () {
      this.modalVisible = false

    },
    // 打开新增窗口
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
    // 获取列表数据
    async getDataList (a) {
      const res = await getRnData({
        pageSize: this.paginationOther.pageSize,
        pageNum: this.paginationOther.current,
        companyName: this.companyName,
        startTime: this.startTime,
        endTime: this.endTime
      })
      if (res.data.code === 0) {
        this.dataThis = res.data.data.list
        this.paginationOther.total = res.data.data.total
      }
    },
    handleEdit (code, record) {
      this.code = code
      this.$refs.add.getDtail(record.id)
      this.modalVisible = true
    },
    async removeLineRecordById (record) {
      try {
        await DelRnData(record.id)
        this.$message.success('删除成功')
        this.getDataList()
      } catch (error) {
        console.log(error)
      }

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
