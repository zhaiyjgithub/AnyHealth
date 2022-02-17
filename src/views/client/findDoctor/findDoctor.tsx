import React, {useState} from "react";
import Navbar from "./components/navbar/navbar";
import {AppointmentType} from "../../../utils/enum/enum";
import Filter from "./components/filter/filter";
import Sticky from "react-sticky-el";
import WeekDayHeader from "./components/weekDayHeader/weekDayHeader";
import DoctorItem from "./components/doctor/doctorItem";

export default function FindDoctor() {
    const [apptType, setApptType] = useState<AppointmentType>(AppointmentType.anyType)

    const onChangeApptType = (type: AppointmentType) => {
        setApptType(type)
    }
    const $apptTab = (
        <div className={"flex fle-row items-center space-x-6 mt-6 px-6"}>
            <button onClick={() => {
                onChangeApptType(AppointmentType.anyType)
            }} type={"button"} className={`inline-block py-2 text-primary-focus hover:text-gray-400 text-base font-medium border-b-2 ${apptType === AppointmentType.anyType ? "border-primary-focus" : "border-transparent"}`}>
                All appointments
            </button>
            <button onClick={() => {
                onChangeApptType(AppointmentType.inClinic)
            }} type={"button"} className={`inline-block py-2 text-primary-focus hover:text-gray-400 text-base font-medium border-b-2 ${apptType === AppointmentType.inClinic ? "border-primary-focus" : "border-transparent"}`}>
                In-person
            </button>
            <div className={"flex flex-row items-center space-x-2"}>
                <button onClick={() => {
                    onChangeApptType(AppointmentType.virtual)
                }} type={"button"} className={`inline-flex flex-row items-center space-x-2 py-2 text-primary-focus hover:text-gray-400 text-base font-medium border-b-2 ${apptType === AppointmentType.virtual ? "border-primary-focus" : "border-transparent"}`}>
                    <p>Video visit</p>
                </button>
                <p className={"text-sm text-white px-1 bg-pink-500 italic uppercase rounded"}>New</p>
            </div>
        </div>
    )

    const $navBar = (<Navbar />)
    const $filter = (<div className={"mt-4 px-6"}><Filter /></div>)

    const $stickHeader = (
        <Sticky className={'mt-4'}>
            <WeekDayHeader />
        </Sticky>
    )

    const $resultList = (
        <div className={"w-full h-96 bg-white mt-4"}>
            <DoctorItem />
        </div>
    )

    const $content = (
        <div className={"w-full xl:w-3/4 border-r flex-1"}>
            {$apptTab}
            {$filter}
            {$stickHeader}
            {$resultList}
        </div>
    )
    return (
        <div className={"flex flex-col w-full min-h-screen"}>
            {$navBar}
            {$content}
        </div>
    )
}