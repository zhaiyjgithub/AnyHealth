import {WeekDay} from "../../../utils/constant/Enum";
import {mySettings} from "./settingsData";
import React from "react";

export default function ClosedDateSettings() {
    const renderEachDate = () => {
        return <tr>
            <td >
               <div className={'flex flex-row items-center justify-center'}>
                   <p>01/01/2000</p>
               </div>
            </td>
            <td>
               <div className={'flex flex-row items-center justify-center px-8'}>
                   <p>09:00</p>
                   <p> to </p>
                   <p>12:00</p>
               </div>
            </td>
            <td>
                <div className={'flex flex-row items-center justify-center'}>
                    <p>01:00</p>
                    <p> to </p>
                    <p>06:00</p>
                </div>
            </td>
            <td>
                <div className={'flex flex-row items-center justify-center'}>
                    <p>Delete</p>
                </div>
            </td>
        </tr>
    }
    return (
        <div className={'mt-8'}>
            <table className={'w-full'}>
                <thead>
                <tr>
                    <th>
                        <p className={'font-mono text-md text-base-black font-semibold '}>Date</p>
                    </th>
                    <th>
                        <p className={'font-mono text-md text-base-black font-semibold '}>AM</p>
                    </th>
                    <th>
                        <p className={'font-mono text-md text-base-black font-semibold'}>PM</p>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody className={'w-full'}>
                    {renderEachDate()}
                </tbody>
            </table>
        </div>
    )
}