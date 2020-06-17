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

  const list = [
    {
      type: 1,
      html: '米茶计划为您提供 5X8 小时，工作时间内的执业营养师一对一咨询服务。营养师会对您的打卡记录、体脂情况、个人报告进行讲解，也会解答您关于减重方面的疑问。这是一项付费服务',
    },
  ];
  const app = getApp();

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
      }
    },
    async onLoad() {
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
      // 获取数据
      fetchTalkDate() {
        this.talksData = [...list];
        this.talksDocument = uni.createSelectorQuery().select(".talks");

        if (questions.length) {
          const answers = {};
          questions.forEach((item) => (answers[item.id] = { text: '', photos: [] }));
          this.answers = answers;
          this.nextQuesitionRender();
        }

        this.$nextTick(() => {
          this.talksReachBottom();
          this.pageDisplay = true;
        })
      },
      // 添加数据至聊天列表中
      pushTalk2List(talk) {

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
        const nextQuestion = questions.find((item) => !this.answers[item.id].text);
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

        const currentQuestionIndex = questions.findIndex((item) => !this.answers[item.id].text);

        if (!currentQuestionIndex) {
          return
        }

        this.answers[questions[currentQuestionIndex - 1].id].text = '';
        this.nextQuesitionRender();
      },
    }
  });
</script>
