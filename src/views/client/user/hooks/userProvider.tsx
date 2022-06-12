import React, {createContext, useState} from "react"
import {createNewUser, loginWithEmail} from "../service/userService";

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    birthday: string,
    phone: string,
    address: string,
    password: string
}

const defaultUser: User = {
    id: 0,
    firstName: "",
    lastName: "",
    gender: "F",
    email: "",
    birthday: "",
    phone: "",
    address: "",
    password: "",
}

export interface UserContextType {
    user: User,
    login: (email:string, password: string, completeHandler: (isSuccess: boolean, msg: string) => void) => void,
    createUser: (firstName: string,
        lastName: string,
        birthday: string,
        gender: string,
        email: string,
        password: string,
        completeHandler: (isSuccess: boolean, msg: string) => void) => void,
}

export const UserContext = createContext<UserContextType>({
    user: defaultUser,
    login: () => null,
    createUser: () => null,
})

export default function UserProvider({children}: any) {
    const [user, setUser] = useState<User>(defaultUser)
    const login = (email: string, password: string, completeHandler: (isSuccess: boolean, msg: string) => void) => {
        loginWithEmail(email, password, (user) => {
            setUser(user)
            completeHandler(true, '')
        }, () => {
            completeHandler(false, '')
        })
    }
    const createUser = (
        firstName: string,
        lastName: string,
        birthday: string,
        gender: string,
        email: string,
        password: string,
        completeHandler: (isSuccess: boolean, msg: string) => void
    ) => {
        createNewUser(
            firstName,
            lastName,
            birthday,
            gender,
            email,
            password,
            (user) => {
                completeHandler(true, "")
                setUser(user)
            },
            () => {
                completeHandler(false, "")
            })
    }

    const value: UserContextType = {user, login, createUser}
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
