<style scoped>
  .header {
    height: 88rpx;
  }

  .icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 16rpx;
  }

  .title {
    font-size: 40rpx;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    line-height: 56px;
  }

  .tip {
    font-size: 28rpx;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.45);
    line-height: 40rpx;
  }
</style>

<template>
  <div>
    <div class="flex flex-ai-center header">
      <img class="icon" :src="icon" alt />
      <span
        class="title"
        v-if="!recordFinish"
      >{{title}}</span>
      <span
          class="title"
          v-if="recordFinish"
      >{{titleFinish || title}}</span>
    </div>
    <div
      class="tip"
      v-if="!recordFinish && (tip)"
    >{{tip}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
      },
      icon: {
        type: String
      },
      title: {
        type: String
      },
      titleFinish: {
        type: String
      },
      tip: {
        type: String
      },
      recordFinish: {
        type: Boolean,
        value: false,
      }
    },
  };
</script>
