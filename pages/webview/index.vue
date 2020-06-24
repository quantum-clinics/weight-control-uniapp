<style scoped>
  .webview {
    width: 100vw;
    height: auto;
  }
</style>

<template>
  <web-view
    class="webview"
    v-if="url"
    :src="url"
    :webview-styles="webviewStyles"
  />
</template>

<script>
  export default {
    data() {
      return {
        webviewStyles: {
          progress: {
            color: '#FF3333'
          },
          width: '100vw',
        },
        url: '',
      }
    },
    onLoad(options) {
      this.url = options.url;
    },
  }
</script>