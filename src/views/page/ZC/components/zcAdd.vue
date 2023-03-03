<template>
  <a-modal
    :title="code === '2' ? '修改' : '新增'"
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
          <a-form-model-item label="区" prop="regionName">
            <a-input v-model="form.regionName" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="地址" prop="address">
            <a-input v-model="form.address" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="面积" prop="area">
            <a-input v-model="form.area" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="租赁类型" prop="assetTypeName">
            <a-input v-model="form.assetTypeName" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="所属公司" prop="companyId">
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
          <a-form-model-item label="可出租" prop="rentable">
            <a-input v-model="form.rentable" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="已出租" prop="rented">
            <a-input v-model="form.rented" allowClear></a-input>
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
// import moment from 'moment'
import { getCompanyList, addZlData, getzlDetail } from '@/api/api.js'
export default {
  name: "zcAdd",
  props: {
    modalVisible: {
      type: Boolean
    },
    code: {
      type: String
    }
  },
  data () {
    return {
      companyData: [],
      rules: {
        address: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        area: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        assetTypeName: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        companyId: [{ required: true, message: '该选项必填！', trigger: 'change', type: 'number' }],
        regionName: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        rentable: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        rented: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
      },
      form: {
        address: '',
        area: '',
        assetTypeName: '',
        companyId: '',
        regionName: '',
        rentable: '',
        rented: ''
      }
    }
  },
  mounted () {
    this.getcompany()
  },
  methods: {
    // 修改竪鋸回顯
    async getDtail (id) {
      const res = await getzlDetail(id)
      this.form = res.data.data
    },
    // 获取所有公司
    async getcompany () {
      const res = await getCompanyList(1)
      this.companyData = res.data.data
    },
    async handleSubmit () {
      try {
        await this.$refs.formRef.validate()
        await addZlData(this.form)
        if (this.code === '2') {
          this.$message.success('修改成功')
        } else {
          this.$message.success('新增成功')
        }
        this.$parent.tableShow()
        this.$refs.formRef.resetFields()
        // this.$emit('update:modalVisible', false)
        this.$emit('resetModalVisible', false)
      } catch (error) {
        console.log(error)
      }
    },
    handleCancel () {
      // this.$emit('update:modalVisible', false)
      this.$refs.formRef.resetFields()
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
