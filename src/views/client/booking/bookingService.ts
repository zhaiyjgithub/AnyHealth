import {SubUser} from "./components/types";
import {ResponseCode, sendRequest} from "../../../utils/http/http";
import {ApiUser} from "../../../utils/http/api";

export function createSubUser(subUser:SubUser, completeHandler: (isSuccess: boolean) => void) {
    const param = {
        FirstName: subUser.firstName,
        LastName: subUser.lastName,
        Phone: subUser.phone,
        Email: subUser.email,
        Birthday: `${subUser.birthdayYear}-${subUser.birthdayMonth}-${subUser.birthdayDay}`,
        IsLegal: subUser.isLegal,
        Gender: subUser.gender,
    }
    sendRequest(ApiUser.CreateSubUser, param, (response) => {
        if (response.code === ResponseCode.OK) {
            completeHandler(true)
        } else {
            completeHandler(false)
        }
    }, () => {
        completeHandler(false)
    })
}

export function getSubUsers(userID: number, completeHandler: (list: Array<SubUser>) => void) {
    const param = {
        UserID: userID,
    }
    sendRequest(ApiUser.GetSubUsers, param, (response) => {
        if (response.code === ResponseCode.OK) {
            completeHandler(response.data)
        } else {
            completeHandler([])
        }
    }, () => {
        completeHandler([])
    })
}

export function updateSubUserPhone(subUserID: number, phone: string, completeHandler: (isSuccess: boolean) => void) {
    const param = {
        UserID: subUserID,
        Phone: phone,
    }
    sendRequest(ApiUser.UpdateSubUserPhone, param, (response) => {
        completeHandler(response && response.code === ResponseCode.OK)
    }, () => {
        completeHandler(false)
    })
}
