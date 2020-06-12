import request from '@/static/js/base';

// 用户获取打卡任务
function userFetchTasks() {
  return request({
    data: {
      method: "system.getTasks",
    }
  })
}

// 用户打卡
function userCheckIn(data) {
  return request({
    data: {
      method: "system.checkin",
      data,
    }
  })
}

// 获取展示文本
function userFetchLabels(data) {
  return request({
    data: {
      method: "system.getAppLabels",
      data,
    }
  })
}


export {
  userFetchTasks,
  userCheckIn,
  userFetchLabels,
}
