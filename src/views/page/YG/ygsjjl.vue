<template>
  <div class="cwsj">
    <div class="head">
      <div class="serach">
        公司名称:<a-input
          style="width: 200px"
          placeholder="回车搜索"
          @keyup.enter="search"
          v-model="companyName"
          allowClear
        ></a-input>
        时间：
        <a-range-picker
          :placeholder="['开始日期', '结束日期']"
          @change="onChange"
          allowClear
        />
      </div>
      <div>
        <a-button type="primary" @click="openAdd(1)"> 新增 </a-button>
      </div>
    </div>
    <div class="table-body">
      <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
      <a-table
        :row-key="(record) => record.statisticsId"
        :pagination="paginationOther"
        :data-source="dataThis"
        @change="handleTableChange"
      >
        <a-table-column
          width="300px"
          align="center"
          key="companyName"
          title="公司"
          data-index="companyName"
        ></a-table-column>
        <a-table-column
          align="center"
          key="onGuard"
          title="在岗在编"
          data-index="onGuard"
        ></a-table-column>
        <a-table-column
          align="center"
          key="laborDispatching"
          title="劳务派遣"
          data-index="laborDispatching"
        ></a-table-column>
        <a-table-column
          align="center"
          key="serviceOutsourcing"
          title="服务外包"
          data-index="serviceOutsourcing"
        ></a-table-column>
        <a-table-column
          align="center"
          key="otherEmployees"
          title="其他从业"
          data-index="otherEmployees"
        ></a-table-column>
        <a-table-column
          align="center"
          key="time"
          title="时间"
          data-index="time"
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
    <YgChildAdd
      ref="add"
      :code="code"
      @resetModalVisible="resetModalVisible"
      :modalVisible="modalVisible"
    ></YgChildAdd>
  </div>
</template>

<script>
import YgChildAdd from './components//YgChildAdd.vue'
import { RsChildData, DelRsChildData } from '@/api/api.js'
export default {
  name: "cwChild",
  components: {
    YgChildAdd
  },
  data () {
    return {
      startTime: '',
      endTime: '',
      companyName: '',
      code: null,
      modalVisible: false,
      dataThis: [
      ],
      paginationOther: {
        pageSize: 10,
        total: 0,
        current: 1
      },
    }
  },
  activated () {
    this.getCwChildList()
  },
  created () {
    this.getCwChildList()
  },
  methods: {
    // 搜索
    search () {
      this.current = 1
      this.getCwChildList()
    },
    // 选择日期
    onChange (date, dateString) {
      this.startTime = dateString[0] ? dateString[0] : null
      this.endTime = dateString[1] ? dateString[1] : null
      this.current = 1
      this.getCwChildList()
    },
    // 关闭弹框
    resetModalVisible () {
      this.modalVisible = false
    },
    // 打开弹框
    openAdd (code) {
      this.code = code
      this.modalVisible = true
    },
    // 分页
    handleTableChange (current) {
      this.paginationOther.current = current.current
      this.paginationOther.pageSize = current.pageSize
      this.getCwChildList()
    },
    // 获取列表数据
    async getCwChildList () {
      const res = await RsChildData({
        companyName: this.companyName,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.paginationOther.pageSize,
        pageNum: this.paginationOther.current
      })
      console.log(res)
      if (res.data.code === 0) {
        this.dataThis = res.data.data.list
        this.paginationOther.total = res.data.data.total
      }
    },
    handleEdit (code, record) {
      this.modalVisible = true
      this.code = code
      this.$refs.add.getDtail(record.statisticsId)
    },
    // 删除
    async removeLineRecordById (record) {
      await DelRsChildData(record.statisticsId)
      this.$message.success('删除成功')
      this.getCwChildList()
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
