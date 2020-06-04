<style scoped>
  .sign {
    height: 206rpx;
    background: linear-gradient(360deg, rgba(240, 245, 248, 1) 0%, rgba(255, 255, 255, 1) 100%);
    justify-content: space-around;
    padding: 0 28rpx;
  }

  .sign__item {
    padding-top: 32rpx;
  }

  .item__status {
    color: rgba(195, 202, 202, 1);
    line-height: 24rpx;
  }

  .item__images {
    height: 88rpx;
  }

  .item__icon--normal,
  .item__icon--big {
    /* TODO DELETE */
  }

  .image__box,
  .image__box--empty {
    border: 6rpx solid rgba(194, 213, 225, .7);
    box-shadow: 0 0 4rpx 4rpx rgba(247,252,255,1);
    border-radius: 50%;
  }

  .image__box--empty {
    width: 30rpx;
    height: 30rpx;
    background: linear-gradient(180deg, rgba(221, 228, 233, 1) 0%, rgba(237, 243, 247, 1) 100%);
  }

  .item__icon--normal {
    width: 28rpx;
    height: 28rpx;
    /* TODO DELETE */
    background: #188CFC;
    border-radius: 50%;
  }

  .item__icon--big {
    width: 48rpx;
    height: 48rpx;
    /* TODO DELETE */
    background: #FF6C00;
    border-radius: 50%;
  }

  .item__intro {
    margin-top: 8rpx;
    padding: 4rpx 12rpx 0;
    line-height: 24rpx;
    height: 36rpx;
    background: rgba(254, 255, 254, 1);
    box-shadow: 0 0 24rpx 0 rgba(176, 197, 218, .52);
    border: 1rpx solid rgba(231, 236, 239, 1);
    border-radius: 20rpx;
  }

  .item__intro::after {
    content: '';
    display: block;
    position: absolute;
    top: -15rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15rpx solid transparent;
    border-right: 15rpx solid transparent;
    border-bottom: 15rpx solid rgba(254, 255, 254, 1);
  }

  .intro__span {
    color: rgba(255, 108, 0, 1);
    line-height: 24rpx;
  }

  .intro__icon {
    width: 28rpx;
    height: 28rpx;
  }
</style>

<template>
  <div class="sign box flex ">
    <div
      class="sign__item flex-fill box flex flex-column flex-ai-center"
      v-for="(item, index) in signList"
      :key="index"
    >
      <span class="item__status ft-semi-bold ft-24">
        {{item.status === 1 ? '已签' : '未签'}}
      </span>
      <div class="item__images flex flex-column flex-jc-center flex-ai-center">
        <div
          class="image__box flex flex-ai-center flex-jc-center"
          v-if="(item.status === 1 && !item.award)"
        >
          <img
            class="item__icon--normal"
            src=""
            alt=""
          >
        </div>

        <div
          class="image__box flex flex-ai-center flex-jc-center"
          v-if="(item.status === 1 && item.award)"
        >
          <img
            class="item__icon--big"
            src=""
            alt=""
          >
        </div>

        <div
          class="image__box--empty flex flex-ai-center flex-jc-center"
          v-if="!item.status"
        ></div>
      </div>
      <div
        class="item__intro box relative flex flex-jc-center flex-ai-start"
        v-if="item.award"
      >
        <span class="intro__span ft-bold ft-24">+{{item.award}}</span>
        <img
          class="intro__icon"
          src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/healthmarket/icon-currency.png"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
  const signList = [
    {
      status: 1,
      imageSrc: '',
      award: 50,
      intro: '',
    }, {
      status: 1,
      imageSrc: '',
      award: 0,
      intro: '',
    }, {
      status: 1,
      imageSrc: '',
      award: 100,
      intro: '',
    }, {
      status: 1,
      imageSrc: '',
      award: 0,
      intro: '',
    }, {
      status: 1,
      imageSrc: '',
      award: 0,
      intro: '',
    }, {
      status: 0,
      imageSrc: '',
      award: 0,
      intro: '',
    }, {
      status: 0,
      imageSrc: '',
      award: 0,
      intro: '',
    },
  ];
  export default {
    data() {
      return {
        signList,
      }
    }
  }
</script>
