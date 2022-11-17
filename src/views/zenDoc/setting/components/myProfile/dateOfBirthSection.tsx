import React, {useEffect, useState} from "react";
import Button from "../../../../../components/buttons/button";
import {ButtonStatus} from "../../../../../components/buttons/enum";
import moment from "moment";
import {TimeFormat} from "../../../../../utils/enum/enum";

interface IProps {
    dob: string,
    onSave: (dob: string) => void
}

export default function DateOfBirthSection(props: IProps) {
    const [edit, setEdit] = useState(false)
    const [month, setMonth] = useState(props.dob.slice(0, 2))
    const [day, setDay] = useState(props.dob.slice(3, 5))
    const [year, setYear] = useState(props.dob.slice(6, 10))
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        setIsValid(moment(`${month}-${day}-${year}`, TimeFormat.MMDDYYYY, true).isValid())
    }, [year, month, day])

    const $defaultView = (
        <div className={"flex-1 flex flex-row"}>
            <p className={"text-lg text-primary-focus"}>{props.dob}</p>
        </div>
    )

    const $editView = (
        <div className={"w-max flex flex-col space-y-4"}>
            <div className={"w-max flex flex-row items-center border"}>
                <input placeholder={"MM"} value={month} onChange={(e) => {
                    setMonth(e.target.value)
                }} className={"w-48 px-2 py-3 text-base font-medium text-primary-focus  transition ease-in-out border-r"} />
                <input placeholder={"DD"} value={day} onChange={(e) => {
                    setDay(e.target.value)
                }} className={"w-48 px-2 py-3 text-base font-medium text-primary-focus  transition ease-in-out border-r"} />
                <input placeholder={"YYYY"} value={year} onChange={(e) => {
                    setYear(e.target.value)
                }} className={"w-48 px-2 py-3 text-base font-medium text-primary-focus  transition ease-in-out "} />
            </div>
            <div className={"w-max"}>
                <Button status={isValid ? ButtonStatus.primary : ButtonStatus.disabled} onClick={() => {
                    if (isValid) {
                        setEdit(false)
                        props.onSave(`${month}-${day}-${year}`)
                    }
                }}>
                    Save
                </Button>
            </div>
        </div>
    )
    return (
        <div className={"flex-1 flex flex-row items-center justify-between space-y-8 pb-8 border-b"}>
            <div className={"flex flex-1 flex-col space-y-2"}>
                <div className={"flex-1 flex flex-row items-center justify-between"}>
                    <p className={"text-lg font-semibold text-primary-focus"}>Address</p>
                    <button onClick={() => {
                        setEdit(!edit)
                    }} type={"button"} className={"font-bold text-sm text-primary-focus underline"}>{edit ? "Cancel" : "Edit"}</button>
                </div>
                {edit ? $editView : $defaultView}
            </div>
        </div>
    )
}
