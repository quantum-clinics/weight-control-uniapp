<style scoped>
  .ass-page {
    min-height: 100vh;
    background: rgba(245, 245, 245, 1);
    padding-bottom: 100rpx;
  }

  .ass {
    width: 100vw;
    padding: 0 24rpx;
  }

  .ass::after {
    content: "";
    display: block;
    position: absolute;
    width: 150vw;
    height: 818rpx;
    background: #188cfc;
    border-radius: 0 0 200px 200px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }

  .ass__header {
    z-index: 1;
    height: 166rpx;
    text-align: center;
    line-height: 166rpx;
  }

  .ass__body {
    background: rgba(255, 255, 255, 1);
    border-radius: 30px;
    overflow: hidden;
    z-index: 1;
    padding: 0 32rpx 48rpx;
  }

  .ass__item {
    border-bottom: 1rpx solid #E0E4E8;
    padding-bottom: 32rpx;
  }

  .ass__body .ass__item:last-child {
    border: none;
  }

  .item__header {
    height: 128rpx;
  }

  .icons__image {
    width: 32rpx;
    height: 32rpx;
  }

  .icons__span {
    width: 76rpx;
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
    background: rgba(255, 143, 33, 1);
    border-radius: 0 26rpx 26rpx 0;
    margin-left: -8rpx;
  }

  .item__choose {
    width: 72rpx;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    border-radius: 50%;
    border: 1rpx solid rgba(240, 242, 243, 1);
    margin-right: 48rpx;
    font-size: 34rpx;
    color: rgba(190, 196, 206, 1);
  }

  .item__choose--active {
    background: rgba(236, 239, 241, 1);
    color: rgba(190, 196, 206, 1);
  }

  .ass__button {
    width: 320rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    background:rgba(24,140,252,1);
    border-radius:48px;
    margin: 84rpx auto 0;
  }
</style>

<template>
  <base-page :errorMessage="errorMessage">
    <div class="ass-page box">
      <div class="ass box relative">
        <div class="ass__header relative ft-semi-bold ft-40 ft-fff">
          根据您今日的状态程度，评估一下
        </div>

        <div class="ass__body relative">
          <div
            class="ass__item"
            v-for="(item, index) in questions"
            :key="index"
          >
            <div class="item__header flex flex-ai-center">
              <span class="flex-fill"></span>
              <div class="header__icons flex flex-ai-center">
                <img class="icons__image" src>
                <span class="icons__span ft-semi-bold ft ft-fff">1</span>
              </div>
            </div>
            <div class="item__body flex flex-ai-center">
              <div
                v-for="(subItem, subIndex) in chooseList"
                :key="subIndex"
                :class="['item__choose', { 'item__choose--active': subItem === item.score }]"
                @click="handleUserSelect(subItem, index)"
              >{{subItem}}</div>
            </div>
          </div>

          <div class="ass__button ft-34 ft-fff ft-semi-bold">提交评估</div>
        </div>
      </div>
    </div>
  </base-page>
</template>

<script>
  import inject from '@/static/js/inject';

  const app = getApp();

  export default inject({
    data() {
      return {
        chooseList: [1, 2, 3, 4, 5],
        questions: [],
      }
    },
    onLoad() {
      this.questions = [
        {
          title: '元气满满',
          score: -1,
        },
        {
          title: '饱腹畅快',
          score: -1,
        },
      ];
    },
    methods: {
      handleUserSelect(value, index) {
        this.questions[index].score = value;
      }
    }
  });
</script>
