export enum ApiDoctor {
    SearchDoctor= "Doctor/SearchDoctor",
    GetDoctor= "Doctor/GetDoctor",
    SaveDoctor= "Doctor/SaveDoctor",
    GetTimeSlots = "Doctor/GetTimeSlots",
    GetDoctorDetailInfo = "Doctor/GetDoctorDetailInfo"
}

export enum ApiSchedule {
    SetScheduleSettings= "Schedule/SetScheduleSettings",
    GetScheduleSettings= "Schedule/GetScheduleSettings",
    AddClosedDateSettings= "Schedule/AddClosedDateSettings",
    DeleteClosedDateSettings= "Schedule/DeleteClosedDateSettings",
    GetClosedDateSettings= "Schedule/GetClosedDateSettings",
}

export enum ApiUser {
    CreateUser= "User/CreateUser",
    Login= "/User/Login",
    CreateSubUser = "/User/CreateSubUser",
    GetSubUsers = "/User/GetSubUsers",
    UpdateSubUserPhone = "/User/UpdateSubUserPhone"
}
