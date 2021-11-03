import {ApiDoctor} from "./Api";

const ResponseCode = {
	OK: 0,
	Fail: 1,
}

const parseJSON = (response) => {
	if (response.status === 204 || response.status === 401) {
		return { status: response.status };
	}
	return response.json();
}

const checkStatus = (response) => {
	if (response.ok) {
		return response;
	}
	if(response.status === 401){
		//LoginTools.logOut();
	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

const request = (url, options) => {
	const BaseUrl = '/AnyHealth/'
	const requestUrl = `${BaseUrl}${url}`;
	console.log(requestUrl + '\n')
	console.log(options.body + '\n')

	let token = ''//(global.UserInfo.Token ? global.UserInfo.Token : '')
	return fetch(requestUrl, Object.assign({}, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': "Bearer " + token,
		},
	}, options))
	.then(checkStatus)
	.then(parseJSON)
	.then(data => {
		return data;
	})
	.catch(err => {
		throw err
	});
}

export const HTTP = {
	post: (url, param={}) => request(url, {
		body: JSON.stringify(param),
		method: 'POST',
	}),

	get: (url, param={}) => {
		let requestUrl = url;

		if (Object.keys(param).length > 0) {
			let paramsString = Object.keys(param)
			.map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
			.join('&');
			requestUrl = requestUrl + '?' + paramsString
		}

		return request(requestUrl, {
			method: 'GET'
		})
	},

	put: (url, param={}) => request(url, {
		body: JSON.stringify(param),
		method: 'PUT',
	}),

	delete: (url, param={}) => request(url, {
		body: JSON.stringify(param),
		method: 'DELETE',
	}),
}

export const Request = (api, param, success, fail) => {
	HTTP.post(api, param).then((response) => {
		console.log((response))
		if (response.code === ResponseCode.OK) {
			success && success(response.data, response.msg)
		}else {
			console.log('request fail: ', response.code, response.msg)
		}
	}).catch((error) => {
		console.log('request error: ', error)
	})
}
