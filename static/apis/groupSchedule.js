import request from '@/static/js/base';

// 用户获取task
function userFetchTasks() {
  return request({
    data: {
      method: "groupSchedule.getTasks",
    }
  })
}

export {
  userFetchTasks,
}
