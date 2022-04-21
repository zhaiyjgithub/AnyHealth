import React from "react";
import "./toolTips.css"

export default function VideoVisitToolTips() {
    return (
        <div className={"tooltip relative"}>
            <a><i className="far fa-question-circle text-gray-400" /></a>
            <div className={"w-64 p-2.5 bg-white rounded border border-gray-300 z-20 absolute left-0 invisible tooltip-item"}>
                <p className={"text-sm text-primary-focus w-full"}>
                    Video visits are a convenient way to talk with a provider online from your computer or phone. This provider uses a third party video service that is not integrated with Zendoc and will take place on an external platform. Look out for details from the provider on how to join.
                </p>
            </div>
        </div>
    )
}
