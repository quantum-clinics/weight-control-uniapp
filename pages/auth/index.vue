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
      <!-- 微信登陆 -->
      <!-- <button
        hover-class="none"
        open-type="getUserInfo"
        @getuserinfo="handleGetUserInfoByWx"
        withCredentials="true"
      >授权</button>-->

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
import { userFetchLabels } from "@/static/apis/system";
import { setRequestHeader } from "@/static/js/base";

const app = getApp();

export default inject({
  methods: {
    async handleGetUserInfoByWx(e) {
      if (!e.detail.userInfo) return;

      app.globalData.userInfo = e.detail.userInfo;

      // 获取当前用户登陆code
      const { code } = await userLoginByUniApp();

      const res = await userLoginByMiChaServer(code, e.detail.userInfo);

      this.userLoginAfter(res);
    },
    async handleGetUserInfoByAliPay() {
      // 获取当前用户登陆code
      const { code } = await userLoginByUniApp();

      const { userInfo } = await getUserInfoByUniApp();

      app.globalData.userInfo = userInfo;

      const res = await this.callAPI(userLoginByMiChaServer(code, userInfo));

      this.userLoginAfter(res);
    },
    async userLoginAfter(res) {
      app.globalData.profile = res.data.result.profile || {};

      if (res.data.result.needBind) {
        app.globalData.profile = res.data.result.openid;
        uni.redirectTo({
          url: "/pages/bind/index"
        });

        return;
      }

      app.$vm.loginResolve();
      app.$vm.loginResolve = null;

      // 获取设备信息
      app.globalData.systemInfo = await userSystemInfoByUniApp();

      // 获取label信息
      const labelsInfo = await userFetchLabels();
      app.globalData.labelInfo = labelsInfo.data.result;

      // 设置请求头
      setRequestHeader("authorization", res.data.result.authorization);

      uni.redirectTo({
        url: "/pages/index/index"
      });
    }
  }
});
</script>
