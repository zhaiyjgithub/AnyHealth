import React from "react";
import DoctorInformation from "./information/doctorInformation";
import Timeslots from "./timeslots/timeslots";
import {DoctorInfo} from "../../model/doctor";

interface IProps {
    doctorInfo: DoctorInfo
}

export default function DoctorItem(props: IProps) {
    const { doctorInfo } = props
    const $doctorInfoView = (<DoctorInformation doctorInfo={doctorInfo} />)
    const $timeslotsView = (<Timeslots timeSlotsPerDay={doctorInfo.timeSlotsPerDay}/>)
    const $viewAllAvailability = (
        <div className={"w-full flex flex-row items-center justify-end mt-4 px-12"}>
            <button type={"button"} className={"text-base text-blue-600 underline leading-snug"} onClick={() => {
                //
            }} >
                View all availability.
            </button>
        </div>
    )

    return (
        <div className={"w-full py-4 border-b"}>
            <div className={"w-full flex flex-row"}>
                {$doctorInfoView}
                {$timeslotsView}
            </div>
            {$viewAllAvailability}
        </div>

    )
}