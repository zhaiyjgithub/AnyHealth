
export default function PageHeader({title}) {
    return (
        <div className={'px-4 flex flex-row items-center justify-between py-4 shadow shadow-md bg-base-100'}>
            <p className={'uppercase font-mono font-semibold text-lg text-base-content'}>{title}</p>
        </div>
    )
}