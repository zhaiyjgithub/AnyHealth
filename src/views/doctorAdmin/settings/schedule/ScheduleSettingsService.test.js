
import {
    getScheduleSettings,
    DefaultUTCSettings,
    convertUTCStartDateOffsetToLocalStartDateOffset,
    convertUTCDateTimeOffsetToLocalDateTime,
    convertLocalStartDateTimeToUTCStartDateTimeOffset,
    convertDateTimeToDateTimeOffset, convertLocalPmTime12HTo24H,

} from './ScheduleSettingsService'

const npi = 1902809254

test("convertUTCStartDateOffsetToLocalStartDateOffset", () => {
    const localStartDate = convertUTCStartDateOffsetToLocalStartDateOffset(DefaultUTCSettings)
    const settings = convertUTCDateTimeOffsetToLocalDateTime(localStartDate)
    console.log((settings))
    // expect(() => {
    //    const data = convertUTCWeekDayStartDateTimeToLocalDateTime(DefaultUTCSettings)
    //     console.log(JSON.stringify(data))
    //     return null
    // }).toBe(null)
})

const mys = {
    npi: 0,
    durationPerSlot: 15,
    numberPerSlot: 1,
    mondayAmIsEnable: true,
    mondayAmStartTime: '08:00',
    mondayAmStartTimeOffset: 480,
    mondayAmEndTime: '12:00',
    mondayAmEndTimeOffset: 240,
    mondayAmAppointmentType: 1,
    mondayPmIsEnable: true,
    mondayPmStartTime: '01:00',
    mondayPmStartTimeOffset: 300,
    mondayPmEndTime: '05:00',
    mondayPmEndTimeOffset: 240,
    mondayPmAppointmentType: 1,
    tuesdayAmIsEnable: true,
    tuesdayAmStartTime: '08:00',
    tuesdayAmStartTimeOffset: 480,
    tuesdayAmEndTime: '12:00',
    tuesdayAmEndTimeOffset: 240,
    tuesdayAmAppointmentType: 1,
    tuesdayPmIsEnable: true,
    tuesdayPmStartTime: '01:00',
    tuesdayPmStartTimeOffset: 300,
    tuesdayPmEndTime: '05:00',
    tuesdayPmEndTimeOffset: 240,
    tuesdayPmAppointmentType: 1,
    wednesdayAmIsEnable: true,
    wednesdayAmStartTime: '08:00',
    wednesdayAmStartTimeOffset: 480,
    wednesdayAmEndTime: '12:00',
    wednesdayAmEndTimeOffset: 240,
    wednesdayAmAppointmentType: 1,
    wednesdayPmIsEnable: true,
    wednesdayPmStartTime: '01:00',
    wednesdayPmStartTimeOffset: 300,
    wednesdayPmEndTime: '05:00',
    wednesdayPmEndTimeOffset: 240,
    wednesdayPmAppointmentType: 1,
    thursdayAmIsEnable: true,
    thursdayAmStartTime: '08:00',
    thursdayAmStartTimeOffset: 480,
    thursdayAmEndTime: '12:00',
    thursdayAmEndTimeOffset: 240,
    thursdayAmAppointmentType: 1,
    thursdayPmIsEnable: true,
    thursdayPmStartTime: '01:00',
    thursdayPmStartTimeOffset: 300,
    thursdayPmEndTime: '05:00',
    thursdayPmEndTimeOffset: 240,
    thursdayPmAppointmentType: 1,
    fridayAmIsEnable: true,
    fridayAmStartTime: '08:00',
    fridayAmStartTimeOffset: 480,
    fridayAmEndTime: '12:00',
    fridayAmEndTimeOffset: 240,
    fridayAmAppointmentType: 1,
    fridayPmIsEnable: true,
    fridayPmStartTime: '01:00',
    fridayPmStartTimeOffset: 300,
    fridayPmEndTime: '05:00',
    fridayPmEndTimeOffset: 240,
    fridayPmAppointmentType: 1,
    saturdayAmIsEnable: true,
    saturdayAmStartTime: '08:00',
    saturdayAmStartTimeOffset: 480,
    saturdayAmEndTime: '12:00',
    saturdayAmEndTimeOffset: 240,
    saturdayAmAppointmentType: 1,
    saturdayPmIsEnable: true,
    saturdayPmStartTime: '01:00',
    saturdayPmStartTimeOffset: 300,
    saturdayPmEndTime: '05:00',
    saturdayPmEndTimeOffset: 240,
    saturdayPmAppointmentType: 1,
    sundayAmIsEnable: true,
    sundayAmStartTime: '08:00',
    sundayAmStartTimeOffset: 480,
    sundayAmEndTime: '12:00',
    sundayAmEndTimeOffset: 240,
    sundayAmAppointmentType: 1,
    sundayPmIsEnable: true,
    sundayPmStartTime: '01:00',
    sundayPmStartTimeOffset: 300,
    sundayPmEndTime: '05:00',
    sundayPmEndTimeOffset: 240,
    sundayPmAppointmentType: 1
}

test("convert local date time to utc", () => {
    const dateTime24HSettings = convertLocalPmTime12HTo24H(mys)
    const utcSettings = convertLocalStartDateTimeToUTCStartDateTimeOffset(dateTime24HSettings)
    const param = convertDateTimeToDateTimeOffset(utcSettings)
    console.log(param)
})