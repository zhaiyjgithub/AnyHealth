import {sendRequest} from "../../../../utils/http/http";
import {Gender} from "../../../../utils/enum/enum";
import {ApiDoctor} from "../../../../utils/http/api";

export interface DoctorProfile {
    npi: number,
    firstName: string,
    midName: string,
    lastName: string,
    fullName: string,
    gender: Gender,
    address: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    phone: string,
    email: string,
    specialty: string,
    subSpecialty: string,
    jobTitle: string,
    credential: string,
    summary: string,
    language: string,
    yearOfExperience: string
}

export const getDoctorProfile = (npi: number, success: (doctorProfile: DoctorProfile) => void) => {
    const param = {
        Npi: npi,
    }
    sendRequest(ApiDoctor.GetDoctor, param, (data) => {
        success(data)
    })
}

export const checkSaveProfile = (profile: DoctorProfile) => {
    return (!profile.firstName.length ||
            !profile.lastName.length ||
            !profile.credential.length ||
            !profile.phone.length ||
            !profile.address.length ||
            !profile.city.length ||
            !profile.zip.length ||
            !profile.summary.length
    )
}

export const saveDoctorProfile = (profile: DoctorProfile, success: () => void) => {
    if (!checkSaveProfile(profile)) {
        return false
    }
    const param = {
        Doctor: profile,
    }
    sendRequest(ApiDoctor.SaveDoctor, param, () => {
        success()
    })
}