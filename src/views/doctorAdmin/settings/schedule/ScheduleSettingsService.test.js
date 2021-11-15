
import {
    convertUTCHHmmToHHmm,
    getScheduleSettings,
    convertUTCWeekDayStartDateTimeToLocalDateTime,
    InitialSettings,
} from './ScheduleSettingsService'

const npi = 1902809254

test("convertUTCHHmmToHHmm", () => {
    expect(convertUTCHHmmToHHmm("03:00", false)).toBe("11:00")
})

test("convertUTCWeekDayStartDateTimeToLocalDateTime", () => {
    const data = convertUTCWeekDayStartDateTimeToLocalDateTime(InitialSettings)
    console.log(JSON.stringify(data))
    // expect(() => {
    //    const data = convertUTCWeekDayStartDateTimeToLocalDateTime(InitialSettings)
    //     console.log(JSON.stringify(data))
    //     return null
    // }).toBe(null)
})