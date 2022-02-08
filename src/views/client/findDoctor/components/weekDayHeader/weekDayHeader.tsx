import React from "react";

export default function WeekDayHeader() {
    const $counterForInNextWork = (
        <div className={"text-3xl h-16 flex flex-1 flex-row items-center "}>
            <span>
                <svg data-test="search-results-in-network-icon" xmlns="http://www.w3.org/2000/svg" color="#00E6AF" additional-margin="true" className="w-7 h-7"
                    viewBox="0 0 31 35"><path opacity=".12"
                        d="M15.5 1.813C11.086 5.426 3.946 6.186 2.067 6.28c-.282 0-.47.286-.47.57.47 22.723 11.274 27.097 13.717 27.762.282.095.657.095.94 0 2.442-.665 13.246-4.944 13.998-27.571 0-.285-.188-.57-.47-.57-1.973-.19-9.02-.951-13.34-4.66-.377-.19-.658-.19-.94 0z"
                        fill="#000"></path><path
                        d="M14.748.48C10.238 4.095 3.193 4.855 1.22 4.95c-.282 0-.47.284-.47.57.47 22.722 11.274 27.096 13.717 27.761.281.095.657.095.94 0 2.442-.665 13.246-4.944 13.997-27.571 0-.285-.187-.57-.47-.57-1.972-.19-9.018-.951-13.34-4.66-.282-.284-.658-.284-.846 0z"
                        fill="#00D19F"></path><path
                        d="M14.749 3.524C11.179 6.471 5.448 7.042 3.85 7.232c-.282 0-.47.19-.47.38.376 18.445 9.113 22.057 11.086 22.628.282.095.564.095.752 0 1.973-.57 10.71-3.993 11.368-22.438 0-.285-.188-.475-.376-.475-1.597-.095-7.328-.76-10.898-3.803-.094-.19-.376-.19-.564 0z"
                        fill="#00E6AF"></path><path d="M10.917 21.042l1.965 1.77 8.868-10.087-1.966-1.77-8.867 10.087z"
                        fill="#fff"></path><path
                        d="M12.86 22.733l1.75-1.989-4.423-3.981-1.748 1.989 4.422 3.981z" fill="#fff"></path></svg>
            </span>
            <span className={"ml-4 text-primary-focus font-bold"}>3 In-network provider</span>
        </div>
    )

    const $day = (date: Date, idx: number) => {
        console.log(date)
        return (
            <div key={idx} className={"flex flex-col items-center justify-center"}>
                <p className={"text-sm text-primary-focus font-semibold text-center"}>{"Sat"}</p>
                <p className={"text-sm text-primary-focus font-bold text-center"}>{"Feb 2"}</p>
            </div>
        )
    }
    
    const $previous = (
        <button type={"button"} className={"h-8 w-8 flex items-center justify-center rounded-full hover:bg-base-300"}>
            <svg data-test="icon-arrow-left" className="w-4 h-4"
                viewBox="0 0 26 40">
                <polygon fill="#00234B" points="20.3,40 25.7,34.5 11.2,20 25.7,5.5 20.3,0 0.3,20"></polygon>
            </svg>
        </button>
    )

    const $next = (
        <button type={"button"} className={"h-8 w-8 flex items-center justify-center rounded-full hover:bg-base-300 transform rotate-180"}>
            <svg data-test="icon-arrow-left" className="w-4 h-4"
                viewBox="0 0 26 40">
                <polygon fill="#00234B" points="20.3,40 25.7,34.5 11.2,20 25.7,5.5 20.3,0 0.3,20"></polygon>
            </svg>
        </button>
    )
    
    const data = [0, 1, 2, 3, 4]
    const $weekDays = () => {
        return (
            <div className={'flex flex-1 grid grid-cols-5'}>
                {data.map((idx) => {
                    return $day(new Date(), idx)
                })}
            </div>
        )
    }

    const $weekDayList = (
        <div className={"flex-1 flex flex-row items-center justify-"}>
            {$previous}
            {$weekDays()}
            {$next}
        </div>
    )

    return (
        <div className={"flex flex-row items-center justify-between bg-white"}>
            {$counterForInNextWork}
            {$weekDayList}
        </div>
    )
}