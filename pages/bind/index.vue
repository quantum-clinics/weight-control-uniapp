<style scoped>
.input__box {
  width: 680rpx;
  margin: 50rpx auto;
}

.border {
  border: 1rpx solid #ddd;
  border-radius: 100rpx;
}

.input {
  height: 100rpx;
  padding-left: 40rpx;
}

.input__btn {
  height: 100rpx;
  margin-left: 40rpx;
}

.input__btn {
  width: 250rpx;
  text-align: center;
  line-height: 100rpx;
}

.bind {
  width: 680rpx;
  height: 100rpx;
  margin: auto;
  line-height: 100rpx;
  text-align: center;
}
</style>

<template>
  <base-page :errorMessage="errorMessage">
    <div class="input__box border box flex flex-ai-center">
      <input
        class="input flex-1 height-fill"
        v-model="userPhoneNumber"
        maxlength="11"
        type="number"
        placeholder="请输入手机号码"
      />
    </div>
    <div class="input__box box flex flex-ai-center">
      <input
        class="input border flex-1 height-fill"
        type="number"
        v-model="userVerCode"
        placeholder="请输入验证码"
      />
      <div
        class="input__btn border"
        @click="handleUserFetchCheckCode"
      >{{fetchQrCodeButtonDisable ? countDown : '获取验证码'}}</div>
    </div>
    <div class="bind border" @click="handleUserBindAccount">绑定账户</div>
  </base-page>
</template>

<script>
import {
  userLoginByUniApp,
  userLoginByMiChaServer,
  userSystemInfoByUniApp,
} from "@/static/apis/login";
import { userFetchLabels } from "@/static/apis/system";
import { userFetchCheckCode, userBindAccount } from "@/static/apis/user";
import { setRequestHeader } from "@/static/js/base";
import inject from '@/static/js/inject';

const app = getApp();

export default inject({
  data() {
    return {
      fetchQrCodeButtonDisable: false,
      countDown: 59,
      userPhoneNumber: "",
      userVerCode: ""
    };
  },
  onLoad() {
    // TODO 平台差异化兼容
    this.id = app.globalData.profile.aliUserId;
  },
  methods: {
    // 用户获取验证码
    async handleUserFetchCheckCode() {
      if (this.fetchQrCodeButtonDisable) return;

      if (!this.userPhoneNumber) {
        uni.showToast({
          title: "请输入手机号",
          icon: "none"
        });
        return;
      }

      await this.callAPI(userFetchCheckCode(this.id, this.userPhoneNumber));

      this.fetchQrCodeButtonDisable = true;
      this.countDownInt = setInterval(() => {
        if (!this.countDown) {
          this.countDown = 60;
          this.fetchQrCodeButtonDisable = false;
          clearInterval(this.countDownInt);
          return;
        }
        this.countDown -= 1;
      }, 1000);
    },
    // 用户绑定账号
    async handleUserBindAccount() {
      await this.callAPI(
        userBindAccount(
          this.id,
          this.userPhoneNumber,
          this.userVerCode
        )
      );

      this.userAgainLogin();
    },
    // 用户再次发起登陆
    async userAgainLogin() {
      // 获取当前用户登陆code
      const { code } = await userLoginByUniApp();

      const miChaServerRes = await this.callAPI(
          userLoginByMiChaServer(
              code,
              app.globalData.userInfo
          )
      )

      // 获取设备信息
      app.globalData.systemInfo = await userSystemInfoByUniApp();

      // 获取label信息
      const labelsInfo = await userFetchLabels();
      app.globalData.labelInfo = labelsInfo.data.result;

      // 设置请求头
      setRequestHeader("authorization", miChaServerRes.result.authorization);

      app.$vm.loginResolve();
      app.$vm.loginResolve = null;

      uni.redirectTo({ url: "/pages/index/index" });
    }
  }
});
</script>
