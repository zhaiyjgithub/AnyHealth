import React, {createContext, useState} from "react"
import {createNewUser} from "../service/userService";

export interface User {
    "firstName": string,
    "lastName": string,
    "gender": string,
    "email": string,
    "birthday": string,
    "phone": string,
    "address": string,
    "password": string
}

const defaultUser: User = {
    "firstName": "",
    "lastName": "",
    "gender": "F",
    "email": "",
    "birthday": "",
    "phone": "",
    "address": "",
    "password": "",
}

export interface UserContextType {
    user: User,
    login: () => void,
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
    const login = () => {
        // 
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