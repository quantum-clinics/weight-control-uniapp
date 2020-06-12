<template>
  <button
      type="default"
      open-type="getPhoneNumber"
      @getphonenumber="decryptPhoneNumber">获取手机号</button>
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
    methods: {
      decryptPhoneNumber(e) {
        console.log('e ===>', JSON.stringify(e));
      },
    },
  })
</script>