import React from "react";
import UserDropdown from "../../../searchDoctor/components/login/userDropdown";

export default function NavBar() {
    const $brand = (
        <p className={"font-bold text-4xl text-base-content font-playball"}>
            ZenDoc
        </p>
    )

    const $inboxButton = (
        <button type={"button"} className={"px-4 py-2 text-base text-primary-focus bg-white hover:text-white hover:bg-primary-focus"}>
            0
        </button>
    )
    const $userInfo = (
        <div className={"flex flex-row items-center space-x-4"}>
            {$inboxButton}
            <UserDropdown />
        </div>
    )

    const $pageName = (
        <p className={"text-lg text-base-600 font-semibold border-primary-focus hover:border-solid"}>My Zendoc</p>
    )

    const $navButtons = (
        <div className={"flex flex-row items-center space-x-8"}>
            {$pageName}
            {$userInfo}
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
