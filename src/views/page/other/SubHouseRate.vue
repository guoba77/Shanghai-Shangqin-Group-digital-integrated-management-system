<template>
  <div class="cwsj">
    <div class="head">
      <div>
        公司名称：
        <a-input
          @keyup.enter.native="handleChange"
          placeholder="回车键搜索"
          style="width: 180px"
          v-model="companyName"
          allowClear
        >
        </a-input>
        二级公司：
        <a-input
          @keyup.enter.native="handleChange"
          placeholder="回车键搜索"
          style="width: 180px"
          v-model="subsidiaryName"
          allowClear
        >
        </a-input>
      </div>
      <div>
        <a-button @click="addRate(1)" type="primary"> 新增 </a-button>
        <a-upload
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :limit="1"
          ref="upload"
          :showUploadList="false"
          :customRequest="customRequest"
        >
          <a-button type="primary" :loading="loading" :disabled="disabled">
            {{ loading ? "导入中..." : "导入" }}
          </a-button>
        </a-upload>
        <a-button type="primary" @click="onExport"> 导出 </a-button>
        <a-button type="primary">
          <a href="../../../../static/fjczlmb.xlsx" download="服务点模板"
            >下载模板</a
          >
        </a-button>
      </div>
    </div>
    <div class="table-body">
      <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
      <a-table
        @change="handleTableChange"
        :row-key="(record, index) => index"
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
          key="subsidiaryName"
          title="二级公司名称"
          data-index="subsidiaryName"
        ></a-table-column>
        <a-table-column
          align="center"
          key="rentalRate"
          title="出租率"
          data-index="rentalRate"
        ></a-table-column>
        <a-table-column
          align="center"
          key="uploadTime"
          title="上传时间"
          data-index="uploadTime"
        ></a-table-column>
        <a-table-column align="center" width="150px" key="action" title="操作">
          <template slot-scope="text, record">
            <a-divider type="vertical" />
            <a title="修改" @click="handleEdit(record, 2)"
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
    <SubHouseRateAdd
      ref="addRef"
      :modalVisible="modalVisible"
      @resetModalVisible="modalVisible = false"
      :code="code"
    ></SubHouseRateAdd>
  </div>
</template>

<script>
import { download } from '../../../utils/export'
import SubHouseRateAdd from './components//SubHouseRateAdd.vue'
import { selectRoomRental, DelRoomRental, exportRoomExcel, importRoomRental } from '@/api/api.js'
export default {
  name: "cw",
  data () {
    return {
      subsidiaryName: '',
      companyName: '',
      disabled: false,
      loading: false,
      spinning: false,
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
  components: {
    SubHouseRateAdd
  },
  computed: {

  },
  created () {
    this.getdRateList()
  },
  methods: {
    handleChange () {
      this.getdRateList()
    },
    // 导出
    onExport () {
      const link = document.createElement('a')
      link.style.display = 'none'
      exportRoomExcel().then((res) => {
        download(res.data, '子公司房间出租率')
      })
    },
    // 导入
    customRequest (data) {
      this.disabled = true
      this.loading = true
      this.spinning = true
      const formData = new FormData()
      formData.append('file', data.file)
      // 这里的token根据自身情况修改
      importRoomRental(formData).then((res) => {
        if (res.data.code === 0) {
          this.paginationOther.current = 1
          this.paginationOther.pageSize = 10
          this.$message.success('导入成功')
          this.spinning = false
          this.disabled = false
          this.loading = false
          this.getdRateListgetdRateList()
        } else {
          this.$message.error(res.data.msg)

          this.spinning = false
          this.disabled = false
          this.loading = false
        }
      })
      this.getdRateList()
    },
    // 表格分页
    handleTableChange (current) {
      this.paginationOther.current = current.current
      this.paginationOther.pageSize = current.pageSize
      this.getdRateList()
    },
    // 获取房间出租率列表
    async getdRateList () {
      const res = await selectRoomRental(
        {
          subsidiaryName: this.subsidiaryName,
          companyName: this.companyName,
          pageNum: this.paginationOther.current,
          pageSize: this.paginationOther.pageSize
        }
      )
      if (res.data.code === 0) {
        this.dataThis = res.data.data.list
        this.paginationOther.total = res.data.data.total
      }
    },
    // 新增房间出租率
    addRate (code) {
      this.code = code
      this.modalVisible = true
    },
    handleEdit (record, code) {
      this.code = code
      this.modalVisible = true
      this.$refs.addRef.getDtail(record.id)
    },
    async removeLineRecordById (record) {
      const res = await DelRoomRental(record.id)
      if (res.data.code === 0) {
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
      this.getdRateList()
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
