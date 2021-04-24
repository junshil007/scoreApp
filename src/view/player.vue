<template>
  <div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      评分结果
    </van-divider>

    <div class="project"
         v-for="(itme, i) in  ProjectList"
         :key="itme.ID +i">
      <div class="card">
        <div class="title">
          {{itme.Name}}
        </div>
        <div class="Content"> 项目描述:{{itme.Content}}</div>
        <div class="project-num">
          <p>项目总分:</p>
          <div class="nums">
            <van-button round
                        v-if="!ProShowList[i]"
                        type="info"
                        @click="openCounts(i)">查看分数</van-button>
            <span class="counts"
                  v-else>
              {{checkNums(itme.PlayerInfo)}}
            </span>
          </div>
        </div>
        <div class="Content"
             v-if="ProShowList[i]"> 当前排名:{{checkNumsIndex(itme.PlayerInfo)}}</div>
        <div class="time">
          发起时间： {{itme.CreateTime}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  props: {
    ProjectList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showNum: false,
      UserName: localStorage.getItem('UserName') || '',
      ProShowList: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      for (let index = 0; index < this.ProjectList.length; index++) {
        this.ProShowList.push(false)
      }
    },
    openCounts(i) {
      this.$set(this.ProShowList, i, true)
    },
    checkNums(oArry) {
      let oResult = oArry.find((res) => {
        return res.Username === this.UserName
      })
      console.log(oResult, 'oResult')
      return oResult.Score || '还未评定'
    },
    checkNumsIndex(oArry) {
      let oIndex = oArry.findIndex((res) => {
        return res.Username === this.UserName
      })
      return oIndex + 1 || '还未评定'
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

  .project-num {
    text-align: left;
    p {
      display: inline-block;
    }
    .nums {
      margin-left: 20px;
      display: inline-block;
    }
    .counts {
      font-size: 30px;
      color: yellowgreen;
      font-family: ui-sans-serif;
    }
  }

  .time,
  .Content {
    text-align: left;
    opacity: 0.6;
    padding: 10px 0;
    font-family: PingFangSC-Medium;
    color: #000000;
    letter-spacing: 0;
  }
}
</style>