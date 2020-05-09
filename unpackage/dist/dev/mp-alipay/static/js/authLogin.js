import request from './base';

// 01用户获取获取服务供应商信息
function userGetProviderInfo(service = 'oauth') {
	return new Promise((resolve, reject) => {
		uni.getProvider({
		    service,
		    success: resolve,
		});
	})
}

// 02用户使用uni-app预登陆(获取code)
function userLoginByUniApp(provider){
	return new Promise((resolve, reject) => {
		const login = {
			provider,
			success: resolve,
		};
		
		if (provider === 'alipay') {
			login.scopes = 'auth_base';
		}
		
		uni.login(login);
	})
}

// 03获取用户授权设置
function getUserSettingByUniApp() {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success: resolve,
			fail: reject,
		})
	})
}

// 04获取用户信息
function getUserInfoByUniApp(provider) {
	return new Promise((resolve, reject) => {
		uni.getUserInfo({
		  provider,
		  success: resolve,
			fail: reject,
		});
	})
}

// 05用户登陆米茶睡眠服务器
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

export {
	userGetProviderInfo,
	userLoginByUniApp,
	getUserSettingByUniApp,
	getUserInfoByUniApp,
	userLoginByMiChaServer,
}