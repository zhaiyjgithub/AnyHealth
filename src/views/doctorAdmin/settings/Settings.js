import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import {FilterActionType} from "../../../hooks/filter/FilterProvider";
import ListBox from "../../../components/navBar/ListBox";
import DateTimeListBox from "./DateTimeListBox";

export default function Settings() {
    const [enabled, setEnabled] = useState(false)
    const [mondayIsAmEnable, setMondayIsAmEnable] = useState(false)
    const dateTimeDateSource = [{title: '08:00', value: "08:00"}, {title: '08:00', value: "08:00"}, {title: '08:00', value: "08:00"}]
    const renderWorkingHourItem = () => {
        return (
            <tr>
                <td>
                    <p className={'mx-4 font-semibold text-black'}>Monday</p>
                </td>
                <td>
                    <div className={'flex flex-row items-center'}>
                        <Switch
                            checked={mondayIsAmEnable}
                            onChange={setMondayIsAmEnable}
                            className={`${
                                mondayIsAmEnable ? 'bg-primary' : 'bg-gray-200'
                            } relative inline-flex items-center h-6 rounded-full w-11 mr-4`}
                        >
                            <span
                                className={`${
                                    mondayIsAmEnable ? 'translate-x-6' : 'translate-x-1'
                                } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
                        </Switch>

                        <DateTimeListBox
                            isDisabled={!mondayIsAmEnable}
                            dataSource={dateTimeDateSource}
                            selected={'08:00'}
                            onChangeValue={(value) => {

                            }}
                        />
                        <p className={'mx-2 text-sm text-base-black font-semibold'}>{' to '}</p>
                        <DateTimeListBox
                            isDisabled={!mondayIsAmEnable}
                            dataSource={dateTimeDateSource}
                            selected={'08:00'}
                            onChangeValue={(value) => {

                            }}
                        />
                    </div>
                </td>
                <td>
                    <div className={'w-px h-6 bg-gray-400 mx-5'}/>
                </td>
                <td>
                    <div className={'flex flex-row items-center'}>
                        <Switch
                            checked={mondayIsAmEnable}
                            onChange={setMondayIsAmEnable}
                            className={`${
                                mondayIsAmEnable ? 'bg-primary' : 'bg-gray-200'
                            } relative inline-flex items-center h-6 rounded-full w-11 mr-4`}
                        >
                            <span className="sr-only">Enable notifications</span>
                            <span
                                className={`${
                                    mondayIsAmEnable ? 'translate-x-6' : 'translate-x-1'
                                } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
                        </Switch>

                        <DateTimeListBox
                            isDisabled={!mondayIsAmEnable}
                            dataSource={dateTimeDateSource}
                            selected={'08:00'}
                            onChangeValue={(value) => {

                            }}
                        />
                        <p className={'mx-2 text-sm text-base-black font-semibold'}>{' to '}</p>
                        <DateTimeListBox
                            dataSource={dateTimeDateSource}
                            selected={'08:00'}
                            onChangeValue={(value) => {

                            }}
                        />
                    </div>
                </td>
            </tr>
        )
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
                        {renderWorkingHourItem()}
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