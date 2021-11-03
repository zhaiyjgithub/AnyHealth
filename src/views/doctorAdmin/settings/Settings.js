import SettingsHeader from "./SettingsHeader";
import ScheduleSettings from "./schedule/ScheduleSettings";
import {useState} from "react";
import ClosedDateSettings from "./closedDate/ClosedDateSettings";

const PageType = {
    workingHour: 0,
    closedDate: 1
}

export default function Settings() {
    const [page, setPage] = useState(PageType.workingHour)
    const [isEditClosedDate, setIsEditClosedDate] = useState(false)

    const onCloseModal = () => {
        setIsEditClosedDate(false)
    }

    return (
        <div className={'w-full h-full bg-white'}>
            <SettingsHeader />
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
            {page === PageType.workingHour ? <ScheduleSettings /> : <ClosedDateSettings />}
        </div>
    )
}