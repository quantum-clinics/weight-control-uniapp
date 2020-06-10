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

      <card-header type="upload" :recordFinish="recordFinish"/>
      <div<style scoped>
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

            <card-header type="upload" :recordFinish="recordFinish"/>
            <div :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']">
              <card-upload
                  :images="userUploadImages"
                  :recordFinish="recordFinish"
                  @imagesUpLoad="handleUserUpLoadImage"
              />
            </div>

            <card-header type="score" :recordFinish="recordFinish"/>
            <div
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

            <card-header type="share" :recordFinish="recordFinish"/>
            <div :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']">
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
        import { uploadImage } from '@/static/apis/upload';
        import { userCheckinDiet } from '@/static/apis/system';
        const app = getApp();
        const userServerImages = []; // 用户上传成功的图片地址存放

        export default {
          data() {
            return {
              recordFinish: false, // 打卡是否已经完成
              userUploadImages: [], // 用户上传的图片数组
              score: 0, // 打分
              userInputValue: '',
            };
          },
          computed: {
            userCanSubmit() {
              return !!this.userUploadImages.length && !!this.score && !!this.userInputValue
            },
          },
          methods: {
            handleUserUpLoadImage(e) {
              this.userUploadImages.push(...e.tempFilePaths);
            },
            handleUserUpdateScore(value) {
              this.score = value;
            },
            handleUserInput(value) {
              if (value === this.userInputValue) {
                return;
              }

              this.userInputValue = value;
            },
            async uploadImages() {
              uni.showLoading({ title: '上传ing...' });

              for (let i = 0; i < this.userUploadImages.length; i++) {
                userServerImages.push(await uploadImage(this.userUploadImages[i]));
              }

              uni.hideLoading();
              uni.showToast({ title: 'Finish!' });
            },
            async submitCheckinData() {
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
                _id: '5ec24280d211422b3d36f3c1',
                photo: [],
                value: JSON.stringify(data),
              });
            },
            async handleUserSubmit() {
              if (!this.userCanSubmit) {
                return;
              }
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

                  <card-header type="upload" :recordFinish="recordFinish"/>
                  <div :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']">
                  <card-upload
            :images="userUploadImages"
            :recordFinish="recordFinish"
            @imagesUpLoad="handleUserUpLoadImage"
                  />
                  </div>

                  <card-header type="score" :recordFinish="recordFinish"/>
                  <div
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

                  <card-header type="share" :recordFinish="recordFinish"/>
                  <div :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']">
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
              import { uploadImage } from '@/static/apis/upload';
              import { userCheckinDiet } from '@/static/apis/system';
              const app = getApp();
              const userServerImages = []; // 用户上传成功的图片地址存放

              export default {
                data() {
                  return {
                    recordFinish: false, // 打卡是否已经完成
                    userUploadImages: [], // 用户上传的图片数组
                    score: 0, // 打分
                    userInputValue: '',
                  };
                },
                computed: {
                  userCanSubmit() {
                    return !!this.userUploadImages.length && !!this.score && !!this.userInputValue
                  },
                },
                methods: {
                  handleUserUpLoadImage(e) {
                    this.userUploadImages.push(...e.tempFilePaths);
                  },
                  handleUserUpdateScore(value) {
                    this.score = value;
                  },
                  handleUserInput(value) {
                    if (value === this.userInputValue) {
                      return;
                    }

                    this.userInputValue = value;
                  },
                  async uploadImages() {
                    uni.showLoading({ title: '上传ing...' });

                    for (let i = 0; i < this.userUploadImages.length; i++) {
                      userServerImages.push(await uploadImage(this.userUploadImages[i]));
                    }

                    uni.hideLoading();
                    uni.showToast({ title: 'Finish!' });
                  },
                  async submitCheckinData() {
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
                      _id: '5ec24280d211422b3d36f3c1',
                      photo: [],
                      value: JSON.stringify(data),
                    });
                  },
                  async handleUserSubmit() {
                    if (!this.userCanSubmit) {
                      return;
                    }

                    await this.uploadImages();
                    await this.submitCheckinData();

                    uni.pageScrollTo({ scrollTop: 0 });
                    this.recordFinish = true;
                  }
                }
              };
      </script>

      <style>
      </style>

              await this.uploadImages();
              await this.submitCheckinData();

              uni.pageScrollTo({ scrollTop: 0 });
              this.recordFinish = true;
            }
          }
        };
      </script>

      <style>
      </style>
      :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']">
        <card-upload
            :images="userUploadImages"
            :recordFinish="recordFinish"
            @imagesUpLoad="handleUserUpLoadImage"
        />
      </div>

      <card-header type="score" :recordFinish="recordFinish"/>
      <div
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

      <card-header type="share" :recordFinish="recordFinish"/>
      <div :class="['box', recordFinish ? 'component-padding--finish' : 'component-padding']">
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
  import { uploadImage } from '@/static/apis/upload';
  import { userCheckinDiet } from '@/static/apis/system';
  const app = getApp();
  const userServerImages = []; // 用户上传成功的图片地址存放

  export default {
    data() {
      return {
        recordFinish: false, // 打卡是否已经完成
        userUploadImages: [], // 用户上传的图片数组
        score: 0, // 打分
        userInputValue: '',
      };
    },
    computed: {
      userCanSubmit() {
        return !!this.userUploadImages.length && !!this.score && !!this.userInputValue
      },
    },
    methods: {
      handleUserUpLoadImage(e) {
        this.userUploadImages.push(...e.tempFilePaths);
      },
      handleUserUpdateScore(value) {
        this.score = value;
      },
      handleUserInput(value) {
        if (value === this.userInputValue) {
          return;
        }

        this.userInputValue = value;
      },
      async uploadImages() {
        uni.showLoading({ title: '上传ing...' });

        for (let i = 0; i < this.userUploadImages.length; i++) {
          userServerImages.push(await uploadImage(this.userUploadImages[i]));
        }

        uni.hideLoading();
        uni.showToast({ title: 'Finish!' });
      },
      async submitCheckinData() {
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
          _id: '5ec24280d211422b3d36f3c1',
          photo: [],
          value: JSON.stringify(data),
        });
      },
      async handleUserSubmit() {
        if (!this.userCanSubmit) {
          return;
        }

        await this.uploadImages();
        await this.submitCheckinData();

        uni.pageScrollTo({ scrollTop: 0 });
        this.recordFinish = true;
      }
    }
  };
</script>

<style>
</style>
