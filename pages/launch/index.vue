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
  <base-page
    :errorMessage="errorMessage"
    v-if="pageDisplay"
  >
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
  data() {
    return {
      pageDisplay: false,
    }
  },
  methods: {
    async handleGetUserInfoByAliPay() {
      // 获取当前用户登陆code
      const { code } = await userLoginByUniApp();
      const { userInfo } = await getUserInfoByUniApp();
      if (!userInfo.nickName) {
        this.pageDisplay = true;
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
      app.globalData.needRecord = !result.profile.record;
      app.globalData.todayFirstLogin = !!result.todayFirstLogin;

      const { coursePage, indexPage } = await this.callAPI("system.getAppLabels");
      app.globalData.indexPage = indexPage
          ? indexPage
          : {
            title: '打卡',
            desc: '每天完成打卡累计米茶币',
          };

      app.globalData.coursePage = coursePage
          ? coursePage
          : {
            title: "100天，让您成为“自来瘦”专家",
            desc: "本课程由已经为20000亚洲人成功减脂20吨的国内先进科学减脂团队米茶计划，以梅奥中心基本营养方案",
          };

      if (result.needBind) {
        app.globalData.openid = result.openid;
        uni.redirectTo({
          url: "/pages/bind/index"
        });
        return;
      }

      if (app.globalData.needRecord) {
        uni.switchTab({
          url: "/pages/micha/index"
        });
        return;
      }

      uni.switchTab({
        url: "/pages/index/index"
      });
    },
  }
});
</script>
