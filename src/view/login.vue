<template>
  <div class="login">
    <div class="project-main"></div>
    <van-form @submit="onSubmit">
      <van-field v-model="username"
                 name="username"
                 label="用户名"
                 placeholder="用户名"
                 :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password"
                 type="password"
                 name="password"
                 label="密码"
                 placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' }]" />
      <van-field name="type"
                 label="角色">
        <template #input>
          <van-radio-group v-model="type"
                           direction="horizontal">
            <van-radio :name="1">超管</van-radio>
            <van-radio :name="3">选手</van-radio>
            <van-radio :name="2">评委</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import ajax from '../utils/ajax'
import { Toast } from 'vant'
import md5 from 'js-md5'

export default {
  data() {
    return {
      username: 'admin',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      type: 1, // 用户类型: 1-管理员，2-评委，3-选手
    }
  },
  created() {
    // this.init()
  },
  methods: {
    async onSubmit(values) {
      console.log('submit', values)
      let params = {
        Module: 'Controller',
        Action: 'LogIn',
        UserName: values.username,
        Password: md5(values.password),
        Type: parseInt(this.type),
      }
      let { RetCode, Response, RetMsg } = await ajax.post(
        '/scoring_system/api',
        params
      )
      if (RetCode == 0) {
        Toast.success('登录成功')
        console.log(Response)
        let { Type, Bearer } = Response.Result
        localStorage.setItem('Token', Bearer)
        localStorage.setItem('login', true)
        localStorage.setItem('UserName', values.username)
        if (Type == '3') {
          this.$router.push('./myinfo/player')
        } else if (Type == '2') {
          this.$router.push('./myinfo/judges')
        } else {
          this.$router.push('./admin-list')
        }
      } else {
        Toast.fail(RetMsg)
      }
    },
    async init() {},
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  background: url('../assets/bg.jpg');
  background-size: contain;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
}
.project-main {
  width: 200px;
  height: 200px;
}
</style>