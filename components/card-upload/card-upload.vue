<style scoped>
  .upload__box {
    flex-wrap: wrap;
  }

  .upload__cell,
  .upload__button,
  .upload__image {
    width: 192rpx;
    height: 192rpx;
  }

  .upload__cell {
    margin: 0 24rpx 24rpx 0;
  }

  .upload__delete {
    width: 40rpx;
    height: 40rpx;
    right: -15rpx;
    top: -15rpx;
  }
</style>

<template>
  <div class="upload__box flex">
    <div
      class="upload__cell relative flex flex-jc-center flex-ai-center"
      v-for="(item, index) in images"
      :key="index"
    >
      <img
        class="upload__image"
        mode="aspectFill"
        :src="item"
      />

      <img
        v-if="!recordFinish"
        :src="`${OSS}/micha/icon/icon-image-delete.png`"
        class="upload__delete absolute"
        @click="handleDeleteImage(index)"
      />
    </div>

    <img
      :src="`${OSS}/micha/icon/icon-image-upload.png`"
      class="upload__button"
      v-if="!recordFinish && images.length < canUpLoadMaxImageCount"
      @click="handleUserChooseImage"
      alt
    />
  </div>
</template>

<script>
  const app = getApp();

  export default {
    props: {
      images: Array,
      source: Object,
      recordFinish: {
        type: Boolean,
        value: false,
      },
    },
    data() {
      return {
        OSS: app.globalData.OSS,
      }
    },
    computed: {
      canUpLoadMaxImageCount() {
        if (this.source.options && this.source.options.length) {
          return this.source.options[0].maxPhotosLength
        }

        return 4;
      }
    },
    methods: {
      handleDeleteImage(index) {
        this.$emit("someImageDelete", {
          questionId: this.source.id,
          index,
        });
      },
      handleUserChooseImage() {
        uni.chooseImage({
          count: this.canUpLoadMaxImageCount - this.images.length,
          success: (chooseImageRes) => {
            this.$emit("valueChange", {
              questionId: this.source.id,
              answer: {
                text: '',
                photos: [...chooseImageRes.tempFilePaths],
              },
            })
          }
        });
      },
    },
  };
</script>
