import React from "react";

export default function Faq() {
    return (
        <div>
            <p className={"text-xl text-primary-focus font-bold"}>Frequently questions</p>
            <div className={'space-y-8 mt-4'}>
                <div className={'space-y-2'}>
                    <p className={"text-base text-primary-focus font-semibold"}>How soon can I make an appointment with Dr. Binh Dang?</p>
                    <p className={"text-base text-primary-focus "}>
                        Generally, Dr. Binh Dang has appointments available on Zocdoc within 1 week. You can see Dr. Dangs earliest availability on Zocdoc and
                        <span className={"text-blue-500 ml-1"}>
                        make an appointment online
                        </span>.
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>Is Dr. Binh Dang accepting new patients?</p>
                    <p className={"text-base text-primary-focus "}>
                        Dr. Binh Dang generally accepts new patients on Zocdoc.
                        <span className={"text-blue-500 mx-1"}>{`You can see Dr. Dang's earliest availability`}
                        </span>on Zocdoc and schedule an appointment online.
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>Does Dr. Binh Dang accept my insurance?</p>
                    <p className={"text-base text-primary-focus "}>
                        <span className={"text-blue-500 mr-1"}>
                            Choose your insurance plan
                        </span>
                        to verify if Dr. Dang is in-network.
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>Can I make an appointment with Dr. Binh Dang online?</p>
                    <p className={"text-base text-primary-focus "}>
                        Yes, you can
                        <span className={"text-blue-500 mx-1"}>
                        make an appointment online
                        </span>
                        with Dr. Dang using Zocdoc. It’s simple,
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>What practice does Dr. Binh Dang work with?</p>
                    <p className={"text-base text-primary-focus"}>
                        <span className={"text-blue-500 mr-1"}>
                        Dr. Binh Dang
                        </span>
                        work with
                        <span className={"text-blue-500 ml-1"}>
                        Action Urgent Care.
                        </span>
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>{`Where is Dr. Binh Dang's office located?`}</p>
                    <p className={"text-base text-primary-focus "}>
                        Dr. Binh Dang has 6 office locations in San Jose,
                        <span className={"text-blue-500 mx-1"}>
                         view full addresses
                        </span>
                        {`on Dr. Dang's profile.`}
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>What are common reasons for patients to see Dr. Binh Dang?</p>
                    <p className={"text-base text-primary-focus "}>
                        Dr. Binh Dang frequently sees patients for Allergy Consultation, Annual Pap Smear / GYN Exam, Annual Physical, Illness, and Pediatric Consultation. You can
                        <span className={"text-blue-500 mx-1"}>
                          see other visit reasons
                        </span>
                        for Dr. Binh Dang on their profile.
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>What languages does Dr. Binh Dang speak?</p>
                    <p className={"text-base text-primary-focus "}>
                        <span className={"text-blue-500 mx-1"}>
                          Dr. Binh Dang
                        </span>
                         speaks English, Spanish, Vietnamese, and Russian.
                    </p>
                </div>

                <div>
                    <p className={"text-base text-primary-focus font-semibold"}>How do patients rate Dr. Binh Dang in reviews?</p>
                    <p className={"text-base text-primary-focus "}>
                        121 patients have reviewed Dr. Binh Dang. The overall rating for this doctor is 3.56/5. They have a 3.85/5 rating for bedside manner and a 3.78/5 rating for wait time. You can
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