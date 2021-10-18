import {WeekDay} from "../../../utils/constant/Enum";
import {mySettings} from "./settingsData";
import React, {useState} from "react";
import ClosedDateEditModal from "./ClosedDateEditModal";

export default function ClosedDateSettings({isOpenModal, onCloseModal}) {

    const closeModal = () => {
        onCloseModal && onCloseModal(false)
    }
    const renderEachDate = () => {
        return <tr className={'border-b'}>
            <td>
               <div className={'flex flex-row items-center justify-center my-5 ml-4'}>
                   <i className="fas fa-user-clock"></i>
               </div>
            </td>
            <td>
               <div className={'flex flex-row items-center justify-center my-5'}>
                   <p className={'text-sm font-semibold text-base-black'}>01/01/2000</p>
               </div>
            </td>
            <td>
               <div className={'flex flex-row items-center justify-center px-8 my-5'}>
                   <p className={'text-sm font-semibold text-base-black'}>09:00</p>
                   <p className={'text-sm font-semibold text-base-black mx-2'}>to</p>
                   <p className={'text-sm font-semibold text-base-black'}>12:00</p>
               </div>
            </td>
            <td>
                <div className={'flex flex-row items-center justify-center my-5'}>
                    <p className={'text-sm font-semibold text-base-black'}>01:00</p>
                    <p className={'text-sm font-semibold text-base-black mx-2'}>to</p>
                    <p className={'text-sm font-semibold text-base-black'}>06:00</p>
                </div>
            </td>
            <td>
                <div className={'flex flex-row items-center justify-center my-5 mr-4'}>
                    <i className="far fa-trash-alt text-red-400"></i>
                </div>
            </td>
        </tr>
    }
    return (
        <div className={'mt-8'}>
            <table className={'w-full'}>
                <thead>
                <tr>
                    <th></th>
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
                    {renderEachDate()}
                    {renderEachDate()}
                </tbody>
            </table>

            <ClosedDateEditModal isOpen={isOpenModal} closeModal={closeModal}/>
        </div>
    )
}