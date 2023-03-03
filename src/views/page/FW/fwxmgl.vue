<template>
  <div class="clzc">
    <div class="head">
      <div class="serach">
        项目名称：<a-input
          style="width: 200px"
          v-model="entryName"
          placeholder="回车键搜索"
          @keyup.enter="serach"
          allowClear
        />
        地址：<a-input
          style="width: 200px"
          v-model="address"
          placeholder="回车键搜索"
          @keyup.enter="serach"
          allowClear
        />
        负责人：<a-input
          style="width: 200px"
          v-model="responsiblePerson"
          placeholder="回车键搜索"
          @keyup.enter="serach"
          allowClear
        />
      </div>
      <div>
        <a-button type="primary" @click="openAdd(1)"> 新增 </a-button>
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
          <a href="../../../../static/fwdmb.xlsx" download="服务点模板"
            >下载模板</a
          >
        </a-button>
      </div>
    </div>
    <div class="table-body">
      <a-spin tip="导入中..." :spinning="spinning">
        <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
        <a-table
          class="aTable"
          style="overflow-y: auto"
          :scroll="{ y: y1 }"
          @change="handleTableChange"
          :row-key="(record) => record.id"
          :pagination="paginationOther"
          :data-source="dataList"
        >
          <a-table-column
            class="address"
            align="center"
            key="entryName"
            title="项目名称"
            width="200px"
            data-index="entryName"
          >
            <template slot-scope="text, record">
              <div :title="text" class="ellipsis">{{ text }}</div>
            </template>
          </a-table-column>
          <a-table-column
            class="address"
            align="center"
            key="address"
            title="地址"
            width="200px"
            data-index="address"
          >
            <template slot-scope="text, record">
              <div :title="text" class="ellipsis">{{ text }}</div>
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            key="companyName"
            title="所属公司"
            data-index="companyName"
          ></a-table-column>
          <a-table-column
            align="center"
            key="responsiblePerson"
            title="负责人"
            data-index="responsiblePerson"
          >
            <template slot-scope="text, record">
              <div :title="text" class="ellipsis">{{ text }}</div>
            </template>
          </a-table-column>
          <!-- <a-table-column
          align="center"
          key="g5"
          title="服务点类型"
          data-index="g5"
        >
          <template slot-scope="text, record">
            <span v-if="record.g12 == 1">政府机关</span>
            <span v-else-if="record.g12 == 2">企业</span>
            <span v-else-if="record.g12 == 3">科研院校</span>
            <span v-else-if="record.g12 == 4">事业单位</span>
            <span v-else-if="record.g12 == 5">医院</span>
          </template>
        </a-table-column> -->
          <a-table-column
            align="center"
            key="floorage"
            title="建筑面积（万 m²）"
            data-index="floorage"
            width="200px"
          ></a-table-column>
          <a-table-column
            align="center"
            key="telephone"
            title="联系电话"
            width="200px"
            data-index="telephone"
          >
            <template slot-scope="text, record">
              <div :title="text" class="ellipsis">{{ text }}</div>
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            key="proprietor"
            title="业主/ 服务人数"
            data-index="proprietor"
          ></a-table-column>
          <a-table-column
            align="center"
            key="proprietorTypeName"
            title="业主类型"
            data-index="proprietorTypeName"
          ></a-table-column>
          <a-table-column
            align="center"
            key="g10"
            title="经度，维度"
            data-index="g10"
          >
            <template slot-scope="text, record">
              {{ record.longitude }},{{ record.latitude }}
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            key="regionName"
            title="所属区域"
            data-index="regionName"
          ></a-table-column>
          <a-table-column
            align="center"
            key="visible"
            title="是否显示"
            data-index="visible"
          >
            <template slot-scope="text, record">
              {{ record.visible === 1 ? "是" : "否" }}
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            width="120px"
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
    <addFw
      :code="code"
      ref="add"
      :modalVisible="modalVisible"
      @resetModalVisible="resetModalVisible"
    ></addFw>
  </div>
</template>

<script>
import { download } from '../../../utils/export'
import addFw from './components/addFw.vue'
import { getFwData, deltFwData, importFw, exportFw } from '@/api/api.js'
export default {
  name: "cw",
  components: {
    addFw
  },
  data () {
    return {
      disabled: false,
      loading: false,
      spinning: false,
      address: '',
      entryName: '',
      responsiblePerson: '',
      code: 0,
      modalVisible: false,
      dataList: [
      ],
      paginationOther: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      y1: ''
    }
  },
  activated () {
    this.getZlList()
  },
  mounted () {
    this.getZlList()
    this.y1 = (document.body.scrollHeight - 300) + 'px'
  },

  methods: {
    // 查询
    serach () {
      this.paginationOther.current = 1
      this.getZlList()
    },
    // 导出
    onExport () {
      const link = document.createElement('a')
      link.style.display = 'none'
      exportFw().then((res) => {
        download(res.data, '租赁资产数据')
      })
    },
    // 导入
    handleChange (info) {
    },
    // 导入
    customRequest (data) {
      this.disabled = true
      this.loading = true
      this.spinning = true
      const formData = new FormData()
      formData.append('file', data.file)
      // 这里的token根据自身情况修改
      importFw(formData).then((res) => {
        if (res.data.code === 0) {
          this.paginationOther.current = 1
          this.paginationOther.pageSize = 10
          this.$message.success('导入成功')
          this.spinning = false
          this.disabled = false
          this.loading = false
          this.getZlList()
        } else {
          this.$message.error(res.data.msg)

          this.spinning = false
          this.disabled = false
          this.loading = false
        }
      })
      this.getZlList()
    },
    // 打开弹框
    openAdd (code) {
      this.code = code
      this.modalVisible = true
    },
    // 关闭弹框
    resetModalVisible () {
      this.modalVisible = false
    },
    // 获取租赁点数据
    getZlList (a) {
      // if (a === 1) {
      //   this.paginationOther.pageNum = 1
      // }
      getFwData({
        pageNum: this.paginationOther.current,
        pageSize: this.paginationOther.pageSize,
        address: this.address,
        entryName: this.entryName,
        responsiblePerson: this.responsiblePerson
      }).then((res) => {
        if (res.data.code === 0) {
          this.dataList = res.data.data.list
          this.paginationOther.total = res.data.data.total
        }
      }

      )

    },
    // 表格分页
    handleTableChange (current) {
      this.paginationOther.current = current.current
      this.paginationOther.pageSize = current.pageSize
      this.getZlList()
    },
    handleEdit (code, record) {
      this.code = code
      this.$refs.add.getDtail(record.id)
      this.modalVisible = true
    },
    async removeLineRecordById (record) {
      await deltFwData(record.id)
      this.$message.success('删除成功')
      this.getZlList()
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
.clzc {
  height: 100%;
  padding: 15px;
  background: white;
  overflow-y: hidden;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  text-align: center;
}
</style>
