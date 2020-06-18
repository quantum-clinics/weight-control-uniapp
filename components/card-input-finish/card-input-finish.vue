<style scoped>
  .page {
    padding: 80rpx 0 50rpx;
  }

  .header {
    margin-bottom: 48rpx;
  }

  .header__bold {
    font-size: 144rpx;
    color: rgba(43, 48, 73, 1);
    line-height: 144rpx;
    margin-right: 16rpx;
  }

  .header__util {
    margin-top: 84rpx;
    color: rgba(189, 191, 202, 1);
  }

  .card {
    width: 396rpx;
    height: 188rpx;
    background: linear-gradient(135deg, rgba(250, 254, 255, 1) 0%, rgba(243, 245, 247, 1) 100%);
    border-radius: 40rpx;
  }

  .card__mark {
    height: 32rpx;
    background: rgba(255, 74, 0, 1);
    border-radius: 8rpx;
    margin: 34rpx 8rpx 0 0;
    padding: 0 8rpx 0 4rpx;
  }

  .rise {
    background: rgba(255, 74, 0, 1);
  }

  .decline {
    background: rgba(25, 214, 127, 1);
  }

  .unchanged {
    background: rgba(21, 121, 248, 1);
  }

  .mark__icon {
    width: 32rpx;
    height: 32rpx;
    background: #ddd;
  }

  .info__count {
    font-size: 76rpx;
    color: rgba(96, 104, 118, 1);
  }

  .card__spc {
    color: rgba(189, 191, 202, 1);
    text-align: center;
    margin-top: 16rpx;
  }
</style>

<template>
  <div class="page flex flex-column flex-ai-center flex-jc-center">
    <div class="header flex flex-jc-center">
      <span class="header__bold ft-medium">{{source.currValue}}</span>
      <span class="header__util ft-semi-bold ft-40 line-fill">{{source.currUnit}}</span>
    </div>

    <div class="card flex flex-ai-center flex-jc-center flex-column">
      <div class="card__info flex flex-jc-center">
        <div :class="['flex flex-ai-center card__mark', source.compareClass]">
          <img
            v-if="source.compareIcon"
            :src="source.compareIcon"
            class="mark__icon"
          />
          <span class="ft-fff ft-semi-bold ft-24">{{source.compareTip}}</span>
        </div>
        <span class="info__count line-fill">{{source.compareValue}}</span>
      </div>
      <div class="card__spc ft-32 line-fill">{{source.compareTitle}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      source: Object,
    }
  }
</script>
