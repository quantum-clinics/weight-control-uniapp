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

  .content__radios {
    width: 100%;
  }

  .choose__item {
    padding: 24rpx 32rpx;
    background: linear-gradient(135deg, rgba(247, 250, 251, 1) 0%, rgba(243, 245, 247, 1) 100%);
    color: rgba(0, 0, 0, .45);
    border-radius: 8rpx;
    margin-bottom: 16rpx;
  }

  .choose__item--active {
    background: rgba(24, 140, 252, 1);
    color: #fff;
  }

  .content__button {
    text-align: center;
    height: 80rpx;
    line-height: 80rpx;
    background: rgba(24, 140, 252, 1);
    border-radius: 0 0 32rpx 32rpx;
  }
</style>

<template>
  <div class="question">
    <div class="content box">
      <div class="content__box flex flex-column flex-ai-start">
        <!-- <div class="content__mark ft-20 ft-semi-bold ft-fff">{{question.mark}}</div> -->
        <div class="content__title ft-medium ft-32">{{question.title}}</div>
        <div class="content__radios">
          <div
              v-for="(item, index) in multipleOptions"
              :key="index"
              :class="['choose__item ft-32', { 'choose__item--active': item.active }]"
              @click="handleSelectRadio(index)"
          >
            {{item.value}}
          </div>
        </div>
      </div>

      <div
        class="content__button ft-28 ft-fff ft-medium line-fill"
        @click="handleSumbitMultiple"
        v-if="!answers[question.id].text"
      >提交选择</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      question: Object,
      answers: Object,
    },
    mounted() {
      this.multipleOptions = this.question.options.map((item) => ({
        active: false,
        value: item,
      }));
    },
    data() {
      return {
        multipleOptions: [],
        buttonDisplay: true,
      }
    },
    methods: {
      handleSelectRadio(index) {
        if (this.answers[this.question.id].text) {
          return;
        }

        this.multipleOptions[index].active = !this.multipleOptions[index].active;
      },
      handleSumbitMultiple() {
        const scopeItems = this.multipleOptions.filter((item) => item.active);

        if (!scopeItems.length) {
          return;
        }

        const values = scopeItems.map((item) => item.value);


        const answer = values.join(', ');
        const value = values.join('&&');

        this.$emit('valueChange', value);
        this.$emit('valueChange', {
          answer,
          value,
          id: this.question.id,
        });
      }
    }
  }
</script>
