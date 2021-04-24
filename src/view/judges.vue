<template>
  <div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      项目目录
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
          <van-button round
                      type="info"
                      @click="goToCounts('set',itme.ID)">项目评分</van-button>
          <van-button type="primary"
                      round
                      @click="goToCounts('see',itme.ID)">查看结果</van-button>
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
    goToCounts(type, ID) {
      this.$router.push({
        path: `./countsView`,
        query: {
          type: type,
          id: ID,
        },
      })
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
    button + button {
      margin-left: 20px;
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