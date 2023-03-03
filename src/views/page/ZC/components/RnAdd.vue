<template>
  <a-modal
    class="modal"
    :title="code === 2 ? '修改' : '新增'"
    :visible="modalVisible"
    @cancel="handleCancel"
    footer=""
    width="750px"
  >
    <a-form-model
      :rules="rules"
      ref="formRef"
      :model="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="公司名称" prop="companyId">
            <a-select v-model="form.companyId" allowClear>
              <a-select-option
                v-for="item in companyData"
                :key="item.companyId"
                :value="item.companyId"
              >
                {{ item.nameAbbr }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="时间" prop="time">
            <a-date-picker
              :format="dateFormat"
              v-model="form.time"
              mode="date"
              style="width: 100%"
              placeholder="时间"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="应收" prop="receivable">
            <a-input v-model="form.receivable" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="实收" prop="netReceipts">
            <a-input v-model="form.netReceipts" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="出租率" prop="rate">
            <a-input v-model="form.rate" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="收缴率" prop="collectionRate">
            <a-input v-model="form.collectionRate" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="待收" prop="received">
            <a-input v-model="form.received" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12"> </a-col>
      </a-row>
      <a-row>
        <a-col :span="12"> </a-col>
        <a-col :span="12">
          <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
            <a-button type="primary" @click="handleSubmit"> 确认 </a-button>
            <a-button style="margin-left: 10px" @click="handleCancel">
              取消
            </a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { getCompanyList, AddRnData, getRnDetail } from '@/api/api.js'
export default {
  name: "zcAdd",
  props: {
    modalVisible: {
      type: Boolean
    },
    code: {
      type: Number
    }
  },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      companyData: [],
      rules: {
        companyId: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        time: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        receivable: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        netReceipts: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        rate: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        collectionRate: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        received: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
      },
      form: {
        companyId: '',
        time: null,
        receivable: '',
        netReceipts: '',
        rate: '',
        collectionRate: '',
        received: ''
      }
    }
  },
  created() {
    this.getcompany()
  },
  mounted() {
    // this.form = this.zcDetail
  },
  methods: {
    // 修改竪鋸回顯
    async getDtail(id) {
      const res = await getRnDetail(id)
      this.form = res.data.data
    },
    // // 获取所有公司
    async getcompany() {
      const res = await getCompanyList(1)
      this.companyData = res.data.data
    },
    async handleSubmit() {
      if (this.form.time) {
        this.form.time = moment(this.form.time, 'YYYY-MM-DD')
        this.form.time = moment(this.form.time).format(this.dateFormat)
        // this.form.time = moment(this.form.time, 'YYYY-MM-DD')
      }
      try {
        await this.$refs.formRef.validate()
        await AddRnData(this.form)
        this.$parent.getDataList()
        if (this.code === 2) {
          this.$message.success('修改成功')

        } else {
          this.$message.success('新增成功')
        }
        this.$emit('resetModalVisible', false)
        this.$refs.formRef.resetFields()
      } catch (error) {
        console.log(error)
      }
    },
    handleCancel() {
      // this.$emit('update:modalVisible', false)
      this.$emit('resetModalVisible', false)
      this.$refs.formRef.resetFields()
      this.$refs.formRef.clearValidate() //移除校验结果
      this.form = {
        companyId: '',
        time: '',
        receivable: '',
        netReceipts: '',
        rate: '',
        collectionRate: '',
        received: ''
      }
    }
  }
}
</script>

<style scoped>
.err {
  border-color: #f62f2f !important;
}
</style>
