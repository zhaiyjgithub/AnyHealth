import React, { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import DateTimeListBox from "./DateTimeListBox";
import {mySettings} from './settingsData'
import {APM, WeekDay} from "../../../utils/constant/Enum";

export default function Settings() {
    const [isEdit, setIsEdit] = useState(true)
    const [userSettings, setUserSettings] = useState(mySettings)

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

    const renderEachDateTimeGroup = (isEdit, isEnable, onSwitchChange, onListBoxChange) => {
        return <div className={'flex flex-row items-center'}>
            {renderBaseSwitch(isEdit, isEnable, onSwitchChange)}
            <DateTimeListBox
                isEdit={isEdit}
                isDisabled={!isEnable}
                dataSource={dateTimeDateSource}
                selected={'08:00'}
                onChangeValue={onListBoxChange}
            />
            <p className={'mx-2 text-sm text-base-black font-semibold'}>{' to '}</p>
            <DateTimeListBox
                isEdit={isEdit}
                isDisabled={!isEnable}
                dataSource={dateTimeDateSource}
                selected={'08:00'}
                onChangeValue={onListBoxChange}
            />
        </div>
    }

    const renderWorkingHourItem = (isEdit, weekDay,
                                   isAmEnable, amStartTime, amEndTime,
                                   isPmEnable, pmStartTime, pmEndTime,
                                   onSwitchChange, onListBoxChange ) => {
        return (
            <tr>
                <td>
                    <p className={'mx-4 font-semibold text-black'}>{weekDayNames[weekDay]}</p>
                </td>
                <td>
                    {renderEachDateTimeGroup(isEdit, isAmEnable, (value) => {
                        onSwitchChange(weekDay, APM.AM, value)
                    }, (value) => {
                        onListBoxChange(weekDay, APM.AM, value)
                    })}
                </td>
                <td>
                    <div className={'w-px h-full bg-gray-400 mx-5'}/>
                </td>
                <td>
                    {renderEachDateTimeGroup(isEdit, isPmEnable, (value) => {
                        onSwitchChange(weekDay, APM.PM, value)
                    }, (value) => {
                        onListBoxChange(weekDay, APM.PM, value)
                    })}
                </td>
            </tr>
        )
    }

    const onSwitchChange = (weekday, apm, value) => {
        console.log(weekday, apm, value)
        if (weekday === WeekDay.Monday) {
            userSettings.mondayAmIsEnable = !userSettings.mondayAmIsEnable
        }
        setUserSettings({...userSettings})
    }

    const onListBoxChange = (weekday, apm, value) => {
        console.log(weekday, apm, value)
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
                        {renderWorkingHourItem(isEdit, WeekDay.Monday,
                            userSettings.mondayAmIsEnable, userSettings.mondayAmStartTime, userSettings.mondayAmEndTime,
                            userSettings.mondayPmIsEnable, userSettings.mondayPmStartTime, userSettings.mondayPmEndTime,
                            onSwitchChange, onListBoxChange
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