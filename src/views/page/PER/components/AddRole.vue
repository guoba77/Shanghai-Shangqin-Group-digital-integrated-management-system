<template>
  <!-- <a-modal
    title="新增"
    :visible="modalVisible1"
    width="650px"
    @cancel="handleCancel"
    @close="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row>
        <a-form-model-item label="用户名" prop="username">
          <a-input
            style="width: 100%"
            v-model="form.username"
            :maxLength="50"
          />
        </a-form-model-item>
      </a-row>
      <a-row>
        <a-form-model-item label="邮箱" prop="email">
          <a-input style="width: 100%" v-model="form.email" :maxLength="50" />
        </a-form-model-item>
      </a-row>
      <a-row>
        <a-form-model-item label="手机号" prop="mobile">
          <a-input v-model="form.mobile" allowClear> </a-input>
        </a-form-model-item>
      </a-row>
      <a-row>
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
      </a-row>
      <template slot="footer">
        <a-button key="submit" type="primary" @click="handleSubmit">
          确定
        </a-button>
        <a-button key="back" @click="handleCancel"> 取消 </a-button>
      </template>
    </a-form-model>
  </a-modal> -->
  <a-modal
    class="modal"
    :title="code === 1 ? '新增角色' : '修改角色'"
    :visible="modalVisible1"
    @cancel="handleCancel"
    @close="handleCancel"
    width="600px"
  >
    <a-form-model
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-row>
        <a-form-model-item label="用户名" prop="username">
          <a-input
            style="width: 100%"
            v-model.trim="form.username"
            :maxLength="50"
            allowClear
          />
        </a-form-model-item>
      </a-row>
      <a-row>
        <a-form-model-item v-if="code === 1" label="密码" prop="password">
          <a-input
            type="password"
            style="width: 100%"
            v-model.trim="form.password"
            :maxLength="50"
            allowClear
          />
        </a-form-model-item>
      </a-row>
      <a-row>
        <a-form-model-item label="邮箱" prop="email">
          <a-input
            style="width: 100%"
            v-model="form.email"
            :maxLength="50"
            allowClear
          />
        </a-form-model-item>
      </a-row>
      <a-row>
        <a-form-model-item label="手机号" prop="mobile">
          <a-input v-model="form.mobile" allowClear> </a-input>
        </a-form-model-item>
      </a-row>
      <a-row>
        <a-form-model-item label="公司" prop="companyId">
          <a-select v-model="form.companyId" companyId>
            <a-select-option
              v-for="item in gsList"
              :key="item.companyId"
              :value="item.companyId"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
      </a-row>
      <template slot="footer">
        <a-button key="submit" type="primary" @click="handleSubmit">
          确定
        </a-button>
        <a-button key="back" @click="handleCancel"> 取消 </a-button>
      </template>
    </a-form-model>
    <template slot="footer">
      <a-button key="submit" type="primary" @click="handleSubmit">
        确定
      </a-button>
      <a-button key="back" @click="handleCancel"> 取消 </a-button>
    </template>
  </a-modal>
</template>

<script>
import { getCompanyList, SaveRole, getRoleById, EditRole } from '@/api/api.js'
export default {
  name: "reportAdd",
  props: {
    modalVisible1: Boolean,
    code: Number,
  },
  data () {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      gsList: [],
      formLayout: 'inline',
      dateFormat: 'YYYY-MM-DD',
      rules: {
        companyId: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        username: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        email: [{
          required: true, message: '该选项必填！', trigger: ['blur', 'change'],
        },
        {
          pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})([,]([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6}))*$/
          , message: '邮箱格式不正确', trigger: ['blur']
        }
        ],
        mobile: [
          { required: true, message: '该选项必填！', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur'] }
        ],
        password: [
          { required: true, message: '该选项必填！', trigger: ['blur', 'change'] },
          { min: 8, message: '用户密码至少为8位', trigger: ['blur'] },
          { pattern: /(?=.*[a-z_])(?=.*\d)(?=.*[^a-z0-9_])[\S]{8,}/i, message: '必须包括数字、字母和特殊符号', trigger: ['blur'] },

        ],
      },
      form: {
        username: '',
        email: '',
        mobile: '',
        companyId: '',
        password: ''
      },
    }
  },

  created () {
    this.getCompanyList()
  },
  methods: {
    // 数据回显
    async getRoleDetail (userId) {
      this.form.userId = userId
      const res = await getRoleById(userId)
      this.form.username = res.data.user.username
      this.form.email = res.data.user.email
      this.form.mobile = res.data.user.mobile
      this.form.companyId = res.data.user.companyId

    },
    // 获取子公司列表
    async getCompanyList () {
      const res = await getCompanyList(1)
      this.gsList = res.data.data
    },
    async handleSubmit () {
      try {
        await this.$refs.formRef.validate()
        if (this.code === 1) {
          const res = await SaveRole(this.form)
          if (res.data.code === 0) {
            this.$message.success('新增成功')
            this.$parent.getRoleList()
          } else {
            this.$message.warning(res.data.msg)
          }
        } else if (this.code === 2) {
          const res = await EditRole(this.form)
          if (res.data.code === 0) {
            this.$message.success('修改成功')
            this.$parent.getRoleList()
          } else {
            this.$message.warning(res.data.msg)
          }
        }

        this.$emit('resetModalVisible1', false)
        this.$refs.formRef.resetFields()

      } catch (error) {
        console.log(error)
      }
    },
    handleCancel () {
      this.$refs.formRef.resetFields()
      this.$emit('resetModalVisible1', false)
      this.form = {
        username: '',
        email: '',
        mobile: '',
        companyId: '',
        password: ''
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
