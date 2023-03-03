<template>
  <div class="cwsj">
    <div class="head">
      <div></div>
      <div>
        <a-button type="primary"> 下载 </a-button>
      </div>
    </div>
    <div class="table-body">
      <!--      :row-key="(record, index) => (paginationOther.pageNum - 1) * paginationOther.pageSize + index + 1"-->
      <a-table
        :row-key="(record) => record.id"
        :pagination="paginationOther"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :data-source="dataThis"
      >
        <a-table-column
          align="center"
          key="g1"
          title="财务数据条数"
          data-index="g1"
        ></a-table-column>
        <a-table-column
          align="center"
          key="g2"
          title="财务数据文件名"
          data-index="g2"
        ></a-table-column>
        <a-table-column
          align="center"
          key="g9"
          title="上传人"
          data-index="g9"
        ></a-table-column>
        <a-table-column
          align="center"
          key="g10"
          title="上传时间"
          data-index="g10"
        ></a-table-column>
        <!--        <a-table-column align="center" width="150px" key="action" title="操作">-->
        <!--          <template slot-scope="text, record">-->
        <!--            <a-divider type="vertical" />-->
        <!--            <a title="修改" @click="handleEdit(record)"><a-icon type="form"/> </a>-->
        <!--            <a-divider type="vertical" />-->
        <!--            <a-popconfirm title="确认删除该记录吗?" ok-text="是" cancel-text="否" @confirm="removeLineRecordById(record)">-->
        <!--              <a title="删除" :style="{ color: '#f62f2f' }"><a-icon type="delete"/></a>-->
        <!--            </a-popconfirm>-->
        <!--          </template>-->
        <!--        </a-table-column>-->
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "cw",
  data () {
    return {
      selectedRowKeys: [],
      dataThis: [
        { id: '1', g1: '1', g2: '子公司1', g3: '2021-8-31', g4: '289000', g5: '30000', g6: '200000', g7: '5', g8: '6', g9: '小王', g10: '2021-8-31' },
        { id: '2', g1: '2', g2: '子公司2', g3: '2021-8-30', g4: '122988', g5: '35000', g6: '200000', g7: '5', g8: '6', g9: '小李', g10: '2021-8-31' },
        { id: '3', g1: '3', g2: '子公司3', g3: '2021-8-29', g4: '789932', g5: '35000', g6: '100000', g7: '5', g8: '6', g9: '小周', g10: '2021-8-31' },
        { id: '4', g1: '4', g2: '子公司4', g3: '2021-8-31', g4: '435432', g5: '35000', g6: '150000', g7: '5', g8: '6', g9: '小站', g10: '2021-8-31' },
        { id: '5', g1: '5', g2: '子公司5', g3: '2021-8-31', g4: '233242', g5: '40000', g6: '200000', g7: '5', g8: '6', g9: '小吴', g10: '2021-8-31' },
        { id: '6', g1: '6', g2: '子公司6', g3: '2021-8-31', g4: '2233423', g5: '40000', g6: '180000', g7: '5', g8: '6', g9: '小赵', g10: '2021-8-31' },
        { id: '7', g1: '7', g2: '子公司7', g3: '2021-8-31', g4: '2324323', g5: '40000', g6: '220000', g7: '5', g8: '6', g9: '燕燕', g10: '2021-8-31' },
        { id: '8', g1: '8', g2: '子公司8', g3: '2021-8-31', g4: '2345456', g5: '40000', g6: '340000', g7: '5', g8: '6', g9: '小刘', g10: '2021-8-31' },
        { id: '9', g1: '9', g2: '子公司9', g3: '2021-8-31', g4: '266578', g5: '34000', g6: '330000', g7: '5', g8: '6', g9: '小军', g10: '2021-8-31' }
      ],
      paginationOther: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        current: 0
      },
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    },
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleEdit (record) {

    },
    removeLineRecordById (record) {

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
