<style scoped>
  .container {
    padding: 0 32rpx;
  }

  .date-checkins {
    padding-top: 48rpx;
  }

  .date {
    margin-bottom: 24rpx;
    color: rgba(0, 0, 0, .45);
  }

  .checkin__item {
    height: 216rpx;
    background: linear-gradient(135deg, rgba(253, 255, 255, 1) 0%, rgba(250, 250, 250, 1) 100%);
    box-shadow: 0 16rpx 40rpx 0 rgba(231, 236, 241, .71);
    border-radius: 30rpx;
    border: 2rpx solid rgba(255, 255, 255, 1);
    margin-bottom: 16rpx;
    padding: 32rpx 32rpx 0 24rpx;
  }

  .checkins .checkin__item:last-child {
    margin-bottom: 0;
  }

  .checkin__header {
    margin-bottom: 40rpx;
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

  .header__tip {
    height: 32rpx;
    line-height: 32rpx;
    background: rgba(255, 237, 233, 1);
    padding: 0 8rpx;
    color: rgba(255, 74, 0, 1);
  }

  .header__icon {
    width: 32rpx;
    height: 32rpx;
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
    line-height: 64rpx;
    margin-left: 8rpx;
  }

  .change__icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 16rpx;
    background: #dd524d;
  }
</style>

<template>
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
          v-for="(__item, __index) in item.list"
          :key="__index"
        >
          <div class="checkin__header flex flex-ai-center flex-jc-between">
            <div class="header__type flex flex-ai-center">
              <img
                :src="__item.icon"
                class="type__icon"
              />
              <span class="type__span ft-24 ft-semi-bold line-fill">{{__item.type}}</span>
            </div>
            <div class="flex flex-jc-end flex-ai-center">
              <span
                class="header__tip flex-fill ft-24 ft-semi-bold line-fill"
                v-if="__index === 2"
              >导师已点评</span>
              <img
                :src="`${OSS}/micha/icon/icon-arrow-right-gray.png`"
                class="header__icon"
              >
            </div>
          </div>

          <div class="content flex">
            <div
              class="content__count flex"
              v-if="__item.type === '体重打卡' || __item.type === '腰围打卡'"
            >
              <span class="font__big">75.6</span>
              <span class="font__util">公斤</span>
            </div>

            <div
              class="content__count flex"
              v-if="__item.type === '三餐打卡'"
            >
              <span class="font__big">75.6</span>
              <span class="font__util">公斤</span>
            </div>

            <div class="content__change flex flex-ai-center">
              <img
                src
                class="change__icon"
              />
              <span class="font__small">1.0</span>
              <span class="font__util">公斤</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import inject from "@/static/js/inject";
  const checkins = [
    {
      date: '2020年7月14日 星期三',
      list: [
        {
          icon: '',
          type: '体重打卡',
          count: '75.6',
          util: '公斤',
          change: '1.0',
        }, {
          icon: '',
          type: '腰围打卡',
          count: '114.0',
          util: '厘米',
          change: '2.0',
        }, {
          icon: '',
          type: '早餐打卡',
          count: '3',
          util: '公斤',
          change: '1.0',
        },
      ],
    },
  ];
  export default inject({
    data() {
      return {
        checkins,
      }
    },
  });
</script>