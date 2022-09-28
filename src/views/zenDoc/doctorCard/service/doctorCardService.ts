import {Doctor} from "../../searchDoctor/model/doctor";
import {sendRequest} from "../../../../utils/http/http";
import {ApiDoctor} from "../../../../utils/http/api";

interface DoctorBackgroundInfo {
    name: string,
    desc: string
}

export interface DoctorDetailInfo extends Doctor {
    language: string,
    lat: number,
    lng: number,
    awards: Array<DoctorBackgroundInfo>,
    certifications: Array<DoctorBackgroundInfo>,
    educations: Array<DoctorBackgroundInfo>,
    insurances: string
}

export const getDoctorDetailInfoByNpi = (npi: number | string, success: (doctorInfo: DoctorDetailInfo) => void, fail: () => void) => {
    const param = {
        Npi: npi,
    }
    sendRequest(ApiDoctor.GetDoctorDetailInfo, param, (data) => {
        success && success(data)
    }, () => {
        fail && fail()
    })
}
