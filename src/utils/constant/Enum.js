
const GenderType = {
	Female: 'F',
	Male: 'M',
	Trans: ''
}

const AvailableTimeRange = {
	AnyTime: 0,
	Today: 1,
	InWeek: 2,
}

const AppointmentType = {
	AnyType: 0,
	InClinic: 1,
	Virtual: 2
}

const SortBy = {
	Default: 0,
	Distance: 1
}

const WeekDay = {
	Sunday: 0,
	Monday: 1,
	Tuesday: 2,
	Wednesday: 3,
	Thursday: 4,
	Friday: 5,
	Saturday: 6,
}

const APM = {
	AM: 0,
	PM: 1
}

const TimeFormat = {
	YYYYMMDDHHmm: 'YYYY-MM-DD HH:mm'
}

export {
	GenderType,
	AvailableTimeRange,
	AppointmentType,
	SortBy,
	WeekDay,
	APM,
	TimeFormat
}
