import {createContext} from "react";

export interface IDoctorInfoContext {
    fullName: string,
    firstName: string,
    midName: string,
    lastName: string,
    npi: number,
    jobTitle: string,
    namePrefix: string,
}

export const defaultDoctorInfo: IDoctorInfoContext = {
    fullName: "Jeffrey Glasser",
    firstName: "Jeffrey",
    midName: "",
    lastName: "Glasser",
    namePrefix: "Dr. ",
    jobTitle: "MD",
    npi: 1902809254,
}

export const DoctorInfoContext = createContext<IDoctorInfoContext>({} as IDoctorInfoContext)