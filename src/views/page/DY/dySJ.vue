<template>
  <div class="cwsj">
    <div class="head">
      <div>
        公司名称：<a-input
          v-model="companyName"
          style="width: 200px"
          placeholder="回车键搜索"
          @keyup.enter="serach"
          allowClear
        />
        支部名称：<a-input
          v-model="organizationName"
          style="width: 200px"
          placeholder="回车键搜索"
          @keyup.enter="serach"
          allowClear
        />
      </div>
    </div>
    <div class="table-body">
      <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
      <a-table
        :row-key="(record) => record.situationId"
        :pagination="paginationOther"
        :data-source="dataThis"
        @change="handleTableChange"
      >
        <a-table-column
          width="300px"
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
          title="在职党员数"
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
          title="统计时间"
          data-index="statisticsTime"
        ></a-table-column>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getDYdevelopment } from '@/api/api.js'
export default {
  name: "cw",
  data () {
    return {
      companyName: '',
      organizationName: '',
      selectedRowKeys: [],
      dataThis: [],
      paginationOther: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  activated () {
    this.getPeleDevelopment()
  },
  created () {
    this.getPeleDevelopment()
  },
  methods: {
    // 查询
    serach () {
      this.paginationOther.current = 1
      this.getPeleDevelopment()
    },
    //表格分页改变时触发
    handleTableChange (pagination, filters, sorter) {
      this.paginationOther.current = pagination.current
      this.paginationOther.pageSize = pagination.pageSize
      this.getPeleDevelopment()
    },
    // 获取分页党员发展情况
    async getPeleDevelopment () {
      const res = await getDYdevelopment({
        companyName: this.companyName,
        organizationName: this.organizationName,
        pageNum: this.paginationOther.current,
        pageSize: this.paginationOther.pageSize
      })
      if (res.data.code === 0) {
        const data = res.data.data.list
        this.dataThis = data
        this.paginationOther.total = res.data.data.total
      }
    },
    handleEdit (record) {

    },
    removeLineRecordById (record) {

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
