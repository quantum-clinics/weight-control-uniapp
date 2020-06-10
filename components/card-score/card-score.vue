<style scoped>
  .star-box {
    width: 496rpx;
  }

  .star-box--finish {
    width: 332rpx;
  }

  .star {
    width: 80rpx;
    height: 80rpx;
  }

  .star--finish {
    width: 70rpx;
    height: 70rpx;
  }
</style>

<template>
  <div :class="['star-box flex flex-ai-center flex-jc-between', { 'star-box--finish': recordFinish }]">
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
</template>

<script>
const ENDPOINT =
  "https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/sleep/icons";
export default {
  props: {
    score: {
      type: Number,
      value: 0
    },
    recordFinish: {
      type: Boolean,
      value: false,
    },
  },
  data() {
    return {
      activeLink: `${ENDPOINT}/rate-star.png`,
      hideLink: `${ENDPOINT}/unrate-star.png`,
      scoreList: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    handleUserUpdateScore(score) {
      if (this.recordFinish) {
        return;
      }

      this.$emit("userUpdateScore", score);
    }
  }
};
</script>
