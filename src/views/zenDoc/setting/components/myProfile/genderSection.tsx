import React, {useState} from "react";
import FormRadio from "../../../../../components/form/formRadio";
import {Gender} from "../../../../../utils/enum/enum";
import Button from "../../../../../components/buttons/button";
import {ButtonStatus} from "../../../../../components/buttons/enum";

interface IProps {
    gender: Gender,
    onSave: (gender: Gender) => void
}

export default function GenderSection(props: IProps) {
    const [gender, setGender] = useState<Gender>(props.gender)
    const [edit, setEdit] = useState<boolean>(false)
    const $editView = (
        <div className={"w-full flex flex-col space-y-4"}>
            <FormRadio title={"Female"} checked={gender === Gender.Female} onChange={() => {
                setGender(Gender.Female)
            }} />

            <FormRadio title={"Male"} checked={gender === Gender.Male} onChange={() => {
                setGender(Gender.Male)
            }} />

            <FormRadio title={"Trans"} checked={gender === Gender.Trans} onChange={() => {
                setGender(Gender.Trans)
            }} />
            <div className={"w-max"}>
                <Button status={ButtonStatus.primary} onClick={() => {
                    props.onSave(gender)
                }}>
                    Save
                </Button>
            </div>
        </div>
    )
    const $defaultView = (
        <div className={"flex-1 flex flex-row"}>
            <p className={"text-lg text-primary-focus"}>{gender}</p>
        </div>
    )
    return (
        <div className={"flex-1 flex flex-row items-center justify-between space-y-8 pb-8 border-b"}>
            <div className={"flex flex-1 flex-col space-y-2"}>
                <div className={"flex-1 flex flex-row items-center justify-between"}>
                    <p className={"text-lg font-semibold text-primary-focus"}>Gender</p>
                    <button onClick={() => {
                        setEdit(!edit)
                    }} type={"button"} className={"font-bold text-sm text-primary-focus underline"}>{edit ? "Cancel" : "Edit"}</button>
                </div>
                {edit ? $editView : $defaultView}
            </div>
        </div>
    )
}
