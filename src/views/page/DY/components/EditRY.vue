<template>
  <a-modal
    title="修改"
    :visible="EditVisible"
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
          <a-button type="primary" @click="handleSubmit">修改</a-button>
          <a-button @click="handleCancel">取消</a-button>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { AddDjpeople, getDetailPeople, getDjryData } from '@/api/api.js'
export default {
  name: "reportAdd",
  props: {
    EditVisible: Boolean,
    RecordId: Number
  },
  data () {
    return {
      rules: {
        gender: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        birthday: [{ required: true, message: '该选项必填!', trigger: ['blur', 'change'] }],
        state: [{ required: true, message: '该选项必填!', trigger: 'change' }],
        partyType: [{ required: true, message: '该选项必填!', trigger: 'change' }],
        joinPartyTime: [{ required: true, message: '该选项必填!', trigger: ['blur', 'change'] }],
        organizationId: [{ required: true, message: '该选项必填!', trigger: 'change' }],
      },
      // 个人详情数据
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
    // 数据回显
    async getPeopleDetail (id) {
      try {
        const res = await getDetailPeople(id)
        const data = res.data.data
        // this.dataList.gender = data.gender
        // this.
        this.dataList = data
      } catch (error) {
        console.log(error)
      }
    },
    // 提交修改
    async handleSubmit () {
      try {
        await this.$refs.formRef.validate()
        this.dataList.joinPartyTime = moment(this.dataList.joinPartyTime).format(this.dateFormat)
        this.dataList.birthday = moment(this.dataList.birthday).format(this.dateFormat)
        await AddDjpeople(this.dataList)
        this.$message.success('修改成功')
        // this.$emit('update:EditVisible', false)
        this.$emit('resetModalVisible', false)
      } catch (error) {
        console.log(error)
      }
    },
    handleCancel () {
      // this.$emit('update:EditVisible', false)
      this.$emit('resetModalVisible', false)
    }
  }
}
</script>

<style scoped>
::v-deep .item {
  width: 100%;
}
.ant-form-item-label {
  text-align: left;
}
.err {
  border-color: #f62f2f !important;
}
</style>
