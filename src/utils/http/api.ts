export enum ApiDoctor {
    SearchDoctor= "Doctor/SearchDoctor",
    GetDoctor= "Doctor/GetDoctor",
    SaveDoctor= "Doctor/SaveDoctor",
    GetTimeSlots = "Doctor/GetTimeSlots",
    GetDoctorDetailInfo = "Doctor/GetDoctorDetailInfo",
    DoctorLogin = "Doctor/DoctorLogin",
}

export enum ApiSchedule {
    SetScheduleSettings= "Schedule/SetScheduleSettings",
    GetScheduleSettings= "Schedule/GetScheduleSettings",
    AddClosedDateSettings= "Schedule/AddClosedDateSettings",
    DeleteClosedDateSettings= "Schedule/DeleteClosedDateSettings",
    GetClosedDateSettings= "Schedule/GetClosedDateSettings",
    AddAppointment = "Schedule/AddAppointment",
    GetAppointmentByPage = "Schedule/GetAppointmentByPage"
}

export enum ApiUser {
    CreateUser= "User/CreateUser",
    Login= "User/Login",
    CreateSubUser = "User/CreateSubUser",
    GetSubUsers = "User/GetSubUsers",
    UpdateSubUserPhone = "User/UpdateSubUserPhone",
    UpdateUserProfile = "User/UpdateUserProfile",
    GetUserByID = "User/GetUserByID",
    GetUserInsurance = "User/GetUserInsurance",
    UpdateUserInsurance = "User/UpdateUserInsurance"
}
