import React, {useEffect, useState} from 'react'
import {DoctorProfile, getDoctorProfile} from "./GeneralProfileService";
import {testNpi} from "../../../../utils/constant/Enum";
import {Gender, InfoStatus} from "../../../../utils/constant/Enums";
import {Transition} from '@headlessui/react'
import {Toast} from "../../../../components/toast/toast";

const GeneralProfile: React.FC = () => {
    const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | undefined>(undefined)
    const [isShowToast, setIsShowToast] = useState(false)

    useEffect(() => {
        getDoctorProfile(testNpi, (profile) => {
            setDoctorProfile(profile)
        })
    }, [])

    if (doctorProfile === undefined) {
        return <div className={'animate-pulse relative w-full flex-grow flex items-center justify-center'}>
            <p className={'text-sm text-md text'}>Loading...</p>
        </div>
    }

    const renderErrorMessage = (isShow: boolean, msg: string) => {
        if (!isShow) {
            return null
        }
        return (
            <label className={'font-mono text-sm italic font-semibold text-red-500 py-1'}>{msg}</label>
        )
    }

    const onSave = (profile: DoctorProfile) => {
        // saveDoctorProfile(profile, () => {
        //
        // })
        setIsShowToast(true)
        setTimeout(() => {
            setIsShowToast(false)
        }, 1500)
    }

    const renderToast = () => {
        return <Transition
            show={isShowToast}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <p className={'py-4 px-2 rounded bg-red-300 text-white fixed top-4 right-4'}>I will fade in and out</p>
        </Transition>

    }

    return (
        <div className={'w-full bg-white mx-4 my-4 relative'}>
            <div className={'grid grid-flow-row auto-rows-max gap-y-4 w-max'}>
                <div className={'grid grid-flow-col auto-cols-max gap-x-4'}>
                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'First Name'}</p>
                        <input value={doctorProfile.firstName} onChange={(e) => {
                            setDoctorProfile({
                                ...doctorProfile,
                                firstName: e.target.value
                            })
                        }} placeholder={'First Name'} className={'mt-1 w-48 p-2 text-sm border border-gray-300 rounded'}/>
                        {renderErrorMessage(!doctorProfile.firstName.length,"First name is required!")}
                    </div>

                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Middle Name'}</p>
                        <input maxLength={1} value={doctorProfile.midName} onChange={(e) => {
                            setDoctorProfile({
                                ...doctorProfile,
                                midName: e.target.value
                            })
                        }} placeholder={'Middle Name'} className={' mt-1 w-32 p-2 text-sm border border-gray-300 rounded'}/>
                    </div>

                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Last Name'}</p>
                        <input value={doctorProfile.lastName} onChange={(e) => {
                            setDoctorProfile({
                                ...doctorProfile,
                                lastName: e.target.value
                            })
                        }} placeholder={'Last Name'} className={'mt-1 w-48 p-2 text-sm border border-gray-300 rounded'}/>
                        {renderErrorMessage(!doctorProfile.lastName.length, "Last name is required!")}
                    </div>
                </div>

                <div className={'grid grid-flow-col auto-cols-max gap-x-4'}>
                    <label className="inline-flex items-center ">
                        <input onChange={() => {
                            setDoctorProfile({
                                ...doctorProfile,
                                gender: Gender.female
                            })
                        }} type="radio" className="form-radio h-5 w-5 text-primary" checked={doctorProfile.gender === Gender.female} />
                        <span
                            className="ml-2 text-gray-700">Female
                        </span>
                    </label>

                    <label className="inline-flex items-center">
                        <input onChange={() => {
                            setDoctorProfile({
                                ...doctorProfile,
                                gender: Gender.male
                            })
                        }} type="radio" className="form-radio h-5 w-5 text-primary" checked={doctorProfile.gender === Gender.male} />
                        <span
                            className="ml-2 text-gray-700">Male
                        </span>
                    </label>

                    <label className="inline-flex items-center">
                        <input onChange={() => {
                            setDoctorProfile({
                                ...doctorProfile,
                                gender: Gender.trans
                            })
                        }} type="radio" className="form-radio h-5 w-5 text-primary" checked={doctorProfile.gender === Gender.trans} />
                        <span
                            className="ml-2 text-gray-700">Trans
                        </span>
                    </label>
                </div>

                <div className={'w-full grid grid-cols-2 gap-x-4'}>
                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Specialty'}</p>
                        <input value={doctorProfile.specialty} onChange={(e) => {
                            setDoctorProfile({
                                ...doctorProfile,
                                specialty: e.target.value
                            })
                        }} placeholder={'Specialty'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                        {renderErrorMessage(!doctorProfile.specialty.length, "Specialty is required!")}
                    </div>

                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Sub-Specialty'}</p>
                        <input value={doctorProfile.subSpecialty} onChange={(e) => {
                            setDoctorProfile({
                                ...doctorProfile,
                                subSpecialty: e.target.value
                            })
                        }} placeholder={'Sub-Specialty'} className={' mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                        {renderErrorMessage(!doctorProfile.subSpecialty.length, "Sub specialty is required!")}
                    </div>
                </div>

                {/*Gender*/}
                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Job Title'}</p>
                    <input value={doctorProfile.credential} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            jobTitle: e.target.value
                        })
                    }} placeholder={'Job Title'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                    {renderErrorMessage(!doctorProfile.credential.length, "Job title is required!")}
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Phone Number'}</p>
                    <input value={doctorProfile.phone} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            phone: e.target.value
                        })
                    }} placeholder={'Phone Number'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                    {renderErrorMessage(!doctorProfile.phone.length, "Phone number is required!")}
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Email'}</p>
                    <input value={doctorProfile.email} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            email: e.target.value
                        })
                    }} placeholder={'Email'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Address'}</p>
                    <input value={doctorProfile.address} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            address: e.target.value
                        })
                    }} placeholder={'Address'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                    {renderErrorMessage(!doctorProfile.address.length, "Address is required!")}
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'City'}</p>
                    <input value={doctorProfile.city} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            city: e.target.value
                        })
                    }} placeholder={'City'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                    {renderErrorMessage(!doctorProfile.city.length, "City is required!")}
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'State'}</p>
                    <input value={doctorProfile.state} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            state: e.target.value
                        })
                    }} placeholder={'State'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Zip'}</p>
                    <input value={doctorProfile.zip} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            zip: e.target.value
                        })
                    }} placeholder={'Zip'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                    {renderErrorMessage(!doctorProfile.zip.length, "Zip code is required!")}
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Country'}</p>
                    <input value={doctorProfile.country} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            country: e.target.value
                        })
                    }} placeholder={'Country'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Experience'}</p>
                    <input value={doctorProfile.yearOfExperience} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            yearOfExperience: e.target.value
                        })
                    }}  placeholder={'Experience'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'My Profile'}</p>
                    <textarea value={doctorProfile.summary} onChange={(e) => {
                        setDoctorProfile({
                            ...doctorProfile,
                            summary: e.target.value
                        })
                    }} placeholder={'My Profile'} className={'mt-1 w-full p-2 text-sm border border-gray-300 rounded'}/>
                </div>
            </div>

            <div className={'py-4 bg-white fixed left-48 bottom-0 right-0 border-t flex flex-row items-center justify-end pr-16'}>
                <button onClick={() => {
                    onSave(doctorProfile)
                }} type={'button'} className={'rounded bg-primary hover:bg-primary-focus'}>
                    <p className={'px-4 py-2 font-medium text-sm text-white'}>Save</p>
                </button>
            </div>

            <Toast isShow={isShowToast} status={InfoStatus.success} msg={"Save successss!!!"} />
        </div>
    )
}

export default GeneralProfile