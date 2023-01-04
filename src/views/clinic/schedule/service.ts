import {sendRequest} from "../../../utils/http/http";
import {ApiSchedule} from "../../../utils/http/api";
import {Appointment} from "../../patient/appointment/types";

export function getAppointmentByDate (npi: number, startDate: string, endDate: string, success: (data: Array<Appointment>) => void, fail: () => void) {
    const param = {
        npi: npi,
        startDate: startDate,
        endDate: endDate,
    }
    sendRequest(ApiSchedule.GetAppointmentByDate, param, (data) => {
        success(data)
    }, () => {
        fail()
    })
}
