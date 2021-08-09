
const SegmentTab = ({buttons, selected, onClick}) => {
	const onClickButton = (val) => {
		onClick && onClick(val)
	}
	return (
		<div className={'w-max flex flex-row items-center rounded border'}>
			{buttons.map(({title, value}, idx) => {
				const isSelected = (value === selected)
				const activeClass = 'bg-primary text-white font-medium font-mono text-sm hover:bg-primary-focus'
				const inActiveClass = 'bg-white text-base-black font-base font-mono text-sm hover:bg-gray-300'
				return (
					<button onClick={() => {
						onClickButton(value)
					}} key={idx} type={'button'} className={`${idx === 0 ? 'rounded-tl rounded-bl' : ''} ${idx === buttons.length -1 ? 'rounded-tr rounded-br' : ''}  transition duration-200 each-in-out  px-4 py-2 ${isSelected ? activeClass : inActiveClass}`}>
						{title}
					</button>
				)
			})}
		</div>
	)
}

export default SegmentTab
