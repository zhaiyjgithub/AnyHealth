import React, {Fragment, useEffect, useState} from "react";
import FormInput from "../../../../../components/form/formInput";
import Button from "../../../../../components/buttons/button";
import {ButtonStatus} from "../../../../../components/buttons/enum";
import {validateEmail} from "../../../../../utils/util/commonTool";

interface IProps {
    email: string,
    onSave: (email: string) => void
}

export default function EmailSection(props: IProps) {
    const [email, setEmail] = useState<string>(props.email)
    const [show, setShow] = useState<boolean>(false)
    const [isValid, setIsValid] = useState<boolean>(false)

    useEffect(() => {
        if (email.length) {
            setIsValid(validateEmail(email))
        } else {
            setIsValid(true)
        }
    }, [email])

    const errMsg = !isValid ? "Please type an email." : ""
    const $editView = (
        <div className={"flex flex-col space-y-4"}>
            <p className={"text-base text-gray-500"}>If you update your email address, we’ll send a confirmation email
                to the new address to verify it’s you.</p>
            <FormInput errMsg={errMsg} title={"Email Address"} value={email} onChangeText={(text) => {
                setEmail(text)
            }}/>
            <div className={"w-max"}>
                <Button status={isValid ? ButtonStatus.primary : ButtonStatus.disabled} onClick={() => {
                    if (email.length) {
                        isValid && setShow(false)
                        isValid && props.onSave(email)
                    } else {
                        setIsValid(false)
                    }
                }}>
                    Save
                </Button>
            </div>
        </div>
    )

    const $defaultView = (
        <Fragment>
            <p className={"text-lg text-primary-focus"}>{email}</p>
            <p className={"text-base text-gray-500"}>{"To secure your account, please "}
                <a className={"underline cursor-pointer"}>verify your email address</a>
            </p>
        </Fragment>
    )

    return (
        <div className={"flex-1 flex flex-row items-center justify-between space-y-8 pb-8 border-b"}>
            <div className={"flex flex-1 flex-col space-y-2"}>
                <div className={"flex-1 flex flex-row items-center justify-between"}>
                    <p className={"text-lg font-semibold text-primary-focus"}>Email</p>
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
