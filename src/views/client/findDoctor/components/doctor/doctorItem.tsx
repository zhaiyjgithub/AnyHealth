import React from "react";
import DoctorInformation from "./information/doctorInformation";
import Timeslots, {TimeSlot} from "./timeslots/timeslots";
import {Doctor} from "../../model/doctor";

interface IProps {
    doctor: Doctor
}

export default function DoctorItem(props: IProps) {
    const { doctor } = props
    const sections: Array<Array<TimeSlot>> = [
        [{dateTime: "08:00 am"}, {dateTime: "09:00 am"}, {dateTime: "10:00 am"}, {dateTime: "11:00 am"}],
        [{dateTime: "08:00 am"}, {dateTime: "09:00 am"}, {dateTime: "10:00 am"}, {dateTime: "11:00 am"}],
        [{dateTime: "08:00 am"}, {dateTime: "09:00 am"}, {dateTime: "10:00 am"}, {dateTime: "11:00 am"}],
        [{dateTime: "08:00 am"}, {dateTime: "09:00 am"}, {dateTime: "10:00 am"}, {dateTime: "11:00 am"}],
        [{dateTime: "08:00 am"}, {dateTime: "09:00 am"}, {dateTime: "10:00 am"}, {dateTime: "11:00 am"}],
    ]

    const $doctorInfoView = (<DoctorInformation doctor={doctor} />)
    const $timeslotsView = (<Timeslots sections={sections}/>)
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
            <div className={"w-full grid grid-cols-2"}>
                {$doctorInfoView}
                {$timeslotsView}
            </div>
            {$viewAllAvailability}
        </div>

    )
}