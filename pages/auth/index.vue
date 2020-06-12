<template>
  <base-page :errorMessage="errorMessage">
    <!-- 微信登陆 -->
    <button
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
  </base-page>
</template>

<script>
  import inject from '@/static/js/inject';

  import {
    userLoginByUniApp,
    getUserInfoByUniApp,
    userLoginByMiChaServer
  } from "@/static/apis/login";

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
      userLoginAfter(res) {
        app.globalData.profile = res.data.result.profile;

        if (res.data.result.needBind) {
          uni.redirectTo({
            url: '/pages/bind/index'
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
  });
</script>
