
export default function SettingsHeader({children}) {
    return (
        <div className={'px-4 flex flex-row items-center justify-between py-4 shadow shadow-md bg-white'}>
            <p className={'uppercase font-mono font-semibold text-lg text-base-black'}>Settings</p>
            {children}
        </div>
    )
}