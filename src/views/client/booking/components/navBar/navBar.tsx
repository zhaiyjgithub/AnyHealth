import React from "react";

export default function NavBar() {
    const $brand = (
        <p className={"font-bold text-3xl text-base-content"}>
            ZenDoc
        </p>
    )

    const $secureButton = (
        <div className={"flex flex-row items-center space-x-4"}>
            <i className="fas fa-lock text-base" />
            <p className={"font-semibold text-base text-primary-focus"}>
                Secure
            </p>
        </div>
    )

    return (
        <div className={"w-full bg-primary flex flex-row items-center justify-center border-b"}>
            <div className={"w-full"}>
                <div className={"flex flex-row items-center justify-between px-16 py-4 "}>
                    {$brand}
                    {$secureButton}
                </div>
            </div>
        </div>
    )
}