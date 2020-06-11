const ENDPOINT = 'https://stg-weight-control.qtclinics.com/api';
// const ENDPOINT = 'https://weight-control.qtclinics.com/api'
// const ENDPOINT = 'http://localhost:9900/api';
const OSS = 'https://qtclinics-resource.oss-cn-shenzhen.aliyuncs.com/';

const header = {
	'Timezone-Offset': (new Date()).getTimezoneOffset(),
};

function setRequestHeader(key, value) {
	header[key] = value;
}

function request(params, retryOption = {
	resolve: null,
	reject: null,
	count: 5,
}) {
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
						msg,
					}
				} = response;

				if (code === 1) {
					retryOption.resolve
							? retryOption.resolve(response.data)
							: resolve(response.data);
					return
				}

				const err = new Error(`调用失败, 技术参数${msg}`);
				err.code = -1;
				reject(err);
			},
			fail: (err) => {
				console.log('__request请求失败')
				const error = new Error(`接口[${method}]调用失败, ${err.errMsg}`);
				error.code = -1;

				retryOption.resolve = retryOption.resolve || resolve;
				retryOption.reject = retryOption.reject || reject;

				// 重新发起请求
				if (retryOption.count > 0) {
					console.log('正在尝试重新请求', retryOption.count);
					retryOption.count -= 1;
					request(params, retryOption);
					return;
				}

				retryOption.reject
						? retryOption.reject(err)
						: reject(err);
			},
		})
	})
}

export default request;
export {
	setRequestHeader,
	OSS,
}
