export enum ApiDoctor {
    SearchDoctor= "Doctor/SearchDoctor",
    GetDoctor= "Doctor/GetDoctor",
    SaveDoctor= "Doctor/SaveDoctor",
    GetTimeSlots = "Doctor/GetTimeSlots"
}

export enum ApiSchedule {
    SetScheduleSettings= "Schedule/SetScheduleSettings",
    GetScheduleSettings= "Schedule/GetScheduleSettings",
    AddClosedDateSettings= "Schedule/AddClosedDateSettings",
    DeleteClosedDateSettings= "Schedule/DeleteClosedDateSettings",
    GetClosedDateSettings= "Schedule/GetClosedDateSettings",
}
