import React from "react";
import FormModal from "../../../../components/modal/formModal";
import Button from "../../../../components/buttons/button";
import {Variant} from "../../../../components/buttons/enum";

interface IProps {
    show: boolean
    onClose: () => void
    onSave: () => void
}

export default function NewAppointmentModal(props: IProps) {
    const {onClose, show} = props
    const $closeButton = (
        <div className={"w-full flex flex-row justify-end mt-2"}>
            <Button onClick={() => {
                onClose && onClose()
            }} variant={Variant.float} >
                <i className="fas fa-times text-xl" />
            </Button>
        </div>
    )

    return (
        <FormModal show={show}>
            {$closeButton}
        </FormModal>
    )
}
