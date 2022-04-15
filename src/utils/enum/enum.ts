
export enum Gender {
    Female= "F",
    Male= "M",
    Trans= ""
}

export enum AvailableTimeRange {
    AnyTime= 0,
    Today= 1,
    InWeek= 2,
}

export enum AppointmentType {
    anyType= 0,
    inClinic= 1,
    virtual= 2
}

export enum SortBy {
    Default= 0,
    Distance= 1
}

export enum WeekDay {
    Sunday= 0,
    Monday= 1,
    Tuesday= 2,
    Wednesday= 3,
    Thursday= 4,
    Friday= 5,
    Saturday= 6,
}

export const WeekDayShort: Array<string> = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
export const MonthShort: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export enum APM {
    AM= 0,
    PM= 1
}

export enum TimeFormat {
    YYYYMMDDHHmm= "YYYY-MM-DD HH:mm",
    YYYYMMDD= "YYYY-MM-DD",
    HHmm= "HH:mm"
}