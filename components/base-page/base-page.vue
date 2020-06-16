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
    <div class="error" :class="{ 'error--active': errorMessage }">{{errorMessage}}</div>
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      errorMessage: {
        type: String,
        value: ""
      },
    },
  };
</script>
