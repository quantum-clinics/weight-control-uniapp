const app = getApp();

const callAPI = (method, params, callBack, retryOption) => {
  return new Promise((resolve, reject) => {
    const header = {};
    const {
      authorization,
      platform,
    } = app.globalData;
    const server = app.server;

    if (authorization) {
      header['Authorization'] = `Bearer ${authorization}`;
    }

    if (platform) {
      header['QTC-Platform'] = platform;
    }

    if (server) {
      header['X-Server-Select'] = server;
    }

    header['Timezone-Offset'] = (new Date()).getTimezoneOffset();

    uni.request({
      url: app.globalData.API_GATEWAY,
      method: "POST",
      data: {
        method,
        data: params,
      },
      header: {
        'Content-Type': 'application/json;charset=utf-8',
        ...header,
      },
      success: (res) => {
        let {
          code,
          data,
          msg
        } = res.data;
        if (code === 1) {
          data = data || {};
          if (callBack) callBack(null, data, {
            trophy: data.trophy,
            task: data.task,
          });
          resolve(data);
        } else {
          const err = new Error(`${msg}`);
          err.code = code;
          if (callBack) callBack(err);
          reject(err);
        }
      },
      fail: (res) => {
        const err = new Error(`接口[${method}]调用失败, ${res.errMsg}`);
        err.code = -1;
        console.error(err.message);

        if (callBack) callBack(err);
        reject(err);
      }
    });
  });
}

function formatTime(targetTime) {
  const date = new Date(targetTime);
  const YY = date.getFullYear();
  const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  return `${YY}年${MM}月${DD}日`
}

export {
  callAPI,
  formatTime,
}
