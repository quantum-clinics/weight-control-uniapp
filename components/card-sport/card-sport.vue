<style scoped>
  .sport {
    padding-bottom: 32rpx;
  }

  .title {
    font-size: 34rpx;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.65);
    height: 80rpx;
    line-height: 80rpx;
  }

  .class__item {
    width: 148rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin-right: 20rpx;
    margin-bottom: 24rpx;
    text-align: center;
    background: rgba(255, 255, 255, 1);
    color: rgba(96, 104, 118, 1);
    background: linear-gradient(
        135deg, rgba(255, 255, 255, 1) 0%,
        rgba(243, 245, 247, 1) 100%
    );
    box-shadow: 0 16rpx 20rpx 0 rgba(201, 214, 221, .25);
    border-radius: 24rpx;
    border: 2rpx solid rgba(255, 255, 255, .4);
  }

  .class__item--active {
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(
        90deg, rgba(255, 168, 33, 1) 0%,
        rgba(255, 193, 33, 1) 100%
    );
    box-shadow: 0 16rpx 20rpx 0 rgba(255, 219, 81, .25);
  }

  .box__class .class__item:nth-child(4n) {
    margin-right: 0;
  }

  .intensity__item {
    width: 160rpx;
    height: 160rpx;
    line-height: 160rpx;
    border-radius: 50%;
    margin-right: 24rpx;
    margin-bottom: 24rpx;
    text-align: center;
    font-weight: 600;
    background: rgba(255, 255, 255, 1);
    color: rgba(110, 117, 134, 1);
    background: linear-gradient(
        135deg, rgba(255, 255, 255, 1) 0%,
        rgba(243, 245, 247, 1) 100%
    );
    box-shadow: 0 16rpx 20rpx 0 rgba(201, 214, 221, .25);
    border: 2rpx solid rgba(255, 255, 255, .4);
  }

  .intensity__span.ft-44 {
    margin-bottom: 8rpx;
  }

  .intensity__item--active {
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(
        90deg,
        rgba(255, 168, 33, 1) 0%,
        rgba(255, 193, 33, 1) 100%
    );
    box-shadow: 0 16rpx 20rpx 0 rgba(255, 219, 81, .25);
  }
</style>

<template>
  <div class="sport">
    <div class="title">分类</div>
    <div class="box__class flex flex-wrap">
      <div
        v-for="(item, index) in sportClass"
        :class="['class__item ft-semi-bold', {'class__item--active': sportIndex === index}]"
        :key="index"
        @click="handleUserSelect('sportIndex', index)"
      >{{item.value}}</div>
    </div>
    <div class="title">强度</div>
    <div class="box__intensity flex flex-ai-center">
      <div
        :class="['intensity__item flex flex-column flex-jc-center flex-ai-center', {'intensity__item--active': intensityIndex === index}]"
        v-for="(item, index) in intensityClass"
        :key="index"
        @click="handleUserSelect('intensityIndex', index)"
      >
        <span :class="['intensity__span ft-semi-bold ft-44 line-fill']">{{item.answer}}</span>
        <span :class="['intensity__span ft-semi-bold ft-26 line-fill', {'ft-fff': intensityIndex === index}]">{{item.answerTip}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sportIndex: {
      type: Number
    },
    sportClass: {
      type: Array,
    },
    intensityIndex: {
      type: Number,
    },
    intensityClass: {
      type: Array,
    },
  },
  methods: {
    handleUserSelect(key, index) {
      this.$emit('userSelect', key, index);
    }
  }
};
</script>