<style scoped>
.icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 16rpx;
}

.title {
  font-size: 40rpx;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  line-height: 56px;
}

.tip {
  font-size: 28rpx;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.45);
  line-height: 40rpx;
}
</style>

<template>
  <div>
    <div class="flex flex-ai-center">
      <img class="icon" :src="icon || config.icon" alt />
      <span class="title">{{title || config.title}}</span>
    </div>
    <div class="tip" v-if="tip || config.tip">{{tip || config.tip}}</div>
  </div>
</template>

<script>
const ENDPOINT =
  "https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/sleep/icons";
const config = {
  upload: {
    icon: `${ENDPOINT}/upload-title-icon.png`,
    title: "上传摄入的食物",
    tip: "食物的营养配比，影响着睡眠质量和健康指数"
  },
  score: {
    icon: `${ENDPOINT}/score-title-icon.png`,
    title: "给这一餐打个分",
    tip: "自评一下，一星待改善，五星更健康"
  },
  share: {
    icon: `${ENDPOINT}/share-title-icon.png`,
    title: "分享这一刻的心情"
  },
  sport: {
    icon: `${ENDPOINT}/exercise-title-icon.png`,
    title: "选择运动分类和强度"
  }
};
export default {
  props: {
    type: {
      type: String,
      value: "upload"
    },
    icon: {
      type: String
    },
    title: {
      type: String
    },
    tip: {
      type: String
    }
  },
  data() {
    return {
      config: config[this.type]
    };
  }
};
</script>