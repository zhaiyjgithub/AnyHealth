import {Gender} from "../../../../utils/enum/enum";

export interface Location {
    lat: number,
    lon: number
}

export interface Doctor {
    npi: number,
    lastName: string,
    firstName: string,
    middleName: string,
    fullName: string,
    namePrefix: string,
    credential: string,
    gender: Gender,
    address: string,
    city: string,
    state: string,
    zip: number,
    phone: string,
    specialty: string,
    subSpecialty: string,
    jobTitle: string,
    summary: string,
    fax: string,
    addressSuit: string,
    lang: string,
    yearOfExperience: string,
    location: Location,
    distance: number,
    nextAvailableDateInClinic: string,
    nextAvailableDateVirtual: string
}