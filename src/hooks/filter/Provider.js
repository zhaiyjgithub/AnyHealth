import React, {} from 'react'
import {initialState, Reducer} from './Reducer'
import {AppointmentType, AvailableTimeRange, GenderType, SortBy} from "../../utils/constant/Enum";

export const initialFilter = {
	keyword: '',
	specialty: '',
	city: '',
	gender: GenderType.Trans,
	availableTime: AvailableTimeRange.AnyTime,
	appointmentType: AppointmentType.AnyType,
	sortBy: SortBy.Distance
}

export const FilterContext = React.createContext({
	dataSource: [],
	filter: initialFilter,
	onChangeFilter: () => null,
	onLoadMore: () => null
})
