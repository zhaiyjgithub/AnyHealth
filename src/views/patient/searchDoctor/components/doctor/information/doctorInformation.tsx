import React, {useContext} from "react";
import {DoctorInfo} from "../../../model/doctor";
import {SearchFilterContext} from "../../../searchFilterProvider";
import {AppointmentType, Gender} from "../../../../../../utils/enum/enum";
import {Link} from "react-router-dom"
import ToolTips from "./toolTips";
import doctorAvatarFemale from "../../../../../../assets/doctor-female.png"
import doctorAvatarMale from "../../../../../../assets/doctor-male.png"

interface IProps {
    active: boolean
    doctorInfo: DoctorInfo
}

export default function DoctorInformation(props: IProps) {
    const {state} = useContext(SearchFilterContext)
    const {doctorInfo, active} = props
    const $virtualVisitIcon = doctorInfo.nextAvailableDateVirtual.length ? (
        <div
            className={"absolute right-2 bottom-2 h-9 w-9 p-1.5 rounded-full bg-pink-500 border-2 border-white flex flex items-center justify-center"}>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <style type="text/css"/>
                </defs>
                <path
                    d="M960 192l-28.384 0c-16.8 0-32.928 6.624-44.928 18.432l-86.688 85.504 0-39.936c0-53.024-43.008-96-96-96l-608 0c-52.928 0-96 43.04-96 96l0 512c0 52.992 42.976 96 96 96l608 0c52.992 0 96-43.008 96-96l0-39.072 86.688 85.504c12 11.808 28.128 18.432 44.928 18.432l28.384 0c35.328 0 64-28.64 64-64l0-512.864c0-35.36-28.672-64-64-64zM96 800c-17.664 0-32-14.368-32-32l0-512c0-17.696 14.304-32 32-32l608 0c17.632 0 32 14.336 32 32l0 512c0 17.632-14.368 32-32 32l-608 0zM960 768.864l-32 0-128-128 0-0.864-32-32 0-192 160-160 32 0 0 512.864z"
                    fill="#ffffff"/>
            </svg>
        </div>
    ) : null
    const $avatar = (
        <div className={"h-32 w-32 p-2 flex items-center justify-center flex flex-none rounded-full relative overflow-hidden border-2 border-primary p-1"}>
            <img className={"w-[120px] h-[120px]"} src={doctorInfo.gender === Gender.Female ? doctorAvatarFemale : doctorAvatarMale}/>
            {$virtualVisitIcon}
        </div>
    )

    const $review = (
        <div className={"flex flex-row items-center space-x-1 mt-1"}>
            <i className="fas fa-star text-pink-400 w-4 h-4"/>
            <p className={"text-pink-400 text-sm font-medium "}>4.69</p>
            <p className={"text-gray-400 text-sm font-medium "}>(273)</p>
        </div>
    )

    const doctorName = `${doctorInfo.namePrefix} ${doctorInfo.fullName}, ${doctorInfo.jobTitle}`
    const distance = `${doctorInfo.distance.toFixed(2)} km`
    const $distanceView = (<p className={"text-sm text-gray-400 font-medium text-right mr-2"}>{distance}</p>)
    const $videoVisitTag = (
        <div className={"flex flex-row items-center space-x-1 flex-none"}>
            <p className={" text-sm px-2 border text-gray-500"}>External video visit</p>
            <div className={"w-5 h-5 flex items-center"}>
                <ToolTips/>
            </div>
        </div>
    )

    const isVideoVisitEnable = (doctorInfo.nextAvailableDateVirtual && doctorInfo.nextAvailableDateVirtual.length)
    const $tagView = () => {
        if (isVideoVisitEnable) {
            return $videoVisitTag
        }
        return $distanceView
    }

    let subTitleForAddressOrVideoVisit = ""
    let description = ""
    if ((state.appointmentType === AppointmentType.anyType ||
        state.appointmentType === AppointmentType.virtual
    ) && isVideoVisitEnable) {
        description = "New patient appointments • Also offers in-person visits"
        subTitleForAddressOrVideoVisit = "Video Visit"
    } else {
        description = "New patient appointments • Also offers video visits"
        subTitleForAddressOrVideoVisit = doctorInfo.address
    }
    const $info = (
        <div className={"flex-1"}>
            <div className={"w-full flex flex-row justify-between space-x-2"}>
                <p className={`text-xl text-primary-focus font-bold leading-none border-b-2 ${active ? "border-primary-focus" : "border-transparent"}`}>{doctorName}</p>
                {$tagView()}
            </div>
            <p className={"text-base text-primary-focus font-medium  text-left"}>{doctorInfo.specialty}</p>
            <p className={"text-base text-primary-focus  text-left"}>{subTitleForAddressOrVideoVisit}</p>
            {$review}
            <p className={"text-base text-gray-400 text-left mt-2"}>{description}</p>
        </div>
    )

    const path = `doctor/${doctorInfo.firstName}-${doctorInfo.lastName}?npi=${doctorInfo.npi}`
    return (
        <Link to={path} className={"flex flex-1"}>
            <div className={"flex-1 flex flex-row space-x-8 pl-4"}>
                {$avatar}
                {$info}
            </div>
        </Link>

    )
}
