<script>
import {
  userGetProviderInfo,
  setProvider,
  userInfoAuthSetting,
  getUserSettingByUniApp,
  userLoginByUniApp,
  getUserInfoByUniApp,
  userLoginByMiChaServer,
  userSystemInfoByUniApp
} from "@/static/apis/login";
import { userFetchLabels } from "@/static/apis/system";

import { setRequestHeader } from "@/static/js/base";

export default {
  globalData: {
    title: "米茶计划",
    // SERVER_DOMAIN: "http://localhost:9900/",
    // API_GATEWAY: "http://localhost:9900/api",
    SERVER_DOMAIN: "https://hyb.qtclinics.com",
    API_GATEWAY: "https://hyb.qtclinics.com/api",
    authorization: "",
    platform: "",
    OSS: "https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com",
    profile: "",
    userInfo: {},
    systemInfo: {},
    requestRetryWaitTime: 5,
    todayFirstLogin: false,
    taskSchedule: {
      completeCount: 0,
      totalCount: 4,
    }, // 任务进度
    needRecord: false, // 用户是否需要注册量表
  },
  async onLaunch() {
    // 获取当前平台信息
    const { provider } = await userGetProviderInfo();
    this.globalData.platform = provider[0];
    // 获取设备信息
    this.globalData.systemInfo = await userSystemInfoByUniApp();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* flex */
.flex {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-column {
  flex-direction: column;
}
.flex-ai-start {
  align-items: flex-start;
}
.flex-ai-center {
  align-items: center;
}
.flex-ai-end {
  align-items: flex-end;
}
.flex-jc-start {
  justify-content: flex-start;
}
.flex-jc-center {
  justify-content: center;
}
.flex-jc-end {
  justify-content: flex-end;
}
.flex-jc-between {
  justify-content: space-between;
}
.flex-fill {
  flex: 1;
}

/* font-weight */
.ft-lighter {
  font-weight: lighter;
}
.ft-bolder {
  font-weight: bolder;
}
.ft-thin {
  font-weight: 100;
}
.ft-extra-light {
  font-weight: 200;
}
.ft-light {
  font-weight: 300;
}
.ft-normal {
  font-weight: 400;
}
.ft-medium {
  font-weight: 500;
}
.ft-semi-bold {
  font-weight: 600;
}
.ft-bold {
  font-weight: 700;
}
.ft-extra-bold {
  font-weight: 800;
}
.ft-heavy {
  font-weight: 900;
}

/* font-size */
.ft-20 {
  font-size: 20rpx;
}
.ft-22 {
  font-size: 22rpx;
}
.ft-24 {
  font-size: 24rpx;
}
.ft-26 {
  font-size: 26rpx;
}
.ft-28 {
  font-size: 28rpx;
}
.ft-30 {
  font-size: 30rpx;
}
.ft-32 {
  font-size: 32rpx;
}
.ft-34 {
  font-size: 34rpx;
}
.ft-36 {
  font-size: 36rpx;
}
.ft-38 {
  font-size: 38rpx;
}
.ft-40 {
  font-size: 40rpx;
}
.ft-44 {
  font-size: 44rpx;
}
.ft-48 {
  font-size: 48rpx;
}

/* fonr-color */
.ft-fff {
  color: #fff;
}

/* normal */
.box {
  box-sizing: border-box;
}
.height-fill {
  height: 100%;
}
.line-fill {
  line-height: 1;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.fixed {
  position: fixed;
}

/* icon */
.icon {
  width: 32rpx;
  height: 32rpx;
}
</style>
