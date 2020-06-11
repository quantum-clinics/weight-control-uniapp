import request from '@/static/js/base';

// 用户获取task
function userFetchTasks() {
  return request({
    data: {
      method: "groupSchedule.getTasks",
    }
  })
}

// 用户打卡
function userCheckInTask(data) {
  return request({
    data: {
      method: "groupSchedule.checkin",
      data,
    }
  })
}

export {
  userFetchTasks,
  userCheckInTask,
}
