

export default function MenuHeader({dataSource, onClick, selectedType}) {
    return (
        <div className={'w-full items-center flex flex-row px-4 border-b'}>
            {dataSource.map(({type, title}, idx) => {
                const isSelected = (type === selectedType)
                return (
                    <button key={idx} onClick={() => {
                        onClick && onClick(type)
                    }} type={'button'} className={`p-4 border-b-4 ${isSelected ? 'border-primary' : 'border-transparent'}`}>
                        <p className={`font-mono text-base text-base-black ${isSelected ? 'font-semibold' : 'font-base'}`}>{title}</p>
                    </button>
                )
            })}
        </div>
    )
}