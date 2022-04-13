import {Dialog, Transition} from "@headlessui/react"
import React, {Fragment, useState} from "react"
import Button from "../../../../../components/buttons/button";
import {ButtonSize, ButtonStatus, Variant} from "../../../../../components/buttons/enum";
import {validateEmail} from "../../../../../utils/util/commonTool";
import useUserAuth from "../../../user/hooks/useUserAuth";
import {useHistory} from "react-router-dom";
import {MD5} from "crypto-js"

interface IProps {
    open: boolean,
    onApply: () => void,
}

export default function LoginModal(props: IProps) {
    const {open, onApply} = props
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loginFailed, setLoginFailed] = useState<boolean>(false)
    const [validation, setValidation] = useState<{email: boolean, password: boolean}>({
        email: false,
        password: false,
    })
    const [loading, setLoading] = useState<boolean>(false)
    const { login } = useUserAuth()
    const history = useHistory()

    const onLogin = () => {
        setLoading(true)
        const hash = MD5(password).toString()
            .toUpperCase()
        login(email, hash, (isSuccess) => {
            setLoading(false)
            setLoginFailed(false)
            onApply && onApply()
            if (isSuccess) {
                history.push({
                    pathname: "/search",
                })
            } else {
                setLoginFailed(true)
            }
        })
    }

    function closeModal() {
        onApply && onApply()
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
        }} >Login</Button>
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
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            // enter="ease-out duration-300"
                            // enterFrom="opacity-0"
                            // enterTo="opacity-60"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-60"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black transition ease-in-out opacity-60" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block border my-8 w-max overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                {$close}
                                {$content}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
