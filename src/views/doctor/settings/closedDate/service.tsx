import moment from "moment";
import {TimeFormat} from "../../../../utils/enum/enum";
import {ApiSchedule} from "../../../../utils/http/api";
import {convertDateToHHmm, convertHHmmStringToHHmm, DisabledDate} from "../../../../utils/util/dateTool";
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
    const sm = moment(settings.startDate, TimeFormat.YYYYMMDD)
    const startDate = new Date(sm.year(), sm.month(), sm.day(), 0, 0, 0, 0)
    const em = moment(settings.startDate, TimeFormat.YYYYMMDD)
    const endDate = new Date(em.year(), em.month(), em.day(), 0, 0, 0, 0)
    const param = {
        npi: npi,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        amStartDateTime: convertDateToUTCDate(startDate, settings.amStartTime, 0),
        amEndDateTime: convertDateToUTCDate(startDate, settings.amEndTime, 0),
        pmStartDateTime: convertDateToUTCDate(startDate, settings.pmStartTime, 12),
        pmEndDateTime: convertDateToUTCDate(startDate, settings.pmEndTime, 12),
    }

    sendRequest(ApiSchedule.AddClosedDateSettings, param, (data) => {
        success && success(data)
    }, () => {
        fail && fail()
    })
}

const convertDateToUTCDate = (date: Date, hhmm: string, offsetHour: number) => {
    const m = moment(date)
    const {hour, min} = convertHHmmStringToHHmm(hhmm)
    const fd = new Date(m.year(), m.month(), m.day(), hour + offsetHour, min, 0, 0)
    return fd.toISOString()
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