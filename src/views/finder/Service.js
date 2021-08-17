import {HTTP, Request} from "../../utils/httpTool/HttpTool";
import {ApiDoctor} from "../../utils/httpTool/Api";
import {AppointmentType, AvailableTimeRange, GenderType, SortBy} from "../../utils/constant/Enum";

export const findDoctor = (keyword = '',
						   isInClinicEnable,
						   isVirtualEnable,
						   appointmentType,
						   nextAvailableDate ,
						   gender ,
						   specialty ,
						   city ,
						   lat ,
						   lon ,
						   distance ,
						   page ,
						   pageSize ,
						   sortType ,
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
