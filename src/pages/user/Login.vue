<template>
  <div class="lx-">
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
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div class="lx-regist">
      <van-row>
        <van-col span="12"></van-col>
        <van-col span="12">
          <van-button round type="info" to="/regist">还没有注册先注册</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {Form, Field, Button,Col, Row} from 'vant'

export default {
  name: "Login",
  data: function () {
    return {
      user:{
        username: '',
        password: ''
      }
    }
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Col.name]:Col,
    [Row.name]:Row
  }, methods: {
    onSubmit() {
      let data = this.user
      console.log(data)
      this.$api.fetchLogin(data).then(res=>{
        localStorage.setItem('token',res.token)
        this.$router.back()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>