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
    <div :class="['micha', pageDisplay ? 'micha--active' : 'micha--hide']">
      <div class="talks" ref="talks">
        <div
          class="talk__item"
          v-for="(item, index) in talksData"
          :key="index"
        >
          <talk-micha
            v-if="item.type === 1"
            :talker="item"
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
        @backQuestion="handleBackQuesitionRender"
        @userInput="handleUserInput"
      />
    </div>
  </base-page>
</template>

<script>
  import inject from '@/static/js/inject';
  const questions = [
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
  let checkListInit = false;

  export default inject({
    data() {
      return {
        talksData: [],
        answers: {},
        pageDisplay: false,
        questionReply: {
          model: false,
          id: '',
        },
        taskSchedule: {},
      }
    },
    onShow() {
      if (checkListInit && !pageInit) {
        return;
      }

      if (app.globalData.needRecord) {
        this.talksData = [];
        this.fetchCheckList();
        return
      }

      this.taskSchedule = app.globalData.taskSchedule;

      if (pageInit) {
        return;
      }

      this.fetchTalkDate();
    },
    watch: {
      talksData() {
        this.talksReachBottom();
      },
    },
    methods: {
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
        console.log('获取健康量表');
        this.talksDocument = uni.createSelectorQuery().select(".talks");
        const res = await this.callAPI('system.getCheckList');
        console.log(res);

        if (res.questions.length) {
          const answers = {};
          res.questions.forEach((item) => (answers[item.id] = { text: '', photos: [] }));
          this.answers = answers;
          this.questions = res.questions;
          this.nextQuesitionRender();
        }

        checkListInit = true;

        this.$nextTick(() => {
          this.talksReachBottom();
          this.pageDisplay = true;
        });
      },
      // 获取数据
      async fetchTalkDate() {
        console.log('获取页面数据')
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
      handleUserInput(value) {
        // TODO replace (id === 'duoxuan') by (id = trueValue)
        this.pushTalk2List({
          type: 2,
          content: this.questionReply.id === 'duoxuan' ? value.replace(/&&/g, ', ') : value,
        });

        if (this.questionReply.model) {
          this.answers[this.questionReply.id].text = value;
          this.nextQuesitionRender();
          return;
        }

        if (this.questionReply.id) {
          this.nextQuesitionRender()
        }
      },
      // 用户回答某问题
      handleValueChange(value) {
        this.answers[this.questionReply.id].text = value;
        this.handleUserInput(value);
      },
      // 渲染下一道问题
      nextQuesitionRender() {
        const nextQuestion = this.questions.find((item) => !this.answers[item.id].text);
        console.log('回答完毕, 下一道题: ', nextQuestion);
        if (!nextQuestion) {
          this.questionReply.id = '';
          this.questionReply.model = false;
          return
        }

        this.questionReply.id = nextQuestion.id;
        this.questionReply.model = nextQuestion.type === '填空';

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

        const currentQuestionIndex = this.questions.findIndex((item) => !this.answers[item.id].text);

        if (!currentQuestionIndex) {
          return
        }

        this.answers[this.questions[currentQuestionIndex - 1].id].text = '';
        this.nextQuesitionRender();
      },
    }
  });
</script>
