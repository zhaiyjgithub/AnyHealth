import React, {useState} from "react";
import PhoneNumberSection from "./components/myProfile/phoneNumberSection";
import EmailSection from "./components/myProfile/emailSection";
import AddressSection from "./components/myProfile/addressSection";
import {AddressInfo, UserProfile} from "./types";
import GenderSection from "./components/myProfile/genderSection";
import {Gender} from "../../../utils/enum/enum";
import DateOfBirthSection from "./components/myProfile/dateOfBirthSection";
import useUserAuth from "../user/hooks/useUserAuth";
import Button from "../../../components/buttons/button";
import {ButtonStatus} from "../../../components/buttons/enum";
import updateProfile from "./service";

export default function MyProfile() {
    const {user} = useUserAuth()
    const [addressInfo, setAddressInfo] = useState<AddressInfo>({
        City: user.city,
        State: user.state,
        StreetAddress: user.streetAddress,
        Suit: user.suit,
        Zip: user.zip,
    })
    const [gender, setGender] = useState<Gender>(Gender.Female)
    const [phone, setPhone] = useState(user.phone)
    const [email, setEmail] = useState(user.email)
    const [birthday, setBirthday] = useState(user.birthday)

    const onClickSave = () => {
        const profile: UserProfile = {
            Birthday: undefined,
            City: undefined,
            Email: undefined,
            Gender: undefined,
            Phone: undefined,
            State: undefined,
            StreetAddress: undefined,
            Suit: undefined,
            Zip: undefined,
            UserID: 2,
        }
        if (email.length) {
            profile.Email = email
        }
        if (phone.length) {
            profile.Phone = phone
        }
        if (addressInfo.StreetAddress.length) {
            profile.StreetAddress = addressInfo.StreetAddress
        }
        if (addressInfo.Suit.length) {
            profile.Suit = addressInfo.Suit
        }
        if (addressInfo.City.length) {
            profile.City = addressInfo.City
        }
        if (addressInfo.State.length) {
            profile.State = addressInfo.State
        }
        if (addressInfo.Zip.length) {
            profile.Zip = addressInfo.Zip
        }
        if (gender.length) {
            profile.Gender = gender
        }
        if (birthday.length) {
            profile.Birthday = birthday
        }
        updateProfile(profile, () => {
            alert("Update success")
        }, () => {
            alert("Update failed")
        })
    }

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
    const onUpdateDob = (dob: string) => {
        setBirthday(dob)
    }
    const onUpdatePhone = (phone: string) => {
        setPhone(phone)
    }
    const onUpdateEmail = (email: string) => {
        setEmail(email)
    }
    const $list = (
        <div className={"w-full flex flex-col space-y-8"}>
            {$name}
            <PhoneNumberSection phoneNumber={phone} onSave={onUpdatePhone}/>
            <EmailSection email={email} onSave={onUpdateEmail}/>
            <AddressSection addressInfo={addressInfo} onSave={onUpdateAddressInfo}/>
            <GenderSection gender={gender} onSave={onUpdatedGender}/>
            <DateOfBirthSection dob={birthday} onSave={onUpdateDob} />
        </div>
    )

    const $saveButton = (
        <div className={"w-max"}>
            <Button status={ButtonStatus.primary } onClick={onClickSave}>
                Save
            </Button>
        </div>
    )

    return (
        <div className={"w-full h-full space-y-8"}>
            {$title}
            {$list}
            {$saveButton}
        </div>
    )
}
