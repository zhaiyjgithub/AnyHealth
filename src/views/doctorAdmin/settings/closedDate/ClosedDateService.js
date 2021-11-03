import moment from "moment";
import {TimeFormat} from "../../../../utils/constant/Enum";
import {Request} from "../../../../utils/httpTool/HttpTool";
import {ApiSchedule} from "../../../../utils/httpTool/Api";
import {convertDateToHHmm, convertHHmmStringToHHmm, DisableDate} from "../../../../utils/util/dateParse";
import {supportedConfigFiles} from "tailwindcss/lib/constants";

export const getClosedDateSettings = (npi, success, fail) => {
    const param = {
        Npi: npi
    }

    Request(ApiSchedule.GetClosedDateSettings, param, (data) => {
        // amEndDateTime: "2021-10-28T11:00:00Z"
        // amStartDateTime: "2021-10-28T10:00:00Z"
        // endDate: "2021-10-29T00:00:00Z"
        // npi: 1902809254
        // pmEndDateTime: "2000-01-01T00:00:00Z"
        // pmStartDateTime: "2000-01-01T00:00:00Z"
        // sid: 5
        // startDate: "2021-10-28T00:00:00Z"
        const list = data.map(({startDate, endDate,
                                   amStartDateTime, amEndDateTime,
                                   pmStartDateTime, pmEndDateTime,
                                   npi, sid,
                               }) => {
            return {
                startDate: moment(new Date(startDate)).format(TimeFormat.YYYYMMDD),
                endDate: moment(new Date(endDate)).format(TimeFormat.YYYYMMDD),
                amStartTime: amStartDateTime !== DisableDate ? convertDateToHHmm(new Date(amStartDateTime)) : '',
                amEndTime: amEndDateTime !== DisableDate ? convertDateToHHmm(new Date(amEndDateTime)) : '',
                pmStartTime: pmStartDateTime !== DisableDate ? convertDateToHHmm(new Date(pmStartDateTime)) : '',
                pmEndTime: pmEndDateTime !== DisableDate ? convertDateToHHmm(new Date(pmEndDateTime)) : '',
                npi: npi,
                sid: sid
            }
        })
        success && success(list)
    } , () => {
        fail && fail()
    })
}

export const addClosedDateSettings = (npi, settings, success, fail) => {
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
    debugger

    Request(ApiSchedule.AddClosedDateSettings, param, (data) => {
        success && success(data)
    }, (error) => {
        fail && fail(error)
    })
}

const convertDateToUTCDate = (date, hhmm, offsetHour) => {
    const m = moment(date)
    const {hour, min}= convertHHmmStringToHHmm(hhmm)
    const fd = new Date(m.year(), m.month(), m.day(), hour + offsetHour, min, 0, 0)
    return fd.toISOString()
}

export const deleteClosedDateSettingsByID = (npi, sid, success, fail) => {
    const param = {
        Npi: npi,
        Sid: sid
    }
    Request(ApiSchedule.DeleteClosedDateSettings, param, () => {
        success && success()
    }, (error) => {
        fail && fail(error)
    })
}