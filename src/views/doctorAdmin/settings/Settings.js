import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import {FilterActionType} from "../../../hooks/filter/FilterProvider";
import ListBox from "../../../components/navBar/ListBox";

export default function Settings() {
    const [enabled, setEnabled] = useState(false)
    const dateTimeDateSource = [{title: '08:00', value: "08:00"}, {title: '08:00', value: "08:00"}, {title: '08:00', value: "08:00"}]
    const renderWorkingHourItem = () => {
        return (
            <tr>
                <td>Monday</td>
                <td className={'flex flex-row items-center'}>
                    <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${
                            enabled ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex items-center h-6 rounded-full w-11 mr-4`}
                    >
                        <span className="sr-only">Enable notifications</span>
                        <span
                            className={`${
                                enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-white rounded-full`}
                        />
                    </Switch>

                    <ListBox
                        dataSource={dateTimeDateSource}
                        defaultTitle = {''}
                        selected={'08:00'}
                        onChangeValue={(value) => {

                        }}
                    />

                    <p className={'mx-2 font-black'}>{' -- '}</p>
                    <ListBox
                        dataSource={dateTimeDateSource}
                        defaultTitle = {''}
                        selected={'08:00'}
                        onChangeValue={(value) => {

                        }}
                    />
                </td>
                <td>$100</td>
            </tr>
        )
    }
    return (
        <div className={'w-full h-screen bg-yellow-500'}>
            <div className={'m-4 border-b'}>
                <h1>Settings</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>AM</th>
                            <th>PM</th>
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