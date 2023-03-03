<template>
  <div class="clzc">
    <div class="head">
      <div class="search">
        所属公司：<a-input
          v-model="companyName"
          style="width: 200px"
          placeholder="回车键搜索"
          @keyup.enter.native="tableShow(1)"
          allowClear
        />
        区：<a-input
          v-model="regionName"
          style="width: 200px"
          placeholder="回车键搜索"
          @keyup.enter.native="tableShow(1)"
          allowClear
        />
        租赁类型：<a-input
          v-model="assetTypeName"
          style="width: 200px"
          placeholder="回车键搜索"
          @keyup.enter.native="tableShow(1)"
          allowClear
        />
      </div>
      <div>
        <a-button type="primary" @click="openAdd('1')"> 新增 </a-button>
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
          <a href="../../../../static/zldmb.xlsx" download="租赁点模板"
            >下载模板</a
          >
        </a-button>
      </div>
    </div>
    <div class="table-body">
      <a-spin tip="导入中..." :spinning="loading">
        <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
        <a-table
          @change="handleTableChange"
          :row-key="(record) => record.id"
          :pagination="paginationOther"
          :data-source="dataThis"
        >
          <!--      >状态（未开始、进行中、结束、中断）-->
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
            width="300px"
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
          <!-- <a-table-column align="center" key="g12" title="状态" data-index="g12">
          <template slot-scope="text, record">
            <span v-if="record.g12 == 1">未开始</span>
            <span v-else-if="record.g12 == 2">进行中</span>
            <span v-else-if="record.g12 == 3">结束</span>
            <span v-else-if="record.g12 == 4">中断</span>
          </template>
        </a-table-column> -->
          <a-table-column
            align="center"
            width="150px"
            key="action"
            title="操作"
          >
            <template slot-scope="text, record">
              <a-divider type="vertical" />
              <a title="修改" @click="openEdit('2', record)"
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
    <ZcAdd
      ref="add"
      @resetModalVisible="resetModalVisible"
      :modalVisible.sync="modalVisible"
      :code="code"
      :zcDetail="zcDetail"
    ></ZcAdd>
  </div>
</template>

<script>
import { download } from '../../../utils/export'
import { getZlData, delZlData, importzc, exportzc } from '@/api/api.js'
import ZcAdd from './components/zcAdd.vue'
export default {
  name: "cw",
  components: {
    ZcAdd
  },
  data () {
    return {
      disabled: false,
      btLoading: false,
      loading: false,
      companyName: '',
      regionName: '',
      assetTypeName: '',
      zcDetail: {},
      code: '',
      modalVisible: false,
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
    this.tableShow()
  },
  mounted () {
    this.tableShow()
  },
  methods: {
    // 导出
    onExport () {
      const link = document.createElement('a')
      link.style.display = 'none'
      exportzc().then((res) => {
        download(res.data, '租赁资产数据')
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
      importzc(formData).then((res) => {
        if (res.data.code === 0) {
          this.paginationOther.current = 1
          this.paginationOther.pageSize = 10
          this.loading = false
          this.btLoading = false
          this.disabled = false
          this.$message.success('导入成功')
          this.tableShow()
        } else {
          this.loading = false
          this.btLoading = false
          this.disabled = false
          this.$message.error(res.data.msg)
        }
      })
      this.tableShow()
    },
    resetModalVisible () {
      this.modalVisible = false
    },
    // 打开新增弹框
    openAdd (code) {
      this.code = code
      this.modalVisible = true
      // console.log(record.id)

    },
    async openEdit (code, record) {
      this.modalVisible = true
      this.code = code
      this.$refs.add.getDtail(record.id)
    },
    tableShow (a) {
      if (a === 1) {
        this.paginationOther.current = 1
      }
      getZlData({
        companyName: this.companyName,
        regionName: this.regionName,
        assetTypeName: this.assetTypeName,
        pageNum: this.paginationOther.current,
        pageSize: this.paginationOther.pageSize,
      }).then((res) => {
        if (res.data.code === 0) {
          this.dataThis = res.data.data.list
          this.paginationOther.total = res.data.data.total
        }
      })
    },
    // 表格分页
    handleTableChange (current) {
      this.paginationOther.current = current.current
      this.paginationOther.pageSize = current.pageSize
      this.tableShow()
    },
    async removeLineRecordById (record) {
      await delZlData(record.id)
      this.$message.success('删除成功')
      this.tableShow()
    }
  }
}
</script>

<style lang="scss" scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
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
.ellipsis {
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  text-align: center;
}
</style>
