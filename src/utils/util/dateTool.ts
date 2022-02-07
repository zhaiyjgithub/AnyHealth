import moment from "moment";
import {MonthShort, TimeFormat, WeekDayShort} from "../enum/enum";

export const DisabledDate = "2000-01-01T00:00:00Z"

export const convertDateToHHmm = (date: Date) => {
    const m = moment(date)
    const hour = m.hour() > 12 ? m.hour() - 12 : m.hour()
    const min = m.minute()
    return `${hour < 10 ? "0" : ""}${hour}` + ":" + `${min < 10 ? "0" : ""}${min}`
}

export const convertHHmmStringToHHmm = (HHmm: string) => {
    const hour = parseInt(HHmm.slice(0, 2))
    const min = parseInt(HHmm.slice(3))
    return {hour: hour, min: min}
}

export const convertDateTimeToUTC = (date: string, dateTime: string): string => {
    const dateTimeString = `${date} ${dateTime}`
    return moment.utc(moment(dateTimeString, TimeFormat.YYYYMMDDHHmm)).format(TimeFormat.YYYYMMDDHHmm)
}

export const formatDateToWeekMonthDay = (date: Date) => {
    const m = moment(date)
    const weekday = m.weekday()
    const month = m.month()
    const day = m.date()
    return `${WeekDayShort[weekday]}, ${MonthShort[month]} ${day}`
}