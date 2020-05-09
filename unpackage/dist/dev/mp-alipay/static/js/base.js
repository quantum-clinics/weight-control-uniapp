// const ENDPOINT = 'https://stg-weight-control.qtclinics.com/api';
const ENDPOINT = 'http://localhost:9900/api';

function request(params) {
	const {
		data: {
			method: selfMethod,
			data,
		},
		header,
		method,
		dataType,
	} = params;
	
	return new Promise((resolve, reject) => {
		uni.request({
			url: ENDPOINT,
			data: {
				method: selfMethod,
				data,
			},
			header,
			method: 'POST',
			dataType,
			success: (response) => {
				resolve(response);
			},
			fail: (err) => {
				reject(err);
			},
		})
	})
}

export default request;
