<template>
  <div>
    <Form ref="formRegister" :model="formRegister" :rules="ruleRegister" :label-width="80">
      <FormItem label="用户名" prop="username">
        <Input
          type="text"
          v-model="formRegister.username"
          placeholder="请输入您的用户名"
          size="large"
          @on-enter="handleRegister"
        ></Input>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input
          type="email"
          v-model="formRegister.email"
          placeholder="请输入您的邮箱地址"
          size="large"
          @on-enter="handleRegister"
        ></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input
          type="password"
          v-model="formRegister.password"
          placeholder="请设置您的登录密码"
          size="large"
          @on-enter="handleRegister"
        ></Input>
      </FormItem>
      <FormItem label="确认密码" prop="passwordAgain">
        <Input
          type="password"
          v-model="formRegister.passwordAgain"
          placeholder="请确认您的密码"
          size="large"
          @on-enter="handleRegister"
        ></Input>
      </FormItem>
    </Form>
    <div class="footer">
      <Button type="primary" @click="handleRegister" class="btn" :loading="btnRegisterLoading">注册</Button>
      <Button @click="switchMode('login')" class="btn">已经注册了，去登录！</Button>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    const CheckUsernameNotExist = (rule, value, callback) => {};
    const CheckEmailNotExist = (rule, value, callback) => {};
    const CheckPassword = (rule, value, callback) => {
      if (this.formRegister.password !== "") {
        // 对第二个密码框再次验证
        this.$refs.formRegister.validateField("passwordAgain");
      }
      callback();
    };

    const CheckAgainPassword = (rule, value, callback) => {
      if (value !== this.formRegister.password) {
        callback(new Error("password does not match"));
      }
      callback();
    };

    return {
      btnRegisterLoading: false,
      formRegister: {
        username: "",
        password: "",
        passwordAgain: "",
        email: "",
        captcha: ""
      },
      ruleRegister: {
        username: [
          {
            required: true,
            max: 14,
            min: 6,
            message: "用户名是必须的，长度为6-14位",
            trigger: "blur"
          },
          { validator: CheckUsernameNotExist, trigger: "blur" }
        ],
        email: [
          { required: true, trigger: "blur" },
          { type: "email", validator: CheckEmailNotExist, trigger: "blur" }
        ],
        password: [
          { required: true, trigger: "blur", min: 6, max: 20 },
          { validator: CheckPassword, trigger: "blur" }
        ],
        passwordAgain: [
          { required: true, validator: CheckAgainPassword, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["changeModalStatus"]),
    switchMode(mode) {
      this.changeModalStatus({
        mode,
        visible: true
      });
    },
    handleRegister() {}
  },
  computed: {
    ...mapGetters(["modalStatus"])
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
    width: 40%;
    margin: 0 10px;
    &:last-child {
      margin: 0 20px;
    }
  }
}
</style>
