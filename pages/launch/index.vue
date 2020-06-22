<style scoped>
  .auth__page {
    height: 100vh;
    width: 100vw;
    background: linear-gradient(180deg, #10CEFF, #0083FF);
  }

  .auth__background {
    width: 100vw;
  }

  .auth__button {
    width: 584rpx;
    height: 112rpx;
    background: linear-gradient(180deg, rgba(255, 150, 81, 1) 0%, rgba(255, 113, 81, 1) 100%);
    border-radius: 48rpx;
    border: 1rpx solid rgba(255, 138, 101, 1);
    bottom: 200rpx;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<template>
  <base-page :errorMessage="errorMessage">
    <div class="auth__page relative">
      <img
        mode="widthFix"
        src="https://weight-control.qtclinics.com/static/2020060101/template/img/home-page-back.png"
        class="auth__background"
      />

      <button
        v-if="pageDisplay"
        class="auth__button flex flex-ai-center flex-jc-center absolute"
        open-type="getAuthorize"
        scope="userInfo"
        @getAuthorize="handleGetUserInfoByAliPay"
      >
        <span class="ft-42 ft-semi-bold ft-fff">点我填写评估量表</span>
      </button>
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
      uni.showLoading({ title: 'Loading..' });
      // 获取当前用户登陆code
      const { code } = await userLoginByUniApp();
      const { userInfo } = await getUserInfoByUniApp();

      if (!userInfo.nickName) {
        this.pageDisplay = true;
        uni.hideLoading();
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
      app.globalData.needRecord = !app.globalData.profile.record || !app.globalData.profile.type;
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
        uni.hideLoading();
        uni.redirectTo({
          url: "/pages/bind/index"
        });
        return;
      }

      const { bonus } = await this.callAPI('user.getUserBonus');
      app.globalData.bonus = bonus;

      if (app.globalData.needRecord) {
        uni.hideLoading();
        uni.switchTab({
          url: "/pages/micha/index"
        });
        return;
      }

      uni.hideLoading();

      uni.switchTab({
        url: "/pages/index/index"
      });
    },
  }
});
</script>
