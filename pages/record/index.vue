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
  <base-page ref="basePage">
    <div class="header relative box flex flex-jc-center">
      <div class="header__intro flex flex-ai-center flex-jc-center">
        <span class="ft-semi-bold ft-fff ft-40">已提交，继续记录</span>
        <img
            class="header__icon"
            src
        >
      </div>
    </div>
    <div :class="[{'page--finish': recordFinish}, 'page box absolute']">
      <navigator
          url="/pages/guide/index"
          v-if="!recordFinish"
          class="guide__box box absolute flex flex-ai-center"
      >
        <span class="guide__span ft-26 ft-medium">任务指南</span>
        <img
            class="guide__icon"
            src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/sleep/icons/left-one.png"
        />
      </navigator>

      <!-- 打卡 -->
      <div
        v-for="(item, index) in task.questions"
        :key="index"
      >
        <card-header
            :title="item.title"
            :icon="item.options[0].preTitleIcon"
            :tip="item.tip"
            :recordFinish="recordFinish"
        />

        <!-- 图片上传打卡 -->
        <div
          v-if="item.type === '图片'"
          :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']"
        >
          <card-upload
              :images="userUploadImages"
              :recordFinish="recordFinish"
              @imagesUpLoad="handleUserUpLoadImage"
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
            :sportClass="item.options[0].subQuestions[0].options"
            :intensityClass="item.options[0].subQuestions[1].options"
            :sportIndex="sportIndex"
            :intensityIndex="intensityIndex"
            :recordFinish="recordFinish"
            @userSelect="handleUserSelect"
          />
        </div>

        <!-- 体重打卡内容 -->
        <div
            :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']"
            v-if="item.type === '体重打卡'"
        >
          <input
            type="text"
            @handleUserInput="handleUserInput"
          />
        </div>

        <!-- 分享内容打卡 -->
        <div
            :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']"
            v-if="item.type === '填空'"
        >
          <card-textarea
              :userInputValue="userInputValue"
              :recordFinish="recordFinish"
              @handleUserInput="handleUserInput"
          />
        </div>
      </div>

      <div
          :class="[{'button--finish': userCanSubmit}, 'button ft-medium ft-32']"
          v-if="!recordFinish"
          @click="handleUserSubmit"
      >打卡</div>

<!--      <div-->
<!--          v-if="recordFinish"-->
<!--          class="canvas__button flex flex-jc-center flex-ai-center"-->
<!--      >-->
<!--        <img-->
<!--            class="canvas__icon"-->
<!--            src-->
<!--            alt-->
<!--        >-->
<!--        <span class="ft-medium ft-32 ft-fff">生成海报分享</span>-->
<!--      </div>-->

<!--      <div-->
<!--          v-if="recordFinish"-->
<!--          class="share__button flex flex-jc-center flex-ai-center"-->
<!--      >-->
<!--        <span class="share__span ft-medium ft-32 ft-fff">发送给支付宝好友</span>-->
<!--      </div>-->
    </div>
  </base-page>
</template>

<script>
  import { uploadImage } from '@/static/apis/upload';
  import { userCheckinDiet, userCheckinSport } from '@/static/apis/system';

  const app = getApp();
  const userServerImages = []; // 用户上传成功的图片地址存放


  export default {
    data() {
      return {
        id: '', // 页面类型
        task: {}, // 当前打卡数据
        recordFinish: false, // 打卡是否已经完成
        userUploadImages: [], // 用户上传的图片数组
        score: 0, // 用户打分
        userInputValue: '', // 用户输入分享内容
        sportIndex: 1, // 运动分类
        intensityIndex: 1, // 强度分类
        userWristInput: '', // 用户腰围记录
        userWeightInput: '', // 用户体重记录
      };
    },
    onLoad(options) {
      this.id = options.id;
      this.renderQuestion(options.id);
    },
    computed: {
      userCanSubmit() {
        if (this.id === 'micha-meal') {
          return !!this.userUploadImages.length && !!this.score && !!this.userInputValue
        }

        if (this.id === 'micha-wrist') {
          return !!this.userWristInput
        }

        if (this.id === 'micha-weight') {
          return !!this.userWeightInput
        }

        if (this.id === 'micha-exercise') {
          return !!this.userInputValue
        }
      },
    },
    methods: {
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
        console.log(this.task);
      },
      // 用户选择运动分类与强度
      handleUserSelect(key, index) {
        this[key] = index;
      },
      // 用户上传图片
      handleUserUpLoadImage(e) {
        this.userUploadImages.push(...e.tempFilePaths);
      },
      // 用户评分
      handleUserUpdateScore(value) {
        this.score = value;
      },
      // 用户输入分享内容
      handleUserInput(value) {
        if (value === this.userInputValue) {
          return;
        }

        this.userInputValue = value;
      },
      // 上传图片
      async uploadImages() {
        uni.showLoading({ title: '上传ing...' });

        for (let i = 0; i < this.userUploadImages.length; i++) {
          userServerImages.push(await uploadImage(this.userUploadImages[i]));
        }

        uni.hideLoading();
        uni.showToast({ title: 'Finish!' });
      },
      // 提交三餐打卡数据
      async submitMealData() {
        const {
          userInputValue,
          score,
        } = this;

        const data = {
          "sq-breakfast-meal": {
            "photos": userServerImages
          },
          "sq-score": score * 2,
          "sq-meal-share": userInputValue,
        };

        // TODO replace params value
        return await userCheckinDiet({
          id: 'micha-lunch',
          // _id: '5ec24280d211422b3d36f3c1',
          photo: [],
          value: JSON.stringify(data),
        });
      },
      // 提交运动打卡数据
      async submitSportData() {
        const { sportIndex, intensityIndex, userInputValue } = this;
        const sportClass = this.task.questions[0].options[0].subQuestions[0].options;
        const intensityClass = this.task.questions[0].options[0].subQuestions[1].options;
        const data = {
          "exercise-checkin": {
            "text": {
              "category": sportClass[sportIndex],
              "strength": `${intensityClass[intensityIndex].count}${intensityClass[intensityIndex].unit}`,
              "photo": [],
            },
            "food-share": {
              "text": userInputValue,
              "photo": []
            },
          },
        };

        // TODO replace params value
        return await userCheckinSport({
          id: "sleep-exercise",
          _id: "5edf3eb39358d44d4ea6abcb",
          photo: [],
          value: JSON.stringify(data),
        })
      },
      // 提交体重打卡数据
      async submitWristData() {

      },
      // 提交相关数据
      async submitCheckInData() {
        if (this.id === 'micha-meal') {
          await this.uploadImages();
          await this.submitMealData();
        }

        if (this.id === 'micha-exercise') {
          await this.submitSportData();
        }

        if (this.id === 'micha-wrist') {
          await this.submitWristData();
        }

        if (this.id === 'micha-weight') {
          await this.submitWeightData();
        }
      },
      async handleUserSubmit() {
        if (!this.userCanSubmit) {
          return;
        }

        await this.submitCheckInData();

        uni.pageScrollTo({ scrollTop: 0 });
        this.recordFinish = true;
      }
    }
  };
</script>

<style>
</style>
