import {Insurance, UserProfile} from "./types";
import {sendRequest} from "../../../utils/http/http";
import {ApiUser} from "../../../utils/http/api";

export function updateProfile(userProfile: UserProfile, success: () => void, fail: () => void) {
    sendRequest(ApiUser.UpdateUserProfile, userProfile, () => {
        success()
    }, () => {
        fail()
    })
}

export function getUserInsurance(userID: number, success: (data: any) => void, fail: () => void) {
    const param = {
        UserID: userID,
    }
    sendRequest(ApiUser.GetUserInsurance, param, (data) => {
        success(data)
    }, () => {
        fail()
    })
}

interface UserInsurance {
    ID: number
    userID: number
    planID: string
    memberID: string
    photo: string
}

export function updateUserInsurance(userID: number, list: Array<Insurance>, success: (data: any) => void, fail: () => void) {
    const insurances: Array<UserInsurance> = []
    list.forEach((info) => {
        insurances.push(
            {ID: info.ID, memberID: info.memberID, photo: "", planID: info.planID, userID: userID}
        )
    })
    const param = {
        UserID: userID,
        insurances: insurances,
    }
    sendRequest(ApiUser.UpdateUserInsurance, param, (data) => {
        success(data)
    }, () => {
        fail()
    })
}
