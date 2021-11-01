import moment from "moment";
import {TimeFormat} from "../../../../utils/constant/Enum";
import {Request} from "../../../../utils/httpTool/HttpTool";
import {ApiSchedule} from "../../../../utils/httpTool/Api";

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

export const reverseDateTimeStringToMinutes = (dateTime) => {
    return parseInt(dateTime.slice(0, 2))*60 + parseInt(dateTime.slice(3, 4))
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
        const settings = reverseMinutesOffsetToDateTimeStringWithSettings(data)
        success && success(settings)
    }, () => {
        fail && fail()
    })
}

export const updateScheduleSettings = (settings, success, fail) => {
    const param = convertDateTimeToMinutesOffsetWithSettings(settings)
    Request(ApiSchedule.SetScheduleSettings, param, (data) => {
        success && success()
    }, () => {
        fail && fail()
    })
}

export const convertDateTimeToMinutesOffsetWithSettings = (settings) => {
    return {
        ...settings,
        mondayAmEndTimeOffset: reverseDateTimeStringToMinutes(settings.mondayAmEndTime),
        mondayPmEndTimeOffset: reverseDateTimeStringToMinutes(settings.mondayPmEndTime),

        tuesdayAmEndTimeOffset: reverseDateTimeStringToMinutes(settings.tuesdayAmEndTime),
        tuesdayPmEndTimeOffset: reverseDateTimeStringToMinutes(settings.tuesdayPmEndTime),

        wednesdayAmEndTimeOffset: reverseDateTimeStringToMinutes(settings.wednesdayAmEndTime),
        wednesdayPmEndTimeOffset: reverseDateTimeStringToMinutes(settings.wednesdayPmEndTime),

        thursdayAmEndTimeOffset: reverseDateTimeStringToMinutes(settings.thursdayAmEndTime),
        thursdayPmEndTimeOffset: reverseDateTimeStringToMinutes(settings.thursdayPmEndTime),

        fridayAmEndTimeOffset: reverseDateTimeStringToMinutes(settings.fridayAmEndTime),
        fridayPmEndTimeOffset: reverseDateTimeStringToMinutes(settings.fridayPmEndTime),

        saturdayAmEndTimeOffset: reverseDateTimeStringToMinutes(settings.saturdayAmEndTime),
        saturdayPmEndTimeOffset: reverseDateTimeStringToMinutes(settings.saturdayPmEndTime),

        sundayAmEndTimeOffset: reverseDateTimeStringToMinutes(settings.sundayAmEndTime),
        sundayPmEndTimeOffset: reverseDateTimeStringToMinutes(settings.sundayPmEndTime),
    }
}

export const reverseMinutesOffsetToDateTimeStringWithSettings = (settings) => {
    return {
        ...settings,
        mondayAmEndTime: reverseDateTimeStringToMinutes(settings.mondayAmEndTimeOffset),
        mondayPmEndTime: reverseDateTimeStringToMinutes(settings.mondayPmEndTimeOffset),

        tuesdayAmEndTime: reverseDateTimeStringToMinutes(settings.tuesdayAmEndTimeOffset),
        tuesdayPmEndTime: reverseDateTimeStringToMinutes(settings.tuesdayPmEndTimeOffset),

        wednesdayAmEndTime: reverseDateTimeStringToMinutes(settings.wednesdayAmEndTimeOffset),
        wednesdayPmEndTime: reverseDateTimeStringToMinutes(settings.wednesdayPmEndTimeOffset),

        thursdayAmEndTime: reverseDateTimeStringToMinutes(settings.thursdayAmEndTimeOffset),
        thursdayPmEndTime: reverseDateTimeStringToMinutes(settings.thursdayPmEndTimeOffset),

        fridayAmEndTime: reverseDateTimeStringToMinutes(settings.fridayAmEndTimeOffset),
        fridayPmEndTime: reverseDateTimeStringToMinutes(settings.fridayPmEndTimeOffset),

        saturdayAmEndTime: reverseDateTimeStringToMinutes(settings.saturdayAmEndTimeOffset),
        saturdayPmEndTime: reverseDateTimeStringToMinutes(settings.saturdayPmEndTimeOffset),

        sundayAmEndTime: reverseDateTimeStringToMinutes(settings.sundayAmEndTimeOffset),
        sundayPmEndTime: reverseDateTimeStringToMinutes(settings.sundayPmEndTimeOffset),
    }
}

export const InitialSettings = {
    "npi": 0,
    "durationPerSlot": 15,
    "numberPerSlot": 1,
    "mondayAmIsEnable": true,
    "mondayAmStartTime": "08:00",
    "mondayAmEndTime": "12:00",
    "mondayAmEndTimeOffset": 240,
    "mondayAmAppointmentType": 1,
    "mondayPmIsEnable": true,
    "mondayPmStartTime": "01:00",
    "mondayPmEndTime": "05:00",
    "mondayPmEndTimeOffset": 240,
    "mondayPmAppointmentType": 1,
    "tuesdayAmIsEnable": true,
    "tuesdayAmStartTime": "08:00",
    "tuesdayAmEndTime": "12:00",
    "tuesdayAmEndTimeOffset": 240,
    "tuesdayAmAppointmentType": 1,
    "tuesdayPmIsEnable": true,
    "tuesdayPmStartTime": "01:00",
    "tuesdayPmEndTime": "05:00",
    "tuesdayPmEndTimeOffset": 240,
    "tuesdayPmAppointmentType": 1,
    "wednesdayAmIsEnable": true,
    "wednesdayAmStartTime": "08:00",
    "wednesdayAmEndTime": "12:00",
    "wednesdayAmEndTimeOffset": 240,
    "wednesdayAmAppointmentType": 1,
    "wednesdayPmIsEnable": true,
    "wednesdayPmStartTime": "01:00",
    "wednesdayPmEndTime": "05:00",
    "wednesdayPmEndTimeOffset": 240,
    "wednesdayPmAppointmentType": 1,
    "thursdayAmIsEnable": true,
    "thursdayAmStartTime": "08:00",
    "thursdayAmEndTime": "12:00",
    "thursdayAmEndTimeOffset": 240,
    "thursdayAmAppointmentType": 1,
    "thursdayPmIsEnable": true,
    "thursdayPmStartTime": "01:00",
    "thursdayPmEndTime": "05:00",
    "thursdayPmEndTimeOffset": 240,
    "thursdayPmAppointmentType": 1,
    "fridayAmIsEnable": true,
    "fridayAmStartTime": "08:00",
    "fridayAmEndTime": "12:00",
    "fridayAmEndTimeOffset": 240,
    "fridayAmAppointmentType": 1,
    "fridayPmIsEnable": true,
    "fridayPmStartTime": "01:00",
    "fridayPmEndTime": "05:00",
    "fridayPmEndTimeOffset": 240,
    "fridayPmAppointmentType": 1,
    "saturdayAmIsEnable": true,
    "saturdayAmStartTime": "08:00",
    "saturdayAmEndTime": "12:00",
    "saturdayAmEndTimeOffset": 240,
    "saturdayAmAppointmentType": 1,
    "saturdayPmIsEnable": true,
    "saturdayPmStartTime": "01:00",
    "saturdayPmEndTime": "05:00",
    "saturdayPmEndTimeOffset": 240,
    "saturdayPmAppointmentType": 1,
    "sundayAmIsEnable": true,
    "sundayAmStartTime": "08:00",
    "sundayAmEndTime": "12:00",
    "sundayAmEndTimeOffset": 240,
    "sundayAmAppointmentType": 1,
    "sundayPmIsEnable": true,
    "sundayPmStartTime": "01:00",
    "sundayPmEndTime": "05:00",
    "sundayPmEndTimeOffset": 240,
    "sundayPmAppointmentType": 1,
}