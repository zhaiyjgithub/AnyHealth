import React from "react";
import icon_logo from '../../assets/images/logo.jpg'

//<a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
// 							   aria-current="page">Dashboard</a>
function NavBar() {
	return (
		<nav className={'w-full bg-bgContent py-3 px-32 shadow z-50 fixed'}>
			<div className={'flex flex-row items-center '}>
				<img className={'h-8 w-auto mr-2'} src={icon_logo}/>
				<div>
					<span className="text-primary lowercase font-mono font-extrabold text-3xl">any</span>
					<span className="text-baseBlack uppercase font-mono font-extrabold text-3xl">Health</span>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
