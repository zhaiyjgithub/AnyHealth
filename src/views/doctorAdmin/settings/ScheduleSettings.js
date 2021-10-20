import React, {useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'
import DateTimeListBox from "./DateTimeListBox";
import {APM, AppointmentType, WeekDay} from "../../../utils/constant/Enum";
import AppointmentTypeListBox from "./AppointmentTypeListBox";
import {
    calcDropdownListDataSource,
    DateTimePoint,
    getNextEndTimeRange,
    getScheduleSettings,
    InitialSettings, updateScheduleSettings
} from "./SettingsService";

export default function ScheduleSettings({}) {
    const [isEdit, setIsEdit] = useState(false)
    const [selectedUserSettings, setSelectedUserSettings] = useState(InitialSettings)
    const weekDayNames = ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let npi = 1902809254

    useEffect(() => {
        getScheduleSettings(npi, (data) => {
            if (data) {
                console.log('data', JSON.stringify(data))
                setSelectedUserSettings(data)
            }
        }, () => {

        })
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

    const onSave = () => {
        setIsEdit(false)
        selectedUserSettings.npi = npi
        updateScheduleSettings(selectedUserSettings, () => {
            console.log('update success')
        }, () => {
            alert('update failed')
        })
    }

    const onCancel = () => {
        setIsEdit(false)
    }

    const renderSaveButtons = () => {
        return (
            <>
                <button onClick={onCancel} type={'button'} className={'rounded bg-white border hover:bg-gray-200'}>
                    <p className={'px-4 py-2 font-medium text-sm text-base-black'}>{'Cancel'}</p>
                </button>

                <button onClick={onSave}  type={'button'} className={'ml-4 rounded bg-primary hover:bg-primary-focus'}>
                    <p className={'px-4 py-2 font-medium text-sm text-white'}>{'Save'}</p>
                </button>
            </>
        )
    }

    const renderEditButton = () => {
        return (
            <button onClick={() => {
                setIsEdit(true)
            }} type={'button'} className={'rounded bg-primary hover:bg-primary-focus'}>
                <p className={'px-4 py-2 font-medium text-sm text-white'}>{'Edit'}</p>
            </button>
        )
    }

    return (
        <div className={'w-max  h-screen bg-white mt-4'}>
            <div className={'w-1/2  flex flex-row items-center '}>
                <p className={'font-semibold text-base-black ml-4'}>Duration of Per Slot(minutes):</p>
                <input onChange={(e) => {
                    setSelectedUserSettings({...selectedUserSettings, durationPerSlot: e.target.value})
                }} defaultValue={selectedUserSettings.durationPerSlot} className={'w-20 h-8 rounded font-base text-black border border-gray-300 px-2 text-left ml-2'}/>
            </div>
            <div className={'flex flex-row items-center mt-4 '}>
                <p className={'font-semibold text-base-black ml-4'}>Number of Per Slot(minutes):</p>
                <input onChange={(e) => {
                    setSelectedUserSettings({...selectedUserSettings, numberPerSlot: e.target.value})
                }} defaultValue={selectedUserSettings.numberPerSlot} className={'w-20 h-8 rounded font-base text-black border border-gray-300 px-2 text-left ml-2'}/>
            </div>
            <div className={'mt-6'}>
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
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Sunday, InitialSettings.durationPerSlot,
                        selectedUserSettings.sundayAmIsEnable, InitialSettings.sundayAmStartTime, InitialSettings.sundayAmEndTime, selectedUserSettings.sundayAmStartTime, selectedUserSettings.sundayAmEndTime, selectedUserSettings.sundayAmAppointmentType,
                        selectedUserSettings.sundayPmIsEnable, InitialSettings.sundayPmStartTime, InitialSettings.sundayPmEndTime, selectedUserSettings.sundayPmStartTime, selectedUserSettings.sundayPmEndTime,  selectedUserSettings.sundayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Monday, InitialSettings.durationPerSlot,
                        selectedUserSettings.mondayAmIsEnable, InitialSettings.mondayAmStartTime, InitialSettings.mondayAmEndTime, selectedUserSettings.mondayAmStartTime, selectedUserSettings.mondayAmEndTime,  selectedUserSettings.mondayAmAppointmentType,
                        selectedUserSettings.mondayPmIsEnable, InitialSettings.mondayPmStartTime, InitialSettings.mondayPmEndTime, selectedUserSettings.mondayPmStartTime, selectedUserSettings.mondayPmEndTime,  selectedUserSettings.mondayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Tuesday, InitialSettings.durationPerSlot,
                        selectedUserSettings.tuesdayAmIsEnable, InitialSettings.tuesdayAmStartTime, InitialSettings.tuesdayAmEndTime, selectedUserSettings.tuesdayAmStartTime, selectedUserSettings.tuesdayAmEndTime, selectedUserSettings.tuesdayAmAppointmentType,
                        selectedUserSettings.tuesdayPmIsEnable, InitialSettings.tuesdayPmStartTime, InitialSettings.tuesdayPmEndTime, selectedUserSettings.tuesdayPmStartTime, selectedUserSettings.tuesdayPmEndTime, selectedUserSettings.tuesdayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Wednesday, InitialSettings.durationPerSlot,
                        selectedUserSettings.wednesdayAmIsEnable, InitialSettings.wednesdayAmStartTime, InitialSettings.wednesdayAmEndTime, selectedUserSettings.wednesdayAmStartTime, selectedUserSettings.wednesdayAmEndTime, selectedUserSettings.wednesdayAmAppointmentType,
                        selectedUserSettings.wednesdayPmIsEnable, InitialSettings.wednesdayPmStartTime, InitialSettings.wednesdayPmEndTime, selectedUserSettings.wednesdayPmStartTime, selectedUserSettings.wednesdayPmEndTime, selectedUserSettings.wednesdayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Thursday, InitialSettings.durationPerSlot,
                        selectedUserSettings.thursdayAmIsEnable, InitialSettings.thursdayAmStartTime, InitialSettings.thursdayAmEndTime, selectedUserSettings.thursdayAmStartTime, selectedUserSettings.thursdayAmEndTime, selectedUserSettings.thursdayAmAppointmentType,
                        selectedUserSettings.thursdayPmIsEnable, InitialSettings.thursdayPmStartTime, InitialSettings.thursdayPmEndTime, selectedUserSettings.thursdayPmStartTime, selectedUserSettings.thursdayPmEndTime, selectedUserSettings.thursdayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Friday, InitialSettings.durationPerSlot,
                        selectedUserSettings.fridayAmIsEnable, InitialSettings.fridayAmStartTime, InitialSettings.fridayAmEndTime, selectedUserSettings.fridayAmStartTime, selectedUserSettings.fridayAmEndTime, selectedUserSettings.fridayAmAppointmentType,
                        selectedUserSettings.fridayPmIsEnable, InitialSettings.fridayPmStartTime, InitialSettings.fridayPmEndTime, selectedUserSettings.fridayPmStartTime, selectedUserSettings.fridayPmEndTime, selectedUserSettings.fridayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    {renderEachDayWorkingHourItem(isEdit, WeekDay.Saturday, InitialSettings.durationPerSlot,
                        selectedUserSettings.saturdayAmIsEnable, InitialSettings.saturdayAmStartTime, InitialSettings.saturdayAmEndTime, selectedUserSettings.saturdayAmStartTime, selectedUserSettings.fridayAmStartTime, selectedUserSettings.saturdayAmAppointmentType,
                        selectedUserSettings.saturdayPmIsEnable, InitialSettings.saturdayPmStartTime, InitialSettings.saturdayPmEndTime, selectedUserSettings.saturdayPmStartTime, selectedUserSettings.saturdayPmEndTime, selectedUserSettings.saturdayPmAppointmentType,
                        onSwitchChange, onListBoxChange, onAppointmentTypeChange
                    )}
                    </tbody>
                </table>
            </div>

            <div className={'ml-4 flex flex-row items-center justify-end mt-6 border-t pt-4'}>
                {isEdit ? renderSaveButtons() : renderEditButton()}
            </div>

        </div>
    )
}