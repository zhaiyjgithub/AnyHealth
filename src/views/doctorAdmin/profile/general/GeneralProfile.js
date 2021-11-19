
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
        </div>
    )
}