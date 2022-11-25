import {InsuranceInfo, UserProfile} from "./types";
import {sendRequest} from "../../../utils/http/http";
import {ApiUser} from "../../../utils/http/api";
import {User} from "../user/hooks/userProvider";

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
    UserID: number
    PlanID: string
    MemberID: string
    Photo: string
}

export function updateUserInsurance(userID: number, info: InsuranceInfo, success: (data: any) => void, fail: () => void) {
    const list: Array<UserInsurance> = []
    const medicalInsurance: UserInsurance = {ID: info.Medical.ID, MemberID: info.Medical.MemberID, Photo: "", PlanID: info.Medical.InsuranceID, UserID: userID}
    const dentalInsurance: UserInsurance = {ID: info.Dental.ID, MemberID: info.Dental.MemberID, Photo: "", PlanID: info.Dental.InsuranceID, UserID: userID}
    const visionInsurance: UserInsurance = {ID: info.Vision.ID, MemberID: info.Vision.MemberID, Photo: "", PlanID: info.Vision.InsuranceID, UserID: userID}
    list.push(medicalInsurance, dentalInsurance, visionInsurance)
    const param = {
        insurances: list,
    }
    sendRequest(ApiUser.GetUserInsurance, param, (data) => {
        success(data)
    }, () => {
        fail()
    })
}
