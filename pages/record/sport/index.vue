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
    padding: 32rpx 0 64rpx;
  }

  .record__sport {
    padding: 16rpx 0 36rpx;
  }

  .sport__item {
    min-width: 146rpx;
    padding: 0 24rpx;
    height: 144rpx;
    border-radius: 24rpx;
    border: 2rpx solid rgba(73, 82, 125, .2);
  }

  .sport__title {
    color: rgba(43, 48, 73, 1);
    line-height: 56rpx;
  }

  .sport__spc {
    color: rgba(43, 48, 73, 1);
    line-height: 40rpx;
  }

  .button {
    margin: 20rpx auto 48rpx;
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
    height: 900rpx;
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
        url="/pages/record/guide/index"
        v-if="!recordFinish"
        class="guide__box box absolute flex flex-ai-center"
      >
        <span class="guide__span ft-26 ft-medium">任务指南</span>
        <img
            class="guide__icon"
            src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/sleep/icons/left-one.png"
        />
      </navigator>

      <div v-if="!recordFinish">
        <card-header type="sport" :recordFinish="recordFinish"/>
        <div class="sport">
          <card-sport
              :sportClass="sportClass"
              :intensityClass="intensityClass"
              :sportIndex="sportIndex"
              :intensityIndex="intensityIndex"
              :recordFinish="recordFinish"
              @userSelect="handleUserSelect"
          />
        </div>
      </div>

      <div v-if="recordFinish">
        <card-header
            icon="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/sleep/icons/exercise-title-icon.png"
            title="运动记录"
        />
        <div class="record__sport flex flex-ai-center">
          <div class="sport__item box flex flex-column flex-ai-center flex-jc-center">
            <span class="sport__title ft-40 ft-semi-bold">{{sportClass[sportIndex]}}</span>
            <span class="sport__spc ft-28 ft-semi-bold">{{intensityClass[intensityIndex].count}}{{intensityClass[intensityIndex].unit}}</span>
          </div>
        </div>
      </div>

      <card-header type="share" :recordFinish="recordFinish"/>
      <div class="component-padding box">
        <card-textarea
            :userInputValue="userInputValue"
            :recordFinish="recordFinish"
            @handleUserInput="handleUserInput"
        />
      </div>

      <div
          :class="[{'button--finish': userCanSubmit}, 'button ft-medium ft-32']"
          v-if="!recordFinish"
          @click="handleUserSubmit"
      >打卡</div>

      <div
          v-if="recordFinish"
          class="canvas__button flex flex-jc-center flex-ai-center"
      >
        <img
            class="canvas__icon"
            src
            alt
        >
        <span class="ft-medium ft-32 ft-fff">生成海报分享</span>
      </div>

      <div
          v-if="recordFinish"
          class="share__button flex flex-jc-center flex-ai-center"
      >
        <span class="share__span ft-medium ft-32 ft-fff">发送给支付宝好友</span>
      </div>
    </div>
  </base-page>
</template>

<script>
  import { userCheckinSport } from '@/static/apis/system';
  const app = getApp();
  const sportClass = [
    "慢跑",
    "快跑",
    "跳绳",
    "瑜伽",
    "拉伸",
    "做操",
    "球类",
    "单车",
    "无氧",
    "其他"
  ];
  const intensityClass = [
    {
      count: 30,
      unit: '分钟',
    }, {
      count: 60,
      unit: '分钟',
    }, {
      count: 60,
      unit: '分钟以上',
    },
  ];

  export default {
    data() {
      return {
        recordFinish: false, // 打卡是否已经完成
        sportClass,
        sportIndex: 0, // 选择的运动索引
        intensityClass,
        intensityIndex: 0, // 选择的强度索引
        userInputValue: '',
      };
    },
    computed: {
      userCanSubmit() {
        return this.sportIndex >= 0 && this.intensityIndex >= 0 && !!this.userInputValue
      },
    },
    methods: {
      handleUserSelect(key, index) {
        this[key] = index;
      },
      handleUserInput(value) {
        if (value === this.userInputValue) {
          return;
        }

        this.userInputValue = value;
      },
      async submitCheckinData() {
        const { sportClass, sportIndex, intensityClass, intensityIndex, userInputValue } = this;
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
      async handleUserSubmit() {
        if (!this.userCanSubmit) {
          return;
        }

        await this.submitCheckinData();

        uni.pageScrollTo({ scrollTop: 0 });
        this.recordFinish = true;
      }
    }
  };
</script>

<style>
</style>
