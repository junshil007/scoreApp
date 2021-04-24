<template>
  <div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      个人资料
    </van-divider>

    <van-form @submit="onSubmit">
      <van-field v-model="username"
                 name="username"
                 label="用户名"
                 disabled
                 placeholder="用户名"
                 :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="Nick"
                 name="Nick"
                 label="昵称"
                 placeholder="昵称" />
      <van-field v-model="OldPassword"
                 type="OldPassword"
                 name="OldPassword"
                 label="旧密码"
                 placeholder="旧密码"
                 :rules="[{ required: true, message: '请填写旧密码' }]" />
      <van-field v-model="Password"
                 type="Password"
                 name="Password"
                 label="密码"
                 placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' }]" />
      <van-field v-model="Password2"
                 type="Password2"
                 name="Password2"
                 label="再次确认"
                 placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    native-type="submit">确认提交</van-button>
        <van-button round
                    block
                    type="danger"
                    @click="getOut">退出登录</van-button>
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
      username: localStorage.getItem('UserName') || '',
      Password: '',
      Password2: '',
      OldPassword: '',
      Nick: '',
      //接口校验参数
      Token: localStorage.getItem('Token') || '',
    }
  },
  methods: {
    getOut() {
      localStorage.clear()
      this.$router.push('/login')
    },
    async onSubmit(values) {
      console.log('submit', values)
      if (values.Password !== values.Password2) {
        Toast.fail('两次密码不一致')
        return
      }
      let { RetCode, RetMsg } = await ajax.post(
        `/scoring_system/api?Bearer=${this.Token}`,
        {
          Module: 'Controller',
          Action: 'ProjectInfo',
          Nick: values.Nick,
          OldPassword: md5(values.OldPassword),
          Password: md5(values.Password),
        }
      )
      if (RetCode == 0) {
        Toast.success('修改成功')
      } else {
        Toast.fail(RetMsg)
      }
    },
  },
}
</script>

<style scoped>
button + button {
  margin-top: 16px;
}
</style>