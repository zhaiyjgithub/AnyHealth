import React, {useState} from "react"
import Button from "../../../../../components/buttons/button";
import {ButtonSize, ButtonStatus, Variant} from "../../../../../components/buttons/enum";
import {validateEmail} from "../../../../../utils/util/commonTool";
import useUserAuth from "../../../user/hooks/useUserAuth";
import {MD5} from "crypto-js"
import FormModal from "../../../../../components/modal/formModal";

interface IProps {
    show: boolean,
    onCancel: () => void,
    onLoginSuccess: () => void
}

export default function LoginModal(props: IProps) {
    const {show, onCancel, onLoginSuccess} = props
    const [email, setEmail] = useState<string>("yuanji.zhai@outlook.com")
    const [password, setPassword] = useState<string>("12345678")
    const [loginFailed, setLoginFailed] = useState<boolean>(false)
    const [validation, setValidation] = useState<{email: boolean, password: boolean}>({
        email: false,
        password: false,
    })
    const [loading, setLoading] = useState<boolean>(false)
    const { login } = useUserAuth()

    const onLogin = () => {
        setLoading(true)
        const hash = MD5(password).toString()
            .toUpperCase()
        login(email, hash, (isSuccess) => {
            setLoading(false)
            setLoginFailed(false)
            onCancel && onCancel()
            if (isSuccess) {
                onLoginSuccess()
            } else {
                setLoginFailed(true)
            }
        })
    }

    function closeModal() {
        onCancel && onCancel()
    }

    const $title = (
        <p className={"text-primary-focus font-bold text-2xl leading-none"}>To log in, enter your email address</p>
    )

    const $errMsgForEmail = () => {
        if (!validation.email) {
            return null
        }
        let desc = ""
        if (!email.length) {
            desc = "Please type your email."
        } else if (!validateEmail(email)) {
            desc = "Incorrect email format."
        }
        return desc.length ? <p className={"text-sm text-red-500 font-medium"}>{desc}</p> : null
    }
    const $emailForm = (
        <div>
            <p className={"mb-1 text-sm text-base-content font-medium"}>Email address</p>
            <input onBlur={() => {
                setValidation({
                    ...validation,
                    email: true,
                })
            }} value={email} placeholder={"Email"} type={"email"} onChange={(e) => {
                setEmail(e.target.value)
            }} className={"w-full px-2 py-3 text-sm font-medium text-primary-focus border border-gray-300 bg-blue-100 transition ease-in-out "}/>
            {$errMsgForEmail()}
        </div>
    )

    const $errMsgForPassword = () => {
        if (!validation.password) {
            return null
        }
        let desc = ""
        if (!email.length) {
            desc = "Please type your password."
        } else if (loginFailed) {
            desc = "Incorrect email or password."
        }
        return desc.length ? <p className={"text-sm text-red-500 font-medium"}>{desc}</p> : null
    }
    const $passwordForm = (
        <div>
            <p className={"inline-block mb-1 text-sm text-base-content font-medium"}>Your password</p>
            <input onBlur={() => {
                setValidation({
                    ...validation,
                    password: true,
                })
            }} value={password} placeholder={"Password"} type={"text"} onChange={(e) => {
                setPassword(e.target.value)
            }} className={"w-full px-2 py-3 text-sm font-medium text-primary-focus border border-gray-300 bg-blue-100 transition ease-in-out "}/>
            {$errMsgForPassword()}
        </div>
    )

    const $loginButton = (
        <Button status={loading ? ButtonStatus.disabled : ButtonStatus.primary} size={ButtonSize.block} onClick={() => {
            onLogin()
        }} >Log in</Button>
    )

    const $createUserView = (
        <div className={"flex flex-row items-center justify-center w-full space-x-1"}>
            <p className={"text-sm text-primary-focus"}>New to Zendoc?</p>
            <button type={"button"} className={"text-sm text-primary-focus border-b border-primary-focus leading-none font-semibold"} onClick={() => {
                //
            }} >Create an account</button>
        </div>
    )

    const $content = (
        <div className={"px-8 py-4 w-full flex flex-col space-y-4"}>
            {$title}
            {$emailForm}
            {$passwordForm}
            {$loginButton}
            {$createUserView}
        </div>
    )

    const $close = (
        <div className={"w-full flex flex-row justify-end mt-4"}>
            <Button onClick={closeModal} variant={Variant.float} >
                <i className="fas fa-times text-xl" />
            </Button>
        </div>
    )

    return (
        <FormModal show={show} >
            {$close}
            {$content}
        </FormModal>
    )
}
