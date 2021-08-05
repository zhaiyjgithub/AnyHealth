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
										   loadNextPage
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
				return <div style={style}>
					<SortBar />
				</div>
			}
		}

		return <div style={style}>
			<DoctorItem  />
		</div>
	};

	const getItemSize = (index) => {
		return (index === 0 || (!isItemLoaded(index))) ? 64 : 200
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
