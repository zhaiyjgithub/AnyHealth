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
    return (
        <div className={"w-full grid grid-cols-2"}>
            <DoctorInformation />
            <Timeslots sections={sections}/>
        </div>
    )
}