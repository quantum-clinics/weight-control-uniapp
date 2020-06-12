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
    <img
      class="upload__image"
      v-for="(item, index) in images"
      :key="index"
      :src="item"
      alt
    />

    <img
      src="https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/sleep/icons/upload-empty.png"
      class="upload__button"
      v-if="!recordFinish"
      @click="handleUserChooseImage"
      alt
    />
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
      },
      recordFinish: {
        type: Boolean,
        value: false,
      },
    },
    data() {
      return {
        images: [],
      }
    },
    methods: {
      handleUserChooseImage() {
        uni.chooseImage({
          count: 4 - this.images.length,
          success: (chooseImageRes) => {
            this.images.push(...chooseImageRes.tempFilePaths)
            this.$emit("valueChange", {
              questionId: this.id,
              answer: {
                text: '',
                photos: [...this.images],
              },
            })
          }
        });
      },
    },
  };
</script>
