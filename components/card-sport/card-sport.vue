<style scoped>
.title {
  font-size: 34rpx;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  line-height: 48rpx;
  padding: 20rpx;
}

.box__class {
  margin-bottom: 50rpx;
}

.class__item {
  width: 148rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 24rpx;
  margin-right: 24rpx;
  margin-bottom: 24px;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 12px 0px rgba(226, 229, 248, 0.65);
  color: rgba(110, 117, 134, 1);
}

.class__item--active {
  background: linear-gradient(
    180deg,
    rgba(115, 53, 255, 1) 0%,
    rgba(13, 42, 188, 1) 100%
  );
  box-shadow: 0px 4px 12px 0px rgba(226, 229, 248, 0.65);
  color: rgba(255, 255, 255, 1);
}

.box__class .class__item:nth-child(4n) {
  margin-right: 0;
}

.intensity__item {
  width: 160rpx;
  height: 160rpx;
  line-height: 160rpx;
  border-radius: 50%;
  margin-right: 24rpx;
  margin-bottom: 24rpx;
  text-align: center;
  font-weight: 600;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 12px 0px rgba(226, 229, 248, 0.65);
  color: rgba(110, 117, 134, 1);
}

.intensity__item--active {
  background: linear-gradient(
    180deg,
    rgba(115, 53, 255, 1) 0%,
    rgba(13, 42, 188, 1) 100%
  );
  box-shadow: 0px 4px 12px 0px rgba(226, 229, 248, 0.65);
  color: rgba(255, 255, 255, 1);
}
</style>

<template>
  <div>
    <div class="title">分类</div>
    <div class="box__class flex flex-wrap">
      <div
        class="class__item"
        v-for="(item, index) in sportClass"
        :class="{'class__item--active': sportIndex === index}"
        :key="index"
        @click="handleUserSelectSport(index)"
      >{{item}}</div>
    </div>
    <div class="title">强度</div>
    <div class="box__intensity flex flex-ai-center">
      <div class="intensity__item flex flex-column flex-ai-center">
        <span>30</span>
        <span>分钟</span>
      </div>
      <div class="intensity__item flex flex-column flex-ai-center">
        <span>60</span>
        <span>分钟</span>
      </div>
      <div class="intensity__item flex flex-column flex-ai-center">
        <span>60</span>
        <span>分钟以上</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sportIndex: {
      type: Number
    }
  },
  data() {
    return {
      sportClass: [
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
      ]
    };
  },
  methods: {
    handleUserSelectSport(index) {
      this.$emit("userSelectSport", index);
    }
  }
};
</script>