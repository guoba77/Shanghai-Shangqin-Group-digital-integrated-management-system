<template>
  <a-modal
    :title="code === 2 ? '修改' : '新增'"
    :visible="modalVisible"
    @cancel="handleCancel"
    @close="handleCancel"
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
          <a-form-model-item label="支部名称" prop="organizationId">
            <a-select v-model="form.organizationId" allowClear>
              <a-select-option
                v-for="item in CertificateData"
                :key="item.id"
                :value="item.id"
              >
                {{ item.organizationCode }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="在职党员" prop="onJobNumber">
            <a-input v-model="form.onJobNumber" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="退休党员数" prop="retireNumber">
            <a-input v-model="form.retireNumber" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="时间" prop="statisticsTime">
            <a-date-picker
              :format="dateFormat"
              mode="date"
              v-model="form.statisticsTime"
              style="width: 100%"
              placeholder="时间"
            />
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
import { getCompanyList, getDjryData, AddPMDevData, getPMDevDetail } from '@/api/api.js'
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
  data () {
    return {
      dateFormat: 'YYYY-MM-DD',
      CertificateData: [],
      companyData: [],
      rules: {
        companyId: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        onJobNumber: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        retireNumber: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        statisticsTime: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        organizationId: [{ required: true, message: '该选项必填！', trigger: 'change' }],
      },
      form: {
        companyId: '',
        onJobNumber: '',
        retireNumber: '',
        statisticsTime: '',
        organizationId: ''
      }
    }
  },
  created () {
    this.getcompany()
    this.getCertificate()
  },
  methods: {
    // 修改竪鋸回顯
    async getDtail (situationId) {
      const res = await getPMDevDetail(situationId)
      this.form = res.data.data
    },
    // 获取所有支部
    async getCertificate () {
      const res = await getDjryData()
      this.CertificateData = res.data.data
    },
    // 获取所有公司
    async getcompany () {
      const res = await getCompanyList(1)
      this.companyData = res.data.data
    },
    async handleSubmit () {
      try {
        if (this.form.statisticsTime) {
          // this.form.updateTime = moment(this.form.updateTime, 'YYYY-MM-DD')
          this.form.statisticsTime = moment(this.form.statisticsTime).format(this.dateFormat)
          // this.form.updateTime = moment(this.form.updateTime, 'YYYY-MM-DD')
        }
        await this.$refs.formRef.validate()
        await AddPMDevData(this.form)
        if (this.code === 2) {
          this.$message.success('修改成功')
        } else {
          this.$message.success('新增成功')
        }
        this.$parent.getPMDevList()
        this.$emit('resetModalVisible', false)
        this.$refs.formRef.resetFields()
      } catch (error) {
        console.log(error)
      }
    },
    handleCancel () {
      this.$refs.formRef.resetFields()
      this.$emit('resetModalVisible', false)
      this.form = {
        companyId: '',
        onJobNumber: '',
        retireNumber: '',
        statisticsTime: '',
        organizationId: ''
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
