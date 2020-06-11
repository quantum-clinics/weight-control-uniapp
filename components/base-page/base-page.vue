<style scoped>
	.base-page {
		width: 100vw;
		overflow-x: hidden;
	}

	.error {
		position: fixed;
		width: 750rpx;
		background: #e4393c;
		color: #fff;
		padding: 10rpx 20rpx;
		top: 0;
		left: 0;
		transition: 0.36s linear;
		transform: translateY(-100%);
		z-index: 99;
	}
	.error--active {
		transform: translateY(0);
	}

	.error--hide {
	}
</style>

<template>
	<div class="base-page">
<!--		<div class="error" :class="{ 'error&#45;&#45;active': errorMessageDisplay }">{{errorMessages}}</div>-->
		<div class="error" :class="{ 'error--active': !!errorMessage }">{{errorMessage}}</div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: {
			errorMessage: {
				type: String,
				value: ""
			}
		},
		data() {
			return {
				// errorMessages: "",
				errorMessageDisplay: false
			};
		},
		methods: {
			base() {
				this.errorMessages = "some err be created! errorMessage => code 12";
			}
		},
		watch: {
			errorMessages(newValue, oldValue) {
				console.log(newValue);
				if (!newValue) return;
				this.errorMessageDisplay = true;
				this.errorMessageCountDown = setTimeout(() => {
					this.errorMessageDisplay = false;
					clearTimeout(this.errorMessageCountDown);
					this.errorMessageCountDown = null;
				}, 3000);
			}
		}
	};
</script>