<style scoped>
.upload__box {
  flex-wrap: wrap;
}

.upload__image,
.upload__button {
  width: 192rpx;
  height: 192rpx;
}
</style>

<template>
  <div class="upload__box flex">
    <img class="upload__image" v-for="(item, index) in images" :key="index" :src="item" alt />
    <img
      src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/sleep/icons/upload-empty.png"
      class="upload__button"
      @click="handleUserChooseImage"
      alt
    />
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array
    }
  },
  methods: {
    handleUserChooseImage() {
      uni.chooseImage({
        count: 4 - this.images.length,
        success: res => {
          console.log(res);
          this.$emit("imagesUpLoad", res);
        }
      });
    }
  }
};
</script>