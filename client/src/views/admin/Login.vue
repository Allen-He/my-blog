<template>
  <div class="login">
    <div class="formBox">
      <a-form-model
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        :label-col="{ style: 'display: inline-block' }"
        :wrapper-col="{ style: 'width: 300px' }"
      >
        <a-form-model-item class="formItem" ref="account" label="账号" prop="account">
          <a-input
            class="inputBox"
            v-model.trim="loginForm.account"
            @blur="() => { $refs.account.onFieldBlur(); }"
          />
        </a-form-model-item>
        <a-form-model-item class="formItem" ref="password" label="密码" prop="password">
          <a-input
            class="inputBox"
            v-model.trim="loginForm.password"
            @blur="() => { $refs.password.onFieldBlur(); }"
          />
        </a-form-model-item>
        <div class="btnBox">
          <a-button type="primary" @click="onSubmit">
            登录
          </a-button>
          <a-button style="margin-left: 15px;" @click="resetForm">
            重置
          </a-button>
          <a-button type="dashed" style="margin-left: 15px;" @click="backHomeHandle">
            回到首页
          </a-button>
        </div>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loginForm: {
        account: '18308365449',
        password: 'hcx147852369',
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /[0-9]{11}/, message: '必须是长度为11位的数字', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /[a-z0-9]{8,12}/, message: '只能包含小写英文字母(a-z)和数字(0-9)，且长度为6-12位', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    ...mapActions('loginUser', ['setUserData']),
    async loginHandle() {
      const res = await this.setUserData({
        loginId: this.loginForm.account,
        loginPwd: this.loginForm.password,
      });
      if (res) { // 登录成功
        this.$router.push({ name: 'AdminHome' });
      } else { // 登录失败
        console.log('账号或密码错误，请重新输入！');
      }
    },
    onSubmit() {
      const This = this; // 暂存当前Vue实例
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) {
          return false;
        }
        await This.loginHandle();
        return true;
      });
    },
    resetForm() {
      this.$refs.loginForm.resetFields();
    },
    backHomeHandle() {
      this.$router.push({ name: 'Index' });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  min-width: 600px;
  width: 100vw;
  height: 100vh;
  background: url(~@/assets/imgs/home.bg.svg) no-repeat center center;
  background-size: cover;
  position: relative;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .35;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .formBox {
    display: inline-block;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    transition: all .5s;
    padding: 40px 10px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 999;
    &:hover {
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
    }

    .formItem {
      width: 400px;
      display: flex;
      justify-content: center;
      .inputBox {
        font-weight: 500;
      }
    }
    .btnBox {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
