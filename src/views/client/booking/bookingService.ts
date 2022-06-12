import {SubUser} from "./components/types";
import {sendRequest} from "../../../utils/http/http";
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
        UserID: subUser.userID,
    }
    sendRequest(ApiUser.CreateSubUser, param, () => {
        completeHandler(true)
    }, () => {
        completeHandler(false)
    })
}

export function getSubUsers(userID: number, completeHandler: (list: Array<SubUser>) => void) {
    const param = {
        UserID: userID,
    }
    sendRequest(ApiUser.GetSubUsers, param, (data) => {
        completeHandler(data)
    }, () => {
        completeHandler([])
    })
}

export function updateSubUserPhone(subUserID: number, phone: string, completeHandler: (isSuccess: boolean) => void) {
    const param = {
        UserID: subUserID,
        Phone: phone,
    }
    sendRequest(ApiUser.UpdateSubUserPhone, param, () => {
        completeHandler(true)
    }, () => {
        completeHandler(false)
    })
}
