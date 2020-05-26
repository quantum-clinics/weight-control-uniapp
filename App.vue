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

        this.globalData.openid = miChaServerRes.result.openid;

        // 判断当前用户是否需要绑定手机号码
        if (miChaServerRes.result.needBind) {
          this.loginResolve = resolve;

          uni.redirectTo({
            url: "/pages/bind/index"
          });

          return;
        }

        setRequestHeader("authorization", miChaServerRes.result.authorization);

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
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  src: url("/static/uni.ttf");
}
/* #endif */

.box {
  box-sizing: border-box;
}

.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-column {
  flex-direction: column;
}

.flex-1 {
  flex: 1;
}

.flex-ai-center {
  align-items: center;
}

.flex-jc-center {
  justify-content: center;
}

.height-fill {
  height: 100%;
}
</style>
