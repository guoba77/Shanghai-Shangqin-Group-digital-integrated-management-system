<template>
  <a-modal
    class="modal"
    :title="code === 2 ? '修改' : '新增'"
    :visible="modalVisible"
    @cancel="handleCancel"
    @close="handleCancel"
    footer=""
    width="1000px"
  >
    <a-form-model
      ref="formRef"
      :rules="rules"
      :model="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="项目名称" prop="entryName">
            <a-input v-model="form.entryName" allowClear></a-input>
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
          <a-form-model-item label="建筑面积(万 m²)" prop="floorage">
            <a-input v-model="form.floorage" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :span="18" v-for="(item, index) in personList" :key="item.id">
        <a-col :span="12">
          <a-form-model-item label="负责人" prop="responsiblePerson">
            <a-input
              @input="input"
              v-model="item.responsiblePerson"
              allowClear
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="联系电话" prop="telephone">
            <a-input @input="input" v-model="item.telephone" allowClear>
              <a-icon
                v-if="index === 0"
                slot="addonAfter"
                @click="addPerson"
                type="plus-circle"
              />
              <a-icon
                v-else
                slot="addonAfter"
                @click="delPerson(item.id)"
                type="close"
              />
            </a-input>
            <!-- <a-icon @click="addPerson" class="icon" type="plus-circle" /> -->
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="业主/ 服务人数" prop="proprietor">
            <a-input v-model="form.proprietor" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label=" 业主类型" prop="proprietorTypeName">
            <a-input v-model="form.proprietorTypeName" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="经度" prop="longitude">
            <a-input v-model="form.longitude" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="维度" prop="latitude">
            <a-input v-model="form.latitude" allowClear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="所属区域" prop="regionName">
            <a-input v-model="form.regionName" allowClear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="是否显示" prop="visible">
            <a-select v-model="form.visible" allowClear>
              <a-select-option
                v-for="item in visibleDate"
                :key="item.id"
                :value="item.value"
              >
                {{ item.name }}
              </a-select-option>
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
// import moment from 'moment'
import { getCompanyList, addFwData, getFwDetail } from '@/api/api.js'
export default {
  name: "zcAdd",
  props: {
    modalVisible: {
      type: Boolean
    },
    code: {
      type: Number
    }
    // zcDetail: {
    //   type: Object,
    // }
  },
  data () {

    // let validatePass2 = (rule, value, callback) => {
    //   const res = this.validMobile(value)
    //   if (!res) {
    //     callback(new Error('Please input the password again'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      personList: [
        { id: 1, responsiblePerson: '', telephone: '' }
      ],
      visibleDate: [
        { id: 1, value: 1, name: '是' },
        { id: 2, value: 2, name: '否' }
      ],
      companyData: [],
      rules: {
        responsiblePerson: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        telephone: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        address: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        entryName: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        companyId: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        floorage: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        proprietorTypeName: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        longitude: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        latitude: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        regionName: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }],
        visible: [{ required: true, message: '该选项必填！', trigger: 'change' }],
        proprietor: [{ required: true, message: '该选项必填！', trigger: ['blur', 'change'] }]
      },
      form: {
        proprietor: '',
        address: '',
        entryName: '',
        companyId: '',
        responsiblePerson: '',
        floorage: '',
        telephone: '',
        proprietorTypeName: '',
        longitude: '',
        latitude: '',
        regionName: '',
        visible: ''
      }
    }
  },
  created () {
    this.getcompany()
  },
  mounted () {
    // this.form = this.zcDetail
  },
  methods: {

    input () {
      const person = []
      const phone = []
      this.personList.forEach(item => {
        person.push(item.responsiblePerson)
        phone.push(item.telephone)
      })
      this.form.responsiblePerson = person.join(',')
      this.form.telephone = phone.join(',')
    },
    delPerson (id) {
      for (let i = 0; i < this.personList.length; i++) {
        if (this.personList[i].id == id) {
          this.personList.splice(i, 1)
        }
      }
    },
    // 添加负责人
    addPerson () {
      const num = this.personList[this.personList.length - 1].id
      this.personList.push({ id: num + 1, responsiblePerson: '', telephone: '' })
    },
    // 校验手机号
    validMobile (mobile) {
      return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(mobile) // 校验手机号
    },
    // 修改竪鋸回顯
    async getDtail (id) {
      const res = await getFwDetail(id)
      this.form = res.data.data
      const a = this.getnewarr(res.data.data.telephoneList, res.data.data.responsiblePersonList)
      for (const key in a) {
        const num = this.personList[this.personList.length - 1].id
        this.personList.push({ id: num + 1, responsiblePerson: key, telephone: a[key] })
      }
      this.personList.splice(0, 1)
    },
    // 合并数组
    getnewarr (keyArr, valueArr) {
      var obj = {}
      keyArr.map((v, i) => {
        obj[keyArr[i]] = valueArr[i]
      })
      return obj
    },
    // 获取所有公司
    async getcompany () {
      const res = await getCompanyList(1)
      this.companyData = res.data.data
    },
    async handleSubmit () {
      const person = []
      const phone = []
      try {
        await this.$refs.formRef.validate()
        this.personList.forEach(item => {
          person.push(item.responsiblePerson)
          phone.push(item.telephone)
        })
        this.form.responsiblePerson = person.join(',')
        this.form.telephone = phone.join(',')
        await addFwData(this.form)
        if (this.code === 2) {
          this.$message.success('修改成功')
        } else {
          this.$message.success('新增成功')
        }
        this.$parent.getZlList()
        this.$emit('resetModalVisible', false)
        this.handleCancel()
      } catch (error) {
        console.log(error)
      }
    },
    // async handleSubmit() {
    //   try {
    //     await this.$refs.formRef.validate()
    //     await addZlData(this.form)
    //     if (this.code === '2') {
    //       this.$message.success('修改成功')
    //     } else {
    //       this.$message.success('新增成功')
    //     }
    //     this.$parent.tableShow()
    //     // this.$emit('update:modalVisible', false)
    //     this.$emit('resetModalVisible', false)
    //     this.$refs.formRef.resetFields()
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    handleCancel () {
      // this.$emit('update:modalVisible', false)
      this.$emit('resetModalVisible', false)
      this.$refs.formRef.clearValidate() //移除校验结果
      this.$refs.formRef.resetFields()
      this.form = {
        proprietor: '',
        address: '',
        entryName: '',
        companyName: '',
        responsiblePerson: '',
        floorage: '',
        telephone: '',
        proprietorTypeName: '',
        longitude: '',
        latitude: '',
        regionName: '',
        visible: ''
      }
      this.personList = [
        { id: 1, responsiblePerson: '', telephone: '' }
      ]
    }
  }
}
</script>

<style scoped>
.modal {
  position: relative;
}
.icon {
  z-index: 999;
  display: inline-block;
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: 220px;
}
.icon:hover {
  color: #f62f2f;
}
/* .icon {
  z-index: 999;
  position: fixed;
  right: 0;
  top: 0;
} */
.err {
  border-color: #f62f2f !important;
}
</style>
