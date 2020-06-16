<style scoped>
  .meals {
    width: calc(100vw - 64rpx);
    height: calc(100vh - 64rpx);
    margin: 32rpx auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 12rpx 32rpx 0 rgba(143, 181, 198, .3);
    border-radius: 30rpx;
    padding: 0 40rpx;
  }

  .meals__header {
    height: 136rpx;
    line-height: 136rpx;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
  }


  .meals__header::before,
  .meals__header::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 96rpx;
    height: 2rpx;
    background: #E0E4E8;
  }

  .meals__header::before {
    left: 48rpx;
  }

  .meals__header::after {
    right: 48rpx;
  }

  .checkbox {
    flex-wrap: wrap;
  }

  .checkitem {
    width: 148rpx;
    height: 148rpx;
    flex-wrap: wrap;
    padding: 8rpx 0 0 8rpx;
    background: rgba(230, 250, 255, 1);
    border-radius: 16rpx;
    margin: 0 40rpx 40rpx 0;
    border: 1rpx solid rgba(24, 140, 252, 1);
  }

  .item__image {
    margin: 0 8rpx 8rpx 0;
    background: #ddd;
  }

  .item__image:first-child:nth-last-child(1) {
    width: 128rpx;
    height: 128rpx;
  }

  .item__image:first-child:nth-last-child(n+2):nth-last-child(-n+4),
  .item__image:first-child:nth-last-child(n+2):nth-last-child(-n+4) ~ .item__image {
    width: 60rpx;
    height: 60rpx;
  }

  .meals__button {
    width: 366rpx;
    height: 88rpx;
    background: rgba(24, 140, 252, 1);
    border-radius: 44rpx;
    bottom: 48rpx;
    left: 50%;
    transform: translateX(-50%);
  }

  .button__icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 16rpx;
  }
</style>

<template>
  <base-page>
    <radian-box>
      <div class="meals box relative">
        <div class="meals__header relative ft-32">今日已完成打卡</div>
        <div class="checkbox flex">
          <div
            class="checkitem flex box"
            v-for="(item, index) in checkArray"
            :key="index"
          >
            <img
              v-for="(_item, _index) in item.arr"
              :key="_index"
              class="item__image"
            />
          </div>
        </div>
        <div class="meals__button absolute flex flex-jc-center flex-ai-center">
          <img src class="button__icon" />
          <span class="ft-32 ft-medium ft-fff">添加新的打卡</span>
        </div>
      </div>
    </radian-box>
  </base-page>
</template>

<script>
  export default {
    data() {
      return {
        checkArray: [
          {
            arr: [1, 2, 3, 4],
          }, {
            arr: [1, 2],
          }, {
            arr: [1, 2, 3],
          }, {
            arr: [1],
          }, {
            arr: [1],
          },
        ]
      }
    },
  }
</script>
