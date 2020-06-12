<style scoped>
  .base-page {
    width: 100vw;
    overflow-x: hidden;
  }

  .error {
    position: fixed;
    width: 100vw;
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
</style>

<template>
  <div class="base-page">
    <div class="error" :class="{ 'error--active': errorMessageDisplay }">{{errorMessage}}</div>
    <slot></slot>
  </div>
</template>

<script>
  let errorMessageCountDown;
  export default {
    props: {
      errorMessage: {
        type: String,
        value: ""
      }
    },
    data() {
      return {
        errorMessageDisplay: false
      };
    },
    watch: {
      errorMessage(value) {
        if (!value) {
          return;
        }

        if (errorMessageCountDown) {
          return;
        }

        this.errorMessageDisplay = true;

        errorMessageCountDown = setTimeout(() => {
          this.errorMessageDisplay = false;
          clearTimeout(errorMessageCountDown);
          errorMessageCountDown = null;
        }, 2500);
      }
    }
  };
</script>
