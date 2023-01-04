import {SortBy} from "../../../../utils/enum/enum";
import {sendRequest} from "../../../../utils/http/http";
import {ApiDoctor} from "../../../../utils/http/api";
import {SearchFilter} from "../model/searchFilter";
import {DoctorInfo, TimeSlotPerDay} from "../model/doctor";
import moment from "moment";

export function findDoctor(
    filter: SearchFilter,
    success: (total: number, data: Array<DoctorInfo>) => void,
    fail: () => void
) {
    const endDate = moment(filter.startDate).add(5, "days")
        .toDate()
    const param = {
        Keyword: filter.keyword,
        AppointmentType: filter.appointmentType,
        StartDate: filter.startDate.toISOString(),
        EndDate: endDate.toISOString(),
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
                    const currentOffset = initialMinutes + timeSlot.offset
                    timeSlot.date = date
                    timeSlot.isOverOneDay = currentOffset >= 1440
                    timeSlot.dateTime = parseTimeOffset(currentOffset >= 1440 ? currentOffset - 1440 : currentOffset)
                })
            })
        })
        success && success(data.total, data.data)
    }, () => {
        fail && fail()
    })
}

export const getTimeSlots = (npi: number, startDate: string, endDate: string, success: (list: Array<TimeSlotPerDay>) => void, fail: () => void) => {
    const param = {
        Npi: npi,
        StartDate: startDate,
        EndDate: endDate,
    }
    sendRequest(ApiDoctor.GetTimeSlots, param, (data) => {
        data.forEach(({date, timeSlots}: TimeSlotPerDay) => {
            const targetDate = new Date(date)
            const initialMinutes = targetDate.getHours() * 60
            timeSlots.forEach((timeSlot) => {
                const currentOffset = initialMinutes + timeSlot.offset
                timeSlot.isOverOneDay = currentOffset >= 1440
                timeSlot.date = date
                timeSlot.dateTime = parseTimeOffset(currentOffset >= 1440 ? currentOffset - 1440 : currentOffset)
            })
        })
        success && success(data)
    }, () => {
        fail && fail()
    })
}

export const parseTimeOffset = (offset: number) => {
    const hour = parseInt((offset / 60).toString(), 10)
    const min = offset % 60
    return `${hour < 10 ? hour : (hour < 13 ? hour : (hour - 12))}:${min < 10 ? "0" + min : min} ${hour < 12 ? "am" : "pm"}`
}
