import React from "react";

export default function Policy() {
    const $title = (
        <p className={"text-2xl font-bold text-primary-focus"}>How Zendoc protects your data</p>
    )
    const $policy = (
        <p className={"text-lg font-medium text-primary-focus"}>Zendoc’s mission is to give power to the patient, and
            our company’s No. 1 core value is “Patients First.” Our steadfast commitment to empowering patients guides
            our entire business. In order to do this, at times we may need to collect, use, and share some of your
            personal information. However, we do not sell your personal information. For more information about what
            data we collect and how it may be used, please see our PRIVACY POLICY.
            Zendoc is committed to protecting the privacy rights of our customers and users. This page provides
            additional information about our commitment to respecting your personal information, as well as how to
            exercise the choices and rights you have regarding that information.
            Under the California Consumer Privacy Act of 2018 (“CCPA”), beginning January 1, 2020, California residents
            have the right to opt-out of the sale of their personal information. In order to help us improve our
            product, aggregate statistics, or to allow us to market our services, we may transfer some of your data to
            third parties, such as business partners and service providers. While Zendoc does not “sell” your personal
            information, under the CCPA some of these transfers may be considered sales. As explained below, and in our
            PRIVACY POLICY, Zendoc provides ways for you to exercise your rights over your personal information,
            including the right to access and delete your personal information.</p>
    )
    return (
        <div className={"w-4/5 h-full space-y-8 pr-40 "}>
            {$title}
            {$policy}
        </div>
    )
}
