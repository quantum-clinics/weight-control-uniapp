<!-- 首页打卡组件 -->
<style scoped>
  .card {
    width: 100%;
    padding: 48rpx 32rpx 32rpx;
    background: #fff;
  }

  .card::after {
    content: '';
    display: block;
    position: absolute;
    width: 12rpx;
    height: 32rpx;
    background: #007BF2;
    top: 52rpx;
    left: 0;
  }

  .card__title {
    color: rgba(43, 48, 73, 1);
    line-height: 40rpx;
  }

  .card__spc {
    color: rgba(0, 0, 0, .25);
    line-height: 28rpx;
    margin: 8rpx 0 32rpx;
  }

  .card__list {
    justify-content: space-between;
  }

  .item__imagebox,
  .item__image {
    width: 80rpx;
    height: 80rpx;
  }

  .item__imagebox {
    margin-bottom: 16rpx;
  }

  .item__status {
    width: 28rpx;
    height: 28rpx;
    right: -8rpx;
    bottom: -8rpx;
  }

  .status__unfinish,
  .status__icon {
    width: 28rpx;
    height: 28rpx;
  }

  .status__unfinish {
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;
    background: #FF8F21;
    text-align: center;
    line-height: 28rpx;
  }

  .item__span--finish,
  .item__span--unfinish {
    line-height: 28rpx;
    font-weight: 500;
    font-size: 28rpx;
  }

  .item__span--finish {
    color: rgba(137, 149, 169, 1);
  }

  .item__span--unfinish {
    color: rgba(43, 48, 73, 1);
  }

  /* TODO DELETE */
  .status__icon {
    background: #FF8F21;
    border-radius: 50%;
  }
</style>

<template>
  <div class="card box relative">
    <div class="card__title ft-semi-bold ft-40">打卡签到(4/8)</div>
    <div class="card__spc ft-28">每天完成所有打卡自动签到</div>
    <div class="card__list flex flex-ai-center">
      <navigator
        class="list__item flex flex-ai-center flex-jc-center flex-column"
        v-for="(item, index) in tasks"
        :key="index"
        :url="`/pages/record/index?id=${item.id}`"
      >
        <div class="item__imagebox relative">
          <img
            class="item__image"
            :src="item.icon"
          >

          <div class="item__status absolute ft-bold ft-fff ft-20">
            <!--
            <div
              class="status__unfinish"
              v-if="item.missionCount > item.missionFinishCount + 1"
            >
              {{item.missionCount - item.missionFinishCount}}
            </div>
            -->

            <img
              class="status__icon"
              v-if="item.done"
              src
            >
          </div>
        </div>
        <div :class="item.done ? 'item__span--finish' : 'item__span--unfinish'">{{item.title}}</div>
      </navigator>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tasks: {
        type: Array,
      },
    }
  };
</script>
