<style scoped>
  .talk {
    padding: 32rpx 94rpx 0 16rpx;
    margin-bottom: 16rpx;
  }

  .talk__avatar {
    width: 80rpx;
    height: 80rpx;
    /* TODO DELETE */
    background: #FF4A00;
    border-radius: 50%;
    margin-right: 16rpx;
  }

  .info__name {
    color: rgba(0, 0, 0, .45);
    line-height: 34rpx;
    margin-bottom: 12rpx;
  }

  .info__content {
    background: #fff;
    border-radius: 0 32rpx 32rpx 32rpx;
    padding: 32rpx;
  }

  .content__span {
    line-height: 40rpx;
  }

  .html__intro {
    margin-top: 64rpx;
  }

  .intro__title {
    color: rgba(169, 174, 182, 1);
    line-height: 32rpx;
    margin-bottom: 8rpx;
  }

  .intro__spc {
    color: rgba(255, 74, 0, 1);
    line-height: 32rpx;
  }

  .data__intro {
    margin-top: 32rpx;
  }

  .intro__span {
    color: rgba(0, 0, 0, .25);
    line-height: 32rpx;
  }

  .info__image {
    margin-top: 16rpx;
    width: 100%;
    /* TODO replact height by auto */
    height: 480rpx;
    background: #000;
  }
</style>

<template>
  <div class="talk flex">
    <img
      class="talk__avatar"
      :src="talker.avatar"
    />
    <div class="talk__info flex-fill">
      <div class="info__name ft-24">{{talker.nickName}}</div>

      <!-- 文本对话 -->
      <div
        class="info__content"
        v-if="talker.content"
      >
        <span class="content__span ft-32">{{talker.content}}</span>
      </div>

      <!-- 富文本渲染 -->
      <div
        class="flex flex-column"
        v-if="talker.html"
      >
        <div class="info__content ft-32">{{talker.html}}</div>
        <div class="html__intro flex flex-column flex-ai-center">
          <span class="intro__title ft-26 ft-semi-bold">您选择了【呼叫】，扣除120米茶币</span>
          <span class="intro__spc ft-26 ft-semi-bold">米茶币剩余：2150</span>
        </div>
      </div>

      <!-- 数据展示 -->
      <div
        class="flex flex-column"
        v-if="talker.data"
      >
        <div class="info__content ft-32">{{talker.data}}</div>
        <div class="data__intro flex flex-column flex-ai-center">
          <span class="intro__span ft-26">以上数据仅供参考，具体健康减脂问题</span>
          <span class="intro__span ft-26">请开启米茶计划后咨询专业营养师</span>
        </div>
      </div>

      <!-- 图片展示 -->
      <div
        class="info__content flex flex-column"
        v-if="talker.image"
      >
        <div class="ft-medium ft-32 line-fill">刘晓丽的6月6日的打卡记录</div>
        <img
          class="info__image"
          :src="talker.image"
        />
      </div>

      <!-- 单项选择问题 -->
      <micha-question-radio
        v-if="componentRender('单选')"
        :question="talker.question"
        @valueChange="handleValueChange"
      />

      <!-- 多项选择问题 -->
      <micha-question-multiple
        v-if="componentRender('多选')"
        :question="talker.question"
        @valueChange="handleValueChange"
      />

      <!-- 填空回答问题 -->
      <micha-question-input
        v-if="componentRender('填空')"
        :question="talker.question"
      />

      <!-- 评分回答问题 -->
      <micha-question-score
        v-if="componentRender('评分')"
        :question="talker.question"
        @valueChange="handleValueChange"
      />

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      talker: Object,
    },
    methods: {
      componentRender(type) {
        return !!(this.talker.question && this.talker.question.type && this.talker.question.type === type);
      },
      handleValueChange(value) {
        this.$emit('valueChange', value)
      }
    },
  };
</script>
