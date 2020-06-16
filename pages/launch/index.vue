<style scoped>
.auth-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-bottom {
  width: 50vw;
}
</style>

<template>
  <base-page :errorMessage="errorMessage">
    <div class="auth-page">
      <!-- 支付宝登陆 -->
      <button
        class="auth-bottom"
        type="primary"
        open-type="getAuthorize"
        scope="userInfo"
        @getAuthorize="handleGetUserInfoByAliPay"
      >授权</button>
    </div>
  </base-page>
</template>

<script>
import inject from "@/static/js/inject";
import {
  userLoginByUniApp,
  getUserInfoByUniApp,
  userLoginByMiChaServer,
  userSystemInfoByUniApp
} from "@/static/apis/login";

const app = getApp();

export default inject({
  onLoad() {
    this.handleGetUserInfoByAliPay();
  },
  methods: {
    async handleGetUserInfoByAliPay() {
      // 获取当前用户登陆code
      const { code } = await userLoginByUniApp();
      const { userInfo } = await getUserInfoByUniApp();
      if (!userInfo.nickName) {
        return;
      }
      this.loadUserData(code, userInfo);
    },
    async loadUserData(code, userInfo) {
      app.globalData.userInfo = userInfo;
      const result = await this.callAPI("user.login", {
        code,
        profile: userInfo
      });
      this.userLoginAfter(result);
    },
    async userLoginAfter(result) {
      app.globalData.profile = result.profile || {};
      app.globalData.authorization = result.authorization;

      if (result.needBind) {
        app.globalData.openid = result.openid;
        uni.redirectTo({
          url: "/pages/bind/index"
        });
        return;
      }

      app.globalData.todayFirstLogin = !!result.todayFirstLogin;

      const { supervise } = await this.callAPI("system.getAppLabels");
      app.globalData.labels = supervise;

      uni.switchTab({
        url: "/pages/index/index"
      });
    },
  }
});
</script>
