import React from "react";
import exp from "constants";
import {Request} from "../../../../utils/httpTool/HttpTool";
import {ApiDoctor} from "../../../../utils/httpTool/Api";
import {sendRequest} from "../../../../utils/httpTool/HTTP";


export interface DoctorProfile {
    npi: number,
    firstName: string,
    midName: string,
    lastName: string,
    fullName: string,
    gender: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    email: string,
    specialty: string,
    subSpecialty: string,
    jobTitle: string,
    summary: string,
    language: string,
    yearOfExperience: string
}

export const getDoctorProfile = (npi: number, success: (_data : DoctorProfile | undefined) => void) => {
    const param = {
        Npi: npi
    }
    sendRequest<DoctorProfile>(ApiDoctor.GetDoctor, param, (data) => {
        success(data)
    })
}