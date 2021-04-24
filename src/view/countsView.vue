<template>
  <div class="countsView">
    <div class="demo-nav">
      <van-icon name="arrow-left"
                @click="goBack" /> {{isLook?'结果目录' : '评分界面'}}
    </div>
    <div class="project"
         v-for="(itme, i) in  ProjectList"
         :key="itme.ID +i">
      <div class="card">
        <div class="title">
          {{itme.Name}}
        </div>
        <div class="players van-contact-card"
             v-for="(res, j) in itme.PlayerInfo"
             :key="j">
          <div class="Username">
            <van-icon class="icon"
                      name="manager-o" />选手:{{res.Username}}
          </div>
          <div class="Score">
            <van-icon class="icon"
                      name="todo-list-o" />分数:{{res.Score==0? '还未评定' :res.Score}}
          </div>
          <div v-if="!isLook"
               class="Username">
            <van-icon name="edit" /> 评分:
            <van-stepper max="100"
                         class="right"
                         v-model="res.Score" />
          </div>
          <div class="top"
               v-else>
            <van-icon class="icon"
                      name="bar-chart-o" /> <span>当前名次：{{j+1}}</span>
          </div>
        </div>
        <div class="right card-button"
             v-if="!isLook">
          <van-button type="danger"
                      @click="goToCounts(itme)">确定</van-button>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ajax from '../utils/ajax'
import { Toast } from 'vant'
export default {
  name: 'CountsView',
  data() {
    return {
      showNum: false,
      ProShowList: [],
      //接口校验参数
      Token: localStorage.getItem('Token') || '',
      ProjectList: [],
    }
  },
  computed: {
    isLook() {
      return this.$route.query.type == 'see'
    },
    ID() {
      return this.$route.query.id
    },
  },
  created() {
    console.log(this.$route)
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
          let Result = Response.Result.find((res) => {
            return res.ID == this.ID
          })
          console.log(Result)
          this.ProjectList.push(Result)
        }
      } else {
        Toast.fail(RetMsg)
      }
    },
    async goToCounts(itme) {
      let params = {
        ProjectId: itme.ID,
        Module: 'Controller',
        Action: 'Scoring',
        PlayerInfo: itme.PlayerInfo,
      }

      let { RetCode, Response, RetMsg } = await ajax.post(
        `/scoring_system/api?Bearer=${this.Token}`,
        params
      )
      if (RetCode == 0) {
        Toast.success('评分成功')
      } else {
        Toast.fail(RetMsg)
      }
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>


<style lang="scss" scoped>
.card {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  margin: 0 24px 24px;
  padding: 20px;
  box-sizing: border-box;
  background: #ffffff;
  .title {
    color: rgb(25, 137, 250);
    font-size: 24px;
    font-weight: 500px;
    text-align: left;
    padding: 10px 0;
  }
}
.players {
  text-align: left;
  font-size: 18px;

  .Username {
    padding: 10px 0;
  }
  .top {
    margin-top: 10px;
  }
}
.right {
  font-size: 18px;
  text-align: right;
}
.icon {
  margin-right: 6px;
}
.card-button {
  margin-top: 10px;
}
.van-contact-card {
  position: relative;
}

.countsView {
  padding-bottom: 40px;
}
.demo-nav {
  position: relative;
  height: 60px;
  text-align: center;
  font-weight: 600;
  font-size: 22px;
  text-transform: capitalize;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .van-icon {
    position: absolute;
    left: 30px;
  }
}
</style>