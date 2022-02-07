import React, {useState} from "react";
import SpecialtyFilter from "./specialtyFilter";
import DistanceFilter from "./distanceFilter";
import MoreFilter from "./moreFilter";
import CalendarFilter from "./calendarFilter";
import DateRangeDropdown from "./dateRangeDropdown";

export default function Filter() {
    const [selectedSpecialty, setSelectedSpecialty] = useState<Array<string>>([])
    const [showMoreFilter, setShowMoreFilter] = useState<boolean>(false)
    const [languages] = useState<Array<string>>([])

    const $toggleButtonForMoreFilter = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShowMoreFilter(true)
        }} type={"button"} className={`z-10 relative px-4 py-2 font-medium rounded-full flex flex-row items-center border text-primary-focus text-sm leading-tight hover:bg-base-250 hover:border-primary-focus ${showMoreFilter || languages.length ? "border-primary-focus bg-base-250" : "border-base-300 bg-white"}`}>
            More filters
        </button>
    )

    const $modalForMoreFilter = (
        <MoreFilter open={showMoreFilter} onClose={() => {
            setShowMoreFilter(false)
        }} onApply={() => {
            setShowMoreFilter(false)
        }} />
    )

    const $specialtyFilter = (
        <SpecialtyFilter selectedSpecialty={selectedSpecialty} onApply={(list) => {
            setSelectedSpecialty(list)
        }} />
    )

    const $distanceFilter = ( <DistanceFilter distance={""} onApply={() => {
        //
    }} />)

    const $fieldFilters = (
        <div className={'flex flex-row items-center space-x-2'}>
            {$specialtyFilter}
            {$distanceFilter}
            {$toggleButtonForMoreFilter}
            {$modalForMoreFilter}
        </div>
    )

    const $dateFilter = (
        <div className={'flex flex-row items-center space-x-2 divide-x'}>
            <CalendarFilter date={new Date} onApply={() => {
                //
            }} />

            <div className={'flex flex-row items-center space-x-2'}>
                <span>View</span>
                <DateRangeDropdown />
            </div>
        </div>
    )

    return (
        <div className={'flex flex-row items-center justify-between'}>
            {$fieldFilters}
            {$dateFilter}
        </div>
    )
}