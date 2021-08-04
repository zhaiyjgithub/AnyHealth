import React from "react";
import ListItem from "./ListItem";


function Section(props) {
	function onClickItem(newSpecialty) {
		const {onClick} = props
		onClick && onClick(newSpecialty)
	}

	return (
		<div key={props.idx} className={'w-full px-2 py-2 rounded'}>
			<p className={'font-semibold text-lg text-base-black font-mono px-1'}>{props.sectionID}</p>
			<ul className={'w-full mt-1'}>
				{props.data.map(({title, value}) => {
					const isSelected = (value === props.selected)
					return (
						<ListItem title={title} isSelected={isSelected} onClick={() => {
							onClickItem(value)
						}} />
					)
				}) }
			</ul>
		</div>
	)
}

Section.defaultProps = {
	idx: 0,
	data: [],
	sectionID: '',
	selected: '',
	onClick: undefined
}

const SectionItem = React.memo(Section)
export default SectionItem
