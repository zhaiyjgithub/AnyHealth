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

    return (
        <div className="min-w-min">
            <Listbox disabled={isDisabled} value={selected} onChange={onChange} >
                <div className="relative mt-0">
                    <Listbox.Button className={`z-10 relative py-1 px-4 cursor-default rounded-full flex flex-row items-center justify-between border ${!isDisabled ? 'border-gray-400 bg-white hover:bg-gray-100' : 'border-transparent bg-gray-100'}`}>
                        <span className={`font-mono text-sm font-semibold text-gray-600 mr-2`}>{title}</span>
                        {!isDisabled ? (<span className="">
									<i className={`fas fa-chevron-down text-sm text-gray-600`}></i>
            					</span>) : null}
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
                        <Listbox.Options className="z-50 absolute w-24 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-2xl border max-h-24">
                            {dataSource.map((gender, idx) => {
                                return (
                                    <Listbox.Option
                                        key={idx}
                                        value={gender.value}
                                    >
                                        {({ selected, active }) => {
                                            return (
                                                <div
                                                    className={`${
                                                        active ? 'bg-primary text-white font-medium' : 'bg-white text-black font-normal'
                                                    } w-full py-2 px-4 font-mono text-sm`}
                                                >
                                                    {gender.title}
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
