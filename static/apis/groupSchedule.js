import request from '@/static/js/base';

// 用户获取打卡里程
function userFetchSignCondition() {
  return request({
    data: {
      method: "groupSchedule.getSignCondition",
    }
  })
}

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
  userFetchSignCondition,
  userFetchTasks,
  userCheckInTask,
}
