import {SortBy} from "../../../../utils/enum/enum";
import {sendRequest} from "../../../../utils/http/http";
import {ApiDoctor} from "../../../../utils/http/api";
import {SearchFilter} from "../model/searchFilter";
import {Doctor} from "../model/doctor";

export function findDoctor(
    filter: SearchFilter,
    success: (total: number, data: Array<Doctor>) => void,
    fail: () => void
) {
    const param = {
        Keyword: filter.keyword,
        AppointmentType: filter.appointmentType,
        StarDate: filter.startDate.toISOString(),
        EndDate: filter.endDate ? filter.endDate.toISOString() : "",
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
        success && success(data.total, data.data)
    }, () => {
        fail && fail()
    })
}