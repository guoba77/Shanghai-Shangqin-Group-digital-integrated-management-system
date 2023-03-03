<template>
  <div class="cwsj">
    <div class="head">
      <div>
        公司名称：<a-input
          style="width: 200px"
          v-model="companyName"
          placeholder="回车搜索"
          @keyup.enter="serach"
        ></a-input>
        分类名称：<a-input
          style="width: 200px"
          v-model="speciesTypeName"
          placeholder="回车搜索"
          @keyup.enter="serach"
        ></a-input>
        时间：<a-range-picker
          :placeholder="['开始日期', '结束日期']"
          @change="onChange"
          allowClear
        />
      </div>
      <div>
        <a-button type="primary" @click="openAdd(0)"> 新增 </a-button>
      </div>
    </div>
    <div class="table-body">
      <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
      <a-table
        :row-key="(record) => record.id"
        :pagination="paginationOther"
        :data-source="dataThis"
        @change="handleChange"
      >
        <a-table-column
          width="300px"
          align="center"
          key="companyName"
          title="所属公司"
          data-index="companyName"
        ></a-table-column>
        <a-table-column
          align="center"
          key="speciesTypeName"
          title="车辆种类"
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
    <SubCarAdd
      ref="add"
      @resetModalVisible="resetModalVisible"
      :modalVisible="modalVisible"
      :code="code"
    ></SubCarAdd>
  </div>
</template>

<script>
import { getSubsidiaryData, delSubsidiaryData } from '@/api/api.js'
import SubCarAdd from './components//SubCarAdd.vue'
export default {
  name: "cw",
  components: {
    SubCarAdd
  },
  data() {
    return {
      updateStartTime: '',
      updateEndTime: '',
      companyName: '',
      speciesTypeName: '',
      code: 0,
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
  created() {
    this.getSubsidiaryList()
  },
  methods: {
    onChange(date, dateString) {
      this.updateStartTime = dateString[0] ? dateString[0] : null
      this.updateEndTime = dateString[1] ? dateString[1] : null
      this.serach()
    },
    // 查询
    serach() {
      this.paginationOther.current = 1
      this.getSubsidiaryList()
    },

    // 关闭弹框
    resetModalVisible() {
      this.modalVisible = false
    },
    // 打开新增弹框
    openAdd(code) {
      this.modalVisible = true
      this.code = 0
    },
    // 页码改变
    handleChange(current) {
      this.paginationOther.current = current.current
      this.paginationOther.pageSize = current.pageSize
      this.getSubsidiaryList()
    },
    // 获取子公司列表数据
    async getSubsidiaryList() {
      const res = await getSubsidiaryData({
        pageNum: this.paginationOther.current,
        pageSize: this.paginationOther.pageSize,
        speciesType: 1,
        companyName: this.companyName,
        speciesTypeName: this.speciesTypeName,
        updateStartTime: this.updateStartTime,
        updateEndTime: this.updateEndTime
      })
      if (res.data.code === 0) {
        this.dataThis = res.data.data.list
        this.paginationOther.total = res.data.data.total
      }
    },
    handleEdit(code, record) {
      this.code = code
      this.modalVisible = true
      this.$refs.add.getDtail(record.id)
    },
    // 删除
    async removeLineRecordById(record) {
      await delSubsidiaryData(record.id)
      if (this.dataThis.length === 1 && this.paginationOther.current > 1) {
        this.paginationOther.current--
      }
      this.$message.success('删除成功')
      this.getSubsidiaryList()
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
