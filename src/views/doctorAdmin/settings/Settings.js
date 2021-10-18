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

    const addNewClosedDateHeaderButtons = () => {
        return (
            <button type={'button'} className={'rounded bg-primary hover:bg-primary-focus'}>
                <p className={'px-4 py-2 font-semibold text-white '}>{'Add'}</p>
            </button>
        )
    }

    const workingHoursHeaderEditButtons = () => {
        return (
           <div className={'flex flex-row items-center justify-center'}>
               <button type={'button'} className={'rounded bg-primary hover:bg-primary-focus'}>
                   <p className={'px-4 py-2 font-semibold text-white '}>{'Confirm'}</p>
               </button>

               <button type={'button'} className={'ml-4 rounded bg-white border hover:bg-gray-200'}>
                   <p className={'px-4 py-2 font-semibold text-base-black '}>{'Cancel'}</p>
               </button>
           </div>
        )
    }

    return (
        <div className={'w-full h-full bg-white'}>
            <SettingsHeader >
                {workingHoursHeaderEditButtons()}
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
            {page === PageType.workingHour ? <ScheduleSettings /> : <ClosedDateSettings />}
        </div>
    )
}