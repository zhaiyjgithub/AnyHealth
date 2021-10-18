import SettingsHeader from "./SettingsHeader";
import ScheduleSettings from "./ScheduleSettings";
import {useState} from "react";
import ClosedDateSettings from "./ClosedDateSettings";

const PageType = {
    workingHour: 0,
    closedDate: 1
}

export default function Settings() {
    const [page, setPage] = useState(PageType.workingHour)
    const [isEditWorkingHour, setIsEditWorkingHour] = useState(false)
    const [isEditClosedDate, setIsEditClosedDate] = useState(false)

    const onCloseModal = () => {
        setIsEditClosedDate(false)
    }

    const saveWorkingHours = () => {
        setIsEditWorkingHour(false)
    }

    const renderAddNewClosedDateHeaderButtons = () => {
        return (
            <button type={'button'} onClick={() => {
                setIsEditClosedDate(true)
            }} className={'rounded bg-primary hover:bg-primary-focus uppercase'}>
                <p className={'px-4 py-2 font-semibold text-white '}>{'Add'}</p>
            </button>
        )
    }

    const renderWorkingHoursHeaderConfirmButtons = () => {
        return (
           <div className={'flex flex-row items-center justify-center'}>
               <button onClick={() => {
                   saveWorkingHours()
               }} type={'button'} className={'rounded bg-primary hover:bg-primary-focus'}>
                   <p className={'px-4 py-2 font-semibold text-white uppercase'}>{'Confirm'}</p>
               </button>

               <button onClick={() => {
                   setIsEditWorkingHour(false)
               }} type={'button'} className={'ml-4 rounded bg-white border hover:bg-gray-200'}>
                   <p className={'px-4 py-2 font-semibold text-base-black uppercase'}>{'Cancel'}</p>
               </button>
           </div>
        )
    }

    const renderWorkingHoursHeaderEditButtons = () => {
        return (
            <div className={'flex flex-row items-center justify-center'}>
                <button onClick={setIsEditWorkingHour} type={'button'} className={'rounded bg-primary hover:bg-primary-focus'}>
                    <p className={'px-4 py-2 font-semibold text-white uppercase'}>{'Edit'}</p>
                </button>
            </div>
        )
    }

    const renderHeaderButtonsByType = (page) => {
        if (page === PageType.workingHour) {
            if (!isEditWorkingHour) {
                return renderWorkingHoursHeaderEditButtons()
            }else {
                return renderWorkingHoursHeaderConfirmButtons()
            }
        }else {
            return renderAddNewClosedDateHeaderButtons()
        }
    }

    return (
        <div className={'w-full h-full bg-white'}>
            <SettingsHeader >
                {renderHeaderButtonsByType(page)}
            </SettingsHeader>
            <div className={'w-full items-center flex flex-row px-4 border-b'}>
                <button onClick={() => {
                    setPage(PageType.workingHour)
                }} type={'button'} className={`p-4 border-b-4 ${page === PageType.workingHour ? 'border-primary' : 'border-transparent'}`}>
                    <p className={`font-mono text-base text-base-black ${page === PageType.workingHour ? 'font-semibold' : 'font-base'}`}>{'Working Hours'}</p>
                </button>

                <button onClick={() => {
                    setPage(PageType.closedDate)
                }} type={'button'} className={`p-4 border-b-4 ${page === PageType.closedDate ? 'border-primary' : 'border-transparent'}`}>
                    <p className={`font-mono text-base text-base-black ${page === PageType.closedDate ? 'font-semibold' : 'font-base'}`}>{'Closed Date'}</p>
                </button>
            </div>
            {page === PageType.workingHour ? <ScheduleSettings isEdit={isEditWorkingHour}/> : <ClosedDateSettings isOpenModal={isEditClosedDate} onCloseModal={onCloseModal}/>}
        </div>
    )
}