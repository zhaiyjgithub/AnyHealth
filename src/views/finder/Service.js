import {HTTP, Request} from "../../utils/httpTool/HttpTool";
import {ApiDoctor} from "../../utils/httpTool/Api";
import {AppointmentType, AvailableTimeRange, GenderType, SortBy} from "../../utils/constant/Enum";

export const findDoctor = (keyword = '',
						   isInClinicEnable = true,
						   isVirtualEnable = true,
						   appointmentType = AppointmentType.AnyType,
						   nextAvailableDate = AvailableTimeRange.AnyTime,
						   gender = GenderType.Trans,
						   specialty = '',
						   city = '',
						   lat = 0,
						   lon = 0,
						   distance = 200,
						   page = 1,
						   pageSize = 20,
						   sortType = SortBy.Default,
						   success,
						   fail
						   ) => {
	const param = {
		"Keyword": keyword,
		"IsInClinicEnable": isInClinicEnable,
		"IsVirtualEnable": isVirtualEnable,
		"AppointmentType": appointmentType,
		"NextAvailableDate": nextAvailableDate,
		"Gender": gender,
		"Specialty": specialty,
		"City": city,
		"Lat": lat,
		"Lon": lon,
		"Distance": distance,
		"Page": page,
		"PageSize": pageSize,
		"SortType": sortType
	}
	Request(ApiDoctor.SearchDoctor, param, (data, msg) => {
		success && success(data)
	}, (error) => {
		fail && fail(error)
	})
}
