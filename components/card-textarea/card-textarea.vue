<style scoped>
  .textarea-box {
    min-height: 224rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 24rpx;
    border: 1rpx solid rgba(208, 217, 222, 1);
    box-shadow: inset 0 8rpx 28rpx 0 rgba(174, 192, 197, .61), inset 0 -2rpx 0 0 rgba(255, 255, 255, .4);
    padding: 32rpx;
  }

  .textarea-box--finish {
    box-shadow: none;
    background: rgba(245, 245, 245, 1);
    border: 1rpx solid rgba(245, 245, 245, 1);
    border-radius: 8rpx;
  }

  .textarea {
    width: 100%;
    height: 150rpx;
    display: block;
    padding: 0;
    line-height: 48rpx;
    color: rgba(0, 0, 0, .65);
  }

  .textarea--finish {
    background: rgba(245, 245, 245, 1);
  }
</style>

<template>
  <div :class="['textarea-box box', { 'textarea-box--finish': recordFinish }]">
    <textarea
      :class="['textarea ft-34', {'textarea--finish': recordFinish}]"
      :value="safeSourceValue(source)"
      :maxlength="-1"
      :disabled="recordFinish"
      @input="handleUserInput"
    />
  </div>
</template>

<script>
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
    methods: {
      safeSourceValue(source) {
        if (source && source.value) {
          return source.value
        }

        return ''
      },
      handleUserInput(e) {
        const {
          detail: { value },
        } = e;

        this.$emit("valueChange", {
          questionId: this.source.id,
          answer: {
            text: value,
            photos: [],
          },
        })
      }
    },
  };
</script>
