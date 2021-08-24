import React, {Fragment} from "react";
import {DoctorProfileContext} from "../../hooks/doctorProfile/DoctorProfileProvider";
import LeafletMap from "../../components/map/LeafletMap";

function Item(props) {
	const {fullName, specialty, subSpecialty,
		nextAvailableDateInClinic, nextAvailableDateVirtual,
		gender, yearsOfExperience, language,
		distance, address, lat, lon, style, index
	} = props

	const {onClickItem} = React.useContext(DoctorProfileContext)
	const genderTitle = gender === 'M' ? 'Male' : 'Female'
	const distanceTitle = distance ? distance.toFixed(2) + ' km' : ''

	const infos = [genderTitle]
	if (yearsOfExperience && yearsOfExperience.length) {
		infos.push(yearsOfExperience)
	}
	if (language && language.length) {
		infos.push(language)
	}
	const renderInfoView = (title, idx, ) => {
		return title && title.length && (
			<Fragment key={idx}>
				<p className={'text-sm text-black font-medium'}>{title}</p>
				{infos.length > 1 ? (<div className={`w-2 h-2 rounded-full bg-gray-400 ${idx !== 0 ? 'mx-2' : ''}`}/>) : null}
			</Fragment>
		)
	}

	const onClick = () => {
		onClickItem({index: index})
	}

	const position = [lat, lon]
	return (
		<button onClick={onClick} type={'button'} style={style} className={'text-left w-full flex flex-row justify-between px-4 bg-white rounded py-2 border my-2'}>
			<div className={'flex flex-row'}>
				<img src={"https://randomuser.me/api/portraits/women/44.jpg"} className={'flex-none w-24 h-24 bg-yellow-300 rounded mr-2'}/>
				<div className={'flex-grow ml-2 mr-2'}>
					<p className={'text-black text-lg font-medium font-mono line-clamp-1'}>{fullName}</p>
					<p className={'text-base-black text-base mt-1 font-medium line-clamp-1 overflow-clip'}>{specialty}</p>
					<p className={'text-gray-500 text-base line-clamp-1 w-full'}>{subSpecialty}</p>
					<div className={'mt-2 flex flex-row items-center justify-left w-full'}>
						<span className={'w-4 flex flex-col justify-center mr-2'}>
							<i className="fas fa-clock text-base-black"></i>
						</span>
						<span className={'text-sm font-semibold text-base-black mr-1'}>Earliest Available:</span>
						<span className={'text-sm text-base-green font-bold'}>{nextAvailableDateInClinic}</span>
					</div>
					<div className={'mt-1 flex flex-row items-center mt-1 w-full'}>
						<div className={'w-4 flex flex-col justify-center items-center mr-2'}>
							<i className="fas fa-map-marker-alt text-base-black"></i>
						</div>
						<p className={'text-sm text-black font-medium line-clamp-1 w-full'}>{address}</p>
					</div>

					<div className={'mt-1 flex flex-row items-center mt-1'}>
						<div className={'w-4 flex flex-col justify-center items-center mr-2'}>
							<i className="fas fa-info-circle text-base-black"></i>
						</div>
						{infos.map((title, idx) => {
							return renderInfoView(title, idx)
						})}
					</div>
				</div>
			</div>

			<div className={'flex-none flex-col items-center justify-center hidden md:w-24 md:flex'}>
				<div className={'w-24 h-24 rounded w-full'} >
					<LeafletMap
						position={position}
						zoom={13}
						scrollWheelZoom={false}
						address={address}
						zoomControl={false}
						attribution={''}
					/>
				</div>
				<p className={'text-sm text-base-black mt-2 font-mono font-medium'}>{distanceTitle}</p>
			</div>
		</button>
	)
}

Item.defaultProps = {
	style: {},
	fullName: 'Lucy C. Richard NP',
	specialty: 'Women\'s Health Nurse Practitioner',
	subSpecialty: 'Obstetrics & Gynecology',
	nextAvailableDateInClinic: '08/07 2021',
	nextAvailableDateVirtual: '08/07 2021',
	gender: 'M',
	yearsOfExperience: '21',
	language: 'English',
	distance: 26,
	address: 'Aroostook Medical Center',
	lat: 0,
	lon: 0,

}

const DoctorItem = React.memo(Item, (prevProps, nextProps) => {
	return false
})

export default DoctorItem
