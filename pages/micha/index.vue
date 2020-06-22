<style scoped>
  .micha {
    min-height: 100vh;
    background: rgba(245, 245, 245, 1);
    padding-bottom: 144rpx;
    transition: opacity .48s linear;
  }

  .micha--active {
    opacity: 1;
  }

  .micha--hide {
    opacity: 0;
  }
</style>

<template>
  <base-page :errorMessage="errorMessage">
    <div :class="['micha box', pageDisplay ? 'micha--active' : 'micha--hide']">
      <div class="talks" ref="talks">
        <div
          class="talk__item"
          v-for="(item, index) in talksData"
          :key="index"
        >
          <talk-micha
            v-if="item.type === 1"
            :talker="item"
            :answers="answers"
            :shareValueType="shareValueType"
            @valueChange="handleValueChange"
            @shareValueChange="handleShareValueChange"
          />

          <talk-user
            v-if="item.type === 2"
            :talker="item"
          />
        </div>
      </div>

      <micha-footer
        :taskSchedule="taskSchedule"
        :questionReply="questionReply"
        @backQuestion="handleBackQuesitionRender"
        @valueChangeError="handleValueChangeError"
        @userInput="handleUserInput"
      />
    </div>
  </base-page>
</template>

<script>
  import inject from '@/static/js/inject';

  const app = getApp();
  let quesitionsTask = '';
  let questions = [];

  export default inject({
    data() {
      return {
        talksData: [],
        answers: {},
        pageDisplay: false,
        questionReply: {
          id: '',
          type: '',
          userInputModel: false,
        },
        taskSchedule: {},
        shareValueType: '',
      }
    },
    onShow() {
      this.renderPage();
    },
    watch: {
      talksData() {
        this.talksReachBottom();
      },
    },
    methods: {
      renderPage() {
        if (!questions.length) {
          this.talksData = [];
          this.fetchCheckList();
        }

        this.taskSchedule = app.globalData.taskSchedule;
      },
      // 会话列表滚动至底部
      talksReachBottom() {
        this.$nextTick(() => {
          this.talksDocument.boundingClientRect(({ height }) => {
            uni.pageScrollTo({ scrollTop: height })
          }).exec()
        });
      },
      // 获取量表数据
      async fetchCheckList() {
        uni.showLoading({ title: 'Loading..' });
        this.talksDocument = uni.createSelectorQuery().select(".talks");
        const res = await this.callAPI('system.getCheckList');


        if (res.shareValue) {
          this.shareValueType = res.shareValue.type;

          // 将量表添加至聊天列表中
          this.pushTalk2List({
            type: 1,
            shareValue: res.shareValue,
          })
        }

        if (!res.shareValue && res.questions.length) {
          const answers = {};
          res.questions.forEach((item) => (answers[item.id] = { text: '', photos: [] }));
          this.answers = answers;
          this.shareValueType = '';

          questions = res.questions;
          quesitionsTask = res.task;
          this.nextQuesitionRender();
        }

        uni.hideLoading();

        this.$nextTick(() => {
          this.talksReachBottom();
          this.pageDisplay = true;
        });
      },
      // 添加数据至聊天列表中
      pushTalk2List(talk) {
        const { OSS } = app.globalData;

        if (talk.type === 1) {
          talk.avatar = `${OSS}/micha/icon/icon-himicha.png`;
          talk.nickName = '米茶专家';
        }

        if (talk.type === 2) {
          talk.avatar = app.globalData.profile.avatarUrl;
          talk.nickName = app.globalData.profile.nickName;
        }

        this.talksData.push(talk);
      },
      // 用户输入
      handleUserInput(answer) {
        this.pushTalk2List({
          type: 2,
          content: answer,
        });

        if (this.questionReply.userInputModel) {
          this.answers[this.questionReply.id].text = answer;
          this.questionReply.userInputModel = false;
          this.nextQuesitionRender();
          return;
        }

        if (this.questionReply.id && questions.length) {
          this.nextQuesitionRender()
        }
      },
      // 用户回答某问题
      handleValueChange({ id, answer, value }) {
        this.answers[id].text = value;
        this.handleUserInput(answer);
      },
      // 用户选择量表
      async handleShareValueChange({ type }) {
        uni.showLoading({ title: '参与中..' });
        const { success } = await this.callAPI('user.updateUser', {
          type,
        });
        this.shareValueType = type;
        uni.hideLoading();
        uni.showToast({ title: '恭喜您参与成功' });
        questions = [];
        app.globalData.needRecord = false;
        uni.switchTab({
          url: "/pages/index/index"
        });
      },
      handleValueChangeError(value) {
        this.message(value);
      },
      // 渲染下一道问题
      nextQuesitionRender() {
        const nextQuestion = questions.find((item) => !this.answers[item.id].text);
        if (!nextQuestion) {
          this.questionReply = {
            id: '',
            type: '',
            userInputModel: false,
          };

          this.submitQuestionCheckList();
          return
        }

        this.questionReply = {
          id: nextQuestion.id,
          userInputModel: nextQuestion.type === '填空' || nextQuestion.type === '数值填空',
          type: nextQuestion.type,
        }

        this.pushTalk2List({
          type: 1,
          question: nextQuestion,
        })
      },
      // 回退到上一道问题
      handleBackQuesitionRender() {
        if (!this.questionReply.id) {
          return;
        }

        const currentQuestionIndex = questions.findIndex((item) => item.id === this.questionReply.id);

        if (!currentQuestionIndex) {
          return
        }

        const beforeQuestions = questions.filter((item, index) => {
          if (index < currentQuestionIndex) return item
        });

        const prevQuestion = beforeQuestions.reverse().find((item) => !!this.answers[item.id].text)

        this.answers[prevQuestion.id].text = '';
        this.nextQuesitionRender();
      },
      // 提交健康量表
      async submitQuestionCheckList() {
        const { shareValue } = await this.callAPI('groupSchedule.checkin', {
          task: quesitionsTask,
          photo: [],
          value: JSON.stringify(this.answers),
        });

        // 将量表添加至聊天列表中
        this.pushTalk2List({
          type: 1,
          shareValue,
        })
      },
    }
  });
</script>
