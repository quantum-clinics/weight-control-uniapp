<!-- 精品课列表组件 -->
<style scoped>
  .class__header {
    padding: 16rpx 32rpx;
  }

  .class__header::after {
    content: "";
    display: block;
    position: absolute;
    width: 12rpx;
    height: 32rpx;
    background: #188cfc;
    top: 20rpx;
    left: 0;
  }

  .class__title {
    color: rgba(43, 48, 73, 1);
    margin-bottom: 8rpx;
  }

  .class__spc {
    color: rgba(0, 0, 0, 0.25);
  }

  .class__list {
    padding-left: 32rpx;
  }

  .class__item {
    border-bottom: 1rpx solid rgba(224, 228, 232, 1);
    padding: 40rpx 0 36rpx;
  }

  .class__list .class__item:last-child {
    border: none;
  }

  .item__title {
    color: rgba(0, 0, 0, 0.85);
  }

  .item__status {
    width: 144rpx;
    height: 56rpx;
    text-align: center;
    line-height: 56rpx;
    background: rgba(24, 140, 252, 1);
    border-radius: 16rpx;
    margin: 0 32rpx;
  }

  .item__teacher {
    margin: 16rpx 0 32rpx;
  }

  .teacher__icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 8rpx;
  }

  .teacher__span {
    color: rgba(102, 102, 102, 1);
  }

  .item__info {
    height: 36rpx;
    padding-right: 36rpx;
  }

  .info__mark {
    height: 28rpx;
    line-height: 28rpx;
    padding: 0 8rpx;
    background: rgba(255, 143, 33, 1);
    border-radius: 8rpx;
    color: rgba(254, 255, 254, 1);
    margin-right: 16rpx;
  }

  .info__time {
    color: rgba(170, 170, 170, 1);
  }

  .info__status--read,
  .info__status--unread {
    height: 36rpx;
    line-height: 36rpx;
    padding: 0 16rpx;
    border-radius: 20rpx;
  }

  .info__status--read {
    background: rgba(240, 245, 248, 1);
    color: rgba(128, 136, 150, 1);
  }

  .info__status--unread {
    background: rgba(255, 249, 223, 1);
  }

  .unread__span {
    color: #ff4a00;
  }

  .unread__icon {
    width: 28rpx;
    height: 28rpx;
  }

  .shadow {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    transition: background-color .16s linear;
    background: rgba(0, 0, 0, .7);
    z-index: 9;
  }

  .dialog {
    width: 654rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 16rpx 40rpx 0 rgba(0, 0, 0, .21);
    border-radius:30px;
    padding: 0 48rpx 78rpx;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    transform: translate(-50%, -50%);
    transition: .16s linear;
    z-index: 10;
  }

  .dialog__image {
    width: 160rpx;
    height: 160rpx;
  }

  .dialog__title {
    color: rgba(43, 48, 73, 1);
  }

  .dialog__spc {
    line-height: 40rpx;
    color: rgba(96, 104, 118, 1);
    margin: 32rpx 0 80rpx;
  }

  .dialog__button {
    width: 430rpx;
    height: 88rpx;
    text-align: center;
    line-height: 88rpx;
    background: rgba(24, 140, 252, 1);
    border-radius: 44rpx;
  }

  .dialog__close {
    width: 92rpx;
    height: 92rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    bottom: -46rpx;
    left: 50%;
    transform: translateX(-50%);
  }

  .close__image {
    width: 60rpx;
    height: 60rpx;
  }
</style>

<template>
  <div class="relative">
    <div class="class">
      <div v-if="header" class="class__header box relative">
        <div class="class__title ft-semi-bold ft-40 line-fill">最新课程</div>
        <div class="class__spc ft-28 line-fill">解锁需米茶币，阅读后返还部分米茶币</div>
      </div>

      <div class="class__list box">
        <div
          class="class__item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleUserCheckProduct(item, index)"
        >
          <div class="flex flex-ai-start flex-jc-between">
            <div class="item__title flex-fill ft-medium ft-32">{{item.title}}</div>
            <div v-if="statusLock && !item.hasExchanged" class="item__status ft-medium ft-26 ft-fff">解锁</div>
          </div>
          <div class="item__teacher flex flex-ai-center">
            <img
                class="teacher__icon"
                :src="item.advisor.pic_url"
            />
            <span class="teacher__span ft-26 line-fill">{{item.advisor.name}}</span>
          </div>
          <div class="item__info flex flex-ai-center">
            <div v-if="item.isLastest" class="info__mark ft-20">最近更新</div>
            <span class="info__time flex-fill ft-26 line-fill">{{lastedUpdateTime(item.updateDate)}} 更新</span>
            <div
              class="info__status info__status--unread flex flex-ai-center"
              v-if="!item.hasExchanged"
            >
              <span class="unread__span ft-24 ft-semi-bold">阅读需 {{item.bonus}}</span>
              <img
                :src="`${OSS}/micha/icon/icon-currency.png`"
                class="unread__icon"
              />
            </div>
            <div
              class="info__status info__status--read ft-24 ft-semi-bold"
              v-if="item.hasExchanged && item.hasRead"
            >已阅读</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="shadow fixed"
      v-if="shadowDisplay"
      @click="handleToggleShadow"
    >
      <div
        class="dialog box absolute flex flex-column flex-ai-center flex-jc-center"
        @click.stop
      >
        <img
          :src="`${OSS}/micha/icon/icon-course-lock.png`"
          class="dialog__image"
        />
        <span class="dialog__title ft-semi-bold ft-40 line-fill">解锁本试听课程</span>
        <span class="dialog__spc ft-32">需要兑换250积分，积分一单兑换后无法撤回。</span>
        <div
          class="dialog__button ft-semi-bold ft-34 ft-fff"
          @click="handleUserExchange"
        >确认解锁</div>
        <div
          class="dialog__close absolute flex flex-ai-center flex-jc-center"
          @click="handleToggleShadow"
        >
          <img
            :src="`${OSS}/micha/icon/icon-shadow-close.png`"
            class="close__image "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatTime } from '@/static/js/utils';
  const app = getApp();

  export default {
    props: {
      header: {
        type: Boolean,
        value: false
      },
      statusLock: {
        type: Boolean,
        value: false
      },
      list: Array,
    },
    data() {
      return {
        shadowDisplay: false,
        OSS: app.globalData.OSS,
      }
    },
    methods: {
      lastedUpdateTime(value) {
        return formatTime(value)
      },
      handleToggleShadow() {
        this.shadowDisplay = !this.shadowDisplay;
      },
      handleUserExchange() {
        this.$emit('userExchangeProduct', this.activeIndex);
        this.shadowDisplay = false;
      },
      handleUserCheckProduct(item, index) {

        if (item.hasExchanged) {
          uni.navigateTo({ url: `/pages/webview/index?url=${item.url}` })
          return
        }

        this.shadowDisplay = true;
        this.activeIndex = index;
      },
    },
  };
</script>
