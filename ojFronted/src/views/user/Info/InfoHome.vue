<template>
  <div class="container">
    <Card :padding="0" style="min-height:510px">
      <Row>
        <Col :xs="2" :sm="4" :md="6" :lg="4">
          <Menu mode="vertical" accordion @on-select="goRoute" :activeName="activeName" :style="{width: '100%'}" style="text-align:center">
            <div class="avatar-editor">
              <div class="avatar-container">
                <img class="avatar" src="../../../assets/img/avatar.jpg">
                <div class="avatar-mask">
                  <a @click="goRoute('/userInfo/profile')">
                    <div class="mask-content">
                      <Icon type="camera" size="30"></Icon>
                      <p class="text">更换头像</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <MenuItem name="/userInfo/profile">基本信息</MenuItem>
            <MenuItem name="/userInfo/account">账户信息</MenuItem>
          </Menu>
        </Col>
        <Col :xs="22" :sm="20" :md="18" :lg="16">
          <transition name="fadeInUp">
            <router-view></router-view>
          </transition>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "userinfo",
  data() {
    return {
      user: {
        avatar: "",
        username: "rickey"
      },
    };
  },
  methods: {
    goRoute(routePath) {
      this.$router.push(routePath);
    }
  },
  computed: {
    activeName () {
      return this.$route.path
    }
  }
};
</script>

<style lang="less" scoped>
@avatar-radius: 50%;

.container {
  width: 80%;
  margin-top: 100px;
  margin-left: 12%;
}

    .avatar-editor {
      padding: 10% 22%;
      margin-bottom: 20px;
      .avatar-container {
        &:hover {
          .avatar-mask {
            opacity: 0.5;
          }
        }
        position: relative;
        .avatar {
          width: 100%;
          height: auto;
          display: block;
          border-radius: @avatar-radius;
          box-shadow: 0px 0px 1px 0px;
        }
        .avatar-mask {
          transition: opacity 0.2s ease-in;
          z-index: 1;
          border-radius: @avatar-radius;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: black;
          opacity: 0;
          .mask-content {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 3;
            color: #fff;
            font-size: 12px;
            text-align: center;
            transform: translate(-50%, -50%);
            .text {
              white-space: nowrap;
            }
          }
        }
      }
    }

</style>

<style lang="less">
.setting-main {
  position: relative;
  margin: 30px 40px;
  padding-bottom: 20px;
  .setting-content {
    margin-left: 20px;
  }
  .mini-container {
    width: 70%;
    margin:0 auto;
  }
}
.section-title {
  font-size: 21px;
  font-weight: 500;
  padding-top: 10px;
  padding-bottom: 20px;
  line-height: 30px;
}
</style>
