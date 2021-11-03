import moment from "moment";

export const DisableDate = '2000-01-01T00:00:00Z'

export const convertDateToHHmm = (date) => {
    const m = moment(date)
    const hour = m.hour() > 12 ? m.hour() - 12 : m.hour()
    const min = m.minute()
    return `${hour < 10 ? '0' : ''}${hour}` + ':' + `${min < 10 ? '0' : ''}${min}`
}

export const convertHHmmStringToHHmm = (HHmm) => {
    const hour = parseInt(HHmm.slice(0, 2))
    const min = parseInt(HHmm.slice(3))
    return {hour: hour, min: min}
}