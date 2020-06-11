<template>
  <base-page
    :errorMessage="errorMessage"
  >
    hello, Test
  </base-page>
</template>
<script>
  import inject from '@/static/js/inject';
  const app = getApp();
  import {
    userCheckInTask,
  } from '@/static/apis/groupSchedule';
  export default inject({
    data() {
      return {
        name: 'test',
      }
    },
    async onLoad() {
      await app.$vm.init();
      await this.callAPI(userCheckInTask({ data: {}}));
    },
  })
</script>