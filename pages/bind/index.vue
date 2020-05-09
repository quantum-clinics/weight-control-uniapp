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
  <div>
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
  </div>
</template>

<script>
import { userFetchCheckCode, userBindAccount } from "./apis";

const app = getApp();

export default {
  data() {
    return {
      fetchQrCodeButtonDisable: false,
      countDown: 59,
      userPhoneNumber: "",
      userVerCode: ""
    };
  },
  methods: {
    // 用户获取验证码
    handleUserFetchCheckCode() {
      if (this.fetchQrCodeButtonDisable) return;

      if (!this.userPhoneNumber) {
        uni.showToast({
          title: "请输入手机号",
          icon: "none"
        });
        return;
      }

      userFetchCheckCode(app.globalData.openid, this.userPhoneNumber).then(
        res => {
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
        }
      );
    },
    // 用户绑定账号
    handleUserBindAccount() {
      userBindAccount(
        app.globalData.openid,
        this.userPhoneNumber,
        this.userVerCode
      ).then(res => {
        uni.redirectTo({ url: "/pages/index/index" });
      });
    }
  }
};
</script>
