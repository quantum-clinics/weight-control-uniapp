<style scoped>
  .ass {
    width: 100vw;
    padding: 0 24rpx;
  }

  .ass__finish {
    width: calc(100vw - 64rpx);
    padding: 40rpx 40rpx 64rpx;
    box-shadow: 0 12rpx 32rpx 0 rgba(143, 181, 198, .3);
    border-radius: 30rpx;
    background: #fff;
    margin: 46rpx auto 66rpx;
  }

  .ass__header {
    height: 166rpx;
    text-align: center;
    line-height: 166rpx;
  }

  .ass__body {
    background: rgba(255, 255, 255, 1);
    border-radius: 30rpx;
    overflow: hidden;
    padding: 0 32rpx 48rpx;
    margin-bottom: 60rpx;
  }

  .ass__item {
    border-bottom: 1rpx solid #E0E4E8;
    padding-bottom: 32rpx;
  }

  .ass__body .ass__item:last-child {
    border: none;
  }

  .item__header {
    height: 128rpx;
  }

  .icons__image {
    width: 48rpx;
    height: 48rpx;
    position: relative;
    z-index: 1;
  }

  .icons__span {
    width: 76rpx;
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
    background: rgba(255, 143, 33, 1);
    border-radius: 0 26rpx 26rpx 0;
    margin-left: -8rpx;
  }

  .item__choose {
    width: 72rpx;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    border-radius: 50%;
    border: 1rpx solid rgba(240, 242, 243, 1);
    margin-right: 48rpx;
    font-size: 34rpx;
    color: rgba(190, 196, 206, 1);
  }

  .item__choose--active {
    background: rgba(236, 239, 241, 1);
    color: rgba(190, 196, 206, 1);
  }

  .ass__button {
    width: 320rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    border-radius: 48rpx;
    margin: 84rpx auto 0;
    color: rgba(0, 0, 0, .25);
    background: rgba(226, 229, 231, 1);
  }

  .ass__button--finish {
    background: rgba(24, 140, 252, 1);
    color: rgba(255, 255, 255, 1);
  }

  .finish__header {
    height: 160rpx;
    background: rgba(245, 245, 245, 1);
    border-radius: 24rpx;
  }

  .header__image {
    width: 96rpx;
    height: 96rpx;
  }

  .header__span {
    color: rgba(43, 48, 73, 1);
    line-height: 36rpx;
  }

  .finish__tips {
    margin: 80rpx 0 16rpx;
  }

  .tips__icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 8rpx;
  }

  .tips__span {
    color: rgba(24, 140, 252, 1);
    letter-spacing: 1rpx;
  }

  .finish__title {
    color: rgba(43, 48, 73, 1);
    line-height: 56rpx;
  }

  .finish__spc {
    color: rgba(96, 104, 118, 1);
    line-height: 68rpx;
    margin: 40rpx 0 96rpx;
  }

  .finish__button {
    width: 320rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    background: rgba(24, 140, 252, 1);
    border-radius: 48rpx;
    margin: auto;
  }
</style>

<template>
  <base-page :errorMessage="errorMessage">
    <radian-box>
      <div class="ass ass__finish box" v-if="recordFinish">
        <div class="finish__header flex flex-ai-center">
          <img
            :src="`${OSS}/micha/icon/icon-assessment.png`"
            class="header__image"
          >
          <span class="header__span ft-medium ft-28">真厉害！请带着这份饱满的状态来面对新的一天吧！</span>
        </div>
        <div class="finish__tips flex flex-ai-center">
          <img
            :src="`${OSS}/micha/icon/icon-word.png`"
            class="tips__icon"
          >
          <span class="tips__span ft-26 f5-medium">米茶真心话</span>
        </div>
        <div class="finish__title ft-48 ft-semi-bold">
          难以戒除含糖饮料的情况下如何选择？
        </div>
        <div class="finish__spc ft-34">
          用甜味剂替代蔗糖虽然能够降低能量摄入，但是也会有其他问题。研究显示，使用甜味剂并不能使人的体重变轻。实际上甜味剂是在愚弄人们的大脑。它的甜味让人体感觉到吃了含有糖的食物，刺激胰岛素的产生，从而阻碍了脂肪的分解，促进脂肪的合成。
        </div>

        <div class="finish__button ft-34 ft-fff">ok，米茶</div>
      </div>
      <div class="ass box" v-else>
        <div class="ass__header relative ft-semi-bold ft-40 ft-fff">
          {{assessmentTask.subTitle}}
        </div>

        <div class="ass__body relative">
          <div
            class="ass__item"
            v-for="(item, index) in assessmentTask.questions"
            :key="index"
          >
            <div class="item__header flex flex-ai-center">
              <span class="flex-fill">{{item.title}}</span>
              <div class="header__icons flex flex-ai-center">
                <img
                  class="icons__image"
                  :src="safeIconSource(item, answers[item.id].text)"
                />
                <span class="icons__span ft-semi-bold ft ft-fff">{{answers[item.id].text}}</span>
              </div>
            </div>
            <div class="item__body flex flex-ai-center">
              <div
                v-for="(scoreItem, scoreIndex) in chooseList"
                :key="scoreIndex"
                :class="['item__choose', { 'item__choose--active': scoreItem === answers[item.id].text }]"
                @click="handleUserSelect(scoreItem, item)"
              >{{scoreItem}}</div>
            </div>
          </div>

          <div
            :class="['ass__button ft-34 ft-semi-bold', { 'ass__button--finish': userCanSubmit}]"
            @click="handleSubmit"
          >提交评估</div>
        </div>
      </div>
    </radian-box>
  </base-page>
</template>

<script>
  import inject from '@/static/js/inject';

  const app = getApp();

  export default inject({
    data() {
      return {
        chooseList: [1, 2, 3, 4, 5],
        answers: {},
        assessmentTask: {},
        recordFinish: false,
      }
    },
    onLoad() {
      this.renderQuestion();
    },
    computed: {
      userCanSubmit() {
        if (!this.assessmentTask.questions) {
          return false;
        }

        return [].every.call(
            this.assessmentTask.questions,
            (item) => (item.isOptional || this.answers[item.id].text > 0))
      },
    },
    methods: {
      // 获取上一页数据
      getPrevPage() {
        const pages = getCurrentPages();
        const prePage = pages[pages.length - 2];
        return prePage.$vm;
      },
      // 获取数据
      renderQuestion() {
        const { assessmentTask } = this.getPrevPage();
        const answers = {};
        assessmentTask.questions.forEach((item) => answers[item.id] = { text: 0, photos: []});

        this.assessmentTask = assessmentTask;
        this.answers = answers;
      },
      safeIconSource(source, value) {
        if (source && source.options && source.options.length && source.options[0].icons && source.options[0].icons.length) {
          return source.options[0].icons[value];
        }

        return '';
      },
      handleUserSelect(value, item) {
        this.answers[item.id].text = value;
      },
      async submitCheckInData() {
        const {
          assessmentTask: {
            task,
          },
          answers,
        } = this;

        return await this.callAPI('groupSchedule.checkin', {
          task,
          photo: [],
          value: JSON.stringify(answers),
        });
      },
      async handleSubmit() {
        if (!this.userCanSubmit) {
          return;
        }

        const res = await this.submitCheckInData();
      }
    }
  });
</script>
