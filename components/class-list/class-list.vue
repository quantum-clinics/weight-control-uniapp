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
</style>

<template>
  <div class="class">
    <div v-if="header" class="class__header box relative">
      <div class="class__title ft-semi-bold ft-40 line-fill">最新课程</div>
      <div class="class__spc ft-28 line-fill">解锁需米茶币，阅读后返还部分米茶币</div>
    </div>

    <div class="class__list box">
      <div
        class="class__item"
        v-for="(item, index) in data"
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
              src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/healthmarket/icon-currency.png"
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
</template>

<script>
import { formatTime } from '@/static/js/utils';

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
    data: {
      type: Array,
    }
  },
  methods: {
    lastedUpdateTime(value) {
      return formatTime(value)
    },
    handleUserCheckProduct(item, index) {
      if (item.hasExchanged) {
        // TODO Navigator URL
        return
      }

      this.$emit('userExchangeProduct', index);
    },
  },
  computed: {

  },
};
</script>