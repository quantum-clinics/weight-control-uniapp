<template>
  <div>
    <!-- 微信登陆 -->
    <button
      class="testbutton"
      hover-class="none"
      open-type="getUserInfo"
      @getuserinfo="handleGetUserInfoByWx"
      withCredentials="true"
    >授权</button>

    <!-- 支付宝登陆 -->
    <button
      type="primary"
      open-type="getAuthorize"
      scope="userInfo"
      @getAuthorize="handleGetUserInfoByAliPay"
    >授权</button>
  </div>
</template>

<script>
import {
  userLoginByUniApp,
  getUserInfoByUniApp,
  userLoginByMiChaServer
} from "@/static/apis/login";

const app = getApp();

export default {
  data() {
    return {};
  },
  methods: {
    async handleGetUserInfoByWx(e) {
      if (!e.detail.userInfo) return;

      app.globalData.userInfo = e.detail.userInfo;

      // 获取当前用户登陆code
      const { code } = await userLoginByUniApp();

      this.userLoginAfter(
        await userLoginByMiChaServer(code, e.detail.userInfo)
      );
    },
    async handleGetUserInfoByAliPay() {
      // 获取当前用户登陆code
      const { code } = await userLoginByUniApp();

      const { userInfo } = await getUserInfoByUniApp();

      app.globalData.userInfo = userInfo;

      this.userLoginAfter(await userLoginByMiChaServer(code, userInfo));
    },
    userLoginAfter(res) {
      console.log(1, res);

      app.globalData.openid = res.result.openid;

      if (res.result.needBind) {
        uni.redirectTo({
          url: "/pages/bind/index"
        });

        return;
      }

      app.$vm.loginResolve();
      app.$vm.loginResolve = null;

      uni.redirectTo({
        url: "/pages/index/index"
      });
    }
  }
};
</script>

<style>
</style>
