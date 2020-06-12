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
          />

          <talk-user
              v-if="item.type === 2"
              :talker="item"
          />
        </div>
      </div>
      <micha-footer
          :userInputValue="userInputValue"
          @userInput="handleUserInput"
      />
    </div>
  </base-page>
</template>

<script>
  import inject from '@/static/js/inject';
  const list = [
    {
      type: 1,
      avatar: '',
      nickName: '米茶专家',
      html: '米茶计划为您提供 5X8 小时，工作时间内的执业营养师一对一咨询服务。营养师会对您的打卡记录、体脂情况、个人报告进行讲解，也会解答您关于减重方面的疑问。这是一项付费服务',
    }, {
      type: 1,
      avatar: '',
      nickName: 'James.wang',
      content: '你好，我是James.wang，您的个案责任执业营养师'
    }, {
      type: 1,
      avatar: '',
      nickName: 'James.wang',
      data: '这是一份数据'
    },  {
      type: 1,
      avatar: '',
      nickName: 'James.wang',
      data: '这是一份数据'
    }, {
      type: 1,
      avatar: '',
      nickName: 'James.wang',
      image: ' '
    }, {
      type: 2,
      avatar: '',
      nickName: 'God of God',
      content: '你好，我是God of God'
    }, {
      type: 2,
      avatar: '',
      nickName: 'God of God',
      image: ' '
    },
  ];
  const app = getApp();

  export default inject({
    data() {
      return {
        talksData: [],
        userInputValue: 'hello micha',
        pageDisplay: false,
      }
    },
    async onLoad() {
      await app.$vm.init();
      this.fetchTalkDate()
    },
    watch: {
      talksData() {
        this.talksReachBottom();
      },
    },
    methods: {
      talksReachBottom() {
        this.talksDocument.boundingClientRect(({ height }) => {
          uni.pageScrollTo({ scrollTop: height })
        }).exec()
      },
      fetchTalkDate() {
        this.talksData = [...list];
        this.talksDocument = uni.createSelectorQuery().select(".talks");
        this.$nextTick(() => {
          this.talksReachBottom();
          this.pageDisplay = true;
        })
      },
      handleUserInput(value) {
        this.userInputValue = value;

        this.talksData.push({
          type: 2,
          avatar: '',
          nickName: 'God of God',
          content: value,
        });

      },
    }
  });
</script>
