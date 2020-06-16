<style scoped>
  .header {
    height: 104rpx;
    text-align: center;
    line-height: 104rpx;
  }

  .header::before,
  .header::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 96rpx;
    height: 2rpx;
    background: rgba(224, 228, 232, 1);
  }

  .header::before {
    left: 48rpx;
  }

  .header::after {
    right: 48rpx;
  }

  .images {
    flex-wrap: wrap;
  }

  .image {
    width: 192rpx;
    height: 192rpx;
    margin: 0 8rpx 8rpx 0;
    background: #ddd;
  }
</style>

<template>
  <div class="card">
    <div class="header relative">您记录的体重图片</div>
    <div class="images flex">
      <img
        v-for="(item, index) in [1, 2, 3, 4, 5]"
        :key="index"
        src
        class="image"
      />
    </div>
  </div>
</template>