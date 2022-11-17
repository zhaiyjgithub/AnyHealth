import {AppointmentType} from "../../../utils/enum/enum";

export interface Appointment {
    DoctorID: number,
    Npi: number,
    AppointmentType: AppointmentType,
    AppointmentDate: string,
    AppointmentStatus: number,
    Memo: string,
    Offset: number,
    PatientID: number,
    LegalGuardianPatientID: number,
    FirstName: string,
    LastName: string,
    Dob: string,
    Gender: string,
    Email: string,
    Phone: string,
    Insurance: string,
    InsuranceName: string,
    VisitReason: string,
    IsNewPatient: boolean,
}
