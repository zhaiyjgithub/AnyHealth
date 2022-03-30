import React, {useState} from "react";
import DoctorInformation from "./information/doctorInformation";
import Timeslots from "./timeslots/timeslots";
import {DoctorInfo} from "../../model/doctor";
import {Link} from 'react-router-dom'

interface IProps {
    doctorInfo: DoctorInfo,
    onViewAllAvailability: () => void
}

export default function DoctorItem(props: IProps) {
    const [active, setActive] = useState<boolean>(false)
    const { doctorInfo, onViewAllAvailability } = props
    const $doctorInfoView = (<Link to={'/doctor?name=test'} className={'flex flex-1'}>
        <DoctorInformation active={active} doctorInfo={doctorInfo} />
    </Link>)
    const $timeslotsView = (<Timeslots timeSlotsPerDay={doctorInfo.timeSlotsPerDay}/>)
    const $viewAllAvailability = (
        <div className={"w-full flex flex-row items-center justify-end mt-4 px-12"}>
            <button type={"button"} className={"text-base text-blue-600 underline leading-snug"} onClick={() => {
                onViewAllAvailability && onViewAllAvailability()
            }} >
                View all availability.
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