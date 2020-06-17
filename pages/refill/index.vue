<style scoped>
  .refill {
    padding: 32rpx 0 48rpx;
    min-height: 100vh;
  }

  .refill__header {
    width: calc(100vw - 64rpx);
    height: 180rpx;
    background: rgba(255, 249, 223, 1);
    border-radius: 24rpx;
    padding-top: 32rpx;
    margin: auto;
  }

  .header__count {
    font-size: 72rpx;
    color: rgba(255, 74, 0, 1);
  }

  .currency__icon {
    width: 28rpx;
    height: 28rpx;
    margin-right: 8rpx;
  }

  .currency__span {
    color: rgba(255, 74, 0, .45);
  }

  .refill__box {
    margin-top: 36rpx;
    padding-left: 32rpx;
  }

  .refill__title {
    height: 104rpx;
    line-height: 104rpx;
    color: rgba(0, 0, 0, .85);
  }

  .refill__items {
    flex-wrap: wrap;
  }

  .refill__item {
    width: 334rpx;
    height: 172rpx;
    background: rgba(250, 250, 250, 1);
    border-radius: 24rpx;
    border: 2rpx solid rgba(250, 250, 250, 1);
    margin: 0 18rpx 16rpx 0;
    padding-top: 32rpx;
  }

  .refill__item--active {
    background: rgba(24, 140, 252, .05);
    border: 2rpx solid rgba(24, 140, 252, 1);
  }

  .refill__item--active .refill__font {
    color: rgba(24, 140, 252, 1);
  }

  .refill__number {
    font-size: 64rpx;
    color: rgba(43, 48, 73, 1);
    line-height: 72rpx;
    margin-right: 8rpx;
  }

  .refill__util {
    color: rgba(96, 104, 118, 1);
    line-height: 28rpx;
    margin-top: 34rpx;
  }

  .refill__spc {
    margin-top: 8rpx;
    color: rgba(0, 0, 0, .25);
    line-height: 28rpx;
  }

  .refill__button {
    width: 366rpx;
    height: 88rpx;
    background: rgba(24, 140, 252, 1);
    border-radius: 44rpx;
    text-align: center;
    line-height: 88rpx;
    margin: 400rpx auto 0;
  }
</style>

<template>
  <div class="refill flex flex-column">
    <div class="refill__header box flex flex-column flex-ai-center">
      <div class="header__count box ft-medium line-fill">4000</div>
      <div class="header__currency flex flex-ai-center">
        <img
          :src="`${OSS}/micha/icon/icon-currency.png`"
          class="currency__icon"
        />
        <span class="currency__span ft-28 ft-medium">米茶币余额</span>
      </div>
    </div>

    <div class="refill__box flex-fill">
      <div class="refill__title ft-40 ft-medium">充值金额</div>
      <div class="refill__items flex">
        <div
          v-for="(item, index) in refillList"
          :key="index"
          :class="['refill__item box flex flex-column flex-ai-center', { 'refill__item--active': currentIndex === index}]"
          @click="handleSelectIndex(index)"
        >
          <div class="flex">
            <span class="refill__font ft-medium refill__number">{{item.bonus}}</span>
            <span class="refill__font ft-medium refill__util ft-28 ft-medium">{{item.bonusUnit}}</span>
          </div>
          <div class="refill__font refill__spc ft-28 ft-medium">{{item.tip}}</div>
        </div>
      </div>
    </div>

    <div class="refill__button ft-medium ft-32 ft-fff">确认充值，去支付</div>
  </div>
</template>

<script>
  import inject from "@/static/js/inject";

  export default inject({
    data() {
      return {
        currentIndex: 0,
        refillList: [],
      }
    },
    onLoad() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        const res = await this.callAPI('cashProduct.getAllCashExchangeBonus');
        this.refillList = res.list;
      },
      handleSelectIndex(index) {
        this.currentIndex = index;
      }
    }
  })
</script>
