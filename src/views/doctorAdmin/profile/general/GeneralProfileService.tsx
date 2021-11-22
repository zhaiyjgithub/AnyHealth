import React from "react";

type ApiConfig<Params = any, Data = any> = {} & {
    url: string
    method?: 'POST'
    params?: Params
    data?: Params
    _response?: Data
    [x: string]: any
}

type Service<Params = any, Data = any> = (headParams: Params, otherSet?: object) => ApiConfig<Params, Data>

const identity = < T extends {} >(arg: T): T => { return arg; }

const createGetApi = <T, U>(apiConfig: ApiConfig): Service<T, U> =>(headParams, otherSet) => {
    return {
        ...apiConfig,
        params: headParams,
        ...otherSet
    }
}

createGetApi<{}, {}>({url: '', method:'POST'})

// const createGetApi = <Params = any, Data = any>(
//     apiConfig: ApiConfig
// ): Service<Params, Data> => (headParams: Params, otherSet = {}) => {
//     return {
//         ...apiConfig,
//         params: headParams,
//         ...otherSet
//     }
// }

// // 用用看
// const getUser = createGetApi<
//     { id: number },
//     {userName: string, password: string}
//     >({
//     url: 'http',
//     method: 'get'
// })
