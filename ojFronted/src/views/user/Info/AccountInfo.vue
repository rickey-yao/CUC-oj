<template>
  <div class="setting-main">
    <div class="flex-container">
      <Collapse simple v-model="activeName" accordion>
              <Panel name="changeUserName">
        修改用户名
        <Form
          slot="content"
          class="setting-content"
          ref="UserNameForm"
          :model="UserNameForm"
          :rules="ruleUserName"
        >
          <FormItem label="当前密码" prop="password">
            <Input v-model="UserNameForm.password" type="password"/>
          </FormItem>
          <FormItem label="旧用户名">
            <Input v-model="UserNameForm.old_userName" :placeholder="OldUserName" disabled/>
          </FormItem>
          <FormItem label="新用户名" prop="new_userName">
            <Input v-model="UserNameForm.new_userName"/>
          </FormItem>
          <Button type="primary" @click="changeEmail">修改用户名</Button>
        </Form>
      </Panel>
        <Panel name="changePassword">
          修改密码
          <Form
            slot="content"
            class="setting-content"
            ref="PasswordForm"
            :model="PasswordForm"
            :rules="rulePassword"
          >
            <FormItem label="旧密码" prop="old_password">
              <Input v-model="PasswordForm.old_password" type="password"/>
            </FormItem>
            <FormItem label="新密码" prop="new_password">
              <Input v-model="PasswordForm.new_password" type="password"/>
            </FormItem>
            <FormItem label="确认密码" prop="again_password">
              <Input v-model="PasswordForm.again_password" type="password"/>
            </FormItem>
            <FormItem v-if="visible.passwordAlert">
              <Alert type="success">You will need to login again after 5 seconds..</Alert>
            </FormItem>
            <Button type="primary" @click="changePassword">修改密码</Button>
          </Form>
        </Panel>
        <Panel name="changeEmail">
          修改当前绑定邮箱
          <Form
            slot="content"
            class="setting-content"
            ref="EmailForm"
            :model="EmailForm"
            :rules="ruleEmail"
          >
            <FormItem label="当前密码" prop="password">
              <Input v-model="EmailForm.password" type="password"/>
            </FormItem>
            <FormItem label="旧邮箱">
              <Input v-model="EmailForm.old_email" :placeholder="OldEmail" disabled/>
            </FormItem>
            <FormItem label="新邮箱" prop="new_email">
              <Input v-model="EmailForm.new_email"/>
            </FormItem>
            <Button type="primary" @click="changeEmail">修改邮箱</Button>
          </Form>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const oldPasswordCheck = [
      { required: true, trigger: "blur", min: 6, max: 20 }
    ];
    const CheckAgainPassword = (rule, value, callback) => {
      if (value !== this.PasswordForm.new_password) {
        callback(new Error("两次输入密码不匹配"));
      }
      callback();
    };
    const CheckNewPassword = (rule, value, callback) => {
      if (this.PasswordForm.old_password !== "") {
        if (this.PasswordForm.old_password === this.PasswordForm.new_password) {
          callback(new Error("新密码与旧密码一致哦"));
        } else {
          // 对第二个密码框再次验证
          this.$refs.PasswordForm.validateField("again_password");
        }
      }
      callback();
    };
    const emailCheck = (rule, value, callback) => {
      var regEmail = /^([\w]+)@([\w]+)\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        return callback(new Error("请输入邮箱"));
      } else if (!regEmail.test(value)) {
        return callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    return {
      loading: {
        btnPassword: false,
        btnEmail: false
      },
      visible: {
        passwordAlert: false,
        emailAlert: false
      },
      UserNameForm: {
        password: "",
        old_userName: "",
        new_userName: ""
      },
      PasswordForm: {
        old_password: "",
        new_password: "",
        again_password: ""
      },
      EmailForm: {
        password: "",
        old_email: "",
        new_email: ""
      },
      ruleUserName: {
        password: oldPasswordCheck,
        new_userName: [
          {
            required: true,
            max: 14,
            min: 6,
            message: "用户名是必须的，长度为6-14位",
            trigger: "change"
          }
        ]
      },
      rulePassword: {
        old_password: oldPasswordCheck,
        new_password: [
          { required: true, trigger: "blur", min: 6, max: 20 },
          { validator: CheckNewPassword, trigger: "blur" }
        ],
        again_password: [
          { required: true, validator: CheckAgainPassword, trigger: "change" }
        ]
      },
      ruleEmail: {
        password: oldPasswordCheck,
        new_email: [
          {
            validator: emailCheck,
            required: true,
            type: "email",
            trigger: "change"
          }
        ]
      },
      activeName: "changeUserName"
    };
  },
  computed: {
    OldEmail() {},
    OldUserName() {}
  },
  methods: {
    changeUserName() {},
    changePassword() {},
    changeEmail() {},
  }
};
</script>

<style lang="less" scoped>
.flex-container {
  width: 60%;
  margin-left: 20%;
  justify-content: flex-start;
}
</style>

