import {AppointmentType, Gender} from "../../../../utils/enum/enum";

export interface SearchFilter {
    keyword: string,
    appointmentType: AppointmentType,
    startDate: Date,
    endDate: Date | undefined,
    specialty: string,
    gender: Gender,
    zip: string,
    city: string,
    lat: number | undefined,
    lon: number | undefined,
    distance: number,
    page: number,
    pageSize: number,
}
