import React from "react";
import DoctorInformation from "./information/doctorInformation";
import Timeslots, {TimeSlot} from "./timeslots/timeslots";

export default function DoctorItem() {
    const sections: Array<Array<TimeSlot>> = [
        [{dateTime: "08:00 am"}, {dateTime: "09:00 am"}, {dateTime: "10:00 am"}, {dateTime: "11:00 am"}, {dateTime: "12:00 am"}],
        [{dateTime: "08:00 am"}, {dateTime: "09:00 am"}, {dateTime: "10:00 am"}, {dateTime: "11:00 am"}, {dateTime: "12:00 am"}],
        [{dateTime: "08:00 am"}, {dateTime: "09:00 am"}, {dateTime: "10:00 am"}, {dateTime: "11:00 am"}, {dateTime: "12:00 am"}],
        [{dateTime: "08:00 am"}, {dateTime: "09:00 am"}, {dateTime: "10:00 am"}, {dateTime: "11:00 am"}, {dateTime: "12:00 am"}],
        [{dateTime: "08:00 am"}, {dateTime: "09:00 am"}, {dateTime: "10:00 am"}, {dateTime: "11:00 am"}, {dateTime: "12:00 am"}],
    ]

    const $doctorInfoView = (<DoctorInformation />)
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
        <div className={'w-full'}>
            <div className={"w-full grid grid-cols-2"}>
                {$doctorInfoView}
                {$timeslotsView}
            </div>
            {$viewAllAvailability}
        </div>

    )
}