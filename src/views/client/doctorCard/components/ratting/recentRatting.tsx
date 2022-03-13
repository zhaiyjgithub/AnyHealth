import React from "react";

export default function RecentRatting() {
    const $star = (
        <i className="fas fa-star text-red-400"></i>
    )
    const $unStar = (
        <i className="fas fa-star text-gray-400"></i>
    )
    const $startList = (
        <div className={"max-w-max flex flex-row items-center space-x-2"}>
            {$star}
            {$star}
            {$star}
            {$star}
            {$unStar}
        </div>
    )
    const $allReviewsButton = (
        <button type={"button"} className={"text-base max-w-max text-blue-600 font-semibold border-blue-600 border-b border-dotted hover:border-solid"}>105 Reviews</button>
    )
    const $overallRatingView = (
        <div className={'px-8 flex flex-col flex-none space-y-2'}>
            <p className={'text-lg font-semibold text-primary-focus'}>Overall ratting</p>
            <p className={'text-primary-focus my-4 text-5xl'}>4.05</p>
            {$startList}
            {$allReviewsButton}
        </div>
    )

    const $recentList = (
        <div className={'border-l px-8 h-96 bg-red-400 flex-1'}>

        </div>
    )
    return (
        <div className={'w-full pt-4 flex flex-row'}>
            {$overallRatingView}
            {$recentList}
        </div>
    )
}