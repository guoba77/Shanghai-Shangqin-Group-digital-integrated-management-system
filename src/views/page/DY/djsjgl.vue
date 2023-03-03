<template>
  <div class="clzc">
    <div class="head">
      <div>
        公司名称：<a-input
          v-model="companyName"
          style="width: 200px"
          placeholder="回车键搜索"
          @keyup.enter="serach"
          allowClear
        />
        党组织名称：<a-input
          v-model="organizationName"
          style="width: 200px"
          placeholder="回车键搜索"
          @keyup.enter="serach"
          allowClear
        />
      </div>
      <div>
        <a-button type="primary" @click="openAdd(1)"> 新增 </a-button>
      </div>
    </div>
    <div class="table-body">
      <a-table
        @change="handleTableChange"
        :row-key="(record) => record.situationId"
        :pagination="paginationOther"
        :data-source="dataThis"
      >
        <a-table-column
          width="200px"
          align="center"
          key="companyName"
          title="公司名称"
          data-index="companyName"
        ></a-table-column>
        <a-table-column
          align="center"
          key="organizationName"
          title="支部名称"
          data-index="organizationName"
        ></a-table-column>
        <a-table-column
          align="center"
          key="onJobNumber"
          title="在职党员"
          data-index="onJobNumber"
        ></a-table-column>
        <a-table-column
          align="center"
          key="retireNumber"
          title="退休党员数"
          data-index="retireNumber"
        ></a-table-column>
        <a-table-column
          align="center"
          key="statisticsTime"
          title="时间"
          data-index="statisticsTime"
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
    <AddPeoDev
      ref="add"
      @resetModalVisible="resetModalVisible"
      :modalVisible="modalVisible"
      :code="code"
    ></AddPeoDev>
  </div>
</template>

<script>
import { getPMDevData, selectCertificateList, DelPMDevData } from '@/api/api.js'
import AddPeoDev from './components//AddPeoDev.vue'
export default {
  name: "cw",
  components: {
    AddPeoDev
  },
  data () {
    return {
      companyName: '',
      organizationName: '',
      modalVisible: false,
      code: null,
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
    this.getPMDevList()
  },
  created () {
    this.getPMDevList()
  },
  methods: {
    // 查询
    serach () {
      this.paginationOther.current = 1
      this.getPMDevList()
    },
    openAdd (code) {
      this.code = code
      this.modalVisible = true
    },
    // 关闭新增窗口
    resetModalVisible () {
      this.modalVisible = false
    },
    // 表格分页
    handleTableChange (current) {
      this.paginationOther.current = current.current
      this.paginationOther.pageSize = current.pageSize
      this.getPMDevList()
    },
    // 获取党员发展列表
    async getPMDevList () {
      const res = await getPMDevData({
        companyName: this.companyName,
        organizationName: this.organizationName,
        pageNum: this.paginationOther.current,
        pageSize: this.paginationOther.pageSize
      })
      if (res.data.code === 0) {
        this.dataThis = res.data.data.list
        this.paginationOther.total = res.data.data.total
      }
    },
    handleEdit (code, record) {
      this.modalVisible = true,
        this.code = code
      this.$refs.add.getDtail(record.situationId)
    },
    async removeLineRecordById (record) {
      await DelPMDevData(record.situationId)
      this.$message.success('删除成功')
      this.getPMDevList()
    }
  }
}
</script>

<style scoped>
.clzc {
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
