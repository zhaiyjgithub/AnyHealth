import React, {useEffect, useState} from "react";
import ClosedDateEditModal from "./closedDateEditModal";
import {ClosedDate, getClosedDateSettings, addClosedDateSettings, deleteClosedDateSettingsByID} from "./service"
import CustomModal from "../../../../components/modal/customModal";

export default function ClosedDateSettings() {
    const [settingsList, setSettingsList] = useState<Array<ClosedDate>>([])
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(-1)
    const [isOpenModal, setIsOpenModal] = useState(false)

    let npi = 1902809254

    useEffect(() => {
        getClosedDateSettings(npi, (data) => {
            setSettingsList(data)
        }, () => {
            //
        })
    }, [])

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
            addClosedDateSettings(npi, closedDateSettings, () => {
                console.log("on save")
            }, () => {
                //
            })
        }
    }

    const onDelete = () => {
        onCloseDeleteModal()
        const sid = settingsList[selectedDeleteIndex].sid
        deleteClosedDateSettingsByID(npi, sid, () => {
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
        return <tr className={"border-b"}>
            <td>
                <div className={"flex flex-row items-center justify-center my-4 ml-4"}>
                    <i className="fas fa-user-clock"></i>
                </div>
            </td>
            <td>
                <div className={"flex flex-row items-center justify-center my-4"}>
                    <p className={"text-sm font-semibold text-base-black"}>{settings.startDate}{" to "}{settings.endDate}</p>
                </div>
            </td>
            <td>
                <div className={"flex flex-row items-center justify-center px-8 my-4"}>
                    <p className={"text-sm font-semibold text-base-black"}>{formatDisplayDate(settings.amStartTime)}{" to "}{formatDisplayDate(settings.amEndTime)}</p>
                </div>
            </td>
            <td>
                <div className={"flex flex-row items-center justify-center my-4"}>
                    <p className={"text-sm font-semibold text-base-black"}>{formatDisplayDate(settings.pmStartTime)}{" to "}{formatDisplayDate(settings.pmEndTime)}</p>
                </div>
            </td>
            <td>
                <div className={"flex flex-row items-center justify-center my-4 mr-4"}>
                    <button onClick={() => {
                        onShowDeleteModal(idx)
                    }} type={"button"} className={"px-4 py-2 hover:bg-gray-200"}>
                        <i className="far fa-trash-alt text-red-400"></i>
                    </button>
                </div>
            </td>
        </tr>
    }

    return (
        <div className={"mt-8"}>
            <table className={`w-full ${!settingsList.length ? "hidden" : ""}`}>
                <thead>
                    <tr>
                        <th></th>
                        <th>
                            <p className={"font-mono text-md text-base-black font-semibold "}>Date</p>
                        </th>
                        <th>
                            <p className={"font-mono text-md text-base-black font-semibold "}>AM</p>
                        </th>
                        <th>
                            <p className={"font-mono text-md text-base-black font-semibold"}>PM</p>
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

            <button onClick={openModal} type={"button"} className={"shadow-xl bg-primary fixed right-8 bottom-8 w-14 h-14 rounded-full flex flex-row items-center justify-center hover:bg-primary-focus"}>
                <i className="fas fa-plus text-white"></i>
            </button>

            <ClosedDateEditModal isOpen={isOpenModal} onClose={closeModal} onConfirm={onConfirm}/>
            <CustomModal isOpen={isShowDeleteModal} >
                <p>Delete closed date modal</p>
            </CustomModal>
        </div>
    )
}