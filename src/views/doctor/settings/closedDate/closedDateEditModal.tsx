import {Dialog, Transition} from "@headlessui/react"
import React, {Fragment, useState} from "react"
import {ClosedDate} from "./service";
import DropdownListForm from "../../../../components/form/dropdownListItem";
import {APM, TimeFormat} from "../../../../utils/enum/enum";
import {calcDropdownListDataSource, getNextEndTimeRange, DateTimePoint} from "../workingHour/service";
import moment from "moment"

interface IProps {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: (setting: ClosedDate) => void
}

export default function ClosedDateEditModal({isOpen, onClose, onConfirm}: IProps) {
    const [closedDateSettings, setClosedDateSettings] = useState<any>({
        startDate: moment().format(TimeFormat.YYYYMMDD),
        endDate: moment().format(TimeFormat.YYYYMMDD),
        amStartTime: "09:00",
        amEndTime: "12:00",
        pmStartTime: "01:00",
        pmEndTime: "06:00",
    })
    const [isShowMoreOptions, setIsShowMoreOptions] = useState(false)
    const renderEachDateTimeGroup = (title: string, duration: number, startTime: string, endTime: string,
        selectedStartTime: string, selectedEndTime: string, onListBoxChange: (dateTimePoint: DateTimePoint, value: string) => void) => {
        const dateTimeDataSource = calcDropdownListDataSource(startTime, endTime, duration)
        const endTimeDataSource = getNextEndTimeRange(selectedStartTime, dateTimeDataSource)
        return <div className={"z-50 flex flex-row items-center"}>
            <p className={"text-sm font-medium mr-4"}>{title}</p>
            <DropdownListForm id={selectedStartTime} data={dateTimeDataSource.slice(0, dateTimeDataSource.length - 1)} onChange={(value) => {
                onListBoxChange && onListBoxChange(DateTimePoint.StartTime, value)
            }} />
            <p className={"mx-2 text-sm text-base-black font-semibold"}>{" to "}</p>
            <DropdownListForm id={selectedEndTime} data={endTimeDataSource} onChange={(value) => {
                onListBoxChange && onListBoxChange(DateTimePoint.EndTime, value)
            }} />
            <div className={"h-full w-4"}/>
        </div>
    }

    const onListBoxChange = (apm: APM, dateTimePoint: DateTimePoint, value: string) => {
        if (apm === APM.AM) {
            if (dateTimePoint === DateTimePoint.StartTime) {
                setClosedDateSettings({...closedDateSettings, amStartTime: value})
            } else if (dateTimePoint === DateTimePoint.EndTime) {
                setClosedDateSettings({...closedDateSettings, amEndTime: value})
            }
        } else if (dateTimePoint === DateTimePoint.StartTime) {
            setClosedDateSettings({...closedDateSettings, pmStartTime: value})
        } else if (dateTimePoint === DateTimePoint.EndTime) {
            setClosedDateSettings({...closedDateSettings, pmEndTime: value})
        }
    }

    const $buttons = (
        <div className={`${isShowMoreOptions ? "mt-8" : "mt-4"} flex flex-row items-center justify-end`}>
            <button
                type="button"
                className="mr-4 btn btn-ghost"
                onClick={onClose}
            >
                Cancel
            </button>

            <button
                type="button"
                className={"btn btn-primary"}
                onClick={() => {
                    onConfirm(closedDateSettings)
                }}
            >
                Confirm
            </button>
        </div>
    )

    const $dateInput = (
        <div className={"w-full px-0 flex flex-row items-center justify-between h-max"}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Start Date</span>
                </label>
                <input value={closedDateSettings.startDate} min={moment().format(TimeFormat.YYYYMMDD)} type="date" placeholder="Start Date" className="input input-bordered" onChange={(e) => {
                    if (moment(closedDateSettings.endDate, TimeFormat.YYYYMMDD).isBefore(moment(e.target.value, TimeFormat.YYYYMMDD))) {
                        setClosedDateSettings({...closedDateSettings, startDate: e.target.value, endDate: e.target.value})
                    } else {
                        setClosedDateSettings({...closedDateSettings, startDate: e.target.value})
                    }
                }}/>
            </div>

            <div className={"flex flex-col justify-end"}>
                <p className={"mt-8"}>to</p>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">End Date</span>
                </label>
                <input value={closedDateSettings.endDate} type="date" placeholder="End Date" className="input input-bordered" onChange={(e) => {
                    setClosedDateSettings({...closedDateSettings, endDate: e.target.value})
                }} min={closedDateSettings.startDate}/>
            </div>
        </div>
    )

    const $options = (
        <div className={"w-full mt-2 flex flex-row items-center justify-between"}>
            <div className="form-control">
                <label className="cursor-pointer label">
                    <input type="checkbox" checked={!isShowMoreOptions} className="checkbox checkbox-primary checkbox-sm" onChange={() => {
                        setIsShowMoreOptions(false)
                    }}/>
                    <span className="text-sm  ml-2">All the day</span>
                </label>
            </div>

            <button type={"button"} onClick={() => {
                setIsShowMoreOptions(!isShowMoreOptions)
            }} className={"btn btn-sm btn-ghost text-xs font-medium text-primary"}>
                {isShowMoreOptions ? "- Hide options" : "+ More Options"}
            </button>
        </div>
    )

    const $dateTime = (
        <div className={`mt-4 ${isShowMoreOptions ? "" : "hidden"}`}>
            {renderEachDateTimeGroup("AM", 15, "09:00", "12:00",
                closedDateSettings.amStartTime, closedDateSettings.amEndTime,
                (datePoint, value) => {
                    onListBoxChange(APM.AM, datePoint, value)
                }
            )}
            <div className={"h-4 w-full"}/>
            {renderEachDateTimeGroup("PM", 15, "01:00", "06:00",
                closedDateSettings.pmStartTime, closedDateSettings.pmEndTime,
                (datePoint, value) => {
                    onListBoxChange(APM.PM, datePoint, value)
                }
            )}
        </div>
    )

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={onClose}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="border inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add new closed date
                                </Dialog.Title>
                                <div className={"w-full mt-4"}>
                                    {$dateInput}
                                    {$options}
                                    {$dateTime}
                                </div>
                                {$buttons}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
