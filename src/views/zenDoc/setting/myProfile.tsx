import React from "react";
import PhoneNumberSection from "./components/myProfile/phoneNumberSection";
import EmailSection from "./components/myProfile/emailSection";

export default function MyProfile() {
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

    const $address = (
        <div className={"flex-1 flex flex-row items-center justify-between space-y-8 pb-8 border-b"}>
            <div className={"flex flex-1 flex-col space-y-2"}>
                <p className={"text-lg font-semibold text-primary-focus"}>Address</p>
                <p className={"text-lg text-primary-focus"}>Not provided</p>
            </div>
            <button type={"button"} className={"font-bold text-sm text-primary-focus underline"}>Edit</button>
        </div>
    )

    const $gender = (
        <div className={"flex-1 flex flex-row items-center justify-between space-y-8 pb-8 border-b"}>
            <div className={"flex flex-1 flex-col space-y-2"}>
                <p className={"text-lg font-semibold text-primary-focus"}>Gender</p>
                <p className={"text-lg text-primary-focus"}>Not provided</p>
            </div>
            <button type={"button"} className={"font-bold text-sm text-primary-focus underline"}>Edit</button>
        </div>
    )

    const $dob = (
        <div className={"flex-1 flex flex-row items-center justify-between space-y-8 pb-8 border-b"}>
            <div className={"flex flex-1 flex-col space-y-2"}>
                <p className={"text-lg font-semibold text-primary-focus"}>Date of birth</p>
                <p className={"text-lg text-primary-focus"}>Jun 15, 1991</p>
            </div>
            <button type={"button"} className={"font-bold text-sm text-primary-focus underline"}>Edit</button>
        </div>
    )

    const $list = (
        <div className={"w-full flex flex-col space-y-8"}>
            {$name}
            <PhoneNumberSection phoneNumber={""} />
            <EmailSection email={'yuanji.zhai@xxx.com'}/>
            {$address}
            {$gender}
            {$dob}
        </div>
    )
    return (
        <div className={"w-full h-full space-y-8"}>
            {$title}
            {$list}
        </div>
    )
}
