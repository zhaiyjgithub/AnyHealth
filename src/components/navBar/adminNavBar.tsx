import React from "react";

export default function AdminNavBar() {
    return (
        <nav className={"bg-base-200 border-b sticky top-0"}>
            <div className={"w-full h-16 px-8 flex flex-row items-center"}>
                <p className={"font-bold text-4xl md:text-4xl text-base-content font-playball"}>
                    ZenDoc
                </p>
            </div>
        </nav>
    )
}
