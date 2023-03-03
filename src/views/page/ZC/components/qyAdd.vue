<template>
  <a-modal
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
          <a-form-model-item label="区域" prop="regionName">
            <a-input v-model="form.regionName" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="时间" prop="updateTime">
            <a-date-picker
              :format="dateFormat"
              v-model="form.updateTime"
              style="width: 100%"
              mode="date"
              placeholder="时间"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="商业" prop="business">
            <a-input v-model="form.business" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="办公" prop="work">
            <a-input v-model="form.work" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="公寓" prop="apartment">
            <a-input v-model="form.apartment" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="车位" prop="parkingLot">
            <a-input v-model="form.parkingLot" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="可出租" prop="rentable">
            <a-input v-model="form.rentable" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="已出租" prop="rented">
            <a-input v-model="form.rented" allowClear></a-input>
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
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="收缴率" prop="collectionRate">
            <a-input v-model="form.collectionRate" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="租赁点数量" prop="leaseNum">
            <a-input v-model="form.leaseNum" allowClear></a-input>
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
import { getCompanyList, AddQyData, getQyDetail } from '@/api/api.js'
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
        updateTime: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        business: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        work: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        apartment: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        rented: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        rentable: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        companyId: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        parkingLot: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        collectionRate: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        leaseNum: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        regionName: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        rate: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
      },
      form: {
        regionName: '',
        updateTime: '',
        business: '',
        work: '',
        apartment: '',
        rented: '',
        rentable: '',
        companyId: '',
        parkingLot: '',
        collectionRate: '',
        leaseNum: '',
        rate: ''
      }
    }
  },
  created() {
    this.getcompany()
  },
  methods: {
    onChange(date, dateString) {
      this.form.updateTime = dateString
    },
    // 修改竪鋸回顯
    async getDtail(id) {
      const res = await getQyDetail(id)
      this.form = res.data.data
    },
    // 获取所有公司
    async getcompany() {
      const res = await getCompanyList(1)
      this.companyData = res.data.data
    },
    async handleSubmit() {
      try {
        if (this.form.updateTime) {
          // this.form.updateTime = moment(this.form.updateTime, 'YYYY-MM-DD')
          this.form.updateTime = moment(this.form.updateTime).format(this.dateFormat)
          // this.form.updateTime = moment(this.form.updateTime, 'YYYY-MM-DD')
        }
        await this.$refs.formRef.validate()
        await AddQyData(this.form)
        if (this.code === 2) {
          this.$message.success('修改成功')
        } else {
          this.$message.success('新增成功')
        }
        this.$parent.getDataList()
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
        regionName: '',
        address: '',
        updateTime: '',
        business: '',
        work: '',
        apartment: '',
        rented: '',
        rentable: '',
        companyId: '',
        parkingLot: '',
        collectionRate: '',
        leaseNum: '',
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
