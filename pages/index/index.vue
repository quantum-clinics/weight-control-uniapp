<style scoped>
.body {
  padding: 40rpx;
}

.card {
}

.card__item {
  width: 272rpx;
  height: 272rpx;
  min-height: 156px;
  background: #fffcf7;
  border: none;
  border-radius: 12px;
  box-shadow: 1px 5px 40px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  transition: all 1s;
  margin-right: 16px;
}

.item__title {
  font-size: 32rpx;
  color: #252462;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-weight: 600;
}

.item__intro {
  font-size: 26rpx;
  color: #252462;
  margin-top: 4px;
  white-space: normal;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 214rpx;
  text-align: center;
  opacity: 0.45;
}

.upload,
.score {
  padding: 50rpx 0 200rpx;
}
</style>

<template>
  <base-page :errorMessage="errorMessage" ref="basePage">
    <div class="body">
      <div class="card flex flex-jc-center flex-wrap">
        <div
          class="card__item flex flex-column flex-ai-center flex-jc-center"
          v-for="(item, index) in tasks"
          :key="index"
        >
          <span class="item__title">{{item.groupTitle}}</span>
          <span class="item__intro">{{item.subTitle}}</span>
        </div>
      </div>
      <card-header type="upload" />
      <div class="upload">
        <card-upload :images="userUploadImages" @imagesUpLoad="handleUserUpLoadImage" />
      </div>
      <card-header type="score" />
      <div class="score">
        <card-score :score="score" @userUpdateScore="handleUserUpdateScore" />
      </div>
      <card-header type="sport" />
      <div class="sport">
        <card-sport :sportIndex="sportIndex" @userSelectSport="handleUserSelectSport" />
      </div>
    </div>
  </base-page>
</template>

<script>
import { userFetchTasks } from "@/static/apis/system";
const app = getApp();

export default {
  data() {
    return {
      errorMessage: "",
      userUploadImages: [], // 用户上传的图片数组
      score: 0, // 打分
      sportIndex: 1, // 选择的运动索引
      tasks: []
    };
  },
  onLoad() {
    app.$vm.init().then(this.fetchTasks);
  },
  methods: {
    handleUserUpLoadImage(e) {
      this.userUploadImages.push(...e.tempFilePaths);
    },
    handleUserUpdateScore(value) {
      this.score = value;
    },
    handleUserSelectSport(index) {
      this.sportIndex = index;
    },
    fetchTasks() {
      userFetchTasks().then(res => {
        console.log(res);
        this.tasks = res.result.tasks;
      });
    }
  }
};
</script>

<style>
</style>
