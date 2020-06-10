import request from '@/static/js/base';

// 用户获取打卡任务
function userFetchTasks() {
  return request({
    data: {
      method: "system.getTasks",
    }
  })
}

// 用户饮食打卡
function userCheckinDiet(data) {
  return request({
    data: {
      method: "system.checkin",
      data,
    }
  })
}

// 用户运动打卡
function userCheckinSport(data) {
  return request({
    data: {
      method: "system.checkin",
      data,
    }
  })
}

export {
  userFetchTasks,
  userCheckinDiet,
  userCheckinSport,
}
