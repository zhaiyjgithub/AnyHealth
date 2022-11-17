import React, {useState} from "react";
import PhoneNumberSection from "./components/myProfile/phoneNumberSection";
import EmailSection from "./components/myProfile/emailSection";
import AddressSection from "./components/myProfile/addressSection";
import {AddressInfo} from "./types";
import GenderSection from "./components/myProfile/genderSection";
import {Gender} from "../../../utils/enum/enum";
import DateOfBirthSection from "./components/myProfile/dateOfBirthSection";

export default function MyProfile() {
    const [addressInfo, setAddressInfo] = useState<AddressInfo>({
        City: "",
        State: "",
        StreetAddress: "",
        Suit: "",
        ZipCode: "",
    })
    const [gender, setGender] = useState<Gender>(Gender.Female)
    const $title = (
        <p className={"text-2xl font-bold text-primary-focus"}>Profile</p>
    )
    const $name = (
        <div className={"flex-1 flex flex-row items-center justify-between space-y-8 pb-8 border-b"}>
            <div className={"flex flex-1 flex-col space-y-2"}>
                <p className={"text-lg font-semibold text-primary-focus"}>Name</p>
                <p className={"text-lg text-primary-focus"}>Jerry Zhai</p>
                <p className={"text-base text-gray-500"}>To change your name, please call us at +1 (xxx) xxx-xxxx</p>
            </div>
        </div>
    )

    const onUpdateAddressInfo = (info: AddressInfo) => {
        setAddressInfo(info)
    }
    const onUpdatedGender = (gender: Gender) => {
        setGender(gender)
    }
    const onUpdateDob = () => {
        //
    }
    const $list = (
        <div className={"w-full flex flex-col space-y-8"}>
            {$name}
            <PhoneNumberSection phoneNumber={""} />
            <EmailSection email={"yuanji.zhai@xxx.com"}/>
            <AddressSection addressInfo={addressInfo} onSave={onUpdateAddressInfo}/>
            <GenderSection gender={gender} onSave={onUpdatedGender}/>
            <DateOfBirthSection dob={"06-15-1991"} onSave={onUpdateDob} />
        </div>
    )
    return (
        <div className={"w-full h-full space-y-8"}>
            {$title}
            {$list}
        </div>
    )
}
