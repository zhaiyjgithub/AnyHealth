import React, {createContext, useState} from "react";
import {sendRequest} from "../../utils/http/http";
import {ApiDoctor} from "../../utils/http/api";

export interface DoctorUser {
    ID: number,
    fullName: string,
    firstName: string,
    lastName: string,
    npi: number,
    email: string,
    password: string,
}

export const defaultDoctorUser: DoctorUser = {
    email: "", firstName: "", fullName: "", ID: 0, lastName: "", npi: 0, password: "",
}

interface IDoctorInfoContext {
    doctorUser: DoctorUser
    login: (email:string, password: string, completeHandler: (isSuccess: boolean, msg: string) => void) => void,
    logOut: () => void
}

export const DoctorInfoContext = createContext<IDoctorInfoContext>({
    doctorUser: defaultDoctorUser,
    login: () => null,
    logOut: () => null,
})

export default function DoctorUserProvider({children}: any) {
    const [doctorUser, setDoctorUser] = useState<DoctorUser>(defaultDoctorUser)
    const login = (email: string, password: string, completeHandler: (isSuccess: boolean, msg: string) => void) => {
        const param = {
            email: email,
            password: password,
        }

        sendRequest(ApiDoctor.DoctorLogin, param, (user) => {
            const u: DoctorUser = {
                email: user.email,
                firstName: user.firstName,
                fullName: user.fullName,
                lastName: user.lastName,
                npi: user.npi,
                password: user.password,
                ID: user.id,
            }
            setDoctorUser(u)
            completeHandler(true, "")
        }, () => {
            completeHandler(false, "")
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
