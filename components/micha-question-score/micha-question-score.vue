<style scoped>
  .question {
    background: #fff;
    border-radius: 0 32rpx 32rpx 32rpx;
  }

  .content__box {
    padding: 32rpx;
  }

  .content__mark {
    padding: 0 12rpx;
    height: 32rpx;
    line-height: 32rpx;
    background: rgba(20, 70, 231, 1);
    border-radius: 8rpx;
  }

  .content__title {
    line-height: 40rpx;
    padding: 16rpx 0 34rpx;
  }

  .score__box {
    width: 45rpx;
    height: 45rpx;
  }
  
  .score__item {
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    background: #f5f5f5;
  }

  .score__item--active {
    background: #ccc;
  }

  .content__button {
    text-align: center;
    height: 80rpx;
    line-height: 80rpx;
    background: rgba(24, 140, 252, 1);
    border-radius: 0 0 32rpx 32rpx;
  }

  .content__score {
    width: 100%;
  }
</style>

<template>
  <div class="question">
    <div class="content box">
      <div class="content__box flex flex-column flex-ai-start">
        <div class="content__mark ft-20 ft-semi-bold ft-fff">{{question.mark}}</div>
        <div class="content__title ft-medium ft-32">{{question.title}}</div>
        <div class="content__score flex flex-ai-center flex-jc-between">
          <div
            class="score__box flex flex-ai-center"
            v-for="(item, index) in scoreList"
            :key="index"
            @click="handleSelectScore(item)"
          >
            <div :class="['score__item', { 'score__item--active': (currentScore >= item) }]"></div>
          </div>
        </div>
      </div>

      <div
        v-if="buttonDisplay"
        class="content__button ft-28 ft-fff ft-medium line-fill"
        @click="handleSumbitScore"
      >提交选择</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      question: Object,
    },
    data() {
      return {
        scoreList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        currentScore: 0,
        buttonDisplay: true,
      }
    },
    methods: {
      handleSelectScore(score) {
        if (!this.buttonDisplay) {
          return;
        }

        this.currentScore = score;
      },
      handleSumbitScore() {
        this.$emit('valueChange', this.currentScore);
        this.buttonDisplay = false;
      }
    },
  }
</script>
