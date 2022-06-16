import React, {useState} from "react";
import NavBar from "./components/navbar/navbar";
import FormRadio from "../../../../components/form/formRadio";
import Button from "../../../../components/buttons/button";
import {ButtonSize, ButtonStatus} from "../../../../components/buttons/enum";
import moment from "moment";
import useUserAuth from "../hooks/useUserAuth";
import {useHistory} from "react-router-dom";
import {MD5} from "crypto-js"

interface Profile {
    firstName: string,
    lastName: string,
    birthdayMonth: string,
    birthdayDay: string,
    birthdayYear: string,
    gender: string,
    email: string,
    confirmEmail: string,
    password: string,
    checkedAgreement: boolean,
}

export default function CreateAccountPage() {
    const {createUser} = useUserAuth()
    const history = useHistory()
    const [profile, setProfile] = useState<Profile>({
        firstName: "",
        lastName: "",
        birthdayMonth: "",
        birthdayDay: "",
        birthdayYear: "",
        gender: "",
        email: "",
        confirmEmail: "",
        password: "",
        checkedAgreement: false,
    })
    const [check, setCheck] = useState<{
        name: boolean,
        birthday: boolean,
        gender: boolean,
        email: boolean,
        confirmEmail: boolean,
        password: boolean,
    }>({
        name: false,
        birthday: false,
        gender: false,
        email: false,
        confirmEmail: false,
        password: false,
    })
    const $titleView = (
        <div className={"space-y-2"}>
            <p className={"text-4xl font-bold text-primary-focus"}>Create an account</p>
            <Button status={ButtonStatus.link} onClick={() => {
                //
            }}>
                Already have one? Log in
            </Button>
        </div>
    )

    const isNameInvalid = () => {
        return check.name && (!profile.firstName.length || !profile.lastName.length)
    }
    const $errMsgForName = isNameInvalid() ? <p className={"text-xs text-red-500 font-medium"}>{"Please type a name"}</p> : null
    const $nameForms = (
        <div>
            <p className={"font-semibold text-primary-focus text-base"}>Your name</p>
            <div className={"w-full flex flex-row border"}>
                <div className={"flex flex-1"}>
                    <input onBlur={() => {
                        setCheck({
                            ...check,
                            name: true,
                        })
                    }} onChange={(e) => {
                        setProfile({
                            ...profile,
                            firstName: e.target.value,
                        })
                    }} placeholder={"First"} className={"w-full px-2 h-12 text-base font-primary-focus "}/>
                </div>
                <div className={"flex flex-1 border-l"}>
                    <input onBlur={() => {
                        setCheck({
                            ...check,
                            name: true,
                        })
                    }} onChange={(e) => {
                        setProfile({
                            ...profile,
                            lastName: e.target.value,
                        })
                    }} placeholder={"Last"} className={"w-full px-2 h-12 text-base font-primary-focus "}/>
                </div>
            </div>
            {$errMsgForName}
        </div>
    )

    const isBirthdayInvalid = () => {
        const date = `${profile.birthdayYear}/${profile.birthdayMonth}/${profile.birthdayDay}`
        return check.birthday && !moment(date).isValid()
    }
    const $errMsgForBirthday = isBirthdayInvalid() ? <p className={"text-xs text-red-500 font-medium"}>Oops! Try a valid date.</p> : null
    const $dobForms = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-base"}>Date of birth</p>
            <div className={"w-full flex flex-row border"}>
                <div className={"flex flex-1"}>
                    <input onBlur={() => {
                        setCheck({
                            ...check,
                            birthday: true,
                        })
                    }} onChange={(e) => {
                        setProfile({
                            ...profile,
                            birthdayMonth: e.target.value,
                        })
                    }} placeholder={"MM"} className={"w-full px-2 h-12 text-base font-primary-focus "}/>
                </div>
                <div className={"flex flex-1"}>
                    <input onBlur={() => {
                        setCheck({
                            ...check,
                            birthday: true,
                        })
                    }} onChange={(e) => {
                        setProfile({
                            ...profile,
                            birthdayDay: e.target.value,
                        })
                    }} placeholder={"DD"} className={"w-full px-2 h-12 text-base font-primary-focus border-l"}/>
                </div>
                <div className={"flex flex-1 border-l"}>
                    <input onBlur={() => {
                        setCheck({
                            ...check,
                            birthday: true,
                        })
                    }} onChange={(e) => {
                        setProfile({
                            ...profile,
                            birthdayYear: e.target.value,
                        })
                    }} placeholder={"YYYY"} className={"w-full px-2 h-12 text-base font-primary-focus "}/>
                </div>
            </div>
            {$errMsgForBirthday}
        </div>
    )

    const $genderForms = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-base"}>Enter your gender</p>
            <div className={"w-full flex flex-row items-center bg-white border"}>
                <div className={"px-3 h-12 flex flex-1 flex-row"}>
                    <FormRadio titleClassName={"text-base"} key={3} title={"Male"} checked={profile.gender === "F"} onChange={() => {
                        setProfile({
                            ...profile,
                            gender: "F",
                        })
                    }}/>
                </div>
                <div className={"px-3 h-12 flex flex-1 flex-row border-l"}>
                    <FormRadio titleClassName={"text-base"} key={4} title={"Female"} checked={profile.gender === "M"} onChange={() => {
                        setProfile({
                            ...profile,
                            gender: "M",
                        })
                    }}/>
                </div>
            </div>
        </div>
    )

    const isEmailInvalid = check.email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(profile.email)
    const $errMsgForEmail = isEmailInvalid ? <p className={"text-xs text-red-500 font-medium"}>Oops! Try a valid email.</p> : null
    const $emailForm = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-base"}>Enter your email</p>
            <div placeholder={"YYYY"} className={"flex flex-1 border-l mt-1 border"}>
                <input onBlur={() => {
                    setCheck({
                        ...check,
                        email: true,
                    })
                }} onChange={(e) => {
                    setProfile({
                        ...profile,
                        email: e.target.value,
                    })
                }} className={"w-full px-2 h-12 text-base font-primary-focus "}/>
            </div>
            {$errMsgForEmail}
        </div>
    )

    const $errMsgForConfirmEmail = !isEmailInvalid && check.confirmEmail && profile.email !== profile.confirmEmail ? <p className={"text-xs text-red-500 font-medium"}>The confirm email must match your email address.</p> : null
    const $confirmedEmailForm = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-base"}>Confirm your email</p>
            <div placeholder={"YYYY"} className={"flex flex-1 border-l mt-1 border"}>
                <input onBlur={() => {
                    setCheck({
                        ...check,
                        confirmEmail: true,
                    })
                }} onChange={(e) => {
                    setProfile({
                        ...profile,
                        confirmEmail: e.target.value,
                    })
                }} className={"w-full px-2 h-12 text-base font-primary-focus "}/>
            </div>
            {$errMsgForConfirmEmail}
        </div>
    )

    const checkPasswordLength = profile.password.length >= 8
    const checkPasswordLetters = /[a-zA-Z]/.test(profile.password)
    const checkPasswordNumbers = /\d/.test(profile.password)

    const specialChars = "/[!@#$%^&*()_+-=[]{};':\"\\|,.<>/?]+/;"
    const checkPasswordSpecialChars = specialChars.split("").some(char => profile.password.includes(char))

    const $validatorView = check.password ? (
        <div className={"space-y-2 mt-2"}>
            <div className={"flex flex-row items-center space-x-2"}>
                <i className={`fas fa-check-double text-xs ${checkPasswordLength ? "text-green-500" : "text-red-500"}`} />
                <p className={`text-xs ${checkPasswordLength ? "text-green-500" : "text-red-500"} font-semibold`}>Use at least 8 characters</p>
            </div>

            <div className={"flex flex-row items-center space-x-2"}>
                <i className={`fas fa-check-double text-xs ${checkPasswordLetters ? "text-green-500" : "text-red-500"}`} />
                <p className={`text-xs ${checkPasswordLetters ? "text-green-500" : "text-red-500"} font-semibold`}>Use letters</p>
            </div>

            <div className={"flex flex-row items-center space-x-2"}>
                <i className={`fas fa-check-double text-xs ${checkPasswordNumbers ? "text-green-500" : "text-red-500"}`} />
                <p className={`text-xs ${checkPasswordNumbers ? "text-green-500" : "text-red-500"} font-semibold`}>Use numbers</p>
            </div>

            <div className={"flex flex-row items-center space-x-2"}>
                <i className={`fas fa-check-double text-xs ${checkPasswordSpecialChars ? "text-green-500" : "text-red-500"}`} />
                <p className={`text-xs ${checkPasswordSpecialChars ? "text-green-500" : "text-red-500"} font-semibold`}>Use special characters, like @#$%&*</p>
            </div>
        </div>
    ) : null

    const $passwordForm = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-base"}>Password</p>
            <div placeholder={"YYYY"} className={"flex flex-1 border-l mt-1 border"}>
                <input onBlur={() => {
                    setCheck({
                        ...check,
                        password: true,
                    })
                }} onChange={(e) => {
                    setProfile({...profile, password: e.target.value})
                }} className={"w-full px-2 h-12 text-base font-primary-focus "}/>
            </div>
            {$validatorView}
        </div>
    )

    const $agreementView = (
        <div className={"flex flex-row space-x-1 items-center"}>
            <input onChange={() => {
                setProfile({
                    ...profile,
                    checkedAgreement: !profile.checkedAgreement,
                })
            }} checked={profile.checkedAgreement} className={"form-checkbox w-4 h-4 mr-1"} type={"checkbox"}/>
            <p className={"text-sm font-medium text-primary-focus"}>
                {"I have read and accept Zendoc's"}
                <span className={"mx-1 leading-none border-b border-primary-focus hover:border-blue-600 hover:text-blue-600"}>Terms of Use</span>
                {"and"}
                <span className={"mx-1 leading-none border-b border-primary-focus hover:border-blue-600 hover:text-blue-600"}>Privacy Policy</span>
            </p>
        </div>
    )

    const onCreateUser = () => {
        const date = `${profile.birthdayYear}-${profile.birthdayMonth}-${profile.birthdayDay}`
        const hash = MD5(profile.password).toString()
            .toUpperCase()
        createUser(profile.firstName,
            profile.lastName,
            date,
            profile.gender,
            profile.email,
            hash,
            (isSuccess) => {
                if (isSuccess) {
                    history.push({
                        pathname: "/search",
                    })
                }
            }
        )
    }

    const $createUserButton = (
        <Button onClick={onCreateUser} size={ButtonSize.block}>Save and continue</Button>
    )

    const $contentView = (
        <div className={"w-full max-w-screen-sm mt-10 md:my-28 px-8 md:px-0"}>
            <div className={"w-full space-y-8"}>
                {$titleView}
                {$nameForms}
                {$dobForms}
                {$genderForms}
                {$emailForm}
                {$confirmedEmailForm}
                {$passwordForm}
                {$agreementView}
                {$createUserButton}
            </div>
        </div>
    )

    return (
        <div className={"w-full min-h-screen bg-gray-100 flex flex-col items-center"}>
            <NavBar />
            {$contentView}
        </div>
    )
}
