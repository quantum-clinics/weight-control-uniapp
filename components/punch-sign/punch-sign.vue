<!-- 首页签到组件 -->
<style scoped>
.sign {
  width: 100%;
  padding: 0 16rpx;
  height: 206rpx;
  background: linear-gradient(
    360deg,
    rgba(240, 245, 248, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  justify-content: space-between;
}

.sign::after {
  content: "";
  display: block;
  position: absolute;
  width: 586rpx;
  height: 4rpx;
  background: rgba(232, 238, 242, 1);
  left: 52rpx;
  top: 98rpx;
}

.sign__item {
  padding-top: 32rpx;
  z-index: 1;
}

.item__status {
  line-height: 24rpx;
}

.item__images {
  height: 88rpx;
}

.item__award {
  top: 146rpx;
  left: 50%;
  transform: translateX(-50%);
  padding: 4rpx 12rpx 0;
  line-height: 24rpx;
  height: 36rpx;
  background: rgba(254, 255, 254, 1);
  box-shadow: 0 0 24rpx 0 rgba(176, 197, 218, 0.52);
  border: 1rpx solid rgba(231, 236, 239, 1);
  border-radius: 10rpx;
}

.item__award::after {
  content: "";
  display: block;
  position: absolute;
  top: -10rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15rpx solid transparent;
  border-right: 15rpx solid transparent;
  border-bottom: 15rpx solid rgba(254, 255, 254, 1);
}

.award__span {
  color: rgba(255, 108, 0, 1);
  font-family: DINPro-Bold, DINPro;
}

.award__icon {
  width: 28rpx;
  height: 28rpx;
}

.item__intro {
  /*width: 96rpx;*/
  white-space: nowrap;
  top: 146rpx;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(178, 186, 198, 1);
  margin-top: 8rpx;
}
</style>

<template>
  <div class="sign box flex relative">
    <div
      class="sign__item relative flex-fill box flex flex-column flex-ai-center"
      v-for="(item, index) in signList"
      :key="index"
    >
      <span
        class="item__status ft-semi-bold ft-24"
        :style="item.titleStyle"
      >{{item.title || '&nbsp;'}}</span>

      <div class="item__images flex flex-column flex-jc-center flex-ai-center">
        <img :src="item.imageSrc" :style="item.imageStyle" />
      </div>

      <div class="item__award box absolute flex flex-jc-center flex-ai-start" v-if="item.award">
        <span class="award__span ft-bold ft-24 line-fill">+{{item.award}}</span>
        <img
          class="award__icon"
          src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/healthmarket/icon-currency.png"
        />
      </div>

      <div
        class="item__intro absolute ft-24 line-fill ft-semi-bold"
        v-if="item.intro"
      >{{item.intro}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    signList: {
      type: Array
    }
  }
};
</script>
