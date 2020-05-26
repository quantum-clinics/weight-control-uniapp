import request from '@/static/js/base';

// 用户获取打卡任务
function userFetchTasks() {
  return request({
    data: {
      method: "system.getTasks",
    }
  })
}

export {
  userFetchTasks,
}
