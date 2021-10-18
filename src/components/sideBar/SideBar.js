import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
    return <>
        <div className={'flex-none w-48 h-screen border-r bg-primary-focus'}>
            <div className={'flex flex-col justify-center items-center border-b border-opacity-30 '}>
                <img alt={'#avatar'} src={"https://randomuser.me/api/portraits/women/32.jpg"} className={'w-16 h-16 rounded border mt-6'}/>
                <p className={'my-6 font-semibold text-lg px-4 text-white'}>{'Sheldon Alter'}</p>
            </div>
            <ul className={'w-full'}>
                <li className={'w-full flex flex-row items-center my-2'}>
                    <Link
                        className="text-white hover:bg-primary text-sm uppercase py-3 font-bold block px-4 w-full"
                        to="/doctor/dashboard"
                    >
                        <i className="fas fa-chart-line mr-2 text-md"></i> Dashboard
                    </Link>
                </li>

                <li className={'w-full flex flex-row items-center my-2'}>
                    <Link
                        className="text-white hover:bg-primary text-sm uppercase py-3 font-bold block px-4 w-full"
                        to="/doctor/calendar"
                    >
                        <i className="far fa-calendar-check mr-2 text-md"></i> Calendar
                    </Link>
                </li>

                <li className={'w-full flex flex-row items-center my-2 '}>
                    <Link
                        className="text-white hover:bg-primary text-sm uppercase py-3 font-bold block px-4 w-full"
                        to="/doctor/profile"
                    >
                        <i className="far fa-user mr-2 text-md"></i> Profile
                    </Link>
                </li>

                <li className={'w-full flex flex-row items-center my-2'}>
                    <Link
                        className="text-white hover:bg-primary text-sm uppercase py-3 font-bold block px-4 w-full"
                        to="/doctor/settings"
                    >
                        <i className="fas fa-sliders-h mr-2 text-md"></i> Settings
                    </Link>
                </li>
            </ul>
        </div>
    </>
}