import React, {useState} from "react";
import Dropdown from "../doctorInformation/components/bookingCard/dropdown";
import {dataForInsurance} from "../doctorInformation/components/bookingCard/dataForInsuarnce";
import FormInput from "../../../components/form/formInput";
import {InsuranceInfo} from "./types";
import Button from "../../../components/buttons/button";
import {ButtonStatus} from "../../../components/buttons/enum";

interface IProps {
    insuranceInfo: InsuranceInfo,
    onSave: (info: InsuranceInfo) => void
}

export default function MyInsurance(props: IProps) {
    const [info, setInfo] = useState<InsuranceInfo>(props.insuranceInfo)
    const $title = (
        <p className={"text-2xl font-bold text-primary-focus"}>Insurance</p>
    )

    const $dropdownForMedicalInsurance = (
        <Dropdown title={""} placeholder={"Choose a medical insurance"} selected={info.Medical.InsuranceID} data={dataForInsurance} onChange={(id) => {
            setInfo({
                ...info,
                Medical: {
                    InsuranceID: id,
                    MemberID: "",
                    ImageUrls: [],
                },
            })
        }} />
    )

    const $dropdownForDetalInsurance = (
        <Dropdown title={""} placeholder={"Choose a dental insurance"} selected={info.Dental.InsuranceID} data={dataForInsurance} onChange={(id) => {
            setInfo({
                ...info,
                Dental: {
                    InsuranceID: id,
                    MemberID: "",
                    ImageUrls: [],
                },
            })
        }} />
    )

    const $dropdownForVisionInsurance = (
        <Dropdown title={""} placeholder={"Choose a vision insurance"} selected={info.Vision.InsuranceID} data={dataForInsurance} onChange={(id) => {
            setInfo({
                ...info,
                Vision: {
                    InsuranceID: id,
                    MemberID: "",
                    ImageUrls: [],
                },
            })
        }} />
    )

    const $table = (
        <table className="table-fixed w-full">
            <thead className={"bg-gray-300"}>
                <tr className={"px-4"}>
                    <th className={"text-left py-4 px-4"}>Type</th>
                    <th className={"text-left py-4 px-4"}>Plan</th>
                    <th className={"text-left py-4 px-4"}>Member ID</th>
                    <th className={"text-left py-4 px-4"}>Photo</th>
                </tr>
            </thead>
            <tbody>
                <tr className={"border-b"}>
                    <td className={"px-4 font-semibold"}>Medical</td>
                    <td className={"px-4 py-4"}>{$dropdownForMedicalInsurance}</td>
                    <td className={"px-4"}>
                        <FormInput title={""} value={info.Medical.MemberID} placeholder={"Optional"} onChangeText={(text) => {
                            setInfo({
                                ...info,
                                Medical: {
                                    InsuranceID: info.Medical.InsuranceID,
                                    MemberID: text,
                                    ImageUrls: info.Medical.ImageUrls,
                                },
                            })
                        }}/>
                    </td>
                    <td className={"px-4 text-2xl"}>
                        <i className="fas fa-camera"></i>
                    </td>
                </tr>
                <tr className={"border-b"}>
                    <td className={"px-4 font-semibold"}>Dental</td>
                    <td className={"px-4 py-4"}>{$dropdownForDetalInsurance}</td>
                    <td className={"px-4"}>
                        <FormInput title={""} value={info.Dental.MemberID} placeholder={"Optional"} onChangeText={(text) => {
                            setInfo({
                                ...info,
                                Dental: {
                                    InsuranceID: info.Dental.InsuranceID,
                                    MemberID: text,
                                    ImageUrls: info.Dental.ImageUrls,
                                },
                            })
                        }}/>
                    </td>
                    <td className={"px-4"}>{"N/A"}</td>
                </tr>
                <tr className={"border-b"}>
                    <td className={"px-4 font-semibold"}>Vision</td>
                    <td className={"px-4 py-4"}>{$dropdownForVisionInsurance}</td>
                    <td className={"px-4"}>
                        <FormInput title={""} value={info.Vision.MemberID} placeholder={"Optional"} onChangeText={(text) => {
                            setInfo({
                                ...info,
                                Vision: {
                                    InsuranceID: info.Vision.InsuranceID,
                                    MemberID: text,
                                    ImageUrls: info.Vision.ImageUrls,
                                },
                            })
                        }}/>
                    </td>
                    <td className={"px-4"}>{"N/A"}</td>
                </tr>
            </tbody>
        </table>
    )

    const $saveButton = (
        <div className={"w-max"}>
            <Button status={ButtonStatus.primary } onClick={() => {
                //
            }}>
                Save
            </Button>
        </div>
    )

    return (
        <div className={"w-full h-full space-y-8"}>
            {$title}
            {$table}
            {$saveButton}
        </div>
    )
}
