<template>
  <div class="cwsj">
    <div class="head">
      <div>
        子公司名：
        <a-select
          style="width: 180px"
          v-model="companyId"
          placeholder="请选择"
          @change="handleChange"
          allowClear
        >
          <a-select-option
            v-for="item in companyList"
            :key="item.companyId"
            allowClear
            >{{ item.name }}</a-select-option
          >
        </a-select>
        科目：
        <a-input
          @keyup.enter.native="handleChange"
          placeholder="回车键搜索"
          style="width: 180px"
          v-model="subject"
          allowClear
        >
          <a-select-option v-for="item in kmList" :key="item.name">{{
            item.name
          }}</a-select-option>
        </a-input>
        统计时间：<a-range-picker
          :placeholder="['开始日期', '结束日期']"
          @change="onChange"
          allowClear
        />
      </div>
      <div>
        <a-button type="primary" @click="onAdd"> 新增 </a-button>
        <a-upload
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :customRequest="onImport"
          :showUploadList="false"
        >
          <a-button type="primary" :loading="bLoading" :disabled="disabled">
            {{ bLoading ? "导入中..." : "导入" }}
          </a-button>
        </a-upload>
        <a-button type="primary" @click="onExport"> 导出 </a-button>
        <a-button type="primary">
          <a href="../../../../static/cwxzmb.xlsx" download="财务-财务信息"
            >下载模板</a
          >
        </a-button>
      </div>
    </div>
    <div class="table-body">
      <a-spin tip="导入中..." :spinning="Loading">
        <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
        <a-table
          :row-key="(record, index) => index"
          :pagination="paginationOther"
          :data-source="dataThis"
          @change="handleTableChange"
        >
          <!--        <a-table-column align="center" key="companyId" title="子公司ID" data-index="companyId"></a-table-column>-->
          <a-table-column
            align="center"
            key="companyName"
            title="子公司名"
            width="300px"
            data-index="companyName"
          ></a-table-column>
          <a-table-column
            align="center"
            key="subject"
            title="科目"
            data-index="subject"
          ></a-table-column>
          <a-table-column
            align="center"
            sorter="true"
            key="figure"
            title="金额(万元)"
            data-index="figure"
          ></a-table-column>
          <a-table-column
            align="center"
            sorter="true"
            key="statisticsTime"
            title="统计时间"
            data-index="statisticsTime"
          ></a-table-column>
          <a-table-column
            align="center"
            width="150px"
            key="action"
            title="操作"
          >
            <template slot-scope="text, record">
              <a-divider type="vertical" />
              <a title="修改" @click="handleEdit(record)"
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
      </a-spin>
    </div>
    <!--  财务新增  -->
    <cw-add
      :modal-visible="addShow"
      v-on:resetModalVisible="resetModalVisible"
    ></cw-add>
    <!--  财务修改  -->
    <cw-edit
      :modal-visible="editShow"
      v-on:resetModalVisible="resetModalVisible"
      :edit-list="editList"
    ></cw-edit>
  </div>
</template>

<script>
import cwAdd from "./components/cwAdd"
import cwEdit from "./components/cwEdit"
import { getFinanceList, getExportsCW, getImportDataCW, getCompanyList, delCwdata } from '../../../api/api'
import { download } from '../../../utils/export'
export default {
  name: "cw",
  components: {
    cwAdd,
    cwEdit
  },
  data () {
    return {
      disabled: false,
      bLoading: false,
      Loading: false,
      dataThis: [],
      addShow: false,
      editShow: false,
      editList: {},
      companyList: [],
      kmList: [
        { name: '营业收入' },
        { name: '利润总额' },
        { name: '成本情况' }
      ],
      companyId: null,
      subject: null,
      figureSort: null,
      statisticsTimeSort: null,
      startDate: null,
      endDate: null,
      paginationOther: {
        pageNum: 1,
        pageSize: 10,
        total: 1,
        current: 1
      }
    }
  },
  activated () {
    this.onShow()
  },
  mounted () {
    // 获取公司名称
    getCompanyList(1).then((res) => {
      if (res.data.code === 0) {
        this.companyList = res.data.data
      }
    })
    this.onShow()
  },
  methods: {
    onShow () {
      getFinanceList({
        page: this.paginationOther.current,
        limit: this.paginationOther.pageSize,
        companyId: this.companyId,
        subject: this.subject,
        figureSort: this.figureSort,
        statisticsTimeSort: this.statisticsTimeSort,
        startDate: this.startDate,
        endDate: this.endDate
      }).then((res) => {
        this.paginationOther.total = res.data.data.total
        // this.paginationOther.pageNum = res.data.data.currPage
        this.dataThis = res.data.data.list
      })
    },
    //表格改变时触发
    handleTableChange (pagination, filters, sorter) {
      this.paginationOther.current = pagination.current
      this.paginationOther.pageSize = pagination.pageSize
      // ascend上  descend下  order
      if (sorter.columnKey === 'figure') {
        if (sorter.order === 'ascend') {
          this.figureSort = 'asc'
        } else if (sorter.order === 'descend') {
          this.figureSort = 'desc'
        } else {
          this.figureSort = ''
        }
      } else if (sorter.columnKey === 'statisticsTime') {
        if (sorter.order === 'ascend') {
          this.statisticsTimeSort = 'asc'
        } else if (sorter.order === 'descend') {
          this.statisticsTimeSort = 'desc'
        } else {
          this.statisticsTimeSort = ''
        }
      }
      this.onShow()
    },
    // 查询子公司 科目
    handleChange () {
      this.paginationOther.current = 1
      this.onShow()
    },
    // 日期查询
    onChange (date, dateString) {
      this.startDate = dateString[0] ? dateString[0] : null
      this.endDate = dateString[1] ? dateString[1] : null
      this.onShow()
    },
    // 新增
    onAdd () {
      this.addShow = true
    },
    // 导入
    onImport (data) {
      this.disabled = true
      this.bLoading = true
      this.Loading = true
      const formData = new FormData()
      formData.append('file', data.file)
      getImportDataCW(formData).then((res) => {
        if (res.data.code === 0) {
          this.$message.success('导入成功!')
          this.paginationOther.current = 1
          this.paginationOther.pageSize = 10
          this.Loading = false
          this.bLoading = false
          this.disabled = false
          this.onShow()
        } else {
          this.$message.error(res.data.msg)

          this.Loading = false
          this.bLoading = false
          this.disabled = false
        }
      })
    },
    // 导出
    onExport () {
      getExportsCW({}).then((res) => {
        download(res.data, '财务数据')
      })
    },
    // 修改
    handleEdit (record) {
      this.editShow = true
      this.editList = record
    },
    // 删除
    async removeLineRecordById (record) {
      await delCwdata(record.financialId)
      this.$message.success('删除成功')
      this.onShow()
    },
    resetModalVisible (value) {
      this.addShow = false
      this.editShow = false
      this.paginationOther.current = 1
      this.paginationOther.pageSize = 10
      this.onShow()
    }
  }
}
</script>

<style scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
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
/deep/ .ant-select-selection--single {
  position: relative;
  height: 32px;
  cursor: pointer;
  background: white;
  color: #999;
}
</style>
