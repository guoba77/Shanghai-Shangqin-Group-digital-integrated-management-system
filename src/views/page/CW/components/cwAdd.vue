<template>
  <a-modal
    title="新增"
    :visible="modalVisible"
    footer=""
    width="650px"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="子公司" prop="companyId">
            <a-select v-model="form.companyId" companyId>
              <a-select-option
                v-for="item in gsList"
                :key="item.companyId"
                :value="item.companyId"
                >{{ item.name }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="金额" prop="figure">
            <a-input
              style="width: 100%"
              v-model="form.figure"
              :maxLength="50"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="科目：" prop="subject">
            <a-input v-model="form.subject" allowClear> </a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="统计时间：" prop="statisticsTime">
            <a-date-picker
              v-model="form.statisticsTime"
              style="width: 100%"
              placeholder="统计时间"
              :format="dateFormat"
            />
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
import { formateDate } from '../../../../utils/data.js'
import { getAddCW, getCompanyList, getRsAddOREdit } from '../../../../api/api'
import moment from 'moment'
export default {
  name: "reportAdd",
  props: {
    modalVisible: Boolean
  },
  watch: {
    modalVisible (val) {
      this.show()
    }
  },
  data () {
    return {
      formLayout: 'inline',
      dateFormat: 'YYYY-MM-DD',
      rules: {
        companyId: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        figure: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        subject: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        statisticsTime: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }]
      },
      form: {
        companyId: '',
        figure: '',
        subject: '',
        statisticsTime: ''
      },
      gsList: [],
      kmList: [
        { name: '营业收入' },
        { name: '利润总额' },
        { name: '成本情况' }
      ],
      companyId: '',
      subject: '',
      figure: '',
      statisticsTime: ''
    }
  },
  // 时间过滤器
  filters: {
    formateDate (time) {
      let date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd')
    }
  },
  mounted () {
  },
  methods: {
    show () {
      // 获取公司名称
      getCompanyList(1).then((res) => {
        this.gsList = res.data.data
      })
    },
    onChange (date, dateString) {
      this.statisticsTime = dateString
    },
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          getAddCW({
            companyId: this.form.companyId,
            subject: this.form.subject,
            figure: this.form.figure,
            statisticsTime: moment(this.form.statisticsTime).format(this.dateFormat)
          }).then((res) => {
            if (res.data.code === 0) {
              this.$message.success('新增成功')
              this.$refs.ruleForm.resetFields()
              this.$emit('resetModalVisible', false)
            } else {
              this.$message.error('新增失败')
              this.$refs.ruleForm.resetFields()
              this.$emit('resetModalVisible', false)
            }
          })
        } else {
          this.$refs.ruleForm.resetFields()
          return false
        }
      })
    },
    handleCancel () {
      this.$refs.ruleForm.resetFields()
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
