import {ApiDoctor} from "./Api";

const ResponseCode = {
    OK: 0,
    Fail: 1,
}

const parseJSON = (response: any) => {
    if (response.status === 204 || response.status === 401) {
        return { status: response.status };
    }
    return response.json();
}

const checkStatus = (response: any) => {
    if (response.ok) {
        return response;
    }
    if(response.status === 401){
        //LoginTools.logOut();
    }

    const error = new Error(response.statusText);
    error.message = response;
    throw error;
}

const request = (url: string, options: any) => {
    const BaseUrl = '/AnyHealth/'
    const requestUrl = `${BaseUrl}${url}`;
    console.log(requestUrl + '\n')
    console.log(options.body + '\n')

    const token = ''//(global.DoctorProfile.Token ? global.DoctorProfile.Token : '')
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

const post = (url: string, param={}) => request(url, {
    body: JSON.stringify(param),
    method: 'POST',
})


type Success<T> = (data: T | undefined, msg: string | undefined) => void
type Fail = (errCode: number, msg: string | undefined) => void

export const sendRequest = <T extends {}>(api: string, param: object, success: Success<T>, fail?: Fail) => {
    post(api, param).then((response) => {
        if (response.code === ResponseCode.OK) {
            success && success(response.data, response.msg)
        }else {
            console.log('request fail: ', response.code, response.msg)
            fail && fail(response.code, response.msg)
        }
    }).catch((error) => {
        fail && fail(ResponseCode.Fail, error.toString())
    })
}