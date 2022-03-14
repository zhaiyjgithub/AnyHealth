import React from "react";
import Button from "../../../../../components/buttons/button";
import {Variant} from "../../../../../components/buttons/enum";

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

    const $recentDetailView = () => {
        return (
            <div className={'w-full space-y-2'}>
                <div className={'block'}>
                    <span className={'w-full text-base font-primary-focus line-clamp-3'}>{'Dr. Suri was very thorough and asked important questions regarding y background and medical history. He explained my afib with pictures and explanations which no other doctor did. I find fib with pictures and explanations which no other doctor did. I find'}</span>
                    <button type={'button'} className={'cursor-pointer text-blue-500 border-b border-blue-500 border-dotted hover:border-solid'}>Show more</button>
                </div>
                <p className={'text-base text-gray-400'}>Marie C.March 9, 2022</p>
            </div>
        )
    }

    const onClickReadMoreButton = () => {
        //
    }
    const $readMoreReviewsButton = (
        <Button onClick={onClickReadMoreButton} variant={Variant.outline} >
            Read more reviews
        </Button>
    )
    const $recentList = (
        <div className={'border-l px-8 h-96 flex-1 space-y-4'}>
            <p className={'text-base text-semibold text-primary-focus'}>Recent reviews</p>
            <div className={'space-y-4'}>
                {$recentDetailView()}
                {$recentDetailView()}
            </div>
            {$readMoreReviewsButton}
        </div>
    )
    return (
        <div className={'w-full pt-4 flex flex-row pb-8 border-b-8 border-base-200'}>
            {$overallRatingView}
            {$recentList}
        </div>
    )
}