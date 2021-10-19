import React, {useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'
import DateTimeListBox from "./DateTimeListBox";
import {mySettings} from './settingsData'
import {APM, AppointmentType, WeekDay} from "../../../utils/constant/Enum";
import AppointmentTypeListBox from "./AppointmentTypeListBox";
import {calcDropdownListDataSource, DateTimePoint, getNextEndTimeRange} from "./SettingsService";

export default function ScheduleSettings({isEdit}) {
    const [selectedUserSettings, setSelectedUserSettings] = useState(mySettings)
    const weekDayNames = ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    useEffect(() => {

    }, [])

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

    const renderEachDayWorkingHourItem = (isEdit, weekDay, duration,
                                          isAmEnable,  amStartTime, amEndTime, selectedAmStartTime, selectedAmEndTime, amAppointmentType,
                                          isPmEnable, pmStartTime, pmEndTime, selectedPmStartTime, selectedPmEndTime, pmAppointmentType,
                                          onSwitchChange, onListBoxChange, onAppointmentTypeChange ) => {
        return (
            <tr>
                <td>
                    <p className={'mx-4 font-semibold text-black mt-2'}>{weekDayNames[weekDay]}</p>
                </td>
                <td>
                    <div className={'mt-2'}>
                        {renderEachDateTimeGroup(isEdit, duration, isAmEnable,
                            amStartTime, amEndTime,
                            selectedAmStartTime, selectedAmEndTime,
                            amAppointmentType,
                            (dateTimePoint, value) => {
                                onSwitchChange && onSwitchChange(weekDay, APM.AM, dateTimePoint, value)
                            }, (dateTimePoint, value) => {
                                onListBoxChange && onListBoxChange(weekDay, APM.AM, dateTimePoint, value)
                            }, (value) => {
                                onAppointmentTypeChange && onAppointmentTypeChange(weekDay, APM.AM, value)
                            })}
                    </div>
                </td>
                <td>
                    <div className={'w-px h-6 bg-gray-400 mx-5 mt-2'}/>
                </td>
                <td>
                    <div className={'mt-2'}>
                        {renderEachDateTimeGroup(isEdit, duration, isPmEnable,
                            pmStartTime, pmEndTime,
                            selectedPmStartTime, selectedPmEndTime,
                            pmAppointmentType,
                            (dateTimePoint, value) => {
                                onSwitchChange && onSwitchChange(weekDay, APM.PM, dateTimePoint, value)
                            }, (dateTimePoint, value) => {
                                onListBoxChange && onListBoxChange(weekDay, APM.PM, dateTimePoint, value)
                            }, (value) => {
                                onAppointmentTypeChange && onAppointmentTypeChange(weekDay, APM.PM, value)
                            })}
                    </div>
                </td>
            </tr>
        )
    }

    const onSwitchChange = (weekday, apm, value) => {
        if (weekday === WeekDay.Sunday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, sundayAmIsEnable: !selectedUserSettings.sundayAmIsEnable})
            }else {
                setSelectedUserSettings({...selectedUserSettings, sundayPmIsEnable: !selectedUserSettings.sundayPmIsEnable})
            }
        }else if (weekday === WeekDay.Monday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, mondayAmIsEnable: !selectedUserSettings.mondayAmIsEnable})
            }else {
                setSelectedUserSettings({...selectedUserSettings, mondayPmIsEnable: !selectedUserSettings.mondayPmIsEnable})
            }
        }else if (weekday === WeekDay.Tuesday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, tuesdayAmIsEnable: !selectedUserSettings.tuesdayAmIsEnable})
            }else {
                setSelectedUserSettings({...selectedUserSettings, tuesdayPmIsEnable: !selectedUserSettings.tuesdayPmIsEnable})
            }
        }else if (weekday === WeekDay.Wednesday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, wednesdayAmIsEnable: !selectedUserSettings.wednesdayAmIsEnable})
            }else {
                setSelectedUserSettings({...selectedUserSettings, wednesdayPmIsEnable: !selectedUserSettings.wednesdayPmIsEnable})
            }
        }else if (weekday === WeekDay.Thursday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, thursdayAmIsEnable: !selectedUserSettings.thursdayAmIsEnable})
            }else {
                setSelectedUserSettings({...selectedUserSettings, thursdayPmIsEnable: !selectedUserSettings.thursdayPmIsEnable})
            }
        }else if (weekday === WeekDay.Friday) {
            if (apm === APM) {
                setSelectedUserSettings({...selectedUserSettings, fridayAmIsEnable: !selectedUserSettings.fridayAmIsEnable})
            }else {
                setSelectedUserSettings({...selectedUserSettings, fridayPmIsEnable: !selectedUserSettings.fridayPmIsEnable})
            }
        }else if (weekday === WeekDay.Saturday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, saturdayAmIsEnable: !selectedUserSettings.saturdayAmIsEnable})
            }else {
                setSelectedUserSettings({...selectedUserSettings, saturdayPmIsEnable: !selectedUserSettings.saturdayPmIsEnable})
            }
        }
    }

    useEffect(() => {
        console.log(selectedUserSettings)
    }, [selectedUserSettings])

    const onListBoxChange = (weekday, apm, dateTimePoint, value) => {
        console.log(weekday, apm, dateTimePoint, value)
        if (weekday === WeekDay.Sunday) {
            if (apm === APM.AM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, sundayAmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, sundayAmEndTime: value})
                }
            }else if (apm === APM.PM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, sundayPmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, sundayPmEndTime: value})
                }
            }
        }else if (weekday === WeekDay.Monday) {
            if (apm === APM.AM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, mondayAmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, mondayAmEndTime: value})
                }
            }else if (apm === APM.PM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, mondayPmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, mondayPmEndTime: value})
                }
            }
        }else if (weekday === WeekDay.Tuesday) {
            if (apm === APM.AM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, tuesdayAmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, tuesdayAmEndTime: value})
                }
            }else if (apm === APM.PM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, tuesdayPmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, tuesdayPmEndTime: value})
                }
            }
        }else if (weekday === WeekDay.Wednesday) {
            if (apm === APM.AM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, wednesdayAmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, wednesdayAmEndTime: value})
                }
            }else if (apm === APM.PM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, wednesdayPmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, wednesdayPmEndTime: value})
                }
            }
        }else if (weekday === WeekDay.Thursday) {
            if (apm === APM.AM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, thursdayAmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, thursdayAmEndTime: value})
                }
            }else if (apm === APM.PM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, thursdayPmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, thursdayPmEndTime: value})
                }
            }
        }else if (weekday === WeekDay.Friday) {
            if (apm === APM.AM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, fridayAmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, fridayAmEndTime: value})
                }
            }else if (apm === APM.PM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, fridayPmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, fridayPmEndTime: value})
                }
            }
        }else if (weekday === WeekDay.Saturday) {
            if (apm === APM.AM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, saturdayAmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, saturdayAmEndTime: value})
                }
            }else if (apm === APM.PM) {
                if (dateTimePoint === DateTimePoint.StartTime) {
                    setSelectedUserSettings({...selectedUserSettings, saturdayPmStartTime: value})
                }else if (dateTimePoint === DateTimePoint.EndTime) {
                    setSelectedUserSettings({...selectedUserSettings, saturdayPmEndTime: value})
                }
            }
        }
    }

    const onAppointmentTypeChange = (weekday, apm, value) => {
        console.log(weekday, apm, value)
        if (weekday === WeekDay.Sunday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, sundayAmAppointmentType: value})
            }else if (apm === APM.PM) {
                setSelectedUserSettings({...selectedUserSettings, sundayPmAppointmentType: value})
            }
        }else if (weekday === WeekDay.Monday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, mondayAmAppointmentType: value})
            }else if (apm === APM.PM) {
                setSelectedUserSettings({...selectedUserSettings, mondayPmAppointmentType: value})
            }
        }else if (weekday === WeekDay.Tuesday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, tuesdayAmAppointmentType: value})
            }else if (apm === APM.PM) {
                setSelectedUserSettings({...selectedUserSettings, tuesdayPmAppointmentType: value})
            }
        }else if (weekday === WeekDay.Wednesday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, wednesdayAmAppointmentType: value})
            }else if (apm === APM.PM) {
                setSelectedUserSettings({...selectedUserSettings, wednesdayPmAppointmentType: value})
            }
        }else if (weekday === WeekDay.Thursday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, thursdayAmAppointmentType: value})
            }else if (apm === APM.PM) {
                setSelectedUserSettings({...selectedUserSettings, thursdayPmAppointmentType: value})
            }
        }else if (weekday === WeekDay.Friday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, fridayAmAppointmentType: value})
            }else if (apm === APM.PM) {
                setSelectedUserSettings({...selectedUserSettings, fridayPmAppointmentType: value})
            }
        }else if (weekday === WeekDay.Saturday) {
            if (apm === APM.AM) {
                setSelectedUserSettings({...selectedUserSettings, saturdayAmAppointmentType: value})
            }else if (apm === APM.PM) {
                setSelectedUserSettings({...selectedUserSettings, saturdayPmAppointmentType: value})
            }
        }
    }

    return (
        <div className={'w-full h-screen bg-white mt-8'}>
            <div className={'w-1/2  flex flex-row items-center '}>
                <p className={'font-semibold text-base-black ml-4'}>Duration of Per Slot(minutes):</p>
                <input className={'w-20 h-8 rounded font-base text-black border border-gray-300 px-2 text-left ml-2'}/>
            </div>
            <div className={'flex flex-row items-center mt-4 '}>
                <p className={'font-semibold text-base-black ml-4'}>Number of Per Slot(minutes):</p>
                <input className={'w-20 h-8 rounded font-base text-black border border-gray-300 px-2 text-left ml-2'}/>
            </div>
            <div className={'mt-8'}>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>
                            <p className={'font-mono text-md text-base-black font-semibold '}>AM</p>
                        </th>
                        <th></th>
                        <th>
                            <p className={'font-mono text-md text-base-black font-semibold'}>PM</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Sunday, mySettings.durationPerSlot,
                        selectedUserSettings.sundayAmIsEnable, mySettings.sundayAmStartTime, mySettings.sundayAmEndTime, selectedUserSettings.sundayAmStartTime, selectedUserSettings.sundayAmEndTime, selectedUserSettings.sundayAmAppointmentType,
                        selectedUserSettings.sundayPmIsEnable, mySettings.sundayPmStartTime, mySettings.sundayPmEndTime, selectedUserSettings.sundayPmStartTime, selectedUserSettings.sundayPmEndTime,  selectedUserSettings.sundayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Monday, mySettings.durationPerSlot,
                        selectedUserSettings.mondayAmIsEnable, mySettings.mondayAmStartTime, mySettings.mondayAmEndTime, selectedUserSettings.mondayAmStartTime, selectedUserSettings.mondayAmEndTime,  selectedUserSettings.mondayAmAppointmentType,
                        selectedUserSettings.mondayPmIsEnable, mySettings.mondayPmStartTime, mySettings.mondayPmEndTime, selectedUserSettings.mondayPmStartTime, selectedUserSettings.mondayPmEndTime,  selectedUserSettings.mondayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Tuesday, mySettings.durationPerSlot,
                        selectedUserSettings.tuesdayAmIsEnable, mySettings.tuesdayAmStartTime, mySettings.tuesdayAmEndTime, selectedUserSettings.tuesdayAmStartTime, selectedUserSettings.tuesdayAmEndTime, selectedUserSettings.tuesdayAmAppointmentType,
                        selectedUserSettings.tuesdayPmIsEnable, mySettings.tuesdayPmStartTime, mySettings.tuesdayPmEndTime, selectedUserSettings.tuesdayPmStartTime, selectedUserSettings.tuesdayPmEndTime, selectedUserSettings.tuesdayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Wednesday, mySettings.durationPerSlot,
                        selectedUserSettings.wednesdayAmIsEnable, mySettings.wednesdayAmStartTime, mySettings.wednesdayAmEndTime, selectedUserSettings.wednesdayAmStartTime, selectedUserSettings.wednesdayAmEndTime, selectedUserSettings.wednesdayAmAppointmentType,
                        selectedUserSettings.wednesdayPmIsEnable, mySettings.wednesdayPmStartTime, mySettings.wednesdayPmEndTime, selectedUserSettings.wednesdayPmStartTime, selectedUserSettings.wednesdayPmEndTime, selectedUserSettings.wednesdayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Thursday, mySettings.durationPerSlot,
                        selectedUserSettings.thursdayAmIsEnable, mySettings.thursdayAmStartTime, mySettings.thursdayAmEndTime, selectedUserSettings.thursdayAmStartTime, selectedUserSettings.thursdayAmEndTime, selectedUserSettings.thursdayAmAppointmentType,
                        selectedUserSettings.thursdayPmIsEnable, mySettings.thursdayPmStartTime, mySettings.thursdayPmEndTime, selectedUserSettings.thursdayPmStartTime, selectedUserSettings.thursdayPmEndTime, selectedUserSettings.thursdayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Friday, mySettings.durationPerSlot,
                        selectedUserSettings.fridayAmIsEnable, mySettings.fridayAmStartTime, mySettings.fridayAmEndTime, selectedUserSettings.fridayAmStartTime, selectedUserSettings.fridayAmEndTime, selectedUserSettings.fridayAmAppointmentType,
                        selectedUserSettings.fridayPmIsEnable, mySettings.fridayPmStartTime, mySettings.fridayPmEndTime, selectedUserSettings.fridayPmStartTime, selectedUserSettings.fridayPmEndTime, selectedUserSettings.fridayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Saturday, mySettings.durationPerSlot,
                        selectedUserSettings.saturdayAmIsEnable, mySettings.saturdayAmStartTime, mySettings.saturdayAmEndTime, selectedUserSettings.saturdayAmStartTime, selectedUserSettings.fridayAmStartTime, selectedUserSettings.saturdayAmAppointmentType,
                        selectedUserSettings.saturdayPmIsEnable, mySettings.saturdayPmStartTime, mySettings.saturdayPmEndTime, selectedUserSettings.saturdayPmStartTime, selectedUserSettings.saturdayPmEndTime, selectedUserSettings.saturdayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}