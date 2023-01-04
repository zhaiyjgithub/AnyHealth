import React from "react";
import {useLocation, Link} from "react-router-dom";
import {SettingRoute} from "../../types";

export default function SideBar() {
    const {pathname} = useLocation()
    const isActivePath = (name: string) => {
        return pathname.indexOf(name) !== -1
    }
    return (
        <div className={"w-max"}>
            <ul>
                {SettingRoute.map(({name, path}, idx) => {
                    const isActive = isActivePath(path)
                    console.log(isActive)
                    return (
                        <li key={idx}>
                            <Link to={path}>
                                <div
                                    className={`cursor-pointer w-full flex flex-row items-center space-x-2 h-max mr-8 border-l-8 ${isActive ? "border-primary-focus" : "border-transparent"}`}>
                                    <div className={"w-full border-b "}>
                                        <p className={"text-base font-bold text-primary-focus py-4 px-4"}>{name}</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
