import {sendRequest} from "../../../../utils/http/http";
import {ApiUser} from "../../../../utils/http/api";
import {User} from "../hooks/userProvider";

export const createNewUser = (
    firstName: string,
    lastName: string,
    birthday: string,
    gender: string,
    email: string,
    password: string,
    success: (user: User) => void,
    fail: () => void,
) => {
    const param = {
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        gender: gender,
        email: email,
        password: password,
    }
    sendRequest(ApiUser.CreateUser, param, (data) => {
        success && success(data as User)
    }, () => {
        fail && fail()
    })
}

export const loginWithEmail = (email: string, password: string, success: (user: User) => void,
    fail: () => void,) => {
    const param = {
        email: email,
        password: password,
    }
    sendRequest(ApiUser.Login, param, (data) => {
        success && success(data)
    }, () => {
        fail && fail()
    })
}