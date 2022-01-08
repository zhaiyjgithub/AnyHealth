
export interface RouterTable {
    path: string,
    name: string,
    exact?: boolean,
}

export const dataForSideBarRouter: Array<RouterTable> = [
    {path: "/doctor/dashboard", name: "dashboard", exact: true},
    {path: "/doctor/schedule", name: "schedule", exact: true},
    {path: "/doctor/profile", name: "profile", exact: true},
    {path: "/doctor/settings", name: "settings", exact: true},
]