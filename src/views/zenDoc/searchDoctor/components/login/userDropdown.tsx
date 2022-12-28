import React, {useState} from "react";
import useUserAuth from "../../../user/hooks/useUserAuth";
import {useHistory} from "react-router-dom";

export default function UserDropdown() {
    const [show, setShow] = useState<boolean>(false)

    const history = useHistory()
    const userAuth = useUserAuth()
    const { user, logOut } = userAuth
    const $toggleButton = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShow(!show)
        }} type={"button"} className={`z-10 w-56 relative space-x-2 px-2 py-2 flex flex-row items-center justify-between text-primary-focus font-semibold leading-tight ${show ? "bg-primary-focus" : "bg-base-200"}`}>
            <p className={ `text-base ${show ? "text-white" : "text-primary-focus"}`}>{user.firstName}</p>
            <svg className={`h-5 w-5 text-primary-focus ${show ? "text-white" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill={show ? "#FFF" : "#343D4E"}>
                <path fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"/>
            </svg>
        </button>
    )

    const $bg = show ? (
        <div onClick={() => {
            setShow(false)
        }} className={"fixed inset-0 h-full w-full z-20"} />
    ) : null

    const $list = show ? (
        <div className="absolute w-56 right-0 overflow-y-auto shadow min-w-full bg-white z-20 transition duration-150 ease-in-out">
            <div className={"w-full bg-white hover:bg-gray-200 px-2"}>
                <div className={"w-full flex flex-row items-center space-x-4 px-2 py-2"}>
                    <i className="fas fa-cog text-primary-focus text-base"></i>
                    <button onClick={() => {
                        history.push({
                            pathname: "/profile-setting/profile",
                            search: "",
                        })
                    }} type={"button"} className={"w-full text-primary-focus text-base font-medium"}>Settings</button>
                </div>
            </div>
            <div className={"w-full bg-white hover:bg-gray-200 px-2"}>
                <div className={"w-full flex flex-row items-center space-x-4 px-2 py-2"}>
                    <i className="fas fa-sign-out-alt text-primary-focus text-base"></i>
                    <button onClick={() => {
                        logOut()
                        history.replace("/search")
                    }} type={"button"} className={"w-full text-primary-focus text-base font-medium"}>Sign out</button>
                </div>
            </div>
        </div>
    ) : null

    return (
        <div className={"relative w-max"}>
            {$toggleButton}
            {$bg}
            {$list}
        </div>
    )
}
