import {AppointmentType, AvailableTimeRange, GenderType} from "../../utils/constant/Enum";

export const FilterActionType = {
	KeyWord: 0,
	Specialty: 1,
	City: 2,
	Gender: 3,
	AvailableTime: 4,
	AppointmentType: 5,
}

export const Reducer = (state, action) => {
	switch (action.type) {
		case FilterActionType.KeyWord:
			return {
				...state,
				keyWord: action.keyword
			}
		case FilterActionType.Specialty:
			return {
				...state,
				specialty: action.specialty
			}
		case FilterActionType.City:
			return {
				...state,
				city: action.city
			}
		case FilterActionType.Gender:
			return {
				...state,
				gender: action.gender
			}
		case FilterActionType.AvailableTime:
			return {
				...state,
				availableTime: action.availableTime
			}
		case FilterActionType.AppointmentType:
			return {
				...state,
				appointmentType: action.appointmentType
			}
		default:
			return state
	}
}

export const initialState = {
	keyword: '',
	specialty: '',
	city: '',
	gender: GenderType.Trans,
	availableTime: AvailableTimeRange.AnyTime,
	appointmentType: AppointmentType.AnyType
}
