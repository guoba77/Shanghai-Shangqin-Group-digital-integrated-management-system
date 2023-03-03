<template>
  <div class="ygsj">
    <div class="head">
      <div class="search">
        <div class="search1">
          单位：<a-input
            style="width: 200px"
            v-model="companyName"
            @keyup.enter.native="handleAddBook"
            placeholder="回车键搜索"
            allowClear
          />
        </div>
        <div class="search2">
          学历：
          <a-select
            @change="handleAddBook"
            style="width: 180px; background: white"
            v-model="degreeCategoryName"
            allowClear
          >
            <a-select-option v-for="item in xlList" :key="item.id">{{
              item.degreeName
            }}</a-select-option>
          </a-select>
        </div>
        <div class="search3">
          <a-row type="flex" justify="start">
            <a-col class="text" :span="6">入职日期： </a-col>
            <a-col :span="18">
              <a-date-picker
                @change="handleAddBook"
                :format="dateFormat"
                v-model="entryTime"
                style="width: 80%"
                placeholder="请选择入职时间"
                allowClear
              />
            </a-col>
          </a-row>
        </div>
      </div>
      <div style="">
        <a-button type="primary" @click="onYgAdd"> 新增 </a-button>
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
          <a href="../../../../static/ryxzmb.xlsx" download="人事-人员信息"
            >下载模板</a
          >
        </a-button>
      </div>
    </div>
    <div class="table-body">
      <a-spin tip="导入中..." :spinning="spinning">
        <a-table
          :row-key="(record, index) => index"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :scroll="{ y: 700 }"
          :pagination="false"
          @change="handleTableChange"
          :data-source="dataThis"
        >
          <a-table-column
            align="center"
            key="companyName"
            title="单位"
            data-index="companyName"
          >
          </a-table-column>
          <a-table-column
            align="center"
            key="birthday"
            title="出生日期"
            data-index="birthday"
          ></a-table-column>
          <a-table-column
            align="center"
            key="gender"
            title="性别"
            data-index="gender"
          >
            <template slot-scope="text, record">
              <span v-if="text === 1">男</span>
              <span v-else-if="text === 2">女</span>
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            key="entryTime"
            title="入职时间"
            data-index="entryTime"
          ></a-table-column>
          <a-table-column
            align="center"
            key="degreeCategoryName"
            title="学历"
            data-index="degreeCategoryName"
          ></a-table-column>
          <a-table-column
            align="center"
            key="degreeName"
            title="学位"
            data-index="degreeName"
          ></a-table-column>
          <a-table-column
            align="center"
            key="certificateName"
            title="职业技能资格证书名称"
            data-index="certificateName"
          ></a-table-column>
          <a-table-column
            align="center"
            key="certificateGradeName"
            title="职业技能资格证书等级"
            data-index="certificateGradeName"
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
    <!-- 员工新增 -->
    <ygAdd
      :modal-visible="addModalVisible"
      v-on:resetModalVisible="resetModalVisible"
    >
    </ygAdd>
    <!-- 员工修改 -->
    <ygEdit
      :modal-visible="editModalVisible"
      :info-id="infoId"
      :edit-list="editList"
      v-on:resetModalVisible="resetModalVisible"
    >
    </ygEdit>
  </div>
</template>

<script>
import moment from 'moment'
import { formateDate } from '../../../utils/data.js'
import ygAdd from "./components/ygAdd"
import ygEdit from "./components/ygEdit"
import { RsSjGl, RsSjDr, getRsSjDc, getRsDel, getSelectXl } from '../../../api/api'
import { download } from '../../../utils/export'
export default {
  name: "cw",
  data () {
    return {
      delSel: [],
      pageSizeOptions: ['10', '20', '30', '40'],
      selectedRowKeys: [],
      disabled: false,
      loading: false,
      spinning: false,
      dateFormat: 'YYYY-MM-DD',
      xlList: [
      ],
      entryTime: '',
      // 学历
      degreeCategoryName: '',
      dataThis: [],
      addModalVisible: false,
      editModalVisible: false,
      editList: {},
      companyName: '',
      infoId: 0,
      paginationOther: {
        pageSize: 10,
        total: 0,
        current: 1
      },
      headers: {
        authorization: 'authorization-text',
      }
    }
  },
  components: {
    ygAdd,
    ygEdit
  },
  mounted () {
    this.tabShow()
  },
  activated () {
    this.tabShow()
  },
  // 时间过滤器
  filters: {
    formateDate (time) {
      let date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd')
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    },
  },
  methods: {
    onShowSizeChange (current, pageSize) {
      this.paginationOther.pageSize = pageSize
      this.paginationOther.current = current
      this.tabShow()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.delSel = []
      this.selectedRowKeys = selectedRowKeys
      selectedRows.forEach(item => {
        this.delSel.push(item.infoId)
      })
    },
    // 表格数据
    tabShow () {
      let time
      if (this.entryTime) {
        time = moment(this.entryTime).format(this.dateFormat)
      } else {
        time = ''
      }
      RsSjGl({
        entryTime: time,
        degreeCategoryId: this.degreeCategoryName,
        pageNum: this.paginationOther.current,
        pageSize: this.paginationOther.pageSize,
        companyName: this.companyName

      }).then((res) => {
        if (res.data.code === 0) {
          this.dataThis = res.data.data.list
          this.paginationOther.total = res.data.data.total
        }
      })
      // 获取学历
      getSelectXl().then((res) => {
        this.xlList = res.data.data
      })
    },
    // 表格分页
    handleTableChange (page, pageSize) {
      this.selectedRowKeys = []
      this.paginationOther.current = page
      this.paginationOther.pageSize = pageSize
      this.tabShow()
    },
    // 回车键查询
    handleAddBook () {
      this.paginationOther.current = 1
      this.tabShow()
    },
    // 新增
    onYgAdd () {
      this.addModalVisible = true
    },
    // 修改
    handleEdit (record) {
      this.infoId = record.infoId
      this.editList = record
      this.editModalVisible = true
    },
    // 导入
    customRequest (data) {
      this.disabled = true
      this.loading = true
      this.spinning = true
      const formData = new FormData()
      formData.append('file', data.file)
      // 这里的token根据自身情况修改
      RsSjDr(formData).then((res) => {
        if (res.data.code === 0) {
          this.paginationOther.current = 1
          this.paginationOther.pageSize = 10
          this.$message.success('导入成功')
          this.disabled = false
          this.loading = false
          this.spinning = false
          this.tabShow()
        } else {
          this.$message.error(res.data.msg)

          this.disabled = false
          this.loading = false
          this.spinning = false
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
      getRsSjDc().then((res) => {
        download(res.data, '员工数据')
      })
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
            getRsDel(self.delSel).then((res) => {
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
    // 删除接口
    removeLineRecordById (record) {
      this.delSel.push(record.infoId)
      getRsDel(this.delSel).then((res) => {
        if (res.data.code === 0) {
          this.$message.success('删除成功')
          this.tabShow()
        } else {
          this.$message.error('删除失败')
        }
      })
      this.delSel = []
    },
    resetModalVisible () {
      this.addModalVisible = false
      this.editModalVisible = false
      this.tabShow()
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  // float: right;
  position: absolute;
  right: 0;
  bottom: -60px;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
/deep/ .text {
  margin-top: 7px;
}
/deep/ .ant-calendar-picker {
  display: inline-block;
}
/deep/ .ant-select-selection--single {
  background: none;
}
.search {
  display: flex;
}
.search1 {
  float: left;
}
.search2 {
  float: left;
  margin-left: 5px;
}
.search3 {
  float: left;
  margin-left: 5px;
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
</style>
