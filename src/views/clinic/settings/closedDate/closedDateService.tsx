import moment from "moment";
import {TimeFormat} from "../../../../utils/enum/enum";
import {ApiSchedule} from "../../../../utils/http/api";
import {
    convertDateToHHmm,
    convertHHmmStringToHHmm,
    DisabledDate,
} from "../../../../utils/util/dateTool";
import {sendRequest} from "../../../../utils/http/http";

export interface ClosedDate {
    startDate: string,
    endDate: string,
    amStartTime: string,
    amEndTime: string,
    pmStartTime: string,
    pmEndTime: string,
    npi: number,
    sid: number,
}

export const getClosedDateSettings = (npi: number, success: (list: Array<ClosedDate>) => void, fail: () => void) => {
    const param = {
        Npi: npi,
    }
    sendRequest(ApiSchedule.GetClosedDateSettings, param, (data) => {
        // amEndDateTime: "2021-10-28T11:00:00Z"
        // amStartDateTime: "2021-10-28T10:00:00Z"
        // endDate: "2021-10-29T00:00:00Z"
        // npi: 1902809254
        // pmEndDateTime: "2000-01-01T00:00:00Z"
        // pmStartDateTime: "2000-01-01T00:00:00Z"
        // sid: 5
        // startDate: "2021-10-28T00:00:00Z"
        const list: Array<ClosedDate> = data.map(({startDate, endDate,
            amStartDateTime, amEndDateTime,
            pmStartDateTime, pmEndDateTime,
            npi, sid,
        }: any) => {
            return {
                startDate: moment(new Date(startDate)).format(TimeFormat.YYYYMMDD),
                endDate: moment(new Date(endDate)).format(TimeFormat.YYYYMMDD),
                amStartTime: amStartDateTime !== DisabledDate ? convertDateToHHmm(new Date(amStartDateTime)) : "",
                amEndTime: amEndDateTime !== DisabledDate ? convertDateToHHmm(new Date(amEndDateTime)) : "",
                pmStartTime: pmStartDateTime !== DisabledDate ? convertDateToHHmm(new Date(pmStartDateTime)) : "",
                pmEndTime: pmEndDateTime !== DisabledDate ? convertDateToHHmm(new Date(pmEndDateTime)) : "",
                npi: npi,
                sid: sid,
            }
        })
        success && success(list)
    }, () => {
        fail && fail()
    })
}

export const addClosedDateSettings = (npi: number, settings: ClosedDate, success: (data: any) => void, fail: () => void) => {
    const {startDate, endDate} = settings
    const hhmm = moment().format(TimeFormat.HHmm)
    const startDateUTC = moment(`${startDate} ${hhmm}`, TimeFormat.YYYYMMDDHHmm).utc()
        .toISOString()
    const endDateUTC = moment(`${endDate} ${hhmm}`, TimeFormat.YYYYMMDDHHmm).utc()
        .toISOString()

    const param = {
        npi: npi,
        startDate: startDateUTC,
        endDate: endDateUTC,
        amStartDateTime: convertDateToUTCDateWithOffset(startDate, settings.amStartTime, 0),
        amEndDateTime: convertDateToUTCDateWithOffset(startDate, settings.amEndTime, 0),
        pmStartDateTime: convertDateToUTCDateWithOffset(startDate, settings.pmStartTime, 12),
        pmEndDateTime: convertDateToUTCDateWithOffset(startDate, settings.pmEndTime, 12),
    }

    sendRequest(ApiSchedule.AddClosedDateSettings, param, (data) => {
        success && success(data)
    }, () => {
        fail && fail()
    })
}

const convertDateToUTCDateWithOffset = (date: string, hhmm: string, offsetHour: number) => {
    const {hour, min} = convertHHmmStringToHHmm(hhmm)
    const fhour = (hour + offsetHour) < 10 ? ("0" + hour + offsetHour) : (hour + offsetHour)
    const fMin = min < 10 ? ("0" + min) : min
    const fHHmm = `${fhour}:${fMin}`
    return moment(`${date} ${fHHmm}`, TimeFormat.YYYYMMDDHHmm).utc()
        .toISOString()
}

export const deleteClosedDateSettingsByID = (npi: number, sid: number, success: () => void, fail: () => void) => {
    const param = {
        Npi: npi,
        Sid: sid,
    }
    sendRequest(ApiSchedule.DeleteClosedDateSettings, param, () => {
        success && success()
    }, () => {
        fail && fail()
    })
}