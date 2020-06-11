<style scoped>
.header {
  width: 100vw;
  padding: 50rpx 24rpx 0;
}

.header::after {
  content: "";
  display: block;
  position: absolute;
  width: 150vw;
  height: 100%;
  background: #188cfc;
  border-radius: 0 0 200px 200px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}

.header__currency {
  margin-bottom: 8rpx;
}

.currency__icon {
  width: 28rpx;
  height: 28rpx;
  margin-right: 8rpx;
}

.currency__span {
  color: rgba(255, 255, 255, 0.45);
}

.info__count {
  font-size: 88rpx;
  line-height: 88rpx;
  margin-right: 16rpx;
}

.info__hint {
  height: 36rpx;
  background: rgba(3, 112, 233, 1);
  border-radius: 18rpx;
  padding: 0 12rpx;
  margin: 44rpx 8rpx 0 0;
}

.hint__title {
  color: rgba(152, 202, 255, 1);
  margin-right: 4rpx;
}

.header__card {
  background: #fff;
  border-radius: 30rpx;
  padding-bottom: 32rpx;
  overflow: hidden;
  margin-top: 32rpx;
  box-shadow: 0 24rpx 48rpx 0 rgba(144, 181, 216, 0.25);
}

.card__mission {
  height: 80rpx;
  padding: 0 14rpx;
  background: linear-gradient(
    90deg,
    rgba(255, 168, 33, 1) 0%,
    rgba(255, 193, 33, 1) 100%
  );
  border-radius: 24rpx;
  margin-top: 32rpx;
}

.mission__image {
  width: 72rpx;
  height: 72rpx;
}

.mission__span {
  line-height: 32rpx;
  text-shadow: 0 1rpx 0 rgba(239, 127, 4, 1);
  margin: 24rpx 8rpx 0 0;
}

.mission__icon {
  width: 32rpx;
  height: 32rpx;
  margin-top: 24rpx;
}

.mission__float {
  width: 164rpx;
  height: 36rpx;
  background: linear-gradient(
    180deg,
    rgba(255, 79, 31, 1) 0%,
    rgba(255, 56, 55, 1) 100%
  );
  box-shadow: 0 8rpx 20rpx 0 rgba(255, 51, 51, 0.5);
  border-radius: 12rpx 12rpx 12rpx 0;
  top: -20rpx;
  right: -48rpx;
}

.float__icon {
  width: 28rpx;
  height: 28rpx;
}

.banner {
  padding-left: 32rpx;
  margin: 96rpx auto 66rpx;
  width: 702rpx;
  height: 128rpx;
  background: linear-gradient(
    90deg,
    rgba(255, 135, 30, 1) 0%,
    rgba(255, 168, 30, 1) 100%
  );
  box-shadow: 0 2rpx 0 0 rgba(255, 255, 255, 0.3);
  border-radius: 30rpx;
}

.banner::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: -12rpx;
  background: linear-gradient(
    90deg,
    rgba(247, 117, 3, 1) 0%,
    rgba(240, 140, 0, 1) 100%
  );
  box-shadow: 0 2rpx 0 0 rgba(217, 100, 52, 1);
  border-radius: 30rpx;
  z-index: -1;
}

.banner__image {
  width: 232rpx;
  height: 170rpx;
  margin: -42rpx 32rpx 0 0;
}

.banner__intro {
  padding-top: 24rpx;
}

.banner__title {
  text-shadow: 0 1rpx 0 rgba(196, 116, 1, 1);
  margin-bottom: 8rpx;
}

.banner__info {
  justify-content: space-between;
}

.info__spc {
  text-shadow: 0 1rpx 0 rgba(196, 116, 1, 1);
  color: rgba(255, 255, 255, 0.8);
}

.info__price {
  height: 32rpx;
  background: rgba(255, 249, 223, 1);
  border-radius: 200rpx 0 0 200rpx;
  padding: 0 12rpx 0 16rpx;
}

.price__span {
  color: rgba(255, 74, 0, 1);
}

.price__icon {
  width: 28rpx;
  height: 28rpx;
}
</style>

<template>
  <base-page :errorMessage="errorMessage" ref="basePage" class="page">
    <div class="header box relative">
      <div class="header__currency flex flex-ai-center">
        <img
          class="currency__icon"
          src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/healthmarket/icon-currency.png"
        />
        <span class="currency__span ft-semi-bold font-28">米茶币</span>
      </div>

      <div class="header__info flex">
        <span class="info__count ft-medium ft-fff">3600</span>
        <div class="info__hint flex flex-ai-center flex-jc-center">
          <span class="hint__title ft-semi-bold ft-20 line-fill">昨日奖励</span>
          <span class="ft-fff ft-medium ft-24 line-fill">630</span>
        </div>
        <div class="info__hint flex flex-ai-center flex-jc-center">
          <span class="hint__title ft-semi-bold ft-20 line-fill">领先同龄</span>
          <span class="ft-fff ft-medium ft-24 line-fill">92%</span>
        </div>
      </div>

      <div class="header__card flex flex-column flex-ai-center">
        <punch-sign />
        <punch-card
            :tasks="tasks"
        />
        <div class="card__mission relative box flex flex-jc-center">
          <img
            class="mission__image"
            src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/icon/icon-medal.png"
          />
          <span class="mission__span flex-1 ft-bold ft-fff ft-32">今日有新的挑战</span>
          <img
            class="mission__icon"
            src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/healthmarket/icon-arrow.png"
          />

          <div class="mission__float absolute flex flex-ai-center flex-jc-center">
            <span class="float__span ft-fff ft-24">幸运日 3倍</span>
            <img
              class="float__icon"
              src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/healthmarket/icon-currency.png"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="banner flex box relative">
      <img
        class="banner__image"
        src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/icon/image-call.png"
      />

      <div class="banner__intro flex-fill">
        <div class="banner__title ft-fff ft-40 ft-bold line-fill">我要呼叫玄米老师</div>
        <div class="banner__info flex flex-ai-center">
          <span class="info__spc ft-medium ft-32 line-fill">专家陪你一起瘦</span>
          <div class="info__price box flex flex-ai-center">
            <span class="price__span ft-semi-bold ft-24 line-fill">需120</span>
            <img
              class="price__icon"
              src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/healthmarket/icon-currency.png"
            />
          </div>
        </div>
      </div>
    </div>

    <class-list
      header
      :data="recomProducts"
      @userExchangeProduct="handleUserExchangeProduct"
    />
  </base-page>
</template>

<script>
  import inject from '@/static/js/inject';
  import {
    userFetchRecomProducts,
    userExchangeProduct,
  } from '@/static/apis/bonusProduct';
  import { userFetchTasks } from '@/static/apis/groupSchedule';

  const app = getApp();

  export default inject({
    data() {
      return {
        recomProducts: [],
        tasks: [],
      };
    },
    async onLoad() {
      await app.$vm.init();
      await this.callAPI(this.fetchIndexDate())
    },
    methods: {
      async fetchIndexDate() {
        const [recomProducts, tasks] = await Promise.all([
          userFetchRecomProducts(),
          userFetchTasks(),
        ]);
        this.recomProducts = recomProducts.data.result.list;
        this.tasks = tasks.data.result.tasks;
      },
      async getTasks() {
        return await userFetchTasks();
      },
      async handleUserExchangeProduct(index) {
        uni.showLoading({ title: '加载中..' });

        const target = this.recomProducts[index];
        const result = await userExchangeProduct(target._id);

        // TODO code !== 1??
        uni.hideLoading();
        target.hasExchanged = result.success;
      }
    }
  });
</script>

<style>
</style>
