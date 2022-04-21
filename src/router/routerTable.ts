
export interface RouterTable {
    path: string,
    name: string,
    exact?: boolean,
}

export const dataForSideBarRouter: Array<RouterTable> = [
    {path: "/doctorAdmin/dashboard", name: "dashboard", exact: true},
    {path: "/doctorAdmin/schedule", name: "schedule", exact: true},
    {path: "/doctorAdmin/profile", name: "profile", exact: true},
    {path: "/doctorAdmin/settings", name: "settings", exact: true},
]