import React from "react";

interface IProps {
    doctorName: string
}

export default function Faq(props: IProps) {
    const { doctorName } = props
    return (
        <div>
            <p className={"text-xl text-primary-focus font-bold"}>Frequently questions</p>
            <div className={"space-y-8 mt-4"}>
                <div className={"space-y-2"}>
                    <p className={"text-base text-primary-focus font-semibold"}>{`How soon can I make an appointment with ${doctorName}?`}</p>
                    <p className={"text-base text-primary-focus "}>
                        {`Generally, ${doctorName} has appointments available on Zocdoc within 1 week. You can see ${doctorName}'s earliest availability on Zocdoc and`}
                        <span className={"text-blue-500 ml-1"}>
                        make an appointment online
                        </span>.
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>{`Is ${doctorName} accepting new patients?`}</p>
                    <p className={"text-base text-primary-focus "}>
                        {`${doctorName} generally accepts new patients on Zocdoc.`}
                        <span className={"text-blue-500 mx-1"}>{`You can see ${doctorName} earliest availability`}
                        </span>on Zocdoc and schedule an appointment online.
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>{`Does ${doctorName} accept my insurance?`}</p>
                    <p className={"text-base text-primary-focus "}>
                        <span className={"text-blue-500 mr-1"}>
                            Choose your insurance plan
                        </span>
                        {`to verify if ${doctorName} is in-network.`}
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>{`Can I make an appointment with ${doctorName} online?`}</p>
                    <p className={"text-base text-primary-focus "}>
                        Yes, you can
                        <span className={"text-blue-500 mx-1"}>
                        make an appointment online
                        </span>
                        {`with ${doctorName} using Zocdoc. It’s simple,`}
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>{`What practice does ${doctorName} work with?`}</p>
                    <p className={"text-base text-primary-focus"}>
                        <span className={"text-blue-500 mr-1"}>
                            {doctorName}
                        </span>
                        work with
                        <span className={"text-blue-500 ml-1"}>
                        Action Urgent Care.
                        </span>
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>{`Where is ${doctorName}'s office located?`}</p>
                    <p className={"text-base text-primary-focus "}>
                        {`${doctorName} has 6 office locations in San Jose,sdsd`}
                        <span className={"text-blue-500 mx-1"}>
                         view full addresses
                        </span>
                        {`on ${doctorName} profile.`}
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>{`What are common reasons for patients to see ${doctorName}?`}</p>
                    <p className={"text-base text-primary-focus "}>
                        {`${doctorName} frequently sees patients for Allergy Consultation, Annual Pap Smear / GYN Exam, Annual Physical, Illness, and Pediatric Consultation. You can`}
                        <span className={"text-blue-500 mx-1"}>
                          see other visit reasons
                        </span>
                        {`for ${doctorName} on their profile.`}
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>{`What languages does ${doctorName} speak?`}</p>
                    <p className={"text-base text-primary-focus "}>
                        <span className={"text-blue-500 mx-1"}>
                            {doctorName}
                        </span>
                         speaks English, Spanish, Vietnamese, and Russian.
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>{`How do patients rate ${doctorName} in reviews?`}</p>
                    <p className={"text-base text-primary-focus "}>
                        {`121 patients have reviewed ${doctorName} The overall rating for this doctor is 3.56/5. They have a 3.85/5 rating for bedside manner and a 3.78/5 rating for wait time. You can`}
                        <span className={"text-blue-500 mx-1"}>
                           read individual reviews and ratings
                        </span>
                        on their profile.
                    </p>
                </div>

            </div>
        </div>
    )
}
