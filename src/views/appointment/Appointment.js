import React from "react";


const Appointment = ({fullName, specialty, subSpecialty,
						 nextAvailableDateInClinic, nextAvailableDateVirtual,
						 gender, yearsOfExperience, language,
						 distance, address, lat, lng
					 }) => {

	const genderTitle = gender === 'M' ? 'Male' : 'Female'
	return (
		<div className={'w-full h-full px-4 pt-2 '}>
			<div className={'w-full'}>
				<div className={'w-full border rounded'}>
					<div className={'w-full p-4'}>
						<img src={"https://randomuser.me/api/portraits/women/44.jpg"} className={'w-16 h-16 bg-yellow-300 rounded mr-2'}/>
						<p className={'text-black text-xl font-semibold font-mono mt-1'}>{fullName}</p>
						<p className={'text-base-black text-base mt-1 font-semibold font-mono'}>{specialty}</p>
						<p className={'text-gray-500 text-base'}>{subSpecialty}</p>

						<div className={'mt-1 flex flex-row items-center mt-1'}>
							<div className={'w-4 flex flex-col justify-center items-center mr-2'}>
								<i className="fas fa-info-circle text-base-black"></i>
							</div>
							<p className={'text-sm text-black font-medium'}>{genderTitle}</p>
							<div className={'w-2 h-2 rounded-full bg-gray-400 mx-2 '}/>
							<p className={'text-sm text-black font-medium'}>{yearsOfExperience} Years of Experience</p>
							<div className={'w-2 h-2 rounded-full bg-gray-400 mx-2'}/>
							<p className={'text-sm text-black font-medium'}>{language}</p>
						</div>
					</div>
				</div>
			</div>

			<div className={'w-full mt-4'}>
				<p className={'font-bold text-base text-base-black'}>Overview</p>
				<p className={' text-sm text-base-black mt-2'}>Dr. Huihong Xu is a pathologist in Boston, Massachusetts and is affiliated with Boston Medical Center. She received her medical degree from Shanghai Medical University and has been in practice for more than 20 years.</p>
			</div>

			<div className={'w-full mt-4'}>
				<p className={'font-bold text-base text-base-black '}>Appointment information</p>
				<table className={'table-auto border-collapse border w-full mt-2'}>
					<tr className={'border rounded'}>
						<th className={'font-medium text-base text-gray-600 h-10'}>Appointment Type</th>
						<th className={'font-medium text-base text-gray-600 h-10'}>Available Date Time</th>
						<th className={'font-medium text-base text-gray-600 h-10'}>Action</th>
					</tr>
					<tr className={'border'}>
						<td className={'text-center text-sm text-base-green font-semibold '}>In Clinic</td>
						<td className={'text-center text-sm text-base-green font-semibold '}>Friday, Jun 08, 15:00</td>
						<td className={'text-center'}>
							<button type={'button'} className={'bg-primary hover:bg-primary-focus rounded-full text-white text-sm font-semibold px-4 py-2 my-4'}>
								Book Now
							</button>
						</td>
					</tr>

					<tr className={'border'}>
						<td className={'text-center text-sm text-pink-500 font-semibold'}>Virtual</td>
						<td className={'text-center text-sm text-pink-500 font-semibold '}>Friday, Jun 08, 15:00</td>
						<td className={'text-center'}>
							<button type={'button'} className={'bg-pink-500 hover:bg-pink-600 rounded-full text-white text-sm font-semibold  px-4 py-2 my-4'}>
								Book Now
							</button>
						</td>
					</tr>
				</table>
			</div>

			<div className={'w-full mt-4'}>
				<p className={'font-bold text-base text-base-black '}>Location & Contacts</p>
				<div className={'w-full h-56 bg-gray-300 rounded mt-1'}/>

				<div className={'w-full flex flex-row items-start mt-2'}>
					<div className={'flex flex-col justify-center items-center mr-2 mt-1'}>
						<i className="fas fa-map-marker-alt text-base-black"></i>
					</div>
					<div>
						<p className={'text-sm text-base-black font-bold'}>{'Floor 3, Room 310'}</p>
						<p className={'text-sm text-base-black'}>{'670 Albany St, Boston, MA, 10016'}</p>
						<p className={'text-sm text-blue-600 font-bold'}>{'(617) 414-5314'}</p>
					</div>
				</div>
			</div>

			<div className={'w-full my-4 flex flex-row items-center justify-center'}>
				<button type={'button'} className={'text-base font-semibold rounded-full px-4 py-2 text-white bg-gradient-to-r from-pink-400 to-blue-500 hover:from-pink-500 hover:to-blue-600'}>
					Click for More
				</button>
			</div>

			<div className={'w-full h-4'}/>
		</div>
	)
}

Appointment.defaultProps = {
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
	lng: ''
}


export default Appointment
