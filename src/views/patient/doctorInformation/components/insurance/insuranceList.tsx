import React from "react";

interface IProps {
    data: Array<string>
}

export default function InsuranceList({data}: IProps) {
    const $item = (name: string, idx: number) => {
        return (
            <div key={idx} className={"w-full flex flex-row items-center space-x-4"}>
                <i className="fas fa-address-card text-lg text-pink-400"></i>
                <p className={"text-lg font-medium text-primary-focus"}>{name}</p>
            </div>
        )
    }
    const $list = () => {
        return <div className={"grid grid-cols-2 gap-y-8 mt-8"}>
            {data.map((_item, idx) => {
                return $item(_item, idx)
            })}
        </div>
    }

    const $titleView = (
        <>
            <p className={"text-xl text-primary-focus font-bold"}>In-network insurances</p>
            <p className={"mt-2 text-base font-medium text-primary-focus w-2/3 text-lg"}>
                <span className={" text-green-400 mr-1 text-lg"}>98% of patients</span>
                have successfully booked with these insurances
            </p>
        </>
    )
    return (
        <div className={"w-full"}>
            {$titleView}
            {$list()}
        </div>
    )
}
