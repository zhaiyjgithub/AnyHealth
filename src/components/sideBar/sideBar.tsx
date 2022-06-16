import React, {useContext} from "react";
import {Link, useLocation} from "react-router-dom";
import {DoctorInfoContext} from "../../views/zenClinic/doctorInfoContext";
import {dataForSideBarRouter, RouterTable} from "../../router/routerTable"

export default function SideBar() {
    const doctorInfo = useContext(DoctorInfoContext)
    const doctorName = doctorInfo ? `${doctorInfo.namePrefix}${doctorInfo.fullName} ${doctorInfo.jobTitle}` : ""
    const {pathname} = useLocation()

    const icons: Array<string> = [
        "fas fa-chart-line",
        "far fa-calendar-check",
        "far fa-user",
        "fas fa-sliders-h",
    ]

    const isActiveRoute = (path: string): boolean => {
        return pathname.indexOf(path) !== -1
    }
    const $link = ({name, path}: RouterTable, idx: number) => {
        const isActive = isActiveRoute(path)
        return (
            <li key={idx} className={"w-full flex flex-row items-center my-2 px-4 "}>
                <Link
                    className={`${isActive ? " bg-primary hover:bg-primary" : "hover:bg-gray-200"} text-primary-focus text-sm font-semibold uppercase py-2 block px-4 w-full`}
                    to={path}
                >
                    <i className={`${icons[idx]} mr-2 text-md`}></i> {name}
                </Link>
            </li>
        )
    }

    const $links = (
        <ul className={"w-full"}>
            {dataForSideBarRouter.map((route, idx) => {
                return $link(route, idx)
            })}
        </ul>
    )

    const $doctorInfo = (
        <div className={"mt-4 flex flex-col justify-center items-center"}>
            <div className="avatar">
                <div className="rounded-full w-24 h-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" alt={""} />
                </div>
            </div>
            <p className={"py-4 border-b border-base-300 font-semibold text-base px-4 text-base-content"}>{doctorName}</p>
        </div>
    )
    return <div className={"w-60 border-r border-base-300 fixed left-0 top-0 bottom-0 bg-base-100 flex-none"}>
        {$doctorInfo}
        {$links}
    </div>
}
