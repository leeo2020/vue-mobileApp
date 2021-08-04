<template>
  <div class="lx-login">
    <van-form @submit="onSubmit">
      <van-field
          v-model="user.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="user.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="user.password2"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div class="lx-login">
      <van-row>
        <van-col span="12"></van-col>
        <van-col span="12">
          <van-button round type="info" to="/login">已有账户,直接登录</van-button>
        </van-col>
      </van-row>

    </div>
  </div>
</template>

<script>
import {Form, Field, Button, Col, Row,Toast} from 'vant'

export default {
  name: "Regist",
  data: function () {
    return {
      user: {
        username: '',
        password: '',
        password2: ''
      }
    }
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row
  }, methods: {
    onSubmit() {
      let data = this.user
      this.$api.fetchRegist(data).then(()=> {
        Toast('注册成功!')
        this.$router.replace('/login')
      })
    }
  }
}
</script>

<style scoped>

</style>