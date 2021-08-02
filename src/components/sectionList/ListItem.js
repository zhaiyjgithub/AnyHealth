import React, {Fragment, useState, useEffect} from "react";

function Item(props) {
	function onClickItem(newSpecialty) {
		const {onClick} = props
		onClick && onClick(newSpecialty)
	}
	return (
		<li>
			<button type={'button'} onClick={() => {
				onClickItem(props.specialty)
			}} className={`text-left py-1 px-1 hover:bg-gray-200 text-sm font-mono font-normal ${props.isSelected ? 'bg-primary text-white' : ' text-base-black'}`}>{props.title}</button>
		</li>)

}

Item.defaultProps = {
	onClick: undefined,
	title: '',
	isSelected: false,

}

const ListItem = React.memo(Item)
export default ListItem
