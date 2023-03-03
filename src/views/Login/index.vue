<template>
  <div class="login">
    <a-card class="card" style="width: 300px">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <div class="text">用户登录</div>
        </a-form-item>
        <a-form-item>
          <a-input
            class="input"
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入您的用户名!' }] },
            ]"
            placeholder="请输入用户名"
          >
            <a-icon slot="prefix" type="user" style="color: #4283dd" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入您的密码!' }] },
            ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: #4283dd" />
          </a-input>
        </a-form-item>
        <a-form-item style="text-align: center">
          <a-button class="btn" html-type="submit"> 登录 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { Login } from "../../api/api"
import { setToken } from "../../utils/token"

export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          Login({
            username: values.username,
            password: values.password
          }).then((res) => {
            let { code, token } = res.data
            if (code === 0) {
              this.$message.success('登陆成功!')
              this.$store.commit('token', token)
              setToken('token', token)
              setTimeout(() => {
                this.$router.push('/Synopsis')
              }, 1000)
            } else {
              this.$message.error('登陆失败!')
            }
          })
        }
      })
    }
  },
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("../../assets/login.png");
  background-size: 100% 100%;
  .text {
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: white;
  }
  .card {
    margin: 350px 80%;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    // background-color: transparent;
    box-shadow: 6px 6px 5px #888888;
  }
}
.btn {
  font-weight: 600;
  width: 90%;
  color: white;
  background-color: rgb(0, 135, 105);
  border-radius: 10px;
  // &:hover {
  // }
}
/deep/ .ant-input {
  background-color: rgba(0, 0, 0, 0);
  color: white;
}
</style>
