import {Dialog, Transition} from "@headlessui/react"
import React, {Fragment, useState} from "react"
import Button from "../../../../../components/buttons/button";
import {ButtonSize, Variant} from "../../../../../components/buttons/enum";

interface IProps {
    open: boolean,
    onApply: (phoneNumber?: string) => void,
}

export default function NewPhoneNumberModal(props: IProps) {
    const {open, onApply} = props
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [isValid, setIsValid] = useState<boolean>(false)

    const $title = (
        <div className={''}>
            <p className={'text-lg text-primary-focus font-semibold'}>Verify your phone number</p>
        </div>
    )
    const isPhoneNumberInvalid = isValid && !phoneNumber.length
    const $errMsgForPhoneNumber = isPhoneNumberInvalid ? <p className={"text-xs text-red-500 font-medium"}>Oops! Try a valid PhoneNumber.</p> : null
    const $phoneNumberForm = (
        <div className={"w-full"}>
            {$title}
            <p className={"text-gray-600 text-sm"}>{"Patient's PhoneNumber (optional)"}</p>
            <div placeholder={"YYYY"} className={"flex flex-1 border-l mt-1 border mt-4"}>
                <input onBlur={() => {
                    setIsValid(true)
                }} onChange={(e) => {
                    setPhoneNumber(e.target.value)
                }} className={"w-full px-2 py-3 text-sm font-primary-focus "}/>
            </div>
            {$errMsgForPhoneNumber}
        </div>
    )

    const $bookButton = (
        <Button size={ButtonSize.block} onClick={() => {
            //
        }} >Continue</Button>
    )
    const $content = (
        <div className={"px-8 pb-8 w-full flex flex-col space-y-8"}>
            {$phoneNumberForm}
            {$bookButton}
        </div>
    )

    const $close = (
        <div className={"w-full flex flex-row justify-end mt-2"}>
            <Button onClick={() => {
                onApply && onApply(phoneNumber)
                resetState()
            }} variant={Variant.float} >
                <i className="fas fa-times text-xl" />
            </Button>
        </div>
    )

    const resetState = () => {
        setTimeout(() => {
            setIsValid(false)
            setPhoneNumber('')
        }, 500)
    }

    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={() => {
                        //
                    }}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            // enter="ease-out duration-300"
                            // enterFrom="opacity-0"
                            // enterTo="opacity-60"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-60"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black transition ease-in-out opacity-60" />
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
                            <div className="inline-block border my-8 overflow-hidden w-3/5 text-left align-middle transition-all transform bg-white shadow-xl">
                                {$close}
                                {$content}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
