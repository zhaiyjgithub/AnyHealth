import {useContext} from "react";
import {UserContext} from "./userProvider";

export default function useUserAuth() {
    const {user, login, createUser} = useContext(UserContext)
    return {user, login, createUser}
}
