<template>
  <div class="ygsj">
    <div class="head">
      <div>
        党组织名称：
        <a-select
          v-model="organizationId"
          style="width: 200px"
          @change="selChange"
          allowClear
        >
          <a-select-option
            v-for="(item, index) in DjryList"
            :value="item.id"
            :key="item.id"
          >
            {{ item.organizationCode }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <a-button type="primary" @click="openAdd"> 新增 </a-button>
        <a-button type="primary" @click="selDel"> 批量删除 </a-button>
        <a-upload
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :limit="1"
          ref="upload"
          :showUploadList="false"
          :customRequest="customRequest"
          @change="handleChange"
        >
          <a-button type="primary" :loading="loading" :disabled="disabled">
            {{ loading ? "导入中..." : "导入" }}
          </a-button>
        </a-upload>
        <a-button type="primary" @click="onExport"> 导出 </a-button>
        <a-button type="primary">
          <a href="../../../../static/djxzmb.xlsx" download="党建-党员信息"
            >下载模板</a
          >
        </a-button>
      </div>
    </div>
    <div class="table-body">
      <a-spin tip="导入中..." :spinning="spinning">
        <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
        <a-table
          :row-key="(record, index) => index"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :scroll="{ y: 700 }"
          :pagination="false"
          :data-source="dataThis"
          @change="handleTableChange"
        >
          <a-table-column
            key="organizationName"
            data-index="organizationName"
            align="center"
            title="党组织名称"
          ></a-table-column>
          <a-table-column
            key="genderDesc"
            align="center"
            title="性别"
            data-index="genderDesc"
          ></a-table-column>
          <a-table-column
            key="birthday"
            data-index="birthday"
            align="center"
            title="出生年月"
          ></a-table-column>
          <a-table-column
            key="partyTypeName"
            data-index="partyTypeName"
            align="center"
            title="党员类型"
          ></a-table-column>
          <a-table-column
            key="joinPartyTime"
            data-index="joinPartyTime"
            align="center"
            title="加入党组织日期"
          ></a-table-column>
          <a-table-column
            align="center"
            key="stateDesc"
            data-index="stateDesc"
            title="状态"
          ></a-table-column>
          <a-table-column
            align="center"
            width="150px"
            key="action"
            title="操作"
          >
            <template slot-scope="text, record">
              <a-divider type="vertical" />
              <a title="修改" @click="handleAdd(record)"
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
        <a-pagination
          class="pagination"
          v-model="paginationOther.current"
          :page-size-options="pageSizeOptions"
          :total="paginationOther.total"
          show-size-changer
          :page-size="paginationOther.pageSize"
          @showSizeChange="onShowSizeChange"
          @change="handleTableChange"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
            <span v-if="props.value === '50'">全部</span>
          </template>
        </a-pagination>
      </a-spin>
    </div>
    <AddRY
      :modal-visible.sync="modalVisible"
      v-on:resetModalVisible="resetModalVisible"
    ></AddRY>
    <EditRy
      ref="Edit"
      :RecordId="RecordId"
      v-on:resetModalVisible="resetModalVisible"
      :EditVisible.sync="EditVisible"
    ></EditRy>
  </div>
</template>

<script>
import AddRY from './components/AddRY.vue'
import EditRy from './components//EditRY.vue'
import { getDjpeopleData, DeltDjpeople, exportExcil, improtExcil, getDjryData } from '@/api/api.js'
import { download } from '../../../utils/export'

export default {
  name: "cw",
  components: {
    AddRY,
    EditRy
  },
  data () {
    return {
      delSel: [],
      pageSizeOptions: ['10', '20', '30', '40'],
      selectedRowKeys: [],
      disabled: false,
      loading: false,
      spinning: false,
      RecordId: null,
      // 修改弹框的显示
      EditVisible: false,
      // 增加弹框的显示
      modalVisible: false,
      dataThis: [],
      DjryList: [],
      organizationId: null,
      headers: {
        authorization: 'authorization-text',
      },
      paginationOther: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  activated () {
    this.getPeopleList()
  },
  created () {
    this.getPeopleList()
    this.getDIryShow()
  },
  methods: {
    onShowSizeChange (current, pageSize) {
      this.paginationOther.pageSize = pageSize
      this.paginationOther.current = current
      this.getPeopleList()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.delSel = []
      this.selectedRowKeys = selectedRowKeys
      selectedRows.forEach(item => {
        this.delSel.push(item.infoId)
      })
    },
    // 查询党组织列表
    async getDIryShow () {
      const res = await getDjryData()
      if (res.data.code === 0) {
        this.DjryList = res.data.data
      }
    },
    selChange () {
      this.paginationOther.current = 1
      this.getPeopleList()
    },
    // 导入
    customRequest (data) {
      this.disabled = true
      this.loading = true
      this.spinning = true
      const formData = new FormData()
      formData.append('file', data.file)
      // 这里的token根据自身情况修改
      improtExcil(formData).then((res) => {
        if (res.data.code === 0) {
          this.paginationOther.current = 1
          this.paginationOther.pageSize = 10
          this.$message.success('导入成功')
          this.spinning = false
          this.disabled = false
          this.loading = false
          this.getPeopleList()
        } else {
          this.$message.error(res.data.msg)

          this.spinning = false
          this.disabled = false
          this.loading = false
        }
      })
    },
    // 导入
    handleChange (info) {
    },
    // 导出
    onExport () {
      const link = document.createElement('a')
      link.style.display = 'none'
      exportExcil().then((res) => {
        download(res.data, '党员数据')
      })
    },
    // 修改信息
    handleAdd (record) {
      this.EditVisible = true
      this.RecordId = record.infoId
      this.$refs.Edit.getPeopleDetail(record.infoId)
    },
    // 打开新增弹框
    openAdd () {
      this.modalVisible = true
    },
    resetModalVisible () {
      this.modalVisible = false
      this.EditVisible = false
      this.getPeopleList()
    },
    // 获取党建人员列表
    async getPeopleList () {
      try {
        const res = await getDjpeopleData({
          pageNum: this.paginationOther.current,
          pageSize: this.paginationOther.pageSize,
          organizationId: this.organizationId
        })
        const data = res.data.data.list
        this.dataThis = data
        this.paginationOther.total = res.data.data.total
      } catch (error) {
        console.log(error)
      }
    },
    //表格改变时触发
    handleTableChange (page, pageSize) {
      this.selectedRowKeys = []
      this.paginationOther.current = page
      this.paginationOther.pageSize = pageSize
      this.getPeopleList()
    },
    // 批量删除
    selDel () {
      let self = this
      this.$confirm({
        title: '确认要删除这些选项吗?',
        okText: '确定',
        cancelText: '取消',
        onOk () {
          // setTimeout(() => {
          //   removerToken()
          //   self.$router.push('/')
          //   self.$store.dispatch('delUserAction')
          //   resetRouter()
          // }, 1000)
          if (self.selectedRowKeys.length === 0) {
            self.$message.warning('至少选择一条数据')
            return
          } else {
            DeltDjpeople(self.delSel).then((res) => {
              if (res.data.code === 0) {
                self.$message.success('删除成功')
                self.tabShow()
              } else {
                self.$message.error('删除失败')
              }
            })
            self.delSel = []
            self.selectedRowKeys = []
          }
        },
        onCancel () { },
      })

    },
    async removeLineRecordById (record) {
      this.delSel.push(record.infoId)
      const res = await DeltDjpeople(this.delSel)
      if (res.data.code === 0) {
        this.$message.success('删除成功')
        this.getPeopleList()
      } else {
        this.$message.error('删除失败')
      }
      this.delSel = []
    }
  }
}
</script>

<style scoped>
.pagination {
  /* float: right; */
  position: absolute;
  right: 0;
  bottom: -60px;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
.ygsj {
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
  background: none;
}
</style>
