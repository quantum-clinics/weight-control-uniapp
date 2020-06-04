<style scoped>
  .class__header {
    padding: 16rpx 32rpx;
  }

  .class__header::after {
    content: '';
    display: block;
    position: absolute;
    width: 12rpx;
    height: 32rpx;
    background: #188CFC;
    top: 20rpx;
    left: 0;
  }

  .class__title {
    color: rgba(43, 48, 73, 1);
    margin-bottom: 8rpx;
  }

  .class__spc {
    color: rgba(0, 0, 0, .25);
  }

  .class__list {
    padding-left: 32rpx;
  }

  .class__item {
    border-bottom: 1rpx solid rgba(224, 228, 232, 1);
    padding: 40rpx 0 36rpx;
  }

  .item__title {
    color: rgba(0, 0, 0, .85);
  }

  .item__teacher {
    margin: 16rpx 0 32rpx;
  }

  .teacher__icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 8rpx;
    /* TODO DELETE */
    background: #ddd;
  }

  .teacher__span {
    color: rgba(102, 102, 102, 1);
  }

  .item__info {
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
    color: #FF4A00;
  }

  .unread__icon {
    width: 28rpx;
    height: 28rpx;
  }
</style>

<template>
  <div class="class">
    <div class="class__header box relative">
      <div class="class__title ft-semi-bold ft-40 line-fill">最新课程</div>
      <div class="class__spc ft-28 line-fill">解锁需米茶币，阅读后返还部分米茶币</div>
    </div>

    <div class="class__list box">
      <div
        class="class__item"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="item__title ft-medium ft-32 line-fill">{{item.title}}</div>
        <div class="item__teacher flex flex-ai-center">
          <img
            class="teacher__icon"
            src=""
          >
          <span class="teacher__span ft-26 line-fill">{{item.teacher}}</span>
        </div>
        <div class="item__info flex flex-ai-center">
          <div
            v-if="item.isUpdateLately"
            class="info__mark ft-20"
          >最近更新</div>
          <span class="info__time flex-fill ft-26 line-fill">{{item.createTime}} 更新</span>
          <div
            class="info__status info__status--unread flex flex-ai-center"
            v-if="item.lock"
          >
            <span class="unread__span ft-24 ft-semi-bold">阅读需  {{item.price}}</span>
            <img
              src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/healthmarket/icon-currency.png"
              class="unread__icon"
            >
          </div>
          <div
            class="info__status info__status--read ft-24 ft-semi-bold"
            v-else
          >已阅读</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const list = [
    {
      title: '第45讲丨有些水果，其实是健康的杀手',
      teacher: '玄米老师',
      isUpdateLately: true,
      createTime: '2020年3月21',
      lock: true,
      price: 120,
    }, {
      title: '第44讲丨倒头就睡真的是睡眠好的表现吗？',
      teacher: '玄米老师',
      isUpdateLately: false,
      createTime: '2020年3月14',
      lock: false,
      price: 120,
    }, {
      title: '第43讲丨大蒜的抗癌故事',
      teacher: 'MR.right',
      isUpdateLately: true,
      createTime: '2020年3月21',
      lock: false,
      price: 180,
    },
  ];

  export default {
    data() {
      return {
        list,
      }
    }
  }
</script>