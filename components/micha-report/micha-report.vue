<style scoped>
  .ft-title {
    color: rgba(0, 0, 0, .85);
  }

  .report__container {
    width: 576rpx;
  }

  .report {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 12rpx 32rpx 0 rgba(143, 181, 198, .3);
    border-radius: 0 32rpx 32rpx 32rpx;
  }

  .report__header {
    padding: 32rpx 32rpx 64rpx;
  }

  .report__title {
    padding-left: 32rpx;
  }

  .report__user {
    padding-left: 90rpx;
    border-bottom: 1rpx solid #E0E4E8;
  }

  .report__padding {
    padding-top: 32rpx;
  }

  .user__title {
    color: rgba(0, 0, 0, .25);
  }

  .user__target {
    font-size: 72rpx;
    color: rgba(43, 48, 73, 1);
    margin: 16rpx 0;
  }

  .report__original {
    padding-top: 32rpx;
  }

  .original__item {
    padding-right: 32rpx;
    margin-right: 32rpx;
  }

  .original__label {
    padding: 0 8rpx;
    height: 36rpx;
    line-height: 36rpx;
    background: linear-gradient(
        89deg,
        rgba(55, 131, 255, 1) 0%,
        rgba(104, 185, 255, 1) 100%
    );
    border-radius: 8rpx;
  }

  .original__value {
    padding: 16rpx 0;
    font-size: 64rpx;
    color: rgba(55, 131, 255, 1);
    line-height: 64rpx;
  }

  .original__unit {
    color: rgba(0, 0, 0, .25);
  }

  .report__original .original__item:last-child {
    margin-right: 0;
  }

  .original__item::after {
    content: '';
    display: block;
    position: absolute;
    width: 2rpx;
    height: 48rpx;
    background: rgba(237, 237, 237, 1);
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  .report__original .original__item:last-child::after {
    content: '';
    width: 0;
    height: 0;
  }

  .report__original .original__item:nth-child(3) .original__label {
    background: linear-gradient(
        89deg,
        rgba(255, 119, 0, 1) 0%,
        rgba(255, 159, 53, 1) 100%)
  }

  .report__original .original__item:nth-child(3) .original__value {
    color: #FF7700;
  }

  .report__plans {
    padding: 32rpx 32rpx 48rpx;
  }

  .report__plan {
    height: 96rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 12rpx 32rpx 0 rgba(143, 181, 198, .3);
    border-radius: 16rpx;
    margin-bottom: 16rpx;
  }

  .report__dangers {
    padding: 26rpx 32rpx 64rpx;
    flex-wrap: wrap;
  }

  .dangers__item {
    /* height: 40rpx; */
    line-height: 40rpx;
    padding: 0 12rpx;
    background: rgba(240,245,248,1);
    color: rgba(96, 104, 118, 1);
    margin: 0 8rpx 16rpx 0;
  }

  .content__button {
    text-align: center;
    height: 112rpx;
    background: rgba(24, 140, 252, 1);
    border-radius: 0 0 32rpx 32rpx;
    padding-top: 16rpx;
  }

  .button__image {
    width: 228rpx;
    height: 36rpx;
    margin-top: 8rpx;
  }

  .report__tips {
    margin-top: 32rpx;
  }

  .report__tip {
    line-height: 32rpx;
    color: rgba(0, 0, 0, .25);
  }

  .report__plan--active {
    background: linear-gradient(90deg, rgba(255, 168, 33, 1) 0%, rgba(255, 193, 33, 1) 100%);
    box-shadow: 0 16rpx 20rpx 0 rgba(255, 219, 81, .25);
  }

  .plan__span {
    color: rgba(96, 104, 118, 1);
  }

  .report__plan--active .plan__span {
    color: #fff;
  }

  .content__button--disabled {
    background: rgba(0, 0, 0, .45);
  }

</style>

<template>
  <div v-if="talker.title" class="report__container">
    <div class="report">
      <div class="report__title report__padding flex flex-ai-start">
        <div class="flex-fill">
          <div class="ft-32 ft-semi-bold">{{talker.title}}</div>
        </div>
      </div>

      <div class="report__header">
        <div class="report__user flex flex-column">
          <span class="user__title ft-24 ft-medium line-fill">{{talker.aim.tip}}</span>
          <span class="user__target ft-72 ft-semi-bold line-fill">{{talker.aim.title}}</span>
        </div>

        <div class="report__original flex flex-jc-between box">
          <div
              class="original__item flex-fill relative flex flex-column flex-ai-start"
              v-for="(item, index) in [talker.height, talker.weight, talker.bmi]"
              :key="index"
          >
            <span class="original__label ft-24 ft-medium ft-fff line-fill">{{item.title}}</span>
            <span class="original__value ft-medium">{{item.value}}</span>
            <span class="original__unit ft-24 ft-medium line-fill">{{item.unit}}</span>
          </div>
        </div>
      </div>

      <div class="report__title flex flex-ai-start">
        <div class="flex-fill">
          <div
            v-for="(item, index) in talker.questionTitle"
            :key="index"
            class="ft-32 ft-semi-bold"
          >{{item}}</div>
        </div>
      </div>

      <div class="report__plans">
        <div
          v-if="!!shareValueType"
          class="report__plan flex flex-ai-center flex-jc-center report__plan--active"
        >
          <span class="plan__span ft-32 ft-semi-bold">{{shareValueType}}</span>
        </div>

        <div
          v-else
          :class="['report__plan flex flex-ai-center flex-jc-center', { 'report__plan--active': currentIndex === index }]"
          v-for="(item, index) in talker.question.options"
          @click="handleSelectIndex(index)"
          :key="index"
        >
          <span class="plan__span ft-32 ft-semi-bold">{{item.answer}}</span>
        </div>
      </div>

      <div class="report__title flex flex-ai-start">
        <div class="flex-fill">
          <div class="ft-32 ft-semi-bold">{{talker.risksTitle}}</div>
        </div>
      </div>

      <div class="report__dangers flex">
        <div
          class="dangers__item ft-28"
          v-for="(item, index) in talker.risks"
          :key="index"
        >{{item}}</div>
      </div>

      <div
        :class="['content__button box flex flex-column flex-ai-center', {'content__button--disabled': currentIndex < 0}]"
        v-if="!shareValueType"
        @click="handleSubmit"
      >
        <span class="ft-36 ft-semi-bold ft-fff line-fill">{{talker.btnTitle}}</span>
        <img
          :src="talker.btnIcon"
          class="button__image"
        >
      </div>
    </div>
    <div class="report__tips flex flex-column flex-jc-center flex-ai-center">
      <span
        class="ft-26 report__tip"
        v-for="(item, index) in talker.tip"
        :key="index"
      >{{item}}</span>
    </div>
  </div>
</template>

<script>
  const app = getApp();

  export default {
    props: {
      talker: Object,
      shareValueType: String,
    },
    data() {
      return {
        currentIndex: -1,
      }
    },
    methods: {
      handleSelectIndex(index) {
        if (!app.globalData.needRecord) {
          return;
        }

        this.currentIndex = index;
      },
      handleSubmit() {
        if (!app.globalData.needRecord) {
          return;
        }

        if (this.currentIndex < 0) {
          return;
        }

        this.$emit('shareValueChange', {
          type: this.talker.question.options[this.currentIndex].value,
        })
      },
    },
  }
</script>