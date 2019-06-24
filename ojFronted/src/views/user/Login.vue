<template>
  <div>
    <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
      <FormItem prop="username">
        <Input
          type="text"
          placeholder="用户名"
          size="large"
          @on-enter="handleLogin"
        >
          <Icon type="md-person" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input
          type="password"
          placeholder="密码"
          size="large"
          @on-enter="handleLogin"
        >
          <Icon type="md-lock" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
    <div class="footer">
      <Button type="primary" @click="handleLogin" class="btn" long :loading="btnLoginLoading">Login</Button>
      <a @click.stop="handleBtnClick('register')">没有账号？现在去注册--></a>
      <a @click.stop="goResetPassword" style="float: right">忘记密码</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      btnLoginLoading: false,
      formLogin: {
        username: "",
        password: ""
      },
      ruleLogin: {
        username: [
          { required: true, trigger: "blur" },
          //{ validator: CheckRequiredTFA, trigger: "blur" }
        ],
        password: [{ required: true, trigger: "change", min: 6, max: 20 }]
      }
    };
  },
  methods: {
    ...mapActions(["changeModalStatus"]),
    handleBtnClick(mode) {
      this.changeModalStatus({
        mode,
        visible: true
      });
    },
    handleLogin() {
    },
    goResetPassword() {
      this.changeModalStatus({ visible: false });
      //this.$router.push({ name: "apply-reset-password" });
    }
  },
  computed: {
    ...mapGetters(["modalStatus"]),
    visible: {
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
.footer {
  overflow: auto;
  margin-top: 20px;
  margin-bottom: -15px;
  text-align: left;
  .btn {
    margin: 0 0 15px 0;
    &:last-child {
      margin: 0;
    }
  }
}
</style>
