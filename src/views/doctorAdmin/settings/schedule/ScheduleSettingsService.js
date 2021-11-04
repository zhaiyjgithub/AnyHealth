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
    const nSettings = convertWeekDayStartDateTimeToUTCDateTime(settings)
    const param = convertDateTimeToMinutesOffsetWithSettings(nSettings)
    console.log(param)
    // Request(ApiSchedule.SetScheduleSettings, param, (data) => {
    //     success && success()
    // }, () => {
    //     fail && fail()
    // })
}

const convertHHmmToUTCHHmm = (hhmm, isAM) => {
    const {hour, min} = convertHHmmStringToHHmm(hhmm)
    const d = (new Date(2000, 0, 1, isAM ? hour : hour + 12, min, 0, 0))
    const utcHour = d.getUTCHours()
    const utcMin = d.getUTCMinutes()
    return `${utcHour < 10 ? '0' : ''}${utcHour}` + ':' + `${utcMin < 10 ? '0' : ''}${utcMin}`
}

const convertWeekDayStartDateTimeToUTCDateTime = (settings) => {
    return {
        ...settings,
        //start time
        mondayAmStartTime: convertHHmmToUTCHHmm(settings.mondayAmStartTime, true),
        mondayPmStartTime: convertHHmmToUTCHHmm(settings.mondayPmStartTime, false),

        tuesdayAmStartTime: convertHHmmToUTCHHmm(settings.tuesdayAmStartTime, true),
        tuesdayPmStartTime: convertHHmmToUTCHHmm(settings.tuesdayPmStartTime, false),

        wednesdayAmStartTime: convertHHmmToUTCHHmm(settings.wednesdayAmStartTime, true),
        wednesdayPmStartTime: convertHHmmToUTCHHmm(settings.wednesdayPmStartTime, false),

        thursdayAmStartTime: convertHHmmToUTCHHmm(settings.thursdayAmStartTime, true),
        thursdayPmStartTime: convertHHmmToUTCHHmm(settings.thursdayPmStartTime, false),

        fridayAmStartTime: convertHHmmToUTCHHmm(settings.fridayAmStartTime, true),
        fridayPmStartTime: convertHHmmToUTCHHmm(settings.fridayPmStartTime, false),

        saturdayAmStartTime: convertHHmmToUTCHHmm(settings.saturdayAmStartTime, true),
        saturdayPmStartTime: convertHHmmToUTCHHmm(settings.saturdayPmStartTime, false),

        sundayAmStartTime: convertHHmmToUTCHHmm(settings.sundayAmStartTime, true),
        sundayPmStartTime: convertHHmmToUTCHHmm(settings.sundayPmStartTime, false),

        //end time
        mondayAmEndTime: convertHHmmToUTCHHmm(settings.mondayAmEndTime, true),
        mondayPmEndTime: convertHHmmToUTCHHmm(settings.mondayPmEndTime, false),

        tuesdayAmEndTime: convertHHmmToUTCHHmm(settings.tuesdayAmEndTime, true),
        tuesdayPmEndTime: convertHHmmToUTCHHmm(settings.tuesdayPmEndTime, false),

        wednesdayAmEndTime: convertHHmmToUTCHHmm(settings.wednesdayAmEndTime, true),
        wednesdayPmEndTime: convertHHmmToUTCHHmm(settings.wednesdayPmEndTime, false),

        thursdayAmEndTime: convertHHmmToUTCHHmm(settings.thursdayAmEndTime, true),
        thursdayPmEndTime: convertHHmmToUTCHHmm(settings.thursdayPmEndTime, false),

        fridayAmEndTime: convertHHmmToUTCHHmm(settings.fridayAmEndTime, true),
        fridayPmEndTime: convertHHmmToUTCHHmm(settings.fridayPmEndTime, false),

        saturdayAmEndTime: convertHHmmToUTCHHmm(settings.saturdayAmEndTime, true),
        saturdayPmEndTime: convertHHmmToUTCHHmm(settings.saturdayPmEndTime, false),

        sundayAmEndTime: convertHHmmToUTCHHmm(settings.sundayAmEndTime, true),
        sundayPmEndTime: convertHHmmToUTCHHmm(settings.sundayPmEndTime, false),
    }
}

const calcEndTimeOffset = (endTime, startTime) => {
    return reverseDateTimeStringToMinutes(endTime) - reverseDateTimeStringToMinutes(startTime)
}

export const convertDateTimeToMinutesOffsetWithSettings = (settings) => {
    return {
        ...settings,
        mondayAmEndTimeOffset: calcEndTimeOffset(settings.mondayAmEndTime, settings.mondayAmStartTime),
        mondayPmEndTimeOffset: calcEndTimeOffset(settings.mondayPmEndTime, settings.mondayPmStartTime),

        tuesdayAmEndTimeOffset: calcEndTimeOffset(settings.tuesdayAmEndTime, settings.tuesdayAmStartTime),
        tuesdayPmEndTimeOffset: calcEndTimeOffset(settings.tuesdayPmEndTime, settings.tuesdayPmStartTime),

        wednesdayAmEndTimeOffset: calcEndTimeOffset(settings.wednesdayAmEndTime, settings.wednesdayAmStartTime),
        wednesdayPmEndTimeOffset: calcEndTimeOffset(settings.wednesdayPmEndTime, settings.wednesdayPmStartTime),

        thursdayAmEndTimeOffset: calcEndTimeOffset(settings.thursdayAmEndTime, settings.thursdayAmStartTime),
        thursdayPmEndTimeOffset: calcEndTimeOffset(settings.thursdayPmEndTime, settings.thursdayPmStartTime),

        fridayAmEndTimeOffset: calcEndTimeOffset(settings.fridayAmEndTime, settings.fridayAmStartTime),
        fridayPmEndTimeOffset: calcEndTimeOffset(settings.fridayPmEndTime, settings.fridayPmStartTime),

        saturdayAmEndTimeOffset: calcEndTimeOffset(settings.saturdayAmEndTime, settings.saturdayAmStartTime),
        saturdayPmEndTimeOffset: calcEndTimeOffset(settings.saturdayPmEndTime, settings.saturdayPmStartTime),

        sundayAmEndTimeOffset: calcEndTimeOffset(settings.sundayAmEndTime, settings.sundayAmStartTime),
        sundayPmEndTimeOffset: calcEndTimeOffset(settings.sundayPmEndTime, settings.sundayPmStartTime),
    }
}

export const reverseEndTimeOffsetWithEndTime = (startTime, offset, isAM) => {
    const {hour, min} = convertHHmmStringToHHmm(startTime)
    const minutes = hour*60 + min
    // const d = (new Date(2000, 0, 1, isAM ? hour : hour + 12, min, 0, 0))
    const mutc = moment.utc([2000, 1, 1, isAM ? hour : hour + 12, min]).add(offset, "minute")
    const utcHour = mutc.hours()
    const utcMin = mutc.minutes()
    return `${utcHour < 10 ? '0' : ''}${utcHour}` + ':' + `${utcMin < 10 ? '0' : ''}${utcMin}`
}

export const reverseMinutesOffsetToDateTimeStringWithSettings = (settings) => {
    return {
        ...settings,
        mondayAmEndTime: reverseDateTimeStringToMinutes(settings.mondayAmEndTimeOffset), // 根据startTime + offset
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