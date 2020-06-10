<style scoped>
  .class-page {
    min-height: 100vh;
    background: rgba(245, 245, 245, 1);
    padding-bottom: 100rpx;
  }

  .class {
    width: 100vw;
    padding: 0 24rpx;
  }

  .class::after {
    content: "";
    display: block;
    position: absolute;
    width: 150vw;
    height: 994rpx;
    background: #188cfc;
    border-radius: 0 0 200px 200px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }

  .class__header {
    z-index: 1;
    padding: 48rpx 0 80rpx;
  }

  .header__title {
    line-height: 56rpx;
  }

  .header__spc {
    line-height: 36rpx;
    color: rgba(255, 255, 255, 0.65);
    margin: 16rpx 0 32rpx;
  }

  .class__body {
    background: rgba(255, 255, 255, 1);
    border-radius: 30px;
    overflow: hidden;
    z-index: 1;
  }
</style>

<template>
  <div
    class="class-page box"
    v-if="pageDisplay"
  >
    <div class="class box relative">
      <div class="class__header relative">
        <div class="header__title ft-40 ft-semi-bold ft-fff">100天，让您成为“自来瘦”专家</div>
        <div class="header__spc ft-26">本课程由已经为20000亚洲人成功减脂20吨的国内先进科学减脂团队米茶计划，以梅奥中心基本营养方案</div>
        <div class="line-fill ft-semi-bold ft-fff">共 80 课</div>
      </div>

      <div class="class__body relative">
        <class-list
          statusLock
          :data="allProduct"
          @userExchangeProduct="handleUserExchangeProduct"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    userFetchAllProduct,
    userExchangeProduct,
  } from '@/static/apis/bonusProduct';

  const pages = {
    page: 0,
    pageSize: 20,
    loading: false,
    finish: false,
  };

  const app = getApp();

  export default {
    data() {
      return {
        allProduct: [],
        pageDisplay: false,
      }
    },
    onLoad() {
      app.$vm.init().then(this.fetchClassDate);
    },
    methods: {
      async fetchClassDate() {
        uni.showLoading();
        pages.loading = true;
        const { page, pageSize } = pages;
        const allProduct = await userFetchAllProduct(page, pageSize);

        if (!this.pageDisplay) {
          this.pageDisplay = true;
        }
        this.allProduct.push(...allProduct.data.result.list);

        pages.loading = false;
        pages.page += 1;
        pages.finish = this.allProduct.length === allProduct.data.result.total;

        uni.hideLoading();
      },
      async handleUserExchangeProduct(index) {
        uni.showLoading({ title: '加载中..' });

        const target = this.allProduct[index];
        const result = await userExchangeProduct(target._id);
        target.hasExchanged = result.data.result.success;

        uni.hideLoading();
      }
    },
    onReachBottom() {
      const { loading, finish } = pages;
      if (loading || finish) {
        return;
      }

      this.fetchClassDate();
    },
  }
</script>
