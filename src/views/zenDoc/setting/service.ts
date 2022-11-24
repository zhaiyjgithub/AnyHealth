import {UserProfile} from "./types";
import {sendRequest} from "../../../utils/http/http";
import {ApiUser} from "../../../utils/http/api";

export default function updateProfile(userProfile: UserProfile, success: () => void, fail: () => void) {
    sendRequest(ApiUser.UpdateUserProfile, userProfile, () => {
        success()
    }, () => {
        fail()
    })
}
