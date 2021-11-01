
import moment from "moment";
import {TimeFormat} from "../../../../utils/constant/Enum";
import {Request} from "../../../../utils/httpTool/HttpTool";
import {ApiSchedule} from "../../../../utils/httpTool/Api";

export const getClosedDateSettings = (npi, success, fail) => {
    const param = {
        Npi: npi
    }
    Request(ApiSchedule.GetClosedDateSettings, param, (data) => {
        success && success(data)
    } , () => {
        fail && fail()
    })
}

export const deleteClosedDateSettingsByID = (npi, sid, success, fail) => {
    const param = {
        Npi: npi,
        Sid: sid
    }
    Request(ApiSchedule.DeleteClosedDateSettings, param, () => {
        success && success()
    }, (error) => {
        fail && fail(error)
    })

}