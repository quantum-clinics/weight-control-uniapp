<style scoped>
  .sport {
    padding-bottom: 32rpx;
  }

  .finish__box {
    padding: 12rpx 0 30rpx;
  }

  .title {
    font-size: 34rpx;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.65);
    height: 80rpx;
    line-height: 80rpx;
  }

  .class__item {
    width: 130rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin-right: 24rpx;
    margin-bottom: 24rpx;
    text-align: center;
    background: rgba(255, 255, 255, 1);
    color: rgba(96, 104, 118, 1);
    background: linear-gradient(
        135deg, rgba(255, 255, 255, 1) 0%,
        rgba(243, 245, 247, 1) 100%
    );
    box-shadow: 0 16rpx 20rpx 0 rgba(201, 214, 221, .25);
    border-radius: 24rpx;
    border: 2rpx solid rgba(255, 255, 255, .4);
  }

  .class__item--active {
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(
        90deg, rgba(255, 168, 33, 1) 0%,
        rgba(255, 193, 33, 1) 100%
    );
    box-shadow: 0 16rpx 20rpx 0 rgba(255, 219, 81, .25);
  }

  .intensity__item {
    width: 160rpx;
    height: 160rpx;
    line-height: 160rpx;
    border-radius: 50%;
    margin-right: 24rpx;
    margin-bottom: 24rpx;
    text-align: center;
    font-weight: 600;
    background: rgba(255, 255, 255, 1);
    color: rgba(110, 117, 134, 1);
    background: linear-gradient(
        135deg, rgba(255, 255, 255, 1) 0%,
        rgba(243, 245, 247, 1) 100%
    );
    box-shadow: 0 16rpx 20rpx 0 rgba(201, 214, 221, .25);
    border: 2rpx solid rgba(255, 255, 255, .4);
  }

  .intensity__span.ft-44 {
    margin-bottom: 8rpx;
  }

  .intensity__item--active {
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(
        90deg,
        rgba(255, 168, 33, 1) 0%,
        rgba(255, 193, 33, 1) 100%
    );
    box-shadow: 0 16rpx 20rpx 0 rgba(255, 219, 81, .25);
  }

  .sport__item {
    min-width: 194rpx;
    height: 144rpx;
    margin-right: 16rpx;
    border-radius: 24rpx;
    border: 2rpx solid rgba(73, 82, 125, .2);
  }

  .sport__title {
    margin-top: 24rpx;
    color: rgba(43, 48, 73, 1);
    line-height: 56rpx;
  }

  .sport__desc {
    color: rgba(43, 48, 73, 1);
    line-height: 40rpx;
  }
</style>

<template>
  <div>
    <div
      v-if="recordFinish"
      class="box flex flex-ai-center finish__box"
    >
      <div class="sport__item flex flex-column flex-ai-center">
        <span class="sport__title ft-40 ft-semi-bold">{{sportCheckinData('value')}}</span>
        <span class="sport__desc ft-28 ft-semi-bold">{{sportCheckinData('tip')}}</span>
      </div>
    </div>
    <div class="sport" v-else>
      <div class="title">分类</div>
      <div class="box__class flex flex-wrap">
        <div
            v-for="(item, index) in safeSportClass"
            :class="['class__item ft-semi-bold', {'class__item--active': sportIndex === index}]"
            :key="index"
            @click="handleUserSelect('sportIndex', index)"
        >{{item.value}}</div>
      </div>
      <div class="title">强度</div>
      <div class="box__intensity flex flex-ai-center">
        <div
            :class="['intensity__item flex flex-column flex-jc-center flex-ai-center', {'intensity__item--active': intensityIndex === index}]"
            v-for="(item, index) in safeIntensityClass"
            :key="index"
            @click="handleUserSelect('intensityIndex', index)"
        >
          <span :class="['intensity__span ft-semi-bold ft-44 line-fill']">{{item.answer}}</span>
          <span :class="['intensity__span ft-semi-bold ft-26 line-fill', {'ft-fff': intensityIndex === index}]">{{item.answerTip}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      recordFinish: {
        type: Boolean,
        value: false,
      },
      source: {
        type: Object,
      },
    },
    data() {
      return {
        sportIndex: -1,
        intensityIndex: -1,
      }
    },
    watch: {
      recordFinish(value) {
        if (!value) {
          this.sportIndex = -1;
          this.intensityIndex = -1;
        }
      },
    },
    computed: {
      safeQuestionSource() {
        if (this.source.options && this.source.options.length && this.source.options[0].subQuestions) {
          return this.source.options[0].subQuestions
        }

        return []
      },
      safeSportClass() {
        if (this.safeQuestionSource.length && this.safeQuestionSource[0].options.length) {
          return this.safeQuestionSource[0].options;
        }

        return [];
      },
      safeIntensityClass() {
        if (this.safeQuestionSource.length && this.safeQuestionSource[1].options.length) {
          return this.safeQuestionSource[1].options;
        }

        return [];
      },
      safeCategory() {
        if (!this.safeQuestionSource.length) {
          return 'category';
        }

        return this.safeQuestionSource[0].id;
      },
      safeStrength() {
        if (!this.safeQuestionSource.length || !this.safeQuestionSource[1]) {
          return 'category';
        }

        return this.safeQuestionSource[1].id
      }
    },
    methods: {
      sportCheckinData(type) {
        if (this.source && this.source.answers && this.source.answers.length) {
          return this.source.answers[0][type]
        }

        return '';
      },
      handleUserSelect(key, index) {
        this[key] = index;

        if (this.intensityIndex > 0 && this.sportIndex > 0) {
          const {
            sportIndex,
            safeSportClass,
            intensityIndex,
            safeIntensityClass,
          } = this;

          this.$emit("valueChange", {
            questionId: this.source.id,
            answer: {
              text: JSON.stringify({
                [this.safeCategory]: safeSportClass[sportIndex].value,
                [this.safeStrength]: safeIntensityClass[intensityIndex].value,
              }),
              photos: [],
            },
          })
        }
      }
    }
  };
</script>
