<template>
  <div class="container">
    <Card :padding="30">
      <CellGroup>
        <Cell class="avatar-container">
          <img class="avatar" :src="profile.user.avatar">
          <div>
            <span v-if="profile.user" class="emphasis">{{profile.user.username}}</span>
            <span v-if="profile.school">@{{profile.school}}</span>
          </div>
        </Cell>
      </CellGroup>
      <div v-if="profile.user">
        <hr id="split">
        <p class="note" v-if="profile.note">简介:{{profile.note}}</p>

        <div class="flex-container">
          <div class="left">
            <p>已解决</p>
            <p class="emphasis">{{profile.accepted_number}}</p>
          </div>
          <div class="middle">
            <p>已提交</p>
            <p class="emphasis">{{profile.submission_number}}</p>
          </div>
          <div class="right">
            <p>分数</p>
            <p class="emphasis">{{profile.total_score}}</p>
          </div>
        </div>
        <div id="problems">
          <div v-if="problems.length">
            已解决的问题
            <Poptip v-if="refreshVisible" trigger="hover" placement="right-start">
              <Icon type="ios-help-outline"></Icon>
              <div slot="content">
                <p>
                  If you find the following problem id does not exist,
                  <br>try to click the button.
                </p>
                <Button type="info" @click="freshProblemDisplayID">regenerate</Button>
              </div>
            </Poptip>
          </div>
          <p v-else>还没有解决过任何问题哦~</p>
          <div class="btns">
            <div class="problem-btn" v-for="problemID in problems" :key="problemID">
              <Button @click="goProblem(problemID)">{{problemID}}</Button>
            </div>
          </div>
        </div>
        <div id="icons">
          <a :href="profile.github">
            <Icon type="social-github-outline" size="30"></Icon>
          </a>
          <a :href="'mailto:'+ profile.user.email">
            <Icon class="icon" type="ios-email-outline" size="30"></Icon>
          </a>
          <a :href="profile.blog">
            <Icon class="icon" type="ios-world-outline" size="30"></Icon>
          </a>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      profile: {
        user: {
          avatar: require("../../assets/img/avatar.jpg"),
          username: "rickey"
        },
        note: "哈喽",
        school: "中国传媒大学"
      },
      problems: [1, 2, 3]
    };
  },
  methods: {
    freshProblemDisplayID () {
      
    }
  },
  computed: {
    refreshVisible() {
      if (!this.username) return true;
      if (this.username && this.username === this.$store.getters.user.username)
        return true;
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 80%;
  margin: 0 auto;
  margin-top: 100px;
  min-height: 380px;
  p {
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 14px;
  }
  .avatar-container {
    text-align: center;
    .avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      box-shadow: 0 1px 1px 0;
    }
  }
  .emphasis {
    font-size: 25px;
    font-weight: 600;
  }
  #split {
    margin: 0 auto 0;
    width: 90%;
  }
  .note {
    text-align: left;
    font-weight: 100;
    margin-left: 8%;
  }
  .flex-container {
    margin-top: 30px;
    padding: auto 20px;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    text-align: center;
    .left {
      width: 200px;
      margin: 10px;
    }
    .middle {
      width: 300px;
      margin: 10px;
      border-left: 1px solid #999;
      border-right: 1px solid #999;
    }
    .right {
      width: 200px;
      margin: 10px;
    }
  }
  #problems {
    margin-top: 40px;
    padding-left: 5%;
    padding-right: 30px;
    font-size: 18px;
    .btns {
      margin-top: 15px;
      .problem-btn {
        display: inline-block;
        margin: 5px;
      }
    }
  }
  #icons {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
    .icon {
      padding-left: 20px;
    }
  }
}
</style>
