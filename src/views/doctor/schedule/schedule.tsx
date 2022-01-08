import React from "react";

export default function Schedule() {
    const $tab = (
        <div className="tabs">
            <a className="tab tab-lg tab-lifted">Large</a>
            <a className="tab tab-lg tab-lifted tab-active">Large</a>
            <a className="tab tab-lg tab-lifted">Large</a>
        </div>
    )
    return (
        <div className={'w-full flex-1 '}>
            {$tab}
        </div>
    )
}