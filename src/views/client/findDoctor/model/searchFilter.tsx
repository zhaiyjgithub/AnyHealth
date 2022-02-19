import {AppointmentType, Gender} from "../../../../utils/enum/enum";

export interface SearchFilter {
    keyword: string,
    appointmentType: AppointmentType,
    startDate: Date,
    endDate: Date | null,
    specialty: string,
    gender: Gender,
    zip: string,
    city: string,
    lat: number | null,
    lon: number | null,
    distance: number | null,
    page: number,
    pageSize: number,
}