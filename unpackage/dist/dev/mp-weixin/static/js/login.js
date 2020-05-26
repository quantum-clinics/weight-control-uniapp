import request from './base';
import config from './platformConfig';

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

// 用户使用uni-app登陆平台
function userLoginByUniApp(provider) {
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
function getUserInfoByUniApp(provider) {
	return new Promise((resolve, reject) => {
		uni.getUserInfo({
			provider,
			success: resolve,
			fail: reject,
		});
	})
}

// 用户登陆米茶服务器
function userLoginByMiChaServer(code, wechatProfile) {
	return request({
		data: {
			method: "user.login",
			data: {
				code,
				wechatProfile,
			},
		}
	})
}

// 获取用户平台权限设置
function userInfoAuthSetting(authSetting, provider, power) {
	return !!authSetting[config[provider][power]];
}

export {
	userGetProviderInfo,
	userLoginByUniApp,
	userInfoAuthSetting,
	getUserSettingByUniApp,
	getUserInfoByUniApp,
	userLoginByMiChaServer,
}
