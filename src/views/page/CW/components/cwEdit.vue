<template>
  <a-modal
    title="修改"
    :visible="modalVisible"
    footer=""
    width="400px"
    @cancel="handleCancel"
  >
    <a-form :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
      <a-row>
        <a-col :span="20">
          <a-form-item label="金额">
            <a-input style="width: 100%" :maxLength="50" v-model="figure" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="14" :push="6">
          <a-button type="primary" @click="handleSubmit">保存</a-button>
          <a-button @click="handleCancel">取消</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { getUpdateCW } from '../../../../api/api'
export default {
  name: "reportAdd",
  props: {
    modalVisible: Boolean,
    editList: Object
  },
  data() {
    return {
      formLayout: 'inline',
      dateFormat: 'YYYY-MM-DD',
      figure: ''
    }
  },
  watch: {
    modalVisible(val) {
      this.showList()
      this.figure = this.editList.figure
    }
  },
  methods: {
    showList() {
    },
    handleSubmit() {
      getUpdateCW({
        financialId: this.editList.financialId,
        companyId: this.editList.companyId,
        subject: this.editList.subject,
        figure: this.figure,
        statisticsTime: this.editList.statisticsTime
      }).then((res) => {
        if (res.data.code === 0) {
          this.$emit('resetModalVisible', false)
          this.$message.success('修改成功！')
        }
      })
    },
    handleCancel() {
      this.$emit('resetModalVisible', false)
    }
  }
}
</script>

<style scoped>
.err {
  border-color: #f62f2f !important;
}
</style>
