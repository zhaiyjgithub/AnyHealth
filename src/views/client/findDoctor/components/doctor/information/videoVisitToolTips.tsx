import React from "react";
import './toolTips.css'

export default function VideoVisitToolTips() {
    return (
        <div className={'tooltip relative'}>
            <a className={'hover: text-gray-300'}><i className="far fa-question-circle text-gray-500"></i></a>
            <div className={'w-56 p-4 border border-gray-300 z-20 absolute right-0 invisible tooltip-item'}>
                <p className={'text-xs text-gray-400 w-full'}>
                    Video visits are a convenient way to talk with a provider online from your computer or phone. This provider uses a third party video service that is not integrated with AnyHealth and will take place on an external platform. Look out for details from the provider on how to join.
                </p>
            </div>
        </div>
    )
}