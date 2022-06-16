import React, {useState} from "react";
import SearchBar from "./searchBar";
import LoginDropdown from "../login/loginDropdown";
import UserDropdown from "../login/userDropdown";
import useUserAuth from "../../../user/hooks/useUserAuth";
import LoginModal from "../login/loginModal";

export default function Navbar() {
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const useAuth = useUserAuth()
    const { user } = useAuth
    const $brand = (
        <p className={"font-bold text-3xl text-base-content"}>
            Zendoc
        </p>
    )

    const $searchBar = (
        <div className={"w-2/3 h-full max-w-4xl"}>
            <SearchBar />
        </div>
    )

    const $login = (
        <LoginDropdown onLogin={() => {
            setShowLogin(true)
        }} />
    )

    const $inboxButton = (
        <button type={"button"} className={"px-4 py-2 text-base text-primary-focus hover:text-white bg-base-200 hover:bg-primary-focus"}>
            0
        </button>
    )
    const $userInfo = (
        <div className={"flex flex-row items-center space-x-4"}>
            {$inboxButton}
            <UserDropdown />
        </div>
    )

    const $info = user.firstName.length ? $userInfo : $login
    const $loginModal = (
        <LoginModal open={showLogin} onApply={() => {
            setShowLogin(false)
        }} />
    )
    return (
        <div className={"w-full flex flex-row items-center justify-between px-8 py-4 bg-base-200 border"}>
            <div className={"flex-1 flex flex-row items-center h-12 space-x-4"}>
                {$brand}
                {$searchBar}
            </div>
            {$info}
            {$loginModal}
        </div>
    )
}
