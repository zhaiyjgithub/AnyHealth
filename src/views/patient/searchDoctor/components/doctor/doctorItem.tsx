import React, {useState} from "react";
import DoctorInformation from "./information/doctorInformation";
import Timeslots, {TimeSlot} from "./timeslots/timeslots";
import {DoctorInfo} from "../../model/doctor";

interface IProps {
    doctorInfo: DoctorInfo,
    onViewAllAvailability: () => void,
    onClickTimeSlot: (timeSlot: TimeSlot) => void
}

export default function DoctorItem(props: IProps) {
    const [active, setActive] = useState<boolean>(false)
    const {doctorInfo, onViewAllAvailability, onClickTimeSlot} = props

    const $doctorInfoView = (<DoctorInformation active={active} doctorInfo={doctorInfo}/>)
    const $timeslotsView = (<Timeslots timeSlotsPerDay={doctorInfo.timeSlotsPerDay} onClick={onClickTimeSlot}/>)
    const $viewAllAvailability = (
        <div className={"w-full flex flex-row items-center justify-end mt-4 px-12"}>
            <button type={"button"} className={"text-base text-blue-600 underline"} onClick={() => {
                onViewAllAvailability && onViewAllAvailability()
            }}>
                View all availability
            </button>
        </div>
    )

    return (
        <div className={"w-full py-4 border-b"}>
            <div onMouseEnter={() => {
                setActive(true)
            }} onMouseLeave={() => {
                setActive(false)
            }} className={"w-full flex flex-row"}>
                {$doctorInfoView}
                {$timeslotsView}
            </div>
            {$viewAllAvailability}
        </div>

    )
}
