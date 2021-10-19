import moment from "moment";
import {TimeFormat} from "../../../utils/constant/Enum";

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