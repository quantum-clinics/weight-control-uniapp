<style scoped>
  .footer {
    width: 100vw;
    height: 569rpx;
    left: 0;
    bottom: 0;
    transition: .24s linear;
    transform: translateY(452rpx);

  }

  .footer--active {
    transform: translateY(0);

  }

  .footer__header {
    background: #fff;
    padding: 16rpx 16rpx 0;
    height: 144rpx;
    background: rgba(255, 255, 255, .94);
    box-shadow: 0 0 1rpx 0 rgba(230, 230, 230, 1);
  }

  .header__mission {
    width: 128rpx;
    height: 128rpx;
    text-align: center;
    line-height: 128rpx;
    font-size: 50rpx;
    text-shadow: 0 1rpx 0 rgba(50, 109, 233, 1);
    margin-top: -40rpx;
    /* TODO DELETE */
    border-radius: 50%;
    background: rgba(50, 109, 233, 1);
  }

  .header__input {
    margin: 0 16rpx 0 12rpx;
    padding: 20rpx 32rpx;
    height: 80rpx;
    background: rgba(250, 250, 250, 1);
    border-radius: 8rpx;
    border: 1rpx solid rgba(202, 207, 216, 1);
  }

  .header__button {
    width: 80rpx;
    height: 80rpx;
    background: rgba(250, 250, 250, 1);
    border-radius: 8rpx;
    border: 1rpx solid rgba(202, 207, 216, 1);
  }

  .footer__funs {
    height: 452rpx;
    background: linear-gradient(135deg, rgba(242, 244, 245, 1) 0%, rgba(228, 233, 235, 1) 100%);
    padding: 64rpx 48rpx;
  }

  .funs__menus {
    justify-content: space-between;
    width: 100%;
  }

  .menu__image {
    width: 120rpx;
    height: 120rpx;
    background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(243, 245, 247, 1) 100%);
    box-shadow: 0 16rpx 20rpx 0 rgba(201, 214, 221, .25);
    border-radius: 26rpx;
    border: 2rpx solid rgba(255, 255, 255, .4);
  }

  .menu__span {
    color: rgba(96, 104, 118, 1);
    margin-top: 16rpx;
  }

  .funs__button {
    margin-top: 64rpx;
    width: 510rpx;
    height: 88rpx;
    padding: 0 32rpx;
    background: linear-gradient(90deg, rgba(255, 135, 30, 1) 0%, rgba(255, 168, 30, 1) 100%);
    box-shadow: 0 2rpx 0 0 rgba(255, 255, 255, .3);
    border-radius: 44rpx;
  }

  .button__image {
    width: 164rpx;
    height: 120rpx;
    margin-top: -32rpx;
  }

  .button__info {
    margin-left: 32rpx;
    padding-top: 14rpx;
  }

  .info__spc {
    margin-top: 4rpx;
    color: rgba(255, 255, 255, .65);
  }
</style>

<template>
  <div :class="[{ 'footer--active': footerActive }, 'footer fixed']">
    <div class="footer__header box flex">
      <div
        class="header__mission ft-medium ft-fff"
        @click="handleBackQuestion"
      >{{taskSchedule.completeCount}}/{{taskSchedule.totalCount}}</div>
      <input
        class="header__input box flex-fill ft-28"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="cloneUserInputValue"
        @confirm="handleUserInput"
        type="text"
      >
      <img
        @click="handleToggleMenus"
        class="header__button"
      >
    </div>

    <div class="footer__funs box flex flex-column flex-ai-center">
      <div class="funs__menus flex flex-ai-center">
        <div
          v-for="(item, index) in list"
          :key="index"
          @click="item.handle ? item.handle : null"
          class="menu__item flex flex-column flex-jc-center flex-ai-center flex-fill"
        >
          <img
            class="menu__image"
            :src="item.imageSrc"
          >
          <span class="menu__span ft-semi-bold ft-26">{{item.label}}</span>
        </div>
      </div>

      <div class="funs__button flex box">
        <img
          class="button__image"
          src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/micha/icon/image-call.png"
        >

        <div class="button__info flex flex-column flex-ai-center">
          <span class="ft-semi-bold ft-32 ft-fff line-fill">呼叫玄米老师</span>
          <span class="info__spc ft-semi-bold ft-24 line-fill">消耗120米茶币</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const list = [
    {
      imageSrc: '',
      label: '照片',
      handle: 'handleUserUploadImage'
    }, {
      imageSrc: '',
      label: '个人数据',
    }, {
      imageSrc: '',
      label: '打卡记录',
    },
  ];

  export default {
    props: {
      taskSchedule: Object,
      questionReply: Object,
    },
    data() {
      return {
        list,
        footerActive: false,
        cloneUserInputValue: '',
      }
    },
    computed: {
      disabled() {
        if (this.questionReply.id) {
          return !questionReply.userInputModel
        }

        return false
      },
      placeholder() {
        if (this.questionReply.id) {
          return this.questionReply.userInputModel ? '在此输入...' : '请选择';
        }

        return '在此输入...';
      },
    },
    methods: {
      checkValue(value) {
        const reg = /^(\d+|\d+\.\d*)$/;
        return reg.test(value);
      },
      handleToggleMenus() {
        this.footerActive = !this.footerActive;
      },
      handleUserInput(e) {
        const {
          detail: { value },
        } = e;

        if (!value) {
          return
        }

        if (this.questionReply.type === '数值填空' && !this.checkValue(value)) {
          this.$emit("valueChangeError", '请输入正确的数值范围!');
          return;
        }

        this.$emit('userInput', value);
        this.cloneUserInputValue = '';
      },
      handleUserUploadImage() {
        uni.chooseImage({
          count: 1,
          success: (chooseImageRes) => {
            this.$emit("userUploadImage", chooseImageRes);
          }
        });
      },
      handleBackQuestion() {
        this.$emit('backQuestion');
      }
    },
  };
</script>
