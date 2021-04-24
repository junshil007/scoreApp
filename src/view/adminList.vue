<template>
  <div class="admin-list">
    <div class="projects ">
      <div class="title bule">
        已有项目
      </div>
      <div class="row van-contact-card">
        <van-row>
          <van-col span="6">项目昵称</van-col>
          <van-col span="6"
                   offset="0">创建时间</van-col>
          <van-col span="6"
                   offset="0">项目说明</van-col>
        </van-row>
      </div>
      <div class="row van-contact-card"
           v-for="(res, i) in ProjectList"
           :key="i">
        <van-row>
          <van-col span="6">{{res.Name}}</van-col>
          <van-col span="6"
                   offset="0">{{res.CreateTime}}</van-col>
          <van-col span="6"
                   offset="0">{{res.Content}}</van-col>
        </van-row>
      </div>

    </div>

    <div class="new-projects">
      <div class="title green">
        新建项目
        <van-button @click="show = !show"
                    icon="plus"
                    type="primary" />
      </div>

      <div class="subtitle">
        <div class="row">
          <van-row>
            <van-col span="4">评委</van-col>
            <van-col span="10"
                     offset="0">总人数：{{judgesList.length}}</van-col>
          </van-row>
        </div>
      </div>
      <div class="row van-contact-card"
           v-for="item in judgesList"
           :key="item.Username">
        <van-row>
          <van-col span="4">姓名</van-col>
          <van-col span="4"
                   offset="0">昵称</van-col>
        </van-row>
        <van-row>
          <van-col span="4">{{item.Username}}</van-col>
          <van-col span="4"
                   offset="0">{{item.Nick}}</van-col>
        </van-row>
      </div>
      <div class="subtitle top10">
        <div class="row">
          <van-row>
            <van-col span="4">选手</van-col>
            <van-col span="10"
                     offset="0">总人数：{{userList.length}}</van-col>
          </van-row>
        </div>
      </div>
      <div class="row van-contact-card"
           v-for="item in userList"
           :key="item.Username">
        <van-row>
          <van-col span="4">姓名</van-col>
          <van-col span="4"
                   offset="0">昵称</van-col>
        </van-row>
        <van-row>
          <van-col span="4">{{item.Username}}</van-col>
          <van-col span="4"
                   offset="0">{{item.Nick}}</van-col>
        </van-row>
      </div>
    </div>
    <div class="footer">
      <van-button plain
                  type="primary"
                  @click="showUserDialog = !showUserDialog"
                  class="mgr20">注册用户</van-button>
      <van-button plain
                  type="danger"
                  @click="getOut">退出登录</van-button>
    </div>

    <!-- 新建项目 -->
    <van-dialog v-model="show"
                closeOnClickOverlay
                title="新建项目"
                :show-confirm-button="false"
                :show-cancel-button="false">
      <van-form @submit="addProject">
        <van-field v-model="Name"
                   name="Name"
                   label="项目名"
                   placeholder="项目名"
                   :rules="[{ required: true, message: '请填写项目名' }]" />
        <van-field v-model="Content"
                   name="Content"
                   label="项目说明"
                   placeholder="项目说明" />

        <!-- <van-field readonly
                   clickable
                   name="calendar"
                   :value="datetimePickerValue"
                   label="日历"
                   placeholder="点击选择日期"
                   @click="showCalendar = true" /> -->

        <!-- 选择项目相关人员 -->
        <van-field name="PlayerId"
                   label="选择选手">
          <template #input>
            <van-checkbox-group v-model="PlayerId"
                                direction="horizontal">
              <van-checkbox v-for="item in userList"
                            :key="item.Username"
                            :name="item.ID"
                            shape="square">{{item.Username}}</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>

        <van-field name="JudgesId"
                   label="选择评委">
          <template #input>
            <van-checkbox-group v-model="JudgesId"
                                direction="horizontal">
              <van-checkbox v-for="item in judgesList"
                            :key="item.Username"
                            :name="item.ID"
                            shape="square">{{item.Username}}</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round
                      block
                      type="info"
                      native-type="submit">提交</van-button>
        </div>
      </van-form>

    </van-dialog>
    <!-- 选择日历 -->
    <!-- <van-calendar :show-confirm="false"
                  v-model="showCalendar"
                  @confirm="onConfirm" /> -->

    <!-- 注册用户 -->
    <van-dialog v-model="showUserDialog"
                closeOnClickOverlay
                title="注册用户"
                :show-confirm-button="false"
                :show-cancel-button="false">
      <van-form @submit="onSubmit">
        <van-field v-model="Nick"
                   name="Nick"
                   label="昵称"
                   placeholder="昵称" />
        <van-field v-model="UserName"
                   name="UserName"
                   label="用户名"
                   placeholder="用户名"
                   :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="Password"
                   type="password"
                   name="Password"
                   label="密码"
                   placeholder="密码"
                   :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field name="Type"
                   label="单选框">
          <template #input>
            <van-radio-group v-model="Type"
                             direction="horizontal">
              <van-radio :name="3">选手</van-radio>
              <van-radio :name="2">评委</van-radio>
              <van-radio :name="1">超管</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round
                      block
                      type="info"
                      native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import ajax from '../utils/ajax'
import { Toast } from 'vant'
import md5 from 'js-md5'
export default {
  data() {
    return {
      // 项目列表
      ProjectList: [],

      // 新建项目
      Name: '',
      datetimePickerValue: '',
      Content: '',
      show: false,
      showCalendar: false,
      PlayerId: [],
      JudgesId: [],
      showPicker2: false,

      // 注册用户相关
      showUserDialog: false,
      Nick: '匿名',
      UserName: null,
      Password: null,
      Type: 3,

      //人员组
      userList: [],
      judgesList: [],

      //接口校验参数
      Token: localStorage.getItem('Token') || '',
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.getPerson()
      this.getProject()
    },
    async getProject() {
      let { RetCode, Response, RetMsg } = await ajax.post(
        `/scoring_system/api?Bearer=${this.Token}`,
        {
          Module: 'Controller',
          Action: 'ListProject',
        }
      )
      if (RetCode == 0) {
        if (Response.Result && Response.Result.length) {
          this.ProjectList = Response.Result
        }
      } else {
        Toast.fail(RetMsg)
      }
    },
    async getPerson() {
      let { RetCode, Response, RetMsg } = await ajax.post(
        `/scoring_system/api?Bearer=${this.Token}`,
        {
          Module: 'Controller',
          Action: 'ListUser',
        }
      )

      if (Response.Result && Response.Result.length) {
        let list = Response.Result
        this.userList = list.filter((res) => {
          return res.Type == 3
        })
        console.log(this.userList)

        this.judgesList = list.filter((res) => {
          return res.Type == 2
        })
      }
    },
    // 选择项目时间
    onConfirm(value) {
      this.datetimePickerValue = this.formatDate(value)
      this.showCalendar = false
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },
    // 新增项目
    async addProject(values) {
      let params = {
        Module: 'Controller',
        Action: 'AddProject',
        ...values,
      }
      console.log(params)
      let { RetCode, Response, RetMsg } = await ajax.post(
        `/scoring_system/api?Bearer=${this.Token}`,
        params
      )
      if (RetCode == 0) {
        Toast.success('新建成功')
        this.init()
        this.show = false
      } else {
        Toast.fail(RetMsg)
        this.show = false
      }
    },
    // 选择选手
    onConfirm2(value) {
      console.log(value)
      // this.value = value;
      this.showPicker2 = false
    },
    async onSubmit(values) {
      let params = {
        Module: 'Controller',
        Action: 'Register',
        Nick: values.Nick,
        UserName: values.UserName,
        Password: md5(values.Password),
        Type: values.Type,
      }
      let { RetCode, Response, RetMsg } = await ajax.post(
        '/scoring_system/api',
        params
      )
      if (RetCode == 0) {
        Toast.success('注册成功')
        this.init()
        this.showUserDialog = false
      } else {
        Toast.fail(RetMsg)
        this.showUserDialog = false
      }
    },
    getOut() {
      localStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.admin-list {
  position: relative;
  width: 100%;
  height: 100%;
  &::after {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-size: contain;
    height: 100%;
    width: 100%;
    z-index: -1;
    background-repeat: no-repeat;
    // background: url('../assets/bg.jpg');
    opacity: 0.4;
  }
  .title {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    text-align: left;
    text-indent: 20px;
    box-sizing: border-box;
  }
  .bule {
    color: #fff;
    background-color: #1989fa;
    border: 1px solid #1989fa;
  }
  .green {
    color: #fff;
    background-color: #07c160;
    border: 1px solid #07c160;
    display: flex;
    flex: row;
    align-items: center;
  }
  .subtitle {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    background-color: #ff976a;
    color: #fff;
    text-align: left;
    text-indent: 20px;
    box-sizing: border-box;
  }
  .new-projects {
    margin-top: 20px;
  }
  .top10 {
    margin-top: 10px;
  }
  .footer {
    display: flex;
    justify-content: center;
    margin: 20px;
    .mgr20 {
      margin-right: 20px;
    }
  }
  .van-contact-card {
    position: relative;
  }
}
.van-radio + .van-radio {
  // margin: 6px 0;
}
</style>