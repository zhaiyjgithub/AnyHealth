import React from "react";
import {Appointment} from "../types";

interface IProps {
    numberPerSlots: number,
    data: Array<Appointment>
}

export default function AppointmentRow(props: IProps) {
    const {numberPerSlots, data} = props
    const colsNumber = numberPerSlots >= 3 ? numberPerSlots : 3
    return (
        <div className={`grid grid-clos-${colsNumber} h-16 rounded bg-blue-300`}>
            {data.map((appointment, idx) => {
                return (
                    <button key={idx} type={"button"} className={'flex-1 h-full'}>
                        <p>{appointment.firstName}</p>
                    </button>
                )
            })}
        </div>
    )
}
