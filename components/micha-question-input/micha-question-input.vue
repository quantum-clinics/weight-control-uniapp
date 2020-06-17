<style scoped>
  .question {
    background: #fff;
    border-radius: 0 32rpx 32rpx 32rpx;
  }

  .content__box {
    padding: 32rpx;
  }

  .content__mark {
    padding: 0 12rpx;
    height: 32rpx;
    line-height: 32rpx;
    background: rgba(20, 70, 231, 1);
    border-radius: 8rpx;
  }

  .content__title {
    line-height: 40rpx;
    padding: 16rpx 0 34rpx;
  }
</style>

<template>
  <div class="question">
    <div class="content box">
      <div class="content__box flex flex-column flex-ai-start">
        <div class="content__mark ft-20 ft-semi-bold ft-fff">{{question.mark}}</div>
        <div class="content__title ft-medium ft-32">{{question.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      question: Object,
    },
  }
</script>
