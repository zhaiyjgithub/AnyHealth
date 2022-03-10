import {SortBy} from "../../../../utils/enum/enum";
import {sendRequest} from "../../../../utils/http/http";
import {ApiDoctor} from "../../../../utils/http/api";
import {SearchFilter} from "../model/searchFilter";
import {DoctorInfo, TimeSlotPerDay} from "../model/doctor";

export function findDoctor(
    filter: SearchFilter,
    success: (total: number, data: Array<DoctorInfo>) => void,
    fail: () => void
) {
    const param = {
        Keyword: filter.keyword,
        AppointmentType: filter.appointmentType,
        StartDate: filter.startDate.toISOString(),
        EndDate: filter.endDate ? filter.endDate.toISOString() : null,
        Gender: filter.gender,
        Specialty: filter.specialty,
        City: filter.city,
        Lat: filter.lat,
        Lon: filter.lon,
        Distance: filter.distance,
        Page: filter.page,
        PageSize: filter.pageSize,
        SortByType: filter.keyword && filter.keyword.length ? SortBy.Default : SortBy.Distance,
    }
    sendRequest(ApiDoctor.SearchDoctor, param, (data) => {
        data.data.forEach((doctorInfo: DoctorInfo) => {
            const {timeSlotsPerDay} = doctorInfo
            timeSlotsPerDay.forEach(({date, timeSlots}) => {
                const targetDate = new Date(date)
                const initialMinutes = targetDate.getHours() * 60
                timeSlots.forEach((timeSlot) => {
                    timeSlot.dateTime = parseTimeOffset(initialMinutes + timeSlot.offset)
                })
            })
        })
        success && success(data.total, data.data)
    }, () => {
        fail && fail()
    })
}

export const getTimeSlots = (npi: number, startDate: string, range: number = 5, success: (list: Array<TimeSlotPerDay>) => void, fail: () => void) => {
    const param = {
        Npi: npi,
        StartDate: startDate,
        range: range,
    }
    sendRequest(ApiDoctor.GetTimeSlots, param, (data) => {
        data.forEach(({date, timeSlots}: TimeSlotPerDay) => {
            const targetDate = new Date(date)
            const initialMinutes = targetDate.getHours() * 60
            timeSlots.forEach((timeSlot) => {
                timeSlot.dateTime = parseTimeOffset(initialMinutes + timeSlot.offset)
            })
        })
        success && success(data)
    }, () => {
        fail && fail()
    })
}

const parseTimeOffset = (offset: number) => {
    const hour = parseInt((offset / 60).toString(), 10)
    const min = offset % 60
    return `${hour < 10 ? hour : (hour < 13 ? hour : (hour - 12))}:${min < 10 ? "0" + min : min} ${hour < 12 ? "am" : "pm"}`
}