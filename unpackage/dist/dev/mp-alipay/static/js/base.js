const ENDPOINT = 'https://stg-weight-control.qtclinics.com/api';
// const ENDPOINT = 'https://weight-control.qtclinics.com/api'
// const ENDPOINT = 'http://localhost:9900/api';
const header = {
	'Timezone-Offset': (new Date()).getTimezoneOffset(),
};

function setRequestHeader(key, value) {
	header[key] = value;
}

function request(params) {
	const {
		data: _data,
		method = 'POST',
	} = params;

	return new Promise((resolve, reject) => {
		uni.request({
			url: ENDPOINT,
			data: _data,
			header: {
				'Content-Type': 'application/json;charset=utf-8',
				...header,
			},
			method,
			success: (response) => {
				const {
					data: {
						code,
					}
				} = response;

				if (code === 1) {
					resolve(response.data);
					return
				}

				if (code === 100) {
					// 重新授权之后再发起当前请求
					// 用户授权过期，重新授权流程(uni.login + user.login + request(params, resolve, reject))
					return;
				}

				// TODO catch some Error
			},
			fail: (err) => {
				const error = new Error(`接口[${method}]调用失败, ${err.errMsg}`);
				error.code = -1;
				console.error(err.message);
				reject(error);
			},
		})
	})
}

export default request;
export {
	setRequestHeader,
}
