import moment from "moment";
import {TimeFormat} from "../../../../utils/constant/Enum";
import {Request} from "../../../../utils/httpTool/HttpTool";
import {ApiSchedule} from "../../../../utils/httpTool/Api";
import {convertHHmmStringToHHmm} from "../../../../utils/util/dateParse";

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

export const convertMinutesToDateTimeString = (minutes) => { // 12h
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

//about update settings
export const updateScheduleSettings = (settings, success, fail) => {
    const utcSettings = convertLocalStartDateTimeToUTCStartDateTimeOffset(settings)
    const param = convertDateTimeToDateTimeOffset(utcSettings)
    console.log(param)
    // Request(ApiSchedule.SetScheduleSettings, param, (data) => {
    //     success && success()
    // }, () => {
    //     fail && fail()
    // })
}

export const convertLocalStartDateTimeToUTCStartDateTimeOffset = (settings) => {
    const localDateTimeToUTCDateTimeOffset = (hhmm) => {
        const {hour, min} = convertHHmmStringToHHmm(hhmm)
        const d = (new Date(2000, 0, 1, hour, min, 0, 0))
        const utcHour = d.getUTCHours()
        const utcMin = d.getUTCMinutes()
        return (utcHour*60 + utcMin)
    }

    return {
        ...settings,
        mondayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.mondayAmStartTime, true),
        tuesdayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.tuesdayAmStartTime, true),
        wednesdayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.wednesdayAmStartTime, true),
        thursdayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.thursdayAmStartTime, true),
        fridayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.fridayAmStartTime, true),
        saturdayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.saturdayAmStartTime, true),
        sundayAmStartTimeOffset: localDateTimeToUTCDateTimeOffset(settings.sundayAmStartTime, true),
    }
}

export const convertDateTimeStringToMinutes = (dateTime) => {
    return parseInt(dateTime.slice(0, 2))*60 + parseInt(dateTime.slice(3, 4))
}

const calcDateTimeOffset = (endTime, startTime) => {
    return convertDateTimeStringToMinutes(endTime) - convertDateTimeStringToMinutes(startTime)
}

export const convertDateTimeToDateTimeOffset = (settings) => {
    return {
        ...settings,
        mondayAmEndTimeOffset: calcDateTimeOffset(settings.mondayAmEndTime, settings.mondayAmStartTime),
        mondayPmStartTimeOffset: calcDateTimeOffset(settings.mondayPmStartTime, settings.mondayAmStartTime),
        mondayPmEndTimeOffset: calcDateTimeOffset(settings.mondayPmEndTime, settings.mondayPmStartTime),

        tuesdayAmEndTimeOffset: calcDateTimeOffset(settings.tuesdayAmEndTime, settings.tuesdayAmStartTime),
        tuesdayPmStartTimeOffset: calcDateTimeOffset(settings.tuesdayPmStartTime, settings.tuesdayAmStartTime),
        tuesdayPmEndTimeOffset: calcDateTimeOffset(settings.tuesdayPmEndTime, settings.tuesdayPmStartTime),

        wednesdayAmEndTimeOffset: calcDateTimeOffset(settings.wednesdayAmEndTime, settings.wednesdayAmStartTime),
        wednesdayPmStartTimeOffset: calcDateTimeOffset(settings.wednesdayPmStartTime, settings.wednesdayAmStartTime),
        wednesdayPmEndTimeOffset: calcDateTimeOffset(settings.wednesdayPmEndTime, settings.wednesdayPmStartTime),

        thursdayAmEndTimeOffset: calcDateTimeOffset(settings.thursdayAmEndTime, settings.thursdayAmStartTime),
        thursdayPmStartTimeOffset: calcDateTimeOffset(settings.thursdayPmStartTime, settings.thursdayAmStartTime),
        thursdayPmEndTimeOffset: calcDateTimeOffset(settings.thursdayPmEndTime, settings.thursdayPmStartTime),

        fridayAmEndTimeOffset: calcDateTimeOffset(settings.fridayAmEndTime, settings.fridayAmStartTime),
        fridayPmStartTimeOffset: calcDateTimeOffset(settings.fridayPmStartTime, settings.fridayAmStartTime),
        fridayPmEndTimeOffset: calcDateTimeOffset(settings.fridayPmEndTime, settings.fridayPmStartTime),

        saturdayAmEndTimeOffset: calcDateTimeOffset(settings.saturdayAmEndTime, settings.saturdayAmStartTime),
        saturdayPmStartTimeOffset: calcDateTimeOffset(settings.saturdayPmStartTime, settings.saturdayAmStartTime),
        saturdayPmEndTimeOffset: calcDateTimeOffset(settings.saturdayPmEndTime, settings.saturdayPmStartTime),

        sundayAmEndTimeOffset: calcDateTimeOffset(settings.sundayAmEndTime, settings.sundayAmStartTime),
        sundayPmStartTimeOffset: calcDateTimeOffset(settings.sundayPmStartTime, settings.sundayAmStartTime),
        sundayPmEndTimeOffset: calcDateTimeOffset(settings.sundayPmEndTime, settings.sundayPmStartTime),
    }
}

//about get schedule settings
export const getScheduleSettings = (npi, success, fail) => {
    const param = {Npi: npi}
    Request(ApiSchedule.GetScheduleSettings, param, (data) => {
        //convert to local time from utc.
        const localSettings = convertUTCStartDateOffsetToLocalStartDateOffset(data)
        const settings = convertUTCDateTimeOffsetToLocalDateTime(localSettings)
        success && success(settings)
    }, () => {
        fail && fail()
    })
}

export const convertUTCDateOffsetToLocalDateOffset = (utcOffset) => {
    const utcDateTimeString = convertMinutesToDateTimeString(utcOffset)
    const {hour, min} = convertHHmmStringToHHmm(utcDateTimeString)
    const d = new Date(Date.UTC(2000, 0, 0, hour, min))
    const localHour = d.getHours()
    const localMin = d.getMinutes()
    return (localHour*60 + localMin)
}

export const convertUTCStartDateOffsetToLocalStartDateOffset = (settings) => {
    return {
        ...settings,
        mondayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.mondayAmStartTimeOffset),
        tuesdayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.tuesdayAmStartTimeOffset),
        wednesdayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.wednesdayAmStartTimeOffset),
        thursdayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.thursdayAmStartTimeOffset),
        fridayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.fridayAmStartTimeOffset),
        saturdayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.saturdayAmStartTimeOffset),
        sundayAmStartTimeOffset: convertUTCDateOffsetToLocalDateOffset(settings.sundayAmStartTimeOffset),
    }
}

export const convertUTCDateTimeOffsetToLocalDateTime = (settings) => {
    const minutesToDateTime = (minutes) => {
        const hour = parseInt((minutes/60) + '')
        const min = parseInt((minutes%60) + '')
        return ((hour > 12 ? hour - 12 : hour) < 10 ? '0' + hour : hour) + ':' +  (min < 10 ? '0' + min : min)
    }
    return {
        ...settings,
        //start time
        mondayAmStartTime: minutesToDateTime(settings.mondayAmStartTimeOffset),
        mondayAmEndTime: minutesToDateTime(settings.mondayAmStartTimeOffset + settings.mondayAmEndTimeOffset),
        mondayPmStartTime: minutesToDateTime(settings.mondayPmStartTimeOffset + settings.mondayAmStartTimeOffset),
        mondayPmEndTime: minutesToDateTime(settings.mondayPmStartTimeOffset + settings.mondayPmEndTimeOffset),

        tuesdayAmStartTime: minutesToDateTime(settings.tuesdayAmStartTimeOffset),
        tuesdayAmEndTime: minutesToDateTime(settings.tuesdayAmStartTimeOffset + settings.tuesdayAmEndTimeOffset),
        tuesdayPmStartTime: minutesToDateTime(settings.tuesdayPmStartTimeOffset + settings.tuesdayAmStartTimeOffset),
        tuesdayPmEndTime: minutesToDateTime(settings.tuesdayPmStartTimeOffset + settings.tuesdayPmEndTimeOffset),

        wednesdayAmStartTime: minutesToDateTime(settings.wednesdayAmStartTimeOffset),
        wednesdayAmEndTime: minutesToDateTime(settings.wednesdayAmStartTimeOffset + settings.wednesdayAmEndTimeOffset),
        wednesdayPmStartTime: minutesToDateTime(settings.wednesdayPmStartTimeOffset + settings.wednesdayAmStartTimeOffset),
        wednesdayPmEndTime: minutesToDateTime(settings.wednesdayPmStartTimeOffset + settings.wednesdayPmEndTimeOffset),

        thursdayAmStartTime: minutesToDateTime(settings.thursdayAmStartTimeOffset),
        thursdayAmEndTime: minutesToDateTime(settings.thursdayAmStartTimeOffset + settings.thursdayAmEndTimeOffset),
        thursdayPmStartTime: minutesToDateTime(settings.thursdayPmStartTimeOffset + settings.thursdayAmStartTimeOffset),
        thursdayPmEndTime: minutesToDateTime(settings.thursdayPmStartTimeOffset + settings.thursdayPmEndTimeOffset),

        fridayAmStartTime: minutesToDateTime(settings.fridayAmStartTimeOffset),
        fridayAmEndTime: minutesToDateTime(settings.fridayAmStartTimeOffset + settings.fridayAmEndTimeOffset),
        fridayPmStartTime: minutesToDateTime(settings.fridayPmStartTimeOffset + settings.fridayAmStartTimeOffset),
        fridayPmEndTime: minutesToDateTime(settings.fridayPmStartTimeOffset + settings.fridayPmEndTimeOffset),

        saturdayAmStartTime: minutesToDateTime(settings.saturdayAmStartTimeOffset),
        saturdayAmEndTime: minutesToDateTime(settings.saturdayAmStartTimeOffset + settings.saturdayAmEndTimeOffset),
        saturdayPmStartTime: minutesToDateTime(settings.saturdayPmStartTimeOffset + settings.saturdayAmStartTimeOffset),
        saturdayPmEndTime: minutesToDateTime(settings.saturdayPmStartTimeOffset + settings.saturdayPmEndTimeOffset),

        sundayAmStartTime: minutesToDateTime(settings.sundayAmStartTimeOffset),
        sundayAmEndTime: minutesToDateTime(settings.sundayAmStartTimeOffset + settings.sundayAmEndTimeOffset),
        sundayPmStartTime: minutesToDateTime(settings.sundayPmStartTimeOffset + settings.sundayAmStartTimeOffset),
        sundayPmEndTime: minutesToDateTime(settings.sundayPmStartTimeOffset + settings.sundayPmEndTimeOffset),
    }
}

export const InitialSettings = {
    "npi": 0,
    "durationPerSlot": 15,
    "numberPerSlot": 1,
    
    "mondayAmIsEnable": true,
    "mondayAmStartTime": "08:00",
    "mondayAmStartTimeOffset": 480,
    "mondayAmEndTime": "12:00",
    "mondayAmEndTimeOffset": 240,
    "mondayAmAppointmentType": 1,
    "mondayPmIsEnable": true,
    "mondayPmStartTime": "01:00",
    "mondayPmStartTimeOffset": 300,
    "mondayPmEndTime": "05:00",
    "mondayPmEndTimeOffset": 240,
    "mondayPmAppointmentType": 1,

    "tuesdayAmIsEnable": true,
    "tuesdayAmStartTime": "08:00",
    "tuesdayAmStartTimeOffset": 480,
    "tuesdayAmEndTime": "12:00",
    "tuesdayAmEndTimeOffset": 240,
    "tuesdayAmAppointmentType": 1,
    "tuesdayPmIsEnable": true,
    "tuesdayPmStartTime": "01:00",
    "tuesdayPmStartTimeOffset": 300,
    "tuesdayPmEndTime": "05:00",
    "tuesdayPmEndTimeOffset": 240,
    "tuesdayPmAppointmentType": 1,

    "wednesdayAmIsEnable": true,
    "wednesdayAmStartTime": "08:00",
    "wednesdayAmStartTimeOffset": 480,
    "wednesdayAmEndTime": "12:00",
    "wednesdayAmEndTimeOffset": 240,
    "wednesdayAmAppointmentType": 1,
    "wednesdayPmIsEnable": true,
    "wednesdayPmStartTime": "01:00",
    "wednesdayPmStartTimeOffset": 300,
    "wednesdayPmEndTime": "05:00",
    "wednesdayPmEndTimeOffset": 240,
    "wednesdayPmAppointmentType": 1,

    "thursdayAmIsEnable": true,
    "thursdayAmStartTime": "08:00",
    "thursdayAmStartTimeOffset": 480,
    "thursdayAmEndTime": "12:00",
    "thursdayAmEndTimeOffset": 240,
    "thursdayAmAppointmentType": 1,
    "thursdayPmIsEnable": true,
    "thursdayPmStartTime": "01:00",
    "thursdayPmStartTimeOffset": 300,
    "thursdayPmEndTime": "05:00",
    "thursdayPmEndTimeOffset": 240,
    "thursdayPmAppointmentType": 1,

    "fridayAmIsEnable": true,
    "fridayAmStartTime": "08:00",
    "fridayAmStartTimeOffset": 480,
    "fridayAmEndTime": "12:00",
    "fridayAmEndTimeOffset": 240,
    "fridayAmAppointmentType": 1,
    "fridayPmIsEnable": true,
    "fridayPmStartTime": "01:00",
    "fridayPmStartTimeOffset": 300,
    "fridayPmEndTime": "05:00",
    "fridayPmEndTimeOffset": 240,
    "fridayPmAppointmentType": 1,

    "saturdayAmIsEnable": true,
    "saturdayAmStartTime": "08:00",
    "saturdayAmStartTimeOffset": 480,
    "saturdayAmEndTime": "12:00",
    "saturdayAmEndTimeOffset": 240,
    "saturdayAmAppointmentType": 1,
    "saturdayPmIsEnable": true,
    "saturdayPmStartTime": "01:00",
    "saturdayPmStartTimeOffset": 300,
    "saturdayPmEndTime": "05:00",
    "saturdayPmEndTimeOffset": 240,
    "saturdayPmAppointmentType": 1,

    "sundayAmIsEnable": true,
    "sundayAmStartTime": "08:00",
    "sundayAmStartTimeOffset": 480,
    "sundayAmEndTime": "12:00",
    "sundayAmEndTimeOffset": 240,
    "sundayAmAppointmentType": 1,
    "sundayPmIsEnable": true,
    "sundayPmStartTime": "01:00",
    "sundayPmStartTimeOffset": 300,
    "sundayPmEndTime": "05:00",
    "sundayPmEndTimeOffset": 240,
    "sundayPmAppointmentType": 1,

}