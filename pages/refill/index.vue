<style scoped>
  .refill {
    padding: 32rpx 0 0;
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
    padding-bottom: 132rpx;
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
    bottom: 48rpx;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<template>
  <div class="refill flex flex-column box">
    <div class="refill__header box flex flex-column flex-ai-center">
      <div class="header__count box ft-medium line-fill">{{bonus}}</div>
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

    <div
      class="refill__button fixed ft-medium ft-32 ft-fff"
      @click="handleRefillCurrency"
    >确认充值，去支付</div>
  </div>
</template>

<script>
  import inject from "@/static/js/inject";
  const app = getApp();

  export default inject({
    data() {
      return {
        currentIndex: 0,
        refillList: [],
        bonus: 0,
      }
    },
    onLoad() {
      this.fetchData();
      this.bonus = app.globalData.bonus;
    },
    methods: {
      async fetchData() {
        uni.showLoading({ title: 'Loading..' });
        const res = await this.callAPI('cashProduct.getAllCashExchangeBonus');
        this.refillList = res.list;
        uni.hideLoading();
      },
      handleSelectIndex(index) {
        this.currentIndex = index;
      },
      async getTrade() {
        return await this.callAPI("cashProduct.order", {
          id: this.refillList[this.currentIndex]._id,
        });
      },
      async getOrderInfo(trade) {
        return await this.callAPI("cashProduct.requestToPay", {
          trade,
          channel: "alipay",
          endPoint: "mobile_inner_app"
        });
      },
      async handleRefillCurrency() {
        uni.showLoading({ title: '请稍后...' });

        const { trade } = await this.getTrade();
        const { chargeID, tradeID, statement } = await this.getOrderInfo(trade);

        uni.requestPayment({
          provider: "alipay",
          orderInfo: statement.tradeNo,
          success: async (res) => {
            uni.hideLoading();

            const { bonus } = await this.callAPI('user.getUserBonus');
            app.globalData.bonus = bonus;
            this.bonus = bonus;

            uni.showToast({
              title: "支付成功",
              icon: "success",
              duration: 2000,
              complete: function() {}
            });
          },
          fail: (err) => {
            uni.hideLoading();
            uni.showToast({
              title: "支付失败，请到订单中心重新支付",
              icon: "none",
              duration: 2000,
              complete: function() {}
            });
          }
        });
      },
    }
  })
</script>
