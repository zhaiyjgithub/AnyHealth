import {SortBy} from "../../utils/constant/Enum";
import {HTTP} from "../../utils/httpTool/HttpTool";
import {ApiDoctor} from "../../utils/httpTool/Api";
import {name} from "faker";
import React, {useEffect, useState} from "react";
import {DoctorProfileContext} from "../../hooks/doctorProfile/DoctorProfileProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import SortBar from "./SortBar";
import DoctorItem from "./DoctorItem";
import useDimensions from "react-cool-dimensions";
import LoadingFooter from "../../components/listView/LoadingFooter";


const DoctorList = ({dataSource, hasNextPage, onLoadMore}) => {
	// const [sortBy, setSortBy] = useState(SortBy.Default)
	//
	// const onChangeSegmentTab = (val) => {
	// 	setSortBy(val)
	// 	dispatchAction({type: 'hello'})
	// }

	const { observe, unobserve, width, height, entry } = useDimensions({
		onResize: ({ observe, unobserve, width, height, entry }) => {
			// Triggered whenever the size of the target is changed...
			unobserve(); // To stop observing the current target element
			observe(); // To re-start observing the current target element
		},
	});

	const renderItem = (item, idx) => {
		const {
			Npi,
			LastName,
			FirstName,
			MiddleName,
			FullName,
			NamePrefix,
			Credential,
			Gender,
			Address,
			City,
			State,
			Zip,
			Phone,
			Specialty,
			SubSpecialty,
			JobTitle,
			Summary,
			Fax,
			AddressSuit,
			Lang,
			YearOfExperience,
			Location,
			Distance,
		} = item

		return (
			<DoctorItem
				key={idx}
				index={idx}
				fullName={FullName}
				specialty={Specialty}
				subSpecialty={SubSpecialty}
				nextAvailableDateInClinic={'08/07 2021'}
				nextAvailableDateVirtual={'08/07 2021'}
				gender={Gender}
				yearsOfExperience={YearOfExperience}
				language={Lang}
				distance={Distance}
				address={Address}
				lat={Location.lat}
				lon={Location.lon}
			/>
		)
	}

	return (
		<div ref={observe} className={'w-full h-full'}>
			<InfiniteScroll
				height={height - 4}
				dataLength={dataSource}
				next={onLoadMore}
				hasMore={hasNextPage}
				loader={<LoadingFooter />}
			>
				{dataSource.map((item, idx) => {
					return renderItem(item, idx)
				})}
			</InfiniteScroll>
		</div>
	)
}

export default DoctorList
