<style scoped>
  .radian__box {
    width: 100vw;
    min-height: 100vh;
    background: rgba(245, 245, 245, 1);
    overflow-x: hidden;
  }

  .radian {
    width: 200vw;
    height: 56vh;
    background: #188cfc;
    border-radius: 0 0 180px 180px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .content {
    z-index: 1;
  }
</style>

<template>
  <div class="radian__box relative" :style="style">
    <div class="radian absolute"></div>
    <div class="content relative">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      style: {
        type: Object,
      }
    }
  }
</script>
