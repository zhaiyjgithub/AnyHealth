import React, {useContext, useEffect, useState} from "react";
import SpecialtyFilter from "./specialtyFilter";
import DistanceFilter from "./distanceFilter";
import MoreFilter, {DataForMoreFilter} from "./moreFilter";
import CalendarFilter from "./calendarFilter";
import DateRangeDropdown, {AvailableDateRange} from "./dateRangeDropdown";
import {ActionTypeForSearchFilter, SearchFilterContext} from "../../searchFilterProvider";
import {Gender} from "../../../../../utils/enum/enum";
import moment from "moment";

export default function Filter() {
    const [showMoreFilter, setShowMoreFilter] = useState<boolean>(false)
    const [languages] = useState<Array<string>>([])
    const [dateRange, setDateRange] = useState<AvailableDateRange>(AvailableDateRange.nextAvailable)
    const [moreFilter, setMoreFilter] = useState<DataForMoreFilter>({gender: Gender.Trans})

    const {state, dispatch} = useContext(SearchFilterContext)

    const onDispatch = (type: ActionTypeForSearchFilter, value: any) => {
        dispatch({type: type, value: value})
    }

    useEffect(() => {
        onDispatch(ActionTypeForSearchFilter.moreFilter, moreFilter)
    }, [moreFilter])
    
    useEffect(() => {
        let endDate = null
        if (dateRange === AvailableDateRange.next5Days) {
            const m = moment(state.startDate).add(5, "days")
            endDate = new Date(m.year(), m.month(), m.date(), 23, 59, 59, 0)
        } else if (dateRange === AvailableDateRange.next2Weeks) {
            const m = moment(state.startDate).add(14, "days")
            endDate = new Date(m.year(), m.month(), m.date(), 23, 59, 59, 0)
        }
        onDispatch(ActionTypeForSearchFilter.endDate, endDate)
    }, [dateRange])

    const $toggleButtonForMoreFilter = (
        <button onClick={(e) => {
            e.stopPropagation()
            setShowMoreFilter(true)
        }} type={"button"} className={`z-10 relative px-4 py-2 font-medium rounded-full flex flex-row items-center border text-primary-focus text-sm leading-tight hover:bg-base-250 hover:border-primary-focus ${showMoreFilter || languages.length ? "border-primary-focus bg-base-250" : "border-base-300 bg-white"}`}>
            More filters
        </button>
    )

    const $modalForMoreFilter = (
        <MoreFilter filter={moreFilter} open={showMoreFilter} onApply={(filter) => {
            setMoreFilter(filter)
            setShowMoreFilter(false)
        }} />
    )

    const $specialtyFilter = (
        <SpecialtyFilter selectedSpecialty={state.specialty} onApply={(specialty) => {
            onDispatch(ActionTypeForSearchFilter.specialty, specialty)
        }} />
    )

    const $distanceFilter = (<DistanceFilter distance={state.distance} onApply={(distance) => {
        onDispatch(ActionTypeForSearchFilter.distance, distance)
    }} />)

    const $fieldFilters = (
        <div className={"flex flex-row items-center space-x-2"}>
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
        <div className={"flex flex-row items-center space-x-4"}>
            <CalendarFilter date={state.startDate} onApply={(date) => {
                onDispatch(ActionTypeForSearchFilter.startDate, date)
            }} />
            <div className={"h-5 w-px bg-gray-200"}/>
            <div className={"flex flex-row items-center space-x-2"}>
                <span className={"text-sm leading-snug text-primary-focus font-medium"}>View</span>
                <DateRangeDropdown dateRange={dateRange} onSelect={onSelectDateRange} />
            </div>
        </div>
    )

    return (
        <div className={"flex flex-row items-center justify-between"}>
            {$fieldFilters}
            {$dateFilter}
        </div>
    )
}