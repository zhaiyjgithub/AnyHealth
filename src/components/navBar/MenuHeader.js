

export default function MenuHeader({dataSource, onClick, selectedType}) {
    return (
        <div className={'w-full items-center flex flex-row px-4 border-b'}>
            {dataSource.map(({type, title}, idx) => {
                const isSelected = (type === selectedType)
                return (
                    <button key={idx} onClick={() => {
                        onClick && onClick(type)
                    }} type={'button'} className={`p-4 border-b-4 text-sm ${isSelected ? 'border-primary font-semibold text-neutral' : 'border-transparent font-base text-gray-500 hover:text-neutral'}`}>
                        {title}
                    </button>
                )
            })}
        </div>
    )
}