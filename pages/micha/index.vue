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
            @valueChange="handleValueChange"
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
  const __questions = [
    {
      id: 'danxuan',
      type: '单选',
      title: 'hi, 小量又来啦。让小量来了解一下，以下四种水果，你最爱吃的是哪样呢?',
      mark: '小课',
      options: ['苹果', '香蕉', '菠萝', '西红柿'],
    }, {
      id: 'duoxuan',
      type: '多选',
      title: 'hi, 小量又来啦。让小量来了解一下，以下四种肉类，你爱吃的是哪些?',
      mark: '小课',
      options: ['鸡肉', '牛肉', '鱼肉', '猪肉', '羊肉'],
    }, {
      id: 'tiankong',
      type: '填空',
      title: 'hi, 小量又来啦。让小量来了解一下，你最近最喜欢吃的一道菜是？',
      mark: '小课',
    }, {
      id: 'pingfen',
      type: '评分',
      title: 'hi, 小量又来啦。让小量来了解一下，你今天的信心是?',
      options: ['苹果', '香蕉', '菠萝', '西红柿'],
      mark: '小课',
    },
  ];

  const app = getApp();
  let pageInit = false;
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
        if (app.globalData.needRecord && !questions.length) {
          this.talksData = [];
          this.fetchCheckList();
        }

        if (!app.globalData.needRecord && !pageInit) {
          this.talksData = [];
          this.fetchTalkDate();
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
        this.talksDocument = uni.createSelectorQuery().select(".talks");
        const res = await this.callAPI('system.getCheckList');

        if (res.questions.length) {
          const answers = {};
          res.questions.forEach((item) => (answers[item.id] = { text: '', photos: [] }));
          this.answers = answers;
          questions = res.questions;
          quesitionsTask = res.task;
          this.nextQuesitionRender();
        }

        this.$nextTick(() => {
          this.talksReachBottom();
          this.pageDisplay = true;
        });
      },
      // 获取数据
      async fetchTalkDate() {
        if (!this.talksDocument) {
          this.talksDocument = uni.createSelectorQuery().select(".talks");
        }

        pageInit = true;

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
      handleValueChangeError(value) {
        this.message(value);
      },
      // 渲染下一道问题
      nextQuesitionRender() {
        const nextQuestion = questions.find((item) => !this.answers[item.id].text);
        console.log('回答完毕, 下一道题: ', nextQuestion);
        if (!nextQuestion) {
          this.questionReply = {
            id: '',
            type: '',
            userInputModel: false,
          };
          // TODO finish
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
        console.log('this.questionReply', this.questionReply);
        if (!this.questionReply.id) {
          return;
        }

        // const currentQuestionIndex = questions.findIndex((item) => !this.answers[item.id].text);
        const currentQuestionIndex = questions.findIndex((item) => item.id === this.questionReply.id);
        console.log('currentQuestionIndex', currentQuestionIndex);


        if (!currentQuestionIndex) {
          return
        }

        const beforeQuestions = questions.filter((item, index) => {
          if (index < currentQuestionIndex) return item
        });
        console.log('beforeQuestions', beforeQuestions)

        const prevQuestion = beforeQuestions.reverse().find((item) => {
          console.log('find', item);
          console.log('find answer', !!this.answers[item.id].text)
          return !!this.answers[item.id].text
        })
        console.log('prevQuestion', prevQuestion)

        this.answers[prevQuestion.id].text = '';
        this.nextQuesitionRender();
      },
      // 提交健康量表
      async submitQuestionCheckList() {
        const res = await this.callAPI('groupSchedule.checkin', {
          task: quesitionsTask,
          photo: [],
          value: JSON.stringify(this.answers),
        });

        console.log(res);
        app.globalData.needRecord = false;
      },
    }
  });
</script>
