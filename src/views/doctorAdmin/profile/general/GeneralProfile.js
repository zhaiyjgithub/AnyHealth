import {useState} from 'react'

export default function GeneralProfile() {
    const [userInfo, setUserInfo] = useState({})
    return (
        <div className={'w-full bg-white mx-4 my-4 '}>
            <div className={'grid grid-flow-row auto-rows-max gap-y-4 w-max'}>
                <div className={'grid grid-flow-col auto-cols-max gap-x-4'}>
                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'First Name'}</p>
                        <input placeholder={'First Name'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
                    </div>

                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Middle Name'}</p>
                        <input maxLength={1} placeholder={'Middle Name'} className={' mt-1 w-32 py-2 px-4 text-sm border border-gray-300 rounded'}/>
                    </div>

                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Last Name'}</p>
                        <input placeholder={'Last Name'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
                    </div>
                </div>

                <div className={'grid grid-flow-col auto-cols-max gap-x-4'}>
                    <label className="inline-flex items-center ">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-primary" checked />
                        <span
                            className="ml-2 text-gray-700">Female
                        </span>
                    </label>

                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-primary" checked />
                        <span
                            className="ml-2 text-gray-700">Male
                        </span>
                    </label>

                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-primary" checked />
                        <span
                            className="ml-2 text-gray-700">Trans
                        </span>
                    </label>
                </div>

                <div className={'w-full grid grid-cols-2 gap-x-4'}>
                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Specialty'}</p>
                        <input placeholder={'Specialty'} className={'mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                    </div>

                    <div className={'flex flex-col'}>
                        <p className={'text-black text-sm font-semibold'}>{'Sub-Specialty'}</p>
                        <input maxLength={1} placeholder={'Sub-Specialty'} className={' mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                    </div>
                </div>

                {/*Gender*/}

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Phone Number'}</p>
                    <input placeholder={'Phone Number'} className={'mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Email'}</p>
                    <input placeholder={'Email'} className={'mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Address'}</p>
                    <input placeholder={'Address'} className={'mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'City'}</p>
                    <input placeholder={'City'} className={'mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'State'}</p>
                    <input placeholder={'State'} className={'mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Zip'}</p>
                    <input placeholder={'Zip'} className={'mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Country'}</p>
                    <input placeholder={'Country'} className={'mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Experience'}</p>
                    <input placeholder={'Experience'} className={'mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'w-full flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'My Profile'}</p>
                    <textarea placeholder={'My Profile'} className={'mt-1 w-full py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>
            </div>
        </div>
    )
}