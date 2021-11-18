
export default function PageHeader({title}) {
    return (
        <div className={'px-4 flex flex-row items-center justify-between py-4 shadow shadow-md bg-white'}>
            <p className={'uppercase font-mono font-semibold text-lg text-base-black'}>{title}</p>
        </div>
    )
}