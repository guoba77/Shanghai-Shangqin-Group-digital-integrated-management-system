<template>
  <a-modal
    title="新增"
    :visible="modalVisible"
    footer=""
    width="600px"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="formRef"
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 17 }"
      :rules="rules"
      :model="dataList"
    >
      <a-form-model-item prop="organizationId" label="所属党组织">
        <a-select v-model="dataList.organizationId" allowClear>
          <a-select-option
            v-for="item in djryList"
            :value="item.id"
            :key="item.id"
            :label="item.organizationCode"
            >{{ item.organizationCode }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="性别" prop="gender">
        <a-select v-model="dataList.gender" allowClear>
          <a-select-option label="男" :value="1">男</a-select-option>
          <a-select-option label="女" :value="2">女</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="出生年月日" prop="birthday">
        <a-date-picker
          style="width: 100%"
          class="item"
          v-model="dataList.birthday"
        />
      </a-form-model-item>

      <a-form-model-item label="党员类型" prop="partyType">
        <a-select v-model="dataList.partyType" allowClear>
          <a-select-option label="正式党员" :value="1"
            >正式党员</a-select-option
          >
          <a-select-option label="预备党员" :value="2"
            >预备党员</a-select-option
          >
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="加入党组织日期" prop="joinPartyTime">
        <a-date-picker
          style="width: 100%"
          class="item"
          v-model="dataList.joinPartyTime"
        />
      </a-form-model-item>
      <a-form-model-item label="状态" prop="state">
        <a-select v-model="dataList.state" allowClear>
          <a-select-option label="在职" :value="1">在职</a-select-option>
          <a-select-option label="离职" :value="2">退休</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-row>
        <a-col :span="12"> </a-col>
        <a-col :span="12" :push="6">
          <a-button type="primary" @click="handleSubmit">确定</a-button>
          <a-button @click="handleCancel">取消</a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { AddDjpeople, getDjryData } from '@/api/api.js'
export default {
  name: "reportAdd",
  props: {
    modalVisible: Boolean
  },
  data () {
    return {
      dateFormat: 'YYYY-MM-DD',
      djryList: [],
      dataList: {
        gender: '',
        birthday: '',
        state: '',
        partyType: '',
        joinPartyTime: '',
        organizationId: null
      },
      rules: {
        gender: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        birthday: [{ required: true, message: '该选项必填!', trigger: ['blur', 'change'] }],
        state: [{ required: true, message: '该选项必填!', trigger: 'change' }],
        partyType: [{ required: true, message: '该选项必填!', trigger: 'change' }],
        joinPartyTime: [{ required: true, message: '该选项必填!', trigger: ['blur', 'change'] }],
        organizationId: [{ required: true, message: '该选项必填!', trigger: 'change' }],
      },
    }
  },
  mounted () {
    this.getDjry()
  },
  methods: {
    // 查询党组织列表
    async getDjry () {
      const res = await getDjryData()
      if (res.data.code === 0) {
        this.djryList = res.data.data
      }
    },
    // 新增提交
    async handleSubmit () {
      try {
        await this.$refs.formRef.validate()
        this.dataList.joinPartyTime = moment(this.dataList.joinPartyTime).format(this.dateFormat)
        this.dataList.birthday = moment(this.dataList.birthday).format(this.dateFormat)
        await AddDjpeople(this.dataList)
        this.$message.success('新增成功')
        // this.$emit('update:modalVisible', false)
        this.$emit('resetModalVisible', false)
        this.$refs.formRef.resetFields()
      } catch (error) {
        console.log(error)
      }
    },
    handleCancel () {
      // this.$emit('update:modalVisible', false)
      this.$emit('resetModalVisible', false)
      this.$refs.formRef.resetFields()
    }
  }
}
</script>

<style scoped>
::v-deep ant-calendar-picker-input ant-input {
  width: 100%;
}
.ant-form-item-label {
  text-align: left;
}
.err {
  border-color: #f62f2f !important;
}
</style>
