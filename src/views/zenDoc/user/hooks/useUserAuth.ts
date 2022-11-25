import {useContext} from "react";
import {UserContext} from "./userProvider";

export default function useUserAuth() {
    const {user, login, createUser, getUserByID} = useContext(UserContext)
    return {user, login, createUser, getUserByID}
}
