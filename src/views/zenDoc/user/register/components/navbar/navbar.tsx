import React from "react";

export default function NavBar() {
    const $brand = (
        <p className={"font-bold text-3xl text-base-content"}>
            Zendoc
        </p>
    )
    return (
        <div className={"w-full bg-primary flex flex-row items-center justify-center"}>
            <div className={"container"}>
                <div className={"flex flex-row items-center justify-between px-8 py-4 "}>
                    <div className={"flex-1 flex flex-row items-center h-12 space-x-4"}>
                        {$brand}
                    </div>
                </div>
            </div>
        </div>
    )
}
