import React from "react";
import {Appointment} from "../../../../patient/appointment/types";

interface IProps {
    numberPerSlots: number
    data: Array<Appointment>
    timeLine: string
}

export default function AppointmentRow(props: IProps) {
    const {numberPerSlots, data, timeLine} = props
    const colsNumber = numberPerSlots >= 3 ? numberPerSlots : 3

    const $patientCard = (photo: string, name: string, ) => {
        return (
            <div className={"flex flex-col space-y-1 p-4"}>
                <div className={"flex"}>
                    <div className={"flex flex-row items-center space-x-2"}>
                        <img src={"https://i.pravatar.cc/150?img=45"} className={"h-12 w-12 rounded-full border-2 border-white-400 bg-blue-300"}/>
                        <p className={"font-bold font-lg text-primary-focus"}>{name}</p>
                    </div>
                </div>

                <div className={"flex flex-row items-center space-x-2"}>
                    <p className={"font-semibold text-sm text-primary-focus"}>{"Female"}</p>
                    <p className={"font-semibild text-sm text-primary-focus"}>{"06/06/1998"}</p>
                </div>

                <p className={"w-full text-left font-semibild text-sm text-primary-focus"}>{"Last Visit: 06/07/2022"}</p>

                <div className={"w-full text-left"}>
                    <p className={"font-bold text-sm text-primary-focus italic"}>Memo:</p>
                    <p className={"font-semibild text-sm text-primary-focus"}>This is a test memo.</p>
                </div>
            </div>
        )
    }

    const $timeIndex = (
        <p className={"absolute text-xs w-10 -left-10 -top-2"}>{timeLine}</p>
    )

    const $defaultItem = (
        <button type={"button"} className={"relative w-full h-14 bg-white hover:bg-base-200 border-b"}>
            {$timeIndex}
        </button>
    )

    const $listView = (
        <button onClick={() => {
            alert(2)
        }} type={"button"} className={`relative hover:bg-base-200 grid grid-cols-${colsNumber} gap-x-4 border-b p-4`}>
            {data.map((appointment, idx) => {
                const name = `${appointment.firstName} ${appointment.lastName}`
                return (
                    <button onClick={(e) => {
                        e.stopPropagation()
                        alert("1")
                    }} key={idx} type={"button"} className={`relative transition duration-150 ease-in-out flex-1 rounded-lg ${idx % 2 === 0 ? "bg-[#B3DDD1]/[0.80] hover:bg-[#B3DDD1]" : "bg-[#75cce8]/[0.80] hover:bg-[#75cce8]"}`}>
                        {$patientCard("", name)}
                    </button>
                )
            })}
            {$timeIndex}
        </button>
    )

    return (data.length ? $listView : $defaultItem)
}
