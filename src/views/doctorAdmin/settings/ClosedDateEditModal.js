import {Dialog, Transition} from '@headlessui/react'
import React, {Fragment, useState} from 'react'
import DateTimeListBox from "./DateTimeListBox";
import {APM, TimeFormat} from "../../../utils/constant/Enum";
import {calcDropdownListDataSource, DateTimePoint, getNextEndTimeRange} from "./SettingsService";
import moment from "moment";

export default function ClosedDateEditModal({isOpen, closeModal, onConfirm}) {
    const [closedDateSettings, setClosedDateSettings] = useState({
        startDate: moment().format(TimeFormat.YYYYMMDD),
        endDate: moment().format(TimeFormat.YYYYMMDD),
        amStartTime: '09:00',
        amEndTime: '12:00',
        pmStartTime: '01:00',
        pmEndTime: '06:00',
    })
    const [isShowMoreOptions, setIsShowMoreOptions] = useState(false)
    const renderEachDateTimeGroup = (title, duration, startTime, endTime,
                                     selectedStartTime, selectedEndTime, onListBoxChange) => {
        const dateTimeDataSource = calcDropdownListDataSource(startTime, endTime, duration)
        const endTimeDataSource = getNextEndTimeRange(selectedStartTime, dateTimeDataSource)
        return <div className={'z-50 flex flex-row items-center'}>
            <p className={'text-sm font-medium mr-4'}>{title}</p>
            <DateTimeListBox
                isDisabled={false}
                dataSource={dateTimeDataSource.slice(0, dateTimeDataSource.length - 1)}
                selected={selectedStartTime}
                onChangeValue={(value) => {
                    onListBoxChange && onListBoxChange(DateTimePoint.StartTime, value)
                }}
            />
            <p className={'mx-2 text-sm text-base-black font-semibold'}>{' to '}</p>
            <DateTimeListBox
                isDisabled={false}
                dataSource={endTimeDataSource}
                selected={selectedEndTime}
                onChangeValue={(value) => {
                    onListBoxChange && onListBoxChange(DateTimePoint.EndTime, value)
                }}
            />
            <div className={'h-full w-4'}/>
        </div>
    }

    const onListBoxChange = (apm, dateTimePoint, value) => {
        if (apm === APM.AM) {
            if (dateTimePoint === DateTimePoint.StartTime) {
                setClosedDateSettings({...closedDateSettings, amStartTime: value})
            }else if (dateTimePoint === DateTimePoint.EndTime) {
                setClosedDateSettings({...closedDateSettings, amEndTime: value})
            }
        }else {
            if (dateTimePoint === DateTimePoint.StartTime) {
                setClosedDateSettings({...closedDateSettings, pmStartTime: value})
            }else if (dateTimePoint === DateTimePoint.EndTime) {
                setClosedDateSettings({...closedDateSettings, pmEndTime: value})
            }
        }
    }

    const onAppointmentTypeChange = (apm, value) => {
        if (apm === APM.AM) {
            setClosedDateSettings({...closedDateSettings, amAppointmentType: value})
        } else if (apm === APM.PM) {
            setClosedDateSettings({...closedDateSettings, pmAppointmentType: value})
        }
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
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
                                {/*<div className="mt-2">*/}
                                {/*    <p className="text-sm text-gray-500">*/}
                                {/*        Your payment has been successfully submitted. We’ve sent you*/}
                                {/*        an email with all of the details of your order.*/}
                                {/*    </p>*/}
                                {/*</div>*/}
                                <div className={'w-full mt-4'}>
                                    <div className={'w-full px-0 flex flex-row items-center justify-between'}>
                                        <input value={closedDateSettings.startDate} onChange={(e) => {
                                            if (moment(closedDateSettings.endDate, TimeFormat.YYYYMMDD).isBefore(moment(e.target.value, TimeFormat.YYYYMMDD))) {
                                                setClosedDateSettings({...closedDateSettings, startDate: e.target.value, endDate: e.target.value})
                                            }else {
                                                setClosedDateSettings({...closedDateSettings, startDate: e.target.value})
                                            }

                                        }} type={'date'} placeholder={'Start-Date'} className={'h-10 w-full border border-gray-200 rounded px-2 text-left'}/>
                                        <p className={'flex-none text-sm mx-2 text-base-black'}>to</p>
                                        <input onChange={(e) => {
                                            setClosedDateSettings({...closedDateSettings, endDate: e.target.value})
                                        }} min={closedDateSettings.startDate} value={closedDateSettings.endDate} type={'date'} placeholder={'End-Date'} className={'h-10 w-full border border-gray-200 rounded px-2 text-left'}/>
                                    </div>
                                    <div className={'w-full mt-2 flex flex-row items-center justify-between'}>
                                        <div>
                                            <label className="inline-flex items-center">
                                                <input type="checkbox" className="form-checkbox" checked={!isShowMoreOptions} onChange={() => {
                                                    setIsShowMoreOptions(false)
                                                }}/>
                                                    <span className="ml-2 text-sm font-medium">All Day Long</span>
                                            </label>
                                        </div>
                                        <button onClick={() => {
                                            setIsShowMoreOptions(!isShowMoreOptions)
                                        }} type={'button'} className={'py-2 px-4 hover:bg-gray-200'}>
                                            <p className={'text-sm font-medium text-primary'}>{isShowMoreOptions ? '- Hide options' : '+ More Options'}</p>
                                        </button>
                                    </div>

                                    <div className={`mt-4 ${isShowMoreOptions ? '' : 'hidden'}`}>
                                        {renderEachDateTimeGroup('AM', 15,'09:00', "12:00",
                                            closedDateSettings.amStartTime, closedDateSettings.amEndTime,
                                            (datePoint, value) => {
                                                onListBoxChange(APM.AM, datePoint, value)
                                            }, (value) => {
                                                onAppointmentTypeChange(APM.AM, value)
                                            }
                                        )}
                                        <div className={'h-4 w-full'}/>
                                        {renderEachDateTimeGroup('PM', 15,'01:00', "06:00",
                                            closedDateSettings.pmStartTime, closedDateSettings.pmEndTime,
                                            (datePoint, value) => {
                                                onListBoxChange(APM.PM, datePoint, value)
                                            }, (value) => {
                                                onAppointmentTypeChange(APM.PM, value)
                                            }
                                        )}
                                    </div>
                                </div>

                                <div className={`${isShowMoreOptions ? 'mt-8' : 'mt-4'} flex flex-row items-center justify-end`}>
                                    <button
                                        type="button"
                                        className="mr-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-focus focus:outline-none"
                                        onClick={() => {
                                            onConfirm(closedDateSettings)
                                        }}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
