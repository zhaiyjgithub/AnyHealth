import React from "react";
import {ApiDoctor} from "../../../../utils/httpTool/Api";
import {sendRequest, Success} from "../../../../utils/httpTool/HTTP";
import {Gender} from "../../../../utils/constant/Enums";

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

export const getDoctorProfile = (npi: number, success: Success<DoctorProfile>) => {
    const param = {
        Npi: npi
    }
    sendRequest<DoctorProfile>(ApiDoctor.GetDoctor, param, (data) => {
        success(data, "")
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

export const saveDoctorProfile = (profile: DoctorProfile, success: Success<undefined>) => {
    if (!checkSaveProfile(profile)) {
        return false
    }
    const param = {
        Doctor: profile
    }
    sendRequest(ApiDoctor.SaveDoctor, param, () => {
        success(undefined, "")
    })
}