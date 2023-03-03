<template>
  <a-modal
    class="modal"
    :title="code === 2 ? '修改' : '新增'"
    :visible="modalVisible"
    @cancel="handleCancel"
    footer=""
    width="700px"
  >
    <a-form-model
      :rules="rules"
      ref="formRef"
      :model="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row>
        <a-form-model-item label="公司名称" prop="companyId">
          <a-select v-model="form.companyId" allowClear>
            <a-select-option
              v-for="item in companyData"
              :key="item.companyId"
              :value="item.companyId"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-row>
      <a-row>
        <a-form-model-item label="二级公司名称" prop="subsidiaryName">
          <a-input v-model="form.subsidiaryName" allowClear></a-input>
        </a-form-model-item>
      </a-row>
      <a-row>
        <a-form-model-item label="时间" prop="uploadTime">
          <a-date-picker
            :format="dateFormat"
            v-model="form.uploadTime"
            mode="date"
            style="width: 100%"
            placeholder="时间"
          />
        </a-form-model-item>
      </a-row>
      <a-row>
        <a-form-model-item label="出租率" prop="rentalRate">
          <a-input v-model="form.rentalRate" allowClear></a-input>
        </a-form-model-item>
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
import { saveRoomRental, getRoomRentalDetail, updateRoomRental } from '@/api/api.js'
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
      companyData: [
        { name: '上海上勤景苑酒店管理有限公司', companyId: 8 },
        { name: '上海上勤酒店管理有限公司', companyId: 7 }
      ],
      rules: {
        companyId: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        subsidiaryName: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        uploadTime: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        rentalRate: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] },
        {
          pattern: /^\d+\.?\d{0,2}%$/
          , message: '必须为百分比格式', trigger: ['blur']
        }],
      },
      form: {
        companyId: '',
        subsidiaryName: '',
        uploadTime: '',
        rentalRate: '',
      }
    }
  },
  created () {
    // this.getcompany()
  },
  mounted () {
    // this.form = this.zcDetail
  },
  methods: {
    // 修改竪鋸回顯
    async getDtail (id) {
      const res = await getRoomRentalDetail(id)
      this.form = res.data.data
    },
    // // 获取所有公司
    // async getcompany () {
    //   const res = await getCompanyList(1)
    //   this.companyData = res.data.data
    // },
    async handleSubmit () {
      if (this.form.uploadTime) {
        this.form.uploadTime = moment(this.form.uploadTime, 'YYYY-MM-DD')
        this.form.uploadTime = moment(this.form.uploadTime).format(this.dateFormat)
        // this.form.time = moment(this.form.time, 'YYYY-MM-DD')
      }
      try {
        await this.$refs.formRef.validate()
        if (this.code === 1) {
          const res = await saveRoomRental(this.form)
          if (res.data.code === 0) {
            this.$emit('resetModalVisible', false)
            this.$refs.formRef.resetFields()
            this.$message.success('新增成功')
            this.$parent.getdRateList()
          }
        } else {
          const res = await updateRoomRental(this.form)
          if (res.data.code === 0) {
            this.$emit('resetModalVisible', false)
            this.$refs.formRef.resetFields()
            this.$message.success('修改成功')
            this.$parent.getdRateList()
          }
        }

      } catch (error) {
        console.log(error)
      }
      // try {
      //   await this.$refs.formRef.validate()
      //   if (this.code === 2) {
      //     await editSubData(this.form)
      //     this.$message.success('修改成功')
      //   } else {
      //     await addSubData(this.form)
      //     this.$message.success('新增成功')
      //   }
      //   this.$emit('resetModalVisible', false)
      //   this.$refs.formRef.resetFields()
      //   this.$parent.getSubList()
      // } catch (error) {
      //   console.log(error)
      // }
    },
    handleCancel () {
      // this.$emit('update:modalVisible', false)
      this.$emit('resetModalVisible', false)
      this.$refs.formRef.resetFields()
      this.form = {
        companyId: '',
        subsidiaryName: '',
        uploadTime: '',
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
