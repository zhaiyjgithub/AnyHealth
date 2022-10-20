import React from "react";
import {useLocation} from "react-router-dom";

export default function SideBar() {
    const {pathname} = useLocation()
    const menus: Array<{name: string, path: string}> = [
        {name: "Profile", path: "profile-setting/profile"},
        {name: "Past Appointments", path: "profile-setting/past-appointments"},
        {name: "Insurance", path: "profile-setting/insurance"},
        {name: "Data Privacy Settings", path: "profile-setting/data-privacy-settings"},
    ]
    const isActivePath = (name: string) => {
        return pathname.indexOf(name) !== -1
    }
    return (
        <div className={"w-max"}>
            <ul>
                {menus.map(({name, path}, idx) => {
                    const isActive = isActivePath(path)
                    return (
                        <li key={idx}>
                            <div className={"w-full flex flex-row items-center space-x-2 border-b h-max mr-8"}>
                                <div className={`w-3 h-14 h-full bg-primary-focus bg-primary-focus ${isActive ? "visible" : "invisible"}`}/>
                                <p className={"text-base font-semibold text-primary-focus"}>{name}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
