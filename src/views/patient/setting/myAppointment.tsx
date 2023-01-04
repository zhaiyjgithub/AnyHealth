import React, {useEffect, useState} from "react";
import {ButtonStatus} from "../../../components/buttons/enum";
import Button from "../../../components/buttons/button";
import {getAppointmentByPage} from "./service";
import useUserAuth from "../user/hooks/useUserAuth";
import {AppointmentInfo, AppointmentStatus} from "../appointment/types";
import moment from "moment";
import {TimeFormat} from "../../../utils/enum/enum";

const pageSize = 10

export default function MyAppointment() {
    const [dataSource, setDataSource] = useState<Array<AppointmentInfo>>([])
    const [page, setPage] = useState(1)
    const {user} = useUserAuth()
    useEffect(() => {
        getAppointmentByPage(user.id = 2, page, pageSize, (data) => {
            setDataSource(data)
        }, () => {
            //
        })
    }, [page])
    const $title = (
        <p className={"text-2xl font-bold text-primary-focus"}>My Appointments</p>
    )

    const appointmentStatusColor = (status: AppointmentStatus) => {
        let color = "text-black"
        switch (status) {
        case AppointmentStatus.request:
            color = "text-yellow-500"
            break;
        case AppointmentStatus.confirmed:
            color = "text-blue-500"
            break;
        case AppointmentStatus.completed:
            color = "text-green-500"
            break;
        case AppointmentStatus.canceled:
            color = "text-red-500"
            break;

        default:

        }
        return color
    }

    const $rows = dataSource.map((item, idx) => {
        const aptDate = moment(new Date(item.appointmentDate)).format(TimeFormat.HHmmYYYYMMDD)
        return (
            <tr className={"border-b"} key={idx}>
                <td className={"px-4 py-4"}>{aptDate}</td>
                <td className={"px-4 py-4"}>
                    <p className={"text-semibold"}>{item.doctorFullName}</p>
                    <p className={"text-sm text-semibold text-gray-400"}>{item.doctorSpecialty}</p>
                </td>
                <td className={"px-4 py-4"}>
                    <p className={"text-blue-500 text-semibold underline "}>{item.doctorPhone}</p>
                    <p>{item.doctorAddress}</p>
                </td>
                <td className={"px-4 py-4"}>
                    <p className={` text-base ${appointmentStatusColor(item.appointmentStatus)}`}>{AppointmentStatus[item.appointmentStatus]}</p>
                </td>
            </tr>
        )
    })

    const $table = (
        <table className="w-full table-auto">
            <thead className={"bg-gray-200"}>
                <tr className={"px-4"}>
                    <th className={"text-left py-4 px-4"}>Date Time</th>
                    <th className={"text-left py-4 px-4"}>Doctor</th>
                    <th className={"text-left py-4 px-4"}>Phone/Address</th>
                    <th className={"text-left py-4 px-4"}>Status</th>
                </tr>
            </thead>
            <tbody>
                {$rows}
            </tbody>
        </table>
    )

    const nextPage = () => {
        setPage(page + 1)
    }

    const previousPage = () => {
        setPage(page - 1)
    }

    const $pageButtons = (
        <div className={"w-full flex flex-row items-center space-x-8"}>
            <Button status={page === 1 ? ButtonStatus.disabled : ButtonStatus.primary} onClick={() => {
                if (page === 1) {
                    return
                }
                previousPage()
            }}>
                <i className="fas fa-chevron-left"></i>
            </Button>

            <Button status={dataSource.length < pageSize ? ButtonStatus.disabled : ButtonStatus.primary}
                onClick={() => {
                    if (dataSource.length < pageSize) {
                        return
                    }
                    nextPage()
                }}>
                <i className="fas fa-chevron-right"></i>
            </Button>
        </div>
    )

    return (
        <div className={"w-4/5 h-full space-y-8"}>
            {$title}
            {$table}
            {$pageButtons}
        </div>
    )
}
