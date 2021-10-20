import moment from "moment";
import {TimeFormat} from "../../../utils/constant/Enum";
import {Request} from "../../../utils/httpTool/HttpTool";
import {ApiSchedule} from "../../../utils/httpTool/Api";

export const DateTimePoint = {
    StartTime: 0,
    EndTime: 1
}

export const calcDropdownListDataSource = (startTime, endTime, duration) => {
    const regx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!regx.test(startTime) || !regx.test(endTime)) {
        console.error("start time or end time format error", startTime, endTime)
        return
    }
    const startMinutes = parseInt(startTime.slice(0, 2))*60 + parseInt(startTime.slice(3, 4))
    const endMinutes = parseInt(endTime.slice(0, 2))*60 + parseInt(endTime.slice(3, 4))
    const list = []
    for (let i = startMinutes; i <= endMinutes; i += duration) {
        const dateTime = convertMinutesToDateTimeString(i)
        list.push({title: dateTime, value: dateTime})
    }
    return list
}

export const convertMinutesToDateTimeString = (minutes) => {
    const hour = parseInt((minutes/60) + '')
    const min = parseInt((minutes%60) + '')
    return (hour < 10 ? '0' + hour : hour) + ':' +  (min < 10 ? '0' + min : min)
}

export const getNextEndTimeRange = (startTime, dateTimeDataSource) => {
    const prefix = '2000-01-01 '
    const startTimeMoment = moment(prefix + startTime, TimeFormat.YYYYMMDDHHmm)
    return dateTimeDataSource.filter(({title}) => {
        const endTimeMoment = moment(prefix + title, TimeFormat.YYYYMMDDHHmm)
        return endTimeMoment.isAfter(startTimeMoment)
    })
}

export const getScheduleSettings = (npi, success, fail) => {
    const param = {Npi: npi}
    Request(ApiSchedule.GetScheduleSettings, param, (data) => {
        success && success(data)
    }, () => {
        fail && fail()
    })
}

export const updateScheduleSettings = (param, success, fail) => {
    Request(ApiSchedule.SetScheduleSettings, param, (data) => {
        success && success()
    }, () => {
        fail && fail()
    })
}

export const InitialSettings = {
    "npi": 0,
    "durationPerSlot": 15,
    "numberPerSlot": 1,
    "mondayAmIsEnable": true,
    "mondayAmStartTime": "08:00",
    "mondayAmEndTime": "12:00",
    "mondayAmAppointmentType": 1,
    "mondayPmIsEnable": true,
    "mondayPmStartTime": "01:00",
    "mondayPmEndTime": "05:00",
    "mondayPmAppointmentType": 1,
    "tuesdayAmIsEnable": true,
    "tuesdayAmStartTime": "08:00",
    "tuesdayAmEndTime": "12:00",
    "tuesdayAmAppointmentType": 1,
    "tuesdayPmIsEnable": true,
    "tuesdayPmStartTime": "01:00",
    "tuesdayPmEndTime": "05:00",
    "tuesdayPmAppointmentType": 1,
    "wednesdayAmIsEnable": true,
    "wednesdayAmStartTime": "08:00",
    "wednesdayAmEndTime": "12:00",
    "wednesdayAmAppointmentType": 1,
    "wednesdayPmIsEnable": true,
    "wednesdayPmStartTime": "01:00",
    "wednesdayPmEndTime": "05:00",
    "wednesdayPmAppointmentType": 1,
    "thursdayAmIsEnable": true,
    "thursdayAmStartTime": "08:00",
    "thursdayAmEndTime": "12:00",
    "thursdayAmAppointmentType": 1,
    "thursdayPmIsEnable": true,
    "thursdayPmStartTime": "01:00",
    "thursdayPmEndTime": "05:00",
    "thursdayPmAppointmentType": 1,
    "fridayAmIsEnable": true,
    "fridayAmStartTime": "08:00",
    "fridayAmEndTime": "12:00",
    "fridayAmAppointmentType": 1,
    "fridayPmIsEnable": true,
    "fridayPmStartTime": "01:00",
    "fridayPmEndTime": "05:00",
    "fridayPmAppointmentType": 1,
    "saturdayAmIsEnable": true,
    "saturdayAmStartTime": "08:00",
    "saturdayAmEndTime": "12:00",
    "saturdayAmAppointmentType": 1,
    "saturdayPmIsEnable": true,
    "saturdayPmStartTime": "01:00",
    "saturdayPmEndTime": "05:00",
    "saturdayPmAppointmentType": 1,
    "sundayAmIsEnable": true,
    "sundayAmStartTime": "08:00",
    "sundayAmEndTime": "12:00",
    "sundayAmAppointmentType": 1,
    "sundayPmIsEnable": true,
    "sundayPmStartTime": "01:00",
    "sundayPmEndTime": "05:00",
    "sundayPmAppointmentType": 1,
}