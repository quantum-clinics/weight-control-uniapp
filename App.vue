<script>
	import {
		userGetProviderInfo,
		userLoginByUniApp,
		getUserSettingByUniApp,
		getUserInfoByUniApp,
		userLoginByMiChaServer
	} from "@/static/js/authLogin";
	import { setRequestHeader } from "@/static/js/base";

	export default {
		globalData: {
			openid: "",
			provider: ""
		},
		async onLaunch() {
			try {
				// 获取当前服务端: [weixin, qq, ios..]
				const { provider } = await userGetProviderInfo();

				this.globalData.provider = provider[0];

				const uniAppLoginRes = await userLoginByUniApp(provider[0]);

				const { authSetting } = await getUserSettingByUniApp();

				// 判断当前用户是否授权
				if (!authSetting["scope.userInfo"]) {
					uni.redirectTo({
						url: "/pages/auth/index"
					});
					return;
				}

				const { userInfo } = await getUserInfoByUniApp();

				const miChaServerRes = await userLoginByMiChaServer(
					uniAppLoginRes.code,
					userInfo
				);

				console.log(miChaServerRes);

				this.globalData.openid = miChaServerRes.result.profile.openid;
				setRequestHeader("authorization", miChaServerRes.result.authorization);

				// 判断当前用户是否需要绑定手机号码
				if (miChaServerRes.result.needBind) {
					uni.redirectTo({
						url: "/pages/bind/index"
					});
				}
			} catch (err) {
				console.error(err);
			}
		},
		methods: {
			auth() {}
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
