import React, {useContext, useEffect, useState} from "react";
import ClosedDateEditModal from "./closedDateEditModal";
import {ClosedDate, getClosedDateSettings, addClosedDateSettings, deleteClosedDateSettingsByID} from "./closedDateService"
import CustomModal from "../../../../components/modal/customModal";
import {DoctorInfoContext} from "../../doctorInfoContext";

export default function ClosedDateSettings() {
    const [settingsList, setSettingsList] = useState<Array<ClosedDate>>([])
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(-1)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const doctorInfo = useContext(DoctorInfoContext)

    useEffect(() => {
        getClosedDateSetting()
    }, [])

    const getClosedDateSetting = () => {
        getClosedDateSettings(doctorInfo.npi, (data) => {
            setSettingsList(data)
        }, () => {
            //
        })
    }

    const onCloseDeleteModal = () => {
        setIsShowDeleteModal(false)
    }

    const onShowDeleteModal = (index: number) => {
        setSelectedDeleteIndex(index)
        setIsShowDeleteModal(true)
    }

    const openModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const onConfirm = (closedDateSettings: ClosedDate) => {
        closeModal()
        if (closedDateSettings) {
            addClosedDateSettings(doctorInfo.npi, closedDateSettings, () => {
                getClosedDateSetting()
            }, () => {
                //
            })
        }
    }

    const onDelete = () => {
        onCloseDeleteModal()
        const sid = settingsList[selectedDeleteIndex].sid
        deleteClosedDateSettingsByID(doctorInfo.npi, sid, () => {
            const list = settingsList.filter((item, idx) => {
                return idx !== selectedDeleteIndex
            })
            setSettingsList(list)
        }, () => {
            //
        })
    }

    console.log(onDelete.toString())

    const formatDisplayDate = (dateString: string) => {
        return dateString.length ? dateString : "--"
    }

    const renderEachDate = (settings: ClosedDate, idx: number) => {
        return <tr className={"border-b hover:bg-base-200"}>
            <td>
                <div className={"flex flex-row items-center justify-center my-2 ml-4"}>
                    <i className="fas fa-user-clock"></i>
                </div>
            </td>
            <td>
                <div className={"flex flex-row items-center justify-center my-2"}>
                    <p className={"text-sm font-semibold text-neutral"}>{settings.startDate}{" to "}{settings.endDate}</p>
                </div>
            </td>
            <td>
                <div className={"flex flex-row items-center justify-center px-8 my-2"}>
                    <p className={"text-sm font-semibold text-neutral"}>{formatDisplayDate(settings.amStartTime)}{" to "}{formatDisplayDate(settings.amEndTime)}</p>
                </div>
            </td>
            <td>
                <div className={"flex flex-row items-center justify-center my-2"}>
                    <p className={"text-sm font-semibold text-neutral"}>{formatDisplayDate(settings.pmStartTime)}{" to "}{formatDisplayDate(settings.pmEndTime)}</p>
                </div>
            </td>
            <td>
                <div className={"flex flex-row items-center justify-center my-2 mr-4"}>
                    <button onClick={() => {
                        onShowDeleteModal(idx)
                    }} type={"button"} className={"px-4 py-2 hover:bg-gray-200"}>
                        <i className="far fa-trash-alt text-accent"></i>
                    </button>
                </div>
            </td>
        </tr>
    }
    
    const $table = (
        <table className={`w-full ${!settingsList.length ? "hidden" : ""}`}>
            <thead>
                <tr className={"bg-base-300 "}>
                    <th></th>
                    <th>
                        <p className={"font-mono text-md text-neutral font-semibold my-2"}>Date</p>
                    </th>
                    <th>
                        <p className={"font-mono text-md text-neutral font-semibold my-2"}>AM</p>
                    </th>
                    <th>
                        <p className={"font-mono text-md text-neutral font-semibold my-2"}>PM</p>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody className={"w-full"}>
                {settingsList.map((settings, idx) => {
                    return renderEachDate(settings, idx)
                })}
            </tbody>
        </table>
    )

    const $addButton = (
        <button onClick={openModal} type={"button"} className={"shadow-xl bg-primary fixed right-8 bottom-8 w-14 h-14 rounded-full flex flex-row items-center justify-center hover:bg-primary-focus"}>
            <i className="fas fa-plus text-white"></i>
        </button>
    )

    const $editModal = (
        <ClosedDateEditModal isOpen={isOpenModal} onClose={closeModal} onConfirm={onConfirm}/>
    )

    const deleteTitle = settingsList.length && selectedDeleteIndex !== -1 ? `${settingsList[selectedDeleteIndex].startDate} to ${settingsList[selectedDeleteIndex].endDate}` : ""
    const $deleteModal = (
        <CustomModal title={`Are you confirm to delete this closed date [${deleteTitle}] ?`}
            description={"The changes will update to your schedule instantly."}
            isOpen={isShowDeleteModal} >
            <button
                className="btn btn-ghost mr-4 btn-sm"
                onClick={onCloseDeleteModal}
            >
                Cancel
            </button>

            <button
                className="btn btn-primary btn-sm"
                onClick={onDelete}
            >
                Confirm
            </button>
        </CustomModal>
    )

    return (
        <div className={"mt-8 mb-32"}>
            {$table}
            {$addButton}
            {$editModal}
            {$deleteModal}
        </div>
    )
}