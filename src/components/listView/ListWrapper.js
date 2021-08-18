import React from "react";
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer"
import DoctorItem from "../../views/finder/DoctorItem";
import LoadingFooter from "./LoadingFooter";
import SortBar from "../../views/finder/SortBar";

export default function ListWrapper({
										   // Are there more items to load?
										   // (This information comes from the most recent API request.)
										   hasNextPage,

										   // Are we currently loading a page of items?
										   // (This may be an in-flight flag in your Redux store for example.)
										   isNextPageLoading,

										   // Array of items loaded so far.
										   items,

										   // Callback function responsible for loading the next page of items.
										   loadNextPage,
										onChangeSegmentTab,
									   }) {
	// If there are more items to be loaded then add an extra row to hold a loading indicator.
	const itemCount = hasNextPage ? items.length + 1 : items.length;

	// Only load 1 page of items at a time.
	// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

	// Every row is loaded except for our loading indicator row.
	const isItemLoaded = index => !hasNextPage || index < items.length;

	// Render an item or a loading indicator.
	const Item = ({ index, style }) => {
		if (!isItemLoaded(index)) {
			return (
				<div style={style}>
					<LoadingFooter />
				</div>
			)
		} else {
			if (index === 0) {
				return <div style={style} className={'flex flex-row items-center justify-center pr-2'}>
					<SortBar onChangeSegmentTab={onChangeSegmentTab}/>
				</div>
			}
		}

		const {
			Npi,
			LastName,
			FirstName,
			MiddleName ,
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
		} = items[index - 1]
		return <div style={style} className={'pr-2'}>
			<DoctorItem
				fullName= {FullName}
				specialty = {Specialty}
				subSpecialty = {SubSpecialty}
				nextAvailableDateInClinic={'08/07 2021'}
				nextAvailableDateVirtual={'08/07 2021'}
				gender={Gender}
				yearsOfExperience={YearOfExperience}
				language = {Lang}
				distance={Distance}
				address={Address}
				lat={Location.lat}
				lng={Location.lon}
			/>
		</div>
	};

	const getItemSize = (index) => {
		return (index === 0 || (!isItemLoaded(index))) ? 72 : 200
	}

	return (
		<InfiniteLoader
			isItemLoaded={isItemLoaded}
			itemCount={itemCount}
			loadMoreItems={loadMoreItems}
		>
			{({ onItemsRendered, ref }) => (
				<AutoSizer>
					{({ height, width }) => (
						<List
							className={'h-full w-full'}
							height={height}
							itemCount={itemCount}
							itemSize={getItemSize}
							onItemsRendered={onItemsRendered}
							width={width}
							ref={ref}
						>
							{Item}
						</List>
					)}
				</AutoSizer>

			)}
		</InfiniteLoader>
	);
}
