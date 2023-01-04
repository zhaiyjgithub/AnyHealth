import React, {useState} from "react";
import PhoneNumberModal from "../../../appointment/components/addPhoneNumber/phoneNumberModal";

interface IProps {
    phoneNumber: string
    onSave: (phone: string) => void
}

export default function PhoneNumberSection(props: IProps) {
    const [show, setShow] = useState<boolean>(false)
    const [phoneNumber, setPhoneNumber] = useState<string>(props.phoneNumber)
    const $editPhoneNumberModal = (
        <PhoneNumberModal phoneNumber={phoneNumber} open={show} onApply={(phoneNumber) => {
            setPhoneNumber(phoneNumber)
            setShow(false)
            props.onSave(phoneNumber)
        }} onClose={() => {
            setShow(false)
        }}/>
    )

    const formatPhone = phoneNumber.length ? `${phoneNumber}` : "Not Provide"
    return (
        <div className={"flex-1 flex flex-row items-center justify-between space-y-8 pb-8 border-b"}>
            <div className={"flex flex-1 flex-col space-y-2"}>
                <p className={"text-lg font-semibold text-primary-focus"}>Phone Number</p>
                <p className={"text-lg text-primary-focus"}>{formatPhone}</p>
            </div>
            <button type={"button"} onClick={() => {
                setShow(true)
            }} className={"font-bold text-sm text-primary-focus underline"}>Edit
            </button>
            {$editPhoneNumberModal}
        </div>
    )
}
