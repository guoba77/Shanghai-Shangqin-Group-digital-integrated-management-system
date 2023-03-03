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
          <a-form-model-item label="房间种类" prop="speciesTypeName">
            <a-input v-model="form.speciesTypeName" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="数量" prop="num">
            <a-input v-model="form.num" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="状态" prop="status">
            <a-input v-model="form.status" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="时间" prop="updateTime">
            <a-date-picker
              :format="dateFormat"
              v-model="form.updateTime"
              mode="date"
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
import { getCompanyList, addSubsidiaryData, getSubsidiaryDetail, editSubsidiaryData } from '@/api/api.js'
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
        speciesTypeName: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        num: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        status: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        updateTime: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
      },
      form: {
        speciesTypeName: '',
        speciesType: 2,
        num: '',
        companyId: '',
        status: '',
        updateTime: '',
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
      const res = await getSubsidiaryDetail(id)
      this.form = res.data.blocCar
    },
    // // 获取所有公司
    async getcompany() {
      const res = await getCompanyList(1)
      this.companyData = res.data.data
    },
    async handleSubmit() {
      if (this.form.updateTime) {
        this.form.updateTime = moment(this.form.updateTime, 'YYYY-MM-DD')
        this.form.updateTime = moment(this.form.updateTime).format(this.dateFormat)
      }
      try {
        await this.$refs.formRef.validate()
        if (this.code === 2) {
          await editSubsidiaryData(this.form)
          this.$message.success('修改成功')
        } else if (this.code === 0) {
          await addSubsidiaryData(this.form)
          this.$message.success('新增成功')
        }
        this.$parent.getSubsidiaryList()
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
      this.form = {
        speciesType: '',
        num: '',
        companyId: '',
        status: '',
        updateTime: '',
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
