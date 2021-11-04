
import {reverseEndTimeOffsetWithEndTime} from './ScheduleSettingsService'
test("reverseEndTimeOffsetWithEndTime", () => {
    expect(reverseEndTimeOffsetWithEndTime("08:00", 240, true)).toBe("12:00")
})