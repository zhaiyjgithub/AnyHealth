const SettingRoute: Array<{name: string, path: string}> = [
    {name: "Profile", path: "/profile-setting/profile"},
    {name: "My Appointments", path: "/profile-setting/past-appointments"},
    {name: "Insurance", path: "/profile-setting/insurance"},
    {name: "Data Privacy Settings", path: "/profile-setting/data-privacy-settings"},
]

export interface AddressInfo {
    streetAddress: string
    suit: string
    city: string
    state: string
    zip: string
}

export enum InsuranceType {
    medical,
    dental,
    vision
}

export interface Insurance {
    ID: number
    type: InsuranceType,
    planID: string
    memberID: string
    imageFront: string
    imageBack: string
}

export interface UserProfile {
    userID: number
    email: string | undefined
    phone: string | undefined
    birthday: string | undefined
    gender: string | undefined
    streetAddress: string | undefined
    suit: string | undefined
    city: string | undefined
    state: string | undefined
    zip: string | undefined
}

export {
    SettingRoute,
}
