

function DoctorItem(props) {
	const {FullName, specialty, SubSpecialty,
		NextAvailableDateInClinic, NextAvailableDateVirtual,
		gender, YearsOfExperience, Language,
		Distance, Address, Lat, Lng
	} = props

	const genderTitle = gender === 'M' ? 'Male' : 'Female'
	return (
		<div className={'w-full flex flex-row justify-between px-4 bg-bgContent round-xl py-2'}>
			<div className={'flex flex-row'}>
				<img className={'w-16 h-16 bg-yellow-300 rounded'}/>
				<div className={'ml-2'}>
					<p className={'text-black text-lg font-semibold'}>{FullName}</p>
					<p className={'text-gray-500 text-base font-semibold'}>{specialty}</p>
					<p className={'text-gray-400 text-sm font-base'}>{specialty}</p>
					<div>
						<span>{'Available data In-Clinic'}</span>
						<span className={'text-gray-500 text-base font-semibold'}>{NextAvailableDateInClinic}</span>
					</div>
					<div>
						<span>{'Available data In-Virtual'}</span>
						<span className={'text-gray-500 text-base font-semibold'}>{NextAvailableDateVirtual}</span>
					</div>

					<div>
						<span>{genderTitle}</span> * <span>Years of Experience: {YearsOfExperience}</span> *
						<span>{'English'}</span>
					</div>

					<p className={'font-base text-black mt-2'}>{Address}</p>
				</div>
			</div>

			<div className={'flex flex-col items-center'}>
				<div className={'w-20 h-20 bg-blue-500 rounded-xl'} />
				<p className={'font-base text-black mt-2'}>{Distance}km</p>
			</div>
		</div>
	)
}

export default DoctorItem
