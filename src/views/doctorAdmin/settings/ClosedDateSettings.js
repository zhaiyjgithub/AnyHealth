import React, {useState} from "react";
import ClosedDateEditModal from "./ClosedDateEditModal";
import CustomModal, {CustomModalAction} from "../../../components/modal/CustomModal";

export default function ClosedDateSettings({isOpenModal, onCloseModal}) {
    const [settingsList, setSettingsList] = useState([])
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(-1)

    const onCloseDeleteModal = () => {
        setIsShowDeleteModal(false)
    }

    const onShowDeleteModal = (index) => {
        setSelectedDeleteIndex(index)
        setIsShowDeleteModal(true)
    }

    const closeModal = () => {
        onCloseModal && onCloseModal(false)
    }

    const onConfirm = (closedDateSettings) => {
        onCloseModal && onCloseModal(false)
        if (closedDateSettings) {
            setSettingsList([].concat(settingsList).concat([closedDateSettings]))
        }
    }

    const onDelete = () => {
        const list = settingsList.filter((item, idx) => {
            return idx !== selectedDeleteIndex
        })
        setSettingsList(list)
        onCloseDeleteModal()
    }

    const renderEachDate = (settings, idx) => {
        return <tr className={'border-b'}>
            <td>
               <div className={'flex flex-row items-center justify-center my-5 ml-4'}>
                   <i className="fas fa-user-clock"></i>
               </div>
            </td>
            <td>
               <div className={'flex flex-row items-center justify-center my-5'}>
                   <p className={'text-sm font-semibold text-base-black'}>{settings.startDate}{' to '}{settings.endDate}</p>
               </div>
            </td>
            <td>
               <div className={'flex flex-row items-center justify-center px-8 my-5'}>
                   <p className={'text-sm font-semibold text-base-black'}>{settings.amStartTime}{' to '}{settings.amEndTime}</p>
               </div>
            </td>
            <td>
                <div className={'flex flex-row items-center justify-center my-5'}>
                    <p className={'text-sm font-semibold text-base-black'}>{settings.pmStartTime}{' to '}{settings.pmEndTime}</p>
                </div>
            </td>
            <td>
                <div className={'flex flex-row items-center justify-center my-5 mr-4'}>
                    <button onClick={() => {
                        onShowDeleteModal(idx)
                    }} type={'button'} className={'px-4 py-2 hover:bg-gray-200'}>
                        <i className="far fa-trash-alt text-red-400"></i>
                    </button>
                </div>
            </td>
        </tr>
    }
    return (
        <div className={'mt-8'}>
            <table className={`w-full ${!settingsList.length ? 'hidden' : ''}`}>
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
                    {settingsList.map((settings, idx) => {
                        return renderEachDate(settings, idx)
                    })}
                </tbody>
            </table>

            <ClosedDateEditModal isOpen={isOpenModal} closeModal={closeModal} onConfirm={onConfirm}/>
            <CustomModal buttons={[
                {type: CustomModalAction.Cancel, title: 'Cancel', action: onCloseDeleteModal},
                {type: CustomModalAction.Danger, title: 'Delete', action: onDelete},
            ]} isOpen={isShowDeleteModal} title={'Delete closed date'} description={'Are you sure to delete closed date?'} closeModal={onCloseDeleteModal} />
        </div>
    )
}