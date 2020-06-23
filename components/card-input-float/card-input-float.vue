<style scoped>
  .input-box {
    background: rgba(255, 255, 255, 1);
    border-radius: 24rpx;
    border: 1rpx solid rgba(208, 217, 222, 1);
    box-shadow: inset 0 8rpx 28rpx 0 rgba(174, 192, 197, .61), inset 0 -2rpx 0 0 rgba(255, 255, 255, .4);
    padding: 32rpx;
  }

  .input-box--finish {
    box-shadow: none;
    background: rgba(245, 245, 245, 1);
    border: 1rpx solid rgba(245, 245, 245, 1);
    border-radius: 8rpx;
  }

  .input {
    width: 100%;
    display: block;
    padding: 0;
    line-height: 48rpx;
    color: rgba(0, 0, 0, .65);
  }

  .input--finish {
    background: rgba(245, 245, 245, 1);
  }
</style>

<template>
  <div :class="['input-box box', { 'input-box--finish': recordFinish }]">
    <input
      :class="['input ft-34', {'input--finish': recordFinish}]"
      :value="safeSourceValue(source)"
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
      userInputValue: {
        type: String,
        value: '',
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
      checkValue(value) {
        const reg = /^(\d+|\d+\.\d*)$/;
        return reg.test(value);
      },
      handleUserInput(e) {
        const {
          detail: { value },
        } = e;

        if (!this.checkValue(value)) {
          this.$emit("valueChangeError", '请输入正确的数值范围!');
          this.$emit("valueChange", {
            questionId: this.source.id,
            answer: {
              text: '',
              photos: [],
            },
          });
          return;
        }

        this.$emit("valueChange", {
          questionId: this.source.id,
          answer: {
            text: value,
            photos: [],
          },
        })
      },
    },
  };
</script>
