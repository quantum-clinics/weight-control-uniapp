import request from '@/static/js/base';
import config from '@/static/js/platformConfig';

let provider;

// 用户获取获取服务供应商信息
function userGetProviderInfo(service = 'oauth') {
  return new Promise((resolve, reject) => {
    uni.getProvider({
      service,
      success: resolve,
      fail: reject,
    });
  })
}

// 设置provider
function setProvider(platform) {
  provider = platform;
}

// 用户使用uni-app登陆平台
function userLoginByUniApp() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider,
      success: resolve,
      fail: reject,
    });
  })
}

// 获取用户授权设置
function getUserSettingByUniApp() {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: resolve,
      fail: reject,
    })
  })
}

// 获取用户平台信息
function getUserInfoByUniApp() {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      provider,
      success: resolve,
      fail: reject,
    });
  })
}

// 用户登陆米茶服务器
function userLoginByMiChaServer(code, profile) {
  return request({
    data: {
      method: "user.login",
      data: {
        code,
        profile,
      },
    }
  })
}

// 获取用户平台权限设置
function userInfoAuthSetting(authSetting, power) {
  return !!authSetting[config[provider][power]];
}

export {
  userGetProviderInfo,
  setProvider,
  userLoginByUniApp,
  userInfoAuthSetting,
  getUserSettingByUniApp,
  getUserInfoByUniApp,
  userLoginByMiChaServer,
}
