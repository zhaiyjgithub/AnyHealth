
export interface RouterTable {
    path: string,
    name: string,
    exact?: boolean,
}

export const dataForSideBarRouter: Array<RouterTable> = [
    {path: "/doctorAdmin/dashboard", name: "Dashboard", exact: true},
    {path: "/doctorAdmin/schedule", name: "Schedule", exact: true},
    {path: "/doctorAdmin/profile", name: "Profile", exact: true},
    {path: "/doctorAdmin/settings", name: "Settings", exact: true},
]
