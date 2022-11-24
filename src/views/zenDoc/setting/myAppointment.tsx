import React, {useState} from "react";
import {ButtonStatus} from "../../../components/buttons/enum";
import Button from "../../../components/buttons/button";

export default function MyAppointment() {
    const [data] = useState([0, 1, 2, 3, 4, 5])
    const $title = (
        <p className={"text-2xl font-bold text-primary-focus"}>My Appointments</p>
    )

    const $rows = data.map((value) => {
        return (
            <tr className={"border-b"} key={value}>
                <td className={"px-4 py-4"}>08:00, 03/04/2022</td>
                <td className={"px-4 py-4"}>Malcolm Lockyer</td>
                <td className={"px-4 py-4"}>N/A</td>
                <td className={"px-4 py-4"}>Completed</td>
            </tr>
        )
    })

    const $table = (
        <table className="w-full table-auto">
            <thead className={"bg-gray-200"}>
                <tr className={"px-4"}>
                    <th className={"text-left py-4 px-4"}>Date Time</th>
                    <th className={"text-left py-4 px-4"}>Doctor</th>
                    <th className={"text-left py-4 px-4"}>Address</th>
                    <th className={"text-left py-4 px-4"}>Status</th>
                </tr>
            </thead>
            <tbody>
                {$rows}
            </tbody>
        </table>
    )

    const $pageButtons = (
        <div className={"w-full flex flex-row items-center space-x-8"}>
            <Button status={ButtonStatus.primary } onClick={() => {
                //
            }}>
                <i className="fas fa-chevron-left"></i>
            </Button>

            <Button status={ButtonStatus.primary} onClick={() => {
                //
            }}>
                <i className="fas fa-chevron-right"></i>
            </Button>
        </div>
    )

    return (
        <div className={"w-full h-full space-y-8"}>
            {$title}
            {$table}
            {$pageButtons}
        </div>
    )
}
