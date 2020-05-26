<style scoped>
.star-box {
  width: 92rpx;
  height: 80rpx;
}

.star {
  width: 80rpx;
  height: 80rpx;
}
</style>

<template>
  <div class="flex flex-ai-center">
    <div
      v-for="(item, index) in scoreList"
      :key="index"
      @click="handleUserUpdateScore(item)"
      class="star-box flex flex-ai-center flex-jc-center"
    >
      <img class="star" :src="index < score ? activeLink : hideLink" alt />
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
    }
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
      this.$emit("userUpdateScore", score);
    }
  }
};
</script>
