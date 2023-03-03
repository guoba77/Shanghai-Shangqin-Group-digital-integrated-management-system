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
        内容：<a-input
          style="width: 200px"
          v-model="content"
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
        <a-button type="primary" @click="onExport"> 导出 </a-button>
        <a-upload
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :limit="1"
          ref="upload"
          :showUploadList="false"
          :customRequest="customRequest"
          @change="handleChange"
        >
          <a-button type="primary" :loading="btLoading" :disabled="disabled">
            {{ btLoading ? "导入中..." : "导入" }}
          </a-button>
        </a-upload>
        <a-button type="primary">
          <a
            href="../../../../static/SubsidiaryMb.xlsx"
            download="子公司数据导入模板"
            >下载模板</a
          >
        </a-button>
      </div>
    </div>
    <div class="table-body">
      <a-spin tip="导入中..." :spinning="loading">
        <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
        <a-table
          @change="handleChange"
          :row-key="(record) => record.id"
          :pagination="paginationOther"
          :data-source="dataThis"
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
            key="content"
            title="内容"
            data-index="content"
          ></a-table-column>
          <a-table-column
            align="center"
            key="updateTime"
            title="时间"
            data-index="updateTime"
          ></a-table-column>
          <a-table-column
            align="center"
            key="value"
            title="值"
            data-index="value"
          ></a-table-column>
          <a-table-column
            align="center"
            width="150px"
            key="action"
            title="操作"
          >
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
      </a-spin>
    </div>
    <SubAdd
      ref="add"
      :modalVisible="modalVisible"
      :code="code"
      @resetModalVisible="modalVisible = false"
    ></SubAdd>
  </div>
</template>

<script>
import { download } from '../../../utils/export'
import SubAdd from './components/SubAdd.vue'
import { getSubData, DelSubData, exportSubsidiaryData, importSubsidiaryData } from '@/api/api.js'
export default {
  name: "Subsidiary",
  components: {
    SubAdd
  },
  data () {
    return {
      updateStartTime: '',
      updateEndTime: '',
      companyName: '',
      content: '',
      disabled: false,
      btLoading: false,
      loading: false,
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
  created () {
    this.getSubList()
  },
  methods: {
    // 查询
    serach () {
      this.paginationOther.current = 1
      this.getSubList()
    },
    onChange (date, dateString) {
      this.updateStartTime = dateString[0] ? dateString[0] : null
      this.updateEndTime = dateString[1] ? dateString[1] : null
      this.serach()
    },
    // 导出
    onExport () {
      const link = document.createElement('a')
      link.style.display = 'none'
      exportSubsidiaryData().then((res) => {
        download(res.data, '子公司其他数据')
      })
    },
    // 导入
    handleChange (info) {
    },
    // 导入
    customRequest (data) {
      this.btLoading = true
      this.loading = true
      this.disabled = true
      const formData = new FormData()
      formData.append('file', data.file)
      // 这里的token根据自身情况修改
      importSubsidiaryData(formData).then((res) => {
        if (res.data.code === 0) {
          this.paginationOther.current = 1
          this.paginationOther.pageSize = 10
          this.loading = false
          this.btLoading = false
          this.disabled = false
          this.$message.success('导入成功')
          this.getSubsidiaryList()
        } else {
          this.loading = false
          this.btLoading = false
          this.disabled = false
          this.$message.error(res.data.msg)


        }
      })
      this.getSubsidiaryList()
    },
    openAdd (code) {
      this.code = code
      this.modalVisible = true
    },
    // 页码改变
    handleChange (current) {
      this.paginationOther.current = current.current
      this.paginationOther.pageSize = current.pageSize
      this.getSubList()
    },
    // 获取子公司管理数据列表
    async getSubList () {
      const res = await getSubData({
        pageSize: this.paginationOther.pageSize,
        pageNum: this.paginationOther.current,
        companyName: this.companyName,
        content: this.content,
        updateStartTime: this.updateStartTime,
        updateEndTime: this.updateEndTime
      })
      this.dataThis = res.data.data.list
      this.paginationOther.total = res.data.data.total
    },
    handleEdit (code, record) {
      this.code = code
      this.modalVisible = true
      this.$refs.add.getDtail(record.id)
    },
    // 删除
    async removeLineRecordById (record) {
      await DelSubData(record.id)
      if (this.dataThis.length === 1 && this.paginationOther.current > 1) {
        this.paginationOther.current--
      }
      this.$message.success('删除成功')
      this.getSubList()
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
