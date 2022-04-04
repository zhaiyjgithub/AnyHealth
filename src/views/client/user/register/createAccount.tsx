import React from "react";
import NavBar from "./components/navbar/navbar";
import FormRadio from "../../../../components/form/formRadio";
import Button from "../../../../components/buttons/button";
import {ButtonStatus} from "../../../../components/buttons/enum";

export default function CreateAccount() {
    const $titleView = (
        <div className={'space-y-2'}>
            <p className={'text-4xl font-bold text-primary-focus'}>Create an account</p>
            <Button status={ButtonStatus.link} onClick={() => {
                //
            }}>
                Already have one? Log in
            </Button>
        </div>
    )
    const $nameForms = (
        <div>
            <p className={"font-semibold text-primary-focus text-base"}>Your name</p>
            <div className={"w-full flex flex-row border"}>
                <div className={"flex flex-1"}>
                    <input placeholder={"First"} className={"w-full px-2 py-3 text-base font-primary-focus "}/>
                </div>
                <div className={"flex flex-1 border-l"}>
                    <input placeholder={"Last"} className={"w-full px-2 py-3 text-base font-primary-focus "}/>
                </div>
            </div>
        </div>
    )

    const $dobForms = (
        <div className={'w-full'}>
            <p className={"font-semibold text-primary-focus text-base"}>Date of birth</p>
            <div className={"w-full flex flex-row border"}>
                <div className={"flex flex-1"}>
                    <input placeholder={"MM"} className={"w-full px-2 py-3 text-base font-primary-focus "}/>
                </div>
                <div className={"flex flex-1"}>
                    <input placeholder={"DD"} className={"w-full px-2 py-3 text-base font-primary-focus border-l"}/>
                </div>
                <div className={"flex flex-1 border-l"}>
                    <input placeholder={"YYYY"} className={"w-full px-2 py-3 text-base font-primary-focus "}/>
                </div>
            </div>
        </div>
    )
    
    const $genderForms = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-base"}>Enter your gender</p>
            <div className={"w-full flex flex-row items-center bg-white border"}>
                <div className={"px-3 py-3 flex flex-1 flex-row"}>
                    <FormRadio titleClassName={'text-base'} key={3} title={"No"} checked={false} onChange={() => {
                        // 
                    }}/>
                </div>
                <div className={"px-3 py-3 flex flex-1 flex-row border-l"}>
                    <FormRadio titleClassName={'text-base'} key={4} title={"Yes"} checked={false} onChange={() => {
                        // 
                    }}/>
                </div>
            </div>
        </div>
    )
    
    const $emailForm = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-base"}>Enter your email</p>
            <div placeholder={"YYYY"} className={"flex flex-1 border-l mt-1 border"}>
                <input className={"w-full px-2 py-3 text-base font-primary-focus "}/>
            </div>
        </div>
    )

    const $confirmedEmailForm = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-base"}>Confirm your email</p>
            <div placeholder={"YYYY"} className={"flex flex-1 border-l mt-1 border"}>
                <input className={"w-full px-2 py-3 text-base font-primary-focus "}/>
            </div>
        </div>
    )

    const $validatorView = (
        <div className={'space-y-2 mt-2'}>
            <div className={'flex flex-row items-center space-x-2'}>
                <i className="fas fa-check-double text-xs text-green-500" />
                <p className={'text-xs text-green-500 font-semibold'}>Use at least 8 characters</p>
            </div>

            <div className={'flex flex-row items-center space-x-2'}>
                <i className="fas fa-check-double text-xs text-green-500" />
                <p className={'text-xs text-green-500 font-semibold'}>Use letters</p>
            </div>

            <div className={'flex flex-row items-center space-x-2'}>
                <i className="fas fa-check-double text-xs text-green-500" />
                <p className={'text-xs text-green-500 font-semibold'}>Use numbers</p>
            </div>

            <div className={'flex flex-row items-center space-x-2'}>
                <i className="fas fa-check-double text-xs text-green-500" />
                <p className={'text-xs text-green-500 font-semibold'}>Use special characters, like @#$%&*</p>
            </div>
        </div>
    )

    const $passwordForm = (
        <div className={"w-full"}>
            <p className={"font-semibold text-primary-focus text-base"}>Password</p>
            <div placeholder={"YYYY"} className={"flex flex-1 border-l mt-1 border"}>
                <input className={"w-full px-2 py-3 text-base font-primary-focus "}/>
            </div>
            {$validatorView}
        </div>
    )
    
    const $contentView = (
        <div className={"w-full max-w-screen-sm mt-28"}>
            <div className={"w-full space-y-8"}>
                {$titleView}
                {$nameForms}
                {$dobForms}
                {$genderForms}
                {$emailForm}
                {$confirmedEmailForm}
                {$passwordForm}
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