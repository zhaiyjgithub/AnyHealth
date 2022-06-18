import React, {useState} from "react"
import Button from "../../../../../components/buttons/button";
import {ButtonSize, Variant} from "../../../../../components/buttons/enum";
import FormModal from "../../../../../components/modal/formModal";

interface IProps {
    phoneNumber: string,
    open: boolean,
    onApply: (phoneNumber: string) => void,
    onClose: () => void
}

export default function PhoneNumberModal(props: IProps) {
    const {open, onApply, onClose} = props
    const [phoneNumber, setPhoneNumber] = useState<string>(props.phoneNumber)
    const [isValid, setIsValid] = useState<boolean>(false)

    const $title = (
        <div className={""}>
            <p className={"text-lg text-primary-focus font-semibold"}>Verify your phone number</p>
        </div>
    )
    const isPhoneNumberInvalid = isValid && !phoneNumber.length
    const $errMsgForPhoneNumber = isPhoneNumberInvalid ? <p className={"text-xs text-red-500 font-medium mt-1"}>Oops! Try a valid PhoneNumber.</p> : null
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

    const onApplyPhoneNumber = () => {
        if (!phoneNumber.length) {
            setIsValid(true)
            return
        }
        onApply && onApply(phoneNumber)
    }
    const $bookButton = (
        <Button size={ButtonSize.block} onClick={onApplyPhoneNumber} >Continue</Button>
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
                onClose && onClose()
                resetState()
            }} variant={Variant.float} >
                <i className="fas fa-times text-xl" />
            </Button>
        </div>
    )

    const resetState = () => {
        setTimeout(() => {
            setIsValid(false)
            setPhoneNumber("")
        }, 400)
    }

    return (
        <FormModal show={open} >
            {$close}
            {$content}
        </FormModal>
    )
}
