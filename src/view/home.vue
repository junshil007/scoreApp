<template>
  <div class="home-view">
    <div v-if="active==0">
      <Player v-if="isPlayer"
              :ProjectList="ProjectList">
      </Player>
      <Judges v-else
              :ProjectList="ProjectList"></Judges>
    </div>
    <div v-else>
      <Myinfor>
      </Myinfor>
    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="friends">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Player from './player'
import Judges from './judges'
import Myinfor from './myInfo'
import ajax from '../utils/ajax'
import { Toast } from 'vant'
export default {
  name: 'Home',
  components: {
    Player,
    Judges,
    Myinfor,
  },
  data() {
    return {
      active: 0,
      //接口校验参数
      Token: localStorage.getItem('Token') || '',

      ProjectList: [],
    }
  },
  computed: {
    isPlayer() {
      return this.$route.path == '/myinfo/player'
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getProject()
    },
    async getProject() {
      let { RetCode, Response, RetMsg } = await ajax.post(
        `/scoring_system/api?Bearer=${this.Token}`,
        {
          Module: 'Controller',
          Action: 'ProjectInfo',
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
  },
}
</script>

<style>
.home-view {
  background: #fafafa;
  height: auto;
  padding-bottom: 60px;
  width: 100%;
}
</style>
