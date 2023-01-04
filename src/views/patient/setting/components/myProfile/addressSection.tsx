import React, {useEffect, useState} from "react";
import FormInput from "../../../../../components/form/formInput";
import Button from "../../../../../components/buttons/button";
import {ButtonStatus} from "../../../../../components/buttons/enum";
import {AddressInfo} from "../../types";

interface IProps {
    addressInfo: AddressInfo,
    onSave: (info: AddressInfo) => void
}

export default function AddressSection(props: IProps) {
    const [isValid, setIsValid] = useState(true)
    const [show, setShow] = useState(false)
    const [addressInfo, setAddressInfo] = useState<AddressInfo>(props.addressInfo)

    useEffect(() => {
        let valid = false
        if ((addressInfo &&
                addressInfo.streetAddress.length &&
                addressInfo.suit.length &&
                addressInfo.city.length &&
                addressInfo.state.length &&
                addressInfo.zip.length
        ) ||
            (addressInfo &&
                !addressInfo.streetAddress.length &&
                !addressInfo.suit.length &&
                !addressInfo.city.length &&
                !addressInfo.state.length &&
                !addressInfo.zip.length
            )
        ) {
            valid = true
        }
        setIsValid(valid)
    }, [addressInfo])
    const errMsg = ""
    const errMsgForStreetAddress = !isValid && !addressInfo.streetAddress.length ? "Please enter a street address" : ""
    const errMsgForCity = !isValid && !addressInfo.city.length ? "Please enter a city" : ""
    const errMsgForState = !isValid && !addressInfo.state.length ? "Please enter a state" : ""
    const errMsgForZipCode = !isValid && !addressInfo.zip.length ? "Please enter a zip code" : ""
    const $editView = (
        <div className={"w-full flex flex-col space-y-8"}>
            <FormInput errMsg={errMsgForStreetAddress} title={"Street Address"} value={addressInfo?.streetAddress}
                onChangeText={(text) => {
                    setAddressInfo({
                        ...addressInfo,
                        streetAddress: text,
                    })
                }}/>
            <FormInput errMsg={errMsg} title={"Apt, suite, building (optional)"} value={addressInfo?.suit}
                onChangeText={(text) => {
                    setAddressInfo({
                        ...addressInfo,
                        suit: text,
                    })
                }}/>
            <div className={"w-full grid grid-cols-2 space-x-4"}>
                <FormInput errMsg={errMsgForCity} title={"City"} value={addressInfo?.city} onChangeText={(text) => {
                    setAddressInfo({
                        ...addressInfo,
                        city: text,
                    })
                }}/>
                <FormInput errMsg={errMsgForState} title={"State"} value={addressInfo?.state} onChangeText={(text) => {
                    setAddressInfo({
                        ...addressInfo,
                        state: text,
                    })
                }}/>
            </div>
            <div className={"w-full grid grid-cols-2 space-x-4"}>
                <FormInput errMsg={errMsgForZipCode} title={"Zip code"} value={addressInfo?.zip}
                    onChangeText={(text) => {
                        setAddressInfo({
                            ...addressInfo,
                            zip: text,
                        })
                    }}/>
            </div>
            <div className={"w-max"}>
                <Button status={isValid ? ButtonStatus.primary : ButtonStatus.disabled} onClick={() => {
                    if (isValid) {
                        setShow(false)
                        props.onSave(addressInfo)
                    }
                }}>
                    Save
                </Button>
            </div>
        </div>
    )

    const address = addressInfo.streetAddress.length ? `${addressInfo.streetAddress}, ${addressInfo.city}, ${addressInfo.state}, ${addressInfo.zip}` : "Not provide"
    const $defaultView = (
        <div className={"flex-1 flex flex-row"}>
            <p className={"text-lg text-primary-focus"}>{address}</p>
        </div>
    )
    return (
        <div className={"flex-1 flex flex-row items-center justify-between space-y-8 pb-8 border-b"}>
            <div className={"flex flex-1 flex-col space-y-2"}>
                <div className={"flex-1 flex flex-row items-center justify-between"}>
                    <p className={"text-lg font-semibold text-primary-focus"}>Address</p>
                    <button onClick={() => {
                        setShow(!show)
                    }} type={"button"}
                    className={"font-bold text-sm text-primary-focus underline"}>{show ? "Cancel" : "Edit"}</button>
                </div>
                {show ? $editView : $defaultView}
            </div>
        </div>
    )
}
