
export default function GeneralProfile() {
    return (
        <div className={'w-full h-full bg-white mx-4 my-4 '}>
            <div className={'flex flex-row grid grid-flow-col auto-cols-max gap-x-8'}>
                <div className={'flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'First Name'}</p>
                    <input placeholder={'First Name'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Middle Name'}</p>
                    <input maxLength={1} placeholder={'Middle Name'} className={'uppercase mt-1 w-32 py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Last Name'}</p>
                    <input placeholder={'Last Name'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>
            </div>

            <div className={'flex flex-row grid grid-flow-col auto-cols-max gap-x-8'}>
                <div className={'flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Specialty'}</p>
                    <input placeholder={'Specialty'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>

                <div className={'flex flex-col'}>
                    <p className={'text-black text-sm font-semibold'}>{'Sub-Specialty'}</p>
                    <input maxLength={1} placeholder={'Sub-Specialty'} className={'uppercase mt-1 w-32 py-2 px-4 text-sm border border-gray-300 rounded'}/>
                </div>
            </div>

            {/*Gender*/}

            <div className={'flex flex-col'}>
                <p className={'text-black text-sm font-semibold'}>{'Phone Number'}</p>
                <input placeholder={'Phone Number'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
            </div>

            <div className={'flex flex-col'}>
                <p className={'text-black text-sm font-semibold'}>{'Email'}</p>
                <input placeholder={'Email'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
            </div>

            <div className={'flex flex-col'}>
                <p className={'text-black text-sm font-semibold'}>{'Address'}</p>
                <input placeholder={'Address'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
            </div>

            <div className={'flex flex-col'}>
                <p className={'text-black text-sm font-semibold'}>{'City'}</p>
                <input placeholder={'City'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
            </div>

            <div className={'flex flex-col'}>
                <p className={'text-black text-sm font-semibold'}>{'State'}</p>
                <input placeholder={'State'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
            </div>

            <div className={'flex flex-col'}>
                <p className={'text-black text-sm font-semibold'}>{'Zip'}</p>
                <input placeholder={'Zip'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
            </div>

            <div className={'flex flex-col'}>
                <p className={'text-black text-sm font-semibold'}>{'Country'}</p>
                <input placeholder={'Country'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
            </div>

            <div className={'flex flex-col'}>
                <p className={'text-black text-sm font-semibold'}>{'My Profile'}</p>
                <input placeholder={'My Profile'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
            </div>

            <div className={'flex flex-col'}>
                <p className={'text-black text-sm font-semibold'}>{'Experience'}</p>
                <input placeholder={'Experience'} className={'mt-1 w-48 py-2 px-4 text-sm border border-gray-300 rounded'}/>
            </div>
        </div>
    )
}