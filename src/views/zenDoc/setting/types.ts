const SettingRoute: Array<{name: string, path: string}> = [
    {name: "Profile", path: "/profile-setting/profile"},
    {name: "Past Appointments", path: "/profile-setting/past-appointments"},
    {name: "Insurance", path: "/profile-setting/insurance"},
    {name: "Data Privacy Settings", path: "/profile-setting/data-privacy-settings"},
]

export interface AddressInfo {
    StreetAddress: string
    Suit: string
    City: string
    State: string
    ZipCode: string
}

interface Insurance {
    InsuranceID: string
    MemberID: string,
    ImageUrls: Array<string>
}

export interface InsuranceInfo {
    Medical: Insurance
    Dental: Insurance
    Vision: Insurance
}

export {
    SettingRoute,
}
