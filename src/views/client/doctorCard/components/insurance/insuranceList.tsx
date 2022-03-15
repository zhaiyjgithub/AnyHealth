import React from "react";

export default function InsuranceList() {
    const data: Array<string> = ['Insurance 111', 'Insurance 111', 'Insurance 111', 'Insurance 111', 'Insurance 111']

    const $item = (name: string, idx: number) => {
        return (
            <div key={idx} className={'w-full flex flex-row items-center space-x-4'}>
                <div className={'w-6 h-6 bg-red-300'}/>
                <p className={'text-lg font-semibold text-primary-focus'}>{name}</p>
            </div>
        )
    }
    const $list = () => {
        return <div className={'grid grid-cols-2 gap-y-8 mt-8'}>
            {data.map((_item, idx) => {
                return $item(_item, idx)
            })}
        </div>
    }

    const $titleView = (
        <>
            <p className={"text-xl text-primary-focus font-bold"}>In-network insurances</p>
            <p className={'mt-2 text-base font-medium text-primary-focus w-2/3 text-lg'}>
                <span className={' text-green-400 mr-1 text-lg'}>98% of patients</span>
                have successfully booked with these insurances
            </p>
        </>
    )
    return (
        <div className={'w-full'}>
            {$titleView}
            {$list()}
        </div>
    )
}