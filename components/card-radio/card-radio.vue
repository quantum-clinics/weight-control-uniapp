<style scoped>
  .radio {
    padding-bottom: 32rpx;
  }

  .class__item {
    width: 148rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin-right: 20rpx;
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

  .box__class .class__item:nth-child(4n) {
    margin-right: 0;
  }
</style>

<template>
  <div class="radio">
    <div class="box__class flex flex-wrap">
      <div
          v-for="(item, index) in options"
          :class="['class__item ft-semi-bold', {'class__item--active': optionsIndex === index}]"
          :key="index"
          @click="handleUserSelect(index)"
      >{{item.answer}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
      },
      options: {
        type: Array,
      },
    },
    data() {
      return {
        optionsIndex: -1,
      }
    },
    methods: {
      handleUserSelect(index) {
        const {
          options,
          id,
        } = this;

        this.$emit("valueChange", {
          questionId: id,
          answer: {
            text: options[index].value,
            photos: [],
          },
        });

        this.optionsIndex = index;
      }
    }
  };
</script>
