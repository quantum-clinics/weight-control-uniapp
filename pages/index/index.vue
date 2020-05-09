<template>
	<base-page :errorMessage="errorMessage" ref="basePage">
		<div>这里是首页</div>
	</base-page>
</template>

<script>
	export default {
		data() {
			return {
				errorMessage: ""
			};
		},
		async onLoad() {
			console.log(this.$refs);
			const a = await this.bann();
			console.log(a);

			// TODO DELETE, FOR EXAMPLE NETWORK ERROR MESSAGE
			this.displayErrorMessage = setTimeout(() => {
				// this.errorMessage = "some err be created! errorMessage => code 12";
				// this.$refs.basePage.base();
			}, 1500);
		},
		methods: {
			bann() {
				return new Promise((resolve, reject) => {
					reject({
						code: -1,
						msg: "test"
					});
				});
			}
		}
	};
</script>

<style>
</style>
