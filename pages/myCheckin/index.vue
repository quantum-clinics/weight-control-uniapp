<style scoped>
  .container {
    padding: 0 32rpx 114rpx;
    min-height: 100vh;
    background: rgba(245, 245, 245, 1);
  }

  .date-checkins {
    padding-top: 48rpx;
  }

  .date {
    margin-bottom: 24rpx;
    color: rgba(0, 0, 0, .45);
  }

  .checkin__item {
    background: linear-gradient(135deg, rgba(253, 255, 255, 1) 0%, rgba(250, 250, 250, 1) 100%);
    box-shadow: 0 16rpx 40rpx 0 rgba(231, 236, 241, .71);
    border-radius: 30rpx;
    border: 2rpx solid rgba(255, 255, 255, 1);
    margin-bottom: 16rpx;
    padding: 32rpx 32rpx 40rpx 24rpx;
  }

  .checkins .checkin__item:last-child {
    margin-bottom: 0;
  }

  .header__type {
    height: 48rpx;
    background: linear-gradient(117deg, rgba(247, 249, 251, 1) 0%, rgba(241, 245, 247, 1) 100%);
    border-radius: 30rpx;
    padding: 0 16rpx 0 4rpx;
  }

  .type__icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 8rpx;
  }

  .type__span {
    color: rgba(0, 0, 0, .65);
  }

  .type__span--meal {
    color: rgba(244, 115, 2, 1);
  }

  .header__tip {
    height: 40rpx;
    line-height: 40rpx;
    background: rgba(241, 243, 255, 1);
    padding: 0 8rpx;
    color: rgba(98, 105, 144, 1);
    border-radius: 8rpx;
  }

  .header__icon {
    width: 32rpx;
    height: 32rpx;
  }

  .content {
    margin-top: 40rpx;
    height: 56rpx;
  }

  .content__count {
    width: 266rpx;
  }

  .font__big {
    font-size: 56rpx;
    font-weight: 500;
    color: rgba(43, 48, 73, 1);
    line-height: 56rpx;
  }

  .font__small {
    font-size: 40rpx;
    font-weight: 500;
    color: rgba(43, 48, 73, 1);
    line-height: 40rpx;
  }

  .font__util {
    font-size: 32rpx;
    font-weight: 600;
    color: rgba(179, 184, 188, 1);
    line-height: 32rpx;
    margin-left: 8rpx;
  }

  .util__margin {
    margin-top: 18rpx;
  }

  .font__sport {
    color: rgba(43, 48, 73, 1);
    line-height: 40rpx;
  }

  .content__change {
    height: 40rpx;
  }

  .change__icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 16rpx;
  }

  .font__line {
    margin: 24rpx 8rpx 0 0;
    color: rgba(190, 196, 206, 1);
  }

  .font__line::after {
    content: '';
    display: block;
    position: absolute;
    top: -8rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 40rpx;
    height: 4rpx;
    background: rgba(242, 245, 247, 1);
  }

  .font__icon {
    width: 40rpx;
    height: 40rpx;
    margin: 10rpx 0 0 8rpx;
  }

  .content__sport {
    margin-top: 16rpx;
    color: rgba(43, 48, 73, 1);
    line-height: 40rpx;
  }
</style>

<template>
  <base-page :errorMessage="errorMessage" v-if="pageDisplay">
    <div class="container box">
      <div
        class="date-checkins"
        v-for="(item, index) in checkins"
        :key="index"
      >
        <div class="date ft-medium ft-28 line-fill">{{item.date}}</div>
        <div class="checkins">
          <div
            class="checkin__item box"
            v-for="(__item, __index) in item.checkins"
            :key="__index"
            @click="handleUserViewCheckin(index, __index)"
          >
            <!-- Header -->
            <div class="checkin__header flex flex-ai-center flex-jc-between">
              <div class="header__type flex flex-ai-center">
                <img
                  :src="__item.titleIcon"
                  class="type__icon"
                />
                <span :class="['type__span ft-24 ft-semi-bold', { 'type__span--meal': __item.type === '评分' }]">{{__item.title}}</span>
              </div>
              <div class="flex flex-jc-end flex-ai-center">
                <span
                  class="header__tip flex-fill ft-24 ft-semi-bold line-fill"
                  v-if="__item.hasAdvisorReply"
                >{{__item.hasAdvisorReplyTip}}</span>
                <img
                  :src="`${OSS}/micha/icon/icon-arrow-right-gray.png`"
                  class="header__icon"
                >
              </div>
            </div>

            <!-- 体重/腰围打卡 -->
            <div
              class="content flex flex-ai-end"
              v-if="__item.type === '数值'"
            >
              <div class="content__count flex">
                <span class="font__big">{{__item.currValue}}</span>
                <span class="font__util util__margin">{{__item.currUnit}}</span>
              </div>

              <div
                class="content__change flex flex-ai-center"
                v-if="__item.changeValue"
              >
                <img
                  :src="__item.changeIcon"
                  class="change__icon"
                />
                <span class="font__small">{{__item.changeValue}}</span>
                <span class="font__util">{{__item.changeUnit}}</span>
              </div>
            </div>

            <!-- 三餐打卡 -->
            <div
              class="content flex"
              v-if="__item.type === '评分'"
            >
              <div class="content__count flex">
                <span class="font__line relative ft-24 ft-semi-bold line-fill">{{__item.selfTip}}</span>
                <span class="font__big">{{__item.selfScore}}</span>
                <img
                  :src="__item.scoreIcon"
                  class="font__icon"
                />
              </div>

              <div
                class="content__count flex"
                v-if="__item.advisorScore > 0"
              >
                <span class="font__line relative ft-24 ft-semi-bold line-fill">{{__item.advisorTip}}</span>
                <span class="font__big">{{__item.advisorScore}}</span>
                <img
                  :src="__item.scoreIcon"
                  class="font__icon"
                />
              </div>
            </div>

            <!-- 运动打卡 -->
            <div
              class="content__sport ft-32 ft-medium"
              v-if="__item.type === '文本'"
            >
              {{__item.value}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-page>
</template>

<script>
  // TODO 缺省页面
  import inject from "@/static/js/inject";
  export default inject({
    data() {
      return {
        checkins: [],
        pageDisplay: false,
        tasks: [],
      }
    },
    async onLoad() {
      uni.showLoading({ title: 'Loading..' });
      const { list } = await this.callAPI("checkin.getMyCheckins");
      this.pageDisplay = true;
      this.checkins = list;
      uni.hideLoading();
    },
    methods: {
      handleUserViewCheckin(index, __index) {
        uni.navigateTo({ url: `/pages/checkin/index?checkin=${this.checkins[index].checkins[__index].checkin_id}`})
      }
    },
  });
</script>