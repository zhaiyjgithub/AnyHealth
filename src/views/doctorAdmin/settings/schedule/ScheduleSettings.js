import React, {useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'
import {APM, AppointmentType, WeekDay} from "../../../../utils/constant/Enum";
import {
    calcDropdownListDataSource, convertUTCSettingToLocalSetting,
    DateTimePoint, DefaultUTCSettings,
    getNextEndTimeRange,
    getScheduleSettings,
    updateScheduleSettings
} from "./ScheduleSettingsService";
import FormInput from "../../../../components/form/formInput";
import DropdownListForm from "../../../../components/form/DropdownListItem";
import FormSwitch from "../../../../components/form/formSwitch";


export default function ScheduleSettings({}) {
    const InitialSettings = convertUTCSettingToLocalSetting(DefaultUTCSettings)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedUserSettings, setSelectedUserSettings] = useState(InitialSettings)
    const weekDayNames = ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dataForAptTypes = [{name: 'In-Clinic', id: AppointmentType.InClinic,}, {name: 'Virtual', id: AppointmentType.Virtual,}]
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
        return <div className={'flex flex-row items-center w-full'}>
            {isEdit ? <FormSwitch checked={isEnable} onChange={onSwitchChange} /> : null}
            <DropdownListForm disabled={!isEdit} id={selectedStartTime} data={dateTimeDataSource.slice(0, dateTimeDataSource.length - 1)} onChange={(id) => {
                onListBoxChange && onListBoxChange(DateTimePoint.StartTime, id)
            }} />
            <p className={'mx-2 text-sm text-base-black font-semibold'}>{' To '}</p>
            <DropdownListForm disabled={!isEdit} id={selectedEndTime} data={endTimeDataSource} onChange={(id) => {
                onListBoxChange && onListBoxChange(DateTimePoint.EndTime, id)
            }} />
            <div className={'h-full w-4'}/>
            <DropdownListForm disabled={!isEdit} id={appointmentType} data={dataForAptTypes} onChange={onAppointmentTypeChange} />
        </div>
    }

    const renderEachDayWorkingHourItem = (isEdit, weekDay, duration,
                                          isAmEnable,  amStartTime, amEndTime, selectedAmStartTime, selectedAmEndTime, amAppointmentType,
                                          isPmEnable, pmStartTime, pmEndTime, selectedPmStartTime, selectedPmEndTime, pmAppointmentType,
                                          onSwitchChange, onListBoxChange, onAppointmentTypeChange ) => {
        return (
            <tr>
                <td>
                    <p className={'font-semibold text-netural mt-2 mr-4'}>{weekDayNames[weekDay]}</p>
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
        console.log('onListBoxChange: ', weekday, apm, dateTimePoint, value)
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

    const $timeSlots = (
        <div className={'grid grid-flow-col auto-cols-max gap-x-4'}>
            <FormInput title={'Duration of Per Slot(minutes)'} value={selectedUserSettings.durationPerSlot}  onChangeText={(text) => {
                setSelectedUserSettings({...selectedUserSettings, durationPerSlot: text})
            }} />

            <FormInput title={'Number of Per Slot(minutes):'} value={selectedUserSettings.numberPerSlot} onChangeText={(text) => {
                setSelectedUserSettings({...selectedUserSettings, numberPerSlot: text})
            }} />
        </div>
    )

    const $table = (
        <div className={'mt-6'}>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>
                        <p className={'font-mono text-sm text-neutral font-semibold '}>AM</p>
                    </th>
                    <th></th>
                    <th>
                        <p className={'font-mono text-sm text-neutral font-semibold'}>PM</p>
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
                    selectedUserSettings.saturdayAmIsEnable, InitialSettings.saturdayAmStartTime, InitialSettings.saturdayAmEndTime, selectedUserSettings.saturdayAmStartTime, selectedUserSettings.saturdayAmEndTime, selectedUserSettings.saturdayAmAppointmentType,
                    selectedUserSettings.saturdayPmIsEnable, InitialSettings.saturdayPmStartTime, InitialSettings.saturdayPmEndTime, selectedUserSettings.saturdayPmStartTime, selectedUserSettings.saturdayPmEndTime, selectedUserSettings.saturdayPmAppointmentType,
                    onSwitchChange, onListBoxChange, onAppointmentTypeChange
                )}
                </tbody>
            </table>
        </div>
    )

    const $renderSaveButtons = (
        <>
            <button onClick={onCancel} className="btn btn-ghost mr-4">Cancel</button>
            <button onClick={onSave} className="btn btn-primary">Save</button>
        </>)

    const $renderEditButton = (
        <button onClick={() => {
            setIsEdit(true)
        }} className="btn btn-primary">Edit</button>
    )

    const $footer = (
        <div className={'py-4 bg-white fixed left-48 bottom-0 right-0 border-t flex flex-row items-center justify-end pr-16'}>
            {isEdit ? $renderSaveButtons : $renderEditButton}
        </div>
    )
    return (
        <div className={'px-4 '}>
            {$timeSlots}
            {$table}
            {$footer}
        </div>
    )
}