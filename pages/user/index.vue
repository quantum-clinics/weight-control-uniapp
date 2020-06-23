<style scoped>
  .user {
    background: rgba(255, 255, 255, 1);
    width: calc(100vw - 64rpx);
    margin: 46rpx auto 60rpx;
    min-height: 1228rpx;
    box-shadow: 0 12rpx 32rpx 0 rgba(143, 181, 198, .3);
    border-radius: 30rpx;
    padding: 48rpx 32rpx 0;
  }

  .user__header {
    padding-bottom: 32rpx;
    /*border-bottom: 1rpx solid rgba(224, 228, 232, 1);*/
  }

  .user__avatar {
    width: 128rpx;
    height: 128rpx;
    margin-right: 24rpx;
    background: #ddd;
  }

  .user__create {
    margin: 8rpx 0;
  }

  .user__target {
    display: inline-flex;
    height: 44rpx;
    padding: 0 16rpx 0 12rpx;
    background: linear-gradient(135deg, rgba(255, 179, 24, 1) 0%, rgba(255, 145, 23, 1) 100%);
    border-radius: 8rpx;
  }

  .target__icon {
    width: 32rpx;
    height: 32rpx;
  }

  .target__span {
    margin: 0 8rpx 0 4rpx;
    color: rgba(255, 255, 255, .85);
  }

  .user__plays {
    padding: 32rpx 0;
  }

  .play__picc,
  .play__alipay {
    padding: 0 32rpx 0 20rpx;
    height: 120rpx;
    border-radius: 16rpx;
  }

  .play__picc {
    background: rgba(255, 245, 214, 1);
    margin-bottom: 16rpx;
  }

  .play__alipay {
    background: linear-gradient(
        135deg,
        rgba(49, 175, 255, 1) 0%,
        rgba(22, 119, 255, 1) 100%
    );
  }

  .play__image {
    width: 68rpx;
    height: 68rpx;
    margin-right: 16rpx;
    background: #ddd;
  }

  .span__picc {
    color: rgba(255, 104, 2, 1);
  }

  .span__picc,
  .span__alipay {
    line-height: 36rpx;
  }

  .play__icon {
    width: 32rpx;
    height: 32rpx;
  }

  .user__menus {
    padding: 28rpx 0;
  }

  .menu__item {
    height: 110rpx;
    border-bottom: 1rpx solid rgba(224, 228, 232, 1);
  }

  .user__menus .menu__item:last-child {
    border: none;
  }

  .menu__icon {
    width: 48rpx;
    height: 48rpx;
  }

  .menu__span {
    padding-left: 16rpx;
    color: rgba(43, 48, 73, 1);
  }

  .ft-title {
    color: rgba(0, 0, 0, .85);
  }

  .ft-desc {
    color: rgba(0, 0, 0, .25);
  }

  .icon {
    width: 32rpx;
    height: 32rpx;
  }
</style>

<template>
  <base-page :errorMessage="errorMessage" v-if="pageDisplay">
    <radian-box>
      <div class="user box">
        <div class="user__header flex flex-ai-center">
          <img class="user__avatar" :src="avatarUrl"/>
          <div class="flex-fill">
            <div class="ft-40 ft-semi-bold line-fill ft-title">{{nickName}}</div>
            <div class="user__create ft-28 line-fill ft-semi-bold ft-desc">{{startDate}} 加入</div>
            <div class="user__target flex-ai-center box">
              <img
                class="target__icon"
                :src="`${OSS}/micha/icon/icon-weight-target.png`"
              />
              <span class="ft-24 ft-semi-bold flex-fill target__span">减重目标</span>
              <span class="ft-24 ft-semi-bold ft-fff">{{loseWeight}}公斤</span>
            </div>
          </div>
        </div>

        <!--
        <div class="user__plays">
          <div class="play__picc flex flex-ai-center">
            <img class="play__image" src />
            <div class="flex-fill">
              <div class="span__picc ft-30 ft-medium">现在加入好医保2020新生计划</div>
              <div class="span__picc ft-30 ft-medium">获7天免费体验机会</div>
            </div>
            <img class="play__icon" src />
          </div>

          <div class="play__alipay flex flex-ai-center">
            <img class="play__image" src />
            <div class="flex-fill">
              <div class="span__alipay ft-30 ft-medium ft-fff">升级成为正式会员</div>
              <div class="span__alipay ft-30 ft-medium ft-fff">获21天完整计划+3次专业咨询</div>
            </div>
            <img class="play__icon" src />
          </div>
        </div>
        -->

        <div class="user__menus">
          <div
            v-for="(item, index) in menus"
            :key="index"
            v-if="item.url"
            class="menu__item flex flex-ai-center"
            @click="handleItemClick(index)"
          >
            <img class="menu__icon" :src="item.icon" />
            <span class="menu__span flex-fill ft-32">{{item.span}}</span>
            <img
              class="icon"
              :src="`${OSS}/micha/icon/icon-arrow-right-gray.png`"
            />
          </div>
        </div>
      </div>
    </radian-box>
  </base-page>
</template>

<script>
  import { formatTime } from '@/static/js/utils';
  import inject from '@/static/js/inject';

  const app = getApp();
  const menus = [
    {
      icon: `${app.globalData.OSS}/micha/icon/icon-my-consult.png`,
      span: '我的咨询',
    }, {
      icon: `${app.globalData.OSS}/micha/icon/icon-my-report.png`,
      span: '我的报告',
    }, {
      icon: `${app.globalData.OSS}/micha/icon/icon-my-function.png`,
      span: '我的方案',
    }, {
      icon: `${app.globalData.OSS}/micha/icon/icon-my-checkin.png`,
      type: 'navigateTo',
      url: '/pages/myCheckin/index',
      span: '我的打卡',
    }, {
      icon: `${app.globalData.OSS}/micha/icon/icon-my-course.png`,
      type: 'switchTab',
      url: '/pages/course/index',
      span: '我的精品课',
    }, {
      icon: `${app.globalData.OSS}/micha/icon/icon-micha-about.png`,
      type: 'navigateTo',
      url: '/pages/webview/index?url=https://weight-control.qtclinics.com/micha',
      span: '关于米茶',
    }, {
      icon: `${app.globalData.OSS}/micha/icon/icon-micha-refill.png`,
      type: 'navigateTo',
      url: '/pages/refill/index',
      span: '充值',
    },
  ];
  let pageInit = false;

  export default inject({
    data() {
      return {
        menus,
        nickName: '',
        avatarUrl: '',
        createDate: '',
        startDate: '',
        loseWeight: '',
        pageDisplay: false,
      }
    },
    onShow() {
      if (app.globalData.needRecord) {
        uni.switchTab({
          url: "/pages/micha/index"
        });
        return;
      }

      if (pageInit) {
        return
      }

      this.fetchUserData();
    },
    methods: {
      fetchUserData() {
        uni.showLoading({ title: 'Loading..' });
        const { nickName, avatarUrl, startDate, loseWeight } = app.globalData.profile;
        pageInit = true;
        this.nickName = nickName;
        this.avatarUrl = avatarUrl;
        this.startDate = startDate;
        this.loseWeight = loseWeight;
        this.pageDisplay = true;
        uni.hideLoading();
      },
      joinTime(date) {
        return formatTime(date);
      },
      handleItemClick(index) {
        const target = this.menus[index];

        if (!target.url) {
          return;
        }

        if (target.type === 'navigateTo') {
          uni.navigateTo({ url: target.url });
        }

        if (target.type === 'switchTab') {
          uni.switchTab({ url: target.url });
        }
      }
    },
  });
</script>
