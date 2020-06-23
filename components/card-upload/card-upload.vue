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
    margin-right: 32rpx;
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
        :src="`${OSS}/micha/icon/icon-image-delete.png`"
        class="upload__delete absolute"
        @click="handleDeleteImage(index)"
      />
    </div>

    <img
      :src="`${OSS}/micha/icon/icon-image-upload.png`"
      class="upload__button"
      v-if="!recordFinish"
      @click="handleUserChooseImage"
      alt
    />
  </div>
</template>

<script>
  const app = getApp();

  export default {
    props: {
      source: {
        type: Object,
      },
      recordFinish: {
        type: Boolean,
        value: false,
      },
    },
    data() {
      return {
        images: [],
        OSS: app.globalData.OSS,
      }
    },
    mounted() {
      this.images = this.source.photos ? [...this.source.photos] : [];
    },
    methods: {
      handleDeleteImage(index) {
        this.images.splice(index, 1);
        this.$emit("valueChange", {
          questionId: this.source.id,
          answer: {
            text: '',
            photos: [...this.images],
          },
        })
      },
      handleUserChooseImage() {
        const count = this.source.options ? (this.source.options.length ? this.source.options[0].maxPhotosLength : 4) : 4
        uni.chooseImage({
          count: count - this.images.length,
          success: (chooseImageRes) => {
            this.images.push(...chooseImageRes.tempFilePaths)
            this.$emit("valueChange", {
              questionId: this.source.id,
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
