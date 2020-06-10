<style scoped>
  .ft-title {
    color: rgba(0, 0, 0, .85);
  }
  .page {
    background: rgba(24, 140, 252, 1);
    padding: 32rpx;
    min-height: 100vh;
  }

  .report {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 12rpx 32rpx 0 rgba(143, 181, 198, .3);
    border-radius: 30rpx;
  }

  .report__header {
    padding: 48rpx 32rpx 80rpx;
  }

  .report__user {
    padding-bottom: 32rpx;
    border-bottom: 1rpx solid #E0E4E8;
  }

  .user__avatar {
    width: 112rpx;
    height: 112rpx;
    margin-right: 24rpx;
  }

  .user__target {
    width: 232rpx;
    margin-top: 16rpx;
    display: inline-flex;
    height: 44rpx;
    padding: 0 16rpx 0 12rpx;
    background: linear-gradient(135deg, rgba(255, 179, 24, 1) 0%, rgba(255, 145, 23, 1) 100%);
    border-radius: 8rpx;
  }

  .user__mark {
    color: rgba(255, 255, 255, .85);
    margin: 0 8rpx 0 4rpx;
  }

  .report__original {
    padding-top: 32rpx;
  }

  .original__item {
    padding-left: 36rpx;
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

  .title__mark {
    margin-top: 8rpx;
    width: 12rpx;
    height: 32rpx;
    background: rgba(0, 123, 242, 1);
    margin-right: 20rpx;
  }

  .report__plans {
    padding: 32rpx 32rpx 64rpx;
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
    height: 40rpx;
    line-height: 40rpx;
    padding: 0 12rpx;
    background: rgba(240,245,248,1);
    color: rgba(96, 104, 118, 1);
    margin: 0 8rpx 16rpx 0;
  }

  .report__canvas {
    padding: 40rpx 32rpx;
  }
</style>

<template>
  <div class="page box">
    <div class="report">
      <div class="report__header">
        <div class="report__user flex flex-ai-center">
          <img src class="user__avatar">
          <div class="flex flex-column flex-fill">
            <div class="ft-semi-bold ft-40 ft-title line-fill">亲爱的刘晓莉</div>
            <div class="user__target box flex-ai-center">
              <img src class="icon">
              <div class="user__mark box ft-24 line-fill ft-semi-bold">减重目标</div>
              <div class="ft-semi-bold ft-24 line-fill ft-fff">4公斤</div>
            </div>
          </div>
        </div>

        <div class="report__original flex flex-jc-between box">
          <div
              class="original__item flex-fill relative flex flex-column flex-ai-start"
              v-for="(item, index) in original"
              :key="index"
          >
            <span class="original__label ft-24 ft-medium ft-fff line-fill">{{item.label}}</span>
            <span class="original__value ft-medium">{{item.value}}</span>
            <span class="original__unit ft-24 ft-medium line-fill">{{item.unit}}</span>
          </div>
        </div>
      </div>

      <div class="report__title flex flex-ai-start">
        <div class="title__mark"></div>
        <div class="flex-fill">
          <div class="ft-40 ft-semi-bold">根据米茶大数据分析</div>
          <div class="ft-40 ft-semi-bold">您本期需要参与的米茶计划</div>
        </div>
      </div>

      <div class="report__plans">
        <div
          class="report__plan flex flex-ai-center flex-jc-center"
          v-for="(item, index) in planImages"
          :key="index"
        >
          <img
            :src="item.src"
            :style="item.style"
          />
        </div>
      </div>

      <div class="report__title flex flex-ai-start">
        <div class="title__mark"></div>
        <div class="flex-fill">
          <div class="ft-40 ft-semi-bold">您潜在的健康风险</div>
        </div>
      </div>

      <div class="report__dangers flex">
        <div
          class="dangers__item ft-28"
          v-for="(item, index) in dangers"
          :key="index"
        >{{item}}</div>
      </div>

      <div class="report__title flex flex-ai-start">
        <div class="title__mark"></div>
        <div class="flex-fill">
          <div class="ft-40 ft-semi-bold">您的减重曲线</div>
        </div>
      </div>

      <div class="report__canvas">

      </div>
    </div>
  </div>
</template>

<script>
  const original = [
    {
      label: '原始身高',
      value: '175',
      unit: '厘米',
    }, {
      label: '原始体重',
      value: '64.1',
      unit: '厘米',
    }, {
      label: '原始BMI',
      value: '20.0',
      unit: 'BMI',
    },
  ];

  const planImages = [
    {
      src: '',
      style: {
        width: '436rpx',
        height: '32rpx',
        background: '#ddd',
      },
    },
    {
      src: '',
      style: {
        width: '456rpx',
        height: '32rpx',
        background: '#ddd',
      },
    },
  ];

  const dangers = [
    '油脂过多', '肠道不顺', '维生素不足', '糖尿病风险', '心脑血管疾病风险',
  ];

  export default {
    data() {
      return {
        original,
        planImages,
        dangers,
      }
    },
  }
</script>