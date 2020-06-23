<style scoped>
  .page {
    width: 100vw;
    padding: 30rpx 40rpx;
    min-height: 100vh;
    transform-origin: center 0;
    transition: .24s linear;
    background: rgba(236, 239, 241, 1);
  }

  .page--finish {
    transform: scale(0.914);
    min-height: auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 12rpx 32rpx 0 rgba(143, 181, 198, .3);
    border-radius: 24rpx;
    margin-bottom: 60rpx;
  }

  .component-padding {
    padding: 48rpx 0;
  }

  .page--finish .component-padding {
    padding: 12rpx 0 30rpx;
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

  .button__back {
    color: rgba(0, 0, 0, .65);
    margin: auto;
    background: rgba(250, 250, 250, 1);
    border: 1rpx solid rgba(202, 207, 216, 1);
  }

  .button__reagain {
    margin: 80rpx auto 32rpx;
  }

  .button--finish {
    background: rgba(24, 140, 252, 1);
    color: rgba(255, 255, 255, 1);
  }

  .button__icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 16rpx;
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

  .header__intro {
    height: 0;
    transition: height .24s linear;
  }

  .header__intro--active {
    height: 152rpx;
  }

  .header__icon {
    width: 32rpx;
    height: 32rpx;
    margin-right: 16rpx;
  }

  .guide__box {
    right: 0;
    top: 48rpx;
    padding: 0 8rpx 0 24rpx;
    height: 56rpx;
    background: rgba(252, 252, 255, 1);
    box-shadow: 0 12rpx 32rpx -8rpx rgba(188, 186, 216, .43);
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
  <base-page :errorMessage="errorMessage" v-if="pageDisplay">
    <radian-box>
      <div
        :class="['header__intro flex flex-ai-center flex-jc-center', { 'header__intro--active': recordFinish} ]"
      >
        <img
          class="header__icon"
          :src="titleIcon || `${OSS}/micha/icon/icon-checkin-finish.png`"
        >
        <span class="ft-semi-bold ft-fff ft-40">{{title || '打卡成功'}}</span>
      </div>

      <div :class="[{'page--finish': recordFinish}, 'page box absolute']">
        <!--
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
        -->

        <div
          v-for="(item, index) in taskMenus"
          :key="index"
        >
          <!-- title -->
          <card-header
            :title="item.title"
            :tip="item.tip"
            :icon="safeIconSource(item)"
            :recordFinish="recordFinish"
          />

          <!-- 图片打卡 -->
          <div
            v-if="item.type === '图片'"
            class="component-padding box"
          >
            <card-upload
              :recordFinish="recordFinish"
              :source="item"
              :images="answers[item.id].photos || []"
              @valueChange="handleValueChange"
              @someImageDelete="handleSomeImageDelete"
            />
          </div>

          <!-- 图片打卡2(仅展示) -->
          <div
            v-if="item.type === '图片2'"
            class="component-padding box"
          >
            <card-image :source="item"/>
          </div>

          <!-- 评分打卡 -->
          <div
            v-if="item.type === '评分'"
            class="box flex flex-ai-center flex-jc-between component-padding"
          >
            <card-score
              :score="score"
              :source="item"
              :recordFinish="recordFinish"
              @valueChange="handleValueChange"
              @userUpdateScore="handleUserUpdateScore"
            />
          </div>

          <!-- 运动分类打卡 -->
          <div
            v-if="item.type === '多类别单选'"
            class="box flex flex-ai-center flex-jc-between"
          >
            <card-sport
              :source="item"
              :recordFinish="recordFinish"
              @valueChange="handleValueChange"
            />
          </div>

          <!-- 单选打卡 -->
          <div
            class="component-padding box"
            v-if="item.type === '单选'"
          >
            <card-radio
              :source="item"
              :recordFinish="recordFinish"
              @valueChange="handleValueChange"
            />
          </div>

          <!-- 单行填空打卡 -->
          <div
            class="component-padding box"
            v-if="item.type === '单行填空'"
          >
            <card-input
              :source="item"
              :recordFinish="recordFinish"
              @valueChange="handleValueChange"
            />
          </div>

          <!-- 数值填空打卡 -->
          <div
            class="component-padding box"
            v-if="item.type === '数值填空'"
          >
            <card-input-float
              :source="item"
              :recordFinish="recordFinish"
              @valueChange="handleValueChange"
              @valueChangeError="handleValueChangeError"
            />
          </div>

          <!-- 数值 -->
          <div v-if="item.type === '数值'">
            <card-input-finish
              :source="item"
            />
          </div>

          <!-- 想法打卡 -->
          <div
            class="component-padding box"
            v-if="item.type === '填空'"
          >
            <card-textarea
              :source="item"
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

        <div
          class='button button--finish flex flex-jc-center flex-ai-center button__reagain'
          v-if="reCheckin"
          @click="handleReCheckin"
        >
          <img
            :src='updateIcon || `${OSS}/micha/icon/icon-checkin-reagain.png`'
            class="button__icon"
          />
          <span class="ft-medium ft-32">{{updateTitle || '继续打卡'}}</span>
        </div>

        <navigator
          open-type="switchTab"
          url="/pages/index/index"
          class="button button__back ft-medium ft-32"
          v-if="recordFinish"
        >返回首页</navigator>

      </div>
    </radian-box>
  </base-page>
</template>

<script>
  import { uploadImage2ServerByUniApp } from '@/static/apis/upload';
  import inject from "@/static/js/inject";

  const app = getApp();
  let userServerImages = [];
  let valueChangeError;

  export default inject({
    data() {
      return {
        taskMenus: [], // 所需回答问题列表
        task: {}, // 当前打卡数据
        answers: {}, // 用户所有回答

        userCanSubmit: false, // 用户是否可以提交按钮
        recordFinish: false, // 打卡是否已经完成
        pageDisplay: false, // 页面渲染

        title: '',
        titleIcon: '',
        updateTitle: '',
        canUpdate: false,
      };
    },
    onLoad(options) {
      const { checkin, id } = options;
      userServerImages = [];

      if (checkin) {
        this.fetchTaskDataByCheckIn(checkin);
        return
      }

      this.fetchTaskDataById(id);
    },
    computed: {
      reCheckin() {
        return this.recordFinish && this.canUpdate && this.task && this.task.questions && this.task.questions.length
      },
    },
    methods: {
      safeIconSource(source) {
        if (source.options && source.options.length && source.options[0].preTitleIcon) {
          return source.options[0].preTitleIcon;
        }

        if (source.preTitleIcon) {
          return source.preTitleIcon;
        }

        return ''
      },
      safeQuestionSource(source) {
        if (source.options && source.options.length && source.options[0].subQuestions) {
          return source.options[0].subQuestions
        }

        return []
      },
      // 获取上一页数据
      getPrevPage() {
        const pages = getCurrentPages();
        const prePage = pages[pages.length - 2];
        return prePage.$vm;
      },
      // 根据checkin获取打卡数据
      async fetchTaskDataByCheckIn(checkin) {
        const { tasks = [] } = this.getPrevPage();
        this.task = tasks.find((item) => item.checkin === checkin);

        const res = await this.callAPI('checkin.getOne', {
          checkin,
        });

        this.answers = {};
        this.recordFinish = true;
        this.taskMenus = res.shareValue.answers;
        this.canUpdate = res.shareValue.canUpdate;
        this.pageDisplay = true;
        uni.hideLoading();
      },
      // 根据id获取打卡数据
      async fetchTaskDataById(id) {
        const { tasks } = this.getPrevPage();
        this.recordFinish = false;
        this.answers = {};
        this.task = tasks.find((item) => item.id === id);
        this.taskMenus = this.task.questions;
        this.pageDisplay = true;
        uni.hideLoading();
      },
      // 答案范围有误
      handleValueChangeError(value) {
        valueChangeError = true;
        this.message(value);
      },
      // 回答某问题
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

        if (answer.photos.length) {
          this.uploadImages2Server(answer.photos, questionId, answer);
        }

        this.answers = {...answers};
        this.userCanSubmit = userCanSubmit;
      },
      // 处理多个图片上传事件
      async uploadImages2Server(images, questionId, answer) {
        uni.showLoading({ title: '图片上传ing...' });

        for (let i = 0; i < images.length; i++) {
          userServerImages.push(await this.uploadImage(images[i]));
        }

        uni.hideLoading();
        uni.showToast({ title: '图片上传成功!' });

        this.answers[questionId].photos = [...userServerImages];
      },
      // 上传单个图片到服务器
      async uploadImage(file) {
        try {
          const ext = file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2);
          const ossParams = await this.callAPI('upload.getUploadData', {
            ext,
            type: 'ali-oss',
          });
          await uploadImage2ServerByUniApp(file, ossParams);
          return `${ossParams.serverUrl}${ossParams.fileKey}`
        } catch (e) {
          uni.showModal({
            title: '图片上传出错',
            content: '图片上传出错:' + ((e.errMsg || e.message) || err),
          })
        }
      },
      // 图片删除
      handleSomeImageDelete({ questionId, index }) {
        userServerImages.splice(index, 1);
        this.answers[questionId].photos.splice(index, 1);
      },
      // 提交相关数据
      async submitCheckInData() {
        const {
          task: {
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
      // 完成打卡
      async handleUserSubmit() {
        if (!this.userCanSubmit) {
          return;
        }

        uni.showLoading({ title: '打卡中...' });

        const res = await this.submitCheckInData();
        this.taskMenus = res.shareValue.answers;
        this.title = res.shareValue.title;
        this.titleIcon = res.shareValue.titleIcon;
        this.updateTitle = res.shareValue.updateTitle;
        this.canUpdate = res.shareValue.canUpdate;

        const { bonus } = await this.callAPI('user.getUserBonus');
        app.globalData.bonus = bonus;

        const prePage = this.getPrevPage();
        await prePage.fetchTasks();

        uni.hideLoading();
        uni.showToast({ title: '打卡成功!' });

        uni.pageScrollTo({ scrollTop: 0 });
        this.recordFinish = true;
      },
      // 重新打卡
      handleReCheckin() {
        uni.pageScrollTo({ scrollTop: 0 });

        this.answers = {};
        this.taskMenus = this.task.questions;
        this.recordFinish = false;
        this.userCanSubmit = false;
      }
    }
  });
</script>

<style>
</style>
