import {Listbox, Transition} from "@headlessui/react";
import React, {Fragment, useState} from "react";

const AppointmentTypeListBox = React.memo(({selected, isDisabled, dataSource, onChangeValue}) => {
    if (!dataSource.length) {
        return null
    }
    const onChange = (value) => {
        onChangeValue && onChangeValue(value)
    }

    const getTitle = (value) => {
        const item = dataSource.find((_item) => {
            return _item && _item.value === value
        })
        return item ? item.title : dataSource[0].title
    }

    const title = getTitle(selected)

    const $chevronDown = (!isDisabled ? (<span><i className={`fas fa-chevron-down`}/></span>) : null)
    return (
        <div className="w-36">
            <Listbox disabled={isDisabled} value={selected} onChange={onChange} >
                <div className="relative w-full">
                    <Listbox.Button  className={`w-full z-10 btn ${!isDisabled ? 'btn-outline' : ''} btn-sm relative py-1 px-4 cursor-default rounded-full flex flex-row items-center justify-between`}>
                        <span className={`font-mono text-sm font-semibold text-gray-600 mr-2`}>{title}</span>
                        {$chevronDown}
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Listbox.Options className="z-50 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-2xl border max-h-28">
                            {dataSource.map((gender, idx) => {
                                return (
                                    <Listbox.Option
                                        key={idx}
                                        value={gender.value}
                                    >
                                        {({ selected, active }) => {
                                            return (
                                                <div className={'w-full px-1'}>
                                                    <div
                                                        className={`flex-1 ${
                                                            active ? 'bg-primary text-white font-medium' : 'bg-white text-black font-normal'
                                                        } w-full py-2 px-4 font-mono text-sm rounded`}
                                                    >
                                                        {gender.title}
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    </Listbox.Option>
                                )
                            })}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
})

AppointmentTypeListBox.defaultProps = {
    isDisabled: true,
    selected: '',
    dataSource: [],
    onChangeValue: undefined
}

export default AppointmentTypeListBox
