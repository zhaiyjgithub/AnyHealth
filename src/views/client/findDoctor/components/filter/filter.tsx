import React, {useState} from "react";
import SpecialtyFilter from "./specialtyFilter";
import DistanceFilter from "./distanceFilter";
import MoreFilter from "./moreFilter";
import CalendarFilter from "./calendarFilter";
import DateRangeDropdown, {AvailableDateRange} from "./dateRangeDropdown";

export default function Filter() {
    const [selectedSpecialty, setSelectedSpecialty] = useState<Array<string>>([])
    const [showMoreFilter, setShowMoreFilter] = useState<boolean>(false)
    const [languages] = useState<Array<string>>([])
    const [dateRange, setDateRange] = useState<AvailableDateRange>(AvailableDateRange.nextAvailable)
    const [nextAvailableDate, setNextAvailableDate] = useState<Date>(new Date())

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

    const onSelectDateRange = (range: AvailableDateRange) => {
        setDateRange(range)
    }

    const $dateFilter = (
        <div className={'flex flex-row items-center space-x-4'}>
            <CalendarFilter date={nextAvailableDate} onApply={(date) => {
                setNextAvailableDate(date)
            }} />
            <div className={'h-5 w-px bg-gray-200'}/>
            <div className={'flex flex-row items-center space-x-2'}>
                <span className={'text-sm leading-snug text-primary-focus font-medium'}>View</span>
                <DateRangeDropdown dateRange={dateRange} onSelect={onSelectDateRange} />
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