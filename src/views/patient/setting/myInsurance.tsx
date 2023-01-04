import React, {useEffect, useState} from "react";
import Dropdown from "../doctorInformation/components/appointmentInfoPanel/dropdown";
import {dataForInsurance} from "../doctorInformation/components/appointmentInfoPanel/dataForInsuarnce";
import FormInput from "../../../components/form/formInput";
import {Insurance, InsuranceType} from "./types";
import Button from "../../../components/buttons/button";
import {ButtonStatus} from "../../../components/buttons/enum";
import {getUserInsurance, updateUserInsurance} from "./service";

export default function MyInsurance() {

    const [list, setList] = useState<Array<Insurance>>([
        {
            ID: 0,
            planID: "",
            type: InsuranceType.medical,
            memberID: "",
            imageFront: "",
            imageBack: "",
        },
        {
            ID: 0,
            planID: "",
            type: InsuranceType.dental,
            memberID: "",
            imageFront: "",
            imageBack: "",
        },
        {
            ID: 0,
            planID: "",
            type: InsuranceType.vision,
            memberID: "",
            imageFront: "",
            imageBack: "",
        },
    ])

    useEffect(() => {
        getUserInsurance(2, (data) => {
            console.log("data", data)
            data.forEach((item: any) => {
                if (item.type === InsuranceType.medical) {
                    list[0].ID = item.ID
                    list[0].planID = item.planID
                    list[0].memberID = item.memberID

                } else if (item.type === InsuranceType.dental) {
                    list[1].ID = item.ID
                    list[1].planID = item.planID
                    list[1].memberID = item.memberID

                } else if (item.type === InsuranceType.vision) {
                    list[2].ID = item.ID
                    list[2].planID = item.planID
                    list[2].memberID = item.memberID
                }
            })
            setList([...list])
            console.log("data source", list)
        }, () => {
            //
        })
    }, [])

    const $title = (
        <p className={"text-2xl font-bold text-primary-focus"}>Insurance</p>
    )

    const getTypeName = (type: InsuranceType) => {
        if (type === InsuranceType.medical) {
            return InsuranceType[InsuranceType.medical]
        } else if (type === InsuranceType.dental) {
            return InsuranceType[InsuranceType.dental]
        } else if (type === InsuranceType.vision) {
            return InsuranceType[InsuranceType.vision]
        }
        return ""
    }

    const $body = list.map((insurance, idx) => {
        return (
            <tr className={"border-b"} key={idx}>
                <td className={"px-4 font-semibold"}>{getTypeName(insurance.type)}</td>
                <td className={"px-4 py-4"}>
                    <Dropdown key={idx} title={""} placeholder={"None Selected"} selected={insurance.planID}
                        data={dataForInsurance} onChange={(id) => {
                            list[idx].planID = id
                            setList([...list])
                        }}/>
                </td>
                <td className={"px-4"}>
                    <FormInput title={""} value={insurance.memberID} placeholder={"(Optional)"}
                        onChangeText={(text) => {
                            list[idx].memberID = text
                            setList([...list])
                        }}/>
                </td>
                <td className={"px-4"}>{"N/A"}</td>
            </tr>
        )
    })

    const $table = (
        <table className="table-auto w-full ">
            <thead className={"bg-gray-300"}>
                <tr className={"px-4"}>
                    <th className={"text-left py-4 px-4"}>Type</th>
                    <th className={"text-left py-4 px-4"}>Plan</th>
                    <th className={"text-left py-4 px-4"}>Member ID</th>
                    <th className={"text-left py-4 px-4"}>Photo</th>
                </tr>
            </thead>
            <tbody>
                {$body}
            </tbody>
        </table>
    )

    const onClickSave = () => {
        updateUserInsurance(2, list, () => {
            alert("update success")
        }, () => {
            //
        })
    }

    const $saveButton = (
        <div className={"w-max"}>
            <Button status={ButtonStatus.primary} onClick={onClickSave}>
                Save
            </Button>
        </div>
    )

    return (
        <div className={"w-4/5 h-full space-y-8"}>
            {$title}
            {$table}
            {$saveButton}
        </div>
    )
}
