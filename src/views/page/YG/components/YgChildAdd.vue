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
          <a-form-model-item label="公司" prop="companyId">
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
          <a-form-model-item label="在岗在编" prop="onGuard">
            <a-input v-model="form.onGuard" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="劳务派遣" prop="laborDispatching">
            <a-input v-model="form.laborDispatching" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="服务外包" prop="serviceOutsourcing">
            <a-input v-model="form.serviceOutsourcing" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="其他从业" prop="otherEmployees">
            <a-input v-model="form.otherEmployees" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="时间" prop="time">
            <a-date-picker
              v-model="form.time"
              style="width: 100%"
              placeholder="请选择入职时间"
              :format="dateFormat"
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
import { getCompanyList, AddRsChildData, getRsChildDetail } from '@/api/api.js'
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
      companyData: [],
      rules: {
        companyId: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        onGuard: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        laborDispatching: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        otherEmployees: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        time: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
      },
      form: {
        companyId: '',
        onGuard: '',
        laborDispatching: '',
        otherEmployees: '',
        serviceOutsourcing: '',
        time: '',
      }
    }
  },
  created () {
    this.getcompany()
  },

  methods: {
    // 修改竪鋸回顯
    async getDtail (statisticsId) {
      const res = await getRsChildDetail(statisticsId)
      this.form = res.data.data
    },
    // 获取所有公司
    async getcompany () {
      const res = await getCompanyList(1)
      this.companyData = res.data.data
    },
    async handleSubmit () {
      if (this.form.time) {
        this.form.time = moment(this.form.time, 'YYYY-MM-DD')
        this.form.time = moment(this.form.time).format(this.dateFormat)
        // this.form.time = moment(this.form.time, 'YYYY-MM-DD')
      }
      try {
        await this.$refs.formRef.validate()
        await AddRsChildData(this.form)
        this.$parent.getCwChildList()
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
    handleCancel () {
      // this.$emit('update:modalVisible', false)
      this.$emit('resetModalVisible', false)
      this.form = {
        companyId: '',
        onGuard: '',
        laborDispatching: '',
        otherEmployees: '',
        time: '',
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
