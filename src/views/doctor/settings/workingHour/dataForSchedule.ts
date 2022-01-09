export interface WorkDaySetting {
    npi: number
    durationPerSlot: number,
    numberPerSlot: number,

    mondayAmIsEnable: boolean,
    mondayAmStartTime: string,
    mondayAmStartTimeOffset: number
    mondayAmEndTime: string,
    mondayAmEndTimeOffset: number,
    mondayAmAppointmentType: number,
    mondayPmIsEnable: boolean,
    mondayPmStartTime: string,
    mondayPmStartTimeOffset: number,
    mondayPmEndTime: string,
    mondayPmEndTimeOffset: number,
    mondayPmAppointmentType: number,

    tuesdayAmIsEnable: boolean,
    tuesdayAmStartTime: string,
    tuesdayAmStartTimeOffset: number
    tuesdayAmEndTime: string,
    tuesdayAmEndTimeOffset: number,
    tuesdayAmAppointmentType: number,
    tuesdayPmIsEnable: boolean,
    tuesdayPmStartTime: string,
    tuesdayPmStartTimeOffset: number,
    tuesdayPmEndTime: string,
    tuesdayPmEndTimeOffset: number,
    tuesdayPmAppointmentType: number,

    wednesdayAmIsEnable: boolean,
    wednesdayAmStartTime: string,
    wednesdayAmStartTimeOffset: number
    wednesdayAmEndTime: string,
    wednesdayAmEndTimeOffset: number,
    wednesdayAmAppointmentType: number,
    wednesdayPmIsEnable: boolean,
    wednesdayPmStartTime: string,
    wednesdayPmStartTimeOffset: number,
    wednesdayPmEndTime: string,
    wednesdayPmEndTimeOffset: number,
    wednesdayPmAppointmentType: number,

    thursdayAmIsEnable: boolean,
    thursdayAmStartTime: string,
    thursdayAmStartTimeOffset: number
    thursdayAmEndTime: string,
    thursdayAmEndTimeOffset: number,
    thursdayAmAppointmentType: number,
    thursdayPmIsEnable: boolean,
    thursdayPmStartTime: string,
    thursdayPmStartTimeOffset: number,
    thursdayPmEndTime: string,
    thursdayPmEndTimeOffset: number,
    thursdayPmAppointmentType: number,

    fridayAmIsEnable: boolean,
    fridayAmStartTime: string,
    fridayAmStartTimeOffset: number
    fridayAmEndTime: string,
    fridayAmEndTimeOffset: number,
    fridayAmAppointmentType: number,
    fridayPmIsEnable: boolean,
    fridayPmStartTime: string,
    fridayPmStartTimeOffset: number,
    fridayPmEndTime: string,
    fridayPmEndTimeOffset: number,
    fridayPmAppointmentType: number,

    saturdayAmIsEnable: boolean,
    saturdayAmStartTime: string,
    saturdayAmStartTimeOffset: number
    saturdayAmEndTime: string,
    saturdayAmEndTimeOffset: number,
    saturdayAmAppointmentType: number,
    saturdayPmIsEnable: boolean,
    saturdayPmStartTime: string,
    saturdayPmStartTimeOffset: number,
    saturdayPmEndTime: string,
    saturdayPmEndTimeOffset: number,
    saturdayPmAppointmentType: number,

    sundayAmIsEnable: boolean,
    sundayAmStartTime: string,
    sundayAmStartTimeOffset: number
    sundayAmEndTime: string,
    sundayAmEndTimeOffset: number,
    sundayAmAppointmentType: number,
    sundayPmIsEnable: boolean,
    sundayPmStartTime: string,
    sundayPmStartTimeOffset: number,
    sundayPmEndTime: string,
    sundayPmEndTimeOffset: number,
    sundayPmAppointmentType: number,
}

export enum DateTimePoint {
    StartTime= 0,
    EndTime= 1,
}