import React, {useState} from "react";
import LoginDropdown from "../../../searchDoctor/components/login/loginDropdown";
import useUserAuth from "../../../user/hooks/useUserAuth";
import UserDropdown from "../../../searchDoctor/components/login/userDropdown";
import LoginModal from "../../../searchDoctor/components/login/loginModal";

export default function NavBar() {
    const [show, setShow] = useState<boolean>(false)
    const useAuth = useUserAuth()
    const {user} = useAuth
    const $brand = (
        <p className={"font-bold text-4xl text-base-content font-playball"}>
            ZenDoc
        </p>
    )

    const $inboxButton = (
        <button type={"button"}
            className={"px-4 py-2 text-base text-primary-focus bg-white hover:text-white hover:bg-primary-focus"}>
            0
        </button>
    )
    const $userInfo = (
        <div className={"flex flex-row items-center space-x-4"}>
            {$inboxButton}
            <UserDropdown/>
        </div>
    )

    const $login = (
        <LoginDropdown onLogin={() => {
            setShow(true)
        }}/>
    )
    const $info = user.firstName.length ? $userInfo : $login

    const $loginModal = (
        <LoginModal show={show} onCancel={() => {
            setShow(false)
        }} onLoginSuccess={() => {
            setShow(false)
        }}/>
    )

    const $browseButton = (
        <button type={"button"}
            className={"text-sm text-base-600 font-semibold border-primary-focus border-b border-dotted hover:border-solid"}>Browse</button>
    )

    const $divider = (
        <div className={"h-5 w-px bg-primary-focus"}/>
    )
    const $navButtons = (
        <div className={"flex flex-row items-center space-x-4"}>
            {$browseButton}
            {$divider}
            {$info}
            {$loginModal}
        </div>
    )

    return (
        <div className={"w-full bg-primary flex flex-row items-center justify-center"}>
            <div className={"container"}>
                <div className={"flex flex-row items-center justify-between px-8 py-4 "}>
                    <div className={"flex-1 flex flex-row items-center h-12 space-x-4"}>
                        {$brand}
                    </div>
                    {$navButtons}
                </div>
            </div>
        </div>
    )
}
