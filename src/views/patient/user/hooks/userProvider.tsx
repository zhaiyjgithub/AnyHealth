import React, {createContext, useState} from "react"
import {createNewUser, loginWithEmail} from "../service/userService";
import {ApiUser} from "../../../../utils/http/api";
import {sendRequest} from "../../../../utils/http/http";

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    birthday: string,
    phone: string,
    streetAddress: string,
    suit: string,
    city: string,
    state: string,
    zip: string,
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
    streetAddress: "",
    suit: "",
    city: "",
    state: "",
    zip: "",
    password: "",
}

export interface UserContextType {
    user: User,
    login: (email: string, password: string, completeHandler: (isSuccess: boolean, msg: string) => void) => void,
    createUser: (firstName: string,
                 lastName: string,
                 birthday: string,
                 gender: string,
                 email: string,
                 password: string,
                 completeHandler: (isSuccess: boolean, msg: string) => void) => void,
    getUserByID: (userID: number) => void,
    logOut: () => void,
}

export const UserContext = createContext<UserContextType>({
    user: defaultUser,
    login: () => null,
    createUser: () => null,
    getUserByID: () => null,
    logOut: () => null,
})

export default function UserProvider({children}: any) {
    const [user, setUser] = useState<User>(defaultUser)
    const login = (email: string, password: string, completeHandler: (isSuccess: boolean, msg: string) => void) => {
        loginWithEmail(email, password, (user) => {
            setUser(user)
            completeHandler(true, "")
        }, () => {
            completeHandler(false, "")
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

    const getUserByID = (userID: number) => {
        const param = {
            UserID: userID,
        }
        sendRequest(ApiUser.GetUserByID, param, (user) => {
            setUser(user)
        }, () => {
            //
        })
    }

    const logOut = () => {
        setUser(defaultUser)
    }

    const value: UserContextType = {user, login, createUser, getUserByID, logOut}
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
