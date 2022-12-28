import React, {useContext} from "react";
import {Link, useLocation} from "react-router-dom";
import {DoctorInfoContext} from "../../views/zenClinic/doctorInfoContext";
import {dataForSideBarRouter, RouterTable} from "../../router/routerTable"

export default function SideBar() {
    const {doctorUser} = useContext(DoctorInfoContext)
    const doctorName = `${doctorUser.namePrefix}${doctorUser.fullName} ${doctorUser.jobTitle}`
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
            <li key={idx} className={"w-full flex flex-row items-center px-4 "}>
                <Link
                    className={`${isActive ? " bg-primary hover:bg-primary" : "hover:bg-gray-200"} text-primary-focus text-sm font-semibold py-4 block px-4 w-full`}
                    to={path}
                >
                    <i className={`${icons[idx]} mr-2 text-md`}></i> {name}
                </Link>
            </li>
        )
    }

    const $links = (
        <ul className={"w-full mt-2"}>
            {dataForSideBarRouter.map((route, idx) => {
                return $link(route, idx)
            })}
        </ul>
    )

    const $doctorInfo = (
        <div className={"mt-4 w-full flex flex-col justify-center items-center"}>
            <div className="rounded-full overflow-hidden w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png" alt={""} />
            </div>
            <p className={"py-4 border-b border-base-300 font-semibold text-base px-4 text-base-content font-playball"}>{doctorName}</p>
        </div>
    )
    return <div className={"w-full flex-none"}>
        {$doctorInfo}
        {$links}
    </div>
}
