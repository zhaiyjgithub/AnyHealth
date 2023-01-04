import React, {useState} from "react";
import PhoneNumberSection from "./components/myProfile/phoneNumberSection";
import EmailSection from "./components/myProfile/emailSection";
import AddressSection from "./components/myProfile/addressSection";
import {AddressInfo, UserProfile} from "./types";
import GenderSection from "./components/myProfile/genderSection";
import {Gender, TimeFormat} from "../../../utils/enum/enum";
import DateOfBirthSection from "./components/myProfile/dateOfBirthSection";
import useUserAuth from "../user/hooks/useUserAuth";
import Button from "../../../components/buttons/button";
import {ButtonStatus} from "../../../components/buttons/enum";
import {updateProfile} from "./service";
import moment from "moment";

export default function MyProfile() {
    const {user, getUserByID} = useUserAuth()
    const [addressInfo, setAddressInfo] = useState<AddressInfo>({
        city: user.city,
        state: user.state,
        streetAddress: user.streetAddress,
        suit: user.suit,
        zip: user.zip,
    })
    const [gender, setGender] = useState<Gender>(Gender.Female)
    const [phone, setPhone] = useState(user.phone)
    const [email, setEmail] = useState(user.email)
    const [birthday, setBirthday] = useState(user.birthday)

    const onClickSave = () => {
        const profile: UserProfile = {
            birthday: undefined,
            city: undefined,
            email: undefined,
            gender: undefined,
            phone: undefined,
            state: undefined,
            streetAddress: undefined,
            suit: undefined,
            zip: undefined,
            userID: 2,
        }
        if (email.length) {
            profile.email = email
        }
        if (phone.length) {
            profile.phone = `+1${phone}`
        }
        if (addressInfo.streetAddress.length) {
            profile.streetAddress = addressInfo.streetAddress
        }
        if (addressInfo.suit.length) {
            profile.suit = addressInfo.suit
        }
        if (addressInfo.city.length) {
            profile.city = addressInfo.city
        }
        if (addressInfo.state.length) {
            profile.state = addressInfo.state
        }
        if (addressInfo.zip.length) {
            profile.zip = addressInfo.zip
        }
        if (gender.length) {
            profile.gender = gender
        }
        if (birthday.length) {
            const d = moment(birthday, TimeFormat.MMDDYYYY).format(TimeFormat.YYYYMMDD)
            profile.birthday = d
        }
        updateProfile(profile, () => {
            alert("Update success")
            getUserByID(2)
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
            <DateOfBirthSection dob={birthday} onSave={onUpdateDob}/>
        </div>
    )

    const $saveButton = (
        <div className={"w-max"}>
            <Button status={ButtonStatus.primary} onClick={onClickSave}>
                Save
            </Button>
        </div>
    )

    return (
        <div className={"w-4/5 h-full space-y-8"}>
            {$title}
            {$list}
            {$saveButton}
        </div>
    )
}
