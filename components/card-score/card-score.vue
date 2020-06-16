<style scoped>
  .star-box {
    width: 100%;
  }


  .star {
    width: 80rpx;
    height: 80rpx;
  }

  .star--finish {
    width: 70rpx;
    height: 70rpx;
  }

  .score__mark {
    height: 60rpx;
    background: rgba(254, 153, 51, 1);
    border-radius: 30rpx;
    padding: 0 16rpx 0 4rpx;
  }

  .mark__icon {
    width: 52rpx;
    height: 52rpx;
    margin-right: 8rpx;
  }
</style>

<template>
  <div :class="['star-box flex flex-ai-center flex-jc-between', { 'star-box--finish': recordFinish }]">
    <div class="flex-fill flex">
      <div
          v-for="(item, index) in scoreList"
          :key="index"
          @click="handleUserUpdateScore(item)"
          class="flex flex-ai-center flex-jc-center"
      >
        <img
            :class="['star', {'star--finish': recordFinish}]"
            :src="index < score ? activeLink : hideLink"
            alt
        />
      </div>
    </div>
    <div
      class="score__mark flex flex-ai-center"
      v-if="recordFinish"
    >
      <img class="mark__icon" :src="source.tipIcon"/>
      <span class="mark__span ft-32 ft-semi-bold ft-fff">{{source.tip}}</span>
    </div>
  </div>
</template>

<script>
  const app = getApp();
  export default {
    props: {
      source: {
        type: Object,
      },
      recordFinish: {
        type: Boolean,
        value: false,
      },
    },
    data() {
      return {
        activeLink: `${app.globalData.OSS}/micha/icon/rate-star.png`,
        hideLink: `${app.globalData.OSS}/micha/icon/unrate-star.png`,
        scoreList: [1, 2, 3, 4, 5],
        score: 0,
      };
    },
    mounted() {
      this.score = this.source.value ? this.source.value / 2 : 0;
    },
    methods: {
      handleUserUpdateScore(score) {
        if (this.recordFinish) {
          return;
        }

        this.score = score;

        this.$emit("valueChange", {
          questionId: this.source.id,
          answer: {
            text: score * 2,
            photos: [],
          },
        })
      }
    }
  };
</script>
