<style scoped>
  .page {
    width: 100vw;
    padding: 30rpx 40rpx;
    min-height: 100vh;
    transform-origin: center 0;
    transition: .24s linear;
    margin-top: -900rpx;
    background: rgba(236, 239, 241, 1);
  }

  .page--finish {
    transform: scale(0.914);
    min-height: auto;
    margin-top: -748rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 12rpx 32rpx 0 rgba(143, 181, 198, .3);
    border-radius: 24rpx;
  }

  .component-padding {
    padding: 48rpx 0;
  }

  .component-padding--finish {
    padding: 12rpx 0 30rpx;
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
    /* TODO delete */
    border-radius: 50%;
    background: #DB6F12;
    margin-right: 8rpx;
  }

  .button {
    margin: 120rpx auto 48rpx;
    width: 430rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    color: rgba(0, 0, 0, .25);
    background: rgba(226, 229, 231, 1);
    border-radius: 44rpx;
  }

  .button--finish {
    background: rgba(24, 140, 252, 1);
    color: rgba(255, 255, 255, 1);
  }

  .canvas__button,
  .share__button {
    width: 366rpx;
    height: 88rpx;
    border-radius: 44rpx;
    margin: 0 auto 32rpx;
  }

  .canvas__button {
    background: rgba(24, 140, 252, 1);
    margin-top: 80rpx;
  }

  .share__button {
    background: rgba(250, 250, 250, 1);
    border-radius: 42px;
    border: 1rpx solid rgba(202, 207, 216, 1);
  }

  .canvas__icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 8rpx;
    /* TODO delete */
    background: #ddd;
  }

  .share__span {
    color: rgba(0, 0, 0, .65);
  }

  .header {
    width: 100vw;
    min-height: 900rpx;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .header::after {
    content: '';
    display: block;
    position: absolute;
    width: 150vw;
    height: 100%;
    background: #188CFC;
    border-radius: 0 0 200px 200px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }

  .header__intro {
    height: 152rpx;
  }

  .header__icon {
    width: 32rpx;
    height: 32rpx;
    margin-left: 16rpx;
    background: #ddd;
  }

  .guide__box {
    right: 0;
    top: 48rpx;
    padding: 0 8rpx 0 24rpx;
    height: 56rpx;
    background: rgba(252,252,255,1);
    box-shadow: 0 12rpx 32rpx -8rpx rgba(188,186,216,0.43);
    border-radius: 200rpx 0 0 200rpx;
    border: 2rpx solid rgba(255, 255, 255, 1);
  }

  .guide__span {
    color: rgba(0, 0, 0, .45);
  }

  .guide__icon {
    transform: rotate(180deg);
    width: 32rpx;
    height: 32rpx;
  }
</style>

<template>
  <base-page :errorMessage="errorMessage">
    <!--  finish  -->
    <div class="header relative box flex flex-jc-center">
      <div class="header__intro flex flex-ai-center flex-jc-center">
        <span class="ft-semi-bold ft-fff ft-40">已提交，继续记录</span>
        <img
            class="header__icon"
            src
        >
      </div>
    </div>

    <!--  表单  -->
    <div :class="[{'page--finish': recordFinish}, 'page box absolute']">
<!--      <navigator-->
<!--          url="/pages/guide/index"-->
<!--          v-if="!recordFinish"-->
<!--          class="guide__box box absolute flex flex-ai-center"-->
<!--      >-->
<!--        <span class="guide__span ft-26 ft-medium">任务指南</span>-->
<!--        <img-->
<!--            class="guide__icon"-->
<!--            src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/sleep/icons/left-one.png"-->
<!--        />-->
<!--      </navigator>-->

      <div
        v-for="(item, index) in task.questions"
        :key="index"
      >
        <!-- title -->
        <card-header
            :title="item.title"
            :tip="item.tip"
            :icon="safeIconSource(item)"
            :recordFinish="recordFinish"
        />

        <!-- 图片上传打卡 -->
        <div
          v-if="item.type === '图片'"
          :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']"
        >
          <card-upload
              :recordFinish="recordFinish"
              :id="item.id"
              @valueChange="handleValueChange"
          />
        </div>

        <!-- 评分打卡 -->
        <div
            v-if="item.type === '评分'"
            :class="['box flex flex-ai-center flex-jc-between',  recordFinish ? 'component-padding--finish' : 'component-padding']"
        >
          <card-score
              :score="score"
              :recordFinish="recordFinish"
              :id="item.id"
              @valueChange="handleValueChange"
              @userUpdateScore="handleUserUpdateScore"
          />
          <div
              class="score__mark flex flex-ai-center"
              v-if="recordFinish"
          >
            <img class="mark__icon" />
            <span class="mark__span ft-32 ft-semi-bold ft-fff">有期待</span>
          </div>
        </div>

        <!-- 运动分类打卡 -->
        <div
            v-if="item.type === '多类别单选'"
            :class="['box flex flex-ai-center flex-jc-between',  recordFinish ? 'component-padding--finish' : 'component-padding']"
        >
          <card-sport
              :id="item.id"
              :subQuestions="safeQuestionSource(item)"
              :recordFinish="recordFinish"
              @valueChange="handleValueChange"
          />
        </div>

        <!-- 单选打卡内容 -->
        <div
            :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']"
            v-if="item.type === '单选'"
        >
          <card-radio
              :id="item.id"
              :options="item.options"
              :recordFinish="recordFinish"
              @valueChange="handleValueChange"
          />
        </div>

        <!-- 填空打卡 -->
        <div
            :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']"
            v-if="item.type === '单行填空'"
        >
          <card-input
              :id="item.id"
              :recordFinish="recordFinish"
              @valueChange="handleValueChange"
          />
        </div>

        <!-- 分享内容打卡 -->
        <div
            :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']"
            v-if="item.type === '填空'"
        >
          <card-textarea
              :id="item.id"
              :recordFinish="recordFinish"
              @valueChange="handleValueChange"
          />
        </div>
      </div>

      <div
          :class="[{'button--finish': userCanSubmit}, 'button ft-medium ft-32']"
          v-if="!recordFinish"
          @click="handleUserSubmit"
      >打卡</div>

    </div>
  </base-page>
</template>

<script>
  import { uploadImage } from '@/static/apis/upload';
  import { userCheckInTask } from '@/static/apis/groupSchedule';
  import inject from "@/static/js/inject";

  const app = getApp();

  export default inject({
    data() {
      return {
        id: '', // 页面类型
        task: {}, // 当前打卡数据
        answers: {}, // 用户所有回答

        userCanSubmit: false, // 用户是否可以提交按钮
        recordFinish: false, // 打卡是否已经完成
      };
    },
    onLoad(options) {
      this.id = options.id;
      this.renderQuestion(options.id);
    },
    methods: {
      safeIconSource(source) {
        if (!source.options.length || !source.options[0].preTitleIcon) {
          // TODO return safe image src
          return '';
        }

        return source.options[0].preTitleIcon;
      },
      safeQuestionSource(source) {
        if (!source.options.length || !source.options[0].subQuestions) {
          return [];
        }

        return source.options[0].subQuestions
      },
      // 获取上一页数据
      getPrevPage() {
        const pages = getCurrentPages();
        const prePage = pages[pages.length - 2];
        return prePage.$vm;
      },
      // 获取对应问题作渲染
      renderQuestion(id) {
        const { tasks } = this.getPrevPage();
        this.task = tasks.find((item) => item.id === id);
        this.answers = {};
        console.log(this.task);
      },
      // 用户回答某答案
      handleValueChange({ questionId, answer }) {
        const {
          task: {
            questions,
          },
          answers,
        } = this;

        console.log('answer change ===>', questionId, answer);

        let userCanSubmit = true;

        for (let item of questions) {
          const { id, isOptional } = item;

          if (id === questionId) {
            answers[questionId] = answer;
          }

          if (isOptional) {
            continue;
          }

          if (answers[id] && (answers[id].text || (answers[id].photos && !!answers[id].photos.length))) {
            continue;
          }

          userCanSubmit = false;
        }

        this.answers = {...answers};
        this.userCanSubmit = userCanSubmit;
      },
      // 上传图片
      async uploadImages(images) {
        uni.showLoading({ title: '图片上传ing...' });
        const userServerImages = [];

        for (let i = 0; i < images.length; i++) {
          userServerImages.push(await uploadImage(images[i]));
        }

        uni.hideLoading();
        uni.showToast({ title: '图片上传成功!' });

        return userServerImages;
      },
      // 提交相关图片
      async submitCheckInImage() {
        const { answers } = this;

        for (let itemKey of Object.keys(answers)) {
          const target = answers[itemKey];

          if (target.photos && target.photos.length) {
            try {
              target.photos = await this.uploadImages(target.photos);
            } catch (e) {
              uni.showModal({
                title: '图片上传出错',
                content: '图片上传出错:' + ((e.errMsg || e.message) || err),
              })
            }
          }
        }
      },
      // 提交相关数据
      async submitCheckInData() {
        const {
          task: {
            task,
          },
          answers,
        } = this;

        return await this.callAPI(
          userCheckInTask({
            task,
            photo: [],
            value: JSON.stringify(answers),
          })
        );
      },
      async handleUserSubmit() {
        if (!this.userCanSubmit) {
          return;
        }

        await this.submitCheckInImage();
        await this.submitCheckInData();

        uni.showToast({ title: '打卡成功!' });

        uni.reLaunch({ url: '/pages/index/index '});

        // uni.pageScrollTo({ scrollTop: 0 });
        // this.recordFinish = true;
      }
    }
  });
</script>

<style>
</style>
