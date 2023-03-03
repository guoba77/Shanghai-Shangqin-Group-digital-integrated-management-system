<template>
  <div class="cwsj">
    <div class="head">
      <div></div>
      <div>
        <a-button type="primary" @click="AddRole(1)"> 新增用户 </a-button>
      </div>
    </div>
    <div class="table-body">
      <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
      <a-table
        :row-key="(record) => record.userId"
        :data-source="dataThis"
        :pagination="paginationOther"
        @change="handleTableChange"
      >
        <a-table-column
          align="center"
          key="username"
          title="用户名"
          data-index="username"
        ></a-table-column>
        <a-table-column
          align="center"
          key="email"
          title="邮箱"
          data-index="email"
        ></a-table-column>
        <a-table-column
          align="center"
          key="mobile"
          title="手机号"
          data-index="mobile"
        ></a-table-column>
        <a-table-column
          align="center"
          key="companyName"
          title="公司"
          data-index="companyName"
        ></a-table-column>
        <a-table-column align="center" width="150px" key="action" title="操作">
          <template slot-scope="text, record">
            <a title="分配权限" @click="assginPer(record)"
              ><a-icon type="plus" />
            </a>
            <a-divider type="vertical" />
            <a title="修改" @click="handleEdit(2, record)"
              ><a-icon type="form" />
            </a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确认删除该用户嘛吗?"
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
      <AssginPer
        :companyName="companyName"
        ref="asg"
        :modalVisible="modalVisible"
        @resetModalVisible="modalVisible = false"
      ></AssginPer>
      <AddRole
        :code="code"
        ref="add"
        :modalVisible1="modalVisible1"
        @resetModalVisible1="modalVisible1 = false"
      ></AddRole>
    </div>
  </div>
</template>
<script>
import AssginPer from '@/views/page/PER/components/AssginPer'
import AddRole from './components/AddRole'
import { getRoleData, DelRole } from '@/api/api.js'
export default {
  name: "cw",
  components: {
    AssginPer,
    AddRole
  },
  data () {
    return {
      companyName: null,
      code: null,
      modalVisible1: false,
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
    this.getRoleList()
  },
  methods: {
    // 表格分页
    handleTableChange (current) {
      this.paginationOther.current = current.current
      this.paginationOther.pageSize = current.pageSize
      this.getRoleList()
    },
    // 获取用户数据
    async getRoleList () {
      const res = await getRoleData({
        pageNum: this.paginationOther.current,
        pageSize: this.paginationOther.pageSize,
      })
      this.dataThis = res.data.page.list
      this.total = res.data.page.total
    },
    AddRole (code) {
      this.code = code
      this.modalVisible1 = true
    },
    assginPer (record) {
      this.companyName = record.companyName
      this.modalVisible = true
      this.$refs.asg.getTreeList(record.userId)
    },
    handleEdit (code, record) {
      this.code = code
      this.modalVisible1 = true
      this.$refs.add.getRoleDetail(record.userId)
    },
    async removeLineRecordById (record) {
      const res = await DelRole([record.userId])
      if (res.data.code === 0) {
        this.$message.success('删除成功')
        this.getRoleList()
      } else {
        this.$message.success(res.data.msg)
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
