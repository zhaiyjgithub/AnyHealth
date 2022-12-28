import React, {createContext, useState} from "react";
import {sendRequest} from "../../utils/http/http";
import {ApiUser} from "../../utils/http/api";

export interface DoctorUser {
    fullName: string,
    firstName: string,
    midName: string,
    lastName: string,
    npi: number,
    jobTitle: string,
    namePrefix: string,
}

export const defaultDoctorUser: DoctorUser = {
    fullName: "",
    firstName: "",
    midName: "",
    lastName: "",
    namePrefix: "",
    jobTitle: "",
    npi: 0,
}

interface IDoctorInfoContext {
    doctorUser: DoctorUser
    login: (email: string, password: string) => void
    logOut: () => void
}

export const DoctorInfoContext = createContext<IDoctorInfoContext>({
    doctorUser: defaultDoctorUser,
    login: () => null,
    logOut: () => null,
})

export default function DoctorUserProvider({children}: any) {
    const [doctorUser, setDoctorUser] = useState<DoctorUser>(defaultDoctorUser)
    const login = (email: string, password: string) => {
        const param = {
            email: email,
            password: password,
        }

        sendRequest(ApiUser.GetUserByID, param, (data) => {
            setDoctorUser(data)
        }, () => {
            //
        })
    }

    const logOut = () => {
        setDoctorUser(defaultDoctorUser)
    }

    const value = {doctorUser, login, logOut}
    return (
        <DoctorInfoContext.Provider value={value}>
            {children}
        </DoctorInfoContext.Provider>
    )
}
