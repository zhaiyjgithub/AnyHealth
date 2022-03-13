import React from "react";
import NavBar from "./components/navBar/navBar";
import {$iconDefaultDoctor} from "../findDoctor/assets/assets";
import SectionHeader from "./components/sectionHeader/sectionHeader";
import RecentRatting from "./components/ratting/recentRatting";

export default function DoctorCard() {
    const $previewPhotosButton = (
        <button type={"button"} className={"text-base max-w-max text-blue-600 font-medium border-blue-600 border-b border-dotted hover:border-solid"}>7 Photos</button>
    )
    const $avatar = (
        <div className={"flex flex-col items-center justify-center space-y-2 flex-none"}>
            <div className={"h-32 w-32 p-2 flex items-center justify-center flex flex-none relative"}>
                {$iconDefaultDoctor}
            </div>
            {$previewPhotosButton}
        </div>
    )

    const $appointmentTypeList = (
        <div className={"w-full flex flex-row items-center space-x-4 mt-4"}>
            <div className={"flex flex-row items-center px-2 py-1 rounded-full bg-gray-200 space-x-2"}>
                <i className="fas text-blue-500 text-xl fa-user-circle"></i>
                <span className={"text-sm text-primary-focus font-medium"}>In-person visits</span>
            </div>

            <div className={"flex flex-row items-center px-2 py-1 rounded-full bg-gray-200 space-x-2"}>
                <div className={"w-5 h-5 rounded-full bg-pink-500 flex flex-row items-center justify-center"}>
                    <i className="fas fa-video text-white text-xs"></i>
                </div>
                <span className={"text-sm text-primary-focus font-medium"}>Video visits</span>
            </div>
        </div>
    )
    const $nameAndSpecialtyAndAddress = (
        <div className={"w-full space-y-1"}>
            <p className={"font-bold text-5xl text-primary-focus"}>{"Dr. R. Sam Suri, MD"}</p>
            <p className={"text-xl text-primary-focus"}>{"Cardiologist, Internist, Primary Care Doctor"}</p>
            <p className={"text-xl text-gray-400"}>{"Fremont, CA"}</p>
        </div>
    )
    const $basicInfo = (
        <div className={"flex flex-row space-x-8"}>
            {$avatar}
            <div className={"flex flex-row items-center flex-col"}>
                {$nameAndSpecialtyAndAddress}
                {$appointmentTypeList}
            </div>
        </div>
    )

    const $sectionHeader = (
        <SectionHeader />
    )

    const $newPatientAppointmentsTips = (
        <div className={'flex flex-row space-x-2 py-4 border-b border-gray-100'}>
            <i className="fas fa-calendar-alt text-pink-500 mt-1"></i>
            <div className={''}>
                <p className={'text-sm text-primary-focus font-medium'}>New patient appointments</p>
                <p className={'text-sm text-primary-focus'}>Appointments available for new patients on ZenDoc</p>
            </div>
        </div>
    )

    const $recenterRattingView = (
        <RecentRatting />
    )

    return (
        <div className={"w-full"}>
            <NavBar />
            <div className={"flex flex-col items-center"}>
                <div className={'container px-8 py-4 flex flex-row'}>
                    <div className={'w-3/5 space-y-4'}>
                        {$basicInfo}
                        {$sectionHeader}
                        {$newPatientAppointmentsTips}
                        {$recenterRattingView}
                    </div>
                    <div className={'w-2/5 h-96 bg-blue-400'}>

                    </div>
                </div>
            </div>
        </div>
    )
}