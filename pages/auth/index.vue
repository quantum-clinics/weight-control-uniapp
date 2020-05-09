<template>
	<div>
		<!-- 微信登陆 -->
		<button
			class="testbutton"
			hover-class="none"
			open-type="getUserInfo"
			@getuserinfo="handleGetUserInfo"
			withCredentials="true"
		>授权</button>
	</div>
</template>

<script>
	import {
		userLoginByUniApp,
		getUserInfoByUniApp,
		userLoginByMiChaServer,
	} from '@/static/js/authLogin';
	
	const app = getApp();
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			async handleGetUserInfo(e) {
				console.log(e);
				// 获取当前用户登陆code
				const uniAppLoginRes = await userLoginByUniApp(app.globalData.provider); 
				
				// 当前用户登陆米茶服务器
				const miChaServerRes = await userLoginByMiChaServer(uniAppLoginRes.code, e.detail.userInfo);
				
				app.globalData.openid = miChaServerRes.data.data.result.openid;
				
				uni.redirectTo({
					url: miChaServerRes.data.data.result.needBind
								? '/pages/bind/index'
								: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
</style>
