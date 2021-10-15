import React, { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import DateTimeListBox from "./DateTimeListBox";
import {mySettings} from './settingsData'
import {APM, AppointmentType, TimeFormat, WeekDay} from "../../../utils/constant/Enum";
import moment from "moment";
import AppointmentTypeListBox from "./AppointmentTypeListBox";

const DateTimePoint = {
    StartTime: 0,
    EndTime: 1
}

export default function Settings() {
    const [isEdit, setIsEdit] = useState(true)
    const [userSettings, setUserSettings] = useState(mySettings)
    const [mondayAmSelectedStartTime, setMondayAmSelectedStartTime] = useState(mySettings.mondayAmStartTime)
    const [mondayAmSelectedEndTime, setMondayAmSelectedEndTime] = useState(mySettings.mondayAmEndTime)
    const [mondayAmSelectedAppointmentType, setMondayAmSelectedAppointmentType] = useState(mySettings.mondayAmAppointmentType)

    const [mondayPmSelectedStartTime, setMondayPmSelectedStartTime] = useState(mySettings.mondayPmStartTime)
    const [mondayPmSelectedEndTime, setMondayPmSelectedEndTime] = useState(mySettings.mondayPmEndTime)
    const [mondayPmSelectedAppointmentType, setMondayPmSelectedAppointmentType] = useState(mySettings.mondayPmAppointmentType)

    const weekDayNames = ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dateTimeDateSource = [{title: '08:00', value: "08:00"}, {title: '08:00', value: "08:00"}, {title: '08:00', value: "08:00"}]

    useEffect(() => {
        const list = calcDropdownListDataSource('08:00', "12:00", 15)
        console.log(list)
    }, [])

    const calcDropdownListDataSource = (startTime, endTime, duration) => {
        const regx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        if (!regx.test(startTime) || !regx.test(endTime)) {
            console.error("start time or end time format error", startTime, endTime)
            return
        }
        const startMinutes = parseInt(startTime.slice(0, 2))*60 + parseInt(startTime.slice(3, 4))
        const endMinutes = parseInt(endTime.slice(0, 2))*60 + parseInt(endTime.slice(3, 4))
        const list = []
        for (let i = startMinutes; i <= endMinutes; i += duration) {
            const dateTime = convertMinutesToDateTimeString(i)
            list.push({title: dateTime, value: dateTime})
        }
        return list
    }

    const convertMinutesToDateTimeString = (minutes) => {
        const hour = parseInt((minutes/60) + '')
        const min = parseInt((minutes%60) + '')
        return (hour < 10 ? '0' + hour : hour) + ':' +  (min < 10 ? '0' + min : min)
    }

    const renderBaseSwitch = (isEdit, checked, onChange) => {
        return <Switch
            checked={checked}
            onChange={onChange}
            className={`${
                checked ? 'bg-primary' : 'bg-gray-200'
            } ${isEdit ? '' : 'hidden'} relative inline-flex items-center h-6 rounded-full w-11 mr-4`}
        >
                            <span
                                className={`${
                                    checked ? 'translate-x-6' : 'translate-x-1'
                                } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
        </Switch>
    }

    const renderEachDateTimeGroup = (isEdit, duration, isEnable, startTime, endTime,
                                     selectedStartTime, selectedEndTime, appointmentType, onSwitchChange, onListBoxChange, onAppointmentTypeChange) => {
        const dateTimeDataSource = calcDropdownListDataSource(startTime, endTime, duration)
        const endTimeDataSource = getNextEndTimeRange(selectedStartTime, dateTimeDataSource)
        return <div className={'flex flex-row items-center'}>
            {renderBaseSwitch(isEdit, isEnable, onSwitchChange)}
            <DateTimeListBox
                isDisabled={!isEdit}
                dataSource={dateTimeDataSource.slice(0, dateTimeDataSource.length - 1)}
                selected={selectedStartTime}
                onChangeValue={(value) => {
                    onListBoxChange && onListBoxChange(DateTimePoint.StartTime, value)
                }}
            />
            <p className={'mx-2 text-sm text-base-black font-semibold'}>{' to '}</p>
            <DateTimeListBox
                isDisabled={!isEdit}
                dataSource={endTimeDataSource}
                selected={selectedEndTime}
                onChangeValue={(value) => {
                    onListBoxChange && onListBoxChange(DateTimePoint.EndTime, value)
                }}
            />
            <div className={'h-full w-4'}/>
            <AppointmentTypeListBox
                isDisabled={!isEdit}
                dataSource={[{title: 'In-Clinic', value: AppointmentType.InClinic,}, {title: 'Virtual', value: AppointmentType.Virtual,}]}
                selected={appointmentType}
                onChangeValue={onAppointmentTypeChange}
            />
        </div>
    }

    const getNextEndTimeRange = (startTime, dateTimeDataSource) => {
        const prefix = '2000-01-01 '
        const startTimeMoment = moment(prefix + startTime, TimeFormat.YYYYMMDDHHmm)
        return dateTimeDataSource.filter(({title}) => {
            const endTimeMoment = moment(prefix + title, TimeFormat.YYYYMMDDHHmm)
            return endTimeMoment.isAfter(startTimeMoment)
        })
    }

    const renderEachDayWorkingHourItem = (isEdit, weekDay, duration,
                                   isAmEnable,  amStartTime, amEndTime, amAppointmentType,
                                   isPmEnable, pmStartTime, pmEndTime, pmAppointmentType,
                                   onSwitchChange, onListBoxChange, onAppointmentTypeChange ) => {
        return (
            <tr>
                <td>
                    <p className={'mx-4 font-semibold text-black'}>{weekDayNames[weekDay]}</p>
                </td>
                <td>
                    {renderEachDateTimeGroup(isEdit, duration, isAmEnable,
                        amStartTime, amEndTime,
                        mondayAmSelectedStartTime, mondayAmSelectedEndTime,
                        amAppointmentType,
                        (dateTimePoint, value) => {
                        onSwitchChange && onSwitchChange(weekDay, APM.AM, dateTimePoint, value)
                    }, (dateTimePoint, value) => {
                        onListBoxChange && onListBoxChange(weekDay, APM.AM, dateTimePoint, value)
                    }, (value) => {
                        onAppointmentTypeChange && onAppointmentTypeChange(weekDay, APM.AM, value)
                    })}
                </td>
                <td>
                    <div className={'w-px h-6 bg-gray-400 mx-5'}/>
                </td>
                <td>
                    {renderEachDateTimeGroup(isEdit, duration, isPmEnable,
                        pmStartTime, pmEndTime,
                        mondayPmSelectedStartTime, mondayPmSelectedEndTime,
                        pmAppointmentType,
                        (dateTimePoint, value) => {
                        onSwitchChange && onSwitchChange(weekDay, APM.PM, dateTimePoint, value)
                    }, (dateTimePoint, value) => {
                        onListBoxChange && onListBoxChange(weekDay, APM.PM, dateTimePoint, value)
                    }, (value) => {
                            onAppointmentTypeChange && onAppointmentTypeChange(weekDay, APM.PM, value)
                    })}
                </td>
            </tr>
        )
    }

    const onSwitchChange = (weekday, apm, value) => {
        if (weekday === WeekDay.Monday) {
            userSettings.mondayAmIsEnable = !userSettings.mondayAmIsEnable
        }
        setUserSettings({...userSettings})
    }

    const onListBoxChange = (weekday, apm, dateTimePoint, value) => {
        if (weekday === WeekDay.Monday) {
            if (apm === APM.AM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setMondayAmSelectedStartTime(value)
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setMondayAmSelectedEndTime(value)
                }
            }else if (apm === APM.PM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setMondayPmSelectedStartTime(value)
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setMondayPmSelectedEndTime(value)
                }
            }
        }
    }

    const onAppointmentTypeChange = (weekday, apm, value) => {
        console.log(weekday, apm, value)
        if (weekday === WeekDay.Monday) {
            if (apm === APM.AM) {
                setMondayAmSelectedAppointmentType(value)
            }else if (apm === APM.PM) {
                setMondayPmSelectedAppointmentType(value)
            }
        }
    }

    return (
        <div className={'w-full h-screen bg-white'}>
            <div className={'m-4 border-b'}>
                <h1>Settings</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>
                                <p className={'font-mono text-md text-base-black font-semibold py-2'}>AM</p>
                            </th>
                            <th></th>
                            <th>
                                <p className={'font-mono text-md text-base-black font-semibold py-2'}>PM</p>
                            </th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td>Sum</td>
                            <td>$180</td>
                        </tr>
                    </tfoot>
                    <tbody>
                        {renderEachDayWorkingHourItem(isEdit, WeekDay.Monday, userSettings.durationPerSlot,
                            userSettings.mondayAmIsEnable, userSettings.mondayAmStartTime, userSettings.mondayAmEndTime, mondayAmSelectedAppointmentType,
                            userSettings.mondayPmIsEnable, userSettings.mondayPmStartTime, userSettings.mondayPmEndTime, mondayPmSelectedAppointmentType,
                            onSwitchChange, onListBoxChange, onAppointmentTypeChange
                        )}
                        <tr>
                            <td>February</td>
                            <td>$80</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}