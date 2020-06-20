<style scoped>
  .course {
    width: 100vw;
    padding: 0 24rpx;
    margin-bottom: 60rpx;
  }

  .course__header {
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

  .course__body {
    background: rgba(255, 255, 255, 1);
    border-radius: 30rpx;
  }
</style>

<template>
  <base-page :errorMessage="errorMessage" v-if="pageDisplay">
    <radian-box>
      <div class="course box">
        <div class="course__header relative">
          <div class="header__title ft-40 ft-semi-bold ft-fff">{{coursePage.title}}</div>
          <div class="header__spc ft-26">{{coursePage.desc}}</div>
          <div class="line-fill ft-semi-bold ft-fff">共 {{total}} 课</div>
        </div>

        <div class="course__body relative">
          <course-list
            statusLock
            :list="allProduct"
            @userExchangeProduct="handleUserExchangeProduct"
          />
        </div>
      </div>
    </radian-box>
  </base-page>
</template>

<script>
  import inject from '@/static/js/inject';

  const pages = {
    page: 0,
    pageSize: 20,
    loading: false,
    finish: false,
  };


  const app = getApp();
  let pageInit = false;

  export default inject({
    data() {
      return {
        allProduct: [],
        pageDisplay: false,
        total: 0,
        coursePage: {},
      }
    },
    onShow() {
      if (app.globalData.needRecord) {
        uni.switchTab({
          url: "/pages/micha/index"
        });
        return;
      }

      if (pageInit) {
        return
      }

      this.fetchClassDate();
    },
    methods: {
      async fetchClassDate() {
        uni.showLoading();
        pages.loading = true;
        const { page, pageSize } = pages;
        const { list, total } = await this.callAPI('bonusProduct.getBonusCourseProducts', {
          page,
          pageSize,
        });

        if (!this.pageDisplay) {
          this.pageDisplay = true;
        }

        if (!this.allProduct.length) {
          this.allProduct = [...list];
        } else {
          this.allProduct.push(...list)
        }

        pages.loading = false;
        pages.page += 1;
        pages.finish = this.allProduct.length === total;
        pageInit = true;

        this.total = total;
        this.coursePage = app.globalData.coursePage;

        uni.hideLoading();
      },
      async handleUserExchangeProduct(index) {
        uni.showLoading({ title: "加载中.." });

        const { success } = await this.callAPI('bonusProduct.exchangeProduct', {
          id: this.allProduct[index]._id
        });

        this.allProduct[index].hasExchanged = success;
        uni.navigateTo({ url: `/pages/webview/index?url=${item.url}` })
        uni.hideLoading();
      },
    },
    onReachBottom() {
      const { loading, finish } = pages;
      if (loading || finish) {
        return;
      }

      this.fetchClassDate();
    },
  });
</script>
