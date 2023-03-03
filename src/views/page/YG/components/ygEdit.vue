<template>
  <a-modal
    title="修改"
    :visible="modalVisible"
    footer=""
    width="800px"
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
          <a-form-model-item label="单位" prop="companyName">
            <a-select v-model="form.companyName" allowClear>
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
          <a-form-model-item label="出生日期" prop="birthday">
            <a-date-picker
              style="width: 100%"
              v-model="form.birthday"
              placeholder="请选择出生日期"
              :format="dateFormat"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="性别：" prop="gender">
            <a-select v-model="form.gender" allowClear>
              <a-select-option v-for="item in genderList" :key="item.value">{{
                item.name
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="入职时间：" prop="entryTime">
            <a-date-picker
              v-model="form.entryTime"
              style="width: 100%"
              placeholder="请选择入职时间"
              :format="dateFormat"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="学历：" prop="degreeCategoryName">
            <a-select v-model="form.degreeCategoryName" allowClear>
              <a-select-option v-for="item in xlList" :key="item.id">{{
                item.degreeName
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="学位：" prop="degreeName">
            <a-select v-model="form.degreeName" allowClear>
              <a-select-option v-for="item in xwList" :key="item.title">{{
                item.title
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="证书名称：" prop="certificateName">
            <a-select v-model="form.certificateName" allowClear>
              <a-select-option
                v-for="item in zsList"
                :key="item.certificateId"
                >{{ item.certificateName }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="证书等级：" prop="certificateGradeName">
            <a-select v-model="form.certificateGradeName" allowClear>
              <a-select-option v-for="item in djList" :key="item.gradeId">{{
                item.gradeName
              }}</a-select-option>
            </a-select>
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
import { getRsXq, getCompanyList, getSelectCertificateList, getSelectCertificateGradeList, getSelectXl, getRsAddOREdit } from '../../../../api/api'
export default {
  name: "reportAdd",
  props: {
    modalVisible: Boolean,
    infoId: Number,
    editList: Object
  },
  data () {
    return {
      formLayout: 'inline',
      dateFormat: 'YYYY-MM-DD',
      defaultValue: '请选择时间',
      rules: {
        companyName: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        birthday: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        gender: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        entryTime: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        degreeCategoryName: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        degreeName: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        certificateName: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        certificateGradeName: [{ required: true, message: '该选项必填！', trigger: 'change' }],
      },
      form: {
        companyName: '',
        birthday: '',
        gender: '',
        entryTime: '',
        degreeCategoryName: '',
        degreeName: '',
        certificateName: '',
        certificateGradeName: ''
      },
      hyList: [{ value: 1, name: '已婚' }, { value: 2, name: '未婚' }],
      dyList: [{ value: 0, name: '否' }, { value: 1, name: '是' }],
      genderList: [{ value: 1, name: '男' }, { value: 2, name: '女' }],
      zwList: [],
      gsList: [],
      xlList: [],
      xwList: [
        { title: '硕士学位' },
        { title: '文学学位' },
        { title: '学士学位' }
      ],
      zsList: [],
      djList: []
    }
  },
  watch: {
    modalVisible (val) {
      getRsXq(this.infoId).then((res) => {
      })
      this.showList()
      this.form.companyName = this.editList.companyId
      this.form.birthday = this.editList.birthday
      this.form.gender = this.editList.gender
      this.form.entryTime = this.editList.entryTime
      this.form.degreeCategoryName = this.editList.degreeCategoryId
      this.form.degreeName = this.editList.degreeName
      this.form.certificateName = this.editList.certificateId
      this.form.certificateGradeName = this.editList.certificateGradeId
    }
  },
  methods: {
    showList () {
      // 获取公司名称
      getCompanyList(1).then((res) => {
        this.gsList = res.data.data
      })
      // 职业技能资格证书名称列表
      getSelectCertificateList().then((res) => {
        this.zsList = res.data.data
      })
      // 职业技能资格证书等级列表
      getSelectCertificateGradeList().then((res) => {
        this.djList = res.data.data
      })
      // 获取学历
      getSelectXl().then((res) => {
        this.xlList = res.data.data
      })
    },
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          getRsAddOREdit({
            infoId: this.editList.infoId,
            companyId: this.form.companyName,
            birthday: moment(this.form.birthday).format(this.dateFormat),
            gender: this.form.gender,
            entryTime: moment(this.form.entryTime).format(this.dateFormat),
            degreeCategoryId: this.form.degreeCategoryName,
            degreeName: this.form.degreeName,
            certificateId: this.form.certificateName,
            certificateGradeId: this.form.certificateGradeName,
          }).then((res) => {
            if (res.data.code === 0) {
              this.$message.success('修改成功')
              this.$emit('resetModalVisible', false)
            } else {
              this.$message.error('修改失败')
              this.$emit('resetModalVisible', false)
            }
          })
        } else {
          return false
        }
      })
    },
    handleCancel () {
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
