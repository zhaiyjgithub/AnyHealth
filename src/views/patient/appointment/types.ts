export interface Appointment {
    doctorID: number
    npi: number
    appointmentType: number
    appointmentDate: string
    appointmentStatus: number
    memo: string
    offset: number
    patientID: number
    legalGuardianPatientID: number
    firstName: string
    lastName: string
    dob: string
    gender: string
    email: string
    phone: string
    insurance: number
    visitReason: string
    isNewPatient: boolean
    createdDate: string
}

export interface AppointmentInfo extends Appointment {
    doctorFullName: string
    doctorAddress: string,
    doctorPhone: string,
    doctorEmail: string,
    doctorSpecialty: string,
    doctorSubSpecialty: string,
}

export enum AppointmentStatus {
    request,
    confirmed,
    canceled,
    completed,
}
