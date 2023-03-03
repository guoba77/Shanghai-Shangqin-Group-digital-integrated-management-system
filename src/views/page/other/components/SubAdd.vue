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
          <a-form-model-item label="内容" prop="content">
            <a-input v-model="form.content" allowClear></a-input>
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
        <a-col :span="12">
          <a-form-model-item label="值" prop="value">
            <a-input v-model="form.value" allowClear></a-input>
          </a-form-model-item>
        </a-col>
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
import { getCompanyList, addSubData, getSubDetail, editSubData } from '@/api/api.js'
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
        content: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        updateTime: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        value: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
      },
      form: {
        companyId: '',
        content: '',
        updateTime: '',
        value: '',
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
      const res = await getSubDetail(id)
      this.form = res.data.blocSatisfaction
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
        // this.form.time = moment(this.form.time, 'YYYY-MM-DD')
      }
      try {
        await this.$refs.formRef.validate()
        if (this.code === 2) {
          await editSubData(this.form)
          this.$message.success('修改成功')
        } else {
          await addSubData(this.form)
          this.$message.success('新增成功')
        }
        this.$emit('resetModalVisible', false)
        this.$refs.formRef.resetFields()
        this.$parent.getSubList()
      } catch (error) {
        console.log(error)
      }
    },
    handleCancel() {
      // this.$emit('update:modalVisible', false)
      this.$emit('resetModalVisible', false)
      this.$refs.formRef.resetFields()
      this.form = {
        companyId: '',
        content: '',
        updateTime: '',
        value: '',
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
