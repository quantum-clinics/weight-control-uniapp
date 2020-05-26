import request from '@/static/js/base';

// 用户获取验证码
function userFetchCheckCode(openid, phone) {
  return request({
    data: {
      method: "user.sendCheckCode",
      data: {
        openid,
        phone,
      },
    }
  })
}

// 用户绑定账号
function userBindAccount(openid, phone, code) {
  return request({
    data: {
      method: "user.bindAccount",
      data: {
        openid,
        phone,
        code,
      },
    }
  })
}

export {
  userFetchCheckCode,
  userBindAccount,
}
