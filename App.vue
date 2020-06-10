<script>
import {
  userGetProviderInfo,
  setProvider,
  userInfoAuthSetting,
  getUserSettingByUniApp,
  userLoginByUniApp,
  getUserInfoByUniApp,
  userLoginByMiChaServer
} from "@/static/apis/login";
import { setRequestHeader } from "@/static/js/base";

function init() {}

export default {
  globalData: {
    openid: "",
    provider: ""
  },
  onLaunch() {
    this.login = new Promise(async (resolve, reject) => {
      try {
        // 获取当前服务端: [weixin, qq, ios..]
        const { provider } = await userGetProviderInfo();
        this.globalData.provider = provider[0];
        setRequestHeader("QTC-Platform", provider[0]);
        setProvider(provider[0]);
        console.log("1, 获取当前平台信息", provider[0]);

        // 获取授权设置
        const { authSetting } = await getUserSettingByUniApp();
        console.log("2, 获取当前平台授权设置", authSetting);

        // 当前用户是否授权
        const userInfoAuth = userInfoAuthSetting(authSetting, "userInfo");

        console.log("3, 当前用户是否授权", userInfoAuth);

        // 当前用户未授权
        if (!userInfoAuth) {
          this.loginResolve = resolve;

          uni.redirectTo({
            url: "/pages/auth/index"
          });

          return;
        }

        // 获取用户平台code
        const { code } = await userLoginByUniApp();
        console.log("4, 获取当前授权code", code);

        // 获取用户平台数据
        const platformInfo = await getUserInfoByUniApp();
        this.globalData.userInfo = platformInfo.userInfo;
        console.log("5, 获取当前平台用户信息", platformInfo);

        // 获取用户米茶数据
        const miChaServerRes = await userLoginByMiChaServer(
          code,
          platformInfo.userInfo
        );
        console.log("6, 登陆米茶服务器", miChaServerRes);

        this.globalData.openid = miChaServerRes.data.result.openid;

        // 判断当前用户是否需要绑定手机号码
        if (miChaServerRes.data.result.needBind) {
          this.loginResolve = resolve;

          uni.redirectTo({
            url: "/pages/bind/index"
          });

          return;
        }

        setRequestHeader("authorization", miChaServerRes.data.result.authorization);

        resolve();
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });

    this.init = function() {
      return this.login;
    };
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
.flex { display: flex }
.flex-wrap { flex-wrap: wrap }
.flex-column { flex-direction: column }
.flex-ai-start { align-items: flex-start }
.flex-ai-center { align-items: center }
.flex-ai-end { align-items: flex-end }
.flex-jc-start { justify-content: flex-start }
.flex-jc-center { justify-content: center }
.flex-jc-end { justify-content: flex-end }
.flex-jc-between { justify-content: space-between }
.flex-fill { flex: 1 }

/* font-weight */
.ft-lighter {font-weight: lighter}
.ft-bolder {font-weight: bolder}
.ft-thin {font-weight: 100}
.ft-extra-light {font-weight: 200}
.ft-light {font-weight: 300}
.ft-normal {font-weight: 400}
.ft-medium {font-weight: 500}
.ft-semi-bold {font-weight: 600}
.ft-bold {font-weight: 700}
.ft-extra-bold {font-weight: 800}
.ft-heavy {font-weight: 900}

/* font-size */
.ft-20 {font-size: 20rpx}
.ft-22 {font-size: 22rpx}
.ft-24 {font-size: 24rpx}
.ft-26 {font-size: 26rpx}
.ft-28 {font-size: 28rpx}
.ft-30 {font-size: 30rpx}
.ft-32 {font-size: 32rpx}
.ft-34 {font-size: 34rpx}
.ft-36 {font-size: 36rpx}
.ft-38 {font-size: 38rpx}
.ft-40 {font-size: 40rpx}
.ft-44 {font-size: 44rpx}
.ft-48 {font-size: 48rpx}

/* fonr-color */
.ft-fff {color: #fff }

/* normal */
.box { box-sizing: border-box }
.height-fill { height: 100% }
.line-fill {line-height: 1}
.relative { position: relative }
.absolute { position: absolute }
.fixed { position: fixed }

/* icon */
.icon {width: 32rpx; height: 32rpx}


</style>
