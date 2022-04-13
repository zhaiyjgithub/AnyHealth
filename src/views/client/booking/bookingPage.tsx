import React, {useEffect, useState} from "react";
import NavBar from "./components/navBar/navBar";
import {$iconDefaultDoctor} from "../findDoctor/assets/assets";
import {useLocation} from "react-router-dom";
import qs from "qs";
import {DoctorProfile, getDoctorProfile} from "../../doctor/profile/general/GeneralProfileService";
import {AppointmentType} from "../../../utils/enum/enum";
import {formatDateToWeekMonthDayTuple} from "../../../utils/util/dateTool";
import {parseTimeOffset} from "../findDoctor/service/searchDoctorService";

interface IRouterLocation {
    npi: string,
    date: string,
    offset: string,
    type: AppointmentType,
}

export default function BookingPage() {
    const [doctorInfo, setDoctorInfo] = useState<DoctorProfile | null>(null)
    const {search} = useLocation<IRouterLocation>()
    const { npi, date, offset, type } = qs.parse(search.replace("?", ""))

    if (!npi || !date || !offset || !type) {
        return null
    }

    useEffect(() => {
        npi && getDoctorProfile(parseInt(npi.toString(), 10), (doctorProfile) => {
            setDoctorInfo(doctorProfile)
        }, () => {
            //
        })
    }, [])

    const $avatar = (
        <div className={"h-12 w-12 rounded-full bg-red-300 flex-none"} >
            {$iconDefaultDoctor}
        </div>
    )

    const doctorName = `${doctorInfo?.credential} ${doctorInfo?.fullName} ${doctorInfo?.jobTitle}`
    const [week, month, day] = formatDateToWeekMonthDayTuple(new Date(date.toString()))

    const targetDate = new Date(date.toString())
    const initialMinutes = targetDate.getHours() * 60
    const currentOffset = initialMinutes + parseInt(offset.toString(), 10)

    const dateTime = parseTimeOffset(currentOffset >= 1440 ? currentOffset - 1440 : currentOffset)
    const appointmentDateTime = `${week}, ${month} ${day} - ${dateTime}`
    const appointmentTypeDesc = parseInt(type.toString(), 10) === AppointmentType.virtual ? "Video visit" : doctorInfo?.address
    const $info = (
        <div className={"flex-1"}>
            <p className={"text-base text-primary-focus font-bold leading-snug"}>{doctorName}</p>
            <p className={"text-sm text-primary-focus font-medium leading-snug text-left"}>{appointmentDateTime}</p>
            <p className={"text-sm text-primary-focus leading-snug text-left"}>{appointmentTypeDesc}</p>
        </div>
    )

    const $doctorBasicInfo = (
        <div className={"w-full bg-white flex flex-row items-center justify-center py-8 border-b"}>
            <div className={"w-max px-8 flex flex-row items-center space-x-2"}>
                {$avatar}
                {$info}
            </div>
        </div>
    )

    const $contentView = (
        <div className={"w-full max-w-screen-sm mt-10 md:my-28 px-8 md:px-0"}>

        </div>
    )

    return (
        <div className={"w-full min-h-screen bg-gray-100 flex flex-col items-center"}>
            <NavBar />
            {$doctorBasicInfo}
            {$contentView}
        </div>
    )
}