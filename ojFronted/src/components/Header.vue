<template>
  <div class="header">
    <Header :style="{position: 'fixed', width: '100%', background: '#fff'}">
      <Menu mode="horizontal" theme="light">
        <div class="layout-logo">
          <img src="../assets/headLogo.png" @click="tohome">
        </div>
        <div class="layout-nav">
          <template v-if="!isAuthenticated">
            <ButtonGroup shape="circle">
              <Button @click="handleBtnClick('login')">登录</Button>
              <Button @click="handleBtnClick('register')">注册</Button>
            </ButtonGroup>
          </template>
          <template v-else>
            <Dropdown @on-click="handleRoute">
              <div>
                <Avatar :src="user.avatar" />
                <h3 class="text">{{user.username}}
                  <Icon type="ios-arrow-down"></Icon>
                </h3>
              </div>
              
              <DropdownMenu slot="list">
                <DropdownItem name="/userHome">我的主页</DropdownItem>
                <DropdownItem @click.native="handleRoute('/user/applylist')">我的提交</DropdownItem>
                <DropdownItem name="/userInfo/profile">个人中心</DropdownItem>
                <DropdownItem divided name="/logout">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </div>
      </Menu>
    </Header>
    <Modal v-model="modalVisible" :width="400">
      <div slot="header" class="modal-title">欢迎来到CUC-OJ</div>
      <component :is="modalStatus.mode" v-if="modalVisible"></component>
      <div slot="footer" style="display: none"></div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import login from "../views/user/Login";
import register from "../views/user/Register";

export default {
  data () {
    return {
      user:{
        avatar:require('../assets/img/avatar.jpg'),
        username:'rickey'
      },
      isAuthenticated: true
    }
  },
  components: {
    login,
    register
  },
  methods: {
    ...mapActions(["changeModalStatus"]),
    tohome() {
      this.$router.push({
        name: "Home"
      });
    },
    handleRoute (route) {
      this.$router.push(route)
    },
    handleBtnClick(mode) {
      this.changeModalStatus({
        visible: true,
        mode: mode
      });
    }
  },
  computed: {
    ...mapGetters(["modalStatus"]),
    modalVisible: {
      get() {
        return this.modalStatus.visible;
      },
      set(value) {
        this.changeModalStatus({ visible: value });
      }
    }
  }
};
</script>

<style scoped lang="less">
.header{
  z-index:9999;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  left: 30px;
}
.layout-nav {
  width: 140px;
  margin: 0 auto;
  margin-right: 5rem;
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 65px;
    cursor: pointer;
  }
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0;
  cursor: pointer;
}
.modal {
  &-title {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
