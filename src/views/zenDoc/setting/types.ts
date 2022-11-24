const SettingRoute: Array<{name: string, path: string}> = [
    {name: "Profile", path: "/profile-setting/profile"},
    {name: "My Appointments", path: "/profile-setting/past-appointments"},
    {name: "Insurance", path: "/profile-setting/insurance"},
    {name: "Data Privacy Settings", path: "/profile-setting/data-privacy-settings"},
]

export interface AddressInfo {
    StreetAddress: string
    Suit: string
    City: string
    State: string
    Zip: string
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

export interface UserProfile {
    UserID: number
    Email: string | undefined
    Phone: string | undefined
    Birthday: string | undefined
    Gender: string | undefined
    StreetAddress: string | undefined
    Suit: string | undefined
    City: string | undefined
    State: string | undefined
    Zip: string | undefined
}

export {
    SettingRoute,
}
