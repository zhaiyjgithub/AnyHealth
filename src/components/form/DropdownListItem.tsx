import React, {Fragment} from "react";
import {Listbox, Transition} from "@headlessui/react"

export const DropdownListFormNotSelectedId = -1
export const DropdownListFormNotSelectedStringId = "_blank"

export interface DropdownListItem {
    name: number | string,
    id: any
}

interface IProps {
    disabled?: boolean,
    title?: string,
    placeholder?: string,
    id: any,
    data: Array<DropdownListItem>,
    errMsg?: string,
    onChange: (id: any) => void
}

function DropdownListForm(props: IProps) {
    const {disabled = false, id, data, placeholder = "", onChange} = props

    const item = data.find((_item) => {
        return _item.id !== DropdownListFormNotSelectedId &&
            _item.id !== DropdownListFormNotSelectedStringId
            && _item.id === id
    })
    const selectedName:string = (item ? item.name : "").toString()
    const $chevronDown = (!disabled ? (<span><i className={`fas fa-chevron-down`}/></span>) : null)
    return (
        <div className="min-w-fit">
            <Listbox disabled={disabled} value={id} onChange={onChange} >
                <div className="relative w-full">
                    <Listbox.Button className={`z-10 w-full btn ${!disabled ? 'btn-outline' : 'btn-disabled'} btn-sm relative cursor-default rounded-full inline-flex`}>
                        <span className={`text-sm font-semibold mr-2`}>{selectedName}</span>
                        <span>{$chevronDown}</span>
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
                        <Listbox.Options className="z-50 absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-2xl border max-h-28">
                            {data.map((item, idx) => {
                                return (
                                    <Listbox.Option
                                        key={idx}
                                        value={item.id}
                                    >
                                        {({ selected, active }) => {
                                            return (
                                                <div className={'w-full px-1'}>
                                                    <div
                                                        className={`${
                                                            active ? 'bg-primary text-white font-medium' : 'bg-white text-black font-normal'
                                                        } w-full py-2 px-4 text-sm rounded`}
                                                    >
                                                        {item.name}
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
}

export default DropdownListForm