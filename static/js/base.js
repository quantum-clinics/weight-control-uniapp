const app = getApp();

const callAPI = (method, params, callBack, retryOption) => {
	return new Promise((resolve, reject) => {
		const header = {};
		const {
			authorization
		} = app.globalData;
		const server = app.server;

		if (authorization) {
			header['Authorization'] = `Bearer ${authorization}`;
		}

		if (server) {
			header['X-Server-Select'] = server;
		}

		header['Timezone-Offset'] = (new Date()).getTimezoneOffset();

		wx.request({
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
				/*
				if (retryOption) {
				  let retryCount = retryOption.retryCount || 0;
				  retryCount++;

				  console.warn(`等待${retryOption.waitTime}秒后再次尝试 (${retryCount}次)...`);
				  return setTimeout(() => {
					callAPI(method, params, (err, data) => {
					  if (err) {
						if (callBack) callBack(err);
						reject(err);
					  } else {
						if (callBack) callBack(null, data, data.trophy);
						resolve(data);
					  }
					}, { ...retryOption,
					  retryCount: retryCount
					});
				  }, retryOption.waitTime * 1000);
				}
				*/
				if (callBack) callBack(err);
				reject(err);
			}
		});
	});
}

module.exports = {
	callAPI
}