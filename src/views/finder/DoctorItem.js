import React, {} from "react";

function Item(props) {
	const {fullName, specialty, subSpecialty,
		nextAvailableDateInClinic, nextAvailableDateVirtual,
		gender, yearsOfExperience, language,
		distance, address, lat, lng, style
	} = props

	const genderTitle = gender === 'M' ? 'Male' : 'Female'
	return (
		<div style={style} className={'w-full flex flex-row justify-between px-4 bg-white rounded py-4 border'}>
			<div className={'flex flex-row '}>
				<img src={"https://randomuser.me/api/portraits/men/82.jpg"} className={'w-24 h-24 bg-yellow-300 rounded mr-2'}/>
				<div className={'ml-2'}>
					<p className={'text-black text-lg font-medium font-mono'}>{fullName}</p>
					<p className={'text-base-black text-base mt-1 font-medium'}>{specialty}</p>
					<p className={'text-gray-500 text-base'}>{subSpecialty}</p>
					<div className={'mt-2 flex flex-row items-center'}>
						<div className={'w-4 flex flex-col justify-center mr-2'}>
							<i className="fas fa-clock text-base-black"></i>
						</div>
						<p className={'text-sm font-semibold text-base-black mr-1'}>Earliest Available:</p>
						<p className={'text-sm text-base-green font-bold'}>{nextAvailableDateInClinic}</p>
					</div>
					<div className={'mt-1 flex flex-row items-center mt-1'}>
						<div className={'w-4 flex flex-col justify-center items-center mr-2'}>
							<i className="fas fa-map-marker-alt text-base-black"></i>
						</div>

						<p className={'w-full truncate text-sm text-black font-medium'}>{address}</p>
					</div>

					<div className={'mt-1 flex flex-row items-center mt-1'}>
						<div className={'w-4 flex flex-col justify-center items-center mr-2'}>
							<i className="fas fa-info-circle text-base-black"></i>
						</div>
						<p className={'text-sm text-black font-medium'}>{genderTitle}</p>
						<div className={'w-2 h-2 rounded-full bg-gray-400 mx-2 '}/>
						<p className={'text-sm text-black font-medium'}>{yearsOfExperience}</p>
						<div className={'w-2 h-2 rounded-full bg-gray-400 mx-2'}/>
						<p className={'text-sm text-black font-medium'}>{language}</p>
					</div>
				</div>
			</div>

			<div className={'flex flex-col items-center w-1/5'}>
				<div className={'w-20 h-20 bg-blue-500 rounded h-full w-full'} />
				<p className={'text-sm text-base-black mt-2 font-mono font-medium'}>{distance}km</p>
			</div>
		</div>
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
	lng: '',

}

const DoctorItem = React.memo(Item, (prevProps, nextProps) => {
	return false
})

export default DoctorItem
