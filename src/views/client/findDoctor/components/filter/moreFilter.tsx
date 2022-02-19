import {Dialog, Transition} from "@headlessui/react"
import React, {Fragment, useState} from "react"
import Button from "../../../../../components/buttons/button";
import {ButtonStatus, ButtonType} from "../../../../../components/buttons/enum";
import {Gender} from "../../../../../utils/enum/enum";

export interface DataForMoreFilter {
    gender: Gender,
}

interface IProps {
    filter: DataForMoreFilter,
    open: boolean,
    onApply: (data: DataForMoreFilter) => void,
}

const dataForGender: Array<{name: string, id: Gender}> = [{name: "Male", id: Gender.Male}, {name: "No-binary", id: Gender.Trans}, {name: "Female", id: Gender.Female}]

export default function MoreFilter(props: IProps) {
    const {open, onApply} = props
    const [filter, setFilter] = useState<DataForMoreFilter>({gender: props.filter.gender} )

    function closeModal() {
        onApply && onApply(filter)
    }

    const $footer = (
        <div className={"w-full flex flex-row items-center justify-end border-t px-4 py-2"}>
            <Button status={ButtonStatus.primary} onClick={() => {
                onApply && onApply(filter)
            }} >Apply</Button>
        </div>
    )

    const $item = (checked: boolean, title: string, idx: number, onSelect: () => void) => {
        return (
            <div onClick={(e) => {
                e.stopPropagation()
                onSelect && onSelect()
            }} className={"px-4 w-full hover:bg-base-250 cursor-pointer"} key={idx}>
                <div className={" flex flex-row items-center space-x-2 py-2"}>
                    <input type={"checkbox"} checked={checked} className={"form-checkbox w-4 h-4 rounded-none flex-none transition duration-150"}/>
                    <p className={"text-base text-primary-focus leading-tight"}>{title}</p>
                </div>
            </div>
        )
    }

    const onSelectGender = (id: Gender) => {
        setFilter({
            ...filter,
            gender: id,
        })
    }
    const $genderList = (
        <div className={"w-full"}>
            <p className={"text-lg font-bold text-primary-focus leading-none"}>Gender</p>
            <div className={"grid grid-cols-2 gap-y-2 mt-2"}>
                {dataForGender.map(({name, id}, idx) => {
                    return <div className={"w-full flex items-start"} key={idx}>
                        {$item(id === filter.gender, name, idx, () => {
                            onSelectGender(id)
                        })}
                    </div>
                })}
            </div>
        </div>
    )

    const $content = (
        <div className={"w-full px-4 py-6"}>
            {$genderList}
        </div>
    )

    const $close = (
        <div className={"w-full flex flex-row justify-end"}>
            <Button onClick={closeModal} type={ButtonType.float} >
                <span className={"text-xl"}>
                    <i className="fas fa-times" />
                </span>
            </Button>
        </div>
    )

    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block border w-full max-w-xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                {$close}
                                {$content}
                                {$footer}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
